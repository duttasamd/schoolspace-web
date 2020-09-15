import React from "react";

export default function SectionCard(props) {
  return (
    <div class="card mx-2">
      <div class="card-body">
        <h5 class="card-title">Section {props.section.name}</h5>
        {/* <p class="card-text">Section</p> */}
        <a href="#" class="btn btn-primary">
          Manage Section
        </a>
      </div>
    </div>
  );
}
