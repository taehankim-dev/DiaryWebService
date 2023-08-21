import React from 'react';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { LoginPopupState, SignUpPopupState } from "@states/PopupState";

import { isLogin, userInfo } from '@states/UserState';

import { SignLayoutPC, SignLayoutMobile, SignButton } from '@styles/HeaderStyle';
import { UserInfoT } from "../../types/SignTypes" // @types/SignTypes 가 안됨.


const HeaderSign : React.FC = () => {
  const setLoginActive = useSetRecoilState(LoginPopupState);
  const setSignUpActive = useSetRecoilState(SignUpPopupState);
  const user : UserInfoT = useRecoilValue(userInfo)[0];
  const login = useRecoilValue(isLogin)
  
  return(
    <>
      <div>
        <SignLayoutPC>
          {login ? 
              <>
                {user.displayName}
              </>
            :
              <>
                <SignButton onClick={() => {setLoginActive(true)}}>로그인</SignButton>
                <SignButton onClick={() => {setSignUpActive(true)}}>회원가입</SignButton>
              </>
          }
        </SignLayoutPC>

        <SignLayoutMobile>
          1
        </SignLayoutMobile>
      </div>
    </>
  )
}

export default HeaderSign;