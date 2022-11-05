import React, { useEffect, useState } from "react";
import { fetchCreatedTickets, updateTicket } from "../../common/apis/tickets";
import { fetchUsers, updateUser } from "./apis/users";
import Sidebar from "../../common/components/SideBar";
import StatusCards from "../../common/components/StatusCards";
import Loader from "../../common/components/Loader";
import "./admin.css";
import TicketsTable from "../../common/components/TicketsTable";
import UsersTable from "./components/usersTable";
import UserModal from "./components/userModal";
import TicketModal from "../../common/components/TicketModal";

const Admin = () => {
    const [usersList, setUsersList] = useState([]);
    const [userModalVisible, setUserModalVisible] = useState(false);
    const [selectedUserDetails, setSelectedUserDetails] = useState({});
    const [updateUserError, setUpdateUserError] = useState("");

    const [ticketsList, setTicketsList] = useState([]);
    const [ticketModalVisible, setTicketModalVisible] = useState(false);
    const [selectedTicketDetails, setSelectedTicketDetails] = useState({});
    const [updateTicketError, setUpdateTicketError] = useState("");

    const [showLoader, setShowLoader] = useState(false);
    const userName = localStorage.getItem("name") || "";

    const hideUserModal = () => {
        setUserModalVisible(false);
        setSelectedUserDetails({});
        setUpdateUserError("");
    };

    const hideTicketModal = () => {
        setTicketModalVisible(false);
        setSelectedTicketDetails({});
        setUpdateTicketError("");
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

    const handleSelectedTicketDataChange = e => {
        const currentData = { ...selectedTicketDetails };
        if (e.target.name === "title") {
            currentData.title = e.target.value;
        } else if (e.target.name === "description") {
            currentData.description = e.target.value;
        } else if (e.target.name === "assignee") {
            currentData.assignee = e.target.value;
        } else if (e.target.name === "ticketPriority") {
            currentData.ticketPriority = e.target.value;
        } else {
            currentData.status = e.target.value;
        }

        setSelectedTicketDetails(currentData);
    };

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

    const handleTicketUpdate = e => {
        e.preventDefault();

        const data = {
            title: selectedTicketDetails.title,
            description: selectedTicketDetails.description,
            ticketPriority: selectedTicketDetails.ticketPriority,
            status: selectedTicketDetails.status,
            assignee: selectedTicketDetails.assignee,
        };

        try {
            updateTicket(data, selectedTicketDetails.id)
                .then(res => {
                    const { data, status } = res;
                    if (status === 200) {
                        hideTicketModal();
                        getTickets();
                        // hide the ticket modal
                        // clear the selected ticket
                        // refresh the data of tickets to fetrch updated tickets
                    }
                })
                .catch(err => {
                    console.log(err);
                    setUpdateTicketError(err.message);
                    // show error in the modal
                });
        } catch (err) {
            setUpdateTicketError(err.message);
            console.log(err);
            // show error in the modal
        }
    };

    useEffect(() => {
        getUsers();
        getTickets();
    }, []);

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
        setShowLoader(true);
        try {
            fetchCreatedTickets()
                .then(result => {
                    const { data, status } = result;
                    if (status === 200) {
                        setTicketsList(data);
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
                        <TicketsTable
                            ticketsList={ticketsList}
                            setTicketModalVisible={setTicketModalVisible}
                            setSelectedTicketDetails={setSelectedTicketDetails}
                        />
                        <UsersTable
                            usersList={usersList}
                            setSelectedUserDetails={setSelectedUserDetails}
                            setUserModalVisible={setUserModalVisible}
                        />
                    </div>
                </div>
                <UserModal
                    userModalVisible={userModalVisible}
                    hideUserModal={hideUserModal}
                    handleUserUpdate={handleUserUpdate}
                    selectedUserDetails={selectedUserDetails}
                    handleSelectedUserDataChange={handleSelectedUserDataChange}
                    updateUserError={updateUserError}
                />

                <TicketModal
                    ticketModalVisible={ticketModalVisible}
                    hideTicketModal={hideTicketModal}
                    selectedTicketDetails={selectedTicketDetails}
                    handleSelectedTicketDataChange={
                        handleSelectedTicketDataChange
                    }
                    handleTicketUpdate={handleTicketUpdate}
                    updateTicketError={updateTicketError}
                />
            </div>
        </div>
    );
};

export default Admin;
