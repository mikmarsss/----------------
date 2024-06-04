const Router = require('express').Router;
const router = new Router()
const TrainerController = require('../controllers/trainer-controller')

router.post('/fetchUserTrainerInfo', TrainerController.fetchUserTrainerInfo)



module.exports = router