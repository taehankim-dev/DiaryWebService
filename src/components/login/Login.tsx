import React from 'react';
import * as LoginAll from './LoginStyle';

const Login : React.FC = () => {
  const loginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  }

  return(
    <LoginAll.LoginBackground>
      <LoginAll.LoginForm onSubmit={(e) => loginSubmit(e)}>
        <LoginAll.LoginCloseButton>
          <LoginAll.CloseImage />
        </LoginAll.LoginCloseButton>

        <LoginAll.LoginBody>
          <LoginAll.LoginBodyTitle>로그인</LoginAll.LoginBodyTitle>
          <LoginAll.LoginInputWrap>
            <LoginAll.LoginLabel>아이디</LoginAll.LoginLabel>
            <LoginAll.LoginInput />
          </LoginAll.LoginInputWrap>
          <LoginAll.LoginInputWrap>
            <LoginAll.LoginLabel>비밀번호</LoginAll.LoginLabel>
            <LoginAll.LoginInput />
          </LoginAll.LoginInputWrap>
          <LoginAll.LoginButton>
            로그인
          </LoginAll.LoginButton>
        </LoginAll.LoginBody>
        
      </LoginAll.LoginForm>
    </LoginAll.LoginBackground>
  )
}

export default Login;