const { validationResult } = require('express-validator')
const userService = require('../service/user-service')
const ApiError = require('../exceptions/api-error')

class UserController {
    async registration(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Ошибка при валидации', errors.array()))
            }
            const { email, password, username } = req.body;
            const userData = await userService.registration(email, password, username)
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }

    async saveData(req, res, next) {
        try {
            if (req.files) {
                const { email, name, surname, city, dob, username, aboutMe } = req.body
                const { img } = req.files
                const userData = await userService.saveData(email, name, surname, city, dob, username, aboutMe, img)
                res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
                return res.json(userData)
            } else {
                const { email, name, surname, city, dob, username, aboutMe } = req.body
                const userData = await userService.saveData(email, name, surname, city, dob, username, aboutMe)
                res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
                return res.json(userData)
            }
        } catch (e) {
            next(e)
        }
    }

    async login(req, res, next) {
        try {
            const { email, password } = req.body
            const userData = await userService.login(email, password)
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }



    async sendChangePasswordCode(req, res, next) {
        try {
            const { email } = req.body
            const userData = await userService.sendChangePassword(email)
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }

    async changePassword(req, res, next) {
        try {
            const { email, code, newPassword } = req.body
            const userData = await userService.changePassword(email, code, newPassword)
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }

    async logout(req, res, next) {
        try {
            const { refreshToken } = req.cookies
            const token = await userService.logout(refreshToken)
            res.clearCookie('refreshToken')
            return res.json(token)
        } catch (e) {
            next(e)
        }
    }

    async activate(req, res, next) {
        try {
            const activationLink = req.params.link
            await userService.activate(activationLink)
            return res.redirect(process.env.CLIENT_URL)
        } catch (e) {
            next(e)
        }
    }

    async refresh(req, res, next) {
        try {
            const { refreshToken } = req.cookies
            const userData = await userService.refresh(refreshToken)
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }

    async getUsers(req, res, next) {
        try {
            const users = await userService.getAllUsers()
            return res.json(users)
        } catch (e) {
            next(e)
        }
    }

    async saveTestResult(req, res, next) {
        try {
            const { answer, id } = req.body
            const userData = await userService.saveTestResult(answer, id)
            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new UserController()