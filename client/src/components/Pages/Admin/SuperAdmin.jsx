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
                    <h2>Welcome Super Admin</h2>
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