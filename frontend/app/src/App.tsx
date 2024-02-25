import './App.css';
import React from 'react';
import Home from './Home';
import { Routes, Route } from "react-router-dom";
import LocationPostDetail from './LocationPostDetail';
import LocationPosts from './LocationPosts';
import LocationPost from './LocationPost';
import NotFound from './NotFound';
import LocationPostsIndex from './LocationPostsIndex'

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="/LocationPostDeatil" element={ <LocationPostDetail /> } />
        <Route path="/LocationPosts" element={ <LocationPosts /> }>
          <Route index element={ <LocationPostsIndex /> }/>
          <Route path=":locationPostId" element={ <LocationPost /> } />
        </Route>
        <Route path="*" element={ <NotFound /> } />
      </Routes>
    </div>
  );
}

export default App;