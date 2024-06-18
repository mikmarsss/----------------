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
            const { code, tag, name, description, dificult, tests, trainer_id, points } = req.body
            const compileData = await TrainerService.saveTrainerData(code, tag, name, description, dificult, tests, trainer_id, points)
            return res.json(compileData)
        } catch (e) {
            next(e)
        }
    }

    async fetchAllUserTrainers(req, res, next) {
        try {
            const { user_id } = req.body
            const trainerData = await TrainerService.fetchAllUserTrainers(user_id)
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

    async publishTrainer(req, res, next) {
        try {
            const { trainer_id } = req.body
            const compileData = await TrainerService.publishTrainer(trainer_id)
            return res.json(compileData)
        } catch (e) {
            next(e)
        }
    }

    async fetchAllTrainers(req, res, next) {
        try {
            const trainerData = await TrainerService.fetchAllTrainers()
            return res.json(trainerData)
        } catch (e) {
            next(e)
        }
    }

    async saveDoneTrainers(req, res, next) {
        try {
            const { trainer_id, check, code, user_id, points } = req.body
            const trainerData = await TrainerService.saveDoneTrainers(trainer_id, check, code, user_id, points)
            return res.json(trainerData)
        } catch (e) {
            next(e)
        }
    }

    async createDoneTrainer(req, res, next) {
        try {
            const { trainer_id, user_id } = req.body
            const trainerData = await TrainerService.createDoneTrainer(trainer_id, user_id)
            return res.json(trainerData)
        } catch (e) {
            next(e)
        }
    }

    async fetchDoneTrainer(req, res, next) {
        try {
            const { trainer_id, user_id } = req.body
            const trainerData = await TrainerService.fetchDoneTrainer(trainer_id, user_id)
            return res.json(trainerData)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new TrainerController()