import React, { useState } from 'react';
import { ChangePasswordItem } from './ChangePasswordItem';
import { MyPageSubItem, MyPageChangePwItemBox } from '@styles/MyPageStyle';

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
          <ChangePasswordItem  setChangeActive={setChangeActive}/>
        </MyPageChangePwItemBox>
        
      }
    </MyPageSubItem>
  )
}