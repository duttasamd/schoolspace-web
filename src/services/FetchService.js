import CookieService from "./CookieService";
import AuthenticationService from "./AuthenticationService";

class FetchService {
  fetch(relendpoint, method, accept, callback) {
    if (AuthenticationService.isAuthenticated()) {
      const requestOptions = {
        method: method,
        headers: {
          Accept: accept,
          Authorization: "Bearer " + CookieService.get("access_token"),
        },
      };

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
          console.error("There was an error!", error);
        });
    } else {
      console.log("Not authenticated!");
      return "Not Authorized";
    }
  }
}

export default new FetchService();
