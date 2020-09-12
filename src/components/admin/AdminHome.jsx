import React, { Component } from "react";
import Navbar from "../Navbar";
import AdminSideNav from "./AdminSideNav";
import Dashboard from "./Dashboard";
import "./adminhome.css";
import UserManagement from "./users/UserManagement";

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
    console.log(page);
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
    }

    return (
      <div className={this.state.navshow} id="wrapper">
        <AdminSideNav pageSelect={this.pageSelect} />
        <div id="page-content-wrapper">
          <Navbar />
          {dashcomponent}
        </div>
      </div>
    );
  }
}

export default AdminHome;
