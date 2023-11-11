import { Form, Input, Checkbox, Button } from "antd"
import { ValidateErrorEntity } from "rc-field-form/lib/interface";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/auth/api";
import '../../styles/login/index.css'

type credentials = {
  username: string;
  password: number;
}

const FormLogin: React.FC = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const onFinish = async({username, password}: credentials) => {
    try {
      const user = await login({username,password });
      console.log(user)
      setError('')
      /* navigate('/'); */
      window.location.href = `${window.location.origin}`
    } catch (error) {
      setError('Invalid username or password');
    }
  };
  const onFinishFailed = (errorInfo: ValidateErrorEntity) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      name="basic"
      layout="vertical"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      className="w-[300px] text-left"
    >
      <div className="text-center text-red-500 font-bold">{error}</div>
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
    >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
    >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
    >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>
      
      <Form.Item>
        <Button type="primary" htmlType="submit" className="general-action-btn">
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}

export default FormLogin