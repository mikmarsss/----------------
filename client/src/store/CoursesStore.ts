import { makeAutoObservable } from "mobx";
import { ICourse } from "../models/ICourse";
import axios from 'axios'
import { APi_URL } from "../http";
import CoursesService from "../service/CoursesService";

export default class CourseStore {
    course = {} as ICourse
    constructor() {
        makeAutoObservable(this)
    }
    setCourse(course: ICourse) {

        this.course = course
    }

    async createCourse(name: string, price: string) {
        try {
            const response = await CoursesService.createCourse(name, price)
            console.log(response)
            this.setCourse(response.data.course)
        } catch (e) {
            console.log(e.response?.data?.message)
        }
    }
}