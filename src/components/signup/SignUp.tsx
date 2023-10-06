import React, { useState, useCallback } from 'react';
import { useSetRecoilState } from 'recoil';
import { SignUpForm } from './SignUpForm';
import Loading from '@components/loading/Loading';
import * as PopupStyle from "@styles/PopupStyle";
import { SignUpPopupState } from '@states/PopupState';

const Popup : React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const setSignUpActive = useSetRecoilState(SignUpPopupState);

  // 회원가입 창 닫기
  const closeSignUpPopup = useCallback(() => {
    setSignUpActive(false)
  }, [setSignUpActive])
  
  return(
    <PopupStyle.PopupBackground onClick={closeSignUpPopup}>
      <PopupStyle.PopupBody onClick={(e) => {e.stopPropagation()}}>
        <PopupStyle.PopupCloseButton onClick={closeSignUpPopup}>
          <PopupStyle.CloseImage />
        </PopupStyle.PopupCloseButton>
        <PopupStyle.PopupBodyTitle>회원가입</PopupStyle.PopupBodyTitle>
        <SignUpForm setIsLoading={setIsLoading}/>
      </PopupStyle.PopupBody>
      {!isLoading ? <></> : <Loading />}
    </PopupStyle.PopupBackground>
  )
}

export default Popup;