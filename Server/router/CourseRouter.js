const Router = require('express').Router;
const CoursesController = require('../controllers/courses-controller')
const router = new Router()


router.post('/createCourse', CoursesController.CreateCourse)
router.post('/savecoursedata', CoursesController.SaveCourseData)
router.post('/createModule', CoursesController.CreateModule)
router.post('/refreshCourse', CoursesController.refreshCourse)
router.post('/fetchusercourses', CoursesController.fetchUserCourses)
router.post('/fetchcoursemodules', CoursesController.fetchCourseModules)
router.post('/fetchcoursemodule', CoursesController.fetchCourseModule)
router.post('/fetchmodulelessons', CoursesController.fetchModuleLessons)
router.post('/createlesson', CoursesController.createLesson)
router.post('/fetchlesson', CoursesController.fetchLesson)
router.post('/savelesson', CoursesController.saveLesson)

module.exports = router