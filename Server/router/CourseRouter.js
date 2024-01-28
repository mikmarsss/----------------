const Router = require('express').Router;
const CoursesController = require('../controllers/courses-controller')
const router = new Router()


router.post('/createCourse', CoursesController.CreateCourse)

module.exports = router