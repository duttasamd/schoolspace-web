import React from "react";
import "./App.css";
import Login from "./components/login/Login";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/home/Home";
import { ProtectedRoute } from "./protected.route";
import Profile from "./components/profile/Profile";
import Course from "./components/course/Course";

function App() {
	return (
		<Router basename={process.env.PUBLIC_URL}>
			<Switch>
				<Route exact path='/login' component={Login} />
				<ProtectedRoute exact path='/' component={Home} />
				<Route path='/user/:id' component={Profile} />
				<ProtectedRoute exact path='/section/course/:id' component={Course} />
			</Switch>
		</Router>
	);
}

export default App;
