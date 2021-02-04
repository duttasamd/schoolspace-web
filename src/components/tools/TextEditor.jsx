import React, {useState} from 'react';
import SunEditor, {buttonList} from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File

function TextEditor() {

    const [content, setContent] = useState("");

    
    const onSubmit = () => {
        console.log(content)
    };
    

    return(
        <div className="container">
            <SunEditor
                setDefaultStyle="font-family: arial; font-size: 20px;"
                height="250px"
                setOptions={{
                    buttonList: [
                                ['font', 'fontSize', 'formatBlock', 'align'], 
                                ['paragraphStyle', 'blockquote', ],
                                ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],  
                                ['fontColor', 'hiliteColor', 'list', 'horizontalRule', 'lineHeight', 'table',], 
                                ['undo','redo'],
                                ],
                    
                }}
            setContent=""
            onChange={setContent}
            />
            {/* <div>{content}</div> */}
            <button onClick={() => onSubmit()} className="btn btn-primary mt-2 btn-lg">Post</button>
            
            

        </div>
    );
}

export default TextEditor;