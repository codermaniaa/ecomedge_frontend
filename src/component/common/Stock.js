import useTranslation from "next-translate/useTranslation";

const Stock = ({ product, stock, card }) => {
  const { t } = useTranslation();

  return (
    <>
      {stock === 0 ? (
        <span className="bg-red-100 absolute z-10 text-red-500 dark:text-red-400 rounded-full inline-flex items-center justify-center px-2 py-0 text-xs font-medium font-serif">
          {/* Stock Out */}
          {t("common:stockOut")}
        </span>
      ) :
        (
          <>
            {stock == null ? "" :
              <span
                className={`${card
                    ? "bg-gray-100 absolute z-10 text-gray-800 rounded-full text-xs px-2 py-0 font-medium"
                    : "bg-gray-100 text-gray-500 rounded-full inline-flex items-center justify-center px-2 py-0 text-xs font-semibold font-serif"
                  }`}
              >
                {t("common:stock")} :
                <span className="text-red-500 dark:text-red-400  pl-1 font-bold">

                  {product?.fewLeft === true ? "Few Left" : stock}
                </span>
              </span>}

          </>
        )}
    </>
  );
};

export default Stock;
