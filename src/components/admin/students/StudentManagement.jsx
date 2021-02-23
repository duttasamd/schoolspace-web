import React, { Component } from "react";
import Assignments from "../../assignments/Assignments";
import StudentTable from "./StudentTable";

class StudentManagement extends Component {
  render() {
    return (
      <div>
        <Assignments />
        <StudentTable />
      </div>
    );
  }
}

export default StudentManagement;
