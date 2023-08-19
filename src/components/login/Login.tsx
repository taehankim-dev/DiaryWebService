import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { LoginPopupState } from '@states/PopupState';

import * as PopupStyle from '@styles/PopupStyle';

const Login : React.FC = () => {
  const setLoginActive = useSetRecoilState(LoginPopupState);
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
    <PopupStyle.PopupBackground>
      <PopupStyle.PopupBody>
        <PopupStyle.PopupCloseButton onClick={() => {setLoginActive(false)}}>
          <PopupStyle.CloseImage />
        </PopupStyle.PopupCloseButton>

        <PopupStyle.PopupForm onSubmit={(e) => loginSubmit(e)}>
          <PopupStyle.PopupBodyTitle>로그인</PopupStyle.PopupBodyTitle>
          <PopupStyle.PopupInputWrap>
            <PopupStyle.PopupLabel htmlFor="userId">아이디</PopupStyle.PopupLabel>
            <PopupStyle.PopupInput type='text' 
                                  id="userId"
                                  value={userId}
                                  placeholder='아이디를 입력해주세요.'
                                  onChange={(e) => {setUserId(e.target.value)}}/>
          </PopupStyle.PopupInputWrap>

          <PopupStyle.PopupInputWrap>
            <PopupStyle.PopupLabel>비밀번호</PopupStyle.PopupLabel>
            <PopupStyle.PopupInput type="password"
                                 id="userPw"
                                 value={userPw}
                                 placeholder='비밀번호를 입력해주세요.'
                                 onChange={((e) => {setUserPw(e.target.value)})}
                                />
          </PopupStyle.PopupInputWrap>
          <PopupStyle.PopupButton value="로그인" type="submit"/>
        </PopupStyle.PopupForm>
        
      </PopupStyle.PopupBody>
    </PopupStyle.PopupBackground>
  )
}

export default Login;