import styled from '@emotion/styled';

export const MenuLayout = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  width: 100%;
  height: 100vh;
  background: rgba(0,0,0,0.7);
  *{
    font-family: 'omyu'
  }
`

export const MenuWrap = styled.div`
  width: 20%;
  height: 100%;
  background: white;
`

export const CloseWrap = styled.div`
  display: flex;
  width: 100%;
  height: 80px;
  padding-left: 12px;
  border-bottom: 1px solid #ccc;
  align-items: center;
  box-sizing: border-box;
  >svg{
    font-size: 1.5rem;
    &:hover{
      transition: all 0.3s;
      transform: scale(1.1) rotate(90deg);
    }
  }
`

export const MenuItemsWrap = styled.div`
  ul{
    margin: 0;
    padding: 0;
    li{
      list-style: none;
      padding: 20px;
      box-sizing: border-box;
      color: #605f5f;
      font-size: 1.5rem;
      border-bottom: 1px solid #ccc;
      &:hover{
        color: black;
        cursor: pointer;
      }
    }
  } 
`