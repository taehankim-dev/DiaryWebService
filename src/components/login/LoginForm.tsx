import { useCallback, useState } from "react";
import { useSetRecoilState } from "recoil";
import { browserLocalPersistence, getAuth, setPersistence, signInWithEmailAndPasswordService } from "@fb";
import { useCheckLogin } from "@hooks/useCheckLogin";
import { isLoginState, userInfo } from "@states/UserState";
import { LoginPopupState } from "@states/PopupState";
import { PopupButton, PopupForm, PopupInput, PopupInputWrap, PopupLabel } from "@styles/PopupStyle"

interface PropsI {
  setIsLoading: (value: boolean) => void
}

export const LoginForm : React.FC<PropsI> = ({
  setIsLoading
}) => {
  const [userId, setUserId] = useState<string>(""); // user ID
  const [userPw, setUserPw] = useState<string>(""); // user password
  const setUserInfo = useSetRecoilState(userInfo); // 사용자 정보
  const setLogin = useSetRecoilState(isLoginState);
  const setLoginActive = useSetRecoilState(LoginPopupState);
  const {message, loginCheck} = useCheckLogin(userId);

  // 로그인
  const loginSubmit = useCallback(async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(!loginCheck){
      alert(message);
      return;
    } 

    try{
      setIsLoading(true);
      const auth = getAuth();

      const { user } = await signInWithEmailAndPasswordService(auth, userId, userPw);
      if(user.emailVerified){
        setUserInfo(
          {
            uid : user.uid,
            email : user.email !== null ? user.email : "",
            displayName : user.displayName !== null ? user.displayName : "",
          }
        )
        
        // 로그인 유지를 위해 session에 저장.
        await setPersistence(auth, browserLocalPersistence)
        
        setLogin(true);
        alert("로그인이 완료되었습니다.");
        setLoginActive(false);
      } else {
        alert("이메일 인증이 필요합니다.");
      }

    } catch(error) {
      const {code} = error as unknown as {code : string, message : string};
      if (code == 'auth/user-not-found') {
        alert('없는 사용자입니다.');
      }
      if (code == 'auth/wrong-password') {
        alert('비밀번호를 다시 확인해주세요');
      }
      if (code == 'auth/too-many-requests') {
        alert('잠시 후 다시 시도해 주세요');
      }
    } finally {
      setIsLoading(false);
    }
  }, [loginCheck, message, setIsLoading, setLogin, setLoginActive, setUserInfo, userId, userPw])

  // 이메일 변경
  const onChangeUserId = useCallback((e : React.ChangeEvent<HTMLInputElement>) => {
    setUserId(e.target.value)
  }, [])

  // 비번 변경
  const onChangeUserPw = useCallback((e : React.ChangeEvent<HTMLInputElement>) => {
    setUserPw(e.target.value)
  }, [])

  return (
    <PopupForm onSubmit={loginSubmit}>
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
                              onChange={onChangeUserPw}
                            />
      </PopupInputWrap>
      <PopupButton value="로그인" type="submit"/>
    </PopupForm>
  )
}