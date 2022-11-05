import React, { useEffect, useState } from "react";
import { fetchCreatedTickets } from "../../common/apis/tickets";
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

    const [showLoader, setShowLoader] = useState(false);
    const userName = localStorage.getItem("name") || "";

    const hideUserModal = () => {
        setUserModalVisible(false);
        setSelectedUserDetails({});
        setUpdateUserError("");
    };

    const hideTicketModal = () => {
        setTicketModalVisible(false);
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
                />
            </div>
        </div>
    );
};

export default Admin;
