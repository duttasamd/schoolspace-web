import React, { useState } from 'react';
import axios from 'axios';
import FetchService from "../../../../services/FetchService";
import CookieService from '../../../../services/CookieService';
import StudentModal from './StudentModal';



const  AddUserModal = () => {

    const [roles, setRoles] = useState([]);
    const [standards, setStandards] =  useState([]);
    const [sections, setSections] =  useState([]);
    const [roll, setRoll] = useState()

    const getRoles = () => {
        FetchService.fetch(
            "/roles", "GET", "application/json",
            (data) => {
                setRoles(data);
                console.log(data);
            }
        );
    }; 
    

    const getStandards = (user_role) => {
        if (user_role == 2){
            FetchService.fetch(
                "/standards", "GET", "application/json",
                (data) => {
                    setStandards(data);
                    console.log(data);
                }
            );
            
        }
        
    }; 

    const getSections = (standard_id) => {
        FetchService.fetch(
            `/sections?standard_id=${standard_id}`, "GET", "application/json",
            (data) => {
                setSections(data);
                console.log(data);
            }
        );
    }; 

    const getRoll = (section_id) => {
        FetchService.fetch(
            `/students/nextroll?section=${section_id}`, "GET", "application/json",
            (data) => {
                setRoll(data);
                console.log(data);
            }
        );
    }; 
    
    // useEffect(() => {
    //     getRoles();
    //     getStandards();
    //     getSections();
    // }, [standardID]);

    
    
    // submit
    const initialFormData = {
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        user_role: "",
        standard_id: "",
        student_section: "",
        roll: ""
    }

    const [formData, setFormData] = useState(initialFormData);

    const handleReset = (e) => {
        setFormData({
            ...initialFormData,
        [e.target.name]: e.target.value
        })
    }


    const handleChange = (e) => {
        setFormData({
            ...formData,

        [e.target.name]: e.target.value.trim()
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        e.persist()
        // e.target.reset()
        // console.log(e.target)
        console.log(JSON.stringify(formData));
        // submit to api
        axios
            .post('http://localhost:8000/api/v1/users/store', formData, {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    Authorization: "Bearer " + CookieService.get("access_token"),
                  }
            })
            .then(response => {
                console.log(response)
                console.log(response.data)
                alert(e.target.firstname.value + ' ' + e.target.lastname.value + ' added successfully.' )
                handleReset(e)
                e.target.reset()
            })
            .catch(error => {
                console.log(error)
                alert("Email or Roll is taken")
            })
    }

    // needs below formData initializaion
    // adds student modal
    let studentModal;
    
    if(formData.user_role == 2){
        studentModal = 
            <StudentModal 
                sectionsGet={e => getSections(e.target.value)}
                rollGet={e => getRoll(e.target.value)}
                changeHandle={handleChange}
                standards={standards}
                sections={sections}
                roll={roll}
            />
    }

    return (
        <div>
            <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#addUserModal" onClick={getRoles}>
            Add New User
            </button>

            <div className="modal fade" id="addUserModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Add New User</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>

                        <div className="card-body">
                            <form method="POST" onSubmit={handleSubmit}>
                    

                                <div className="form-group row">
                                    <label htmlFor="firstname" className="col-md-4 col-form-label text-md-center">First Name</label>

                                    <div className="col-md-6">
                                        <input id="firstname" type="text" name="firstname" required  onChange={handleChange}  />
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <label htmlFor="lastname" className="col-md-4 col-form-label text-md-center">Last Name</label>

                                    <div className="col-md-6">
                                        <input id="lastname" type="text" name="lastname" onChange={handleChange} required />
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <label htmlFor="email" className="col-md-4 col-form-label text-md-center">E-Mail Address</label>

                                    <div className="col-md-6">
                                        <input id="email" type="email"  name="email" onChange={handleChange}  required />
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <label htmlFor="phone" className="col-md-4 col-form-label text-md-center">Phone</label>

                                    <div className="col-md-6">
                                        <input id="phone" type="text"  name="phone" onChange={handleChange} required  />
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <label htmlFor="user_role" className="col-md-4 col-form-label text-md-center">User Role</label>

                                    <div className="col-md-6">
                                        <select id="user_role" type="text"  name="user_role" onChange={e => getStandards(e.target.value)} onInput={handleChange} required>
                                        <option  value=''> Select Role </option>
                                        { roles.map(role => 
                                            <option key={role.id} value={role.id} > {role.name} </option> 
                                        )}
                                        </select>
                                    </div>
                                </div>
                                
                                
                                { studentModal }


                                <div className="modal-footer justify-content-center">
                                    <button type="submit" className="btn btn-primary">Submit</button>
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                </div>

                            </form>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default AddUserModal
