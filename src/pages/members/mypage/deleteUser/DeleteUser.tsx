import React, { useState } from 'react';
import { MyPageSubItem, MyPageSubItemBoxWrap } from '@styles/MyPageStyle';
import DeleteUserItem from './DeleteUserItem';

export const MyPageDeleteUser : React.FC = () => {
  const [changeActive, setChangeActive] = useState<boolean>(false);

  return (
    <MyPageSubItem>
      {!changeActive
        ?
        <MyPageSubItemBoxWrap>
          <button className="mypage-sub-item-btn mypage-sub-item-btn-red"
                  onClick={() => setChangeActive(true)}>
            <span>회원 탈퇴</span>
          </button>
        </MyPageSubItemBoxWrap>
        :
        <MyPageSubItemBoxWrap>
          <DeleteUserItem setChangeAcitve={setChangeActive}/>
        </MyPageSubItemBoxWrap>
      }
      
    </MyPageSubItem>
  )
}