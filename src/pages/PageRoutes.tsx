import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './Home';
import MyPage from '@pages/members/mypage/MyPage';

console.log(import.meta.env.BASE_URL)

const PageRoutes : React.FC = () => {
  return (
    <BrowserRouter basename={`/${import.meta.env.VITE_PUBLIC_URL}`}>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/mypage' element={<MyPage />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default PageRoutes;