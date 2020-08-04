import React, { useEffect, useState, useContext } from 'react'
import { Route, Switch } from "react-router-dom";
import Companies from './Companies/Companies'
import Jobs from './Jobs/Jobs'
import CompanyDetail from './Companies/CompanyDetail'
import JoblyApi from '../JoblyApi'
import Home from './Home'
import Profile from './User/Profile'
import Login from './User/Login'
import JobContext from './JobContext'
import Applied from './Jobs/Applied'
import Signup from './User/Signup'
import UserContext from './User/UserContext'

/** Routing for the app and fetches data for companies and jobs */

const Routes = ({setToken, loading}) =>{
  const {curUser} = useContext(UserContext)
  const [jobs, setJobs] = useState([])
  
  useEffect(() =>{
    async function fetchData() {
      await curUser
      if(curUser && loading){
        const jobres = await JoblyApi.getJobs()
        jobres.sort(function(a,b){
          return a.id - b.id
        })
        setJobs(jobres);
      }   
    }
    fetchData()
  },[curUser]);

    return(
     <div className="App">
         <Switch>
           <JobContext.Provider value={{jobs, setJobs}}>
             <Route exact path="/"> 
             <Home setToken={setToken}/>
             </Route>
            <Route exact path="/companies"> 
             <Companies />
            </Route>
            <Route exact path="/company/:handle"> 
             <CompanyDetail />
            </Route>
             <Route exact path="/jobs"> 
                <Jobs/>
             </Route>
             <Route exact path="/login"> 
               <Login setToken={setToken}/>
             </Route>
            <Route exact path="/profile"> 
              <Profile />
           </Route>
           <Route exact path="/applied"> 
              <Applied />
           </Route>
           <Route exact path="/signup"> 
              <Signup setToken={setToken} />
           </Route>
           </JobContext.Provider>
      </Switch>
    </div>
    )

}

export default Routes;
