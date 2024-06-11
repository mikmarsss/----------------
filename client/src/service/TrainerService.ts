import $api from "../http";
import { AxiosResponse } from 'axios'
import { ITrainerUserResponse } from "../models/response/ITrainerUserResponse";
import { ITrainerResponse } from "../models/response/ITrainerResponse";
import { ICompilerResponse } from "../models/response/ICompilerResponse";

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

    static async saveTrainerData(trainer_id: string, code: string, tag: string, name: string, description: string, dificult: string, tests: string): Promise<AxiosResponse<ITrainerResponse>> {
        return $api.post<ITrainerResponse>('/trainer/saveTrainerData', { code, tag, name, description, dificult, tests, trainer_id })
    }
} 