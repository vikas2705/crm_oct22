import React from "react";
import MaterialTable from "@material-table/core";
import { ExportCsv, ExportPdf } from "@material-table/exporters";
import { USER_TYPES } from "../../../../common/constants/userTypes";
import { PROFILE_STATUS } from "../../../../common/constants/profileStatus";

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
                            PENDING: PROFILE_STATUS.PENDING,
                            APPROVED: PROFILE_STATUS.APPROVED,
                            REJECTED: PROFILE_STATUS.REJECTED,
                        },
                    },
                    {
                        title: "User Type",
                        field: "userTypes",
                        lookup: {
                            ADMIN: USER_TYPES.ADMIN,
                            CUSTOMER: USER_TYPES.CUSTOMER,
                            ENGINEER: USER_TYPES.ENGINEER,
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
