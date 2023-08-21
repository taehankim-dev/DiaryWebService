import { atom } from "recoil";

const isLogin = atom({
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
  isLogin,
  userInfo
}