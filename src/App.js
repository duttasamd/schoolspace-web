import React from "react";
import "./App.css";
import Login from "./components/login/Login";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/home/Home";
import { ProtectedRoute } from "./protected.route";
import Profile from "./components/profile/Profile";

function App() {
	return (
		<Router>
			<Switch>
				<Route exact path='/login' component={Login} />
				<ProtectedRoute exact path='/' component={Home} />
				<Route path='/user/:id' component={Profile} />
			</Switch>
		</Router>
	);
}

export default App;
