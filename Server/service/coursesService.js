const { Course_info } = require('../models/user-model')
const { Course_module } = require('../models/user-model')
const { Module_lesson } = require('../models/user-model')
const CourseDto = require('../dtos/course-dto')

class CoursesService {
    async CreateCourse(name, price) {
        const course = await Course_info.create({ name, price });
        const courseDto = new CourseDto(course);

        return { course: courseDto }
    }
}

module.exports = new CoursesService()