import { makeAutoObservable } from "mobx";
import { ICourse } from "../models/ICourse";
import { IModule } from '../models/IModule'
import axios from 'axios'
import { APi_URL } from "../http";
import CoursesService from "../service/CoursesService";
import { CourseResponse } from "../models/response/CoursesResponse";
import { ILesson } from "../models/ILesson";

export default class CourseStore {
    module = {} as IModule
    course = {} as ICourse
    data = {} as ICourse;
    lesson = {} as ILesson

    constructor() {
        makeAutoObservable(this)
    }
    setCourse(course: ICourse) {
        this.course = course
    }

    setData(data: ICourse) {
        this.data = data
    }

    setModule(module: IModule) {
        this.module = module
    }

    setLesson(lesson: ILesson) {
        this.lesson = lesson
    }

    async createCourse(userId: string) {
        try {
            const response = await CoursesService.createCourse(userId)
            localStorage.setItem('courseId', response.data.course.id)
            console.log(response)
            this.setCourse(response.data.course)
        } catch (e) {
            console.log(e.response?.data?.message)
        }
    }

    async saveCourseData(formdata: any) {
        try {
            const response = await CoursesService.saveCourseData(formdata)
            localStorage.setItem('courseId', response.data.course.id)
            console.log(response)
            this.setCourse(response.data.course)
        } catch (e) {
            console.log(e.response?.data?.message)
        }
    }

    async createModule(courseId: string, index: string) {
        try {
            const response = await CoursesService.createModule(courseId, index)
            console.log(response)
            this.setModule(response.data.module)
        } catch (e) {
            console.log(e.response?.data?.message)
        }
    }

    async checkCourse(courseId: string) {
        try {
            const response = await axios.post<CourseResponse>(`${APi_URL}/courses/refreshCourse`, { courseId }, { withCredentials: true })
            console.log(response)
            localStorage.setItem('courseId', response.data.course.id)
            this.setCourse(response.data.course)
        } catch (e) {
            console.log(e.response?.data?.message)
        }
    }

    async fetchUserCourses(userId: string) {
        try {
            const response = await CoursesService.fetchUserCourses(userId)
            console.log(response)
        } catch (e) {
            console.log(e.response?.data?.message)
        }

    }

    async fetchUserCourse(course_id: string) {
        try {
            const response = await CoursesService.fetchUserCourse(course_id)
            localStorage.setItem('courseId', response.data.course.id)
            console.log(response)
            this.setCourse(response.data.course)
        } catch (e) {
            console.log(e.response?.data?.message)
        }

    }

    async fetchCourseByType(course_id: any) {
        try {
            const additionaltype = new Array()
            const response = await CoursesService.fetchCourseByType(course_id, additionaltype)
            console.log(response)
            this.setCourse(response.data.course)
        } catch (e) {
            console.log(e.response?.data?.message)
        }

    }

    async fetchCourseModules(courseId: string) {
        try {
            const response = await CoursesService.fetchCourseModules(courseId)
            console.log(response)
        } catch (e) {
            console.log(e.response?.data?.message)
        }

    }

    async fetchCourseModule(moduleId: string) {
        try {
            const response = await CoursesService.fetchCourseModule(moduleId)
            console.log(response)
            this.setModule(response.data.module)
        } catch (e) {
            console.log(e.response?.data?.message)
        }

    }

    async fetchModuleLessons(moduleId: string) {
        try {
            const response = await CoursesService.fetchModuleLessons(moduleId)
            console.log(response)
        } catch (e) {
            console.log(e.response?.data?.message)
        }

    }

    async createLesson(moduleId: string, lessonIndex: any) {
        try {
            const response = await CoursesService.createLesson(moduleId, lessonIndex)
            console.log(response)
        } catch (e) {
            console.log(e.response?.data?.message)
        }

    }

    async fetchLesson(lessonId: string) {
        try {
            const response = await CoursesService.fetchLesson(lessonId)
            console.log(response)
            this.setLesson(response.data.lesson)
        } catch (e) {
            console.log(e.response?.data?.message)
        }
    }

    async saveLesson(formdata: any) {
        try {
            const response = await CoursesService.saveLesson(formdata)
            console.log(response)
            this.setLesson(response.data.lesson)
        } catch (e) {
            console.log(e.response?.data?.message)
        }
    }
}