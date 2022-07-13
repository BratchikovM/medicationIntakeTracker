import React from 'react'
import { Route } from 'react-router'
import { getAccessToken } from '../service/storage'
import { LoginSignup } from '../pages/LoginSignup/LoginSignup'

const ProtectedRoute = (props) => {
  const accessToken = getAccessToken()

  if (!accessToken) {
    return <Route component={LoginSignup} />
  }

  return <Route {...props} />
}

export default ProtectedRoute
