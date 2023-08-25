import { atom } from "recoil";

const isLoginState = atom({
  key: 'isLogin',
  default : false,
})

const userInfo = atom({
  key: 'userInfo',
  default : [{
    uid: "",
    email: "",
    displayName: ""
  }]
})

export {
  isLoginState,
  userInfo
}