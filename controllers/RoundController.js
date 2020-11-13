const { Round } = require ('../db/schema')

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
   resp.send ( round )
}

module.exports = {
   GetRound
}