import { removeAccessToken, setAccessToken } from '../service/storage'
import browserHistory from '../history'

export const setToken = (token) => setAccessToken(token)

export default {
  errorHandler: (error) => {
    console.log('error', error)

    if (error.response.status === 401) {
      removeAccessToken()
      browserHistory.push('/')
    }
  },
}
