import React, { useCallback, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import Loading from '@components/loading/Loading';

import { FindPasswordPopupState, LoginPopupState, SignUpPopupState } from '@states/PopupState';

import * as PopupStyle from '@styles/PopupStyle';
import { LoginForm } from './LoginForm';

const Login : React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const setLoginActive = useSetRecoilState(LoginPopupState);
  const setSignUpActive = useSetRecoilState(SignUpPopupState);
  const setFindPwActive = useSetRecoilState(FindPasswordPopupState);
  
  // 로그인창 닫기
  const closeLoginPopup = useCallback(() => {
    setLoginActive(false);
  }, [setLoginActive])

  // 회원가입 버튼
  const onClickSignUp = useCallback(() => {
    setLoginActive(false);
    setSignUpActive(true);
  }, [setLoginActive, setSignUpActive]);

  // 비밀번호 찾기 버튼
  const onClickFindPw = useCallback(() => {
    setFindPwActive(true);
    setLoginActive(false);
  }, [setFindPwActive, setLoginActive])

  return(
    <PopupStyle.PopupBackground onClick={closeLoginPopup}>
      <PopupStyle.PopupBody onClick={(e) => e.stopPropagation()}>
        <PopupStyle.PopupCloseButton onClick={closeLoginPopup}>
          <PopupStyle.CloseImage />
        </PopupStyle.PopupCloseButton>

        <PopupStyle.PopupBodyTitle>로그인</PopupStyle.PopupBodyTitle>
        <LoginForm setIsLoading={setIsLoading}/>
        <PopupStyle.PopupAdditionalWrap count={2}>
          <button onClick={onClickSignUp}>회원가입</button>
          <button onClick={onClickFindPw}>비밀번호 찾기</button>
        </PopupStyle.PopupAdditionalWrap>
      </PopupStyle.PopupBody>
      {!isLoading ? <></> : <Loading />}
    </PopupStyle.PopupBackground>
  )
}

export default Login;