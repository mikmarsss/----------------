const { TrainerStatuses } = require('../models/user-model')
const UserTrainersDto = require('../dtos/userTrainers-dto')
const { UserTrainers } = require('../models/user-model')
const { TrainerInfo } = require('../models/user-model')
const TrainerInfoDTO = require('../dtos/trainerInfo-dto')
const DoneTrainersDTO = require('../dtos/doneTrainers-dto')
const { DoneUserTrainers } = require('../models/user-model')
const vm = require('vm');


class TrainerService {

    async fetchUserTrainerInfo(user_id) {
        const userTrainer = await UserTrainers.findOne({ where: { user_id: user_id } })

        if (userTrainer.points <= 300) {
            userTrainer.update({ progress_status: 1 }, { where: { id: user_id } })
        }
        else if (userTrainer.points > 300 && userTrainer.points <= 600) {
            userTrainer.update({ progress_status: 2 }, { where: { id: user_id } })
        }
        else if (userTrainer.points > 600 && userTrainer.points <= 1000) {
            userTrainer.update({ progress_status: 3 }, { where: { id: user_id } })
        }
        else if (userTrainer.points > 1000 && userTrainer.points <= 2000) {
            userTrainer.update({ progress_status: 4 }, { where: { id: user_id } })
        }
        else if (userTrainer.points > 2000 && userTrainer.points <= 5000) {
            userTrainer.update({ progress_status: 5 }, { where: { id: user_id } })
        }
        else if (userTrainer.points > 5000 && userTrainer.points <= 10000) {
            userTrainer.update({ progress_status: 6 }, { where: { id: user_id } })
        }
        else if (userTrainer.points > 10000 && userTrainer.points <= 25000) {
            userTrainer.update({ progress_status: 7 }, { where: { id: user_id } })
        }

        const userStatusId = userTrainer.progress_status

        const trainerStatus = await TrainerStatuses.findOne({ where: { id: userStatusId } })

        const userStatus = trainerStatus.status
        const userStatusValue = trainerStatus.status_value
        const userTrainerDto = new UserTrainersDto(userTrainer)
        userTrainerDto.setStatus(userStatus)
        userTrainerDto.setStatusValue(userStatusValue)
        return { userTrainer: userTrainerDto }
    }

    async createTrainer(user_id) {
        const time = Math.floor(Date.now() / 1000)
        const trainer = await TrainerInfo.create({ user_id: user_id, updated_at: time, created_at: time })
        const trainerDto = new TrainerInfoDTO(trainer)
        return { trainer: trainerDto }
    }

    async fetchTrainer(trainer_id) {
        const trainer = await TrainerInfo.findOne({ where: { id: trainer_id } })
        const trainerDto = new TrainerInfoDTO(trainer)
        return { trainer: trainerDto }
    }

    async codeCompiler(code, tag) {
        if (tag === 'javascript') {
            const context = vm.createContext({})
            const script = new vm.Script(code);
            const result = script.runInContext(context);
            return { result: result }
        }
    }

    async saveTrainerData(code, tag, name, description, dificult, tests, trainer_id, points) {
        const trainer = await TrainerInfo.findOne({ where: { id: trainer_id } })
        const time = Math.floor(Date.now() / 1000)
        trainer.update({ code: code }, { where: { id: trainer_id } })
        trainer.update({ points: points }, { where: { id: trainer_id } })
        trainer.update({ programming_languages: tag }, { where: { id: trainer_id } })
        trainer.update({ name: name }, { where: { id: trainer_id } })
        trainer.update({ updated_at: time }, { where: { id: trainer_id } })
        trainer.update({ content: description }, { where: { id: trainer_id } })
        trainer.update({ dificult: dificult }, { where: { id: trainer_id } })
        trainer.update({ tests: tests }, { where: { id: trainer_id } })
        const trainerDto = new TrainerInfoDTO(trainer)
        return { trainer: trainerDto }
    }

    async fetchAllUserTrainers(user_id) {
        const trainers = await TrainerInfo.findAll({ where: { user_id: user_id }, order: [['created_at', 'ASC']] })
        return { trainers }
    }

    async deleteTrainer(trainer_id) {
        await TrainerInfo.destroy({ where: { id: trainer_id } })
        await DoneUserTrainers.destroy({ where: { id: trainer_id } })
        return { message: "Задача удалена" }
    }

    async publishTrainer(trainer_id) {
        const trainer = await TrainerInfo.findOne({ where: { id: trainer_id } })
        trainer.update({ status: 'published' }, { where: { id: trainer_id } })

        return { message: "Опубликовано" }
    }

    async fetchAllTrainers() {
        const trainers = await TrainerInfo.findAll({ order: [['created_at', 'ASC']] })
        const publishedTrainers = [];
        for (let trainer of trainers) {
            if (trainer.status === 'published') {
                publishedTrainers.push(trainer);
            }
        }
        return { trainers: publishedTrainers }
    }

    async saveDoneTrainers(trainer_id, check, code, user_id, points) {
        const trainer = await DoneUserTrainers.findOne({ where: { trainer_id: trainer_id, user_id: user_id } })
        const time = Math.floor(Date.now() / 1000)
        trainer.update({ updated_at: time }, { where: { id: trainer_id, user_id: user_id } })
        trainer.update({ check: check }, { where: { id: trainer_id, user_id: user_id } })
        trainer.update({ code: code }, { where: { id: trainer_id, user_id: user_id } })
        const allOk = check.every(item => item === 'Ok');
        trainer.update({ isDone: allOk }, { where: { id: trainer_id, user_id: user_id } })
        const userTrainer = await UserTrainers.findOne({ where: { user_id: user_id } })
        const userPoints = userTrainer.points
        userTrainer.update({ points: userPoints + points }, { where: { user_id: user_id } })

        const trainerDto = new DoneTrainersDTO(trainer)

        return { trainer: trainerDto }
    }

    async createDoneTrainer(trainer_id, user_id) {
        let trainer = await DoneUserTrainers.findOne({ where: { trainer_id: trainer_id, user_id: user_id } })
        const time = Math.floor(Date.now() / 1000)
        if (!trainer) {
            trainer = await DoneUserTrainers.create({ trainer_id: trainer_id, user_id: user_id, created_at: time, updated_at: time })
        }
        const trainerDto = new DoneTrainersDTO(trainer)

        return { trainer: trainerDto }
    }

    async fetchDoneTrainer(trainer_id, user_id) {
        const trainer = await DoneUserTrainers.findOne({ where: { trainer_id: trainer_id, user_id: user_id } })
        const trainerDto = new DoneTrainersDTO(trainer)

        return { trainer: trainerDto }
    }
}

module.exports = new TrainerService()