const jwt = require('jsonwebtoken')
const { TokenSchema } = require('../models/user-model')

class TokenService {
    generateTokens(email, id, isActivated) {
        const accessToken = jwt.sign({ email, id, isActivated }, process.env.SECRETKEY, { expiresIn: '30m' })
        const refreshToken = jwt.sign({ email, id, isActivated }, process.env.SECRETKEY, { expiresIn: '30d' })
        return {
            accessToken,
            refreshToken
        }
    }

    validateAccessToken(token) {
        try {
            const userData = jwt.verify(token, process.env.SECRETKEY)
            return userData
        } catch (e) {
            return null
        }
    }

    validateRefreshToken(token) {
        try {
            const userData = jwt.verify(token, process.env.SECRETKEY)
            return userData
        } catch (e) {
            return null
        }
    }

    async saveToken(userId, refreshToken) {
        const tokenData = await TokenSchema.findOne({ where: { userId } })
        if (tokenData) {
            tokenData.refreshToken = refreshToken
            return tokenData.save()
        }
        const token = await TokenSchema.create({ userId, refreshToken })
        return token;
    }

    async removeToken(refreshToken) {
        const tokenData = await TokenSchema.destroy({ where: { refreshToken } })
        return tokenData;
    }

    async findToken(refreshToken) {
        const tokenData = await TokenSchema.findOne({ where: { refreshToken } })
        return tokenData;
    }
}

module.exports = new TokenService()