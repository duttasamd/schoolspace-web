import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import FetchService from "../../services/FetchService";
import Navbar from "../Navbar";
import InfoBox from "./InfoBox";
import "./profile.css";

export default function Profile() {
	let { id } = useParams();

	const [user, setUser] = useState([]);
	const [loading, setLoading] = useState(true);

	console.log({ loading });

	useEffect(() => {
		let endpoint = "/user/" + id;
		FetchService.fetch(
			endpoint,
			"GET",
			"application/json",
			false,
			null,
			(user) => {
				setUser(user);
				setLoading(false);
			}
		);
	}, []);

	return (
		<div id='page-content-wrapper'>
			<Navbar />
			<div className='spinner'>
				<ClipLoader size={150} color={"#123abc"} loading={loading} />
			</div>
			<img
				className='cover'
				src={"/img/profile/defaultprofilecover.jpg"}
				alt=''
			/>

			<div className='container mt-14vw'>
				<div className=''>
					<img
						className='user'
						src={"/img/profile/defaultuser.png"}
						alt=''
					/>
					<label className='uname mx-3'>
						{user.firstname} {user.lastname}
					</label>
					<button className='btn btn-secondary float-right middle'>
						Message
					</button>
				</div>
			</div>
			<div className='container profilecontent mt-5'>
				<div className='row'>
					<div className='col-4'>
						<InfoBox user={user} />
					</div>
					<div className='col-2 offset-6'></div>
				</div>
			</div>
		</div>
	);
}
