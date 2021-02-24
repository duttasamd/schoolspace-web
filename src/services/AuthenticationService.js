import CookieService from "./CookieService";
import axios from 'axios';
import inMemoryTokenStorage from './../utils/inMemoryTokenStorage';

const moment = require('moment');

class AuthenticationService {
	async login(username, password) {
		const response = await axios({
			method:'post',
			url : `${process.env.REACT_APP_SCHOOLSPACE_API_URL}/login`,
			auth: {
				username: username,
				password: password
			}
		});

		if(response.status !== 200)
			Promise.reject(new Error("Could not log in."));

		CookieService.setToken(response.data);

		return true;
	}

	refreshToken() {
		const requestOptions = {
			method: "POST",
			headers: { "Content-Type": "application/json",
				Authorization:
				"Bearer " + CookieService.get("access_token"),
			},
			body: JSON.stringify({ "refresh_token":  CookieService.get("refresh_token")}),
		};

		fetch(
			process.env.REACT_APP_SCHOOLSPACE_API_URL + "/refreshtoken",
			requestOptions
		)
		.then(async (response) => {
			const data = await response.json();

			if (!response.ok) {
				// get error message from body or default to response status
				const error = (data && data.message) || response.status;
				throw new Error(error);
			}

			this.authenticated = true;
			const options = { path: "/", sameSite: "strict" };
			CookieService.set("access_token", data.access_token, options);
			CookieService.set("refresh_token", data.refresh_token, options);
			CookieService.set("expires_at", data.expires_at, options);

		});
	}

	logout(callback) {
		CookieService.eraseToken();

		if (callback != null) 
			callback();

	}

	isAuthenticated() {
		console.log("In is authenticated.");
		const access_token = CookieService.get('access_token');
		let expires_at = CookieService.get('expires_at');

		if(!access_token)
			return false;

		expires_at = moment.utc(expires_at);

		if(expires_at.isBefore(moment.utc())) {
			this.logout();
			return false;
		} 
		// else if(expires_at.diff(moment.utc()) < 60) {
		// 	console.log("refreshing token");
		// 	this.refreshToken();
		// }

		return true;
	}
}

export default new AuthenticationService();
