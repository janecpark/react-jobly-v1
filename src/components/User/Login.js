import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import JoblyApi from '../../JoblyApi';
import Alert from '../Alert'
import './Profile.css'

/**Log in form that logs in users and sets the token in localStorage */

const Login = ({setToken}) =>{
const history = useHistory()
const [formData, setFormData] = useState({
    username:"", 
    password:"",
    errors:[]
})
    const handleChange = (e) =>{
        const { name, value} = e.target
        setFormData(formData =>({
            ...formData,
            [name]: value
        }))
    }
    async function handleSubmit(e){
        e.preventDefault()
        let data={
            username:formData.username,
            password:formData.password
        }

        try{
           let token = await JoblyApi.login(data)
            setToken(token)
            
            
        }catch(errors){
            return setFormData(f=> ({...f, errors}))
        }
        
        history.push('/jobs')

    }

    const loginForm = (
        <form onSubmit={handleSubmit} className="logForm">
            <div className="form-group">
            <label htmlFor="username">Username</label>
            <input type="text"
                   className="form-control"
                   id="username" 
                   name="username" 
                   onChange={handleChange}
                   value={formData.username}
                   />
                   </div>
            <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" 
                   className="form-control"
                   id="password"
                   name="password" 
                   onChange={handleChange}
                   value={formData.password}
                   />
                   </div>
            <button className="btn btn-primary btn-block">Login</button>
        </form>
    )
    return(
        <div className="Login">
            {formData.errors.length ? (
                <Alert type="danger" messages={formData.errors} />
            ) : null}
            {loginForm}
        </div>
    )
}

export default Login;