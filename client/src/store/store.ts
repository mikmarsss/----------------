import { makeAutoObservable } from "mobx";
import { IUser } from "../models/IUser";
import axios from 'axios'
import { AuthResponse } from "../models/response/AuthResponse";
import { APi_URL } from "../http";
import AuthService from "../service/AuthService";
import { ITest } from "../models/ITest";

export default class Store {
    user = {} as IUser
    isLoading = false
    isAuth = false
    test = {} as ITest
    constructor() {
        makeAutoObservable(this)
    }
    setAuth(bool: boolean) {
        this.isAuth = bool
    }

    setUser(user: IUser) {
        this.user = user
    }

    setAnswer(test: ITest) {
        this.test = test
    }

    setLoading(bool: boolean) {
        this.isLoading = bool
    }

    async login(email: string, password: string) {
        try {
            const response = await AuthService.login(email, password)
            console.log(response)
            localStorage.setItem('token', response.data.accessToken)
            this.setAuth(true)
            this.setUser(response.data.user)
        } catch (e) {
            console.log(e.response?.data?.message)
            alert(e.response.data.message)
        }
    }


    async saveData(formdata: any) {
        try {
            const response = await AuthService.saveData(formdata)
            console.log(response)
            this.setUser(response.data.user)

        } catch (e) {
            console.log(e.response?.data?.message)
        }
    }

    async registration(email: string, password: string, username: string) {
        try {
            const response = await AuthService.registration(email, password, username)
            console.log(response)
            localStorage.setItem('token', response.data.accessToken)
            this.setAuth(true)
            this.setUser(response.data.user)
        } catch (e) {
            console.log(e.response?.data?.message)
        }
    }

    async logout() {
        try {
            const response = await AuthService.logout()
            localStorage.removeItem('token')
            this.setAuth(false)
            this.setUser({} as IUser)
        } catch (e) {
            console.log(e.response?.data?.message)
        }
    }

    async sendChangePasswordCode(email: string, newEmail: string) {
        try {
            const response = await AuthService.sendChangePasswordCode(email, newEmail)
            console.log(response)
            this.setUser(response.data.user)
        } catch (e) {
            console.log(e.response?.data?.message)
        }
    }

    async changePassword(email: string, code: BigInt, newPassword: string) {
        try {
            const response = await AuthService.changePassword(email, code, newPassword)
            console.log(response)
            this.setUser(response.data.user)
        } catch (e) {
            console.log(e.response?.data?.message)
        }
    }

    async changeEmail(oldEmail: string, newEmail: string, code: BigInt) {
        try {
            const response = await AuthService.changeEmail(oldEmail, newEmail, code)
            console.log(response)
            this.setUser(response.data.user)
        } catch (e) {
            console.log(e.response?.data?.message)
        }
    }

    async checkAuth() {
        this.setLoading(true)
        try {
            const response = await axios.get<AuthResponse>(`${APi_URL}/user/refresh`, { withCredentials: true })
            console.log(response)
            localStorage.setItem('token', response.data.accessToken)
            this.setAuth(true)
            this.setUser(response.data.user)
        } catch (e) {
            console.log(e.response?.data?.message)
        } finally {
            this.setLoading(false)
        }
    }

    async sendToAI(answer: any) {
        try {
            this.setLoading(true)
            const msg = [{ "role": "user", "content": `${answer}, что делать, опиши кратко в 400 символов` }]
            const mdel = "deepseek-chat"
            const response = await AuthService.sendAiText(mdel, msg)
            console.log(response)
            this.setAnswer(response.data)
        } catch (e) {
            console.log(e.response?.data?.message)
        } finally {
            this.setLoading(false)
        }
    }

    async saveTestResult(answer: string, id: string) {
        try {
            const response = await AuthService.saveTestResult(answer, id)
            console.log(response)
        } catch (e) {
            console.log(e.response?.data?.message)
        }
    }
} 