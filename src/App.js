import React from "react";
import "./App.css";
import Login from "./components/login/Login";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/home/Home";
import { ProtectedRoute } from "./protected.route";
import Profile from "./components/profile/Profile";
import Course from "./components/course/Course";
import ForumDash from "./components/forum/ForumDash";
import IndividualAttendance from "./components/teacher/Attendance/IndividualAttendance";

function App() {
	return (
		<Router>
			<Switch>
				<Route exact path='/login' component={Login} />
				<ProtectedRoute exact path='/' component={Home} />
				<Route path='/user/:id' component={Profile} />
				<ProtectedRoute exact path='/section/course/:id' component={Course} />
				<ProtectedRoute exact path='/forum/:id' component={ForumDash} />
				<Route exact path='/attendance-test/:sectionId' component={IndividualAttendance}/>
			</Switch>
		</Router>
	);
}

export default App;
