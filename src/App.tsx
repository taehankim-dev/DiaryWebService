import Header from "@components/Header";
import Menu from "@components/Menu";
import PageRoutes from "@pages/PageRoutes";
import styled from "@emotion/styled";

const ArticleContanier = styled.div`
  display:grid;
  grid-template-columns : 1fr 4fr;
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
