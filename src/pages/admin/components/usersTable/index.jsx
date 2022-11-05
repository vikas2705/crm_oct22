import React from "react";
import MaterialTable from "@material-table/core";
import { ExportCsv, ExportPdf } from "@material-table/exporters";

const UsersTable = props => {
    const { usersList, setSelectedUserDetails, setUserModalVisible } = props;

    return (
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
                                ExportPdf(cols, datas, "User Records CRM"),
                        },
                        {
                            label: "Export CSV",
                            exportFunc: (cols, datas) =>
                                ExportCsv(cols, datas, "User Records CRM"),
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
    );
};

export default UsersTable;
