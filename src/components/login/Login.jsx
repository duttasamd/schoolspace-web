import React, { useState } from "react";
import "./login.css";
import auth from "../../services/AuthenticationService";
import { useHistory } from "react-router-dom";

export default function Login(props) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const history = useHistory();

	function validateForm() {
		return email.length > 0 && password.length > 0;
	}

	function handleSubmit(event) {
		auth.login(email, password, (error) => {
			if (error != null) {
				setError("Invalid login attempt. Please check email/password.");
			} else {
				setError("");
				history.push("/");
			}
		});

		event.preventDefault();
	}

	return (
		<div className='flex-center container fullscreen'>
			<div className='w-md-40 px-xs-5 px-3'>
				<label className='logotxt w-100 mb-3'>School Space</label>
				<form onSubmit={handleSubmit}>
					<label className='errormessage'>{error}</label>
					<input
						type='email'
						name='email'
						id='email'
						placeholder='email'
						className='form-control mb-3'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
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
