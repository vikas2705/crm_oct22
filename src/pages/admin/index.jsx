import React, { useEffect, useState } from "react";
import { fetchCreatedTickets } from "../../common/apis/tickets";
import { fetchUsers } from "../../common/apis/users";
import Sidebar from "../../common/components/SideBar";
import StatusCards from "../../common/components/StatusCards";
import MaterialTable from "@material-table/core";
import { ExportCsv, ExportPdf } from "@material-table/exporters";
import { Button, Modal } from "react-bootstrap";

import "./admin.css";

const Admin = () => {
    const [ticketsList, setTicketsList] = useState([]);
    const [usersList, setUsersList] = useState([]);
    const [userModalVisible, setUserModalVisible] = useState(false);
    const [selectedUserDetails, setSelectedUserDetails] = useState({});
    const userName = localStorage.getItem("name") || "";

    const hideUserModal = () => {
        setUserModalVisible(false);
    };

    useEffect(() => {
        getUsers();
        getTickets();
    }, []);

    const getUsers = () => {
        try {
            fetchUsers()
                .then(result => {
                    const { data, status } = result;
                    if (status === 200) {
                        console.log(data);
                        setUsersList(data);
                    }
                })
                .catch(err => {
                    console.log(err.message);
                });
        } catch (err) {
            console.log(err.message);
        }
    };

    const getTickets = () => {
        try {
            fetchCreatedTickets()
                .then(result => {
                    const { data, status } = result;
                    if (status === 200) {
                        console.log(data);
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

                    <Modal.Body>
                        <p className='m-2'>
                            UserId: {selectedUserDetails.userId}
                        </p>

                        <div className='form-container my-4 mx-2'>
                            <label for='name' className='d-flex'>
                                <span>Name:</span>
                                <input
                                    type='text'
                                    id='name'
                                    className='form-control  mx-2'
                                    value={selectedUserDetails.name}
                                ></input>
                            </label>
                        </div>

                        <div className='form-container my-4 mx-2'>
                            <label for='email' className='d-flex'>
                                <span> Email:</span>
                                <input
                                    type='email'
                                    id='email'
                                    className='form-control  mx-2'
                                    value={selectedUserDetails.email}
                                ></input>
                            </label>
                        </div>

                        <div className='form-container my-4 mx-2'>
                            <label for='userType' className='d-flex'>
                                <span> User Type:</span>
                                <input
                                    type='text'
                                    id='userType'
                                    className='form-control  mx-2'
                                    disabled
                                    value={selectedUserDetails.userTypes}
                                ></input>
                            </label>
                        </div>

                        <div className='form-container my-4 mx-2'>
                            <label for='userStatus' className='d-flex'>
                                <span> User Status:</span>
                                <select
                                    className='form-select mx-2'
                                    value={selectedUserDetails.userStatus}
                                >
                                    <option value='PENDING'>PENDING</option>
                                    <option value='APPROVED'>APPROVED</option>
                                    <option value='REJECTED'>REJECTED</option>
                                </select>
                            </label>
                        </div>
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
                </Modal>
            </div>
        </div>
    );
};

export default Admin;
