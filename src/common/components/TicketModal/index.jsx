import React from "react";
import { Button, Modal } from "react-bootstrap";

const TicketModal = props => {
    const {
        ticketModalVisible,
        hideTicketModal,
        selectedTicketDetails,
        handleSelectedTicketDataChange,
        handleTicketUpdate,
        updateTicketError,
    } = props;

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
                <form onSubmit={handleTicketUpdate}>
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
                                    onChange={handleSelectedTicketDataChange}
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
                                    onChange={handleSelectedTicketDataChange}
                                ></input>
                            </label>
                        </div>

                        <div className='form-container my-4 mx-2'>
                            <label htmlFor='description' className='d-flex'>
                                <span> Ticket priority:</span>
                                <input
                                    type='text'
                                    id='ticketPriority'
                                    name='ticketPriority'
                                    className='form-control mx-2'
                                    value={selectedTicketDetails.ticketPriority}
                                    onChange={handleSelectedTicketDataChange}
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
                                    onChange={handleSelectedTicketDataChange}
                                ></input>
                            </label>
                        </div>

                        <div className='form-container my-4 mx-2'>
                            <label htmlFor='status' className='d-flex'>
                                <span> Ticket Status:</span>
                                <select
                                    className='form-select mx-2'
                                    name='status'
                                    value={selectedTicketDetails.status}
                                    onChange={handleSelectedTicketDataChange}
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
                        {updateTicketError && (
                            <div className='my-2 text-danger mx-2'>
                                {updateTicketError}
                            </div>
                        )}
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
