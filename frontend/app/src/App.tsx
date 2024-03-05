import './App.css';
import React from 'react';
import Home from './Home';
import { Routes, Route } from "react-router-dom";
import LocationPostDetail from './LocationPostDetail';
import LocationPosts from './LocationPosts';
import LocationPost from './LocationPost';
import NotFound from './NotFound';
import LocationPostsIndex from './LocationPostsIndex'
import PostCreate from './PostCreate';
import PostUpdate from './PostUpdate'
import SignUp from './SignUp';
import SignIn from './SignIn';
import UserProfile from './UserProfile';

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
        <Route path="PostCreate" element={ <PostCreate /> }/>
        <Route path="PostUpdate" element={ <PostUpdate /> }/>
        <Route path="SignUp" element= { <SignUp /> }></Route>
        <Route path="SignIn" element= { <SignIn /> }></Route>
        <Route path="UserProfile" element= { <UserProfile /> }></Route>
        <Route path="*" element={ <NotFound /> } />
      </Routes>
    </div>
  );
}

export default App;