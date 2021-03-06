import React, { useState, useEffect } from 'react';
import ReactDatePicker from 'react-datepicker';
import { useParams } from 'react-router-dom';
import authAxios from '../../../utils/authAxios';
import Navbar from '../../Navbar';
import moment from 'moment';

import "react-datepicker/dist/react-datepicker.css";
import UserService from '../../../services/UserService';

export default function Attendance() {
    let { sectionId } = useParams();
    
    const [attendances, setAttendances] = useState([]);
    const [section, setSection] = useState({});
    const [startDate, setStartDate] = useState(new Date());

    const [logger, setLogger] = useState({});
    
    useEffect(() => {
        authAxios.get('/user')
		.then((response) => {
			setLogger(response.data);
		})
        .catch(err => {
            console.log(err);
        });

        authAxios.get(`/sections/${sectionId}`).then(
            (res) => {
                console.log(res.data);
            setSection(res.data);
        }).catch((err) => {
            console.log(err);
        })
    }, [])

    useEffect(() => {
        authAxios.get(`/attendance/${sectionId}?` + new URLSearchParams({
            date : startDate.toISOString(),
        })).then((res) => {
            console.log(res.data);
            setAttendances(res.data);
        }).catch((err) => {
            console.log(err);
        })
    }, [startDate]);

    const logAttendance = (userId, isPresent) => {
        authAxios.put(`/attendance`,
        {
            userId : userId,
            date : startDate,
            isPresent : isPresent,
            sectionId : sectionId
        })
        .then((res) => {
            setAttendances(
                attendances.map((attendance) => {
                    if(attendance.user_id === userId) {
                        attendance.id = 1;
                        attendance.is_present = isPresent;
                        attendance.logger_fn = logger.firstname;
                        attendance.logger_ln = logger.lastname;
                        attendance.date = moment();
                    }
                    return attendance;
                })
            )
        }).catch((err) => {
            console.log(err);
        })
    }

    return (
        <>
            <Navbar/>
            <div className="container mt-5">
                <div className="my-5 pt-5 d-flex">
                    <span className="mr-auto"><strong>Attendance : {section.standard} {section.name}</strong></span>
                    <ReactDatePicker
                        className="ml-auto"
                        dateFormat="eeee,  dd MMM yyyy"
                        selected={startDate} onChange={date => {setStartDate(date)}}>
                    </ReactDatePicker>
                </div>
                {
                    attendances.map((attendance, index) => {
                        return (
                            <>
                            <div className="row my-3" key={index}>
                                <div className="col-1 text-align-center">
                                    {attendance.roll}
                                </div>
                                <div className="col-5">
                                    <strong>
                                        {attendance.user_fn} {attendance.user_ln}
                                    </strong>
                                </div>
                                <div className="col-6">
                                {
                                    attendance.id ? 
                                    (
                                        <div className="d-flex">
                                            <span className="badge badge-light mx-auto vertical-align-middle">
                                                {attendance.logger_fn} {attendance.logger_ln}
                                            </span>
                                            {
                                                attendance.is_present ? (
                                                    <span className="mx-auto text-success"><strong>Present</strong></span>
                                                ) : (
                                                    <span className="mx-auto text-danger"><strong>Absent</strong></span>
                                                )
                                            }                                        
                                        </div>
                                    ) : (
                                        moment(startDate).isBefore(moment(), 'day') ? 
                                        (
                                            <div className="row">
                                                <div className="col">
                                                    <span muted>Not logged</span>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="row">
                                                <div className="col">
                                                    <button className="btn btn-danger btn-sm w-100" onClick={() => {logAttendance(attendance.user_id, false)}}>Absent</button>
                                                </div>
                                                <div className="col">
                                                    <button className="btn btn-success btn-sm w-100" onClick={() => {logAttendance(attendance.user_id, true)}}>Present</button>
                                                </div>
                                            </div>
                                        )
                                    )
                                }
                                </div>                               
                            </div>

                            <hr/>
                            </>
                        )
                    })
                }
            </div>
            
        </>
    );
}