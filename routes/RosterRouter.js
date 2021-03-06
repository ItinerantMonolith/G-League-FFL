const Router = require('express').Router()
const RosterController = require('../controllers/RosterController')

Router.get('/scores/:week', RosterController.getRosterScores)
Router.get('/week/:week', RosterController.getTeamsByWeek)
Router.get('/:team/:week', RosterController.GetRoster)
Router.put('/:roster_id/:player_id', RosterController.AddPlayer)
Router.delete('/:roster_id/:player_id', RosterController.RemovePlayer)

module.exports = Router