import React, { useEffect, useState } from 'react';
import authAxios from '../../utils/authAxios';
import {
	// faFileCode,
    // faFileCsv,
    
    faFilePdf,
    faFileImage,
    // faFileAudio,
    faFile
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {Parser} from 'html-to-react';
import moment from 'moment';

const parser = new Parser();

export default function CourseContentItem(props) {
    const [courseContent, setCourseContent] = useState({});
    const [numFiles, setNumFiles] = useState(0);

    useEffect(() => {
        authAxios.get(`/coursecontents/${props.id}`)
        .then((response) => {
            if(response.data && response.data.files){
                response.data.files = response.data.files.map((file) => {
                    let fileextension;
                    switch(file.filetype) {
                        case "image/png" :
                        case "png" : fileextension = "png";
                            file.icon = faFileImage;
                            break;
                        case "image/jpeg" :
                        case "jpeg" :
                        case "jpg" : fileextension = "jpg";
                            file.icon = faFileImage;
                            break;
                        case "image/tiff" :
                        case "tiff" : fileextension = "tiff";
                            file.icon = faFileImage;
                            break;
                        case "application/pdf" :
                        case "pdf" : fileextension = "pdf";
                            file.icon = faFilePdf;
                            break;
        
                        default : fileextension = "data";
                            file.icon = faFile;
                    }
                    file.url = `https://${process.env.REACT_APP_S3_BUCKET}.s3.amazonaws.com/${file.id}.${fileextension}`;
    
                    return file;
                })
    
                if(response.data.files)
                    setNumFiles(response.data.files.length);
            }

            setCourseContent(response.data);
        }).catch(
            (err) => console.error(err)
        );
    }, []);

    let filesview = 
        courseContent.files ?  courseContent.files.map(
            (file) => (<div key={file.filename}>
                <FontAwesomeIcon icon={file.icon} className="mr-3"/>
                <a href={file.url} target="_blank" rel="noopener noreferrer">{file.filename}</a>
            </div>)) : "";
    return(
        <div className="row my-3">
            <div className="card mt-3 blue w-100">
                <div className="card-header card-header-clean p-1">
                    <button className="btn btn-default btn-block d-flex" data-toggle="collapse" data-target={`#coursecontent${props.id}`} aria-expanded="true" aria-controls={`#coursecontent${props.id}`}>
                        <span className="mr-auto"><strong>{courseContent.title}</strong></span>
                        <div className="ml-auto">
                            {
                                numFiles > 0 &&
                                <span className="badge badge-success ml-auto 
                                d-inline-flex align-items-center mr-3">
                                    {numFiles}
                                    {numFiles === 1 ? " Attachment" : " Attachments"}
                                </span>
                            }
                            {
                                courseContent.created_at &&
                                <span className="badge badge-light ml-auto 
                                d-inline-flex align-items-center ml-3">
                                    {
                                        moment(courseContent.created_at).format('DD-MMM-YY')
                                    }
                                </span>
                            }
                        </div>
                        
                    </button>
                </div>

                <div id={`coursecontent${props.id}`} className="collapse" aria-labelledby="headingOne">
                    <div className="card-body py-3 px-3 pb-1">
                        <div className="row">
                            <div className="col">
                                {parser.parse(courseContent.description)}
                            </div>
                        </div>
                        <div className="mt-5">
                            {filesview}
                        </div>
                    </div>
                </div>
            </div>
        </div> 
    );
}