import React, {useState, useEffect} from 'react';
import { useParams } from "react-router-dom";
import {Button} from 'react-bootstrap'
import authAxios from '../../../utils/authAxios';
import Navbar from '../../Navbar'

function IndividualAttendance() {

    let { sectionId } = useParams();

    const [students, setStudents] = useState([]);
    const [studentIndex, setStudentIndex] = useState(0);
    
    useEffect(() => {
        authAxios.get('/students?' + new URLSearchParams({
            pageSize: 0,
            sectionId: sectionId,

        })).then((res) => {
            setStudents(res.data.data);
        }).catch((err) => {
            console.log(err);
        })
    }, [])

    const next = () => {
        setStudentIndex(studentIndex + 1);
    }

    return (
        <>
            <Navbar/>

            <div className="d-flex" style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh'
            }}>


            <div className="mx-auto">
                <div className="row">
                    <div className="col">
                        <img src="img/profile/default.jpg"></img>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <span><strong>{students[studentIndex] && 
                        `${students[studentIndex].firstname} ${students[studentIndex].lastname}`}</strong></span>
                    </div>
                </div>
                
                <div className="row">
                    <div className="col">
                        <span>{students[studentIndex] && students[studentIndex].standard}</span>
                    </div>
                    <div className="col">
                        <span>{students[studentIndex] && students[studentIndex].section}</span>
                    </div>
                    <div className="col">
                        <span>{students[studentIndex] && students[studentIndex].roll}</span>
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <Button onClick={next} variant="danger">Absent</Button>
                    </div>
                    <div className="col">
                    <Button onClick={next} variant="success">Present</Button>
                    </div>
                </div>

            </div>


            </div>
        </>
        
    )
}

export default IndividualAttendance
