import CookieService from "./CookieService";
import AuthenticationService from "./AuthenticationService";

class FetchService {
	fetch(
		relendpoint,
		method = "GET",
		accept = "application/json",
		authorize = true,
		data = null,
		callback
	) {
		let requestOptions;
		if (authorize) {
			if (AuthenticationService.isAuthenticated()) {
				requestOptions = {
					method: method,
					headers: {
						Accept: accept,
						Authorization:
							"Bearer " + CookieService.get("access_token"),
					},
				};
			} else {
				console.log("Not authenticated!");
				return "Not Authorized";
			}
		} else {
			requestOptions = {
				method: method,
				headers: {
					Accept: accept,
				},
			};
		}

		fetch(
			process.env.REACT_APP_SCHOOLSPACE_API_URL + relendpoint,
			requestOptions
		)
			.then(async (response) => {
				const data = await response.json();
				if (!response.ok) {
					const error = (data && data.message) || response.status;
					return Promise.reject(error);
				}
				console.log("Sending API Request..");
				callback(data);
			})
			.catch((error) => {
				console.error("ERROR : ", error);
				if (
					typeof error === "string" &&
					error.includes("Unauthenticated")
				) {
					AuthenticationService.logout();
				}
			});
	}
}

export default new FetchService();
