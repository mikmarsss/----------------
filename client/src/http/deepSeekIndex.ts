import axios from 'axios'
import { error } from 'console'
import { AuthResponse } from "../models/response/AuthResponse";
export const APi_URL_AI = 'https://api.deepseek.com'


const $apiAI = axios.create({
    withCredentials: false,
    baseURL: APi_URL_AI,
})

export default $apiAI;