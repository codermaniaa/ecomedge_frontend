import { Badge } from "@windmill/react-ui";

const Status = ({ status }) => {
  return (
    <>
      <span className="font-serif">
        {(status === "Pending" || status === "Inactive") && (
          <Badge type="warning">{status}</Badge>
        )}
        {status === "Waiting for Password Reset" && (
          <Badge type="warning">{status}</Badge>
        )}
        {status === "Delivered" && <Badge type="success">{status}</Badge>}
        {status === "Processing" && <Badge className="bg-blue-500 text-white">{status}</Badge>}
        {status === "Cancel" && <Badge type="danger">{status}</Badge>}
        {status === `POS-Completed` && (
          <Badge className="dark:bg-teal-900 bg-teal-100">{status}</Badge>
        )}
       
      </span>
    </>
  );
};

export default Status;
