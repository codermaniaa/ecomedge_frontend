import React, { useContext, useEffect, useState } from "react";
import useTranslation from "next-translate/useTranslation";

//internal import
import Layout from "@layout/Layout";
import useFilter from "@hooks/useFilter";
import ProductServices from "@services/ProductServices";
import ProductCard from "@component/product/ProductCard";
import CategoryCarousel from "@component/carousel/CategoryCarousel";
import { SidebarContext } from "@context/SidebarContext";
import Loading from "@component/preloader/Loading";
import AttributeServices from "@services/AttributeServices";
import TopCard from "@component/cta-card/TopCard";
import CategoryServices from "@services/CategoryServices";
import useAsync from "@hooks/useAsync";
import FeatureCategory from "@component/category/FeatureCategory";

const Search = ({ products, attributes, categoryId }) => {
  const { t } = useTranslation();
  const { isLoading, setIsLoading } = useContext(SidebarContext);
  const [visibleProduct, setVisibleProduct] = useState(18);
  const [breadcrumb, setBreadcrumb] = useState("");
  const { data, error, loading } = useAsync(
    CategoryServices.getShowingCategory
  );

  const flattenCategories = (categories = [], parentName = "") => {
    let flattenedCategories = [];
    for (const category of categories) {
      const categoryName = parentName
        ? `${parentName} > ${category.name}`
        : category.name;
      flattenedCategories.push({ ...category, parentName: categoryName });
      if (category.children.length > 0) {
        flattenedCategories = [
          ...flattenedCategories,
          ...flattenCategories(category.children, categoryName),
        ];
      }
    }

    return flattenedCategories;
  };

  const flatCategories = flattenCategories(data[0]?.children);

  const getCategoryBreadcrumb = (flatCategories, childId) => {
    const category = flatCategories.find((cat) => cat._id === childId);
    return category ? category.parentName : null;
  };

  useEffect(() => {
    setIsLoading(false);
  }, [products]);

  const { setSortedField, productData } = useFilter(products);

  useEffect(() => {
    setBreadcrumb(getCategoryBreadcrumb(flatCategories, categoryId));
  }, [categoryId, flatCategories]);

  return (
    <>
      <Layout title="Search" description="This is search page">
        <div className="mx-auto max-w-screen-2xl px-3 sm:px-10">
          <div className="flex py-10 lg:py-12">
            <div className="flex w-full">
              <div className="w-full">
                <div className="w-full">
                  <TopCard />
                </div>
                <div className="relative">{/* <CategoryCarousel /> */}</div>
                
                {/* BR line  */}
                <svg className="mt-5 mb-5" width="100%" height="50" viewBox="0 0 1000 50" xmlns="http://www.w3.org/2000/svg">
                 
                  <line x1="0" y1="25" x2="380" y2="25" stroke="#FF69B4" stroke-width="2" />

                 
                  <line x1="620" y1="25" x2="1000" y2="25" stroke="#FF69B4" stroke-width="2" />

                  {/* <!--Circle --> */}
                  <circle cx="400" cy="25" r="6" fill="#FF69B4" />

                  <circle cx="500" cy="25" r="10" fill="#FF69B4" />

                  <circle cx="600" cy="25" r="6" fill="#FF69B4" />
                </svg>

                <div className="relative flex justify-center">
                  <FeatureCategory />
                </div>
                {breadcrumb && (
                  <div className="mt-5 bg-gray-200 p-4">
                    <p className="text-gray-700 font-serif font-bold">
                      {breadcrumb}
                    </p>
                  </div>
                )}
                {productData?.length === 0 ? (
                  <div className="text-center align-middle mx-auto p-5 my-5">
                    <img
                      className="my-4"
                      src="/no-result.svg"
                      alt="no-result"
                      width={400}
                      height={380}
                    />
                    <h2 className="text-lg md:text-xl lg:text-2xl xl:text-2xl text-center mt-2 font-medium font-serif text-gray-600">
                      {t("common:sorryText")} 😞
                    </h2>
                  </div>
                ) : (
                  <div className="flex justify-between my-3 bg-orange-100 border border-gray-100 rounded p-3">
                    <h6 className="text-sm font-serif">
                      {t("common:totalI")}{" "}
                      <span className="font-bold">{productData?.length}</span>{" "}
                      {t("common:itemsFound")}
                    </h6>
                    <span className="text-sm font-serif">
                      <select
                        onChange={(e) => setSortedField(e.target.value)}
                        className="py-0 text-sm font-serif font-medium block w-full rounded border-0 bg-white pr-10 cursor-pointer focus:ring-0"
                      >
                        <option
                          className="px-3"
                          value="All"
                          defaultValue
                          hidden
                        >
                          {t("common:sortByPrice")}
                        </option>
                        <option className="px-3" value="Low">
                          {t("common:lowToHigh")}
                        </option>
                        <option className="px-3" value="High">
                          {t("common:highToLow")}
                        </option>
                      </select>
                    </span>
                  </div>
                )}

                {isLoading ? (
                  <Loading loading={isLoading} />
                ) : (
                  <>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-6 gap-2 md:gap-3 lg:gap-3">
                      {productData
                        ?.slice(0, visibleProduct)
                        .map((product, i) => (
                          <ProductCard
                            key={i + 1}
                            product={product}
                            attributes={attributes}
                          />
                        ))}
                    </div>

                    {productData?.length > visibleProduct && (
                      <button
                        onClick={() => setVisibleProduct((pre) => pre + 10)}
                        className="w-auto mx-auto md:text-sm leading-5 flex items-center transition ease-in-out duration-300 font-medium text-center justify-center border-0 border-transparent rounded-md focus-visible:outline-none focus:outline-none bg-indigo-100 text-gray-700 px-5 md:px-6 lg:px-8 py-2 md:py-3 lg:py-3 hover:text-white hover:bg-gray-600 h-12 mt-6 text-sm lg:text-sm"
                      >
                        {t("common:loadMoreBtn")}
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Search;

export const getServerSideProps = async (context) => {
  const { query, _id } = context.query;

  const [data, attributes] = await Promise.all([
    ProductServices.getShowingStoreProducts({
      category: _id ? _id : "",
      title: query ? encodeURIComponent(query) : "",
    }),
    AttributeServices.getShowingAttributes({}),
  ]);

  return {
    props: {
      products: data?.products,
      attributes,
      categoryId: _id,
    },
  };
};
