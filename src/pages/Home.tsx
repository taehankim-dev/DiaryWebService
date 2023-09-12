import React from 'react';
import Header from '@components/header/Header';
import { useRecoilValue } from 'recoil';
import NonMemberHome from './nonMembers/Home';
import Loading from '@components/loading/Loading';
import { isLoginState } from '@states/UserState';
import { isLoadingState } from '@states/PopupState';
import Calendar from './members/calendar/Calendar';

const Home : React.FC = () => {
  const isLogIn = useRecoilValue(isLoginState);
  const loading = useRecoilValue(isLoadingState);
  return (
    <>
      <Header />
      {!loading ? 
        isLogIn ? 
        <Calendar />
        :
        <NonMemberHome />
        :
        <Loading /> 
      }
    </>
    
  )
}

export default Home;