import { useRecoilValue } from "recoil";

import PageRoutes from "@pages/PageRoutes";
import Loading from "@components/loading/Loading";
import Login from "@components/login/Login";
import SignUp from "@components/signup/SignUp";

import "./assets/fonts/Font.css";

import { LoginPopupState, SignUpPopupState, isLoadingState } from "@states/PopupState";

function App() {
  const isLoading = useRecoilValue(isLoadingState);
  const loginActive = useRecoilValue(LoginPopupState);
  const signUpActive = useRecoilValue(SignUpPopupState);
  
  return (
    <>
      <PageRoutes />
      {isLoading ? <Loading /> : <></>}
      {loginActive ? <Login /> : <></>}
      {signUpActive ? <SignUp /> : <></>}
    </>
    
  )
}

export default App;
