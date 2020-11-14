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

 
 export const __UpdateFormation = async (position) => {
   try {
      const res = await ApiClient.put(`/round/updateformation/${position}`)
      return res.data
   }
   catch (err) {
      console.log ("Error in LeagueService.__UpdateFormation", err)
   }
}
