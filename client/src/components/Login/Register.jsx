import axios from "axios";
import React, { useState } from "react";
import './Login.css';
import { Link, Navigate } from "react-router-dom";

export default function RegisterPage(){
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const[location,setLocation] = useState([]);
    const [pass,setPass] = useState('');
    const [redirect,setRedirect] = useState(false);
    const[stats,setStats] = useState('unverified');
    const[role,setRole] = useState('user');
    async function registerUser(ev){
        ev.preventDefault();
        try{
            await axios.post('/register', {
                name,
                email,
                location,
                pass,
                stats,
                role
            });
            alert('Registration Successful');
            setRedirect(true);
        }
        catch(e){
            alert('Registration Failed');
        }
    }
    if(redirect){
        return<Navigate to={'/'}/>
    }
    return(
        <div>
            <div className="login-shapes">
                <div className="circle"/>
                <div className="circle"/>
            </div>
            <div>
                <form onSubmit={registerUser} className="formpg">
                    <h2 className="loginheader2">Register</h2>   
                    <h3 className="hlabel">Name:</h3>
                        <input type="text" placeholder="First Name" value={name} onChange={ev => setName(ev.target.value)}/> 
                    <h3 className="hlabel">Email:</h3>
                        <input type="email" placeholder="your@email.com" value={email} onChange={ev => setEmail(ev.target.value)}/> 
                    <h3 className="hlabel">Location:</h3>
                        <select value={location} onChange={ev => setLocation(ev.target.value)}>
                            <option></option>
                            <option>Abuja</option>
                            <option>Lagos</option>
                            <option>Port Harcourt</option>
                        </select>   
                    <h3 className="hlabel">Password:</h3>
                        <input type="password" placeholder="password" value={pass} onChange={ev => setPass(ev.target.value)}/>
                        <button className="button b2">Register</button>
                        <p className="quest">Already signed up? Click <Link to="/"><u>Here</u></Link> </p>
                </form>
        </div>
        </div>
    )
}