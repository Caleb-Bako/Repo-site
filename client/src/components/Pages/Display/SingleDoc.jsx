import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './DisplayPage.css';
import NavBar from "../NavBar/NavBar";
import DownloadId from "./DownloadId";
import PopUp from "./PopUp";
import DownloadFile from "./DownloadFile";

export default function SingleDoc(){
    const{id} = useParams();
    const[place,setPlace] = useState(null);
    const[downld,setDownld] = useState('')
    const[ck,setCk] = useState('');
    const[showPopUp, setshowPopUp] = useState(false);
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
            <PopUp open={showPopUp} onClose={() => setshowPopUp(false)} />
            <NavBar/>
            <div className="single-doc">
                <div className="download-folder" >
                <DownloadId ck={ck} setCk={setCk}/>
                    <div>
                        <button onClick={downloadButton} className="download-btn"> 
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="folder-pic">
                                    <path d="M19.5 21a3 3 0 003-3v-4.5a3 3 0 00-3-3h-15a3 3 0 00-3 3V18a3 3 0 003 3h15zM1.5 10.146V6a3 3 0 013-3h5.379a2.25 2.25 0 011.59.659l2.122 2.121c.14.141.331.22.53.22H19.5a3 3 0 013 3v1.146A4.483 4.483 0 0019.5 9h-15a4.483 4.483 0 00-3 1.146z" />
                            </svg>
                            Download Folder
                        </button>
                    </div>
                </div>
                <div className="folder-title">
                            <div className="headings">
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="hpics">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 00-1.883 2.542l.857 6a2.25 2.25 0 002.227 1.932H19.05a2.25 2.25 0 002.227-1.932l.857-6a2.25 2.25 0 00-1.883-2.542m-16.5 0V6A2.25 2.25 0 016 3.75h3.879a1.5 1.5 0 011.06.44l2.122 2.12a1.5 1.5 0 001.06.44H18A2.25 2.25 0 0120.25 9v.776" />
                                    </svg>
                                </div>
                                <div>Name</div>
                            </div>
                            
                        </div>
            {place.profile.length > 0 && place.profile.map((photo) => (
                
                        <div key={photo} className="file-str single-download">
                            <div>
                                {photo.includes("jpg"||"png"||"jpeg") &&(
                                <div className="group-name " >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="folder-pic" height="1em" viewBox="0 0 512 512"><path d="M0 96C0 60.7 28.7 32 64 32H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM323.8 202.5c-4.5-6.6-11.9-10.5-19.8-10.5s-15.4 3.9-19.8 10.5l-87 127.6L170.7 297c-4.6-5.7-11.5-9-18.7-9s-14.2 3.3-18.7 9l-64 80c-5.8 7.2-6.9 17.1-2.9 25.4s12.4 13.6 21.6 13.6h96 32H424c8.9 0 17.1-4.9 21.2-12.8s3.6-17.4-1.4-24.7l-120-176zM112 192a48 48 0 1 0 0-96 48 48 0 1 0 0 96z"/></svg>
                                    <div className="file-name">
                                        {photo}
                                    </div>
                                </div>
                                )}
                                {photo.includes("docx"||"doc") &&(
                                    <div className="single-download">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="folder-pic" height="1em" viewBox="0 0 384 512"><path d="M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V160H256c-17.7 0-32-14.3-32-32V0H64zM256 0V128H384L256 0zM111 257.1l26.8 89.2 31.6-90.3c3.4-9.6 12.5-16.1 22.7-16.1s19.3 6.4 22.7 16.1l31.6 90.3L273 257.1c3.8-12.7 17.2-19.9 29.9-16.1s19.9 17.2 16.1 29.9l-48 160c-3 10-12 16.9-22.4 17.1s-19.8-6.2-23.2-16.1L192 336.6l-33.3 95.3c-3.4 9.8-12.8 16.3-23.2 16.1s-19.5-7.1-22.4-17.1l-48-160c-3.8-12.7 3.4-26.1 16.1-29.9s26.1 3.4 29.9 16.1z"/></svg>
                                            <div className="file-name">
                                                {photo}
                                            </div>
                                    </div>
                                )}
                                {photo.includes("xls") &&(
                                    <div className="single-download">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="file-pics" height="1em" viewBox="0 0 384 512"><path d="M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V160H256c-17.7 0-32-14.3-32-32V0H64zM256 0V128H384L256 0zM155.7 250.2L192 302.1l36.3-51.9c7.6-10.9 22.6-13.5 33.4-5.9s13.5 22.6 5.9 33.4L221.3 344l46.4 66.2c7.6 10.9 5 25.8-5.9 33.4s-25.8 5-33.4-5.9L192 385.8l-36.3 51.9c-7.6 10.9-22.6 13.5-33.4 5.9s-13.5-22.6-5.9-33.4L162.7 344l-46.4-66.2c-7.6-10.9-5-25.8 5.9-33.4s25.8-5 33.4 5.9z"/></svg>
                                        <div className="file-name">
                                            {photo}
                                        </div>
                                    </div>
                                )}
                                {photo.includes("ppt") &&(
                                    <div className="single-download">
                                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><path d="M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V160H256c-17.7 0-32-14.3-32-32V0H64zM256 0V128H384L256 0zM136 240h68c42 0 76 34 76 76s-34 76-76 76H160v32c0 13.3-10.7 24-24 24s-24-10.7-24-24V368 264c0-13.3 10.7-24 24-24zm68 104c15.5 0 28-12.5 28-28s-12.5-28-28-28H160v56h44z"/></svg>
                                        <div className="file-name">
                                            {photo}
                                        </div>
                                    </div>
                                )}
                                {photo.includes("pdf") &&(
                                    <div className="single-download">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="file-pics" height="1em" viewBox="0 0 384 512"><path d="M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V160H256c-17.7 0-32-14.3-32-32V0H64zM256 0V128H384L256 0zM155.7 250.2L192 302.1l36.3-51.9c7.6-10.9 22.6-13.5 33.4-5.9s13.5 22.6 5.9 33.4L221.3 344l46.4 66.2c7.6 10.9 5 25.8-5.9 33.4s-25.8 5-33.4-5.9L192 385.8l-36.3 51.9c-7.6 10.9-22.6 13.5-33.4 5.9s-13.5-22.6-5.9-33.4L162.7 344l-46.4-66.2c-7.6-10.9-5-25.8 5.9-33.4s25.8-5 33.4 5.9z"/></svg>
                                        <div className="file-name">
                                            {photo}
                                        </div>
                                    </div>
                                )}
                            </div>
                            {/* <div>
                                <img className="file-pics" src={`http://localhost:4000/uploads\\`+ photo} alt='' onClick={ev => setFileName({photo})} />
                                {photo}
                            </div> */}
                            <div>
                                <div>
                                    
                                </div>
                                <DownloadFile photo={photo} setshowPopUp={setshowPopUp} />
                            </div>
                    </div>    
                ))}
            </div>
            
        </div>
    )
}