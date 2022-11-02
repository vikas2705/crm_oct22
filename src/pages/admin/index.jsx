import React, { useEffect, useState } from "react";
import { fetchCreatedTickets } from "../../common/apis/tickets";
import { fetchUsers } from "../../common/apis/users";
import Sidebar from "../../common/components/SideBar";
import StatusCards from "../../common/components/StatusCards";
import MaterialTable from "@material-table/core";
import { ExportCsv, ExportPdf } from "@material-table/exporters";

import "./admin.css";

const Admin = () => {
    const [ticketsList, setTicketsList] = useState([]);
    const [usersList, setUsersList] = useState([]);
    const userName = localStorage.getItem("name") || "";

    useEffect(() => {
        // getUsers();
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

                    <div className='col-10 admin-main bg-gray-200'>
                        <div>
                            <h2 className='text-primary'>
                                Welcome, {userName}
                            </h2>

                            <h4 className='text-secondary'>
                                Take a quick look at your admin stats below
                            </h4>
                        </div>

                        <StatusCards />
                        {/**
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
                                                "TicketRecords"
                                            ),
                                    },
                                    {
                                        label: "Export CSV",
                                        exportFunc: (cols, datas) =>
                                            ExportCsv(
                                                cols,
                                                datas,
                                                "TicketRecords"
                                            ),
                                    },
                                ],
                            }}
                            title={"hello"}
                            onRowClick={() => {
                                console.log("hello");
                            }}
                        /> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Admin;
