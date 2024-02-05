const CoursesService = require('../service/coursesService')

class CoursesController {
    async CreateCourse(req, res, next) {
        try {
            const { name, price, userId, description, courseContent } = req.body
            if (req.files) {
                const { img } = req.files
                const courseData = await CoursesService.CreateCourse(name, price, userId, description, courseContent, img)
                res.cookie('courseId', courseData.course.id)
                return res.json(courseData)
            } else {
                const courseData = await CoursesService.CreateCourse(name, price, userId, description, courseContent)
                res.cookie('courseId', courseData.course.id)
                return res.json(courseData)
            }
        } catch (e) {
            next(e)
        }
    }

    async CreateModule(req, res, next) {
        try {
            const { courseId, name, description, number } = req.body
            const moduleData = await CoursesService.CreateModule(courseId, name, description, number)
            return res.json(moduleData)
        } catch (e) {
            next(e)
        }
    }

    async refreshCourse(req, res, next) {
        try {
            const { courseId } = req.cookies
            const courseData = await CoursesService.refreshCourse(courseId)
            // res.cookie('courseId', courseData.ID)
            return res.json(courseData)
        } catch (e) {
            next(e)
        }

    }

}

module.exports = new CoursesController()