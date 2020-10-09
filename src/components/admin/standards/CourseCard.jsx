import React from "react";

export default function CourseCard(props) {
	return (
		<div className='card mx-2 my-3'>
			<div className='card-body'>
				<h5 className='card-title'>{props.course.name}</h5>
				<p className='card-text'>Compulsory Course</p>
				<a href='#' className='btn btn-primary'>
					Manage Course
				</a>
			</div>
		</div>
	);
}
