import React from 'react';
import Header from '@components/header/Header';
import Menu from '@components/menu/Menu';
import { MyPageContainer, MyPageSubItemBox } from '@styles/MyPageStyle';
import { MyPageMyInfo } from './MyPageMyInfo';
import { MyPageChangePw } from './changePassword/ChangePassword';
import { MyPageDeleteUser } from './deleteUser/DeleteUser';

const MyPage : React.FC = () => {
  return (
    <>
      <Header />
      <Menu />
      <MyPageContainer>
        <MyPageSubItemBox>
          <MyPageMyInfo />
        </MyPageSubItemBox>

        <MyPageSubItemBox>
          <MyPageChangePw />
        </MyPageSubItemBox>

        <MyPageSubItemBox>
          <MyPageDeleteUser />
        </MyPageSubItemBox>
      </MyPageContainer>
    </>
  )
}

export default MyPage;