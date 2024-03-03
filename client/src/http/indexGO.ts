import axios from 'axios'
import { error } from 'console'
import { AuthResponse } from "../models/response/AuthResponse";
export const APi_URL = 'http://localhost:5000/api'
export const APi_URL_GO = 'http://localhost:8081/api'

const $apigo = axios.create({
    withCredentials: true,
    baseURL: APi_URL_GO
})

//  $apigo.interceptors.request.use((config) => {
//      config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
//      return config
//  })

// $apigo.interceptors.response.use((config) => {
//     return config
// }, async (error) => {
//     const originalRequest = error.config
//     if (error.response.status === 401 && error.config && !error.config._isRetry) {
//         originalRequest._isRetry = true;
//         try {
//             const response = await axios.get<AuthResponse>(`${APi_URL}/user/refresh`, { withCredentials: true })
//             localStorage.setItem('token', response.data.accessToken)
//             return $apigo.request(originalRequest)
//         } catch (e) {
//             console.log('Не авторизован')
//         }
//     }
//     throw error
// })



export default $apigo;