import React from 'react';

import auth from '../../services/AuthenticationService';

export default function Logout(props) {
    function handleClick(e) {    
        auth.logout(() => {
            props.history.push("/");
        });
    }
    return (
        <a className="dropdown-item" href="/" onClick={handleClick}>
            Logout
        </a>
    );
}