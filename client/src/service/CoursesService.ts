import $api from "../http";
import $apigo from "../http/indexGO";
import { AxiosResponse } from 'axios'
import { CourseResponse } from '../models/response/CoursesResponse'
import { ModuleResponse } from '../models/response/ModuleResponse'
import { ICourse } from "../models/ICourse";
import { IModule } from '../models/IModule'
import { ILesson } from "../models/ILesson";
import { LessonResponse } from "../models/response/LessonResponse";
export default class CoursesService {
    static async createCourse(userId: any): Promise<AxiosResponse<CourseResponse>> {
        return $api.post<CourseResponse>('/courses/createCourse', { userId })
    }

    static async createModule(courseId: string, index: string): Promise<AxiosResponse<ModuleResponse>> {
        return $api.post<ModuleResponse>('/module/createModule', { courseId, index })
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
        return $api.post<IModule[]>('/module/fetchcoursemodules', { courseId })
    }

    static async fetchCourseModule(moduleId: string): Promise<AxiosResponse<ModuleResponse>> {
        return $api.post<ModuleResponse>('/module/fetchcoursemodule', { moduleId })
    }

    static async fetchModuleLessons(moduleId: string): Promise<AxiosResponse<ILesson[]>> {
        return $api.post<ILesson[]>('/lesson/fetchmodulelessons', { moduleId, })
    }

    static async createLesson(moduleId: string, moduleNumber: any): Promise<AxiosResponse<ILesson>> {
        return $api.post<ILesson>('/lesson/createlesson', { moduleId, moduleNumber })
    }

    static async fetchLesson(lessonId: string): Promise<AxiosResponse<LessonResponse>> {
        return $api.post<LessonResponse>('/lesson/fetchlesson', { lessonId })
    }

    static async saveLesson(formdata: any): Promise<AxiosResponse<LessonResponse>> {
        return $api.post<LessonResponse>('/lesson/savelesson', { formdata })
    }

    static async refreshModule(moduleId: string): Promise<AxiosResponse<ModuleResponse>> {
        return $api.post<ModuleResponse>('/module/refreshModule', { moduleId })
    }

    static async refreshLesson(lessonId: string): Promise<AxiosResponse<LessonResponse>> {
        return $api.post<LessonResponse>('/lesson/savelesson', { lessonId })
    }

    static async saveModule(moduleId: string, name: string, description: string): Promise<AxiosResponse<ModuleResponse>> {
        return $api.post<ModuleResponse>('/module/saveModule', { moduleId, name, description })
    }

    static async deleteModule(moduleId: string): Promise<AxiosResponse<ModuleResponse>> {
        return $api.post<ModuleResponse>('/module/deleteModule', { moduleId })
    }
}

