const connection = require('../connection')
const { League, Team, NFLTeam, Player, Roster, Round } = require('../schema')
const bcrypt = require('bcrypt')
const players = require('./PlayerData.json')
const nflData = require('./NFLTeamData.json')
const rosterData = require('./RosterData.json')

const teamNames = [
   'FLYNN',
   'SKY',
   'BRIAN',
   'JILL',
   'AARON',
   'NIPPIE',
   'DOUGIN',
   'PAUL',
]

const loadTeams = async () =>
   await Promise.all(
      teamNames.map(async (e) => {
         return {
            name: e,
            email: 'nowhere@nowhere.com',
            password_digest: await bcrypt.hash(e, 12),
         }
      })
   )

const getRosterDataByTeam = async (teamName) => {
   const newRoster = []
   const players = rosterData.filter((e) => e.team === teamName)

   for (let i=0; i< players.length; i++ ) {
      try {
         const player = await Player.findOne({ nflData_ID: players[i].nflData_ID })
         if ( player )
            newRoster.push(player)
         else 
            console.log ("Could not find", players[i].team, players[i].nflData_ID)
      } catch (err) {
         console.log('error in getRosterDataByTeam', err)
      }
   }

   return newRoster
}

const seed = async () => {
   await connection.connect

   await League.create({ currentRound: 1, currentWeek: 4 })

   nflData.forEach(
      (e) =>
         (e['profile'] = `https://www.nfl.com/teams/${e.name
            .split(' ')
            .join('-')}`)
   )
   await NFLTeam.insertMany(nflData)

   const nflTeams = await NFLTeam.find()

   players.forEach((e, i) => {
      e.nflTeam = e.abbreviation
      e.team = nflTeams.find((n) => n.abbreviation === e.abbreviation)
      e.sortPos = e.position === 'TE' ? 'ZTE' : e.position
   })

   await Player.insertMany(players)

   // load the teams
   const teams = await loadTeams()
   await Team.insertMany(teams)

   // now create the starting roster records for the teams
   const getTeams = await Team.find()

   const rosters = getTeams.map((e) => ({ team: e, week: 4, players: [] }))
   for (let i = 0; i < rosters.length; i++) {
      const newRoster = await getRosterDataByTeam(rosters[i].team.name)
      rosters[i].players = newRoster
   }

   await Roster.insertMany(rosters)

   const results = getTeams.map((e) => ({ team: e, score: 0 }))

   // then build the Round and attach the results
   await Round.create({
      round: 1,
      week1: 4,
      week2: 5,
      formation: [ 1,2,2,1,1 ],
      comments: [],
      results: results,
   })

   await connection.disconnect
   process.exit()
}

seed()
