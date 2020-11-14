import React from 'react';

export default function CourseCard(props) {
    return(
        <div id={props.course.id} className={"card m-1 coursecard"} >
            <div className="card-header card-header-clean f1vw fw600">
                { props.course.subject }
            </div>
            <div className="card-body">
                { props.course.firstname + " " + props.course.lastname }
            </div>
        </div>
    );
}