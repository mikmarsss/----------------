import $api from "../http";
import { AxiosResponse } from 'axios'
import { CourseResponse } from '../models/response/CoursesResponse'
import { ModuleResponse } from '../models/response/ModuleResponse'
import { ICourse } from "../models/ICourse";
import { IModule } from '../models/IModule'
export default class CoursesService {
    static async createCourse(userId: any): Promise<AxiosResponse<CourseResponse>> {
        return $api.post<CourseResponse>('/courses/createCourse', { userId })
    }

    static async createModule(courseId: string, index: string): Promise<AxiosResponse<ModuleResponse>> {
        return $api.post<ModuleResponse>('/courses/createModule', { courseId, index })
    }

    static async saveCourseData(formdata: any): Promise<AxiosResponse<CourseResponse>> {
        return $api.post<CourseResponse>('/courses/savecoursedata', formdata)
    }

    static async fetchUserCourses(userId: string): Promise<AxiosResponse<ICourse[]>> {
        return $api.post<ICourse[]>('/courses/fetchusercourses', { userId })
    }

    static async fetcCourseModules(courseId: string): Promise<AxiosResponse<IModule[]>> {
        return $api.post<IModule[]>('/courses/fetchusercourses', { courseId })
    }
}
