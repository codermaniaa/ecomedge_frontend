import Image from "next/image";
import { useRouter } from "next/router";
import { useContext } from "react";
import { IoChevronForwardSharp } from "react-icons/io5";

//internal import

import useAsync from "@hooks/useAsync";
import CategoryServices from "@services/CategoryServices";
import CMSkeleton from "@component/preloader/CMSkeleton";
import { SidebarContext } from "@context/SidebarContext";
import { FaArrowDown } from "react-icons/fa6";

const CatalogCategory = () => {
  const router = useRouter();
  const { isLoading, setIsLoading } = useContext(SidebarContext);

  const { data, error, loading } = useAsync(CategoryServices.getBrandCatalog);

  console.log("BrandCatalog##", data);

  const handleCategoryClick = (id, categoryName) => {
    console.log("categoryName", categoryName);
    const category_name = categoryName
      .toLowerCase()
      .replace(/[^A-Z0-9]+/gi, "-");
    const url = `/search?category=${category_name}&_id=${id}`;
    router.push(url);
    setIsLoading(!isLoading);
  };

  return (
    <>
      {loading ? (
        <CMSkeleton count={10} height={20} error={error} loading={loading} />
      ) : (
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-6">
          {data?.brandCatalogDetailsdData?.map((category, i) => (
            <li className="group" key={i + 1}>
              <div className="flex w-full h-full border border-gray-100 shadow-sm bg-white p-1 cursor-pointer transition duration-200 ease-linear transform group-hover:shadow-lg">
                <div className="flex items-center">
                  <div>
                    {category?.brandLogo ? (
                      <img
                        src={category?.brandLogo}
                        alt="category"
                        className="w-12 h-12 object-cover rounded-full"

                      />
                    ) : (
                      <img
                        src="https://res.cloudinary.com/ahossain/image/upload/v1655097002/placeholder_kvepfp.png"
                        alt="category"
                        width={35}
                        height={35}
                      />
                    )}
                  </div>

                  <div className="pl-4">
                    <h3
                      onClick={() =>
                        handleCategoryClick(category._id, category?.name)
                      }
                      className="text-sm text-gray-600 font-serif font-medium leading-tight line-clamp-1  group-hover"
                    >
                      {category?.brandName}
                    </h3>
                    {/* <ul className="pt-1 mt-1">
                      {category?.children?.slice(0, 3).map((child) => (
                        <li key={child._id} className="pt-1">
                          <a
                            onClick={() =>
                              handleCategoryClick(child._id, child?.name)
                            }
                            className="flex items-center font-serif text-xs text-gray-400 cursor-pointer"
                          >
                            <span className="text-xs text-gray-400 ">
                              <IoChevronForwardSharp />
                            </span>
                            {child?.name}
                          </a>
                        </li>
                      ))}
                    </ul> */}
                  </div>
                  <div className="pl-4">
                    <a href={category?.brandFile} download="filename.jpg" target="__blank">
                      <FaArrowDown />
                    </a>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default CatalogCategory;
