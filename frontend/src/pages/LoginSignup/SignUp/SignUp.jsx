import React, { useState } from 'react'
import {
  Button, Form, Input, message,
} from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Redirect } from 'react-router'
import api, { setToken } from '../../../api'

export const SignUp = () => {
  const [form] = Form.useForm()
  const [emailError, setEmailError] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [isRedirect, setIsRedirect] = useState(false)

  const onFinish = async (dataForm) => {
    setIsLoading(true)
    setEmailError(undefined)

    try {
      const { data: { accessToken } } = await api.user.registerRequest(dataForm)

      message.success(<>
        You have successfully registered!
        <br />
        After 3 seconds you will be redirected
                      </>)
      setToken(accessToken)

      setTimeout(() => setIsRedirect(true), 3000)
    } catch (e) {
      console.error('Error registerRequest', e)

      if (e.response.data.email) {
        setEmailError(e.response.data.error)
      }
    }

    setIsLoading(false)
  }

  return (
    <>
      {isRedirect
        ? <Redirect to="/list" />
        : (
          <Form
            disabled={isLoading}
            form={form}
            name="login"
            initialValues={{}}
            onFinish={onFinish}
          >
            <Form.Item
              name="email"
              validateStatus={emailError && 'error'}
              help={emailError}
              rules={[
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!',
                },
                {
                  required: true,
                  message: 'Please input your E-mail!',
                },
              ]}
            >
              <Input
                onChange={() => {
                  if (emailError) {
                    setEmailError(undefined)
                  }
                }}
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Email"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  min: 6,
                  message: 'Min length 6 symbol!',
                },
                {
                  required: true,
                  message: 'Please input your Password!',
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>

            <Form.Item>
              <Button loading={isLoading} type="primary" htmlType="submit" className="login-form-button">
                Sign up
              </Button>
            </Form.Item>
          </Form>
        )}
    </>
  )
}
