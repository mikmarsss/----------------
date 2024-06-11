const { TrainerStatuses } = require('../models/user-model')
const UserTrainersDto = require('../dtos/userTrainers-dto')
const { UserTrainers } = require('../models/user-model')
const { TrainerInfo } = require('../models/user-model')
const TrainerInfoDTO = require('../dtos/trainerInfo-dto')
const vm = require('vm');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');
const uuid = require('uuid')

class TrainerService {

    async fetchUserTrainerInfo(user_id) {
        const userTrainer = await UserTrainers.findOne({ where: { user_id: user_id } })
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

    async saveTrainerData(code, tag, name, description, dificult, tests, trainer_id) {
        const trainer = await TrainerInfo.findOne({ where: { id: trainer_id } })
        const time = Math.floor(Date.now() / 1000)
        trainer.update({ code: code }, { where: { id: trainer_id } })
        trainer.update({ programming_languages: tag }, { where: { id: trainer_id } })
        trainer.update({ name: name }, { where: { id: trainer_id } })
        trainer.update({ updated_at: time }, { where: { id: trainer_id } })
        trainer.update({ content: description }, { where: { id: trainer_id } })
        trainer.update({ dificult: dificult }, { where: { id: trainer_id } })
        trainer.update({ tests: tests }, { where: { id: trainer_id } })
        const trainerDto = new TrainerInfoDTO(trainer)
        return { trainer: trainerDto }
    }
}

module.exports = new TrainerService()