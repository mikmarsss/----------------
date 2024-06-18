import $api from "../http";
import { AxiosResponse } from 'axios'
import { ITrainerUserResponse } from "../models/response/ITrainerUserResponse";
import { ITrainerResponse } from "../models/response/ITrainerResponse";
import { ICompilerResponse } from "../models/response/ICompilerResponse";
import { ITrainer } from "../models/ITrainer";
import { DoneTrainerResponse } from "../models/response/DoneTrainersResponse";
export default class TrainerService {

    static async fetchUserTrainerInfo(user_id: string): Promise<AxiosResponse<ITrainerUserResponse>> {
        return $api.post<ITrainerUserResponse>('/trainer/fetchUserTrainerInfo', { user_id })
    }

    static async createTrainer(user_id: string): Promise<AxiosResponse<ITrainerResponse>> {
        return $api.post<ITrainerResponse>('/trainer/createTrainer', { user_id })
    }

    static async fetchTrainer(trainer_id: string): Promise<AxiosResponse<ITrainerResponse>> {
        return $api.post<ITrainerResponse>('/trainer/fetchTrainer', { trainer_id })
    }

    static async codeCompiler(code: string): Promise<AxiosResponse<ICompilerResponse>> {
        return $api.post<ICompilerResponse>('/trainer/codeCompiler', { code })
    }

    static async saveTrainerData(trainer_id: string, code: string, tag: string, name: string, description: string, dificult: string, tests: string, points: string): Promise<AxiosResponse<ITrainerResponse>> {
        return $api.post<ITrainerResponse>('/trainer/saveTrainerData', { code, tag, name, description, dificult, tests, trainer_id, points })
    }

    static async fetchAllUserTrainers(user_id: string): Promise<AxiosResponse<ITrainer[]>> {
        return $api.post<ITrainer[]>('/trainer/fetchAllUserTrainers', { user_id })
    }

    static async deleteTrainer(trainer_id: string): Promise<AxiosResponse<string>> {
        return $api.post<string>('/trainer/deleteTrainer', { trainer_id })
    }

    static async publishTrainer(trainer_id: string): Promise<AxiosResponse<string>> {
        return $api.post<string>('/trainer/publishTrainer', { trainer_id })
    }

    static async fetchAllTrainers(): Promise<AxiosResponse<ITrainer[]>> {
        return $api.get<ITrainer[]>('/trainer/fetchAllTrainers')
    }

    static async saveDoneTrainers(trainer_id: string, check: string, code: string, user_id: string, points: string): Promise<AxiosResponse<DoneTrainerResponse>> {
        return $api.post<DoneTrainerResponse>('/trainer/saveDoneTrainers', { trainer_id, check, code, user_id, points })
    }

    static async fetchDoneTrainer(trainer_id: string, user_id: string): Promise<AxiosResponse<DoneTrainerResponse>> {
        return $api.post<DoneTrainerResponse>('/trainer/fetchDoneTrainer', { trainer_id, user_id })
    }

    static async createDoneTrainer(trainer_id: string, user_id: string): Promise<AxiosResponse<DoneTrainerResponse>> {
        return $api.post<DoneTrainerResponse>('/trainer/createDoneTrainer', { trainer_id, user_id })
    }
} 