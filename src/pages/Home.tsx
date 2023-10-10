import React, { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { isLoginState } from '@states/UserState';
import { isLoadingState } from '@states/PopupState';
import Header from '@components/header/Header';
import NonMemberHome from './nonMembers/Home';
import Loading from '@components/loading/Loading';
import CalendarHome from './members/calendar/CalendarHome';
import Menu from '@components/menu/Menu';

const Home : React.FC = () => {
  const isLogIn = useRecoilValue(isLoginState);
  const loading = useRecoilValue(isLoadingState);
  console.log(loading);

  useEffect(() => {
    console.log(loading)
  }, [loading])

  return (
    <>
      <Header />
      <Menu />
      {!loading ? 
          isLogIn ? 
          <CalendarHome />
          :
          <NonMemberHome />
        :
        <Loading /> 
      }
    </>
    
  )
}

export default Home;