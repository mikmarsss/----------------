const { User } = require('../models/user-model')
const bcrypt = require('bcrypt')
const uuid = require('uuid')
const mailService = require('./mail-service')
const UserDto = require('../dtos/user-dto')
const tokenService = require('./token-service')
const ApiError = require('../exceptions/api-error')
const jwt = require('jsonwebtoken')



class UserService {
    async registration(email, password) {
        const candidate = await User.findOne({ where: { email } })
        if (candidate) {
            throw ApiError.BadRequest(`Пользователь с а почтовым адресом ${email} уже зарегистрирован!`)
        }
        const hashPassword = await bcrypt.hash(password, 3)
        const activationLink = uuid.v4()
        const user = await User.create({ email, password: hashPassword, activationLink })
        await mailService.sendActivationMail(email, `${process.env.API_URL}/api/user/activate/${activationLink}`)

        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({ ...userDto });
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return { ...tokens, user: userDto }
    }


    async activate(activationLink) {
        const user = await User.findOne({ where: { activationLink } })
        if (!user) {
            throw ApiError.BadRequest('Некоректная ссылка активации')
        }
        user.isActivated = true
        await user.save()
    }

    async login(email, password) {
        const user = await User.findOne({ where: { email } })
        if (!user) {
            throw ApiError.BadRequest('Пользователь не найден!')
        }
        const isPassEquals = await bcrypt.compareSync(password, user.password)
        if (!isPassEquals) {
            throw ApiError.BadRequest('Неверный пароль!')
        }
        const userDto = new UserDto(user)
        const tokens = await tokenService.generateTokens({ ...userDto })
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return { ...tokens, user: userDto }
    }

    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken)
        return token
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError()
        }
        const userData = tokenService.validateRefreshToken(refreshToken)
        const tokenFromDb = await tokenService.findToken(refreshToken)
        if (!userData || !tokenFromDb) {
            throw ApiError.UnauthorizedError()
        }
        const user = await User.findByPk(userData.id)
        const userDto = new UserDto(user)
        const tokens = await tokenService.generateTokens({ ...userDto })
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return { ...tokens, user: userDto }
    }

    async getAllUsers() {
        const users = await User.find()
        return users
    }
}

module.exports = new UserService()