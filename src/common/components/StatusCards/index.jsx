import React from "react";
import "./statusCards.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

const StatusCards = props => {
    const { ticketsCount, totalTicketsCount } = props;

    const statusData = [
        {
            statusName: "Open",
            count: ticketsCount.open,
            color: "info",
            pathColor: "darkBlue",
            icon: <i className='bi bi-pencil text-primary mx-2'></i>,
        },
        {
            statusName: "Progress",
            count: ticketsCount.progress,
            color: "warning",
            pathColor: "darkgoldenrod",
            icon: <i className='bi bi-lightning-charge text-warning mx-2'></i>,
        },
        {
            statusName: "Closed",
            count: ticketsCount.closed,
            color: "success",
            pathColor: "darkolivegreen",
            icon: <i className='bi bi-check2-circle text-success mx-2'></i>,
        },
        {
            statusName: "Blocked",
            count: ticketsCount.blocked,
            color: "secondary",
            pathColor: "black",
            icon: <i className='bi bi-slash-circle text-secondary mx-2'></i>,
        },
    ];

    return (
        <div className='status-cards d-flex justify-content-between'>
            {statusData.map(statusCard => {
                const percentateValue = Math.floor(
                    (statusCard.count / totalTicketsCount) * 100
                );
                return (
                    <div
                        key={statusCard.statusName}
                        className={`status-card bg-${statusCard.color} card cardItem shadow text-dark bg-opacity-50 borders-b`}
                    >
                        <div className='status-card-header d-flex justify-content-center align-items-center'>
                            {statusCard.icon}
                            <h4>{statusCard.statusName}</h4>
                        </div>
                        <div className='status-card-footer d-flex justify-content-center'>
                            <h2 className='px-2'>{statusCard.count}</h2>
                            <div style={{ width: 40, height: 40 }}>
                                <CircularProgressbar
                                    value={percentateValue}
                                    styles={buildStyles({
                                        pathColor: statusCard.pathColor,
                                        trailColor: "#80808036",
                                    })}
                                />
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default StatusCards;
