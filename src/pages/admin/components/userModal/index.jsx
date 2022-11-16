import React from "react";
import { Button, Modal } from "react-bootstrap";
import { PROFILE_STATUS } from "../../../../common/constants/profileStatus";
import { USER_TYPES } from "../../../../common/constants/userTypes";

const UserModal = props => {
    const {
        userModalVisible,
        hideUserModal,
        handleUserUpdate,
        selectedUserDetails,
        handleSelectedUserDataChange,
        updateUserError,
    } = props;

    return (
        userModalVisible && (
            <Modal
                show={userModalVisible}
                keyboard='false'
                onHide={hideUserModal}
                backdrop='static'
                centered
            >
                <Modal.Header>
                    <Modal.Title>Update User Record</Modal.Title>
                </Modal.Header>
                <form onSubmit={handleUserUpdate}>
                    <Modal.Body>
                        <p className='m-2'>
                            UserId: {selectedUserDetails.userId}
                        </p>

                        <div className='form-container my-4 mx-2'>
                            <label htmlFor='name' className='d-flex'>
                                <span>Name:</span>
                                <input
                                    type='text'
                                    id='name'
                                    name='name'
                                    className='form-control  mx-2'
                                    value={selectedUserDetails.name}
                                    onChange={handleSelectedUserDataChange}
                                ></input>
                            </label>
                        </div>

                        <div className='form-container my-4 mx-2'>
                            <label htmlFor='email' className='d-flex'>
                                <span> Email:</span>
                                <input
                                    type='email'
                                    id='email'
                                    name='email'
                                    className='form-control  mx-2'
                                    value={selectedUserDetails.email}
                                    onChange={handleSelectedUserDataChange}
                                    disabled
                                ></input>
                            </label>
                        </div>

                        <div className='form-container my-4 mx-2'>
                            <label htmlFor='userType' className='d-flex'>
                                <span> User Type:</span>
                                <select
                                    className='form-select mx-2'
                                    name='userType'
                                    id='userType'
                                    value={selectedUserDetails.userTypes}
                                    onChange={handleSelectedUserDataChange}
                                >
                                    <option value={USER_TYPES.ADMIN}>
                                        {USER_TYPES.ADMIN}
                                    </option>
                                    <option value={USER_TYPES.ENGINEER}>
                                        {USER_TYPES.ENGINEER}
                                    </option>
                                    <option value={USER_TYPES.CUSTOMER}>
                                        {USER_TYPES.CUSTOMER}
                                    </option>
                                </select>
                            </label>
                        </div>

                        <div className='form-container my-4 mx-2'>
                            <label htmlFor='userStatus' className='d-flex'>
                                <span> User Status:</span>
                                <select
                                    className='form-select mx-2'
                                    name='userStatus'
                                    value={selectedUserDetails.userStatus}
                                    onChange={handleSelectedUserDataChange}
                                >
                                    <option value={PROFILE_STATUS.PENDING}>
                                        {PROFILE_STATUS.PENDING}
                                    </option>
                                    <option value={PROFILE_STATUS.APPROVED}>
                                        {PROFILE_STATUS.APPROVED}
                                    </option>
                                    <option value={PROFILE_STATUS.REJECTED}>
                                        {PROFILE_STATUS.REJECTED}
                                    </option>
                                </select>
                            </label>
                        </div>

                        {updateUserError && (
                            <div className='my-2 text-danger mx-2'>
                                {updateUserError}
                            </div>
                        )}
                    </Modal.Body>

                    <Modal.Footer>
                        <Button
                            type='submit'
                            className='btn btn-secondary'
                            onClick={hideUserModal}
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

export default UserModal;
