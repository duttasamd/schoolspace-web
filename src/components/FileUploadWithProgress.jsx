import React, { useEffect, useState } from 'react';
import authAxios from '../utils/authAxios';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	// faFileCode,
    // faFileCsv,
    
    faFilePdf,
    faFileImage,
    // faFileAudio,
    faFile
} from "@fortawesome/free-regular-svg-icons";
import {ProgressBar} from 'react-bootstrap';

export default function FileUploadWithProgress(props) {
    const [fileicon, setFileicon] = useState(faFile);
    const [progress, setProgress] = useState(0);
    const [animated, setAnimated] = useState(true);

    const [variant, setVariant] = useState(false);
    const [isUploaded, setIsUploaded] = useState(false);
    const [progressLabel, setProgressLabel] = useState("Uploading...");

    const [fileId, setFileId] = useState(null);

    useEffect(() => {        
        switch(props.file.type) {
            case "image/png" : setFileicon(faFileImage);
                break;
            case "application/pdf" : setFileicon(faFilePdf);
                break;
            default : setFileicon(faFile);
        }
        
        authAxios.get('sign-s3?' + new URLSearchParams({
            filename: props.file.name,
            filetype: props.file.type
        })).then((resposne) => {
            let signedUrl = resposne.data.signedRequest;
            setFileId(resposne.data.fileId);

            const options = {
                headers: {
                    'Content-Type': props.file.type
                },
                onUploadProgress: (progressEvent) => {
                    const totalLength = progressEvent.lengthComputable ? progressEvent.total : progressEvent.target.getResponseHeader('content-length') || progressEvent.target.getResponseHeader('x-decompressed-content-length');
                    
                    
                    if (totalLength !== null) {
                        let pg = Math.round( (progressEvent.loaded * 100) / totalLength);
                        setProgress(pg);
                        setProgressLabel(`${pg}%`);
                        if(pg === 100) {
                            setAnimated(false);
                            setVariant("success");
                            setIsUploaded(true);
                            setProgressLabel(`Uploaded`);
                        }
                    }
                }
            };

            axios.put(signedUrl, props.file, options).then((res) => {
                props.onUploaded(props.file.name, resposne.data.fileId);
            }).catch((err) => console.log(err));
        }).catch((error) => {
            console.log(error);
        })
        
    }, [])      

    return (
        <div className="row">
            <div className="col-2 mt-2">
                <ProgressBar variant={variant} animated={animated} now={progress} label={progressLabel}
                onMouseEnter={
                    (e) => {
                        setVariant("danger");
                        if(isUploaded)
                            setProgressLabel("Remove");
                    }
                }
                onMouseLeave={(e) => {
                    if(isUploaded) {
                        setVariant("success");
                        setProgressLabel("Uploaded");
                    } else {
                        setVariant(false);
                    }
                }}
                onClick={
                    (e) => {
                        console.log(`Removing file : ${props.file.name}`);
                        if(fileId) {
                            authAxios.delete(`remove-s3/${fileId}`);
                        }
                        props.onRemove(props.file.name)
                    }
                }
                />
            </div>
            <div className="col">
                <FontAwesomeIcon icon={fileicon}/>
                <span className="mx-3">{props.file.name}</span>
            </div>
                    
        </div> 
    );
}