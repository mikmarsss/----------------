import $api from "../http";
import { Axios, AxiosResponse } from 'axios'
import { AuthResponse } from "../models/response/AuthResponse";
import { ITest } from "../models/ITest";
import $apiAI from "../http/deepSeekIndex";
import { AiResponse } from "../models/response/Airesponse";

export default class AuthService {
    static async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/user/login', { email, password })

    }

    static async registration(email: string, password: string, username: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/user/registration', { email, password, username })
    }

    static async logout(): Promise<void> {
        return $api.post('/user/logout')

    }

    static async saveData(formdata: any): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/user/save', formdata)
    }

    static async sendChangePasswordCode(email: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/user/sendChangePasswordCode', { email })
    }

    static async changePassword(email: string, code: BigInt, newPassword: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/user/changePassword', { email, code, newPassword })
    }

    static async saveTestResult(answer: string, id: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/user/savetestresult', { answer, id })
    }

    static async sendAiText(mdel: string, msg: any): Promise<AxiosResponse<ITest>> {
        return $apiAI.post<ITest>('/v1/chat/completions', { model: mdel, messages: msg }, {
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer sk-3ea5e3c63ed146ecb0d250da7cae96c2',
                'Accept': 'application/json'
            }
        })
    }
}

