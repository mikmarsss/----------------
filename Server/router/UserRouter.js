const Router = require('express').Router;
const userController = require('../controllers/user-controller')
const router = new Router()
const { body } = require('express-validator')
const authMiddleware = require('../middlewares/auth-middleware')

router.post(
    '/registration',
    body('email').isEmail(),
    body('password').isLength({ min: 6, max: 32 }),
    userController.registration
)

router.post('/login', userController.login)
router.post('/save', userController.saveData)
router.post('/logout', userController.logout)
router.post('/sendChangePasswordCode', userController.sendChangePasswordCode)
router.post('/changePassword', userController.changePassword)
router.post('/savetestresult', userController.saveTestResult)
router.post('/changeEmail', userController.changeEmail)

router.get('/activate/:link', userController.activate)
router.get('/refresh', userController.refresh)





module.exports = router