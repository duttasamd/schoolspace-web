import React, { useEffect, useState } from 'react';
import authAxios from '../../utils/authAxios';
import CourseContentAdd from './CourseContentAdd';
import CourseContentItem from './CourseContentItem';

export default function CourseContent(props) {
    const [courseContentList, setCourseContentList] = useState([]);
    useEffect(() => {
        getCourseContent()
    },[]);

    const getCourseContent = () => {
        authAxios.get('/coursecontents?' + new URLSearchParams({
            courseSectionId: props.courseSectionId,
            onlyIds : true
        })).then((response) => {
            setCourseContentList(response.data);
        })
    }

    return (
        <div className="mb-5">
            <div className="d-flex mt-5">
                <div className="mr-auto"><strong>Course Contents</strong></div>
                <CourseContentAdd courseSectionId={props.courseSectionId} onAdd={getCourseContent} className="ml-auto"/>
            </div>
            {courseContentList.map(
                (courseContentId) => <CourseContentItem id={courseContentId} key={courseContentId}/>)}
        </div>
    )
}