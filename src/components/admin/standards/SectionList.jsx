import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getUnequalProps } from '@fullcalendar/react';
import React from 'react';
import { useEffect, useState } from "react";
import FetchService from "../../../services/FetchService";
import SectionCard from './SectionCard';

export default function SectionList(props) {
    const [sections, setSections] = useState([]);
    
    useEffect(() => {
		FetchService.fetch(
			"/sections?" + new URLSearchParams({
                standard_id: props.standard_id
            }),
			"GET",
			"application/json",
            true,
            null,
			(sections) => {
				setSections(sections);
			}
		);
    }, []);
    
    return(
        <div className='container my-5 p-3'>
            <div className='btn my-3 ml-3 float-left'
                onClick={() => props.setStandard(-1)}
            >
                <FontAwesomeIcon icon={faArrowLeft} />
			</div>
            <div className="row my-5 w-100">
                {sections.map((block) => (
                    <SectionCard section={block} setSection={props.setSection}/>
                ))}
            </div>
        </div>
        
    )
}