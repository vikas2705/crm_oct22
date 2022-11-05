import React from "react";
import { Button, Modal } from "react-bootstrap";

const TicketModal = props => {
    const { ticketModalVisible, hideTicketModal, selectedTicketDetails } =
        props;

    return (
        ticketModalVisible && (
            <Modal
                show={ticketModalVisible}
                keyboard='false'
                onHide={hideTicketModal}
                backdrop='static'
                centered
            >
                <Modal.Header>
                    <Modal.Title>Update Ticket</Modal.Title>
                </Modal.Header>
                <form>
                    <Modal.Body>
                        <p className='m-2'>
                            TicketId: {selectedTicketDetails.id}
                        </p>

                        <div className='form-container my-4 mx-2'>
                            <label htmlFor='title' className='d-flex'>
                                <span>Title:</span>
                                <input
                                    type='text'
                                    id='title'
                                    name='title'
                                    className='form-control  mx-2'
                                    value={selectedTicketDetails.title}
                                ></input>
                            </label>
                        </div>

                        <div className='form-container my-4 mx-2'>
                            <label htmlFor='description' className='d-flex'>
                                <span> Desciption:</span>
                                <input
                                    type='text'
                                    id='description'
                                    name='description'
                                    className='form-control  mx-2'
                                    value={selectedTicketDetails.description}
                                ></input>
                            </label>
                        </div>

                        <div className='form-container my-4 mx-2'>
                            <label htmlFor='assignee' className='d-flex'>
                                <span> Assignee:</span>
                                <input
                                    type='text'
                                    id='assignee'
                                    name='assignee'
                                    className='form-control  mx-2'
                                    value={selectedTicketDetails.assignee}
                                    disabled
                                ></input>
                            </label>
                        </div>

                        <div className='form-container my-4 mx-2'>
                            <label htmlFor='ticketStatus' className='d-flex'>
                                <span> Ticket Status:</span>
                                <select
                                    className='form-select mx-2'
                                    name='ticketStatus'
                                    value={selectedTicketDetails.ticketStatus}
                                >
                                    <option value='IN_PROGRESS'>
                                        IN_PROGRESS
                                    </option>
                                    <option value='OPEN'>OPEN</option>
                                    <option value='BLOCKED'>BLOCKED</option>
                                    <option value='CLOSED'>CLOSED</option>
                                </select>
                            </label>
                        </div>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button
                            type='submit'
                            className='btn btn-secondary'
                            onClick={hideTicketModal}
                        >
                            Cancel
                        </Button>
                        <Button type='submit' className='btn btn-primary'>
                            Save
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        )
    );
};

export default TicketModal;
