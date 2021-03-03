import React from "react";

export default function SectionCard(props) {
	return (
		<div className='card m-3 w-25 h-100'>
            <div className="card-header card-header-clean f1vw fw600"
            onClick={() => props.setSection(props.section.id)}
            >
                Section {props.section.name}
            </div>
            <div className="card-body fsxs">
                <div className="row">
                    <div className="col">
                        Teachers : {props.section.teachers}
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        Students : {props.section.students}
                    </div>
                </div>
            </div>
		</div>
	);
}