import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DashCard from "./DashCard";
import "./dashboard.css";

import {
	faAngleDoubleRight,
	faAngleDoubleLeft,
	faUsers,
	faUserGraduate,
	faChalkboardTeacher,
	faUserCircle,
	faThList,
	faHashtag,
} from "@fortawesome/free-solid-svg-icons";
import Calendar from "../Calendar";

class Dashboard extends Component {
	constructor() {
		super();
		this.state = {
			sidenavtoggleicon: faAngleDoubleLeft,
		};
	}
	render() {
		const handleMenuToggle = () => {
			this.props.toggleSidenav((isopen) => {
				if (isopen) {
					this.setState({
						sidenavtoggleicon: faAngleDoubleRight,
					});
				} else {
					this.setState({
						sidenavtoggleicon: faAngleDoubleLeft,
					});
				}
			});
		};

		const dashcardclass = "card shadow-sm h-100 py-2";

		return (
			<div>
				<button
					id='btnSideNavToggle'
					className='btn btn-primary px-1 rounded-0 mt-3'
					onClick={handleMenuToggle}
				>
					<FontAwesomeIcon icon={this.state.sidenavtoggleicon} />
				</button>

				<div className='container-fluid maxw-90'>
					<div className='row'>
						<div
							className='col-sm'
							onClick={() => this.props.pageSelect("users")}
						>
							<DashCard
								title='Total Users'
								relendpoint='/users/count'
								icon={faUsers}
								dashcardclass={
									dashcardclass + " border-left-grey"
								}
							/>
						</div>
						<div
							className='col-sm'
							onClick={() => this.props.pageSelect("students")}
						>
							<DashCard
								title='Students'
								relendpoint='/students/count'
								icon={faUserGraduate}
								dashcardclass={
									dashcardclass + " border-left-blue"
								}
							/>
						</div>
						<div className='col-sm'
							onClick={() => this.props.pageSelect("teachers")}
						>
							<DashCard
								title='Teachers'
								relendpoint='/teachers/count'
								icon={faChalkboardTeacher}
								dashcardclass={
									dashcardclass + " border-left-red"
								}
							/>
						</div>
						<div className='col-sm'
							onClick={() => this.props.pageSelect("staff")}
						>
							<DashCard
								title='Staff'
								relendpoint='/users/staffcount'
								icon={faUserCircle}
								dashcardclass={
									dashcardclass + " border-left-orange"
								}
							/>
						</div>
					</div>
					<div className='row my-5'>
						<div className='col-md-9'>
							<Calendar />
						</div>
						<div className='col-md-3'>
							<div className='row'>
								<div className='col'
									onClick={() => this.props.pageSelect("standards")}	
								>
									<DashCard
										title='Standards'
										relendpoint='/standards/count'
										icon={faThList}
										dashcardclass={dashcardclass}
									/>
								</div>
							</div>
							<div className='row py-3'>
								<div className='col'>
									<DashCard
										title='Sections'
										relendpoint='/sections/count'
										icon={faHashtag}
										dashcardclass={dashcardclass}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Dashboard;
