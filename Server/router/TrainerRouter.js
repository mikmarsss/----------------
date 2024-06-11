const Router = require('express').Router;
const router = new Router()
const TrainerController = require('../controllers/trainer-controller')

router.post('/fetchUserTrainerInfo', TrainerController.fetchUserTrainerInfo)
router.post('/createTrainer', TrainerController.createTrainer)
router.post('/fetchTrainer', TrainerController.fetchTrainer)
router.post('/codeCompiler', TrainerController.codeCompiler)
router.post('/saveTrainerData', TrainerController.saveTrainerData)


module.exports = router