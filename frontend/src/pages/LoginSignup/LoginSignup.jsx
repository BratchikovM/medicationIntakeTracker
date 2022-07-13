import React from 'react'
import {
  Card, Space, Tabs,
} from 'antd'
import './login-signup.scss'
import { Login } from './Login/Login'
import { SignUp } from './SignUp/SignUp'

const { TabPane } = Tabs

export const LoginSignup = () => (
  <div className="loginSignup__container">
    <Space align="center">
      <Card style={{ width: 500 }}>
        <Tabs defaultActiveKey="1">
          <TabPane tab="Login" key="1">
            <Login />
          </TabPane>
          <TabPane tab="Sign up" key="2">
            <SignUp />
          </TabPane>
        </Tabs>
      </Card>
    </Space>
  </div>
)
