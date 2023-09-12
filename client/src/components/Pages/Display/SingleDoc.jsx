import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './DisplayPage.css';
import NavBar from "../NavBar/NavBar";

export default function SingleDoc(){
    const{id} = useParams();
    const[place,setPlace] = useState(null);
    const[downld,setDownld] = useState('')
    useEffect(()=>{
        if(!id){
            return;
        }
        axios.get(`/staff/${id}`).then(response =>{
            setPlace(response.data);
        })
    },[id]);
    if(!place) return '';

    async function downloadButton(ev){
        ev.preventDefault();
        await axios.get(`/download/${id}`).then(response =>{
            setDownld(response.data);
        })
        alert("Success?");
    };
    return(
        <div>
            <NavBar/>
            <div className="single-doc">
                {place.profile.length > 0 && place.profile.map(photo => (
                        <div key={photo}>
                            <div>
                                <img className="file-pics" src={`http://localhost:4000/uploads\\`+ photo} alt="" />
                            </div>
                        </div>
                ))}
                    <div>
                        <button onClick={downloadButton}> Download</button>
                    </div>
            </div>
        </div>
    )
}