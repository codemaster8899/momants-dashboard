import { formatDateTime } from "../../../../utils/formatDatetime";
import { Ticket } from "../types";

export const TicketDisplay = ({
  ticket,
  className,
}: {
  ticket: Ticket;
  className?: string;
}) => {
  return (
    <div className={`ml-6 mb-2 p-2 rounded-lg ${className}`}>
      <p className="momants-light-extrasmall-black">
        {ticket.ticket_name || "N/A"}

        {ticket.ticket_option_name ? (
          <span className="momants-light-extrasmall-black">
            {" "}
            - {ticket.ticket_option_name}
          </span>
        ) : null}
      </p>

      {/* case where both date and time are known */}
      {ticket.start_date && ticket.start_time && (
        <p className="momants-light-extrasmall-gray">
          {formatDateTime(`${ticket.start_date}T${ticket.start_time}`)}
        </p>
      )}

      {/* case where date is known but time is not */}
      {ticket.start_date && !ticket.start_time && (
        <p className="momants-light-extrasmall-gray">
          {formatDateTime(`${ticket.start_date}`)}
        </p>
      )}

      {/* case where time is known but date is not */}
      {ticket.start_time && !ticket.start_date && (
        <p className="momants-light-extrasmall-gray">{ticket.start_time}</p>
      )}

      <p className="momants-light-extrasmall-gray">
        Quantity: {ticket.quantity}
      </p>
    </div>
  );
};
