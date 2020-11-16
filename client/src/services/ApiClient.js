import Axios from 'axios'

const ApiClient = Axios.create({
  baseURL: 'http://localhost:3001/api'
})

ApiClient.interceptors.request.use(
   async(config) => {
      const token = localStorage.getItem('token')
      if ( token ) {
         config.headers.Authorization = `Bearer ${token}`
      }
      return config
   },
   (err) => Promise.reject(err)
)

export default ApiClient
