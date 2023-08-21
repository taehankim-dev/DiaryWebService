import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { getAuth, createUserWithEmailAndPassword, updateProfileService } from '@fb';

import { SignUpPopupState, isLoadingState } from '@states/PopupState';

import * as PopupStyle from "@styles/PopupStyle";

const Popup : React.FC = () => {
  const setPopupActive = useSetRecoilState(SignUpPopupState); // 회원가입 팝업
  const setLoading = useSetRecoilState(isLoadingState);
  const [userId, setUserId] = useState<string>(""); // user ID
  const [userPw, setUserPw] = useState<string>(""); // user password
  const [userName, setUserName] = useState<string>("");

  const PopupSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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

    if(userName.length < 2){
      alert("2자 이상의 닉네임을 사용해주세요.");
      return;
    }

    try{
      setLoading(true);
      const auth = getAuth();
      await createUserWithEmailAndPassword(auth, userId, userPw);
      
      if(auth.currentUser) await updateProfileService(auth.currentUser, {displayName : userName});

      
      alert("회원가입이 완료되었습니다!");
    } catch (error) {
      alert("회원가입 오류!!")
      console.log("SignUp Error :", error);
    } finally {
      setLoading(false);
      setPopupActive(false);
    }
  }

  return(
    <PopupStyle.PopupBackground>
      <PopupStyle.PopupBody>
        <PopupStyle.PopupCloseButton onClick={() => {setPopupActive(false)}}>
          <PopupStyle.CloseImage />
        </PopupStyle.PopupCloseButton>

        <PopupStyle.PopupForm onSubmit={(e) => PopupSubmit(e)}>
          <PopupStyle.PopupBodyTitle>회원가입</PopupStyle.PopupBodyTitle>
          <PopupStyle.PopupInputWrap>
            <PopupStyle.PopupLabel htmlFor="userId">이메일</PopupStyle.PopupLabel>
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
                                   onChange={((e) => {setUserPw(e.target.value)})}/>
          </PopupStyle.PopupInputWrap>

          <PopupStyle.PopupInputWrap>
            <PopupStyle.PopupLabel>닉네임</PopupStyle.PopupLabel>
            <PopupStyle.PopupInput type="text"
                                   id="userName"
                                   value={userName}
                                   placeholder='사용하실 닉네임을 적어주세요.'
                                   onChange={((e) => {setUserName(e.target.value)})}/>
          </PopupStyle.PopupInputWrap>
          <PopupStyle.PopupButton value="회원가입" type="submit"/>
        </PopupStyle.PopupForm>
        
      </PopupStyle.PopupBody>
    </PopupStyle.PopupBackground>
  )
}

export default Popup;