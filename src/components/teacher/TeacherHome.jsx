import React from "react";
import HomeCover from "../home/HomeCover";

export default function TeacherHome(props) {
  return (
    <div>
      <HomeCover user={props.user} />
    </div>
  );
}
