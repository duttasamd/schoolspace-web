import React, { Component } from "react";
import UserTable from "./UserTable";

class UserManagement extends Component {
  render() {
    return (
      <div>
        <button className="btn btn-primary">Add User</button>
        <UserTable />
      </div>
    );
  }
}

export default UserManagement;
