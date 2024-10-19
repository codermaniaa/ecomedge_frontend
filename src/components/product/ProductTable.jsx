import {
  Avatar,
  Badge,
  TableBody,
  TableCell,
  TableRow,
} from "@windmill/react-ui";
import { t } from "i18next";
import { FiZoomIn } from "react-icons/fi";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
//internal import
import MainDrawer from "@/components/drawer/MainDrawer";
import ProductDrawer from "@/components/drawer/ProductDrawer";
import CheckBox from "@/components/form/CheckBox";
import DeleteModal from "@/components/modal/DeleteModal";
import EditDeleteButton from "@/components/table/EditDeleteButton";
import ShowHideButton from "@/components/table/ShowHideButton";
import Tooltip from "@/components/tooltip/Tooltip";
import useToggleDrawer from "@/hooks/useToggleDrawer";
import { showingTranslateValue } from "@/utils/translate";

//internal import

const ProductTable = ({ products, isCheck, setIsCheck, currency, lang }) => {
  const { title, serviceId, handleModalOpen, handleUpdate } = useToggleDrawer();
  const { editableProduct, setEditableProduct } = useState({})

  // const handleProductUpdate = (id)=>{
  //   handleUpdate(id);
  //   const editableProduct = products.filter(cur_product => cur_product._id == id)[0];
  //   console.log("editableProduct is.........##########@@@@@@ ",editableProduct);
  //   console.log(isCheck);
  //   setEditableProduct(editableProduct);
  //   <ProductDrawer update={true} editableProduct={editableProduct}/>
  // }

  const handleClick = (e) => {
    const { id, checked } = e.target;
    setIsCheck([...isCheck, id]);
    if (!checked) {
      setIsCheck(isCheck.filter((item) => item !== id));
    }
  };



  return (
    <>
      {isCheck?.length < 1 && <DeleteModal id={serviceId} title={title} />}

      {isCheck?.length < 2 && (
        <MainDrawer>
          <ProductDrawer currency={currency} id={serviceId} editableProduct={editableProduct} />
        </MainDrawer>
      )}

      <TableBody>
        {products?.map((product, i) => (
          <TableRow key={i + 1}>
            <TableCell>
              <CheckBox
                type="checkbox"
                name={product?.title?.en}
                id={product._id}
                handleClick={handleClick}
                isChecked={isCheck?.includes(product._id)}
              />
            </TableCell>
            <TableCell>
              <div className="flex items-center">
                {product?.image && product?.image[0]?.medialink ? (
                  <Avatar
                    className="hidden p-1 mr-2 md:block bg-gray-50 shadow-none"
                    src={product?.image[0].medialink}
                    alt="product"
                  />
                ) : (
                  <Avatar
                    src={`https://res.cloudinary.com/ahossain/image/upload/v1655097002/placeholder_kvepfp.png`}
                    alt="product"
                  />
                )}
                <div style={{ maxWidth: '200px' }}>
                  <h2  className="truncate text-sm font-medium">{product?.title}</h2>
                </div>
              </div>
            </TableCell>
         
            <TableCell>
              <span className="text-sm">
                {product?.category?.name}
                {/* {showingTranslateValue(product?.category?.name, lang)} */}
              </span>
            </TableCell>
            <TableCell>
              {product?.askForPrice === true ? (
                <>
                  <Badge className="text-[#4c8bf5]">Ask for price</Badge>
                </>
              ) : (
                <span className="text-sm font-semibold">
                  {currency}
                  {/* {product?.salePrice} */}
                  {product?.variants.length > 0
                    ? product?.variants[0]?.originalPrice
                    : product?.prices?.price}
                </span>
              )}
            </TableCell>
            <TableCell>
              {product?.askForPrice === true ? (
                <>
                  <Badge className="text-[#4c8bf5]">Ask for price</Badge>
                </>
              ) : (
                <span className="text-sm font-semibold">
                  {currency}
                  {/* {product?.salePrice} */}
                  {product?.variants.length > 0
                    ? product?.variants[0]?.price
                    : product?.prices?.salePrice}
                </span>
              )}
            </TableCell>
            <TableCell>
              {product?.fewLeft === true ? (
                <>
                  {/* <span className="text-xs text-red-500">Few Left</span> */}
                  <Badge type="danger">Few Left</Badge>
                </>
              ) : (
                // <span className="text-sm">{product?.variants[0]?.quantity !== 0 ? <span className="text-sm">{product?.variants[0]?.quantity}</span> : 
                <span className="text-sm">{product.stock}</span>
                // }</span>
              )}
            </TableCell>
            <TableCell>
              {product.stock > 0 || product.stock == null ? (
                <Badge type="success">{t("Selling")}</Badge>
              ) : product.stock !== null && product.stock == 0 ? (
                <Badge type="danger">{t("SoldOut")}</Badge>
              ) : t("SoldOut")}
            </TableCell>
            <TableCell>{product?.minimumOrderOfQuantity}</TableCell>{" "}
            <TableCell>{product?.warrantyPeriods?.duration}</TableCell>
            {/* <TableCell>
              <Link
                to={`/product/${product._id}`}
                className="flex justify-center text-gray-400 hover:text-green-600"
              >
                <Tooltip
                  id="view"
                  Icon={FiZoomIn}
                  title={t("DetailsTbl")}
                  bgColor="#10B981"
                />
              </Link>
            </TableCell> */}
            <TableCell className="text-center">
              <ShowHideButton id={product._id} status={product.status} />
              {/* {product.status} */}
            </TableCell>
            <TableCell>
              <EditDeleteButton
                id={product._id}
                product={product}
                isCheck={isCheck}
                handleUpdate={handleUpdate}
                handleModalOpen={handleModalOpen}
                title={showingTranslateValue(product?.title, lang)}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default ProductTable;
