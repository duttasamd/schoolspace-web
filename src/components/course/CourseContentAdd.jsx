import React, { useCallback, useMemo, useState } from 'react';
import {
	faPlus
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './course.css';
import { useDropzone } from 'react-dropzone';

import FileUploadWithProgress from '../FileUploadWithProgress';
import {useForm} from 'react-hook-form';
import authAxios from '../../utils/authAxios';
import SunEditor from 'suneditor-react';

const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out'
  };
  
  const activeStyle = {
    borderColor: '#2196f3'
  };
  
  const acceptStyle = {
    borderColor: '#00e676'
  };
  
  const rejectStyle = {
    borderColor: '#ff1744'
  };



export default function CourseContentAdd(props) {

    const [files, setFiles] = useState([]);
    const [toolbarToggle, setToolbarToggle] = useState(true);

    const onDrop = useCallback(acceptedFiles => {
        setFiles(current => [...current, ...acceptedFiles]);
        console.log(files);
    }, [files]);

    const onRemove = (filekey) => {
        setFiles(
            files.filter((file) => file.name !== filekey)
        )
    }

    const onUploaded = (filekey, id) => {
        setFiles(
            files.map((file) => {
                if(file.name === filekey) 
                    file.id = id;
                return file;
            })
        )
    }

    const previewWithProgress = files.map((file) => (
        <FileUploadWithProgress file={file} key={file.name} onRemove={onRemove} onUploaded={onUploaded}/>
    ))

    const {getRootProps, getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject} = useDropzone({onDrop});

    const style = useMemo(() => ({
        ...baseStyle,
        ...(isDragActive ? activeStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
        }), [
        isDragActive,
        isDragReject,
        isDragAccept
        ]);

    const {register, handleSubmit} = useForm();

    const onSubmit = (data) => {
        data.files = files.map((file) => {
            return {
                id : file.id,
                name : file.name,
                size : file.size,
                type : file.type
            }
        });
        
        authAxios.put('/coursecontents', {
            courseSectionId : props.courseSectionId,
            title : data.title,
            description : data.description,
            files : data.files
        });
    }

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
                        <form method="POST" onSubmit={handleSubmit(onSubmit)}>
                            <div className="modal-body">
                                <input className="form-control mb-3" placeholder="Title" id="txtTitle" name="title" ref={register}/>
                                <SunEditor
                                    setDefaultStyle="font-family: arial; font-size: 20px;"
                                    height="250px"
                                    setOptions={{
                                        mode: "inline",
                                        showPathLabel: false,
                                        resizingBar: true,
                                        buttonList: [[
                                                    'font', 'fontSize', 'formatBlock', 'align', 
                                                    'paragraphStyle', 'blockquote',
                                                    'bold', 'underline', 'italic', 'strike', 'subscript', 'superscript',  
                                                    'fontColor', 'hiliteColor', 'list', 'horizontalRule', 'lineHeight', 'table', 
                                                    'undo','redo',
                                        ]],
                                        
                                    }}
                                    showToolbar={toolbarToggle}
                                />
                                <div id="filedrop" className="mt-3">
                                    <div {...getRootProps({style})}>
                                        <input {...getInputProps()}/>
                                        <p>Drop files here</p>
                                    </div>
                                    <div>{previewWithProgress}</div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                Publish <input type="checkbox" className="ml-1 mr-5" name="isForPublish" ref={register}/>
                                <button type="submit" className="btn btn-primary">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        
    );
}