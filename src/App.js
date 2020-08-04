import React, { useEffect, useState } from 'react';
import Routes from './components/Routes'
import UserContext from './components/User/UserContext'
import { BrowserRouter } from 'react-router-dom'
import JoblyApi from './JoblyApi'
import { decode } from 'jsonwebtoken'
import useLocalStorage from './components/hooks/useLocalStorage';
import Navbar from './components/Navbar'
import './App.css'

/** Handles log in and log out functions. Fetches user data */

function App() {
  const [token, setToken] = useLocalStorage('token')
  const [curUser, setCurUser] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() =>{
    async function getCurUser(){
      try{
        let {username} = decode(token)
        let user = await JoblyApi.getUser(username)
        setCurUser(user)
      }catch(err){
        setCurUser(null)
      }
      setLoading(true)
  }
  setLoading(false)
  getCurUser()
  },[token])

  const handleLogout =() =>{
    setCurUser(null)
    setToken(null)
  }
  if(!loading){
    return(
    <div className="d-flex justify-content-center mt-5">
      <div className="spinner-border"role="status">
       <span className="sr-only">Loading...</span>
      </div>
    </div>
    )
  }

  return (
    <BrowserRouter>
    <UserContext.Provider value={{curUser, setCurUser}}>
      <div className="App">
        <Navbar logout={handleLogout}/>
        <Routes setToken={setToken} loading={loading}/>
      </div>
    </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
