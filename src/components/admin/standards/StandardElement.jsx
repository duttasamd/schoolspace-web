import React from "react";
import CourseCard from "./CourseCard";
import SectionCard from "./SectionCard";

export default function StandardElement(props) {
	return (
		<div className='card my-3'>
			<div className='card-header' id={"heading" + props.standard.id}>
				<h5 className='mb-0'>
					<button
						className='btn btn-link'
						data-toggle='collapse'
						data-target={"#h" + props.standard.id}
						aria-expanded='true'
						aria-controls='collapseOne'
					>
						Class : {props.standard.name}
					</button>
				</h5>
			</div>

			<div
				id={"h" + props.standard.id}
				className='collapse'
				aria-labelledby={"heading" + props.standard.id}
				data-parent='#accordion'
			>
				<div className='card-body'>
					<h6>Sections : </h6>
					<div className='hflex-s p-3'>
						{props.standard.sections.map((block) => (
							<SectionCard section={block} />
						))}
					</div>

					<h6 className='mt-2'>Courses : </h6>
					<div className='hflex-s p-3'>
						{props.standard.courses.map((block) => (
							<CourseCard course={block} />
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
