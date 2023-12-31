import $api from "../http";
import { AxiosResponse } from 'axios'
import { AuthResponse } from "../models/response/AuthResponse";

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

    static async saveData(email: string, name: string, surname: string, city: string, dob: Date, username: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/user/save', { email, name, surname, city, dob, username })
    }

    static async sendChangePasswordCode(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/user/sendChangePasswordCode', { email, password })
    }

    static async changePassword(email: string, code: BigInt, newPassword: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/user/changePassword', { email, code, newPassword })
    }
}