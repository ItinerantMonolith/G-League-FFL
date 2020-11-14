const { League, Player, Round, Roster } = require('../db/schema')
const axios = require('axios')
require('dotenv').config()

const FD_BASE =
   'https://api.sportsdata.io/api/nfl/fantasy/json/PlayerGameStatsByWeek/2020REG/'
const FD_KEY = process.env.FD_KEY

const GetLeague = async (req, resp) => {
   const league = await League.findOne()
   resp.send(league)
}

const getRoundByWeek = async (week) => {
   const round = await Round.findOne({
      $or: [{ week1: week }, { week2: week }],
   })
   return round
}

const scoreStats = (stats) => {
   return (
      stats.RushingYards +
      stats.ReceivingYards +
      stats.PassingYards * 0.5 +
      (stats.RushingTouchdowns + stats.ReceivingTouchdowns) * 40 +
      stats.PassingTouchdowns * 20 -
      (stats.FumblesLost + stats.PassingInterceptions) * 20
   )
}

updateResults = async (round) => {
   const results = round.results

   const newResults = []
   for (let i=0; i< results.length; i++ ) {
      let rosters = await Roster.find( { team: results[i].team, week: { $in: [ round.week1, round.week2 ] } } ).select('score')
      newResults.push ( { team: results[i].team, score: rosters.reduce( (acc, e) => { return acc + e.score }, 0) } )
   }
   await Round.updateOne(
      { _id: round },
      { $pull: { results: {} } }
   )
   await Round.updateOne(
      { _id: round },
      { $push: { results: newResults } }
   )
}


posIdx = (pos) => ['QB', 'RB', 'WR', 'TE'].indexOf(pos)

scoreWeek = async (week, round) => {
   console.log('in scoreWeek')
   const posCnt = round.formation
   const rosters = await Roster.find({ week: week }).populate([
      {
         path: 'players',
         model: 'players',
      },
   ])

   for (let i = 0; i < rosters.length; i++) {
      let score = 0
      let posScores = [[], [], [], []]
      let players = rosters[i].players
      for (let j = 0; j < players.length; j++) {
         let player = players[j]
         let weekStats = player.stats.find((e) => e.week === parseInt(week))
         if (weekStats) {
            // now add the player's points to the correct position array
            posScores[posIdx(player.position)].push(weekStats.points)
         } else {
            console.log('no stats found...make some')
            const newStats = await Player.updateOne(
               { _id: player },
               {
                  $push: {
                     stats: { week: week, points: 0 },
                  },
               }
            )
         }
      }

      // now for each position, we need to take the top N scores, where N is posCnt[position]
      let flex = []
      for (let i = 0; i < 4; i++) {
         posScores[i].sort((a, b) => a - b)

         for (let j = 0; j < posCnt[i]; j++) {
            if (posScores[i].length > 0) 
               score = score + posScores[i].pop()
         }
         // now we have flex, take all the leftovers and sort them
         if ( i > 0 )
            flex = [...flex, ...posScores[i]].sort( ( a,b) => a-b )
      }
      // .. and add on the top flex values
      for (let i=0; i < posCnt[4]; i++)
         score = score + flex.pop()

      await Roster.updateOne({ _id: rosters[i]._id }, { score: score })
   }
}

const LoadScores = async (req, resp) => {
   const { week } = req.params
   let response = await axios.get(`${FD_BASE}${week}?key=${FD_KEY}`)

   const playerStats = response.data
   const players = await Player.find()
   for (let i = 0; i < players.length; i++) {
      // players.forEach(async (player) => {
      let player = players[i]
      let stats = playerStats.find((e) => e.PlayerID === player.nflData_ID)
      if (stats) {
         let score = scoreStats(stats)
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
                     interceptions: stats.PassingInterceptions,
                     week: week,
                     points: score,
                  },
               },
            },
            { upsert: true, new: true }
         )
      }
   }

   // player stats are loaded and scored...now we need to actually score the rosters.
   const round = await getRoundByWeek( week )

   await scoreWeek(week, round)
   await updateResults(round)

   resp.send(`Stats Loaded for week ${week}`)
}


const AdvanceWeek = async (req, resp) => {
   // advance league.currentWeek 
   // if it's a new round advance league.currentRound
   // create new roster records - if it's a new round, DO NOT create one for the last team
   // if it's a new round, create a new Round record, DO NOT create a results record for the last team.
   console.log ( 'in AdvanceWeek')
   let league = await League.findOne()
   const lastWeek = league.currentWeek
   const lastRound = await getRoundByWeek( league.currentWeek )
   
   console.log ( 'lastWeek', lastWeek, 'lastRound.round', lastRound.round )
   const thisWeek = lastWeek + 1
   let thisRound = lastRound.round
   let results = lastRound.results
   if ( lastRound.week2 === lastWeek ) {
      // advance the round
      thisRound++
      // which team was in last? we need to drop that one....
      lastRound.results.sort((a, b) => (a.score < b.score ? 1 : -1))
      lastRound.results.pop()

      // create the new results, then create the new round
      results = lastRound.results.map((e) => ({ team: e.team, score: 0 }))
      const newRound = await Round.create({
         round: thisRound,
         week1: thisWeek,
         week2: thisWeek + 1,
         formation: lastRound.formation,
         comments: [],
         results: results,
      })
   }

   // rosters into the new week
   results.forEach(async (e) => {
      const lastRoster = await Roster.findOne({ team: e.team, week: lastWeek })
      await Roster.create({
         team: e.team,
         week: thisWeek,
         score: 0,
         players: lastRoster.players,
         actions: [],
      })
   })

   await League.updateOne(
      { _id: league._id },
      {
         currentWeek: thisWeek,
         currentRound: thisRound,
      },
      { new: true }
   )

   league = await League.findOne()
   resp.send(league)
}


module.exports = {
   GetLeague,
   LoadScores,
   AdvanceWeek
}
