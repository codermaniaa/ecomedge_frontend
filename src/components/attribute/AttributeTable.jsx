import { TableBody, TableCell, TableRow } from "@windmill/react-ui";
import React from "react";
import { FiEdit } from "react-icons/fi";
import { Link } from "react-router-dom";
//internal import
import useToggleDrawer from "@/hooks/useToggleDrawer";
import CheckBox from "@/components/form/CheckBox";
import Tooltip from "@/components/tooltip/Tooltip";
import MainDrawer from "@/components/drawer/MainDrawer";
import DeleteModal from "@/components/modal/DeleteModal";
import { showingTranslateValue } from "@/utils/translate";
import ShowHideButton from "@/components/table/ShowHideButton";
import EditDeleteButton from "@/components/table/EditDeleteButton";
import AttributeDrawer from "@/components/drawer/AttributeDrawer";
import useAsync from "@/hooks/useAsync";
import AttributeServices from "@/services/AttributeServices";

const AttributeTable = ({ lang, isCheck, setIsCheck, attributes }) => {
  const { title, serviceId, handleModalOpen, handleUpdate } = useToggleDrawer();
  const { data, loading, error } = useAsync(() =>
    AttributeServices.getAllAttributes({
      type: "attribute",
      option: "Dropdown",
      option1: "Radio",
    })
  );


  const handleClick = (e) => {
    const { id, checked } = e.target;
    setIsCheck([...isCheck, id]);
    if (!checked) {
      setIsCheck(isCheck.filter((item) => item !== id));
    }
  };


  return (
    <>
      {isCheck.length < 1 && <DeleteModal id={serviceId} title={title} />}

      {isCheck.length < 2 && (
        <MainDrawer>
          <AttributeDrawer id={serviceId} />
        </MainDrawer>
      )}

      <TableBody>
        {data?.attributes?.map((attribute) => (
          <TableRow key={attribute._id}>
            <TableCell>
              <CheckBox
                type="checkbox"
                name="attribute"
                id={attribute._id}
                handleClick={handleClick}
                isChecked={isCheck?.includes(attribute._id)}
              />
            </TableCell>

            <TableCell className="font-semibold uppercase text-xs">
              {attribute?._id?.substring(20, 24)}
            </TableCell>

            <TableCell className="font-medium text-sm">
              {attribute.title}
            </TableCell>

            <TableCell className="font-medium text-sm">
              {attribute.name}
            </TableCell>

            <TableCell className="font-medium text-sm">
              {attribute.option}
            </TableCell>

            <TableCell className="text-center">
              <ShowHideButton id={attribute._id} status={attribute.status} />
            </TableCell>

            {/* value */}

            {/* <TableCell className="flex justify-center">
              <Link
                to={`/admin/attributes/${attribute._id}`}
                className="p-2 cursor-pointer text-gray-400 hover:text-green-600 focus:outline-none"
              >
                <Tooltip
                  id="edit values"
                  Icon={FiEdit}
                  title="Edit Values"
                  bgColor="#10B981"
                />
              </Link>
            </TableCell> */}

            <TableCell>
              <EditDeleteButton
                id={attribute._id}
                isCheck={isCheck}
                setIsCheck={setIsCheck}
                handleUpdate={handleUpdate}
                handleModalOpen={handleModalOpen}
                title={showingTranslateValue(attribute.title, lang)}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default AttributeTable;
