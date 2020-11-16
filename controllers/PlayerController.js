const Team = require('../db/models/Team')
const { Player, League, Roster } = require('../db/schema')

// return a single player based on ID
const GetPlayer = async (req, resp) => {
   const player = await Player.findById(req.params.player_id)
   resp.send(player)
}

// return all available players based on team and position
const GetPlayers = async (req, resp) => {
   // get all players who are currently rostered.
   // first we need to know what the current week is
   const league = await League.findOne()
   // now get all rosters for that week
   const rosters = await Roster.find( { week: league.currentWeek } )

   // now build an array of all the objectID's in those rosters
   let playerList = []
   rosters.forEach ( e => playerList = [...playerList, ...e.players] )

   // const team = await NFLTeam.findById ( req.params.nflTeam )
   const pos = req.params.position ? req.params.position.toUpperCase() : 'QB'
   const players = await Player.find({
      team: req.params.nflTeam,
      position: pos,
      _id: { $nin: playerList}
   }).select('name')
   resp.send(players)
}

module.exports = {
   GetPlayer,
   GetPlayers,
}
