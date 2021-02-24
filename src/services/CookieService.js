import Cookie from "universal-cookie";

const cookie = new Cookie();

class CookieService {
	get(key) {
		return cookie.get(key);
	}

	set(key, value, options) {
		return cookie.set(key, value, options);
	}

	remove(key) {
		console.log(`Removing cookie : ${key}`);
		cookie.remove(key, { path: "/", domain: "localhost" });
	}

	setToken(token) {
		this.set('access_token', token.access_token);
		this.set('refresh_token', token.refresh_token);
		this.set('expires_at', token.expires_at);
	}

	eraseToken() {
		this.remove('access_token');
		this.remove('refresh_token');
		this.remove('expires_at');
	}
}

export default new CookieService();
