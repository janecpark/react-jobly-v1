import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import JoblyApi from '../../JoblyApi';
import Alert from '../Alert'
import './Profile.css'

/**Form for the user to sign up to gain access */

const Signup = ({setToken}) =>{
const history = useHistory()

const [formData, setFormData] = useState({
    username:"", 
    password:"",
    first_name: "",
    last_name: "",
    email:"",
    errors:[]
})
    const handleChange = (e) =>{
        const { name, value } = e.target
        setFormData(formData =>({
            ...formData,
            [name]: value
        }))
    }
    async function handleSubmit(e){
        e.preventDefault()
        let data={
            username:formData.username,
            password:formData.password,
            email: formData.email,
            first_name: formData.first_name,
            last_name: formData.last_name,
            // photo_url: formData.photo_url
        }
        let token;
        try{
        token = await JoblyApi.signUp(data)
           
            
        }catch(errors){
            return setFormData(f=> ({...f, errors}))
        }
        
        setToken(token) 
        history.push('/jobs')
   
        
    }

    const signUpForm = (
        <form onSubmit={handleSubmit} className="signUpForm ">
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

            <div className="form-group">
            <label htmlFor="first_name">First Name</label>
            <input type="text" 
                   className="form-control"
                   id="first_name"
                   name="first_name" 
                   onChange={handleChange}
                   value={formData.first_name}
                   />
                   </div>      

            <div className="form-group">
            <label htmlFor="last_name">Last Name</label>
            <input type="text" 
                   className="form-control"
                   id="last_name"
                   name="last_name" 
                   onChange={handleChange}
                   value={formData.last_name}
                   />
                   </div>    

            <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="text" 
                   className="form-control"
                   id="email"
                   name="email" 
                   onChange={handleChange}
                   value={formData.email}
                   />
                   </div>  

            <button className="btn btn-primary btn-block">Sign Up</button>
        </form>
    )
    return(
        <div className="SignUp mb-5">
            <h1 style={{textAlign:'center'}} className="mb-3">Sign up</h1>
            {formData.errors.length ? (
                <Alert type="danger" messages={formData.errors}/>
            ) : null}
            {signUpForm}

        </div>
    )
}

export default Signup;