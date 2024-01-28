const { Course_info } = require('../models/user-model')
const { Course_module } = require('../models/user-model')
const { Module_lesson } = require('../models/user-model')
const { Creator } = require('../models/user-model')
const CourseDto = require('../dtos/course-dto')

class CoursesService {
    async CreateCourse(name, price, userId) {
        const creator = await Creator.findOne({ where: { userId } })
        if (creator) {
            const findCreatorId = await Creator.findOne({
                where: { userId }
            })
            const creatorId = findCreatorId.id
            const course = await Course_info.create({ name, price, creatorId });
            const courseDto = new CourseDto(course);
            return { course: courseDto }
        }
        await Creator.create({ userId })
        const findCreatorId = await Creator.findOne({
            where: { userId }
        })
        const creatorId = findCreatorId.id
        const course = await Course_info.create({ name, price, creatorId });
        const courseDto = new CourseDto(course);
        return { course: courseDto }
    }
}

module.exports = new CoursesService()