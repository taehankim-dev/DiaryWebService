import React, { useCallback, useEffect, useState } from 'react';
import { useSetRecoilState, useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { authService, getAuth } from '@fb';

import { LoginPopupState, SignUpPopupState, isLoadingState } from "@states/PopupState";
import { isLoginState, userInfo } from '@states/UserState';

import { SignLayoutPC, SignButtonGroup, SignButton } from '@styles/HeaderStyle';
import { useSignOut } from '@hooks/useSignOut';

const HeaderSign : React.FC = () => {
  const navigate = useNavigate();
  const {signOut} = useSignOut();
  const setLoginActive = useSetRecoilState(LoginPopupState);
  const setSignUpActive = useSetRecoilState(SignUpPopupState);
  const setLoadingState = useSetRecoilState(isLoadingState);
  const [user, setUser] = useRecoilState(userInfo);
  const [login, setLogin] = useRecoilState(isLoginState);
  const [loading, setLoading] = useState(true);

  // 로그인 상태 유지를 위함.
  useEffect(() => {
    setLoadingState(true);

    const unsubscribe = () => {
      const auth = getAuth();
      authService.onAuthStateChanged((authUser) => {
        if(authUser && auth.currentUser?.emailVerified) {
          setUser(
            {
              uid: authUser.uid,
              email: authUser.email !== null ? authUser.email : "",
              displayName: authUser.displayName !== null ? authUser.displayName : ""
            }
          )
  
          setLogin(true);
        }
  
        setLoading(false);
        setLoadingState(false);
      });  
    }
    

    return () => {
      unsubscribe();
    }
  }, [setLogin, setUser, setLoadingState])

  // 로그아웃 버튼 클릭.
  const clickSignOut = useCallback(async() => {
    if(window.confirm("로그아웃 하시겠습니까?")){
      try{
        await signOut();
        alert("로그아웃 되었습니다.");
        navigate("/");
      } catch(err) {
        console.log("Header Sign Signout Error :", err)
      }
    }
  }, [navigate, signOut])

  // 닉네임 클릭 시 마이페이지로 이동.
  const goMyPage = useCallback(() => {
    navigate("/mypage")
  }, [navigate])

  if(loading) {
    return null;
  }
  
  return(
    <>
      <SignLayoutPC>
        {login ? 
            <SignButtonGroup>
              <SignButton onClick={clickSignOut}>로그아웃</SignButton>
              <SignButton onClick={goMyPage}>{user.displayName}</SignButton>
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