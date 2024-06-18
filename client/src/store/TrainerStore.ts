import { makeAutoObservable } from "mobx";
import axios from 'axios'
import { ITrainerUserResponse } from "../models/response/ITrainerUserResponse";
import { APi_URL } from "../http";
import TrainerService from "../service/TrainerService";
import { ITrainerUser } from "../models/ITrainerUser";
import { ITrainer } from "../models/ITrainer";
import { ICompiler } from "../models/ICompiler";
import { IDoneTrainer } from "../models/IDoneTrainers";

export default class TrainerStore {

    userTrainer = {} as ITrainerUser
    trainer = {} as ITrainer
    result = {} as ICompiler
    doneTrainer = {} as IDoneTrainer

    constructor() {
        makeAutoObservable(this)
    }

    setUserTrainer(userTrainer: ITrainerUser) {
        this.userTrainer = userTrainer
    }

    setCompilerResult(result: ICompiler) {
        this.result = result
    }

    setTrainer(trainer: ITrainer) {
        this.trainer = trainer
    }

    setDoneTrainer(doneTrainer: IDoneTrainer) {
        this.doneTrainer = doneTrainer
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

    async createTrainer(user_id: string) {
        try {
            const response = await TrainerService.createTrainer(user_id)
            console.log(response)
            this.setTrainer(response.data.trainer)
        } catch (e) {
            console.log(e.response?.data?.message)
        }
    }

    async fetchTrainer(trainer_id: string) {
        try {
            const response = await TrainerService.fetchTrainer(trainer_id)
            console.log(response)
            this.setTrainer(response.data.trainer)
        } catch (e) {
            console.log(e.response?.data?.message)
        }
    }

    async codeCompiler(code: string) {
        try {
            const response = await TrainerService.codeCompiler(code)
            console.log(response)
            this.setCompilerResult(response.data.result)
        } catch (e) {
            console.log(e.response?.data?.message)
        }
    }

    async saveTrainerData(trainer_id: string, code: string, tag: string, name: string, description: string, dificult: string, tests: string, points: string) {
        try {
            const response = await TrainerService.saveTrainerData(trainer_id, code, tag, name, description, dificult, tests, points)
            console.log(response)
            this.setTrainer(response.data.trainer)
        } catch (e) {
            console.log(e.response?.data?.message)
        }
    }

    async deleteTrainer(trainer_id: string) {
        try {
            const response = await TrainerService.deleteTrainer(trainer_id)
            console.log(response)
        } catch (e) {
            console.log(e.response?.data?.message)
        }
    }

    async publishTrainer(trainer_id: string) {
        try {
            const response = await TrainerService.publishTrainer(trainer_id)
            console.log(response)
        } catch (e) {
            console.log(e.response?.data?.message)
        }
    }

    async saveDoneTrainers(trainer_id: string, check: string, code: string, user_id: string, points: string) {
        try {
            const response = await TrainerService.saveDoneTrainers(trainer_id, check, code, user_id, points)
            console.log(response)
            this.setDoneTrainer(response.data.trainer)
        } catch (e) {
            console.log(e.response?.data?.message)
        }
    }

    async fetchDoneTrainer(trainer_id: string, user_id: string) {
        try {
            const response = await TrainerService.fetchDoneTrainer(trainer_id, user_id)
            console.log(response)
            this.setDoneTrainer(response.data.trainer)
        } catch (e) {
            console.log(e.response?.data?.message)
        }
    }

    async createDoneTrainer(trainer_id: string, user_id: string) {
        try {
            const response = await TrainerService.createDoneTrainer(trainer_id, user_id)
            console.log(response)
            this.setDoneTrainer(response.data.trainer)
        } catch (e) {
            console.log(e.response?.data?.message)
        }
    }
}
