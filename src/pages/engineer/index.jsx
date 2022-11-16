import React, { useState, useEffect } from "react";
import SidebarNew from "../../common/components/SideBarNew";
import { fetchCreatedTickets, updateTicket } from "../../common/apis/tickets";
import { calculateTicketsCount } from "../../common/utils/tickets";
import StatusCards from "../../common/components/StatusCards";
import TicketsTable from "../../common/components/TicketsTable";
import TicketModal from "../../common/components/TicketModal";
import Loader from "../../common/components/Loader";

const Engineer = () => {
    const [ticketsList, setTicketsList] = useState([]);
    const [ticketModalVisible, setTicketModalVisible] = useState(false);
    const [selectedTicketDetails, setSelectedTicketDetails] = useState({});
    const [showLoader, setShowLoader] = useState(false);
    const [ticketsCount, setTicketsCount] = useState({
        open: 0,
        progress: 0,
        closed: 0,
        blocked: 0,
    });
    const [updateTicketError, setUpdateTicketError] = useState("");

    useEffect(() => {
        getTickets();
        // make the api call fn
    }, []);

    const getTickets = () => {
        setShowLoader(true);
        try {
            fetchCreatedTickets()
                .then(res => {
                    const { status, data } = res;
                    if (status === 200) {
                        setTicketsList(data);
                        // set the tickets in the state
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

    const hideTicketModal = () => {
        setTicketModalVisible(false);
        setSelectedTicketDetails({});
        setUpdateTicketError("");
    };

    // when any ticket data is changed
    const handleSelectedTicketDataChange = e => {
        e.preventDefault();
        const updatedTicket = { ...selectedTicketDetails };

        if (e.target.name === "title") {
            updatedTicket.title = e.target.value;
        } else if (e.target.name === "description") {
            updatedTicket.description = e.target.value;
        } else if (e.target.name === "assignee") {
            updatedTicket.assignee = e.target.value;
        } else if (e.target.name === "ticketPriority") {
            updatedTicket.ticketPriority = e.target.value;
        } else {
            updatedTicket.status = e.target.value;
        }

        setSelectedTicketDetails(updatedTicket);
    };

    // saving the data of a ticket
    const handleTicketUpdate = e => {
        e.preventDefault();
        setShowLoader(true);
        try {
            updateTicket(selectedTicketDetails, selectedTicketDetails.id)
                .then(res => {
                    const { status } = res;
                    if (status === 200) {
                        hideTicketModal();
                        getTickets();
                    }
                })
                .catch(err => {
                    setUpdateTicketError(
                        err?.response?.data?.message || err.message
                    );

                    setShowLoader(false);
                });
            // make an api call to save the selected data
            // if api call is success
            // hide the modal
            // clear the selected ticket details
            // make the get call again to fetch latest data
        } catch (err) {
            setUpdateTicketError(err?.response?.data?.message || err.message);
            setShowLoader(false);
        }
    };

    if (showLoader) {
        return <Loader />;
    }

    return (
        <div className='container-fluid noPadding'>
            <div className='row bg-light vh-100'>
                <div className='col-1'>
                    <SidebarNew home='/engineer' />
                </div>
                <div className='col-11 bg-gray-200 vh-100 overflow-auto p-4'>
                    <div>
                        <h2 className='text-primary'>
                            Welcome, {localStorage.getItem("name")}
                        </h2>
                        <h4 className='text-secondary'>
                            Take a quick looks at your engineer stats below.
                        </h4>
                    </div>

                    <StatusCards
                        ticketsCount={ticketsCount}
                        totalTicketsCount={ticketsList.length}
                    />

                    <TicketsTable
                        ticketsList={ticketsList}
                        setTicketModalVisible={setTicketModalVisible}
                        setSelectedTicketDetails={setSelectedTicketDetails}
                    />

                    {ticketModalVisible && (
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
                    )}
                </div>
            </div>
        </div>
    );
};

export default Engineer;
