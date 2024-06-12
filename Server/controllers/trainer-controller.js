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

    async createTrainer(req, res, next) {
        try {
            const { user_id } = req.body
            const trainerData = await TrainerService.createTrainer(user_id)
            return res.json(trainerData)
        } catch (e) {
            next(e)
        }
    }

    async fetchTrainer(req, res, next) {
        try {
            const { trainer_id } = req.body
            const trainerData = await TrainerService.fetchTrainer(trainer_id)
            return res.json(trainerData)
        } catch (e) {
            next(e)
        }
    }

    async codeCompiler(req, res, next) {
        try {
            const { code, tag } = req.body
            const compileData = await TrainerService.codeCompiler(code, tag)
            return res.json(compileData)
        } catch (e) {
            next(e)
        }
    }

    async saveTrainerData(req, res, next) {
        try {
            const { code, tag, name, description, dificult, tests, trainer_id } = req.body
            const compileData = await TrainerService.saveTrainerData(code, tag, name, description, dificult, tests, trainer_id)
            return res.json(compileData)
        } catch (e) {
            next(e)
        }
    }

    async fetchAllTrainers(req, res, next) {
        try {
            const { user_id } = req.body
            const trainerData = await TrainerService.fetchAllTrainers(user_id)
            return res.json(trainerData)
        } catch (e) {
            next(e)
        }
    }

    async deleteTrainer(req, res, next) {
        try {
            const { trainer_id } = req.body
            const compileData = await TrainerService.deleteTrainer(trainer_id)
            return res.json(compileData)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new TrainerController()