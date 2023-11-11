import React from 'react';
import FormLogin from '../components/login/FormLogin';
import '../styles/login/index.css'

import BgHotel from '../assets/images/login/bg-hotel.jpg'
import Logo from '../assets/images/login/logo.png'

const LoginPage = () => {
  return (
    <div className='container-login flex'>
      <div className='container-login__bg'
        style={{
          backgroundImage: `url(${BgHotel})`,
        }}
      ></div>
      <div className='container-login__form'>
        <div className='text-center'>
          <div className='container-login__form__logo'>
            <img src={Logo} alt='company logo' />
          </div>
          <FormLogin/>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;