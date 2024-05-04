const Router = require('express').Router;
const LessonChapterController = require('../controllers/lessonChapter-controller')
const router = new Router()


router.post('/createChapter', LessonChapterController.createChapter)
router.post('/fetchChapter', LessonChapterController.fetchChapter)
router.post('/fetchChapters', LessonChapterController.fetchChapters)
router.post('/saveChapter', LessonChapterController.saveChapter)

module.exports = router