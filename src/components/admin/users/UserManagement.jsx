import React, { Component } from "react";
import AddUserModal from "./AddUserModal/AddUserModal";
import UserTable from "./UserTable";

class UserManagement extends Component {
  render() {
    return (
      <div>
        <button className="btn btn-primary">Add User</button>
        <UserTable />
        <AddUserModal />
      </div>
    );
  }
}

export default UserManagement;
