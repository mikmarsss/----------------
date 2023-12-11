const Router = require('express').Router;
const router = new Router()
const userRouter = require('./UserRouter')

router.use('/user', userRouter)
module.exports = router