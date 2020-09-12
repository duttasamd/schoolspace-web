import React, { Component } from "react";
import "./adminsidenav.css";

class AdminSideNav extends Component {
  render() {
    return (
      <div className="bg-light border-right" id="sidebar-wrapper">
        <div className="sidebar-heading"></div>
        <div className="list-group list-group-flush">
          <button
            className="list-group-item list-group-item-action bg-light"
            onClick={() => this.props.pageSelect("dashboard")}
          >
            Dashboard
          </button>
          <button
            className="list-group-item list-group-item-action bg-light"
            onClick={() => this.props.pageSelect("users")}
          >
            Users
          </button>
          <button
            className="list-group-item list-group-item-action bg-light"
            onClick={() => this.props.pageSelect("students")}
          >
            Students
          </button>
          <button
            className="list-group-item list-group-item-action bg-light"
            onClick={() => this.props.pageSelect("teachers")}
          >
            Teachers
          </button>
          <button
            className="list-group-item list-group-item-action bg-light"
            onClick={() => this.props.pageSelect("staff")}
          >
            Staff
          </button>
          <button
            className="list-group-item list-group-item-action bg-light"
            onClick={() => this.props.pageSelect("standards")}
          >
            Standards
          </button>
          <button
            className="list-group-item list-group-item-action bg-light"
            onClick={() => this.props.pageSelect("sections")}
          >
            Sections
          </button>
          <button
            className="list-group-item list-group-item-action bg-light"
            onClick={() => this.props.pageSelect("examinations")}
          >
            Examinations
          </button>
          <button
            className="list-group-item list-group-item-action bg-light"
            onClick={() => this.props.pageSelect("reports")}
          >
            Reports
          </button>
        </div>
      </div>
    );
  }
}

export default AdminSideNav;
