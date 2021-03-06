import React from 'react';

export default function AssignmentListItem(props) {
    return(
        <div className="d-flex mt-3">
            <span className="mr-auto">{props.assignment.title}</span>
            <div className="ml-auto">
                <span className="badge badge-success">
                    {props.assignment.attachments}
                </span>
                <span className="badge badge-light">
                    {props.assignment.deadline}
                </span>
            </div>
        </div>
    )
}