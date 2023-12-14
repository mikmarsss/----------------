import { makeAutoObservable } from "mobx";
import { IUser } from "../models/IUser";
import axios from 'axios'
import { AuthResponse } from "../models/response/AuthResponse";
import { APi_URL } from "../http";
import AuthService from "../service/AuthService";

export default class Store {
    user = {} as IUser
    isLoading = false
    isAuth = false
    constructor() {
        makeAutoObservable(this)
    }
    setAuth(bool: boolean) {
        this.isAuth = bool
    }

    setUser(user: IUser) {
        this.user = user
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
        }
    }


    async saveData(email: string, name: string, surname: string, city: string, dob: Date) {
        try {
            const response = await AuthService.saveData(email, name, surname, city, dob)
            console.log(response)
            this.setUser(response.data.user)
        } catch (e) {
            console.log(e.response?.data?.message)
        }
    }

    async registration(email: string, password: string) {
        try {
            const response = await AuthService.registration(email, password)
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
} 