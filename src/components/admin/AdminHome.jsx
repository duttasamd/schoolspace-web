import React, { Component } from "react";
import Navbar from "../Navbar";
import AdminSideNav from "./AdminSideNav";
import Dashboard from "./Dashboard";
import "./adminhome.css";

class AdminHome extends Component {
  constructor(props) {
    super(props);
    this.toggleSidenav = this.toggleSidenav.bind(this);
    this.state = {
      navshow: "d-flex",
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

  render() {
    return (
      <div className={this.state.navshow} id="wrapper">
        <AdminSideNav />
        <div id="page-content-wrapper">
          <Navbar />
          <Dashboard toggleSidenav={this.toggleSidenav} />
        </div>
      </div>
    );
  }
}

export default AdminHome;
