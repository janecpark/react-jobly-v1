import React, {useContext} from 'react'
import UserContext from './User/UserContext'
import Login from './User/Login'
import './Home.css'
import interview from '../interview.svg'

/** Home page shows login form and welcome page */

const Home = ({setToken}) =>{
    const {curUser} = useContext(UserContext)

    function LoggedInView(){
        return(  
            <div className="Home">
                <div className="Header">
                    <h1 className="mb-4 font-weight-bold">Jobly</h1>
                        <p className="lead">All the jobs in one, convenient place.</p>
                    <h3 className="welcome mb-5">Welcome Back {curUser.first_name} !</h3>
                    <img src={interview} className="Home-img"style={{marginBottom:'20px'}} alt="img"/>
                </div>
            </div>
        )    
    }


    function LoggedOutView(){
        return(
            <div className="Home">
                <h1 className="mb-4 font-weight-bold">Jobly</h1>
                    <p className="lead">All the jobs in one, convenient place.</p><br/>
                        <div className="container mt-4">
                            <div className="row justify-content-md-center">
                                <div className="col-md">
                            <img src={interview} className="Home-img" alt="Jobly"/>
                                </div>
                            <div className="col-md">
                        <Login setToken={setToken} />
                    </div>  
                </div>
            </div>
        </div>
        )
    }

    return(
        <>
            {curUser ? LoggedInView() : LoggedOutView()}
        </>
    )
}

export default Home;