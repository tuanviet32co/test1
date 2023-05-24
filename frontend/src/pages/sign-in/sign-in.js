import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input, Divider } from 'antd';
import { login } from '~/services';
import Cookies from 'universal-cookie';
import './sign-in.css';
import logo from '~/assets/logo.svg';
import { HomeFilled } from '@ant-design/icons';

const cookies = new Cookies();

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};

const Login = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const onFinish = async (values) => {
        try {
            const res = await login(values);
            cookies.set('TOKEN', res.token, {
                path: '/',
            });
            navigate('/degree');
        } catch (e) {
            console.error(e);
        }
    };


  return (
    <div className="loginBackground">
      <div className="grid grid-cols-3 grid-rows-3 place-items-center h-screen">
        <div className="col-start-2 row-start-1">
          <div className="grid grid-cols-9 grid-rows-6 place-items-center">
            <Button className="col-start-5 row-start-2 font-semibold text-first-default" href="/home" type="link" ghost>
              <div className="flex flex-row items-center">
                <HomeFilled style={{ fontSize: '1.2rem', color: '#0069d5' }} />
              </div>
            </Button>
          </div>
        </div>
        <div className="col-start-2 row-start-1 row-span-3 flex flex-1 flex-col justify-center h-max w-max rounded-3xl border-2 shadow-lg bg-white shadow-first-hover border-first-default py-10 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img className="mx-auto h-14 w-auto" src={logo} alt="OneDegree" />
            <h2 className="m-3 text-center text-2xl font-bold leading-9 text-first-default">Sign in to your account</h2>
            <p className="m-3 text-sm text-center text-first-default">Welcome back 👋</p>
          </div>
          <div className="m-3 sm:mx-auto sm:w-full sm:max-w-sm">
            <Form
              //   {...formItemLayout}
              className="form"
              form={form}
              name="register"
              onFinish={onFinish}
              //   style={{ maxWidth: 600 }}
              scrollToFirstError
            >
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-first-default">
                Email address *
              </label>
              <Form.Item
                name="email"
                // label="Email"
                className="form-item"
                rules={[
                  {
                    type: 'email',
                    message: 'The input is not valid email!',
                  },
                  {
                    required: true,
                    message: 'Please enter your email',
                  },
                ]}
              >
                <Input className="input" placeholder="user@email.com" />
              </Form.Item>

                            <div className="flex items-center justify-between">
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium leading-6 text-first-default"
                                >
                                    Password *
                                </label>
                                <div className="text-sm">
                                    <a
                                        href="/reset-password"
                                        className="font-semibold text-first-default hover:text-first-hover"
                                    >
                                        Forgot password?
                                    </a>
                                </div>
                            </div>
                            <Form.Item
                                name="password"
                                // label="Password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter your password',
                                    },
                                    {
                                        min: 8,
                                        message: 'The password has at least 8 characters!',
                                    },
                                ]}
                                hasFeedback
                            >
                                <Input.Password className="input" placeholder="12345678" />
                            </Form.Item>
                            <div className="grid place-items-center">
                                <Button className="rounded-3xl bg-first-default" type="primary" htmlType="submit">
                                    Sign in
                                </Button>
                            </div>
                        </Form>
                        <Divider className="bg-first-default" />
                        <p className="mt-5 text-center text-sm text-first-default">
                            Not having an account?{' '}
                            <a
                                href="/sign-up"
                                className="font-semibold leading-6 text-first-default hover:text-first-hover"
                            >
                                Sign up here.
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
