import axios from "axios";
import { useEffect, useState } from "react";
import './Admin.css';
import { Link, useParams } from "react-router-dom";

export default function SuperAdminPage(){
    const{id} = useParams();
    const[files,setFiles] = useState([]);
    const[role,setRole] = useState('admin');

    async function commentBox(ev){
        if(id){
            ev.preventDefault();
            try{
                await axios.put('/staffac',{
                    id,role
                });
                alert('User Successfully set as Admin');
            }catch(e){
                alert('Unsuccessful');
            }
        }else{
            return 'Loading';
        }
    }
    


    useEffect(()=>{
        axios.get('/users').then(response => {
            setFiles(response.data);
        });
    },[]);

    return(
        <div>
            <div>
                <h2>Welcome Super Admin</h2>
                {files.length > 0 && files.map(fil =>(
                    <div className="customers">
                        <div className="customer-role">
                            <h3>Role</h3>
                            {fil.role}
                        </div>
                        <div className="customer-name">
                            <h3>Name</h3>
                            {fil.name}
                        </div>
                        <div className="customer-email">
                            <h3>Email</h3>
                            {fil.email}
                        </div>
                        <div className="customer-id">
                            <h3>ID</h3>
                            {fil._id}
                        </div>
                        <div className="customer-role">
                            <Link to={'/profile/'+fil._id}>
                                <button className="button" onClick={commentBox}>Admin</button>
                            </Link>
                        </div>
                        <div>
                            <button className="button" onClick={commentBox}>User</button>
                        </div>
                    </div>
                ))}
                
            </div>
        </div>
    )
}