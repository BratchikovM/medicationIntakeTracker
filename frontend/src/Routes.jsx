import { Route, Switch } from 'react-router-dom'
import React from 'react'
import { MedicationList } from './pages/Medications/MedicationList'
import ProtectedRoute from './utils/ProtectedRoute'
import { LoginSignup } from './pages/LoginSignup/LoginSignup'

const Routes = () => (
  <Switch>
    <ProtectedRoute exact path="/list" component={MedicationList} />
    <Route exact path="/" component={LoginSignup} />
  </Switch>
)

export default Routes
