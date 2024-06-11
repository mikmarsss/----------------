import $api from "../http";
import $apigo from "../http/indexGO";
import { AxiosResponse } from 'axios'
import { CourseResponse } from '../models/response/CoursesResponse'
import { ModuleResponse } from '../models/response/ModuleResponse'
import { ICourse } from "../models/ICourse";
import { IModule } from '../models/IModule'
import { ILesson } from "../models/ILesson";
import { LessonResponse } from "../models/response/LessonResponse";
import { ChapterResponse } from "../models/response/ChapterResponse";
import { IChapter } from "../models/IChapter";
import { MonthStatResponse } from "../models/response/MonthStatResponse";
import { YearIncomeStatResponse } from "../models/response/YearIncomeStatResponse";

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

    static async saveLesson(lessonId: string, name: string): Promise<AxiosResponse<LessonResponse>> {
        return $api.post<LessonResponse>('/lesson/savelesson', { lessonId, name })
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

    static async createChapter(course_lesson_id: string): Promise<AxiosResponse<ChapterResponse>> {
        return $api.post<ChapterResponse>('/chapter/createChapter', { course_lesson_id })
    }

    static async fetchChapter(chapter_id: string): Promise<AxiosResponse<ChapterResponse>> {
        return $api.post<ChapterResponse>('/chapter/fetchChapter', { chapter_id })
    }

    static async fetchChapters(course_lesson_id: string): Promise<AxiosResponse<IChapter[]>> {
        return $api.post<IChapter[]>('/chapter/fetchChapters', { course_lesson_id })
    }

    static async saveChapter(formdata: any): Promise<AxiosResponse<ChapterResponse>> {
        return $api.post<ChapterResponse>('/chapter/saveChapter', formdata)
    }

    static async deleteLesson(lessonId: string): Promise<AxiosResponse<LessonResponse>> {
        return $api.post<LessonResponse>('/lesson/deleteLesson', { lessonId })
    }

    static async fetchMonthStat(course_info_id: string): Promise<AxiosResponse<MonthStatResponse>> {
        return $api.post<MonthStatResponse>('/courses/fetchMonthStat', { course_info_id })
    }

    static async fetchYearIncome(course_info_id: string): Promise<AxiosResponse<YearIncomeStatResponse>> {
        return $api.post<YearIncomeStatResponse>('/courses/fetchYearIncome', { course_info_id })
    }

    static async deleteCourse(course_info_id: string): Promise<AxiosResponse<string>> {
        return $api.post<string>('/courses/deleteCourse', { course_info_id })
    }
}

