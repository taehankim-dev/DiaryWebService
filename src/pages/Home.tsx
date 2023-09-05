import React from 'react';
import { PageContainerWithMenu } from '@styles/PageLayout';
import Header from '@components/header/Header';
import { useRecoilValue } from 'recoil';
import { isLoginState } from '@states/UserState';
import Calendar from './Calendar';
// import Menu from '@components/Menu';


const Home : React.FC = () => {
  const isLogIn = useRecoilValue(isLoginState)

  return (
    <>
      <Header />
      <PageContainerWithMenu>
        {/* <Menu /> */}
        {
          isLogIn 
          ?
          <Calendar />
          :
          <>Home</>
        }
      </PageContainerWithMenu>
    </>
    
  )
}

export default Home;