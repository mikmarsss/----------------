import $api from "../http";
import $apigo from "../http/indexGO";
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

    static async fetchUserCourse(courseId: string): Promise<AxiosResponse<CourseResponse>> {
        return $apigo.post<CourseResponse>('/get-course', { course_id: courseId })
    }

    static async fetchCourseByType(typeId: any, additionaltype: any[]): Promise<AxiosResponse<CourseResponse>> {
        return $apigo.post<CourseResponse>('/get-courses-by-types', { type: typeId, additional_type: additionaltype })
    }

    static async fetchCourseModules(courseId: string): Promise<AxiosResponse<IModule[]>> {
        return $api.post<IModule[]>('/courses/fetchcoursemodules', { courseId })
    }

    static async fetchCourseModule(moduleId: string): Promise<AxiosResponse<ModuleResponse>> {
        return $api.post<ModuleResponse>('/courses/fetchcoursemodule', { moduleId })
    }

}

