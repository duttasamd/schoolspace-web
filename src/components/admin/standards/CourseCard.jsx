import React from "react";

export default function CourseCard(props) {
  return (
    <div class="card mx-2 my-3">
      <div class="card-body">
        <h5 class="card-title">{props.course.name}</h5>
        <p class="card-text">Compulsory Course</p>
        <a href="#" class="btn btn-primary">
          Manage Course
        </a>
      </div>
    </div>
  );
}
