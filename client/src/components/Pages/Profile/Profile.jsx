import { useContext, useEffect, useState } from "react"
import axios from "axios";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../../../../UserContext";
import SuperAdminPage from "../Admin/SuperAdmin";
import NavBar from "../NavBar/NavBar";
import './Profile.css';
import AddFile from "./AddFile";

export default function Profile(){
    const[redirect,setRedirect] = useState(null);
    const {ready,user,setUser} = useContext(UserContext);
    const [customers,setCustomers] = useState('');

    useEffect(()=>{
        axios.get('/admins').then(({data}) =>{
            setCustomers(data);
        });
    },[]);

    async function logout(){
        await axios.post('/logout');
        setRedirect('/');
        setUser(null);
    }

    if(!ready){
        return 'Loading...';
    }
    if(!customers){
        return 'Loading...';
    }

    if(ready && !user && !redirect){
        return <Navigate to={'/'}/>
    }

    if(redirect){
        return <Navigate to={redirect}/>
    }

    return(
        <div>
            <NavBar/>
            <div className="profile-page">
                {customers.role.includes("user")&&(
                        <div className="profile">
                            <div>Logged in as {user.name} ({user.email})</div>
                            <div>
                                <AddFile/>
                            </div>
                            <br />
                        </div>
                )}
                {customers.role.includes("admin")&&(
                    <div>
                        <SuperAdminPage/>
                    </div>
                )}
                <button className="button accs" onClick={logout}>Logout</button>
            </div>
        </div>
    )
}