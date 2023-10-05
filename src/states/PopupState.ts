import { atom } from "recoil"

const MenuState = atom({
  key: 'menuState',
  default: false,
})

// 로그인 팝업
const LoginPopupState = atom({
  key: 'loginPopupState',
  default: false,
})

// 회원가입 팝업
const SignUpPopupState = atom({
  key: 'signUpPopupState',
  default: false,
})

const FindPasswordPopupState = atom({
  key: "findPasswordPopupState",
  default: false,
})

// 로딩 팝업
const isLoadingState = atom({
  key: 'isLoadingState',
  default: false,
})



export {
  MenuState,
  LoginPopupState,
  SignUpPopupState,
  isLoadingState,
  FindPasswordPopupState
}