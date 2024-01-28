const CoursesService = require('../service/coursesService')

class CoursesController {
    async CreateCourse(req, res, next) {
        try {
            const { name, price, userId } = req.body
            const courseData = await CoursesService.CreateCourse(name, price, userId)
            return res.json(courseData)
        } catch (e) {
            next(e)
        }

    }
}

module.exports = new CoursesController()