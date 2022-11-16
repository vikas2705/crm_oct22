import React from "react";
import MaterialTable from "@material-table/core";
import { ExportCsv, ExportPdf } from "@material-table/exporters";
import { CARD_STATUS } from "../../constants/cardStatus";

const TicketsTable = props => {
    const { ticketsList, setTicketModalVisible, setSelectedTicketDetails } =
        props;

    return (
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
                            OPEN: CARD_STATUS.OPEN,
                            IN_PROGRESS: CARD_STATUS.IN_PROGRESS,
                            BLOCKED: CARD_STATUS.CARD_STATUS,
                            CLOSED: CARD_STATUS.CLOSED,
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
                                ExportPdf(cols, datas, "Ticket Records CRM"),
                        },
                        {
                            label: "Export CSV",
                            exportFunc: (cols, datas) =>
                                ExportCsv(cols, datas, "Ticket Records CRM"),
                        },
                    ],
                }}
                title={"Ticket records"}
                onRowClick={(_event, rowData) => {
                    setSelectedTicketDetails(rowData);
                    setTicketModalVisible(true);
                }}
            />
        </div>
    );
};

export default TicketsTable;
