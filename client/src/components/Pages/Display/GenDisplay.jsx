import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './DisplayPage.css';
import NavBar from "../NavBar/NavBar";

export default function GenDisplay(){
    const[files,setFiles] = useState([]);
    const[query,setQuery] = useState('');
    useEffect(()=>{
        axios.get('/services').then(response => {
            setFiles(response.data);
        });
    },[]);
    return(
        <div>
            <NavBar/>
            <div className="single-doc">
                <h2>Welcome!!!!!</h2>
                <input type="text" placeholder="Search" value={query} onChange={ev => setQuery(ev.target.value)}/> 
                {files.length > 0 && files.filter(fil =>fil.name.includes(query)).map(fil =>(
                    <Link to={'/files/'+fil._id}>
                        <div className="file-str">
                            <div>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="folder-pic">
                                <path d="M19.5 21a3 3 0 003-3v-4.5a3 3 0 00-3-3h-15a3 3 0 00-3 3V18a3 3 0 003 3h15zM1.5 10.146V6a3 3 0 013-3h5.379a2.25 2.25 0 011.59.659l2.122 2.121c.14.141.331.22.53.22H19.5a3 3 0 013 3v1.146A4.483 4.483 0 0019.5 9h-15a4.483 4.483 0 00-3 1.146z" />
                            </svg>
                            </div>
                            <div className="file-name">
                                {fil.name}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}