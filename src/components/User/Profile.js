import React, {useState, useContext} from 'react'
import JoblyApi from '../../JoblyApi'
import UserContext from './UserContext'
import './Profile.css'

/**Form to allows users to change their information  */

const Profile = () =>{
    const {curUser, setCurUser} = useContext(UserContext)
    const [formData, setFormData] = useState({
        first_name: curUser.first_name || "",
        last_name: curUser.last_name || "",
        username: curUser.username,
        email: curUser.email || "",
        password: "",
        errors: [],
        saveForm: false
    })

    const handleChange = (e) =>{
        const { name, value } = e.target
        setFormData(data=>({
            ...data,
            [name] : value,
            errors: []
        }))
    }

    async function handleSubmit(e){
        e.preventDefault()
        try{
            let profileData = {
                first_name: formData.first_name,
                last_name: formData.last_name,
                email: formData.email,
                password: formData.password
            }
            let username = formData.username

            const res = await JoblyApi.updateUser(username, profileData)
            setFormData(f=>({
                ...f,
                password: "",
                errors: [],
                saveForm: true
            }))
            setCurUser(res)
        }catch(errors){
            setFormData(f=>({...f, errors}))
        }
    }

    return(
        <div className="Profile form-group">
            <h2 style={{textAlign:'center'}}>Update Profile</h2>
            <form onSubmit={handleSubmit} style={{marginTop:'20px'}}>
                <div className="form-group">
                <label>Username</label>
                <p className="form-control-plaintext" style={{color:'white'}}>{formData.username}</p>
                </div>
                <div className="form-group">
                <label htmlFor="first_name">First Name: </label>
                <input 
                className="form-control"
                type="text"
                id="first_name"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                />
                </div>

                <div className="form-group">
                <label htmlFor="Last_name">Last Name: </label>
                <input 
                className="form-control"
                type="text"
                id="last_name"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                />
                </div>
                <div className="form-group">
                <label htmlFor="email">Email: </label>
                <input 
                type="text"
                className="form-control"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                />
                </div>
                <div className="form-group">
                <label htmlFor="password">Re-enter Password</label>
                <input 
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                />
                </div>
                {formData.errors.length ? formData.errors : null}
                <br/>
                {formData.saveForm ? <p>form saved</p> : null}
                <button className="btn btn-primary btn-block">Save Changes</button>
                </form>
                </div>
    )
}

export default Profile