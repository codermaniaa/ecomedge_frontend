import {
  TableBody,
  TableCell,
  Input,
  Avatar,
  TableRow,
} from "@windmill/react-ui";
//internal import
import DeleteModal from "@/components/modal/DeleteModal";
import EditDeleteButton from "@/components/table/EditDeleteButton";
import useToggleDrawer from "@/hooks/useToggleDrawer";
import { showingTranslateValue } from "@/utils/translate";

const HomeTable = ({
  shippingList,
  isCheck,
  setIsCheck,
  currency,
  lang,
  handleUpdate,
  getHomeDetails,
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
      {isCheck?.length < 1 && (
        <DeleteModal id={serviceId} title={title} fetchData={getHomeDetails} />
      )}
      {/* 
      {isCheck?.length < 2 && (
        <MainDrawer>
          <TaxDrawer currency={currency} id={serviceId} />
        </MainDrawer>
      )} */}

      <TableBody>
        {shippingList?.map((tax, i) => (
          <TableRow key={i + 1}>
            {/* <TableCell>
              <CheckBox
                type="checkbox"
                name={tax?.taxName}
                id={tax.id}
                handleClick={handleClick}
                isChecked={isCheck?.includes(tax._id)}
              />
            </TableCell> */}

            <TableCell>
              <div className="flex items-center">
                {tax?.image ? (
                  <Avatar
                    className="hidden p-1 mr-2 md:block bg-gray-50 shadow-none"
                    src={tax?.image}
                    alt="product"
                  />
                ) : (
                  <Avatar
                    src={`https://res.cloudinary.com/ahossain/image/upload/v1655097002/placeholder_kvepfp.png`}
                    alt="product"
                  />
                )}
                <div>
                  <h2 className="text-sm font-medium">{tax?.heading}</h2>
                </div>
              </div>
            </TableCell>

            <TableCell>
              <span className="text-sm">{tax?.description}</span>
            </TableCell>
            <TableCell>
              <span className="text-sm">{tax?.ctaText}</span>
            </TableCell>
            <TableCell>
              <span className="text-sm">{tax?.ctaLink}</span>
            </TableCell>

            <TableCell>
              <EditDeleteButton
                id={tax._id}
                Product={tax}
                isCheck={isCheck}
                handleUpdate={handleUpdate}
                handleModalOpen={handleModalOpen}
                title={showingTranslateValue(tax?.shippingMethod, lang)}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default HomeTable;
