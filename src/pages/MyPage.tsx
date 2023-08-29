import React from 'react';
import Header from '@components/header/Header';

import { PageContainer } from '@styles/PageLayout';

const MyPage : React.FC = () => {
  return (
    <>
      <Header />
      <PageContainer>
        Mypage
      </PageContainer>
    </>
  )
}

export default MyPage;