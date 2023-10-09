import { useCallback, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { getAuth, createUserWithEmailAndPassword, updateProfileService, sendEmailVerification } from '@fb';
import { useCheckLogin } from '@hooks/useCheckLogin';
import { SignUpPopupState } from '@states/PopupState';
import { PopupButton, PopupForm, PopupInput, PopupInputWrap, PopupLabel } from "@styles/PopupStyle"

interface PropsI {
  setIsLoading: (value: boolean) => void
}

export const SignUpForm : React.FC<PropsI> = ({
  setIsLoading
}) => {
  const setSignUpActive = useSetRecoilState(SignUpPopupState); // 회원가입 팝업
  const [userId, setUserId] = useState<string>(""); // user ID
  const [userPw, setUserPw] = useState<string>(""); // user password
  const [userName, setUserName] = useState<string>("");
  const {message, loginCheck} = useCheckLogin(userId);

  // 회원가입
  const PopupSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(!loginCheck){
      alert(message);
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
      setIsLoading(true);
      const auth = getAuth();
      await createUserWithEmailAndPassword(auth, userId, userPw);

      if(auth.currentUser) {
        await sendEmailVerification(auth.currentUser)
        await updateProfileService(auth.currentUser, {displayName : userName});
      }

      alert("회원가입이 완료되었습니다. 입력하신 이메일로 인증 후, 로그인 해주세요.");
      setSignUpActive(false);
    } catch (error) {
      const { code } = error as unknown as {code : string, message : string};
      if(code === 'auth/email-already-in-use'){
        alert("이미 등록된 사용자입니다.")
      } else {
        alert("회원가입 오류!!")
      }
    } finally {
      setIsLoading(false);
    }
  }

  // 이메일 변경
  const onChangeUserId = useCallback((e : React.ChangeEvent<HTMLInputElement>) => {
    setUserId(e.target.value)
  }, [])

  // 비번 변경
  const onChangeUserPw = useCallback((e : React.ChangeEvent<HTMLInputElement>) => {
    setUserPw(e.target.value)
  }, [])

  // 이메일 변경
  const onChangeUserName = useCallback((e : React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value)
  }, [])

  return (
    <PopupForm onSubmit={PopupSubmit}>
      <PopupInputWrap>
        <PopupLabel htmlFor="userId">이메일</PopupLabel>
        <PopupInput type='text' 
                              id="userId"
                              value={userId}
                              placeholder='이메일을 입력해주세요.'
                              onChange={onChangeUserId}/>
      </PopupInputWrap>
      <PopupInputWrap>
        <PopupLabel>비밀번호</PopupLabel>
        <PopupInput type="password"
                                id="userPw"
                                value={userPw}
                                placeholder='비밀번호를 입력해주세요.'
                                onChange={onChangeUserPw}/>
      </PopupInputWrap>
      <PopupInputWrap>
        <PopupLabel>닉네임</PopupLabel>
        <PopupInput type="text"
                                id="userName"
                                value={userName}
                                placeholder='사용하실 닉네임을 적어주세요.'
                                onChange={onChangeUserName}/>
      </PopupInputWrap>
      <PopupButton value="회원가입" type="submit"/>
    </PopupForm>
  )
}