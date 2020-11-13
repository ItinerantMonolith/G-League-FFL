const { League, Player, Round, Roster } = require('../db/schema')
const axios = require('axios')
require('dotenv').config()

const FD_BASE =
   'https://api.sportsdata.io/api/nfl/fantasy/json/PlayerGameStatsByWeek/2020REG/'
const FD_KEY = process.env.FD_KEY

const GetLeague = async (req, resp) => {
   const league = await League.find()
   resp.send(league)
}

const LoadScores = async (req, resp) => {
   const { week } = req.params
   const url = `${FD_BASE}${week}?key=${FD_KEY}`
   console.log(url)
   let response = await axios.get(url)

   const playerStats = response.data
   const players = await Player.find()
   players.forEach(async (player) => {
      let stats = playerStats.find((e) => e.PlayerID === player.nflData_ID)
      if (stats) {
         // we have stats for the player, so lets do an update.
         const thePlayer = await Player.findById(player._id)
         // if we already had stats for this week, we need to remove them...
         await Player.updateOne(
            { _id: player._id },
            {
               $pull: {
                  stats: { week: week },
               },
            },
            { upsert: true, new: true }
         )
         await Player.updateOne(
            { _id: player._id },
            {
               $push: {
                  stats: {
                     rushYds: stats.RushingYards,
                     rushTD: stats.RushingTouchdowns,
                     recYds: stats.ReceivingYards,
                     recTD: stats.ReceivingTouchdowns,
                     passYds: stats.PassingYards,
                     passTD: stats.PassingTouchdowns,
                     fumbles: stats.FumblesLost,
                     interceptions: stats.Interceptions,
                     week: week,
                  },
               },
            },
            { upsert: true, new: true }
         )
      }
   })
   resp.send(`Stats Loaded for week ${week}`)
}


const AdvanceWeek = async (req, resp) => {
   const league = await League.findOne()
   await League.updateOne( 
      { _id: league._id },
      { 
         currentWeek: league.currentWeek + 1
      },
      { new: true }
   )

   resp.send( league )
}


const AdvanceRound = async( req, resp) => {
   // advance league.currentWeek and league.currentRound
   const league = await League.findOne()
   const prevWeek = league.currentWeek
   const prevRound = league.currentRound
   const thisWeek = prevWeek + 1
   const thisRound = prevRound + 1
   await League.updateOne( 
      { _id: league._id },
      { 
         currentWeek: thisWeek,
         currentRound: thisRound
      },
      { new: true }
   ) 

   // create a new Round record with all the same data but skip the losing team in the results, set all results to 0
   const lastRound = await Round.findOne( { round: prevRound } )

   // which team was in last? we need to drop that one....
   lastRound.results.sort( (a, b) => a.score < b.score ? 1 : -1 )
   lastRound.results.pop()

   const results = lastRound.results.map( e => ( { team: e.team, score: 0 } ) )
   const newRound = await Round.create( {
      QB: lastRound.QB,
      RB: lastRound.RB,
      WR: lastRound.WR,
      TE: lastRound.TE,
      FX: lastRound.FX,
      round: thisRound,
      week1: thisWeek,
      week2: thisWeek + 1,
      comments: [],
      results: results
   })

// rosters into the new week
   lastRound.results.forEach( async (e) => {
      const lastRoster = await Roster.findOne( { team: e.team, week: prevWeek } )
      await Roster.create( {
         team: e.team,
         week: thisWeek,
         score: 0,
         players: lastRoster.players,
         actions: []
      })
   })

   league = await League.findOne()
   resp.send( league )
}


const UpdateFormation = async ( req, resp) => {
   // add the req.params.position to the current round's formation

}


module.exports = {
   GetLeague,
   LoadScores,
   AdvanceWeek,
   AdvanceRound,
   UpdateFormation
}
