import makeRequest from '../makeRequest'

export const registerRequest = (data) => makeRequest({
  url: '/users/register',
  method: 'POST',
  data,
})

export const login = (data) => makeRequest({
  url: '/users/login',
  method: 'POST',
  data,
})
