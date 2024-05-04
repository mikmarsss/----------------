const LessonService = require('../service/lesson-service')

class LessonController {

    async fetchModuleLessons(req, res, next) {
        try {
            const { moduleId } = req.body
            const modulesData = await LessonService.fetchModuleLessons(moduleId)
            return res.json(modulesData)
        } catch (e) {
            next(e)
        }
    }

    async createLesson(req, res, next) {
        try {
            const { moduleId, moduleNumber } = req.body
            const lessonData = await LessonService.createLesson(moduleId, moduleNumber)
            return res.json(lessonData)
        } catch (e) {
            next(e)
        }
    }

    async fetchLesson(req, res, next) {
        try {
            const { lessonId } = req.body
            const lessonData = await LessonService.fetchLesson(lessonId)
            return res.json(lessonData)
        } catch (e) {
            next(e)
        }
    }

    async saveLesson(req, res, next) {
        try {
            const { lessonId, name } = req.body
            const lessonData = await LessonService.saveLesson(lessonId, name)
            return res.json(lessonData)
        } catch (e) {
            next(e)
        }
    }

    async deleteLesson(req, res, next) {
        try {
            const { lessonId } = req.body
            const lessonData = await LessonService.deleteLesson(lessonId)
            return res.json(lessonData)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new LessonController()