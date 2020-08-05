import React from 'react'
import './Company.css'
import defaultLogo from './default-logo.png'
import { Link } from "react-router-dom";

/** Card component for a company */

const Company = ({name, desc, handle}) =>{
    
    return(
        <Link className="Company card" to={`/company/${handle}`} key={handle}>
            <div className="card-body">
            <h6 className="card-title d-flex justify-content-between">
            <span className="Company-title">{name}</span>
            <img src={ defaultLogo} alt={`${name}`}/>
            </h6>
            <p>{desc}</p>
            </div>
        </Link>
    )
}

export default Company;