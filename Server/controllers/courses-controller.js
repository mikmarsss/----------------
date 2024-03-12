const CoursesService = require('../service/coursesService')

class CoursesController {
    async CreateCourse(req, res, next) {
        try {
            const { userId } = req.body
            const courseData = await CoursesService.CreateCourse(userId)
            return res.json(courseData)

        } catch (e) {
            next(e)
        }
    }

    async SaveCourseData(req, res, next) {
        try {
            const { name, price, courseId, description, courseContent, type, additional_type } = req.body
            const { img } = req.files
            const courseData = await CoursesService.SaveCourseData(name, price, courseId, description, courseContent, img, type, additional_type)
            return res.json(courseData)

        } catch (e) {
            next(e)
        }
    }

    async CreateModule(req, res, next) {
        try {
            const { courseId, index } = req.body
            const moduleData = await CoursesService.CreateModule(courseId, index)
            return res.json(moduleData)
        } catch (e) {
            next(e)
        }
    }

    async refreshCourse(req, res, next) {
        try {
            const { courseId } = req.body
            const courseData = await CoursesService.refreshCourse(courseId)
            return res.json(courseData)
        } catch (e) {
            next(e)
        }

    }

    async fetchUserCourses(req, res, next) {
        try {
            const { userId } = req.body
            const coursesData = await CoursesService.fetchUserCourses(userId)
            return res.json(coursesData)
        } catch (e) {
            next(e)
        }
    }

    async fetchCourseModules(req, res, next) {
        try {
            const { courseId } = req.body
            const modulesData = await CoursesService.fetchCourseModules(courseId)
            return res.json(modulesData)
        } catch (e) {
            next(e)
        }
    }

    async fetchCourseModule(req, res, next) {
        try {
            const { moduleId } = req.body
            const modulesData = await CoursesService.fetchCourseModule(moduleId)
            return res.json(modulesData)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new CoursesController()