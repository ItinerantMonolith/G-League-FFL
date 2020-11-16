import ApiClient from './ApiClient'

export const __LoginTeam = async (userData) => {
   try {
      const res = await ApiClient.post('/team/login', userData)
      return res.data
   } catch (err) {
      throw err
   }
}

export const __UpdatePassword = async (userData) => {
   try {
      const res = await ApiClient.post('/team/password', userData)
      return res.userData
   } catch (err) {
      throw err
   }
}

export const __CheckSession = async () => {
   try {
      const res = await ApiClient.get('/team/refresh/session')
      return res.data
   } catch (err) {
      throw err
   }
}
