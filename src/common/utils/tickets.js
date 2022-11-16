import { CARD_STATUS } from "../constants/cardStatus";

export const calculateTicketsCount = (ticketsList = []) => {
    const ticketsCount = {
        open: 0,
        progress: 0,
        closed: 0,
        blocked: 0,
    };

    ticketsList.forEach(ticket => {
        const { status = "" } = ticket;

        if (status === CARD_STATUS.OPEN) {
            ticketsCount.open++;
        } else if (status === CARD_STATUS.CLOSED) {
            ticketsCount.closed++;
        } else if (status === CARD_STATUS.BLOCKED) {
            ticketsCount.blocked++;
        } else {
            ticketsCount.progress++;
        }
    });
    return ticketsCount;
};
