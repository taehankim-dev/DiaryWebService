import { useSetRecoilState } from 'recoil';
import { authService } from '@fb';
import { isLoginState, userInfo } from '@states/UserState';

export const useSignOut = () => {
  const setUser = useSetRecoilState(userInfo);
  const setLogin = useSetRecoilState(isLoginState);
  const signOut = async() => {
    try{
      await authService.signOut();
      setLogin(false);
      setUser({
        uid: "", 
        email: "", 
        displayName: "",
      })
    } catch(err){
      console.log("useSignOut Error : ", err);
    }
  }

  

  return {signOut};
}