import React from 'react';
import HeaderSign from './HeaderSign';

import { HeaderContainer } from '@styles/HeaderStyle';
import { useNavigate } from 'react-router-dom';

const Header : React.FC = () => {
  const navigate = useNavigate();
  return (
    <>
      <HeaderContainer>
        <div></div>
        <div style={{textAlign:'center', cursor:'default'}}>
          <h1>
            <span style={{cursor:"pointer"}} onClick={() => {navigate("/")}}>오늘의 할 일</span>
          </h1>
        </div>
        <HeaderSign />
      </HeaderContainer>
    </>
  )
}

export default Header;