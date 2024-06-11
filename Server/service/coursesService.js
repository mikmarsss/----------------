const { Course_info, Course_module, Module_lesson, Lesson_Chapter } = require('../models/user-model')
const { Creator } = require('../models/user-model')
const CourseDto = require('../dtos/course-dto')
const { secondMonthStudents } = require('../models/user-model')
const { firstMonthStudents } = require('../models/user-model')
const FirstMonthStudentsDto = require('../dtos/firstMonthStudents-dto')
const SecondMonthStudentsDto = require('../dtos/secondMonthStudents-dto')
const YearIncomeStatDto = require('../dtos/yearIncomeStat-dto')
const { YearIncomeStat } = require('../models/user-model')
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
        const course = await Course_info.create({ name: 'Новый курс', price: 1, creator_id, description: 'Новый курс', rating: '0', people: '0', time: '0', course_content: '1', img: 'fileName', type: '1', additional_type: [1], created_at: time, updated_at: time, new_price: 0 });
        await firstMonthStudents.create({ course_info_id: course.id, one: 0, two: 0, three: 0, four: 0, five: 0, six: 0, seven: 0, eight: 0, nine: 0, ten: 0, eleven: 0, twelve: 0, thirteen: 0, fourteen: 0, fifteen: 0, sixteen: 0, seventeen: 0, eighteen: 0, nineteen: 0, twenty: 0, twentyone: 0, twentytwo: 0, twentythree: 0, twentyfour: 0, twentyfive: 0, twentysix: 0, twentyseven: 0, twentyeight: 0, twentynine: 0, thirty: 0, thirtyone: 0, })
        await secondMonthStudents.create({ course_info_id: course.id, one: 0, two: 0, three: 0, four: 0, five: 0, six: 0, seven: 0, eight: 0, nine: 0, ten: 0, eleven: 0, twelve: 0, thirteen: 0, fourteen: 0, fifteen: 0, sixteen: 0, seventeen: 0, eighteen: 0, nineteen: 0, twenty: 0, twentyone: 0, twentytwo: 0, twentythree: 0, twentyfour: 0, twentyfive: 0, twentysix: 0, twentyseven: 0, twentyeight: 0, twentynine: 0, thirty: 0, thirtyone: 0, })
        await YearIncomeStat.create({ course_info_id: course.id, created_at: time, updated_at: time })
        const courseDto = new CourseDto(course);
        return { course: courseDto }
    }

    async SaveCourseData(name, price, courseId, description, courseContent, type, additional_type, img) {
        const course = await Course_info.findOne({ where: { id: courseId } })
        if (img !== undefined) {
            let deleteImg = course.img
            if (deleteImg !== 'fileName') {
                fs.unlinkSync(path.resolve(__dirname, '..', 'static', deleteImg))
                let fileName = uuid.v4() + ".jpg";
                img.mv(path.resolve(__dirname, '..', 'static', fileName))
                course.update({ img: fileName }, { where: { id: courseId } })
            }
            else {
                let fileName = uuid.v4() + ".jpg";
                img.mv(path.resolve(__dirname, '..', 'static', fileName))
                course.update({ img: fileName }, { where: { id: courseId } })
            }
        }
        const time = Math.floor(Date.now() / 1000)
        course.update({ updated_at: time }, { where: { id: courseId } })
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

    async fetchMonthStat(course_info_id) {
        const _1stmonth = await firstMonthStudents.findOne({ where: { course_info_id: course_info_id } })
        const _2ndmonth = await secondMonthStudents.findOne({ where: { course_info_id: course_info_id } })
        const months = [_1stmonth, _2ndmonth]
        return { months }
    }

    async fetchYearIncome(course_info_id) {
        const yearIncomeData = await YearIncomeStat.findOne({ where: { course_info_id: course_info_id } })
        const yearIncomeDto = new YearIncomeStatDto(yearIncomeData)
        return { yearIncome: yearIncomeDto }
    }

    async deleteCourse(course_info_id) {
        await Course_info.destroy({ where: { id: course_info_id } })
        return { message: 'Все удалено' }
    }
}

module.exports = new CoursesService()