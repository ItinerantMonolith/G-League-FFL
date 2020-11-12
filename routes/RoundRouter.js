const Router = require('express').Router()
const RoundController = require('../controllers/RoundController')

Router.get('/:round_id', RoundController.GetRound)

module.exports = Router
