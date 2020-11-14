const Router = require('express').Router()
const PlayerController = require('../controllers/PlayerController')


Router.get('/:player_id', PlayerController.GetPlayer)
Router.get('/:nflTeam/:position', PlayerController.GetPlayers)


module.exports = Router
