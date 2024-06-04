const TrainerService = require('../service/trainer-service')

class TrainerController {
    async fetchUserTrainerInfo(req, res, next) {
        try {
            const { user_id } = req.body
            const trainerData = await TrainerService.fetchUserTrainerInfo(user_id)
            return res.json(trainerData)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new TrainerController()