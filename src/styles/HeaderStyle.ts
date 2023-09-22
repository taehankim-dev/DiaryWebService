import styled from '@emotion/styled';

//Header
export const HeaderContainer = styled.header`
  position: fixed;
  z-index: 3;
  display : grid;
  width: 100%;
  height: 80px;
  grid-template-columns : 1fr 3fr 1fr;
  background-color:#dfe6ff;
  *{
    font-family: 'omyu'
  }
`

export const HeaderMenuBar = styled.div`
  >span{
    display: flex;
    height: 100%;
    align-items: center;
    font-size: 1.5rem;
    padding-left: 12px;
    box-sizing: border-box;
    >svg{
      cursor: pointer;
      &:hover{
        transition: all 0.3s;
        transform: scale(1.2);
        font-weight: bold;
      }
    }
    
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

export const SignButtonGroup = styled.div`
  display: flex;
  margin: auto 5px auto auto;
  vertical-align: middle;
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

export const SignLayoutMobile = styled.div`
  @media screen and (min-width: 500px){
    display:none;
  }
`
