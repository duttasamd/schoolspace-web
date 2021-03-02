import { useEffect, useState } from "react";
import React from "react";
import authAxios from '../../utils/authAxios';
import Navbar from "../Navbar";
import CollapseCard from "./CollapseCard";
import "./studenthome.css";
import CourseCard from "./course/CourseCard";

export default function StudentHome(props) {
  const exams = [
    {
      name : "Maths Assessment",
      date : "Tomorrow"
    },
    {
      name : "English Assessment",
      date : "21.11.2020"
    }
  ];

  const assignments = [
    {
      name : "Bengali Assignment",
      date : "in 3 days"
    },
    {
      name : "History Assignment",
      date : "15.11.2020"
    },
    {
      name : "Science Assignment",
      date : "17.11.2020"
    }
  ];

  const [courses, setCourses] = useState([]);

	useEffect(() => {
    authAxios.get("/courses/listforuser")
    .then((response) => {
			setCourses(response.data)
		})
  }, []);
  
  return (
    <div>
      <Navbar />
      <div className="container mt-5 pt-3">
          <div className="row">
            <div className="col-md-7 col-lg-8 mt-3 order-md-1 order-2">
              <div className="tilesFlexContainer">
                {
                  courses.map((course) => (
                    <a href={ "/#/section/course/" + course.id } key={course.id}>
                      <CourseCard course={course}/>
                    </a>
                  ))
                }
              </div>
            </div>
            <div className="col-md-5 col-lg-4 order-md-2 order-1">
              <CollapseCard title="Upcoming Exams" id="upexams" border="borderred" data={exams} badge="2"/>
              <CollapseCard title="Assignments" id="upassignments" border="borderorange" data={assignments} badge="3"/>
            </div>
          </div>
      </div>
    </div>
  );
}
