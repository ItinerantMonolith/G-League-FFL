const { League } = require('../db/schema')

const GetLeague = async (req, resp) => {
   const league = await League.find()
   resp.send( league )
}

const LoadScores = async ( req, resp) => {
   // load the scores for week req.params.week
   
}

const AdvanceWeek = async ( req, resp) => {}

module.exports = {
   GetLeague,
   LoadScores,
   AdvanceWeek
}

const FD_KEY =  process.env.FD_KEY
const FD_BASE = 'https://api.sportsdata.io/api/nfl/fantasy/json/PlayerGameStatsByWeek/2020REG/'       // add {week}/{FD_KEY}