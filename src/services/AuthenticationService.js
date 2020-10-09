import CookieService from "./CookieService";

class AuthenticationService {
	constructor() {
		const token = CookieService.get("access_token");
		// TODO: Check if access_token is valid.
		token ? (this.authenticated = true) : (this.authenticated = false);
	}

	login(email, password, callback) {
		const requestOptions = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ username: email, password: password }),
		};

		fetch(
			process.env.REACT_APP_SCHOOLSPACE_API_URL + "/login",
			requestOptions
		)
			.then(async (response) => {
				const data = await response.json();
				// check for error response
				if (!response.ok) {
					// get error message from body or default to response status
					const error = (data && data.message) || response.status;
					return Promise.reject(error);
				}

				this.authenticated = true;
				const options = { path: "/", sameSite: "strict" };
				CookieService.set("access_token", data.access_token, options);

				callback();
			})
			.catch((error) => {
				console.error("ERROR : ", error);
				callback(error);
			});
	}

	logout(callback) {
		CookieService.remove("access_token");
		this.authenticated = false;
		if (callback != null) callback();
	}

	isAuthenticated() {
		return this.authenticated;
	}
}

export default new AuthenticationService();
