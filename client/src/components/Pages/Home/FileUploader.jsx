import axios from "axios";
import './Home.css';
import FileViewer from 'react-file-viewer';
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";

export default function FileUploader({files,onChange}){   
    function uploadFiles(ev){
        const files = ev.target.files;
        const data = new FormData();
        for(let i = 0; i < files.length; i++){
            data.append('file',files[i]);
        }
        axios.post('/upload',data,{
            headers: {'Content-type':'multipart/form-data',"Access-Control-Allow-Origin": "http://localhost:4000",}
        }).then(response => {
            const {data:filenames} = response;
            onChange(prev => {
                return [...prev, ...filenames];
            });
        })
    }      

    const type = 'docx';

    return(
        <div className="fileUploader">
            <label className="uploadButton"> 
                <input type="file" multiple className="hidden" onChange={uploadFiles}/>  
                Upload
            </label>
            {files.length > 0 && files.map(file=>(
                <FileViewer
                    fileType={type}
                    filePath={`http://localhost:4000/uploads\\${file}`}
                />
            ))}

        </div>
    )
}