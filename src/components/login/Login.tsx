import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { browserSessionPersistence, getAuth, setPersistence, signInWithEmailAndPasswordService } from '@fb';

import { LoginPopupState } from '@states/PopupState';
import { userInfo, isLoginState } from '@states/UserState';

import * as PopupStyle from '@styles/PopupStyle';

const Login : React.FC = () => {
  const setLoginActive = useSetRecoilState(LoginPopupState);
  const [userId, setUserId] = useState<string>(""); // user ID
  const [userPw, setUserPw] = useState<string>(""); // user password
  const setUserInfo = useSetRecoilState(userInfo); // 사용자 정보
  const setLogin = useSetRecoilState(isLoginState);

  const loginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(userId.length < 6) {
      alert("6자 이상의 이메일을 사용해주세요.");
      return;
    }

    if(!userId.includes("@")){
      alert("이메일 형식으로 작성해주세요.");
      return;
    }

    if(userPw.length < 6) {
      alert("6자 이상의 비밀번호를 사용해주세요.");
      return;
    } 

    try{
      const auth = getAuth();
      const { user } = await signInWithEmailAndPasswordService(auth, userId, userPw);
      setUserInfo([
        {
          uid : user.uid,
          email : user.email !== null ? user.email : "",
          displayName : user.displayName !== null ? user.displayName : "",
        }
      ])
      
      // 로그인 유지를 위해 session에 저장.
      setPersistence(auth, browserSessionPersistence)
      .then(() => {
        return signInWithEmailAndPasswordService(auth, userId, userPw);
      }).catch((error) => {
        console.log("Login SetPersistence Error : ", error);
      })

      setLogin(true);
      alert("로그인이 완료되었습니다.")
    } catch(error) {
      console.log("Login Error : ", error);
    } finally {
      setLoginActive(false);
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
                                   placeholder='이메일을 입력해주세요.'
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