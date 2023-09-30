import React, { useState } from 'react';
import { MyPageSubItem, MyPageChangePwItemBox, MyPageChangePwArea } from '@styles/MyPageStyle';

const ChangePwTrue = React.memo(() => {
  return (
    <>
      <div className="my-page-changePw-title">비밀번호 변경</div>
      <MyPageChangePwArea>
        <li>
          <label htmlFor='curPw' className='pwInputLabel'>현재 비밀번호</label>
          <input type="password"
                 id="curPw"
                 className="pwInput" 
                 value="" />
        </li>
      </MyPageChangePwArea>
      <MyPageChangePwArea>
        <li>
          <label htmlFor='newPw' className='pwInputLabel'>새로운 비밀번호</label>
          <input type="password"
                 id="newPw" 
                 className="pwInput"
                 value="" />
        </li>
      </MyPageChangePwArea>
      <MyPageChangePwArea>
        <li>
          <label htmlFor='newPwChk' className='pwInputLabel'>새로운 비밀번호 확인</label>
          <input type="password"
                 id="newPwChk" 
                 className="pwInput"
                 value="" />
        </li>
      </MyPageChangePwArea>
      <MyPageChangePwArea>
        <li>
          <button className="change-pw-btn changePwBtn">취소</button>
          <button className="change-pw-btn changePwBtn">변경하기</button>
        </li>
      </MyPageChangePwArea>
    </>
  )
})

export const MyPageChangePw : React.FC = () => {
  const [changeActive, setChangeActive] = useState<boolean>(true);

  return (
    <MyPageSubItem>
      {!changeActive 
        ? 
        <MyPageChangePwItemBox>
          <button className="change-pw-btn" onClick={() => {setChangeActive(true)}}>
            <span>비밀번호 변경하기</span>
          </button>
        </MyPageChangePwItemBox>
        :
        <MyPageChangePwItemBox>
          <ChangePwTrue></ChangePwTrue>
        </MyPageChangePwItemBox>
        
      }
    </MyPageSubItem>
  )
}