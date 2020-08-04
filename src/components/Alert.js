import React from 'react'
import './Home.css'

/**Alerts if wrong information is submitted */


function Alert({type, messages}){
    return(
        <div className={`alert alert-${type}`} role="alert" >
            {messages.map(error =>(
                <p className="mb-0 small" key={error} >
                    {error}
                </p>
            ))}
            </div>
    )
}

export default Alert;