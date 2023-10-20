import { useCallback, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { getAuth, createUserWithEmailAndPassword, updateProfileService, sendEmailVerification, signInWithEmailAndPasswordService } from '@fb';
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
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const {message, loginCheck} = useCheckLogin(userId);

  // 이메일 인증과 회원가입
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

    const auth = getAuth();

    // 처음 입력시 이메일 인증 부분.
    if(!isVerified){
      setIsLoading(true);
      await createUserWithEmailAndPassword(auth, userId, userPw);

      if(auth.currentUser) {
        await updateProfileService(auth.currentUser, {displayName : userName});
        await sendEmailVerification(auth.currentUser);
        alert("입력하신 이메일로 인증 확인 메일을 보냈습니다. 확인해주세요!");
        setIsVerified(true);
      }

      setIsLoading(false);
    } else {
      // 이메일 인증 메일을 보낸 후,
      setIsLoading(true);
      try{
        const { user } = await signInWithEmailAndPasswordService(auth, userId, userPw);
        if(user.emailVerified){
          alert("회원가입이 완료되었습니다!");
          setSignUpActive(false);
        } else {
          alert("이메일 인증 후 회원가입이 가능합니다. 이메일을 확인해주세요.");
        }
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
      {!isVerified
        ?
        <PopupButton value="이메일 인증" type='submit'/>
        :
        <PopupButton value="회원가입" type="submit"/>
      }
      
    </PopupForm>
  )
}