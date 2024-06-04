const Router = require('express').Router;
const router = new Router()
const userRouter = require('./UserRouter')
const courseRouter = require('./CourseRouter')
const chapterRouter = require('./ChapterRouter')
const moduleRouter = require('./ModuleRouter')
const lessonRouter = require('./LessonRouter')
const trainerrouter = require('./TrainerRouter')

router.use('/user', userRouter)
router.use('/courses', courseRouter)
router.use('/chapter', chapterRouter)
router.use('/module', moduleRouter)
router.use('/lesson', lessonRouter)
router.use('/trainer', trainerrouter)

module.exports = router