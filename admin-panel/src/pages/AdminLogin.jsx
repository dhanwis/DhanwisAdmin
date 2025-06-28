import React, { useContext } from 'react';
import { Form, Input, Button, Card, Typography, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { AuthContext } from '../context/AuthContext';

const { Title } = Typography;

const AdminLogin = () => {

    const {loginAdmin,loading}=useContext(AuthContext)
    
  const onFinish = (values) => {
    console.log('Success:', values);
    message.success('Logged in successfully!');
    // Add your login logic here
    loginAdmin(values)
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    message.error('Login failed! Please check your credentials.');
  };

  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f0f2f5'
    }}>
      <Card
        title={<Title level={3} style={{ margin: 0, textAlign: 'center' }}>Admin Login</Title>}
        bordered={false}
        style={{ width: 350 }}
      >
        <Form
          name="admin_login"
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input size='large' prefix={<UserOutlined />} placeholder="Enter username" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password size='large' prefix={<LockOutlined />} placeholder="Enter password" />
          </Form.Item>

          <Form.Item>
            <Button loading={loading} type="primary" htmlType="submit" block>
              Log In
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default AdminLogin;
