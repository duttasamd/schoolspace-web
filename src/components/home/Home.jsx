import React, { Component } from "react";
import { ClipLoader } from "react-spinners";
import UserService from "../../services/UserService";
import AdminHome from "../admin/AdminHome";
import StudentHome from "../student/StudentHome";
import TeacherHome from "../teacher/TeacherHome";

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			user: {},
		};
	}

	componentDidMount() {
		UserService.get((user) => {
			this.setState({ loading: false, user: user });
		});
	}

	render() {
		let userComponent;
		if (this.state.user.role_id === 1) {
			userComponent = <AdminHome />;
		} else if (this.state.user.role_id === 2) {
			userComponent = <StudentHome user={this.state.user} />;
		} else if (this.state.user.role_id === 3) {
			userComponent = <TeacherHome user={this.state.user} />;
		}

		return (
			<div>
				<div className='spinner'>
					<ClipLoader
						size={150}
						color={"#123abc"}
						loading={this.state.loading}
					/>
				</div>

				{userComponent}
			</div>
		);
	}
}

export default Home;
