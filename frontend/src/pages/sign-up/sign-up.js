import React from 'react';
import { Button, Form, Input, Divider, Select } from 'antd';
import { register } from '~/services';
import { useNavigate } from 'react-router-dom';
import './sign-up.css';
import logo from '~/assets/logo.svg';
import { HomeFilled } from '@ant-design/icons';


const SignUp = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    const { confirm, ...rest } = values;
    try {
      await register(rest);
      navigate('/sign-in');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="signinBackground">
      <div className="grid grid-cols-3 grid-rows-3 place-items-center h-screen">
        <div className="col-start-2 row-start-1">
          <div className="grid grid-cols-9 grid-rows-5 place-items-center">
            <Button className="row-start-1 col-start-5 font-semibold text-first-default" href="/home" type="link" ghost>
              <div className="flex flex-row items-center">
                <HomeFilled style={{ fontSize: '1.2rem', color: '#0069d5' }} />
              </div>
            </Button>
          </div>
        </div>
        <div className="col-start-2 row-start-1 row-span-3 flex flex-1 flex-col justify-center items-center h-max w-max rounded-3xl border-2 shadow-lg bg-white shadow-first-hover border-first-default px-12 py-10 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img className="mx-auto h-14 w-auto" src={logo} alt="OneDegree" />
            <h2 className="m-3 text-center text-2xl font-bold leading-9 text-first-default">Sign up for an account</h2>
            <p className="m-3 text-sm text-center text-first-default">
              Welcome to{' '}
              <span className="font-bold">
                <span className="text-second">One</span>Degree
              </span>{' '}
              👋
            </p>
          </div>
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <Form
              form={form}
              name="register"
              onFinish={onFinish}
              scrollToFirstError
            >
              <div className="flex flex-row flex-1 items-center justify-between">
                <div className="mx-1">
                  <label htmlFor="email" className="block text-sm font-medium leading-6 text-first-default">
                    Email address *
                  </label>
                  <Form.Item
                    name="email"
                    rules={[
                      {
                        type: 'email',
                        message: 'Invalid email!',
                      },
                      {
                        required: true,
                        message: 'Please enter your email',
                      },
                    ]}
                  >
                    <Input className="input" placeholder="chaytheoconcho@tuongdolaem.com" />
                  </Form.Item>
                </div>
                <div className="mx-1">
                  <label htmlFor="name" className="block text-sm font-medium leading-6 text-first-default">
                    Name *
                  </label>
                  <Form.Item
                    name="name"
                    rules={[{ required: true, message: 'Please enter your name', whitespace: true }]}
                  >
                    <Input className="input" placeholder="Chị Cặp Đỏ" />
                  </Form.Item>
                </div>
              </div>
              <div className="flex flex-row flex-1 items-center justify-between">
                <div className="mx-1">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-first-default">
                    Password *
                  </label>
                  <Form.Item
                    name="password"
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
                </div>
                <div className="mx-1">
                  <label htmlFor="confirm" className="block text-sm font-medium leading-6 text-first-default">
                    Confirm Password *
                  </label>
                  <Form.Item
                    name="confirm"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                      {
                        required: true,
                        message: 'Please confirm your password',
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue('password') === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(new Error('The two passwords that you entered do not match!'));
                        },
                      }),
                    ]}
                  >
                    <Input.Password className="input" placeholder="12345678" />
                  </Form.Item>
                </div>
              </div>
              <div className="flex flex-row flex-1 items-center justify-between">
                <div className="mx-1">
                  <label htmlFor="studentId" className="block text-sm font-medium leading-6 text-first-default">
                    StudentID *
                  </label>
                  <Form.Item
                    name="studentId"
                    rules={[{ required: true, message: 'Please enter your student ID' }]}
                  >
                    <Input className="input" placeholder="200086" />
                  </Form.Item>
                </div>
                <div className="mx-1">
                  <label htmlFor="graduationYear" className="block text-sm font-medium leading-6 text-first-default">
                    Expected Graduation Year
                  </label>
                  <Form.Item
                    name="graduationYear"
                    rules={[{ required: true, message: 'Please choose your expected graduation year' }]}
                  >
                    <Select
                      showSearch
                      placeholder="Select a graduation year"
                      optionFilterProp="children"
                      options={[
                        '2023', '2024', '2025', '2026', '2027'
                      ].map((v) => ({ label: v, value: v }))}
                    />
                  </Form.Item>
                </div>
              </div>
              <div className="grid place-items-center">
                <Button className="rounded-3xl bg-first-default" type="primary" htmlType="submit">
                  Sign up
                </Button>
              </div>
            </Form>
            <Divider className="bg-first-default" />
            <p className="mt-5 text-center text-sm text-first-default">
              Already having an account?{' '}
              <a href="/sign-in" className="font-semibold leading-6 text-first-default hover:text-first-hover">
                Sign in here.
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
