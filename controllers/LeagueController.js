const { League, Player } = require('../db/schema')
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

const AdvanceWeek = async (req, resp) => {}

module.exports = {
   GetLeague,
   LoadScores,
   AdvanceWeek,
}
