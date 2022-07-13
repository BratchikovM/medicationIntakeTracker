import React, { useEffect, useState } from 'react'
import {
  Button, Form, Input, message,
} from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Redirect } from 'react-router'
import api, { setToken } from '../../../api'

export const Login = () => {
  const [form] = Form.useForm()
  const [requestError, setRequestError] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [isRedirect, setIsRedirect] = useState(false)

  const onFinish = async (dataForm) => {
    setIsLoading(true)
    setRequestError({})

    try {
      const { data: { accessToken } } = await api.user.login(dataForm)

      message.success('You have successfully login!')
      setToken(accessToken)

      setTimeout(() => setIsRedirect(true), 1500)
    } catch (e) {
      console.error('Error registerRequest', e)

      setRequestError(e.response.data)
    }

    setIsLoading(false)
  }

  useEffect(() => {
    console.log('requestError', requestError)
  }, [requestError])

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
              validateStatus={requestError.email && 'error'}
              help={requestError.email && requestError.error}
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
                  if (requestError.email) {
                    setRequestError({})
                  }
                }}
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Email"
              />
            </Form.Item>
            <Form.Item
              validateStatus={requestError.password && 'error'}
              help={requestError.password && requestError.error}
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
                onChange={() => {
                  if (requestError.password) {
                    setRequestError({})
                  }
                }}
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>

            <Form.Item>
              <Button loading={isLoading} type="primary" htmlType="submit" className="login-form-button">
                Sign in
              </Button>
            </Form.Item>
          </Form>
        )}
    </>
  )
}
