import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useEffect, useState } from "react";
import authAxios from '../../../utils/authAxios';
import SectionCard from './SectionCard';

export default function SectionList(props) {
    const [sections, setSections] = useState([]);
    
    useEffect(() => {
        authAxios.get(
			"/sections?" + new URLSearchParams({
                standard_id: props.standard_id
            })
		).then((response) => {
			setSections(response.data)
		})
    }, []);
    
    return(
        <div className='container my-5 p-3'>
            <div className='btn my-3 ml-3 float-left'
                onClick={() => props.setStandard(-1)}
            >
                <FontAwesomeIcon icon={faArrowLeft} />
			</div>
            <div className="row my-5 w-100">
                {sections.map((section) => (
                    <SectionCard section={section} setSection={props.setSection} key={section.id}/>
                ))}
            </div>
        </div>
        
    )
}