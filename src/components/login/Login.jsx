import React, { useState } from "react";
import "./login.css";
import auth from "../../services/AuthenticationService";
import { useHistory } from "react-router-dom";

export default function Login(props) {
	const [emailOrUsername, setEmailOrUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const history = useHistory();

	function validateForm() {
		return emailOrUsername.length > 0 && password.length > 0;
	}

	async function handleSubmit(event) {
		event.preventDefault();
		try {
			const isLoggedIn = await auth.login(emailOrUsername, password);
			if(isLoggedIn) {
				setError("");
				history.push("/");
			} else {
				setError("Invalid login attempt. Please check email/password.");
			}
		} catch(error) {
			setError("Invalid login attempt. Please check email/password.");
		}
	}

	return (
		<div className='flex-center container fullscreen'>
			<div className='w-md-40 px-xs-5 px-3'>
				<label className='logotxt w-100 mb-3'>schoolspace</label>
				<form onSubmit={handleSubmit}>
					<label className='errormessage'>{error}</label>
					<input
						type='text'
						name='emailOrUsername'
						id='emailOrUsername'
						placeholder='username / email'
						className='form-control mb-3'
						value={emailOrUsername}
						onChange={(e) => setEmailOrUsername(e.target.value)}
					/>
					<input
						type='password'
						name='password'
						id='password'
						placeholder='password'
						className='form-control mb-3'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<input
						type='submit'
						value='Login'
						className='btn btn-block btn-primary mb-3'
						disabled={!validateForm()}
					/>
				</form>
			</div>
		</div>
	);
}
