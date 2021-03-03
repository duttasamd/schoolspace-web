import React, { useCallback, useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';

import FileUploadWithProgress from './FileUploadWithProgress';
import {useForm} from 'react-hook-form';
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
        
        props.onSubmit(data);
    }

    const header = props.title ? (
        <div className="m-3">
            <span><strong>{props.title}</strong></span>    
        </div> 
    ) : "";

    return (
        <>
            {header}
            <form method="POST" onSubmit={handleSubmit(onSubmit)}>
                <input className="form-control mb-3" placeholder="Title" id="txtTitle" name="title" ref={register}/>
                <SunEditor
                    setDefaultStyle="font-family: arial; font-size: 20px;"
                    height="250px"
                    setOptions={{
                        mode: "classic",
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
                    className="pt-5"
                />
                <div id="filedrop" className="mt-3">
                    <div {...getRootProps({style})}>
                        <input {...getInputProps()}/>
                        <p>Drop files here</p>
                    </div>
                    <div>{previewWithProgress}</div>
                </div>
                <div className="d-flex mt-3">
                    <div className="mr-auto">
                        <span>Publish</span><input type="checkbox" className="ml-1 mr-5" name="isForPublish" ref={register}/>
                    </div>
                    <button type="submit" className="btn btn-primary ml-auto">Save</button>
                </div>
            </form>
        </>
        
    );
}