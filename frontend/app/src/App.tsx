import './App.css';
import React, { useState, useEffect, createContext } from 'react';
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
import { User } from './interfaces';
import { getCurrentUser } from './lib/api/auth';

export const AuthContext = createContext({} as {
  // loading: boolean
  // setLoading: React.Dispatch<React.SetStateAction<boolean>>
  isSignedIn: boolean
  setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>
  currentUser: User | undefined
  setCurrentUser: React.Dispatch<React.SetStateAction<User | undefined>>
})


function App() {
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false)
  const [currentUser, setCurrentUser] = useState<User | undefined>()

  const handleGetUserCurrent = async() => {
    try {
        const response = await getCurrentUser()
        if (response?.data.is_login === true) {
            console.log(response.data);
            setIsSignedIn(true)
            setCurrentUser(response?.data.data)
            console.log("current user")
        } else {
            localStorage.clear()
            console.log("not current user")
        }
    } catch(err) {
        console.log(err)
    }
  }

  useEffect(() => {
    console.log("called handleGetUserCurrent!!!!!!!!!")
    handleGetUserCurrent()
  }, [setCurrentUser, setIsSignedIn])


// TODO: Loadingと場合分け



  return (
    <div className="App">
      <AuthContext.Provider value={{ isSignedIn, setIsSignedIn, currentUser, setCurrentUser }}>
        <Routes>
          <Route path="PostCreate" element={ <PostCreate /> }/>
          <Route path="PostUpdate" element={ <PostUpdate /> }/>
          <Route path="UserProfile" element= { <UserProfile /> }></Route>
          <Route path="/" element={ <Home /> } />
        <Route path="/LocationPostDeatil" element={ <LocationPostDetail /> } />
        <Route path="/LocationPosts" element={ <LocationPosts /> }>
          <Route index element={ <LocationPostsIndex /> }/>
          <Route path=":locationPostId" element={ <LocationPost /> } />
        </Route>
        <Route path="SignUp" element= { <SignUp /> }></Route>
        <Route path="SignIn" element= { <SignIn /> }></Route>
        <Route path="*" element={ <NotFound /> } />
        </Routes>
      </AuthContext.Provider> 
    </div>
  );
}

export default App;