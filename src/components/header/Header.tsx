import React from 'react';
import HeaderSign from './HeaderSign';

import { HeaderContainer } from '@styles/HeaderStyle';

const Header : React.FC = () => {
  return (
    <>
      <HeaderContainer>
        <div></div>
        <div style={{textAlign:'center'}}>
          <h1>오늘의 할 일</h1>
        </div>
        <HeaderSign />
      </HeaderContainer>
    </>
  )
}

export default Header;