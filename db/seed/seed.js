const connection = require('../connection')
const { League, Team, NFLTeam, Player, Roster, Round } = require('../schema')
const bcrypt = require('bcrypt')
const players = require('./PlayerData.json')
const nflData = require('./NFLTeamData.json')

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
      // e['stats'] = new Array(17).fill({ week: 0 }).map( (stat,idx) => ({ ...stat, week: idx }))
      e.team = nflTeams.find((n) => n.abbreviation === e.abbreviation)
      e.sortPos = e.position === 'TE' ? 'ZTE' : e.position
   })

   await Player.insertMany(players)

   // load the teams
   const teams = await loadTeams()
   console.log(teams)
   await Team.insertMany(teams)

   // now create the starting roster records for the teams
   const getTeams = await Team.find()
   const rosters = getTeams.map((e) => ({ team: e, week: 4, players: [] }))
   await Roster.insertMany(rosters)

   const results = getTeams.map( e => ( { team: e, score: 0 } ) )

   // then build the Round and attach the results
   await Round.create({
      QB: 1,
      RB: 2,
      WR: 2,
      TE: 1,
      FX: 1,
      round: 1,
      week1: 4,
      week2: 5,
      comments: [],
      results: results
   })

   await connection.disconnect
   process.exit()
}

seed()
