import React, { useCallback, useState } from 'react';
import {
	faPlus
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './course.css';
import { useDropzone } from 'react-dropzone';

import FileUploadWithProgress from '../FileUploadWithProgress';



export default function CourseContentAdd() {

    const [files, setFiles] = useState([]);

    const onDrop = useCallback(acceptedFiles => {
        setFiles(current => [...current, ...acceptedFiles]);
        console.log(files);
    }, [files]);

    const onRemove = (filekey) => {
        setFiles(
            files.filter((file) => file.name !== filekey)
        )
    }

    const previewWithProgress = files.map((file) => (
        <FileUploadWithProgress file={file} key={file.name} onRemove={onRemove}/>
    ))

    const {getRootProps, getInputProps} = useDropzone({onDrop});

    return (
        <div>
            <button className="btn btn-outline-primary float-right"
                data-toggle='modal'
                data-target='#modalAddCourseContent'
            >
                <FontAwesomeIcon icon={faPlus} />
            </button>

            <div className="modal fade" id="modalAddCourseContent" data-backdrop="static" data-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="modalAddCourseContent">Add Course Content</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <form method='POST'>
                            <div className="modal-body">
                                <input className="form-control" placeholder="title" id="txtTitle" name="title"/>
                                <textarea rows="10" placeholder="Description" className="w-100 h-100 form-control my-3" name="description"></textarea>
                                <div id="filedrop">
                                    <div {...getRootProps()}>
                                        <input {...getInputProps()}/>
                                        <p>Drop files here</p>
                                    </div>
                                    <div>{previewWithProgress}</div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                Publish <input type="checkbox" className="ml-1 mr-5" name="isForPublish"/>
                                <button type="submit" className="btn btn-primary">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        
    );
}