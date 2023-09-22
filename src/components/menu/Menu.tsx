import React from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { Icon } from '@iconify/react';
import { MenuLayout, MenuWrap, CloseWrap, MenuItemsWrap } from '@styles/MenuStyle';
import { LoginPopupState, MenuState } from '@states/PopupState';
import { useNavigate } from 'react-router-dom';
import { isLoginState } from '@states/UserState';

// 메뉴 아이템.
const menuItems = [
  {key : 1, title : '달력', go : '/'},
  {key : 2, title : '마이페이지', go : '/mypage'}
]

const Menu : React.FC = () => {
  const navigate = useNavigate();
  const [isMenu, setIsMenu] = useRecoilState(MenuState); 
  const isLogin = useRecoilValue(isLoginState);
  const setLoginPopupState = useSetRecoilState(LoginPopupState);

  // 메뉴 클릭.
  const onClickMenu = (link : string) => {
    setIsMenu(false);
    if(!isLogin) { // 비로그인 시 로그인 화면으로 이동.
      alert("로그인 후 이용할 수 있습니다.");
      setLoginPopupState(true);
      return;
    }
    
    navigate(link)
  }

  // 메뉴 분기.
  if(!isMenu) return <></>;
  
  return (
    <MenuLayout onClick={() => {setIsMenu(false)}}>
      <MenuWrap onClick={(e) => {e.stopPropagation()}}>
        <CloseWrap>
          <Icon icon="uil:times" onClick={() => {setIsMenu(false)}}/>
        </CloseWrap>
        <MenuItemsWrap>
          <ul>
            {menuItems.map(menu => 
              <li key={menu.key} onClick={() => {onClickMenu(menu.go)}}>{menu.title}</li>  
            )}
          </ul>
        </MenuItemsWrap>
      </MenuWrap>
    </MenuLayout>
  )
}

export default Menu;