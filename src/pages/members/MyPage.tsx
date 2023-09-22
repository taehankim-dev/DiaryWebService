import React from 'react';
import { PageContainer } from '@styles/PageLayout';
import { useRecoilValue } from 'recoil';
import { MenuState } from '@states/PopupState';
import Header from '@components/header/Header';
import Menu from '@components/menu/Menu';

const MyPage : React.FC = () => {
  console.log(useRecoilValue(MenuState));

  return (
    <>
      <Header />
      <Menu />
      <PageContainer>
        Mypage
      </PageContainer>
    </>
  )
}

export default MyPage;