import axios from 'axios';
import './Location.css'
import { Button, Form, Input, Layout, message } from 'antd';
import { useNavigate } from 'react-router-dom';

function Location() {
  const navigate =useNavigate();
  const onFinish = (values) => {
    axios({
      url:'https://autoapi.dezinfeksiyatashkent.uz/api/auth/signin',
      method: 'POST',
      data:values,
    })
    .then(res=>{
     if(res.data.data.tokens.accessToken.token){
      localStorage.setItem('accessToken', res.data.data.tokens.accessToken.token)
      message.success("Muvafaqatliy kiritildi")
      navigate('/city')
     }  
     else{
      message.error("Nimadir Xato")
     }
    })
    .catch(error=>{
      message.error("login yoki Parol xato")
    })
  };

  return (
   
   <div className='login-conatiner'>
     <div className='login'> 
     <div className='loginxon'><Form
    onFinish={onFinish}
    autoComplete="off"
  >
    <Form.Item
      label="tel raqam "
      name="phone_number"
      rules={[{ required: true, message: 'Please input your username!' }]}
      Layout='vertical' >
      <Input />
    </Form.Item>

    <Form.Item
      Layout='vertical'
      label="Password"
      name="password"
      rules={[{ required: true, message: 'Please input your password!' }]}
    >
      <Input.Password />
    </Form.Item>

    <Form.Item>
      <Button type="primary" htmlType="submit" className='login-btn'>
        Submit
      </Button>
    </Form.Item>
  </Form> 
  </div>
  </div>
   </div>
  )
}

export default Location