import React from "react";
import { useHistory } from "react-router-dom";

import auth from "../../services/AuthenticationService";

export default function Logout(props) {
	const history = useHistory();
	function handleClick(e) {
		auth.logout(() => {
			history.push("/login");
		});
	}
	return (
		<a className='dropdown-item' onClick={handleClick}>
			Logout
		</a>
	);
}
