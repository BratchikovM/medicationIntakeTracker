import axios from 'axios'
import config from './config'
import { baseUrl } from '../const'
import { getAccessToken } from '../service/storage'

export default ({
  url = '/',
  method = 'GET',
  params = {},
  data = {},
  headers = {},
}) => {
  const headersCustom = headers

  if (headers && headers.authorization) {
    headersCustom.authorization = `Bearer ${getAccessToken()}`
  }

  return axios({
    url: `${baseUrl}${url}`,
    method,
    params,
    data,
    headers: headersCustom,
  }).catch((error) => {
    config.errorHandler(error)
    throw error
  })
}
