import React, { useCallback, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { getAuth, sendPasswordResetEmail } from '@fb';
import * as PopupStyle from '@styles/PopupStyle';
import { useCheckLogin } from '@hooks/useCheckLogin';
import { FindPasswordPopupState, LoginPopupState } from '@states/PopupState';

const FindPassword : React.FC = () => {
  const setFindPwActive = useSetRecoilState(FindPasswordPopupState);
  const setLoginActive = useSetRecoilState(LoginPopupState);
  const [userId, setUserId] = useState<string>("");
  const {message, loginCheck} = useCheckLogin(userId);

  // 비밀번호 재설정.
  const findPwSubmit = useCallback(async(e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(!loginCheck) {
      alert(message);
      return;
    }

    try{
      const auth = getAuth();
      sendPasswordResetEmail(auth, userId).then(() => {
        alert("입력하신 이메일로 비밀번호 재설정 메일을 보냈습니다. 확인해주세요.");
      }).catch(err => {
        console.log("FindPassword SendPasswordResetEmail Error : ", err);
      })
      
    } catch(err){
      console.log("FindPassword Send Email Error : ",err);
    }
  }, [loginCheck, message, userId]);

  // 이메일 입력.
  const onChangeEmail = useCallback((e : React.ChangeEvent<HTMLInputElement>) => {
    setUserId(e.target.value);
  }, [])

  // 로그인 창으로 이동.
  const onClickLogin = useCallback(() => {
    setFindPwActive(false);
    setLoginActive(true);
  }, [setFindPwActive, setLoginActive])


  return (
    <PopupStyle.PopupBackground onClick={() => {setFindPwActive(false)}}>
      <PopupStyle.PopupBody onClick={(e) => e.stopPropagation()}>
        <PopupStyle.PopupCloseButton onClick={() => {setFindPwActive(false)}}>
          <PopupStyle.CloseImage />
        </PopupStyle.PopupCloseButton>

        <PopupStyle.PopupForm onSubmit={findPwSubmit}>
          <PopupStyle.PopupBodyTitle>비밀번호 찾기</PopupStyle.PopupBodyTitle>
          <PopupStyle.PopupInputWrap>
            <PopupStyle.PopupLabel htmlFor='userId'>이메일</PopupStyle.PopupLabel>
            <PopupStyle.PopupInput type="text"
                                   id="userId"
                                   value={userId}
                                   placeholder='이메일을 입력해주세요.'
                                   onChange={onChangeEmail}/>
          </PopupStyle.PopupInputWrap>
          <PopupStyle.PopupButton value="비밀번호 찾기" type='submit' />
        </PopupStyle.PopupForm>
        <PopupStyle.PopupAdditionalWrap count={1}>
          <button onClick={onClickLogin}>로그인</button>
        </PopupStyle.PopupAdditionalWrap>
      </PopupStyle.PopupBody>
    </PopupStyle.PopupBackground>
  )
}

export default FindPassword;