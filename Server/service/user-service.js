const { User } = require('../models/user-model')
const bcrypt = require('bcrypt')
const uuid = require('uuid')
const mailService = require('./mail-service')
const UserDto = require('../dtos/user-dto')
const fs = require('fs')
const tokenService = require('./token-service')
const ApiError = require('../exceptions/api-error')
const jwt = require('jsonwebtoken')
const path = require('path')


class UserService {
    async registration(email, password, username) {
        const candidate = await User.findOne({ where: { email } })
        if (candidate) {
            throw ApiError.BadRequest(`Пользователь с а почтовым адресом ${email} уже зарегистрирован!`)
        }
        const hashPassword = await bcrypt.hash(password, 3)
        const activationLink = uuid.v4()
        const user = await User.create({ email, password: hashPassword, activationLink, username })
        await mailService.sendActivationMail(email, `${process.env.API_URL}/api/user/activate/${activationLink}`)

        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens(userDto.email, userDto.id, userDto.isActivated);
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return { ...tokens, user: userDto }
    }
    async getAll(email) {
        const user = await User.findOne({ where: { email } })
        const userDto = new UserDto(user);
        return { user: userDto }
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
        const tokens = await tokenService.generateTokens(userDto.email, userDto.id, userDto.isActivated)
        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return { ...tokens, user: userDto }
    }

    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken)
        return token
    }


    async saveData(email, name, surname, city, dob, username, aboutMe, img) {
        const user = await User.findOne({ where: { email } })

        if (img) {
            let fileName = uuid.v4() + ".jpg";
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            user.update({ img: fileName }, { where: { email } })
        }

        user.update({ name: name }, { where: { email } })
        user.update({ surname: surname }, { where: { email } })
        user.update({ city: city }, { where: { email } })
        user.update({ dob: dob }, { where: { email } })
        user.update({ username: username }, { where: { email } })
        user.update({ aboutMe: aboutMe }, { where: { email } })

        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens(userDto.email, userDto.id, userDto.isActivated)
        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return { ...tokens, user: userDto }
    }

    async sendChangePassword(email) {
        const randomNumber = Math.floor(Math.random() * (999999 - 111111 + 1)) + 111111
        const user = await User.findOne({ where: { email } })
        if (!user) {
            throw ApiError.BadRequest('Пользователь не найден!')
        }
        await mailService.sendChangePasswordCode(email, randomNumber)
        user.changeCode = randomNumber;
        await user.save();
        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens(userDto.email, userDto.id, userDto.isActivated)
        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return { ...tokens, user: userDto }
    }

    async changePassword(email, code, newPassword) {
        const user = await User.findOne({ where: { email } })
        const userDto = new UserDto(user)
        if (user.changeCode == code) {
            const hashPassword = await bcrypt.hash(newPassword, 3)
            user.changeCode = null;
            user.password = hashPassword
            await user.save()

            const tokens = await tokenService.generateTokens(userDto.email, userDto.id, userDto.isActivated)
            await tokenService.saveToken(userDto.id, tokens.refreshToken);
            return { ...tokens, user: userDto }
        } else {
            throw ApiError.BadRequest('Неверный код!')
        }

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
        const tokens = await tokenService.generateTokens(userDto.email, userDto.id, userDto.isActivated)
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return { ...tokens, user: userDto }
    }

    async getAllUsers() {
        const users = await User.find()
        return users
    }
}

module.exports = new UserService()