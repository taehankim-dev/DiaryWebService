import React from 'react';
import { useRecoilValue } from 'recoil';
import { isLoginState } from '@states/UserState';
import Header from '@components/header/Header';
import NonMemberHome from './nonMembers/Home';
import CalendarHome from './members/calendar/CalendarHome';
import Menu from '@components/menu/Menu';

const Home : React.FC = () => {
  const isLogIn = useRecoilValue(isLoginState);

  return (
    <>
      <Header />
      <Menu />
      {isLogIn ? 
        <CalendarHome />
        :
        <NonMemberHome />
      }        
    </>
    
  )
}

export default Home;