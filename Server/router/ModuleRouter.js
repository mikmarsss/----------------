const Router = require('express').Router;
const ModuleController = require('../controllers/module-controller')
const router = new Router()

router.post('/createModule', ModuleController.CreateModule)
router.post('/fetchcoursemodules', ModuleController.fetchCourseModules)
router.post('/fetchcoursemodule', ModuleController.fetchCourseModule)
router.post('/refreshModule', ModuleController.refreshModule)
router.post('/saveModule', ModuleController.saveModule)
router.post('/deleteModule', ModuleController.deleteModule)


module.exports = router