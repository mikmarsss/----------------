const Router = require('express').Router;
const LessonChapterController = require('../controllers/lessonChapter-controller')
const router = new Router()


router.post('/createChapter', LessonChapterController.createChapter)

module.exports = router