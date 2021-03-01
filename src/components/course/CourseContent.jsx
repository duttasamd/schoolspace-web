import React from 'react';
import CourseContentAdd from './CourseContentAdd';

export default function CourseContent(props) {
    return (
        <div>
            <div className="row mt-5">
                <div className="col-2"><strong>Course Contents</strong></div>
                <div className="offset-8 col-2"><CourseContentAdd/></div>
            </div>
        </div>
    )
}