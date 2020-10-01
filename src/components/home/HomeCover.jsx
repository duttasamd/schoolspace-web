import React from "react";
import Navbar from "../Navbar";

export default function HomeCover(props) {
  return (
    <div>
      <Navbar />
      <div className="container">
        <h1>
          {props.user.firstname} {props.user.lastname}
        </h1>
      </div>
    </div>
  );
}
