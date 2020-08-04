import React, {useContext} from 'react'
import { NavLink } from "react-router-dom";
import UserContext from './User/UserContext'

/** Navigation component that renders different views for logged in/out users */

const Navbar = ({logout}) =>{
    const {curUser} = useContext(UserContext)
    function loggedInLinks (){
        return(
        <ul className="navbar-nav ml-auto">
            <li className="nav-item mr-4">
            <NavLink to="/companies">Companies</NavLink>
            </li>
            <li className="nav-item mr-4">
            <NavLink to="/jobs">Jobs</NavLink>
            </li>
            <li className="nav-item mr-4">
            <NavLink to="/profile">Profile</NavLink>
            </li>
            <li className="nav-item mr-4">
            <NavLink to="/applied">Applied</NavLink>
            </li>
            <li className="nav-item mr-4">
            <NavLink to="/" onClick={logout}>Log Out</NavLink>
            </li>
            </ul>
        )
    }
    function loggedOutLinks(){
        return(
            <ul className="navbar-nav ml-auto">
                <li className="nav-item mr-4">
                <NavLink to="/signup">Sign Up</NavLink>
                </li>
            </ul>
        )
    }

    return(
        <div className="navbar navbar-expand-lg navbar-light nav-custom">
            <NavLink className="navbar-brand text-white"to="/">Jobly</NavLink>
            {curUser ? loggedInLinks() : loggedOutLinks()}
        </div>
    )
}

export default Navbar;