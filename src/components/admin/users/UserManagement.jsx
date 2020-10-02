import React, { Component } from "react";
import AddUserModal from "./AddUserModal/AddUserModal";
import UserTable from "./UserTable";

class UserManagement extends Component {
  render() {
    return (
      <div>
        <AddUserModal />
        <UserTable />
      </div>
    );
  }
}

export default UserManagement;
