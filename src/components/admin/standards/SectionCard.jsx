import React from "react";

export default function SectionCard(props) {
	return (
		<div className='card mx-2'>
			<div className='card-body'>
				<h5 className='card-title'>Section {props.section.name}</h5>
				{/* <p className="card-text">Section</p> */}
				<a href='#' className='btn btn-primary'>
					Manage Section
				</a>
			</div>
		</div>
	);
}
