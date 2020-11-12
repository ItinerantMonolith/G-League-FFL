const Team = require('../db/models/Team')
const { Player, NFLTeam } = require ('../db/schema')

// return a single player based on ID
const GetPlayer = async (req, resp) => {
   const player = await Player.findById( req.params.player_id )
   resp.send(player)
}


// return all [+== available] players based on team and position
const GetPlayers = async ( req, resp) => {
   // need to get the team first
   const team = await NFLTeam.findOne( { abbreviation: req.query.team })
   const pos = req.query.position ? req.query.position.toUpperCase() : 'QB'
   if ( team ) {
      const players = await Player.find( { team: team, position: pos } ).select('name')
      resp.send(players)
   }
   else
      resp.send( { msg: "Team Not Found" } )
}

module.exports = {
   GetPlayer,
   GetPlayers
}