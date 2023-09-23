import axios from "axios";
import { useEffect, useState } from "react";
import './Admin.css';
import { Link, useParams } from "react-router-dom";
import Role from "./Role";
import AddFile from "../Profile/AddFile";

export default function SuperAdminPage(){
    const{id} = useParams();
    const[files,setFiles] = useState([]);

    useEffect(()=>{
        axios.get('/users').then(response => {
            setFiles(response.data);
        });
    },[]);

    return(
        <div className="admin-bg">
            <div>
                <div className="top-section">
                    <div>
                        <h2>Welcome Super Admin</h2>
                    </div>
                    <div className="add-sec">
                        <div>
                            <AddFile/>
                        </div>
                        <Link to={"/register"} >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="add-files">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
                        </svg>

                        </Link>

                    </div>
                </div>
                <div className="s-titles">
                    <div>
                        <h3>Role</h3>
                    </div>
                    <div>
                        <h3>Name</h3>
                    </div>
                    <div>
                        <h3>Email</h3>
                    </div>  
                    <div>
                        <h3>ID</h3>
                    </div>  
                </div>
                {files.length > 0 && files.map(fil =>(
                    <div className="customers">
                        <div className="customer-role">
                            {fil.role}
                        </div>
                        <div className="customer-name">
                            {fil.name}
                        </div>
                        <div className="customer-email">
                            
                            {fil.email}
                        </div>
                        <div className="customer-id">
                            
                            {fil._id}
                        </div>
                        <div className="customer-role">
                            <Link to={'/profile/'+fil._id}>
                                <Role id={id} />
                            </Link>
                        </div>
                    </div>
                ))}
                
            </div>
        </div>
    )
}