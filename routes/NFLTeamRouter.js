const Router = require('express').Router()

const NFLTeamController = require('../controllers/NFLTeamController')

Router.get('/', NFLTeamController.GetNFLTeams)

module.exports = Router
