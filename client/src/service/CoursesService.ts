import $api from "../http";
import { AxiosResponse } from 'axios'
import { CourseResponse } from '../models/response/CoursesResponse'

export default class CoursesService {
    static async createCourse(name: string, price: string): Promise<AxiosResponse<CourseResponse>> {
        return $api.post<CourseResponse>('/courses/createCourse', { name, price })
    }
}
