import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './Home';
import MyPage from './members/MyPage';

const PageRoutes : React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/mypage' element={<MyPage />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default PageRoutes;