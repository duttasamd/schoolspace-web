import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import authAxios from '../../utils/authAxios';
import Navbar from '../Navbar';
import "./forum.css";
import ForumTable from './ForumTable';
//import ForumItem from './ForumItem';

export default function ForumDash() {
    let { id } = useParams();
    const [forum, setForum] = useState({});

    useEffect(() => {
        authAxios.get(`/forums/get/${id}`)
		.then((response) => {
			setForum(response.data);
		})
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
                {/* <ForumItem 
                    data = {forum}
                /> */}
            </div>
        </div>
    );
}