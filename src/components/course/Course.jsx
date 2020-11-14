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
                        <button className="btn btn-outline-primary float-right mr-3">
                            Forum
                        </button> 
                    </div>
                </div>      
            </div>
        </div>
    );

}