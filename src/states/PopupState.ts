import { atom } from "recoil"

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
  LoginPopupState,
  SignUpPopupState,
  isLoadingState
}