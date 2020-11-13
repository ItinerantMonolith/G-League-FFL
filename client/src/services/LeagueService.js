import ApiClient from './ApiClient'

export const __GetLeague = async () => {
  try {
    const res = await ApiClient.get(`/league`)
    console.log(res.data)
    return res.data
  } catch (err) {
     console.log ( "Error in __GetLeague", err)
  }
}
