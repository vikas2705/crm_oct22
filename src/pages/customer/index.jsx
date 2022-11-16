import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import {
    createTicket,
    fetchCreatedTickets,
    updateTicket,
} from "../../common/apis/tickets";
import Loader from "../../common/components/Loader";
import SidebarNew from "../../common/components/SideBarNew";
import StatusCards from "../../common/components/StatusCards";
import TicketModal from "../../common/components/TicketModal";
import TicketsTable from "../../common/components/TicketsTable";
import { calculateTicketsCount } from "../../common/utils/tickets";

const Customer = () => {
    const [ticketsList, setTicketsList] = useState([]);
    const [updateTicketModalVisible, setUpdateTicketModalVisible] =
        useState(false);
    const [createTicketModalVisible, setCreateTicketModalVisible] =
        useState(false);
    const [selectedTicketDetails, setSelectedTicketDetails] = useState({});
    const [showLoader, setShowLoader] = useState(false);
    const [ticketErrorMessage, setTicketErrorMessage] = useState("");
    const [ticketsCount, setTicketsCount] = useState({
        open: 0,
        progress: 0,
        closed: 0,
        blocked: 0,
    });

    useEffect(() => {
        getUserTickets();
    }, []);

    const getUserTickets = () => {
        setShowLoader(true);
        try {
            fetchCreatedTickets()
                .then(res => {
                    const { status, data } = res;
                    if (status === 200) {
                        setTicketsList(data);
                        const ticketsCount = calculateTicketsCount(data);
                        setTicketsCount(ticketsCount);
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

    const hideUpdateTicketModal = () => {
        setUpdateTicketModalVisible(false);
        setSelectedTicketDetails({});
        setTicketErrorMessage("");
    };

    const hideCreateTicketModal = () => {
        setCreateTicketModalVisible(false);
        setSelectedTicketDetails({});
        setTicketErrorMessage("");
    };

    const handleSelectedTicketDataChange = e => {
        e.preventDefault();
        const updatedTicket = { ...selectedTicketDetails };

        if (e.target.name === "title") {
            updatedTicket.title = e.target.value;
        } else if (e.target.name === "description") {
            updatedTicket.description = e.target.value;
        } else {
            updatedTicket.status = e.target.value;
        }

        setSelectedTicketDetails(updatedTicket);
    };

    const saveTicketUpdate = e => {
        e.preventDefault();
        setShowLoader(true);
        try {
            updateTicket(selectedTicketDetails, selectedTicketDetails.id)
                .then(res => {
                    const { status } = res;
                    if (status === 200) {
                        hideUpdateTicketModal();
                        getUserTickets();
                    }
                })
                .catch(err => {
                    console.log(err.message);
                    setShowLoader(false);
                    setTicketErrorMessage(err.message);
                });
        } catch (err) {
            console.log(err.message);
            setShowLoader(false);
            setTicketErrorMessage(err.message);
        }
    };

    const saveTicketCreate = e => {
        e.preventDefault();
        const { title, description } = selectedTicketDetails;

        const data = {
            title,
            description,
        };

        setShowLoader(true);
        try {
            createTicket(data)
                .then(res => {
                    const { status } = res;
                    console.log(res);
                    if (status === 201) {
                        hideCreateTicketModal();
                        getUserTickets();
                    }
                })
                .catch(err => {
                    console.log(err);
                    setTicketErrorMessage(
                        err?.response?.data?.message || err.message
                    );
                    setShowLoader(false);
                });
        } catch (err) {
            console.log(err);
            setShowLoader(false);
            setTicketErrorMessage(err?.response?.data?.message || err.message);
        }
    };

    if (showLoader) {
        return <Loader />;
    }

    return (
        <div className='container-fluid noPadding'>
            <div className='row bg-light vh-100'>
                <div className='col-1'>
                    <SidebarNew home={"/customer"} />
                </div>
                <div className='col-11 vh-100 bg-gray-200 overflow-auto p-4'>
                    <div className='customer-main'>
                        <h2 className='text-primary'>
                            Welcome, {localStorage.getItem("name")}
                        </h2>
                        <h4 className='text-secondary'>
                            Take a quick look at the tickets created by you
                        </h4>
                        <StatusCards
                            ticketsCount={ticketsCount}
                            totalTicketsCount={ticketsList.length}
                        />
                        <TicketsTable
                            ticketsList={ticketsList}
                            setTicketModalVisible={setUpdateTicketModalVisible}
                            setSelectedTicketDetails={setSelectedTicketDetails}
                        />
                        <div className='px-3'>
                            <Button
                                className='w-100 btn btn-primary'
                                onClick={() => {
                                    setCreateTicketModalVisible(true);
                                }}
                            >
                                Raise a New Ticket
                            </Button>
                        </div>

                        {updateTicketModalVisible && (
                            <TicketModal
                                ticketModalVisible={updateTicketModalVisible}
                                hideTicketModal={hideUpdateTicketModal}
                                selectedTicketDetails={selectedTicketDetails}
                                handleSelectedTicketDataChange={
                                    handleSelectedTicketDataChange
                                }
                                handleTicketUpdate={saveTicketUpdate}
                                isUserTypeCustomer
                                updateTicketError={ticketErrorMessage}
                            />
                        )}

                        {createTicketModalVisible && (
                            <TicketModal
                                ticketModalVisible={createTicketModalVisible}
                                hideTicketModal={hideCreateTicketModal}
                                handleSelectedTicketDataChange={
                                    handleSelectedTicketDataChange
                                }
                                handleTicketUpdate={saveTicketCreate}
                                updateTicketError={ticketErrorMessage}
                                isUserTypeCustomer
                                isCreateTicketMode
                                selectedTicketDetails={selectedTicketDetails}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Customer;
