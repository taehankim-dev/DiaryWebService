import React, { useState, useCallback } from 'react';
import { useSetRecoilState } from 'recoil';
import { authService, deleteUser } from '@fb';
import { SignUpForm } from './SignUpForm';
import Loading from '@components/loading/Loading';
import * as PopupStyle from "@styles/PopupStyle";
import { SignUpPopupState } from '@states/PopupState';

const Popup : React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const setSignUpActive = useSetRecoilState(SignUpPopupState);

  // 회원가입 창 닫기
  const closeSignUpPopup = useCallback(async() => {
    const check = confirm("창을 닫으시면 입력하신 정보는 삭제됩니다. 닫으시겠습니까?");
    if(check){
      setSignUpActive(false)

      //만약 회원가입 중 창을 닫았을 경우, 해당 회원정보 삭제.
      try{
        const auth = authService;
        const user = auth.currentUser;
        
        if(user) await deleteUser(user);
      } catch(err){
        console.log("SignUp Close Popup Error, ", err);
      }
    } 
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