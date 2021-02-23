import React, {useState} from 'react';
import TextEditor from '../tools/TextEditor';

function Assignments() {

    const [post, getPost] = useState();

    const getContent = () => {
        console.log(post);
    }

    return (
        <div className="container">
            <h1 className="text-center">Assignment Title</h1>
            <h3 className="text-center">Assignment Description</h3>
            <TextEditor getPost={getPost}/>
            <button onClick={()=>getContent()} className="btn btn-primary mt-2">Submit</button>
        </div>
    )
}

export default Assignments
