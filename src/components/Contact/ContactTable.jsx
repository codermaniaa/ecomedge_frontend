import { TableBody, TableCell, Input, TableRow } from "@windmill/react-ui";
//internal import

import useToggleDrawer from "@/hooks/useToggleDrawer";

import SelectContactStatus from "../form/SelectContactStatus";

//internal import

const ContactTable = ({
  contactInfo,
  isCheck,
  setIsCheck,
  currency,
  lang,
  handleUpdate,
  getTaxDetails,
}) => {
  const { title, serviceId, handleModalOpen } = useToggleDrawer();

  const handleClick = (e) => {
    const { id, checked } = e.target;
    // console.log("id", id, checked);

    setIsCheck([...isCheck, id]);
    if (!checked) {
      setIsCheck(isCheck.filter((item) => item !== id));
    }
  };
  return (
    <>
      {/* {isCheck?.length < 1 && (
        <DeleteModal id={serviceId} title={title} fetchData={getTaxDetails} />
      )} */}

      <TableBody>
        {contactInfo?.map((item, i) => (
          <TableRow key={i + 1}>
            <TableCell>
              <span className="text-sm">{item?.name}</span>
            </TableCell>
            <TableCell>
              <span className="text-sm">{item?.email}</span>
            </TableCell>
            <TableCell>
              <span className="text-sm">{item?.subject}</span>
            </TableCell>
            <TableCell>
              <span className="text-sm">{item?.message}</span>
            </TableCell>

            <TableCell>
              <SelectContactStatus orderStatus={item?.status} id={item?._id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default ContactTable;
