const Router = require('express').Router()

const PlayerRouter = require('./PlayerRouter')
const RoundRouter = require('./RoundRouter')
const RosterRouter = require('./RosterRouter')
const LeagueRouter = require('./LeagueRouter')
const NFLTeamRouter = require('./NFLTeamRouter')

Router.use('/players', PlayerRouter)
Router.use('/round', RoundRouter)
Router.use('/roster', RosterRouter)
Router.use('/league', LeagueRouter)
Router.use('/nfl', NFLTeamRouter)

module.exports = Router
