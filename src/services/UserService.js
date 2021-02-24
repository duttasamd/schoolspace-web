import authAxios from './../utils/authAxios';

class UserService {
	async get(callback) {
		authAxios.get('/user')
		.then((response) => {
			callback(response.data);
		});
	}
}

export default new UserService();
