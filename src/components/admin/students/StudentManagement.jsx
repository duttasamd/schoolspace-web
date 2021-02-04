import React, { Component } from "react";
import StudentTable from "./StudentTable";
import TextEditor from "../../tools/TextEditor"

class StudentManagement extends Component {
  render() {
    return (
      <div>
        <hr/>
        <TextEditor />
        <StudentTable />
      </div>
    );
  }
}

export default StudentManagement;
