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
