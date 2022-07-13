import React from 'react'
import 'antd/dist/antd.min.css'
import { Router } from 'react-router'
import Routes from './Routes'
import browserHistory from './history'

function App() {
  return (
    <Router history={browserHistory}>
      <Routes />
    </Router>
  )
}

export default App
