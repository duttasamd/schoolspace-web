import React, { Component } from "react";
import Navbar from "../Navbar";
import AdminSideNav from "./AdminSideNav";
import Dashboard from "./Dashboard";
import "./adminhome.css";
import UserManagement from "./users/UserManagement";
import StudentManagement from "./students/StudentManagement";
import TeacherManagement from "./teachers/TeacherManagement";
import StandardDashboard from "./standards/StandardDashboard";

class AdminHome extends Component {
	constructor(props) {
		super(props);
		this.toggleSidenav = this.toggleSidenav.bind(this);
		this.state = {
			navshow: "d-flex",
			currentPage: "dashboard",
		};
	}

	toggleSidenav(callback) {
		if (this.state.navshow === "d-flex") {
			this.setState({
				navshow: "d-flex toggled",
			});
			callback(true);
		} else {
			this.setState({
				navshow: "d-flex",
			});
			callback(false);
		}
	}

	pageSelect = (page) => {
		this.setState({
			currentPage: page,
		});
	};

	render() {
		let dashcomponent;
		if (this.state.currentPage === "dashboard") {
			dashcomponent = (
				<Dashboard
					toggleSidenav={this.toggleSidenav}
					pageSelect={this.pageSelect}
				/>
			);
		} else if (this.state.currentPage === "users") {
			dashcomponent = <UserManagement />;
		} else if (this.state.currentPage === "students") {
			dashcomponent = <StudentManagement />;
		} else if (this.state.currentPage === "teachers") {
			dashcomponent = <TeacherManagement />;
		} else if (this.state.currentPage === "standards") {
			dashcomponent = <StandardDashboard />;
		}

		return (
			<div className={this.state.navshow} id='wrapper'>
				<AdminSideNav pageSelect={this.pageSelect} />
				<div id='page-content-wrapper'>
					<Navbar />
					<div className='mt-5'>{dashcomponent}</div>
				</div>
			</div>
		);
	}
}

export default AdminHome;
