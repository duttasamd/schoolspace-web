import CookieService from "./CookieService";
import axios from 'axios';

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

		return true;
	}
}

export default new AuthenticationService();
