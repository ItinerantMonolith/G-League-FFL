const Router = require('express').Router()

const LeagueController = require('../controllers/LeagueController')

Router.get('/', LeagueController.GetLeague)
Router.put('/loadscores/:week', LeagueController.LoadScores)
Router.put('/advanceweek', LeagueController.AdvanceWeek)

module.exports = Router
