const uuid = require('uuid')
const path = require('path')
const fs = require('fs')
const LessonDto = require('../dtos/lesson-dto')
const { Module_lesson } = require('../models/user-model')


class LessonService {
    async fetchModuleLessons(moduleId) {
        const lessons = await Module_lesson.findAll({ where: { course_module_id: moduleId } })
        return { lessons }
    }

    async createLesson(moduleId, moduleNumber) {
        const time = Math.floor(Date.now() / 100)
        let firstLesson = await Module_lesson.findOne({ where: { course_module_id: moduleId } })
        if (!firstLesson) {
            firstLesson = await Module_lesson.create({ number: 1, name: "Новый урок", content: "Черновик", numberModule: moduleNumber, created_at: time, updated_at: time, course_module_id: moduleId })
            const lessonDto = new LessonDto(firstLesson)
            return { lesson: lessonDto }
        }
        const predLesson = await Module_lesson.findOne({ where: { course_module_id: moduleId }, order: [['created_at', 'DESC']] })
        const index = predLesson.number + 1
        const newLesson = await Module_lesson.create({ number: index, course_module_id: moduleId, name: "Новый урок", content: "Черновик", numberModule: moduleNumber, created_at: time, updated_at: time })
        const lessonDto = new LessonDto(newLesson)
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

module.exports = new LessonService()