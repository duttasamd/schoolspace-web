import React, { Component } from 'react';
import UserService from '../services/UserService';
import Logout from './login/Logout';

class Navbar extends Component {   
    constructor() {
        super();
        this.state = { user : false };
    }

    componentDidMount() {
        UserService.get((json) => {
            console.log(json);
            this.setState({ user: json });
            console.log(this.state);
        });
    }

    render () {
        console.log("rendering");
        let adminlink;

        if(this.state.user && this.state.user.isAdmin) {
            adminlink = 
            <a className="dropdown-item" href="/admin">Admin Page</a> 
        }
     
        let authenticationcontext;

        if(this.state.user) {
            authenticationcontext =
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item dropdown">
                        <a id="navbarDropdown" className="nav-link dropdown-toggle" href="/profile" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {this.state.user.firstname + " " + this.state.user.lastname }
                            <span className="caret"></span>
                        </a>

                        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                            {adminlink}
                            <Logout/>
                        </div>
                    </li>       
                </ul>
                
        } else {
            authenticationcontext = 
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <a className="nav-link" href="/login">Login</a>
                </li>

                <li className="nav-item">
                    <a className="nav-link" href="/register">Register</a>
                </li>            
            </ul>
        }

        return (
            <nav className="navbar navbar-expand-md navbar-light bg-white shadow-sm">
                <div className="container">
                    <a className="navbar-brand" href="/">
                        {process.env.REACT_APP_NAME}
                    </a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="{{ __('Toggle navigation') }}">
                        <span className="navbar-toggler-icon"></span>
                    </button>
    
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        {authenticationcontext}
                    </div>
                </div>
            </nav>
        );
    }
}

export default Navbar;