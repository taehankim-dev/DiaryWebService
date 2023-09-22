import { atom } from "recoil"

const MenuState = atom({
  key: 'menuState',
  default: false,
})

const LoginPopupState = atom({
  key: 'loginPopupState',
  default: false,
})

const SignUpPopupState = atom({
  key: 'signUpPopupState',
  default: false,
})

const isLoadingState = atom({
  key: 'isLoadingState',
  default: false,
})

export {
  MenuState,
  LoginPopupState,
  SignUpPopupState,
  isLoadingState
}