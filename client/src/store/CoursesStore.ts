import { makeAutoObservable } from "mobx";
import { ICourse } from "../models/ICourse";
import { IModule } from '../models/IModule'
import axios from 'axios'
import { APi_URL } from "../http";
import CoursesService from "../service/CoursesService";
import { CourseResponse } from "../models/response/CoursesResponse";

export default class CourseStore {
    module = {} as IModule
    course = {} as ICourse
    data = {} as ICourse;
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

    async checkCourse() {
        try {
            const response = await axios.get<CourseResponse>(`${APi_URL}/courses/refreshCourse`, { withCredentials: true })
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

    async fetchCourseModules(courseId: string) {
        try {
            const response = await CoursesService.fetchUserCourses(courseId)
            console.log(response)
        } catch (e) {
            console.log(e.response?.data?.message)
        }

    }
}