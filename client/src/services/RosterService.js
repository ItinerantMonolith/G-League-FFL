import ApiClient from './ApiClient'

 export const __GetNFLTeams = async () => {
   try {
      const res = await ApiClient.get('/nfl')
      return res.data
   }
   catch (err) {
      console.log ("Error in LeagueService.__GetNFLTeams", err)
   }
}

export const __GetTeams = async (round) => {
  try {
     const res = await ApiClient.get(`/round/teams/${round}`)
     return res.data
  }
  catch (err) {
     console.log ("Error in LeagueService.__GetTeams", err)
  }
}

export const __GetRoster = async (team, week) => {
  try {
     const res = await ApiClient.get(`/roster/${team}/${week}`)
     return res.data
  }
  catch (err) {
     console.log ("Error in LeagueService.__GetRoster", err)
  }
}

export const __GetAvailablePlayers = async (team, position) => {
  try {
     const res = await ApiClient.get(`/players/${team}/${position}`)
     return res.data
  }
  catch (err) {
     console.log ("Error in LeagueService.__GetAvailablePlayers", err)
  }
}

export const __AddPlayerToRoster = async (roster, player) => {
  try {
     const res = await ApiClient.put(`/roster/${roster}/${player}`)
     return res.data
  }
  catch (err) {
     console.log ("Error in LeagueService.__AddPlayerToRoster", err)
  }
}

export const __DropPlayerFromRoster = async ( roster, player ) => {
  try {
     const res = await ApiClient.delete(`/roster/${roster}/${player}`)
     return res.data
  }
  catch (err) {
     console.log ("Error in LeagueService.__DropPlayerFromRoster", err)
  }
}

export const __GetRosterScores = async ( week ) => {
   try {
      const res = await ApiClient.get(`/roster/week/${week}`)
      return res.data
   }
   catch (err) {
      console.log ("Error in LeagueService.__GetRosterScores", err)
   }
 }
 