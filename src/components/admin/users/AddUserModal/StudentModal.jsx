import React, { useState } from "react";
import FetchService from "../../../../services/FetchService";

function StudentModal(props) {
	const [sections, setSections] = useState([]);
	const [roll, setRoll] = useState();

	const getSections = (standard_id) => {
		FetchService.fetch(
			`/sections?standard_id=${standard_id}`,
			"GET",
			"application/json",
			true,
			null,
			(data) => {
				setSections(data);
				console.log(data);
			}
		);
	};

	const getRoll = (section_id) => {
		FetchService.fetch(
			`/students/nextroll?section=${section_id}`,
			"GET",
			"application/json",
			true,
			null,
			(data) => {
				setRoll(data);
				console.log(data);
			}
		);
	};

	return (
		<div className='from-group-row' id='hidden_student_row'>
			<div className='form-group row'>
				<label
					htmlFor='standard_id'
					className='col-md-4 col-form-label text-md-center'
				>
					Standard ID
				</label>

				<div className='col-md-6'>
					<select
						id='standard_id'
						type='text'
						name='standard_id'
						onChange={(e) => getSections(e.target.value)}
						onInput={props.changeHandle}
						required
					>
						<option value=''> Select Standard </option>
						{props.standards.map((standard) => (
							<option key={standard.id} value={standard.id}>
								{" "}
								{standard.name}{" "}
							</option>
						))}
					</select>
				</div>
			</div>

			<div className='form-group row' id='student_section_id'>
				<label
					htmlFor='student_section'
					className='col-md-4 col-form-label text-md-center'
				>
					Section
				</label>

				<div className='col-md-6'>
					<select
						id='student_section'
						type='text'
						name='student_section'
						onChange={(e) => getRoll(e.target.value)}
						onInput={props.changeHandle}
						required
					>
						<option value=''> Select Section </option>
						{sections.map((section) => (
							<option key={section.id} value={section.id}>
								{" "}
								{section.name}{" "}
							</option>
						))}
					</select>
				</div>
			</div>

			<div className='form-group row' id='roll_id'>
				<label
					htmlFor='roll'
					className='col-md-4 col-form-label text-md-center'
				>
					Roll No.
				</label>

				<div className='col-md-6'>
					<input
						id='roll'
						type='number'
						name='roll'
						placeholder={roll}
						onChange={props.changeHandle}
						required
					/>
				</div>
			</div>
		</div>
	);
}

export default StudentModal;
