import React, { useState } from 'react';
import * as LoginAll from './LoginStyle';

const Login : React.FC = () => {
  const [userId, setUserId] = useState<string>(""); // user ID
  const [userPw, setUserPw] = useState<string>(""); // user password

  const loginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(userPw.length < 8) {
      alert("8자 이상의 비밀번호를 사용해주세요.")
    } 

    if(userId.length < 6) {
      alert("6자 이상의 아이디를 사용해주세요.");
    }
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
            <LoginAll.LoginLabel htmlFor="userId">아이디</LoginAll.LoginLabel>
            <LoginAll.LoginInput type='text' 
                                  id="userId"
                                  value={userId}
                                  placeholder='아이디를 입력해주세요.'
                                  onChange={(e) => {setUserId(e.target.value)}}/>
          </LoginAll.LoginInputWrap>

          <LoginAll.LoginInputWrap>
            <LoginAll.LoginLabel>비밀번호</LoginAll.LoginLabel>
            <LoginAll.LoginInput type="password"
                                 id="userPw"
                                 value={userPw}
                                 placeholder='비밀번호를 입력해주세요.'
                                 onChange={((e) => {setUserPw(e.target.value)})}
                                />
          </LoginAll.LoginInputWrap>
          <LoginAll.LoginButton value="로그인" type="submit"/>
        </LoginAll.LoginBody>
        
      </LoginAll.LoginForm>
    </LoginAll.LoginBackground>
  )
}

export default Login;