import React, { useState } from 'react';
import { SignLayoutPC, SignLayoutMobile, SignButton } from './HeaderStyle';
import Login from '@components/login/Login';

const HeaderSign : React.FC = () => {
  const [loginActive, setLoginActive] = useState<boolean>(false);

  return(
    <>
      {!loginActive ? 
        <div>
          <SignLayoutPC>
            <SignButton onClick={() => {setLoginActive(true)}}>로그인</SignButton>
            <SignButton>회원가입</SignButton>
          </SignLayoutPC>

          <SignLayoutMobile>
            1
          </SignLayoutMobile>
        </div>
        :
        <Login />
      }
    </>
    
    
    
  )
}

export default HeaderSign;