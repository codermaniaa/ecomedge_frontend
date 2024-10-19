import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useCart } from "react-use-cart";

//internal import

import Price from "@component/common/Price";
import Stock from "@component/common/Stock";
import { notifyError } from "@utils/toast";
import useAddToCart from "@hooks/useAddToCart";
import Discount from "@component/common/Discount";
import useUtilsFunction from "@hooks/useUtilsFunction";
import ProductModal from "@component/modal/ProductModal";
import useGetSetting from "@hooks/useGetSetting";
import Link from "next/link";
import { useContext } from "react";
import { SidebarContext } from "@context/SidebarContext";
import { IoAdd, IoBagAddSharp, IoRemove } from "react-icons/io5";

const ProductCard = ({ product, attributes }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const { askForPriceProduct, useAskForPriceProduct } =
    useContext(SidebarContext);
  const { items, addItem, updateItemQuantity, inCart } = useCart();
  const { handleIncreaseQuantity } = useAddToCart();

  const { globalSetting } = useGetSetting();
  const { showingTranslateValue, getNumber } = useUtilsFunction();

  const currency = globalSetting?.default_currency || "₹";

  const [discount, setDiscount] = useState();
  useEffect(() => {
    const price = getNumber(product?.prices?.price);
    const originalPrice = getNumber(product?.prices?.salePrice);
    const discountPercentage = getNumber(
      ((price - originalPrice) / price) * 100
    );

    setDiscount(discountPercentage);
  }, [product?.prices?.price, product?.prices?.salePrice]);

  const handleAddItem = (p) => {
    if (p.stock === 0) return notifyError("Insufficient stock!");
    // if (p?.variants?.length > 0) {
    //   setModalOpen(!modalOpen);
    //   return;
    // }
    console.log("handleAddItem",p);
    const { slug, variants, categories, description, ...updatedProduct } =
      product;
    const newItem = {
      ...updatedProduct,
      // title: showingTranslateValue(p?.title),
      id: p._id?p._id:p.productId,
      variant: p.prices,
      price: p.prices.price,
      originalPrice: product.prices?.originalPrice,
      image: p.image[0]?.medialink,
      slug: p.slug,
    };
    addItem(newItem);
  };

  const handleModalOpen = (event, id) => {
    setModalOpen(event);
  };
 console.log("ProductCard..",product);
  return (
    <>
      {modalOpen && (
        <ProductModal
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          product={product}
          currency={currency}
          attributes={attributes}
        />
      )}

      <div className="group box-border overflow-hidden flex rounded-md shadow-sm pe-0 flex-col items-center bg-white ">
        <div
          onClick={() => handleModalOpen(!modalOpen, product._id)}
          className=" flex flex-col justify-center w-full cursor-pointer"
        >
          <div className="left-3">
            <Stock product={product} stock={product.stock} card />
          </div>
          {/* <Discount product={product} />           */}
          <div className="flex justify-end">
            {product?.prices?.salePrice > 1 ? (
              <span className=" text-dark text-xs bg-orange-500 text-white py-1 px-2 rounded font-medium right-0 top-0">
                {discount}% off
              </span>
            ) : (
              ""
            )}
          </div>

          {product?.image[0] ? (
            <img
              src={product.image[0].medialink}
              style={{ Width: "210px", height: "210px" }}
              alt="product"
              // className="object-contain  transition duration-150 ease-linear transform group-hover:scale-105"
            />
          ) : (
            <img
              src="https://res.cloudinary.com/ahossain/image/upload/v1655097002/placeholder_kvepfp.png"
              width={210}
              height={210}
              alt="product"
              // className="object-cover transition duration-150 ease-linear transform group-hover:scale-105"
            />
          )}
        </div>
        <dev className="left-8"></dev>
        <div className="w-full px-3 lg:px-4 pb-4 overflow-hidden  ">
          <div className=" mb-1">
            {/* <span className="text-gray-400 font-medium text-xs d-block mb-1">
              {product.unit}
            </span> */}
            <h2 className="text-heading truncate mb-0 block text-sm font-medium text-gray-600">
              <span className="line-clamp-2">{product?.title}</span>
            </h2>
          </div>

          <div className="flex justify-between items-center text-heading text-sm sm:text-base space-s-2 md:text-base lg:text-xl">
            {product?.askForPrice === true ? (
              <Link href={`/askforprice?id=${product._id}`}>
                <button
                  onClick={() => useAskForPriceProduct(product)}
                  className="w-full bg-gray-800 rounded h-7 text-white text-[12px] cursor-pointer hover:bg-gray-600 "
                >
                  Ask for price
                </button>
              </Link>
            ) : (
              <Price
                card
                product={product}
                currency={currency}
                price={
                  product?.isCombination
                    ? product?.variants[0]?.price
                    : product?.prices?.price
                }
                originalPrice={
                  product?.isCombination
                    ? product?.variants[0]?.originalPrice
                    : product?.prices?.salePrice
                }
              />
            )}

            {inCart(product._id) ? (
              <div>
                {items.map(
                  (item) =>
                    item.id === product._id && (
                      <div
                        key={item.id}
                        style={{ width: "max-content" }}
                        className="h-9 w-auto flex flex-wrap items-center justify-evenly py-1 px-2 bg-gray-800 text-white rounded "
                      >
                        <button
                          onClick={() =>
                            updateItemQuantity(item.id, item.quantity - 1)
                          }
                        >
                          <span className="text-dark text-base">
                            <IoRemove />
                          </span>
                        </button>
                        <p className="text-sm text-dark px-1 font-serif font-semibold">
                          {item.quantity}
                        </p>
                        <button
                          onClick={() =>
                            item?.variants?.length > 0
                              ? handleAddItem(item)
                              : handleIncreaseQuantity(item)
                          }
                        >
                          <span className="text-dark text-base">
                            <IoAdd />
                          </span>
                        </button>
                      </div>
                    )
                )}{" "}
              </div>
            ) : product?.askForPrice === true ? (
              ""
            ) : (
              <button
                onClick={() => handleAddItem(product)}
                aria-label="cart"
                className="h-9 w-9 flex items-center justify-center border border-gray-200 rounded text-gray-800 hover:border-gray-800 hover:bg-gray-800 hover:text-white transition-all"
              >
                {" "}
                <span className="text-xl">
                  <IoBagAddSharp className="gray-800" />
                </span>{" "}
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default dynamic(() => Promise.resolve(ProductCard), { ssr: false });
