import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { useSetRecoilState } from 'recoil';
import { MenuState } from '@states/PopupState';
import HeaderSign from './HeaderSign';
import { HeaderContainer, HeaderMenuBar } from '@styles/HeaderStyle';

const Header : React.FC = () => {
  const navigate = useNavigate();
  const setIsMenu = useSetRecoilState(MenuState);

  return (
    <HeaderContainer>
      <HeaderMenuBar>
        <span>
          <Icon icon="fe:bar" onClick={() => {setIsMenu(true)}}/>
        </span>
      </HeaderMenuBar>
      <div style={{textAlign:'center', cursor:'default'}}>
        <h1>
          <span style={{cursor:"pointer"}} onClick={() => {navigate("/")}}>오늘의 할 일</span>
        </h1>
      </div>
      <HeaderSign />
    </HeaderContainer>
  )
}

export default Header;