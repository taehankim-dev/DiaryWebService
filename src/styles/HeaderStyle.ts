import styled from '@emotion/styled';

//Header
export const HeaderContainer = styled.div`
  display : grid;
  grid-template-columns : 1fr 3fr 1fr;
  *{
    font-family: 'omyu'
  }
`

// HeaderSign
export const SignLayoutPC = styled.div`
  display: flex;
  width:50%;
  margin-left:auto;
  @media screen and (max-width: 500px){
    display:none;
  }
  @media screen and (max-width: 950px){
    width:80%;
  }
`

export const SignLayoutMobile = styled.div`
  @media screen and (min-width: 500px){
    display:none;
  }
`

export const SignButton = styled.button`
  display:flex;
  margin-left:auto;
  border: none;  
  border-radius: 14px;
  background:none;
  transition:all 0.3s;
  cursor: pointer;
  &:hover{
    font-size:1.05rem;
    font-weight:bold;
  }
`
