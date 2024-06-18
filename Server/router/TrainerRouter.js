const Router = require('express').Router;
const router = new Router()
const TrainerController = require('../controllers/trainer-controller')

router.post('/fetchUserTrainerInfo', TrainerController.fetchUserTrainerInfo)
router.post('/createTrainer', TrainerController.createTrainer)
router.post('/fetchTrainer', TrainerController.fetchTrainer)
router.post('/codeCompiler', TrainerController.codeCompiler)
router.post('/saveTrainerData', TrainerController.saveTrainerData)
router.post('/fetchAllUserTrainers', TrainerController.fetchAllUserTrainers)
router.post('/deleteTrainer', TrainerController.deleteTrainer)
router.post('/publishTrainer', TrainerController.publishTrainer)
router.get('/fetchAllTrainers', TrainerController.fetchAllTrainers)
router.post('/saveDoneTrainers', TrainerController.saveDoneTrainers)
router.post('/fetchDoneTrainer', TrainerController.fetchDoneTrainer)
router.post('/createDoneTrainer', TrainerController.createDoneTrainer)


module.exports = router