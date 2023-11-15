import { Form, Input, Checkbox, Button } from "antd"
import { ValidateErrorEntity } from "rc-field-form/lib/interface";
import { useState } from "react";
import { login } from "../../services/auth/api";
import '../../styles/login/index.css'

type credentials = {
  username: string;
  password: number;
}

const FormLogin: React.FC = () => {
  const [error, setError] = useState('');

  const onFinish = async ({ username, password }: credentials) => {
    try {
      const user = await login({ username, password });
      console.log(user)
      setError('')
      /* navigate('/'); */
      window.location.href = `${window.location.origin}`
    } catch (error) {
      setError('Usuario o contraseña invalidos');
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
        label="Nombre de usuario"
        name="username"
        rules={[{ required: true, message: 'Por favor ingresa tu nombre de usuario' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Contraseña"
        name="password"
        rules={[{ required: true, message: 'Por favor ingresa tu contraseña' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
      >
        <Checkbox>Recuerdame</Checkbox>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="general-action-btn">
          Iniciar sesión
        </Button>
      </Form.Item>
    </Form>
  )
}

export default FormLogin