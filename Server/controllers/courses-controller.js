const CoursesService = require('../service/coursesService')

class CoursesController {
    async CreateCourse(req, res, next) {
        try {
            const { name, price } = req.body
            const courseData = await CoursesService.CreateCourse(name, price)
            return res.json(courseData)
        } catch (e) {
            next(e)
        }

    }
}

module.exports = new CoursesController()