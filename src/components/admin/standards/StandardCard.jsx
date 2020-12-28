import React from "react";

export default function StandardCard(props) {
	return (
		<div className='card m-3 w-25 h-100'>
            <div className="card-header card-header-clean f1vw fw600"
            onClick={() => props.setStandard(props.standard.id)}
            >
                Class {props.standard.name}
            </div>
            <div className="card-body fsxs">
                <div className="row">
                    <div className="col">
                        Sections : {props.standard.sections}
                    </div>
                    <div className="col">
                        Teachers : {props.standard.teachers}
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        Students : {props.standard.students}
                    </div>
                </div>
            </div>
		</div>
	);
}