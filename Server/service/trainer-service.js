const { TrainerStatuses } = require('../models/user-model')
const UserTrainersDto = require('../dtos/userTrainers-dto')
const { UserTrainers } = require('../models/user-model')



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
}

module.exports = new TrainerService()