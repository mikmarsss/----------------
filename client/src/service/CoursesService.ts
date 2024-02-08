import $api from "../http";
import { AxiosResponse } from 'axios'
import { CourseResponse } from '../models/response/CoursesResponse'
import { ModuleResponse } from '../models/response/ModuleResponse'

export default class CoursesService {
    static async createCourse(formdata: any): Promise<AxiosResponse<CourseResponse>> {
        return $api.post<CourseResponse>('/courses/createCourse', formdata)
    }

    static async createModule(courseId: string): Promise<AxiosResponse<ModuleResponse>> {
        return $api.post<ModuleResponse>('/courses/createModule', { courseId })
    }

    static async fetchUserCourses(userId: string): Promise<AxiosResponse<CourseResponse>> {
        return $api.post<CourseResponse>('/courses/fetchusercourses', { userId })
    }
}
