const { Course_info } = require('../models/user-model')
const { Creator } = require('../models/user-model')
const CourseDto = require('../dtos/course-dto')
const uuid = require('uuid')
const path = require('path')
const fs = require('fs')

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

}

module.exports = new CoursesService()