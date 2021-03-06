import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faTasks
} from "@fortawesome/free-solid-svg-icons";


export default function SectionCard(props) {
	return (
		<div className='card m-3 w-25 h-100'>
            <div className="card-header card-header-clean f1vw fw600 d-flex"
            onClick={() => props.setSection(props.section.id)}
            >
                <span className="mr-auto vertical-align-middle">Section {props.section.name}</span>
                <a className="ml-auto" href={`/#/attendance/${props.section.id}`}>
                    <FontAwesomeIcon icon={faTasks}/>
                </a>
                
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