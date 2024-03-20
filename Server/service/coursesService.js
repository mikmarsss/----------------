const { Course_info } = require('../models/user-model')
const { Course_module } = require('../models/user-model')
const { Module_lesson } = require('../models/user-model')
const { Creator } = require('../models/user-model')
const CourseDto = require('../dtos/course-dto')
const uuid = require('uuid')
const path = require('path')
const fs = require('fs')
const { DATE, where } = require('sequelize')
const ModuleDto = require('../dtos/model-dto')
const LessonDto = require('../dtos/lesson-dto')
class CoursesService {


    async CreateCourse(userId) {
        const creator = await Creator.findOne({ where: { user_id: userId } })
        if (!creator) {
            await Creator.create({ user_id: userId })
        }
        const findCreatorId = await Creator.findOne({
            where: { user_id: userId }
        })
        const creator_id = findCreatorId.id
        const time = Math.floor(Date.now() / 1000)
        const course = await Course_info.create({ name: '1', price: 1, creator_id, description: '1', rating: '0', people: '0', time: '0', course_content: '1', img: 'fileName', type: '1', additional_type: [1], created_at: time, updated_at: time });
        const courseDto = new CourseDto(course);
        return { course: courseDto }
    }

    async SaveCourseData(name, price, courseId, description, courseContent, img, type, additional_type) {
        const course = await Course_info.findOne({ where: { id: courseId } })
        let deleteImg = course.img
        if (deleteImg !== "fileName") {
            fs.unlinkSync(path.resolve(__dirname, '..', 'static', deleteImg))
        }
        const time = Math.floor(Date.now() / 1000)
        let fileName = uuid.v4() + ".jpg";
        img.mv(path.resolve(__dirname, '..', 'static', fileName))
        course.update({ updated_at: time }, { where: { id: courseId } })
        course.update({ img: fileName }, { where: { id: courseId } })
        course.update({ name: name }, { where: { id: courseId } })
        course.update({ price: price }, { where: { id: courseId } })
        course.update({ description: description }, { where: { id: courseId } })
        course.update({ course_content: courseContent }, { where: { id: courseId } })
        course.update({ type: type }, { where: { id: courseId } })
        course.update({ additional_type: additional_type }, { where: { id: courseId } })
        const courseDto = new CourseDto(course);
        return { course: courseDto }
    }

    async CreateModule(courseId, index) {
        const time = Math.floor(Date.now() / 1000)
        const modulee = await Course_module.create({ number: index, course_info_id: courseId, name: "Новый Модуль", description: "Черновик", created_at: time, updated_at: time })
        const moduleeDto = new ModuleDto(modulee)
        return { module: moduleeDto }
    }

    async refreshCourse(courseId) {
        const course = await Course_info.findOne({ where: { id: courseId } })
        const courseDto = new CourseDto(course)
        return { course: courseDto }
    }

    async fetchUserCourses(userId) {
        const creator = await Creator.findOne({ where: { user_id: userId } })
        const creatorId = creator.id
        const courses = await Course_info.findAll({ where: { creator_id: creatorId } })
        return { courses }
    }

    async fetchCourseModules(courseId) {
        const modules = await Course_module.findAll({ where: { course_info_id: courseId } })

        return { modules }
    }

    async fetchCourseModule(moduleId) {
        const modules = await Course_module.findOne({ where: { id: moduleId } })
        const modelDto = new ModuleDto(modules)

        return { module: modelDto }
    }

    async fetchModuleLessons(moduleId) {
        const lessons = await Module_lesson.findAll({ where: { course_module_id: moduleId } })
        return { lessons }
    }

    async createLesson(moduleId, lessonIndex) {
        const time = Math.floor(Date.now() / 1000)
        const lesson = await Module_lesson.create({ number: lessonIndex, name: "Черновик", img: "logo.svg", content: "Черновик", material: "Черновик", numberModule: "1", created_at: time, updated_at: time, course_module_id: moduleId })
        const lessonDto = new LessonDto(lesson)
        return { lesson: lessonDto }
    }

    async fetchLesson(lessonId) {
        const lesson = await Module_lesson.findOne({ where: { id: lessonId } })
        const lessonDto = new LessonDto(lesson)
        return { lesson: lessonDto }
    }

    async saveLesson(lessonId, img, name, content) {
        const lesson = await Module_lesson.findOne({ where: { id: lessonId } })
        let deleteImg = lesson.img

        if (deleteImg !== "logo.svg") {
            fs.unlinkSync(path.resolve(__dirname, '..', 'static', deleteImg))
        }
        const time = Math.floor(Date.now() / 1000)
        let fileName = uuid.v4() + ".jpg";
        img.mv(path.resolve(__dirname, '..', 'static', fileName))
        lesson.update({ updated_at: time }, { where: { id: lessonId } })
        lesson.update({ img: fileName }, { where: { id: lessonId } })
        lesson.update({ name: name }, { where: { id: lessonId } })
        lesson.update({ content: content }, { where: { id: lessonId } })

        const lessonDto = new LessonDto(lesson)
        return { lesson: lessonDto }
    }
}

module.exports = new CoursesService()