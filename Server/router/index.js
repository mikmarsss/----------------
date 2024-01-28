const Router = require('express').Router;
const router = new Router()
const userRouter = require('./UserRouter')
const courseRouter = require('./CourseRouter')
router.use('/user', userRouter)
router.use('/courses', courseRouter)
module.exports = router