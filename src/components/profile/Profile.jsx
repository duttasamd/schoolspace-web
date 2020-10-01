import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FetchService from "../../services/FetchService";
import Navbar from "../Navbar";
import "./profile.css";

export default function Profile() {
	let { id } = useParams();

	const [user, setUser] = useState([]);

	useEffect(() => {
		let endpoint = "/user/" + id;
		FetchService.fetch(endpoint, "GET", "application/json", (user) => {
			setUser(user);
		});
	}, []);

	return (
		<div id='page-content-wrapper'>
			<Navbar />
			<img
				className='cover'
				src={"/img/profile/defaultprofilecover.jpg"}
				alt=''
			/>

			<div className='container profilecontent mt-14vw'>
				<div className=''>
					<img
						className='user'
						src={"/img/profile/defaultuser.png"}
						alt=''
					/>
					<label className='uname mx-3'>
						{user.firstname} {user.lastname}
					</label>
				</div>
			</div>
		</div>
	);
}
