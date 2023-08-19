import React from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { LoginPopupState, SignUpPopupState } from "@states/PopupState";

import { userInfo } from '@states/UserState';

import { SignLayoutPC, SignLayoutMobile, SignButton } from './HeaderStyle';

const HeaderSign : React.FC = () => {
  const setLoginActive = useSetRecoilState(LoginPopupState);
  const setSignUpActive = useSetRecoilState(SignUpPopupState);
  const [user] = useRecoilState(userInfo);
  
  return(
    <>
      <div>
        <SignLayoutPC>
          <SignButton onClick={() => {setLoginActive(true)}}>로그인</SignButton>
          <SignButton onClick={() => {setSignUpActive(true)}}>회원가입</SignButton>
        </SignLayoutPC>

        <SignLayoutMobile>
          1
        </SignLayoutMobile>
      </div>
    </>
  )
}

export default HeaderSign;