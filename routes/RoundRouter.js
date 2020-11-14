const Router = require('express').Router()
const RoundController = require('../controllers/RoundController')

Router.get('/:round_id', RoundController.GetRound)
Router.get('/teams/:round_id', RoundController.GetTeams)

module.exports = Router
