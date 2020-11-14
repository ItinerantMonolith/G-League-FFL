import ApiClient from './ApiClient'

export const __GetLeague = async () => {
  try {
    const res = await ApiClient.get(`/league`)
    return res.data
  } catch (err) {
     console.log ( "Error in LeagueService.__GetLeague", err)
  }
}

export const __GetRound = async ( whichRound ) => {
   try {
      const res = await ApiClient.get(`/round/${whichRound}`)
      return res.data
   } catch (err) {
      console.log ( "Error in LeagueService.__GetRound", err)
   }
 }


 export const __ScoreWeek = async ( week ) => {
    try {
      const res = await ApiClient.put(`/league/loadscores/${week}`)
      return res.data 
    }
    catch (err) {
       console.log ( "Error in LeagueService.__ScoreWeek", err )
    }
 }

 export const __AdvanceWeek = async () => {
    try {
       const res = await ApiClient.put('/league/advanceweek')
       return res.data
    }
    catch (err) {
       console.log ("Error in LeagueService.__AdvanceWeek", err)
    }
 }

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
