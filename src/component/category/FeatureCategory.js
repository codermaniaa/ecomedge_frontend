import Image from "next/image";
import { useRouter } from "next/router";
import { useContext, useEffect, useRef, useState } from "react";
import {
  IoChevronDownOutline,
  IoChevronDownSharp,
  IoChevronForwardSharp,
  IoChevronForwardOutline,
} from "react-icons/io5";

//internal import

import useAsync from "@hooks/useAsync";
import CategoryServices from "@services/CategoryServices";
import CMSkeleton from "@component/preloader/CMSkeleton";
import { SidebarContext } from "@context/SidebarContext";
import useUtilsFunction from "@hooks/useUtilsFunction";

// ... (import statements)

const FeatureCategory = () => {
  const router = useRouter();
  const { isLoading, setIsLoading } = useContext(SidebarContext);
  const { showingTranslateValue } = useUtilsFunction();
  const [expandedCategoryId, setExpandedCategoryId] = useState(null);
  const categoryRef = useRef(null); //expanded category list
  const [showSubCategory, setShowSubCategory] = useState({
    id: "",
    show: false,
  });

  // Close the expanded category list when clicking outside of it
  useEffect(() => {
    function handleClickOutside(event) {
      if (categoryRef.current && !categoryRef.current.contains(event.target)) {
        setExpandedCategoryId(null);
      }
    }

    // Add event listener when component mounts
    document.addEventListener("mousedown", handleClickOutside);

    // Remove event listener when component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const { data, error, loading } = useAsync(
    CategoryServices.getShowingCategory
  );

  const handleCategoryClick = (id, categoryName) => {
    const category_name = categoryName
      .toLowerCase()
      .replace(/[^A-Z0-9]+/gi, "-");

    const url = `/search?category=${category_name}&_id=${id}`;
    router.push(url);
    setIsLoading(!isLoading);
  };

  const toggleSubCategories = (categoryId) => {
    setExpandedCategoryId((prev) => (prev === categoryId ? null : categoryId));
  };
  const handleSubNestedCategory = (id, title) => {
    const name = title.toLowerCase().replace(/[^A-Z0-9]+/gi, "-");

    setShowSubCategory((prevState) => ({
      id: id,
      show: prevState.id === id ? !prevState.show : true,
    }));
  };
  const handleSubChildrenCategory = (id, title) => {
    const name = title.toLowerCase().replace(/[^A-Z0-9]+/gi, "-");

    router.push(`/search?category=${name}&_id=${id}`);
    setExpandedCategoryId(null);
    setIsLoading(!isLoading);
  };

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className="flex justify-center">
      {loading ? (
        <CMSkeleton count={10} height={20} error={error} loading={loading} />
      ) : (
        // <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-6">
        //   {data[0]?.children?.map((category, i) => (
        //     <li className="group mr-" key={i + 1}>
        //       <div className="flex w-full h-full border border-gray-100 shadow-sm bg-white pl-1  cursor-pointer transition duration-200 ease-linear transform group-hover:shadow-lg   ">
        //         <div className="flex items-center">
        //           <div className="relative w-16 h-16 mt-3">
        //             <div>
        //               {category?.icon ? (
        //                 <img
        //                   src={category?.icon}
        //                   alt="category"
        //                   className="w-12 h-12 object-cover rounded-full"
        //                 />
        //               ) : (
        //                 <img
        //                   src="https://res.cloudinary.com/ahossain/image/upload/v1655097002/placeholder_kvepfp.png"
        //                   alt="category"
        //                   className="w-full h-full object-cover rounded-full"
        //                 />
        //               )}
        //             </div>
        //           </div>

        //           <div className="pl-4 flex-grow ">
        //             <div className="flex items-center justify-between  ">
        //               <h2
        //                 onClick={() =>
        //                   handleCategoryClick(category._id, category?.name)
        //                 }
        //                 className="text-base text-gray-600  font-serif font-medium leading-tight line-clamp-1 mr-2 group-hover "
        //               >
        //                 {category?.name}
        //               </h2>
        //               {category.children && (
        //                 <button
        //                   className="text-xl text-gray-400 cursor-pointer  "
        //                   onClick={() => toggleSubCategories(category._id)}
        //                 >
        //                   {expandedCategoryId === category._id ? (
        //                     <>
        //                       <IoChevronDownSharp />
        //                     </>
        //                   ) : (
        //                     category.children.length > 0 && (
        //                       <IoChevronForwardSharp />
        //                     )
        //                   )}
        //                 </button>
        //               )}
        //             </div>
        //             { expandedCategoryId === category._id && (
        //               <div
        //                 ref={categoryRef}
        //                 className="mt-8 w-full absolute bg-white border rounded-md shadow-md z-10"
        //               >
        //                 <ul
        //                   className="py-2 text-sm text-gray-600 dark:text-gray-500"
        //                   style={{ maxHeight: "200px", overflowY: "auto" }}
        //                 >
        //                   {category?.children?.map((child, index) => (
        //                     <li key={child._id} className="pt-1">
        //                       <a className="px-4 py-2 hover:bg-gray-100 flex items-center ">
        //                         <span
        //                           onClick={() =>
        //                             handleCategoryClick(child._id, child?.name)
        //                           }
        //                         >
        //                           {child?.name}
        //                         </span>

        //                         <div
        //                           onClick={() =>
        //                             handleSubNestedCategory(
        //                               child?._id,
        //                               child?.name
        //                             )
        //                           }
        //                           className="inline-flex items-center justify-between ml-3 text-sm font-medium w-full hover:text-gray-600 "
        //                         >
        //                           {child.children.length > 0 ? (
        //                             <span className="transition duration-700 ease-in-out inline-flex loading-none items-end text-gray-400  ">
        //                               {showSubCategory.id === child._id &&
        //                               showSubCategory.show ? (
        //                                 <IoChevronDownOutline />
        //                               ) : (
        //                                 <IoChevronForwardOutline />
        //                               )}
        //                             </span>
        //                           ) : null}
        //                         </div>
        //                       </a>

        //                       {showSubCategory.id === child._id &&
        //                       showSubCategory.show === true ? (
        //                         <ul className="pl-6 pb-3 ">
        //                           {child.children.map((subChildren) => (
        //                             <li
        //                               className="hover:bg-gray-100"
        //                               key={subChildren._id}
        //                             >
        //                               <a
        //                                 onClick={() =>
        //                                   handleSubChildrenCategory(
        //                                     subChildren._id,
        //                                     subChildren?.name
        //                                   )
        //                                 }
        //                                 className="font-serif py-1 px-2 text-sm   items-center cursor-pointer"
        //                               >
        //                                 {subChildren?.name}
        //                                 {showingTranslateValue(
        //                                   subChildren?.name
        //                                 )}
        //                               </a>
        //                             </li>
        //                           ))}
        //                         </ul>
        //                       ) : null}
        //                     </li>
        //                   ))}
        //                 </ul>
        //               </div>
        //             )}
        //           </div>
        //         </div>
        //       </div>
        //     </li>
        //   ))}
        // </ul>
        <div className="section--padding py-1">
          <div className="multicolumn page-width max-w-screen-xl mx-auto">
            {/* <div className="title-wrapper text-center mb-8"> */}
              {/* <h2 className="title text-3xl font-bold">Collections</h2> */}
            {/* </div>Fv */}
            <div className="slider-component flex flex-wrap justify-center gap-6">
              {data[0]?.children?.map((category) => (
                <div
                  key={category.id}
                  className="multicolumn-card w-full sm:w-1/2 md:w-1/4 lg:w-1/4 p-2"
                >

                  <div className="media-wrapper overflow-hidden rounded-full h-600" > {/* Changed to rounded-full */}
                    <Image
                      src={category?.icon}
                      // alt={slide.alt}
                      width={500}
                      height={500}
                      className="media w-full h-auto object-cover transition-transform transform hover:scale-105 rounded-full" // Added rounded-full here as well
                    />
                  </div>

                  <div className="flex items-center pt-3 justify-center">
                    <h2
                      onClick={() =>
                        handleCategoryClick(category._id, category?.name)
                      }
                      className="text-base text-gray-600 font-serif text-4xl font-extrabold leading-tight line-clamp-1"
                    >
                      {category?.name}
                    </h2>


                    {/* {category.children && (
                        <button
                          className="text-xl text-gray-400 cursor-pointer  "
                          onClick={() => toggleSubCategories(category._id)}
                        >
                          {expandedCategoryId === category._id ? (
                            <>
                              <IoChevronDownSharp />
                            </>
                          ) : (
                            category.children.length > 0 && (
                              <IoChevronForwardSharp />
                            )
                          )}
                        </button>
                      )} */}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
      }
    </div >
  );
};

export default FeatureCategory;
