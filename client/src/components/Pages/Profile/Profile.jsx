import { useContext, useEffect, useState } from "react"
import axios from "axios";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../../../../UserContext";
import SuperAdminPage from "../Admin/SuperAdmin";
import NavBar from "../NavBar/NavBar";
import './Profile.css';

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
                              <Link to={'/home'}>
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="add-files">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 10.5v6m3-3H9m4.06-7.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
                            </svg>
                              </Link>  
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