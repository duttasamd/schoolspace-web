import React, {useRef, useState} from 'react';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
//import parse from 'html-react-parser';
import { Gear } from 'react-bootstrap-icons';
import { Button } from 'bootstrap';

function TextEditor(props) {

    const [content, setContent] = useState("");
    const [toolbarToggle, setToolbarToggle] = useState(true);
    const editorRef = useRef();


    // const onSubmit = () => {
    //     props.handleContent(content);
    // };

    
    const toggleBar = () => {
        setToolbarToggle(!toolbarToggle);
    }

    return(
        <div>
            <div className="row">
                <input type="checkbox" checked={toolbarToggle} data-toggle="toggle" 
                onChange={toggleBar} className="ml-auto"/>
            </div>
            <div className="row">
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
            </div>

            
            
            {/* <div>{parse(content)}</div> */}
            {/* <button onClick={() => onSubmit()} className="btn btn-primary mt-2 btn-lg">Post</button> */}
            

        </div>
    );
}

export default TextEditor;