import React, { useEffect, useState } from 'react';
import authAxios from '../../utils/authAxios';
import CourseContentAdd from './CourseContentAdd';
import CourseContentItem from './CourseContentItem';

export default function CourseContent(props) {
    const [courseContentList, setCourseContentList] = useState([]);
    useEffect(() => {
        authAxios.get('/coursecontents?' + new URLSearchParams({
            courseSectionId: props.courseSectionId,
            onlyIds : true
        })).then((response) => {
            setCourseContentList(response.data);
        })
    },[]);

    return (
        <div>
            <div className="row mt-5">
                <div className="col-2"><strong>Course Contents</strong></div>
                <div className="offset-8 col-2"><CourseContentAdd courseSectionId={props.courseSectionId}/></div>
            </div>
            {courseContentList.map(
                (courseContentId) => <CourseContentItem id={courseContentId} key={courseContentId}/>)}
        </div>
    )
}