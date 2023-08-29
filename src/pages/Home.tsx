import React from 'react';
import { PageContainerWithMenu } from '@styles/PageLayout';
import Header from '@components/header/Header';
import Menu from '@components/Menu';


const Home : React.FC = () => {
  return (
    <>
      <Header />
      <PageContainerWithMenu>
        <Menu />
        home
      </PageContainerWithMenu>
    </>
    
  )
}

export default Home;