const { NFLTeam } = require ('../db/schema')



const GetNFLTeams = async ( req, resp ) => {
   const teams = await NFLTeam.find().sort( 'name' )
   resp.send( teams )
}

  module.exports = {
   GetNFLTeams
}
