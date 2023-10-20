import React, { useState, useCallback } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { EmailAuthProvider, getAuth, reauthenticateWithCredential, updatePassword } from '@fb';
import { useSignOut } from '@hooks/useSignOut';
import { MyPageChangePwArea } from '@styles/MyPageStyle';
import { userInfo } from '@states/UserState';
import { RenderCurPwItem } from './ChangeCurPw';
import { RendernewPwItem } from './ChangeNewPw';
import { RenderChknewPwItem } from './ChangeChkNewPw';
import { useNavigate } from 'react-router-dom';
import { isLoadingState } from '@states/PopupState';

type Props = {
  setChangeActive : (value : boolean) => void,
}

interface RenderBtnItemI {
  onClickCancel : () => void,
  onClickNewPw: () => void
}

// 버튼 렌더링
const RenderBtnItem = React.memo<RenderBtnItemI>((
  {onClickCancel, onClickNewPw}
) => {
  return (
    <MyPageChangePwArea>
      <li>
        <button className="change-pw-btn changePwBtn my-page-button"
                onClick={onClickCancel}>
            <span>취소</span>
        </button>
        <button className="change-pw-btn changePwBtn my-page-button"
                onClick={onClickNewPw}>
          <span>변경하기</span>
        </button>
      </li>
    </MyPageChangePwArea>
  )
})

export const ChangePasswordItem : React.FC<Props> = ({
  setChangeActive
}) => {
  const navigate = useNavigate();
  const [curPw, setCurPw] = useState<string>("");
  const [newPw, setNewPw] = useState<string>("");
  const [chkNewPw, setChkNewPw] = useState<string>("");
  const user = useRecoilValue(userInfo);
  const setLoadingState = useSetRecoilState(isLoadingState);
  const { signOut } = useSignOut();

  // 취소버튼 클릭.
  const onClickCancel = useCallback(() => {
    setCurPw("");
    setNewPw("");
    setChkNewPw("");
    setChangeActive(false);
  }, [setChangeActive]);

  // 변경할 비밀번호 확인
  const checkBeforenewPw = useCallback(() => {
    if(curPw === '') {
      alert("현재 비밀번호를 입력해주세요.")
      return false;
    } 

    if(newPw === '') {
      alert("새로운 비밀번호를 입력해주세요.")
      return false;
    } 

    if(newPw.length < 6){
      alert("새로운 비밀번호를 6자 이상만 가능합니다.")
      return false;
    }

    if(chkNewPw === ''){
      alert("새로운 비밀번호 확인을 입력해주세요.")
      return false;
    }

    if(newPw === curPw){
      alert("새로운 비밀번호가 기존 비밀번호와 동일합니다. 다른 비밀번호를 사용해주세요.");
      return false;
    }

    if(newPw !== chkNewPw){
      alert("새로운 비밀번호가 다릅니다. 다시 확인해주세요.")
      return false;
    }

    return true;
  }, [newPw, chkNewPw, curPw]);

  // 변경하기 클릭.
  const onClickNewPw = useCallback(async() => {
    if(!checkBeforenewPw()) return;

    if(window.confirm("비밀번호를 변경하시겠습니까?")){
      setLoadingState(true)
      const isUser = EmailAuthProvider.credential(user.email, curPw);
      try{
        const auth = getAuth();
        if(auth.currentUser) {
          await reauthenticateWithCredential(auth.currentUser, isUser);
          await updatePassword(auth.currentUser, newPw);
        }

        alert("비밀번호가 변경되었습니다. 다시 로그인해주세요.");
        await signOut();
        navigate("/")

      } 
      catch(error){
        const { code } = error as unknown as {code : string, message : string};
        if(code === 'auth/wrong-password'){
          alert("현재 비밀번호를 확인해주세요.");
        } else if(code === 'auth/weak-password'){
          alert("비밀번호")
        }
      } finally {
        setLoadingState(false);
      }
    }
    
  },[checkBeforenewPw, setLoadingState, user.email, curPw, signOut, navigate, newPw]);

  return (
    <>
      <div className="my-page-subTitle">비밀번호 변경</div>
      <RenderCurPwItem curPw={curPw} setCurPw={setCurPw}/>
      <RendernewPwItem newPw={newPw} setNewPw={setNewPw}/>
      <RenderChknewPwItem chknewPw={chkNewPw} setChkNewPw={setChkNewPw}/>
      <RenderBtnItem onClickCancel={onClickCancel} onClickNewPw={onClickNewPw}/>
    </>
  )
}