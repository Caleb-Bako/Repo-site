import axios from "axios";
import './Home.css';
import FileViewer from "react-file-viewer";
// import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";

export default function FileUploader({files,onChange}){   
    function uploadFiles(ev){
        const files = ev.target.files;
        const data = new FormData();
        for(let i = 0; i < files.length; i++){
            data.append('file',files[i]);
        }
        axios.post('/upload',data,{
            headers: {
            'Access-Control-Allow-Origin' : '*',   
            'Content-type':'multipart/form-data',
            Accept:"application/json"}
        }).then(response => {
            const {data:filenames} = response;
            onChange(prev => {
                return [...prev, ...filenames];
            });
        }).catch(err => console.log(err));
    }      
    const type = 'docx';
    const file = 'http://example.com/image.png';

    return(
        <div className="fileUploader">
            <label className="uploadButton"> 
                <input type="file" multiple className="hidden" onChange={uploadFiles}/>  
                Upload
            </label>
            {files.length > 0 && files.map(p =>(
                <div>
                    <img className="file-pics" src={`http://localhost:4000/uploads\\`+ p} alt="" />
                </div>
            ))}
                  {/* <DocViewer
                        documents={files.map((file) => ({
                        uri: (`http://localhost:4000/uploads\\`+ file),
                        fileName: file.name,
                        }))}
                        pluginRenderers={DocViewerRenderers}
                    /> */}
                    
                    {/* <FileViewer
                        fileType={type}
                        filePath={file}
                    /> */}

        </div>
    )
}