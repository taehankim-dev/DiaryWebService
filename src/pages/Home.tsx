import React from 'react';
import Header from '@components/header/Header';
import { useRecoilValue } from 'recoil';
import { isLoginState } from '@states/UserState';
import MemberHome from './members/Home';
import NonMemberHome from './nonMembers/Home';

const Home : React.FC = () => {
  const isLogIn = useRecoilValue(isLoginState)

  return (
    <>
      <Header />
      {isLogIn ? 
        <MemberHome />
        :
        <NonMemberHome />
      }
    </>
    
  )
}

export default Home;