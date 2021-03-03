import { Button, Modal } from 'react-bootstrap';
import React, { useState } from 'react';
import ContentCreationForm from '../ContentCreationForm';
import {
	faPlus
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import authAxios from '../../utils/authAxios';

export default function CourseContentAdd(props) {
    const onSubmit = (data) => {
        authAxios.put('/coursecontents', {
            courseSectionId : props.courseSectionId,
            title : data.title,
            description : data.description,
            files : data.files
        }).then(() => {
            setShow(false);
            props.onAdd();
        }).catch((err) => {
            console.log(err);
        });
    }

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div>
            <Button variant="outline-primary" onClick={handleShow}>
                <FontAwesomeIcon icon={faPlus}/>
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                size="xl"
            >
                <Modal.Header closeButton>
                    <strong>Add Course Content</strong>
                </Modal.Header>
                <Modal.Body>
                    <ContentCreationForm onSubmit={onSubmit}/>
                </Modal.Body>
            </Modal>
        </div>
    );
}