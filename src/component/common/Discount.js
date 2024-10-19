import useUtilsFunction from "@hooks/useUtilsFunction";
// import { getNumber } from "@utils/numberFormat";
const Discount = ({ discount, product, slug, modal }) => {
  const { getNumber } = useUtilsFunction();

  const price = product?.isCombination
    ? getNumber(product?.variants[0]?.price)
    : getNumber(product?.prices?.price);
  const originalPrice = product?.isCombination
    ? getNumber(product?.variants[0]?.originalPrice)
    : getNumber(product?.prices?.originalPrice);

    console.log(price, originalPrice,discount);


  

    const discountPercentage = getNumber(
      ((originalPrice - price) / originalPrice) * 100
    );
 

  return (
    <>
      {discount > 0 && (
        <span
          className={
            modal
              ? "absolute text-dark text-sm bg-orange-500 text-white py-1 px-2 rounded font-medium z-10 left-4 top-4"
              : slug
                ? "relative text-dark text-sm bg-orange-500 text-white py-1 px-2 rounded font-medium z-10 right-0 top-6"
                : " absolute text-dark text-xs bg-orange-500 text-white py-1 px-2 rounded font-medium z-10 right-4 top-4"
          }
        >
          {discount}% Off
        </span>
      )}
      {discount === undefined && originalPrice > 1 ? (
        <span
          className={
            modal
              ? "absolute text-dark text-sm bg-orange-500 text-white py-1 px-2 rounded font-medium z-10 left-4 top-4"
              : slug
                ? "  text-dark text-sm bg-orange-500 text-white py-1 px-2 rounded font-medium z-10 right-4 top-4"
                : " absolute text-dark text-xs bg-orange-500 text-white py-1 px-2 rounded font-medium z-10 right-4 top-4"
          }
        >
          {Number(product.prices.discount).toFixed(0)}% Off
          {discountPercentage} % Off
        </span>
      ):""}
    </>
  );
};

export default Discount;
