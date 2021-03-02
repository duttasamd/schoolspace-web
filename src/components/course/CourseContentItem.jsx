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

export default function CourseContentItem(props) {
    const [courseContent, setCourseContent] = useState({});

    useEffect(() => {
        authAxios.get(`/coursecontents/${props.id}`)
        .then((response) => {
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
            setCourseContent(response.data);
        })
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
                    <button className="btn btn-default btn-block" data-toggle="collapse" data-target={`#coursecontent${props.id}`} aria-expanded="true" aria-controls={`#coursecontent${props.id}`}>
                        <span className="float-left ml-0 mr-auto"><strong>{courseContent.title}</strong></span>
                    </button>
                </div>

                <div id={`coursecontent${props.id}`} className="collapse" aria-labelledby="headingOne">
                    <div className="card-body py-3 px-3 pb-1">
                        <div className="row">
                            <div className="col">
                                {courseContent.description}
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