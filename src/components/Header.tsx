import React from 'react';
import styled from '@emotion/styled';

const HeaderContainer = styled.div`
  display : grid;
  grid-template-columns : 1fr 3fr 1fr;
`

const Header : React.FC = () => {
  return (
    <>
      <HeaderContainer>
        <div>logo</div>
        <div style={{textAlign:'center'}}>Header</div>
        <div>123</div>
      </HeaderContainer>
    </>
  )
}

export default Header;