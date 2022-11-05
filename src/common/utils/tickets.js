export const calculateTicketsCount = (ticketsList = []) => {
    const ticketsCount = {
        open: 0,
        progress: 0,
        closed: 0,
        blocked: 0,
    };

    ticketsList.forEach(ticket => {
        if (ticket.status === "OPEN") {
            ticketsCount.open++;
        } else if (ticket.status === "CLOSED") {
            ticketsCount.closed++;
        } else if (ticket.status === "BLOCKED") {
            ticketsCount.blocked++;
        } else {
            ticketsCount.progress++;
        }
    });
    return ticketsCount;
};
