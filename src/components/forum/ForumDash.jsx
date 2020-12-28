import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FetchService from '../../services/FetchService';
import Navbar from '../Navbar';
import "./forum.css";
import ForumTable from './ForumTable';

export default function ForumDash() {
    let { id } = useParams();
    const [forum, setForum] = useState({});

    useEffect(() => {
		FetchService.fetch(
			"/forums/get/" + id,
			"GET",
			"application/json",
            true,
            null,
			(data) => {
                console.log(data);
				setForum(data);
			}
		);
    }, []);

    return (
        <div>
            <Navbar />
            <div className="container mt-5 pt-3">
                <div className="row my-3">
                    <div className="col-md-8 col-6">
                        <span className="fsxl m-5"><strong>FORUM</strong></span>
                    </div>
                    <div className="col-md-4 col-6">
                        <div className="row">
                            Course : {forum.course}
                        </div>
                        <div className="row">
                            Section : {forum.section}
                        </div>
                    </div>
                </div>
                <div className="row">
                    <ForumTable forum_id={id}/>
                </div>
            </div>
        </div>
    );
}