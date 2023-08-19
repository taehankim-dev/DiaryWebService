import { useRecoilValue } from "recoil";
import styled from "@emotion/styled";

import Header from "@components/header/Header";
import Menu from "@components/Menu";
import PageRoutes from "@pages/PageRoutes";
import Loading from "@components/loading/Loading";
import Login from "@components/login/Login";
import SignUp from "@components/signup/SignUp";

import "./assets/fonts/Font.css";

import { LoginPopupState, SignUpPopupState, isLoadingState } from "@states/PopupState";

const ArticleContanier = styled.div`
  display:grid;
  grid-template-columns : 1fr 4fr;
  *{
    font-family: 'omyu';
  }
`

function App() {
  const isLoading = useRecoilValue(isLoadingState);
  const loginActive = useRecoilValue(LoginPopupState);
  const signUpActive = useRecoilValue(SignUpPopupState);

  return (
    <>
      <Header />
      <ArticleContanier>
        <Menu />
        <PageRoutes />
      </ArticleContanier>

      {isLoading ? <Loading /> : <></>}
      {loginActive ? <Login /> : <></>}
      {signUpActive ? <SignUp /> : <></>}
    </>
    
  )
}

export default App;
