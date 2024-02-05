const { Course_info } = require('../models/user-model')
const { Course_module } = require('../models/user-model')
const { Module_lesson } = require('../models/user-model')
const { Creator } = require('../models/user-model')
const CourseDto = require('../dtos/course-dto')
const uuid = require('uuid')
const path = require('path')
class CoursesService {


    async CreateCourse(name, price, userId, description, courseContent, img) {
        const creator = await Creator.findOne({ where: { userId } })
        if (!creator) {
            await Creator.create({ userId })
        }
        const findCreatorId = await Creator.findOne({
            where: { userId }
        })
        const creatorId = findCreatorId.id
        let fileName = uuid.v4() + ".jpg";
        img.mv(path.resolve(__dirname, '..', 'static', fileName))
        const course = await Course_info.create({ name, price, creatorId, description, courseContent, img: fileName });
        const courseDto = new CourseDto(course);
        return { course: courseDto }
    }

    async CreateModule(courseId, name, description, number) {

    }

    async refreshCourse(courseId) {
        const course = await Course_info.findOne({ where: { id: courseId } })
        const courseDto = new CourseDto(course)
        return { course: courseDto }
    }
}

module.exports = new CoursesService()