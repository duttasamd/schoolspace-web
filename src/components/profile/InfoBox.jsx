import React, { useEffect, useState } from "react";
import authAxios from "../../utils/authAxios";

export default function InfoBox(props) {
	let role;
	const [studydetails, setStudydetails] = useState(null);

	switch (props.user.role_id) {
		case 1:
			console.log("setting as admin");
			role = "Admin";
			break;
		case 3:
			role = "Teacher";
			break;
		default:
			console.log("setting as admin");
			role = "Student";
	}

	function populateStudentDetails(student) {
		if (student != null) {
			setStudydetails(
				<div>
					<div className='row'>
						<div className='col'>
							<label>Class :</label>
						</div>
						<div className='col'>
							<label>
								{student.section.standard.name}
							</label>
						</div>
					</div>
					<div className='row'>
						<div className='col'>
							<label>Section :</label>
						</div>
						<div className='col'>
							<label>{student.section.name}</label>
						</div>
					</div>
					<div className='row'>
						<div className='col'>
							<label>Roll :</label>
						</div>
						<div className='col'>
							<label>{student.roll}</label>
						</div>
					</div>
				</div>
			);
		}
	}

	useEffect(() => {
		if (props.user.role_id === 2) {
			authAxios.get(`/user/student/${props.user.id}`)
			.then((response) => {
				populateStudentDetails(response.data);
			})
		} else {
			console.log(props.user.role_id);
		}
	}, [props.user]);

	return (
		<div className='panel panel-default'>
			<div className='panel-body'>
				<div className='row'>
					<div className='col'>
						<label>Username :</label>
					</div>
					<div className='col'>
						<label>{props.user.username}</label>
					</div>
				</div>
				<div className='row'>
					<div className='col'>
						<label>Email :</label>
					</div>
					<div className='col'>
						<label>{props.user.email}</label>
					</div>
				</div>
				<div className='row'>
					<div className='col'>
						<label>Phone :</label>
					</div>
					<div className='col'>
						<label>{props.user.phone}</label>
					</div>
				</div>
				<div className='row'>
					<div className='col'>
						<label>Role :</label>
					</div>
					<div className='col'>
						<label>{role}</label>
					</div>
				</div>
				{studydetails}
			</div>
		</div>
	);
}
