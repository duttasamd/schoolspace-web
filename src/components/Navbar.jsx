import React, { Component } from "react";
import UserService from "../services/UserService";
import Logout from "./login/Logout";
import { Redirect } from "react-router-dom";

class Navbar extends Component {
	constructor() {
		super();
		this.state = { user: false };
	}

	componentDidMount() {
		try	{
			UserService.get((user) => {
				this.setState({ loading: false, user: user });
			});
		} catch(err) {
			return <Redirect
				to={{
					pathname: "/login"
				}}
			/>
		}
	}

	render() {
		let authenticationcontext;

		if (this.state.user) {
			authenticationcontext = (
				<ul className='navbar-nav ml-auto'>
					<li className='nav-item dropdown'>
						<a
							id='navbarDropdown'
							className='nav-link dropdown-toggle'
							href={"/#/user/" + this.state.user.username}
							role='button'
							data-toggle='dropdown'
							aria-haspopup='true'
							aria-expanded='false'
						>
							{this.state.user.firstname +
								" " +
								this.state.user.lastname}
							<span className='caret'></span>
						</a>

						<div
							className='dropdown-menu dropdown-menu-right'
							aria-labelledby='navbarDropdown'
						>
							<a className='dropdown-item' 
								href={"/#/user/" + this.state.user.username}>
									Profile
							</a>
							<Logout />
						</div>
					</li>
				</ul>
			);
		} else {
			authenticationcontext = (
				<ul className='navbar-nav ml-auto'>
					<li className='nav-item'>
						<a className='nav-link' href='/#/login'>
							Login
						</a>
					</li>

					<li className='nav-item'>
						<a className='nav-link' href='/#/register'>
							Register
						</a>
					</li>
				</ul>
			);
		}

		return (
			<nav className='navbar navbar-expand-md navbar-light fixed-top bg-white shadow-sm'>
				<div className='container'>
					<a className='navbar-brand' href='/'>
						{process.env.REACT_APP_NAME}
					</a>
					<button
						className='navbar-toggler'
						type='button'
						data-toggle='collapse'
						data-target='#navbarSupportedContent'
						aria-controls='navbarSupportedContent'
						aria-expanded='false'
						aria-label="{{ __('Toggle navigation') }}"
					>
						<span className='navbar-toggler-icon'></span>
					</button>

					<div
						className='collapse navbar-collapse'
						id='navbarSupportedContent'
					>
						{authenticationcontext}
					</div>
				</div>
			</nav>
		);
	}
}

export default Navbar;
