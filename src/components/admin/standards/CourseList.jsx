import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useEffect, useState } from "react";
import CourseCard from "../../student/course/CourseCard";
import authAxios from '../../../utils/authAxios';

export default function CourseList(props) {
    const [courses, setCourses] = useState([]);
    
    useEffect(() => {
        authAxios.get(
			"/courses?" + new URLSearchParams({
                section_id: props.section_id
            })
		).then((response) => {
			setCourses(response.data);
		})
    }, []);

    return (
        <div className='container my-5 p-3'>
            <div className='btn my-3 ml-3 float-left'
                onClick={() => props.setSection(-1)}
            >
                <FontAwesomeIcon icon={faArrowLeft} />
			</div>
            <div className="row my-5 w-100">
                {
                    courses.map((course) => (
                        <a href={ "/#/section/course/" + course.id } key={course.id}>
                            <CourseCard course={course} setSection={props.setSection}/>
                        </a>
                    )
                )}
            </div>
        </div>
    );
}
