import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { EmailAuthProvider, authService, deleteUser, reauthenticateWithCredential } from '@fb';
import { MyPageTextBody } from '@styles/MyPageStyle';
import { isLoadingState } from '@states/PopupState';
import { isLoginState } from '@states/UserState';
import { RenderDelUserPwItem } from './DeleteUserPw';

interface PropsI {
  setChangeAcitve : (value : boolean) => void
}

const DeleteUserItem : React.FC<PropsI> = ({setChangeAcitve}) => {
  const navigate = useNavigate();
  const [isCheckNotice, setIsCheckNotice] = useState<boolean>(false);
  const [pw, setPw] = useState<string>("");
  const setIsLoading = useSetRecoilState(isLoadingState);
  const setLogin = useSetRecoilState(isLoginState);

  // 회원탈퇴.
  const onClickDelUser = useCallback(async() => {
    if(!isCheckNotice) {
      alert("안내사항을 확인해주세요.");
      return;
    }

    if(pw === ''){
      alert("비밀번호를 입력해주세요.");
      return;
    }

    setIsLoading(true);
    try{
      const auth = authService;
      const user = auth.currentUser;

      if(user) {
        if(user.email){
          const authCredential = EmailAuthProvider.credential(user.email, pw);
          await reauthenticateWithCredential(user, authCredential);
        }
        
        await deleteUser(user);
        alert("회원 탈퇴가 정상적으로 이루어졌습니다. 이용해주셔서 감사합니다.")
        
        setLogin(false);
        navigate("/");
      }
    }catch(err){
      const { code } = err as unknown as {code : string, message : string};
      if(code === 'auth/wrong-password'){
        alert("입력하신 비밀번호가 다릅니다.")
      }
      console.log("DeleteUser Error :", err);
    }finally{
      setIsLoading(false);
    }
    
  }, [isCheckNotice, navigate, pw, setIsLoading, setLogin])

  return (
    <>
      <MyPageTextBody>
        <p className='my-page-body-title'>회원 탈퇴 전 확인하세요.</p>
        <div className="my-page-body-notice">
          <p>탈퇴하시면 이용 중인 웹 캘린더는 사용이 불가하며,</p>
          <p>모든 데이터는 복구 불가능합니다.</p>
        </div>
        <div className="my-page-body-sub-notice">
          <p>가입하셨던 회원 정보는 모두 삭제됩니다.</p>
        </div>
        <div className="my-page-body-check-box">
          <input type="checkbox" 
                 checked={isCheckNotice}
                 onChange={() => {setIsCheckNotice(true)}} /> 
          <span>안내사항을 모두 확인했으며, 이에 동의합니다.</span>
        </div>
        <div className="my-page-body-check-pw">
          <RenderDelUserPwItem pw={pw} setPw={setPw}/>
        </div>
        <div className="my-page-body-button-box">
          <button className="my-page-button"
                  onClick={onClickDelUser}>탈퇴하기</button>
          <button className="my-page-button"
                  onClick={() => {setChangeAcitve(false)}}>취소</button>
        </div>
      </MyPageTextBody>
    </>
  )
}

export default DeleteUserItem;