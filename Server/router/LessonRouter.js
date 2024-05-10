const Router = require('express').Router;
const LessonController = require('../controllers/lesson-controller')
const router = new Router()

router.post('/fetchmodulelessons', LessonController.fetchModuleLessons)
router.post('/createlesson', LessonController.createLesson)
router.post('/fetchlesson', LessonController.fetchLesson)
router.post('/savelesson', LessonController.saveLesson)
router.post('/deleteLesson', LessonController.deleteLesson)




module.exports = router