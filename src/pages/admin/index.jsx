import React, { useEffect, useState } from "react";
import { fetchCreatedTickets } from "../../common/apis/tickets";
import { fetchUsers, updateUser } from "./apis/users";
import Sidebar from "../../common/components/SideBar";
import StatusCards from "../../common/components/StatusCards";
import MaterialTable from "@material-table/core";
import { ExportCsv, ExportPdf } from "@material-table/exporters";
import { Button, Modal } from "react-bootstrap";
import Loader from "../../common/components/Loader";

import "./admin.css";
import { USER_TYPES } from "../../common/constants/userTypes";

const Admin = () => {
    const [ticketsList, setTicketsList] = useState([]);
    const [usersList, setUsersList] = useState([]);
    const [userModalVisible, setUserModalVisible] = useState(false);
    const [selectedUserDetails, setSelectedUserDetails] = useState({});
    const [showLoader, setShowLoader] = useState(false);
    const [updateUserError, setUpdateUserError] = useState("");

    const userName = localStorage.getItem("name") || "";

    const hideUserModal = () => {
        setUserModalVisible(false);
        setSelectedUserDetails({});
        setUpdateUserError("");
    };

    const handleSelectedUserDataChange = e => {
        const currentData = { ...selectedUserDetails };
        if (e.target.name === "name") {
            currentData.name = e.target.value;
        } else if (e.target.name === "email") {
            currentData.email = e.target.value;
        } else if (e.target.name === "userType") {
            currentData.userTypes = e.target.value;
        } else {
            currentData.userStatus = e.target.value;
        }

        setSelectedUserDetails(currentData);
    };

    useEffect(() => {
        getUsers();
        getTickets();
    }, []);

    const handleUserUpdate = e => {
        e.preventDefault();

        const data = {
            userType: selectedUserDetails.userTypes,
            userStatus: selectedUserDetails.userStatus,
            userName: selectedUserDetails.name,
        };

        try {
            updateUser(data, selectedUserDetails.userId)
                .then(res => {
                    const { status } = res;
                    if (status === 200) {
                        hideUserModal();
                        getUsers();
                    }
                })
                .catch(err => {
                    console.log(err.message);
                    setUpdateUserError(err.message);
                });
        } catch (err) {
            console.log(err.message);
            setUpdateUserError(err.message);
        }

        // make an API call to update the data of this user
        // PUT Call
        // send the updated data to the server

        // if update is successful,
        // close the modal
        // clear the userDetail from State
        // fetch the userlist again so that it shows the updated Details

        // if update fails,
        // show error in the modal
    };

    const getUsers = () => {
        setShowLoader(true);

        try {
            fetchUsers()
                .then(result => {
                    const { data, status } = result;
                    if (status === 200) {
                        setUsersList(data);
                        setShowLoader(false);
                    }
                })
                .catch(err => {
                    console.log(err.message);
                    setShowLoader(false);
                });
        } catch (err) {
            console.log(err.message);
            setShowLoader(false);
        }
    };

    const getTickets = () => {
        try {
            fetchCreatedTickets()
                .then(result => {
                    const { data, status } = result;
                    if (status === 200) {
                        setTicketsList(data);
                    }
                })
                .catch(err => {
                    console.log(err.message);
                });
        } catch (err) {
            console.log(err.message);
        }
    };

    if (showLoader) {
        return <Loader />;
    }

    return (
        <div>
            <div className='container-fluid'>
                <div className='row vh-100'>
                    <div className='col-2 noPadding'>
                        <Sidebar />
                    </div>

                    <div className='col-10 admin-main bg-gray-200 vh-100 overflow-auto'>
                        <div>
                            <h2 className='text-primary'>
                                Welcome, {userName}
                            </h2>

                            <h4 className='text-secondary'>
                                Take a quick look at your admin stats below
                            </h4>
                        </div>

                        <StatusCards />
                        <div className='my-5 px-4'>
                            <MaterialTable
                                data={ticketsList}
                                columns={[
                                    {
                                        title: "ID",
                                        field: "id",
                                    },
                                    {
                                        title: "TITLE",
                                        field: "title",
                                    },
                                    {
                                        title: "DESCRIPTION",
                                        field: "description",
                                        filtering: false,
                                    },
                                    {
                                        title: "REPORTER",
                                        field: "reporter",
                                    },
                                    {
                                        title: "PRIORITY",
                                        field: "ticketPriority",
                                    },
                                    {
                                        title: "ASSIGNEE",
                                        field: "assignee",
                                    },
                                    {
                                        title: "STATUS",
                                        field: "status",
                                        lookup: {
                                            OPEN: "OPEN",
                                            IN_PROGRESS: "IN_PROGRESS",
                                            BLOCKED: "BLOCKED",
                                            CLOSED: "CLOSED",
                                        },
                                    },
                                ]}
                                options={{
                                    filtering: true,
                                    sorting: true,
                                    search: true,
                                    headerStyle: {
                                        backgroundColor: "darkblue",
                                        color: "#FFF",
                                    },
                                    rowStyle: {
                                        backgroundColor: "#EEE",
                                    },
                                    exportMenu: [
                                        {
                                            label: "Export PDF",
                                            exportFunc: (cols, datas) =>
                                                ExportPdf(
                                                    cols,
                                                    datas,
                                                    "Ticket Records CRM"
                                                ),
                                        },
                                        {
                                            label: "Export CSV",
                                            exportFunc: (cols, datas) =>
                                                ExportCsv(
                                                    cols,
                                                    datas,
                                                    "Ticket Records CRM"
                                                ),
                                        },
                                    ],
                                }}
                                title={"Ticket records"}
                                onRowClick={(event, rowData) => {
                                    console.log(event);
                                    console.log(rowData);
                                }}
                            />
                        </div>
                        <div className='my-5 px-4'>
                            <MaterialTable
                                data={usersList}
                                columns={[
                                    {
                                        title: "Email",
                                        field: "email",
                                    },
                                    {
                                        title: "NAME",
                                        field: "name",
                                    },
                                    {
                                        title: "User ID",
                                        field: "userId",
                                    },
                                    {
                                        title: "STATUS",
                                        field: "userStatus",
                                        lookup: {
                                            PENDING: "PENDING",
                                            APPROVED: "APPROVED",
                                            REJECTED: "REJECTED",
                                        },
                                    },
                                    {
                                        title: "User Type",
                                        field: "userTypes",
                                        lookup: {
                                            ADMIN: "ADMIN",
                                            CUSTOMER: "CUSTOMER",
                                            ENGINEER: "ENGINEER",
                                        },
                                    },
                                ]}
                                options={{
                                    filtering: true,
                                    sorting: true,
                                    search: true,
                                    headerStyle: {
                                        backgroundColor: "darkblue",
                                        color: "#FFF",
                                    },
                                    rowStyle: {
                                        backgroundColor: "#EEE",
                                    },
                                    exportMenu: [
                                        {
                                            label: "Export PDF",
                                            exportFunc: (cols, datas) =>
                                                ExportPdf(
                                                    cols,
                                                    datas,
                                                    "User Records CRM"
                                                ),
                                        },
                                        {
                                            label: "Export CSV",
                                            exportFunc: (cols, datas) =>
                                                ExportCsv(
                                                    cols,
                                                    datas,
                                                    "User Records CRM"
                                                ),
                                        },
                                    ],
                                }}
                                title={"User records"}
                                onRowClick={(event, rowData) => {
                                    setSelectedUserDetails({ ...rowData });
                                    setUserModalVisible(true);
                                }}
                            />
                        </div>
                    </div>
                </div>
                {userModalVisible && (
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
                                            onChange={
                                                handleSelectedUserDataChange
                                            }
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
                                            onChange={
                                                handleSelectedUserDataChange
                                            }
                                            disabled
                                        ></input>
                                    </label>
                                </div>

                                <div className='form-container my-4 mx-2'>
                                    <label
                                        htmlFor='userType'
                                        className='d-flex'
                                    >
                                        <span> User Type:</span>
                                        <select
                                            className='form-select mx-2'
                                            name='userType'
                                            id='userType'
                                            value={
                                                selectedUserDetails.userTypes
                                            }
                                            onChange={
                                                handleSelectedUserDataChange
                                            }
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
                                    <label
                                        htmlFor='userStatus'
                                        className='d-flex'
                                    >
                                        <span> User Status:</span>
                                        <select
                                            className='form-select mx-2'
                                            name='userStatus'
                                            value={
                                                selectedUserDetails.userStatus
                                            }
                                            onChange={
                                                handleSelectedUserDataChange
                                            }
                                        >
                                            <option value='PENDING'>
                                                PENDING
                                            </option>
                                            <option value='APPROVED'>
                                                APPROVED
                                            </option>
                                            <option value='REJECTED'>
                                                REJECTED
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
                                <Button
                                    type='submit'
                                    className='btn btn-primary'
                                >
                                    Save
                                </Button>
                            </Modal.Footer>
                        </form>
                    </Modal>
                )}
            </div>
        </div>
    );
};

export default Admin;
