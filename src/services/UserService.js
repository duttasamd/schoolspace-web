import CookieService from "./CookieService";
import AuthenticationService from "./AuthenticationService";

class UserService {
	get(callback) {
		if (AuthenticationService.isAuthenticated()) {
			const requestOptions = {
				method: "GET",
				headers: {
					Accept: "application/json",
					Authorization:
						"Bearer " + CookieService.get("access_token"),
				},
			};

			fetch(
				process.env.REACT_APP_SCHOOLSPACE_API_URL + "/user",
				requestOptions
			)
				.then(async (response) => {
					const data = await response.json();
					if (!response.ok) {
						const error = (data && data.message) || response.status;
						return Promise.reject(error);
					}
					console.log("User loaded.");
					callback(data);
				})
				.catch((error) => {
					console.error("ERROR : ", error);
					AuthenticationService.logout();
				});
		} else {
			return null;
		}
	}

	set(user) {}
}

export default new UserService();
