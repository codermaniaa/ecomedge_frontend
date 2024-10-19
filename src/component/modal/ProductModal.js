import useTranslation from "next-translate/useTranslation";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { FiMinus, FiPlus } from "react-icons/fi";

//internal import
import Price from "@component/common/Price";
import Stock from "@component/common/Stock";
import Tags from "@component/common/Tags";
import { notifyError } from "@utils/toast";
import useAddToCart from "@hooks/useAddToCart";
import MainModal from "@component/modal/MainModal";
import Discount from "@component/common/Discount";
import VariantList from "@component/variants/VariantList";
import { SidebarContext } from "@context/SidebarContext";
import useUtilsFunction from "@hooks/useUtilsFunction";
import { useCart } from "react-use-cart";
import { Button } from "react-ui";

const ProductModal = ({
  modalOpen,
  setModalOpen,
  product,
  attributes,
  currency,
}) => {
  const router = useRouter();
  const { setIsLoading, isLoading, askForPriceProduct, useAskForPriceProduct } =
    useContext(SidebarContext);
  const { t } = useTranslation("ns1");
  const { items, addItem, updateItemQuantity, inCart } = useCart();
  const { handleIncreaseQuantity } = useAddToCart();
  const { handleAddItem, setItem, item } = useAddToCart();
  const { lang, showingTranslateValue, getNumber, getNumberTwo } =
    useUtilsFunction();

  // react hook
  const [value, setValue] = useState("");
  const [price, setPrice] = useState(0);
  const [img, setImg] = useState("");
  const [originalPrice, setOriginalPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [selectVariant, setSelectVariant] = useState({});
  const [selectVa, setSelectVa] = useState({});
  const [variantTitle, setVariantTitle] = useState([]);
  const [variants, setVariants] = useState([]);

  useEffect(() => {
    if (item == 1) {
      setItem(product?.minimumOrderOfQuantity);
    }
    if (value) {
      const result = product?.variants?.filter((variant) =>
        Object.keys(selectVa).every((k) => selectVa[k] === variant[k])
      );

      const res = result?.map(
        ({
          originalPrice,
          price,
          discount,
          quantity,
          barcode,
          sku,
          productId,
          image,
          ...rest
        }) => ({
          ...rest,
        })
      );

      const filterKey = Object.keys(Object.assign({}, ...res));
      const selectVar = filterKey?.reduce(
        (obj, key) => ({ ...obj, [key]: selectVariant[key] }),
        {}
      );
      const newObj = Object.entries(selectVar).reduce(
        (a, [k, v]) => (v ? ((a[k] = v), a) : a),
        {}
      );

      const result2 = result?.find((v) =>
        Object.keys(newObj).every((k) => newObj[k] === v[k])
      );

      if (result.length <= 0 || result2 === undefined) return setStock(0);

      setVariants(result);
      setSelectVariant(result2);
      setSelectVa(result2);
      setImg(result2?.image);
      setStock(result2?.quantity);
    } else if (product?.variants?.length > 0) {
      const result = product?.variants?.filter((variant) =>
        Object.keys(selectVa).every((k) => selectVa[k] === variant[k])
      );

      setVariants(result);
      setStock(product.variants[0]?.quantity);
      setSelectVariant(product.variants[0]);
      setSelectVa(product.variants[0]);
      setImg(product.variants[0]?.image);
      const price = getNumber(product.variants[0]?.price);
      const originalPrice = getNumber(product.variants[0]?.originalPrice);
      const discountPercentage = getNumber(
        ((originalPrice - price) / originalPrice) * 100
      );
      setDiscount(getNumber(discountPercentage));
      setPrice(price);
      setOriginalPrice(originalPrice);
    } else {
      setStock(product?.stock);
      setImg(product?.image[0]);
      const price = getNumber(product?.prices?.price);
      const originalPrice = getNumber(product?.prices?.originalPrice);
      const discountPercentage = getNumber(
        ((originalPrice - price) / originalPrice) * 100
      );
      setDiscount(getNumber(discountPercentage));
      setPrice(price);
      setOriginalPrice(originalPrice);
    }
  }, [
    product?.prices?.discount,
    product?.prices?.originalPrice,
    product?.prices?.price,
    product?.stock,
    product.variants,
    selectVa,
    selectVariant,
    value,
  ]);

  //  discount part
  useEffect(() => {
    const price = getNumber(product?.prices?.price);
    const originalPrice = getNumber(product?.prices?.salePrice);
    const discountPercentage = getNumber(
      ((price - originalPrice) / price) * 100
    );

    setDiscount(discountPercentage);
  }, [product?.prices?.price, product?.prices?.salePrice]);

  useEffect(() => {
    const res = Object.keys(Object.assign({}, ...product?.variants));

    const varTitle = attributes?.filter((att) => res.includes(att?._id));

    setVariantTitle(varTitle?.sort());
  }, [variants, attributes]);

  const handleAddToCart = (p) => {
    console.log("handleAddToCart",p);
    if (p.variants.length === 1 && p.variants[0].quantity < 1) {
      return notifyError("Insufficient stock");
    }

    if (stock !== null && stock <= 0) {
      return notifyError("Insufficient stock");
    }

    if (
      product?.variants.map(
        (variant) =>
          Object.entries(variant).sort().toString() ===
          Object.entries(selectVariant).sort().toString()
      )
    ) {
      const { variants, categories, description, ...updatedProduct } = product;
      const newItem = {
        ...updatedProduct,
        id: `${
          p?.variants.length <= 0
            ? p._id
            : p._id +
              "-" +
              variantTitle?.map((att) => selectVariant[att._id]).join("-")
        }`,
        title: `${
          p?.variants.length <= 0
            ? p.title
            : p.title +
              "-" +
              variantTitle
                ?.map((att) =>
                  att.variants?.find((v) => v._id === selectVariant[att._id])
                )
                .map((el) => el?.name)
        }`,
        image: p?.image[0]?.medialink,
        variant: selectVariant || {},
        price:
          p.variants.length === 0
            ? getNumber(p.prices.price) 
            : getNumber(price),
        originalPrice:
          p.variants.length === 0
            ? getNumber(p.prices.originalPrice)
            : getNumber(originalPrice),
        tax: p?.tax,
        
      };

      addItem(newItem,item);
    } else {
      return notifyError("Please select all variants first!");
    }
  };

  const handleMoreInfo = (slug) => {
    setModalOpen(false);

    router.push(`/product/${slug}`);
    setIsLoading(!isLoading);
  };

  const category_name = product?.category?.name
    ?.toLowerCase()
    ?.replace(/[^A-Z0-9]+/gi, "-");

  const varr = variantTitle.length > 0 ? 1 : product?.minimumOrderOfQuantity;

  // description
  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const renderDescription = () => {
    if (!product?.description) return null;
    if (!showFullDescription) {
      const words = product?.description.split(" ");
      if (words.length > 20) {
        return (
          <>
            {words.slice(0, 20).join(" ")}...
            <button className="text-blue-500 ml-2" onClick={toggleDescription}>
              More
            </button>
          </>
        );
      }
    }
    return (
      <>
        {product?.description}
        <button className="text-blue-500 ml-2" onClick={toggleDescription}>
          Less
        </button>
      </>
    );
  };


  return (
    <>
      <MainModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <div className="inline-block overflow-y-auto h-full align-middle transition-all transform bg-white shadow-xl rounded-2xl">
          <div className="flex flex-col lg:flex-row md:flex-row w-full max-w-4xl overflow-hidden">
            <Link href={`/product/${product.slug}`} passHref>
              <div
                onClick={() => setModalOpen(false)}
                className="flex-shrink-0 flex items-center justify-center h-auto cursor-pointer"
              >
                {/* <Discount product={product} discount={discount} modal /> */}
                {product?.prices?.salePrice > 1 ? (
                  <span className="absolute text-dark text-sm bg-orange-500 text-white py-1 px-2 rounded font-medium z-10 left-4 top-4">
                    {discount}% off
                  </span>
                ) : (
                  ""
                )}
                {product.image[0] ? (
                  <img
                    src={product.image[0].medialink}
                    width={420}
                    height={420}
                    alt="product"
                  />
                ) : (
                  <img
                    src="https://res.cloudinary.com/ahossain/image/upload/v1655097002/placeholder_kvepfp.png"
                    width={420}
                    height={420}
                    alt="product Image"
                  />
                )}
              </div>
            </Link>

            <div
              className=" flex flex-col p-5 md:p-8 w-full text-left"
              style={{ maxWidth: "500px" }}
            >
              <div className="mb-2 md:mb-2.5 block -mt-1.5">
                <Link href={`/product/${product.slug}`} passHref>
                  <h1
                    onClick={() => setModalOpen(false)}
                    className="text-heading w-full text-lg md:text-xl lg:text-2xl font-semibold font-serif hover:text-black cursor-pointer"
                  >
                    {product?.title}
                  </h1>
                </Link>
                <div
                  className={`${
                    stock <= 0 ? "relative py-1 mb-2" : "relative"
                  }`}
                >
                  <Stock product={product} stock={stock} />
                </div>
              </div>
              {/* description */}
              <p className="text-sm leading-6 text-gray-500 md:leading-6">
                {renderDescription()}
              </p>

              {product?.askForPrice === true ? (
                <>
                  <Link href={`/askforprice?id=${product._id}`}>
                    <button
                      onClick={() => useAskForPriceProduct(product)}
                      className="w-full bg-gray-800 rounded h-7 text-white text-[12px] cursor-pointer hover:bg-gray-600 "
                    >
                      Ask for price
                    </button>
                  </Link>
                </>
              ) : (
                <>
                  <div className="flex items-center my-4">
                    <Price
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
                  </div>

                  <div className=" flex justify-between gap-1">
                    <div className="mb-1">
                      {variantTitle?.map((a, i) => (
                        <span key={a._id}>
                          <h4 className="text-sm py-1 font-serif text-gray-700 font-bold">
                            {a?.name}:
                          </h4>
                          <div className="flex flex-row mb-3">
                            <VariantList
                              att={a._id}
                              lang={lang}
                              option={a.option}
                              setValue={setValue}
                              varTitle={variantTitle}
                              variants={product?.variants}
                              setSelectVa={setSelectVa}
                              selectVariant={selectVariant}
                              setSelectVariant={setSelectVariant}
                            />
                          </div>
                        </span>
                      ))}
                    </div>
                    <div className=" flex gap-2 flex-wrap text-gray-500">
                      {product?.moqSlab.map((item, i) => (
                        <>
                          <div key={i}>
                            <p className="text-[12px]">{item.name}</p>
                            <div className="w-24 bg-[#D9D9D9] rounded flex flex-col p-1 ">
                              <div className="text-[12px]">
                                {item.minQuantity}-{item.maxQuantity}
                              </div>
                              <div className="text-end text-[11px]">
                                ₹ {item.moqSalePrice}/unit
                              </div>
                            </div>
                          </div>
                        </>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center mt-4">
                    <div className="flex items-center justify-between space-s-3 sm:space-s-4 w-full">
                      <div className="group flex items-center justify-between rounded-md overflow-hidden flex-shrink-0 border h-11 md:h-12 border-gray-300">
                        <button
                          onClick={() => setItem(item - 1)}
                          disabled={item === varr}
                          className="flex items-center justify-center flex-shrink-0 h-full transition ease-in-out duration-300 focus:outline-none w-8 md:w-12 text-heading border-e border-gray-300 hover:text-gray-500"
                        >
                          <span className="text-dark text-base">
                            <FiMinus />
                          </span>
                        </button>
                        <p className="font-semibold flex items-center justify-center h-full  transition-colors duration-250 ease-in-out cursor-default flex-shrink-0 text-base text-heading w-8  md:w-20 xl:w-24">
                          {item}
                        </p>
                        <button
                          onClick={() => setItem(item + 1)}
                          disabled={
                            product.quantity < item || product.quantity === item
                          }
                          className="flex items-center justify-center h-full flex-shrink-0 transition ease-in-out duration-300 focus:outline-none w-8 md:w-12 text-heading border-s border-gray-300 hover:text-gray-500"
                        >
                          <span className="text-dark text-base">
                            <FiPlus />
                          </span>
                        </button>
                      </div>
                      <button
                        onClick={() => handleAddToCart(product)}
                        disabled={product.quantity < 1}
                        className="text-sm leading-4 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-semibold font-serif text-center justify-center border-0 border-transparent rounded-md focus-visible:outline-none focus:outline-none text-white px-4 ml-4 md:px-6 lg:px-8 py-4 md:py-3.5 lg:py-4 hover:text-white bg-gray-800 hover:bg-gray-600 w-full h-12"
                      >
                        {t("common:addToCart")}
                      </button>
                    </div>
                  </div>
                </>
              )}
              <div className="flex items-center mt-4">
                <div className="flex items-center justify-between space-s-3 sm:space-s-4 w-full">
                  <div>
                    <span className="font-serif font-semibold py-1 text-sm d-block">
                      <span className="text-gray-700">
                        {" "}
                        {t("common:category")}:
                      </span>{" "}
                      <Link
                        href={`/search?category=${category_name}&_id=${product?.category?._id}`}
                      >
                        <button
                          type="button"
                          className="text-gray-600 font-serif font-medium underline ml-2 hover:text-teal-600"
                          onClick={() => setIsLoading(!isLoading)}
                        >
                          {category_name}
                        </button>
                      </Link>
                    </span>
                    <Tags product={product} />
                  </div>

                  <div>
                    <button
                      onClick={(e) => handleMoreInfo(product.slug, e)}
                      className="font-sans font-medium text-sm text-orange-500"
                    >
                      {t("common:moreInfo")}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MainModal>
    </>
  );
};

export default ProductModal;
