const Router = require('express').Router;
const router = new Router()
const userRouter = require('./UserRouter')
const courseRouter = require('./CourseRouter')
const chapterRouter = require('./ChapterRouter')
const moduleRouter = require('./ModuleRouter')
const lessonRouter = require('./LessonRouter')


router.use('/user', userRouter)
router.use('/courses', courseRouter)
router.use('/chapter', chapterRouter)
router.use('/module', moduleRouter)
router.use('/lesson', lessonRouter)

module.exports = router