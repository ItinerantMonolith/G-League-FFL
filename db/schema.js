const { model } = require('mongoose')

const PlayerSchema = require('./models/Player')
const NFLSchema = require('./models/NFLTeam')
const RoundSchema = require('./models/Round')
const CommentSchema = require('./models/Comment')
const RosterSchema = require('./models/Roster')
const TeamSchema = require('./models/team')
const LeagueSchema = require('./models/League')

const Player = model('players', PlayerSchema)
const NFLTeam = model('nflTeams', NFLSchema)
const Round = model('rounds', RoundSchema)
const Comment = model('comments', CommentSchema)
const Roster = model('rosters', RosterSchema)
const Team = model('teams', TeamSchema)
const League = model('admin', LeagueSchema)

module.exports = {
   Player,
   NFLTeam,
   Round,
   Comment,
   Roster,
   Team,
   League
}