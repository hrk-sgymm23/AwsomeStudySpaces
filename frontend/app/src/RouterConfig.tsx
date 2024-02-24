import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import  App  from './App'
import  DetailPost from './DetailPost';


export const RouterConfig:React.VFC =() => {
  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route index element={<App />} />
        <Route path="detailPost" element={<DetailPost />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}