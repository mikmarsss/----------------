import $api from "../http";
import { AxiosResponse } from 'axios'
import { AuthResponse } from "../models/response/AuthResponse";
import { ITrainerUserResponse } from "../models/response/ITrainerUserResponse";

export default class TrainerService {
    static async fetchUserTrainerInfo(user_id: string): Promise<AxiosResponse<ITrainerUserResponse>> {
        return $api.post<ITrainerUserResponse>('/trainer/fetchUserTrainerInfo', { user_id })
    }

} 