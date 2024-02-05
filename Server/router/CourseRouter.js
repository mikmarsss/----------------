const Router = require('express').Router;
const CoursesController = require('../controllers/courses-controller')
const router = new Router()


router.post('/createCourse', CoursesController.CreateCourse)
router.post('/createModule', CoursesController.CreateModule)
router.get('/refreshCourse', CoursesController.refreshCourse)

module.exports = router