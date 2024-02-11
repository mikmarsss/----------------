const Router = require('express').Router;
const CoursesController = require('../controllers/courses-controller')
const router = new Router()


router.post('/createCourse', CoursesController.CreateCourse)
router.post('/savecoursedata', CoursesController.SaveCourseData)
router.post('/createModule', CoursesController.CreateModule)
router.get('/refreshCourse', CoursesController.refreshCourse)
router.post('/fetchusercourses', CoursesController.fetchUserCourses)
router.post('/fetchcoursemodules', CoursesController.fetchCourseModules)

module.exports = router