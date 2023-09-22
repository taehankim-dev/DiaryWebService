import React, { useEffect, useState } from 'react';
import { useSetRecoilState, useRecoilState } from 'recoil';
import { authService } from '@fb';

import { LoginPopupState, SignUpPopupState, isLoadingState } from "@states/PopupState";
import { isLoginState, userInfo } from '@states/UserState';

import { SignLayoutPC, SignButtonGroup, SignButton } from '@styles/HeaderStyle';


const HeaderSign : React.FC = () => {
  const setLoginActive = useSetRecoilState(LoginPopupState);
  const setSignUpActive = useSetRecoilState(SignUpPopupState);
  const setLoadingState = useSetRecoilState(isLoadingState);
  const [user, setUser] = useRecoilState(userInfo);
  const [login, setLogin] = useRecoilState(isLoginState);
  const [loading, setLoading] = useState(true);

  // 로그인 상태 유지를 위함.
  useEffect(() => {
    setLoadingState(true);
    const unsubscribe = authService.onAuthStateChanged((authUser) => {
      if(authUser) {
        setUser([
          {
            uid: authUser.uid,
            email: authUser.email !== null ? authUser.email : "",
            displayName: authUser.displayName !== null ? authUser.displayName : ""
          }
        ])

        setLogin(true);
      }

      setLoading(false);
      setLoadingState(false);
    });

    return () => {
      unsubscribe();
    }
  }, [setLogin, setUser, setLoadingState])

  // 로그아웃 버튼 클릭.
  const signOut = async() => {
    if(window.confirm("로그아웃 하시겠습니까?")){
      try{
        await authService.signOut();
  
        setLogin(false);
        setUser([
          {
            uid: "",
            email: "",
            displayName: ""
          }
        ])
  
        alert("로그아웃 되었습니다.");
      } catch(err) {
        console.log("Header Sign Signout Error :", err)
      }
    }
  }

  if(loading) {
    return null;
  }
  
  return(
    <>
      <SignLayoutPC>
        {login ? 
            <SignButtonGroup>
              <SignButton onClick={() => {signOut()}}>로그아웃</SignButton>
              <SignButton >{user[0].displayName}</SignButton>
            </SignButtonGroup>
          :
            <SignButtonGroup>
              <SignButton onClick={() => {setLoginActive(true)}}>로그인</SignButton>
              <SignButton onClick={() => {setSignUpActive(true)}}>회원가입</SignButton>
            </SignButtonGroup>
        }
      </SignLayoutPC>
    </>
  )
}

export default HeaderSign;