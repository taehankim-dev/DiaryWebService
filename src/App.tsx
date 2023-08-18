import Header from "@components/header/Header";
import Menu from "@components/Menu";
import PageRoutes from "@pages/PageRoutes";
import styled from "@emotion/styled";
import "./assets/fonts/Font.css";

const ArticleContanier = styled.div`
  display:grid;
  grid-template-columns : 1fr 4fr;
  *{
    font-family: 'omyu';
  }
`

function App() {
  return (
    <div>
      <Header />
      <ArticleContanier>
        <Menu />
        <PageRoutes />
      </ArticleContanier>
    </div>
    
  )
}

export default App;
