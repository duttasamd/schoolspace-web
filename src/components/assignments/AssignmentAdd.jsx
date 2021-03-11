import { Button, Modal } from 'react-bootstrap';
import React, { useState } from 'react';
import ContentCreationForm from '../ContentCreationForm';
import {
	faPlus
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



export default function AssignmentAdd() {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const onSubmit = (data) => {
    }

    return (
        <div>
            <Button size="sm" variant="outline-secondary" onClick={handleShow}>
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
                    <strong>Add Assignment</strong>
                </Modal.Header>
                <Modal.Body>
                    <ContentCreationForm onSubmit={onSubmit}/>
                </Modal.Body>
            </Modal>
        </div>
    );
}