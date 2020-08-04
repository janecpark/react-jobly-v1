import React from 'react'
import './Job.css'

/** Job card component */


const Job = ({title, salary, equity, idx, apply, state, removeApply}) =>{
  
    return(
        <div className="Card card">
        <div className="card-body">
        <h6 className="card-title d-flex justify-content-between">
            <div className="Job-title">{title}</div>
            </h6>
            <div>Salary: {salary}</div>
            <div>Equity: {equity}</div>
  
            {state ===  'applied' ?   
            <button className="btn remove" onClick={() =>removeApply(idx)}>Remove</button> : 
            <button className="btn btn-primary" onClick={()=>apply(idx)}>Apply</button>}
            </div>
        </div>
    )
}

Job.defaultProps={
    apply:() =>{
        
    }
}
export default Job;