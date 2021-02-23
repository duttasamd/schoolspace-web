import React, {useState} from 'react';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
//import parse from 'html-react-parser';
// import { Gear } from 'react-bootstrap-icons';

function TextEditor(props) {

    const [content, setContent] = useState("");
    // const [bar, setBar] = useState(false);


    // const onSubmit = () => {
    //     props.handleContent(content);
    // };

    
    // const showBar = () => {
    //     setBar(true);
    //     document.getElementById("bar").style.display = "none"
    // }

    return(
        <div className="">
            {/* <Gear id="bar" onClick={showBar} /> */}
            <SunEditor
                showToolbar="false"
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
            setContent=""
            onChange={setContent}
            onChange={props.getPost}
            />
            {/* <div>{parse(content)}</div> */}
            {/* <button onClick={() => onSubmit()} className="btn btn-primary mt-2 btn-lg">Post</button> */}
            

        </div>
    );
}

export default TextEditor;