import { makeAutoObservable } from "mobx";
import axios from 'axios'
import { ITrainerUserResponse } from "../models/response/ITrainerUserResponse";
import { APi_URL } from "../http";
import TrainerService from "../service/TrainerService";
import { ITrainerUser } from "../models/ITrainerUser";

export default class TrainerStore {

    userTrainer = {} as ITrainerUser

    constructor() {
        makeAutoObservable(this)
    }

    setUserTrainer(userTrainer: ITrainerUser) {
        this.userTrainer = userTrainer
    }

    async fetchUserTrainerInfo(user_id: string) {
        try {
            const response = await TrainerService.fetchUserTrainerInfo(user_id)
            console.log(response)
            this.setUserTrainer(response.data.userTrainer)
        } catch (e) {
            console.log(e.response?.data?.message)
        }
    }
}
