import React, { useState } from 'react';
import { ChangePasswordItem } from './ChangePasswordItem';
import { MyPageSubItem, MyPageSubItemBoxWrap } from '@styles/MyPageStyle';

export const MyPageChangePw : React.FC = () => {
  const [changeActive, setChangeActive] = useState<boolean>(false);

  return (
    <MyPageSubItem>
      {!changeActive 
        ? 
        <MyPageSubItemBoxWrap>
          <button className="mypage-sub-item-btn" onClick={() => {setChangeActive(true)}}>
            <span>비밀번호 변경하기</span>
          </button>
        </MyPageSubItemBoxWrap>
        :
        <MyPageSubItemBoxWrap>
          <ChangePasswordItem  setChangeActive={setChangeActive}/>
        </MyPageSubItemBoxWrap>
        
      }
    </MyPageSubItem>
  )
}