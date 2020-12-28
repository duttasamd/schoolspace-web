import { useEffect, useState } from "react";
import React from "react";
import FetchService from "../../services/FetchService";
import { useParams } from "react-router-dom";
import Navbar from "../Navbar";

export default function Course(props) {
    let { id } = useParams();
    const [courseSection, setCourseSection] = useState([]);

	useEffect(() => {
		FetchService.fetch(
			"/coursesection/get/" + id,
			"GET",
			"application/json",
            true,
            null,
			(data) => {
                console.log(data);
				setCourseSection(data);
			}
		);
    }, []);

    return(
        <div>
            <Navbar />
            <div className="container mt-5 pt-3">
                <div className="row my-3">
                    <div className="col m-md-0 ml-3">
                        <div className="row">
                            <h3>{courseSection.subject}</h3>
                        </div>
                        <div className="row mb-1">
                            <span className="mr-3"><strong>Class : </strong>{courseSection.standard}</span>
                            <span><strong>Section : </strong>{courseSection.section}</span>
                        </div>
                        <div className="row">
                            <span><strong>Teacher : </strong>{courseSection.firstname + " " + courseSection.lastname}</span>
                        </div>
                    </div>
                    <div className="col pt-3">
                        <a href={"/forum/" + courseSection.forum_id} className="btn btn-outline-primary float-right mr-3">
                            Forum
                        </a> 
                    </div>
                </div>
                <div className="row my-3">
                    <div className="card mt-3 blue w-100">
                        <div className="card-header card-header-clean p-1">
                            <button className="btn btn-default btn-block" data-toggle="collapse" data-target="#cannouncements" aria-expanded="true" aria-controls="#cannouncements">
                                <span className="float-left ml-0 mr-auto"><strong>Course Announcements</strong></span>
                                <span className="badge badge-light float-right mt-1">1</span>
                            </button>
                        </div>

                        <div id="cannouncements" className="collapse" aria-labelledby="headingOne">
                            <div className="card-body py-3 px-3 pb-1">
                                Announcement 1
                            </div>
                        </div>
                    </div>
                </div> 
                <div className="row my-3">
                    <div className="card mt-3 red w-100">
                        <div className="card-header card-header-clean p-1">
                            <button className="btn btn-default btn-block" data-toggle="collapse" data-target="#cassign" aria-expanded="true" aria-controls="#cassign">
                                <span className="float-left ml-0 mr-auto"><strong>Assignments and Examinations</strong></span>
                                <span className="badge badge-light float-right mt-1">3</span>
                            </button>
                        </div>

                        <div id="cassign" className="collapse" aria-labelledby="headingOne">
                            <div className="card-body py-3 px-3 pb-1">
                                
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row my-5">
                    <div className="col">
                        <strong>Course Contents</strong>
                    </div>
                </div>
            </div>
        </div>
    );

}