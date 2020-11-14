const Team = require('../db/models/Team')
const { Player, NFLTeam } = require('../db/schema')

// return a single player based on ID
const GetPlayer = async (req, resp) => {
   console.log('in getPlayer')
   const player = await Player.findById(req.params.player_id)
   resp.send(player)
}

// return all [+== available] players based on team and position
const GetPlayers = async (req, resp) => {
   // need to get the team first
   

   // const team = await NFLTeam.findById ( req.params.nflTeam )
   const pos = req.params.position ? req.params.position.toUpperCase() : 'QB'
   const players = await Player.find({
      team: req.params.nflTeam,
      position: pos,
   }).select('name')
   resp.send(players)
}

module.exports = {
   GetPlayer,
   GetPlayers,
}
