const Router = require('express').Router;
const CoursesController = require('../controllers/courses-controller')
const router = new Router()


router.post('/createCourse', CoursesController.CreateCourse)
router.post('/savecoursedata', CoursesController.SaveCourseData)
router.post('/refreshCourse', CoursesController.refreshCourse)
router.post('/fetchusercourses', CoursesController.fetchUserCourses)
router.post('/fetchMonthStat', CoursesController.fetchMonthStat)
router.post('/fetchYearIncome', CoursesController.fetchYearIncome)
router.post('/deleteCourse', CoursesController.deleteCourse)


module.exports = router