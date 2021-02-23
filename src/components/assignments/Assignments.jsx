import React from 'react';
import TextEditor from '../tools/TextEditor';

function Assignments() {
    return (
        <div className="container">
            <h1 className="text-center">Assignment Title</h1>
            <h3 className="text-center">Assignment Description</h3>
            <TextEditor />
            <button className="btn btn-primary btn-lg">Submit</button>
        </div>
    )
}

export default Assignments
