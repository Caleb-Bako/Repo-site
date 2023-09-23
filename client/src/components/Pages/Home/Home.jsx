import { useEffect, useState } from "react";
import NavBar from "../NavBar/NavBar";
import axios from "axios";
import FileUploader from "./FileUploader";
import { Navigate, useParams } from "react-router-dom";
import DeleteTag from "./DeleteTag";
export default function Home(){
    const[profile,setProfile] = useState([]);
    const[name,setName] = useState('');
    const[redirect,setRedirect] = useState(false);
    const {id} = useParams();

    useEffect(() => {
        if(!id){
            return;
        }
        axios.get('/staff/'+id).then(response =>{
                const{data} = response;
                setProfile(data.profile);
                setName(data.name);
            });
    },[id]);

    async function saveFiles(ev){
        ev.preventDefault();
        const staffData = {
            profile,name
        };
        if(id){
            await axios.put('/staff', 
            {
            id,...staffData
         });
         setRedirect(true);
        }else{
            await axios.post('/staff', staffData);
            alert('Success !!!');
            setRedirect(true);
        }
    }

    if(redirect){
        return<Navigate to={'/home'}/>
    }

    return(
        <div>
            <NavBar/>
            <div className="home-page">
                <div>
                    {id &&(
                        <DeleteTag id={id} setRedirect={setRedirect} />
                    )}
                </div>
                <div className="fstr">
                    <form onSubmit={saveFiles}>
                        <h2>File Name: </h2>
                        <input type="text" placeholder="File Name" value={name} onChange={ev => setName(ev.target.value)}/> 
                        <h2>Files:</h2>
                            <FileUploader files={profile} onChange={setProfile}/>
                            <button className="upload-button">Upload</button>
                    </form>     
                </div>

            </div>
        </div>
    )
}