const ModuleService = require('../service/module-service')

class ModuleController {

    async CreateModule(req, res, next) {
        try {
            const { courseId } = req.body
            const moduleData = await ModuleService.CreateModule(courseId)
            return res.json(moduleData)
        } catch (e) {
            next(e)
        }
    }

    async fetchCourseModules(req, res, next) {
        try {
            const { courseId } = req.body
            const modulesData = await ModuleService.fetchCourseModules(courseId)
            return res.json(modulesData)
        } catch (e) {
            next(e)
        }
    }

    async fetchCourseModule(req, res, next) {
        try {
            const { moduleId } = req.body
            const modulesData = await ModuleService.fetchCourseModule(moduleId)
            return res.json(modulesData)
        } catch (e) {
            next(e)
        }
    }

    async refreshModule(req, res, next) {
        try {
            const { moduleId } = req.body
            const moduleData = await ModuleService.refreshModule(moduleId)
            return res.json(moduleData)
        } catch (e) {
            next(e)
        }
    }

    async saveModule(req, res, next) {
        try {
            const { moduleId, name, description } = req.body
            const moduleData = await ModuleService.saveModule(moduleId, name, description)
            return res.json(moduleData)
        } catch (e) {
            next(e)
        }
    }

    async deleteModule(req, res, next) {
        try {
            const { moduleId } = req.body
            const moduleData = await ModuleService.deleteModule(moduleId)
            return res.json(moduleData)
        } catch (e) {
            next(e)
        }
    }

}

module.exports = new ModuleController()