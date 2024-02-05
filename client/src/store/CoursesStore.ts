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
    constructor() {
        makeAutoObservable(this)
    }
    setCourse(course: ICourse) {
        this.course = course
    }

    setModule(module: IModule) {
        this.module = module
    }

    async createCourse(formdata: any) {
        try {
            const response = await CoursesService.createCourse(formdata)
            localStorage.setItem('courseId', response.data.course.id)
            console.log(response)
            this.setCourse(response.data.course)
        } catch (e) {
            console.log(e.response?.data?.message)
        }
    }

    async createModule(courseId: string) {
        try {
            const response = await CoursesService.createModule(courseId)
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
}