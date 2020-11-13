const { Roster, Player } = require('../db/schema')

// add player :player_id to roster :roster_id
const AddPlayer = async (req, resp) => {
   const { roster_id, player_id } = req.params

   const player = await Player.findById( player_id)
   const result = await Roster.updateOne(
      { _id: roster_id },
      {
         $push: {
            players: player,
            actions: { action: 'add', player: player }
         }
      },
      { upsert: true, new: true }
   )
   if ( result.nModified === 1 ) {
      const roster = await Roster.findById( roster_id )
      resp.send( roster )
   }
   else {
      resp.send( { msg: "Unable to update roster." } )
   }  
}


// remove player :player_id to roster :roster_id
const RemovePlayer = async (req, resp) => {
   const { roster_id, player_id } = req.params
   const result = await Roster.updateOne(
      { _id: roster_id },
      {
         $pull: {
            players: player_id 
         },
         $push: {
            actions: { action: 'drop', player: player_id }
         }
      },
      { upsert: true, new: true }
   )
   if ( result.nModified === 1 ) {
      const roster = await Roster.findById( roster_id )
      resp.send( roster )
   }
   else {
      resp.send( { msg: "Unable to update roster." } )
   }
}

/* do we ever need to get a roster by ID? 
const GetRoster = async (req, resp) => {
   const roster = await Roster.findById( req.params.roster_id).sort( "sortPos name" )
   resp.send( roster )
}
*/


// get a roster by team and week...sort by position, player name
const GetRoster = async (req, resp) => {
   const roster = await Roster.find( { week: req.params.week, team: req.params.team } ).sort( "sortPos name" )
   resp.send( roster )
}


module.exports = {
   AddPlayer,
   RemovePlayer,
   GetRoster,
}