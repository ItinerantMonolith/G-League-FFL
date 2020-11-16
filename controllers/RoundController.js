const { Round, League } = require ('../db/schema')

const GetRound = async ( req, resp ) => {
   const round = await Round.findOne( { round: req.params.round_id }).populate([
      {
         path: 'comments',
         populate: {
           path: 'team',
           model: 'teams',
           select: '_id name'
         }
       }]).populate([
       { 
          path: 'results',
          populate: {
             path: 'team',
             model: 'teams',
             select:'_id name',
          }
       }
   ])
   
   round.results.sort( (a, b) => {
      if (a.score > b.score )
         return -1
      else if ( a.score < b.score ) 
         return 1
      else {
         if ( a.team.name < b.team.name ) 
            return -1
         else  
            return 1
      }
   })
   resp.json( round )
}

const GetTeams = async (req, resp) => {
   // return all teams in the given round
   const round = await Round.findOne( { round: req.params.round_id }).populate([
       { 
          path: 'results',
          populate: {
             path: 'team',
             model: 'teams',
             select:'_id name',
          }
       }
   ])
   
   resp.json(round.results)
}

const UpdateFormation = async (req, resp) => {
   // req.params.position is the position #/offset
   // we should only be updating the formation for the last round.
   const league = await League.findOne()
   const round = await Round.findOne({ round: league.currentRound })
   const formation = round.formation
   const position = parseInt(req.params.position)
   formation[ position ] = formation[position] + 1

   await Round.updateOne(
      { _id: round },
      {
         formation: formation
      },
      { upsert: true, new: true }
   )
   resp.send(round)
}



module.exports = {
   GetRound,
   GetTeams,
   UpdateFormation
}
