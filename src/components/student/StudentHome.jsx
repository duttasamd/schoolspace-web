import { getUnequalProps } from "@fullcalendar/react";
import React from "react";
import HomeCover from "../home/HomeCover";

export default function StudentHome(props) {
  return (
    <div>
      <HomeCover user={props.user} />
    </div>
  );
}
