const uuid = require('uuid')
const path = require('path')
const fs = require('fs')
const ModuleDto = require('../dtos/model-dto')
const { Course_info } = require('../models/user-model')
const { Course_module } = require('../models/user-model')

class ModuleService {

    async CreateModule(courseId) {
        const time = Math.floor(Date.now() / 100)
        let firstmodule = await Course_module.findOne({ where: { course_info_id: courseId } })
        if (!firstmodule) {
            firstmodule = await Course_module.create({ number: 1, course_info_id: courseId, name: "Новый Модуль", description: "Черновик", created_at: time, updated_at: time })
            const moduleeDto = new ModuleDto(firstmodule)
            return { module: moduleeDto }
        }
        const predmodulee = await Course_module.findOne({ where: { course_info_id: courseId }, order: [['created_at', 'DESC']] })
        const index = predmodulee.number + 1
        const newmodulee = await Course_module.create({ number: index, course_info_id: courseId, name: "Новый Модуль", description: "Черновик", created_at: time, updated_at: time })
        const moduleeDto = new ModuleDto(newmodulee)
        return { module: moduleeDto }
    }

    async fetchCourseModules(courseId) {
        const modules = await Course_module.findAll({
            where: { course_info_id: courseId }, order: [['number', 'ASC']]
        })
        return { modules }
    }

    async fetchCourseModule(moduleId) {
        const modules = await Course_module.findOne({ where: { id: moduleId } })
        const modelDto = new ModuleDto(modules)

        return { module: modelDto }
    }

    async refreshModule(moduleId) {
        const modulee = await Course_module.findOne({ where: { id: moduleId } })

        const moduleDto = new ModuleDto(modulee)
        return { module: moduleDto }
    }

    async saveModule(moduleId, name, description) {
        const modulee = await Course_module.findOne({ where: { id: moduleId } })
        modulee.update({ name: name }, { where: { id: moduleId } })
        modulee.update({ description: description }, { where: { id: moduleId } })
        const moduleDto = new ModuleDto(modulee)
        return { module: moduleDto }
    }

    async deleteModule(moduleId) {
        const modulee = await Course_module.findOne({ where: { id: moduleId } })
        modulee.destroy()
    }
}

module.exports = new ModuleService()