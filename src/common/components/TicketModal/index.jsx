import React from "react";
import { Button, Modal } from "react-bootstrap";
import { CARD_STATUS } from "../../constants/cardStatus";

const TicketModal = props => {
    const {
        ticketModalVisible,
        hideTicketModal,
        selectedTicketDetails = {},
        handleSelectedTicketDataChange,
        handleTicketUpdate,
        updateTicketError,
        isUserTypeCustomer = false,
        isCreateTicketMode = false,
    } = props;

    const {
        id = "",
        title = "",
        status = "",
        ticketPriority = "",
        assignee = "",
        description = "",
    } = selectedTicketDetails;

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
                    <Modal.Title>
                        {isCreateTicketMode
                            ? "Create New Ticket"
                            : "Update Ticket"}
                    </Modal.Title>
                </Modal.Header>
                <form onSubmit={handleTicketUpdate}>
                    <Modal.Body>
                        {!isCreateTicketMode && (
                            <p className='m-2'>TicketId: {id}</p>
                        )}
                        <div className='form-container my-4 mx-2'>
                            <label htmlFor='title' className='d-flex'>
                                <span>Title:</span>
                                <input
                                    type='text'
                                    id='title'
                                    name='title'
                                    className='form-control  mx-2'
                                    value={title}
                                    required
                                    onChange={handleSelectedTicketDataChange}
                                ></input>
                            </label>
                        </div>
                        <div className='form-container my-4 mx-2'>
                            <label htmlFor='description' className='d-flex'>
                                <span> Desciption:</span>
                                <textarea
                                    id='description'
                                    name='description'
                                    className='form-control  mx-2'
                                    onChange={handleSelectedTicketDataChange}
                                    value={description}
                                    required
                                />
                            </label>
                        </div>
                        {!isCreateTicketMode && (
                            <>
                                <div className='form-container my-4 mx-2'>
                                    <label
                                        htmlFor='ticketPriority'
                                        className='d-flex'
                                    >
                                        <span> Ticket priority:</span>
                                        <input
                                            type='text'
                                            id='ticketPriority'
                                            name='ticketPriority'
                                            className='form-control mx-2'
                                            value={ticketPriority}
                                            onChange={
                                                handleSelectedTicketDataChange
                                            }
                                            disabled={isUserTypeCustomer}
                                        ></input>
                                    </label>
                                </div>
                                <div className='form-container my-4 mx-2'>
                                    <label
                                        htmlFor='assignee'
                                        className='d-flex'
                                    >
                                        <span> Assignee:</span>
                                        <input
                                            type='text'
                                            id='assignee'
                                            name='assignee'
                                            className='form-control  mx-2'
                                            value={assignee}
                                            onChange={
                                                handleSelectedTicketDataChange
                                            }
                                            disabled={isUserTypeCustomer}
                                        ></input>
                                    </label>
                                </div>
                                <div className='form-container my-4 mx-2'>
                                    <label htmlFor='status' className='d-flex'>
                                        <span> Ticket Status:</span>
                                        <select
                                            className='form-select mx-2'
                                            name='status'
                                            value={status}
                                            onChange={
                                                handleSelectedTicketDataChange
                                            }
                                        >
                                            <option
                                                value={CARD_STATUS.IN_PROGRESS}
                                            >
                                                {CARD_STATUS.IN_PROGRESS}
                                            </option>
                                            <option value={CARD_STATUS.OPEN}>
                                                {CARD_STATUS.OPEN}
                                            </option>
                                            <option value={CARD_STATUS.BLOCKED}>
                                                {CARD_STATUS.BLOCKED}
                                            </option>
                                            <option value={CARD_STATUS.CLOSED}>
                                                {CARD_STATUS.CLOSED}
                                            </option>
                                        </select>
                                    </label>
                                </div>
                            </>
                        )}
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
                        <Button
                            type='submit'
                            className='btn btn-primary'
                            disabled={!title || !description}
                        >
                            Save
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        )
    );
};

export default TicketModal;
