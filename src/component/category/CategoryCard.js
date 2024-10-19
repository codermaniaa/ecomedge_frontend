import Image from "next/image";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import {
  IoChevronDownOutline,
  IoChevronForwardOutline,
  IoRemoveSharp,
} from "react-icons/io5";

//internal import
import { SidebarContext } from "@context/SidebarContext";
import useUtilsFunction from "@hooks/useUtilsFunction";

const CategoryCard = ({ title, icon, nested, id }) => {
  const router = useRouter();
  const { closeCategoryDrawer, isLoading, setIsLoading } =
    useContext(SidebarContext);
  const { showingTranslateValue } = useUtilsFunction();

  // react hook
  const [show, setShow] = useState(false);
  const [showSubCategory, setShowSubCategory] = useState({
    id: "",
    show: false,
  });

  // handle show category
  const showCategory = (id, title) => {
    const name = title.toLowerCase().replace(/[^A-Z0-9]+/gi, "-");

    setShow(!show);
    router.push(`/search?category=${name}&_id=${id}`);
    closeCategoryDrawer;
    setIsLoading(!isLoading);
  };

  // handle sub nested category
  const handleSubNestedCategory = (id, title) => {
    const name = title.toLowerCase().replace(/[^A-Z0-9]+/gi, "-");

    setShowSubCategory((prevState) => ({
      id: id,
      show: prevState.id === id ? !prevState.show : true,
    }));
    router.push(`/search?category=${name}&_id=${id}`);
    closeCategoryDrawer;
    setIsLoading(!isLoading);
  };

  const handleSubCategory = (id, title) => {
    const name = title.toLowerCase().replace(/[^A-Z0-9]+/gi, "-");

    router.push(`/search?category=${name}&_id=${id}`);
    closeCategoryDrawer;
    setIsLoading(!isLoading);
  };
  const handleSubChildrenCategory = (id, title) => {
    const name = title.toLowerCase().replace(/[^A-Z0-9]+/gi, "-");
    router.push(`/search?category=${name}&_id=${id}`);
    closeCategoryDrawer;
    setIsLoading(!isLoading);
  };
  return (
    <>
      <a
        onClick={() => showCategory(id, title)}
        className="p-2 flex items-center rounded-md hover:bg-gray-50 w-full hover:text-gray-600"
        role="button"
      >
        {icon ? (
          <img src={icon} width={18} height={18} alt="Category" />
        ) : (
          <img
            src="https://res.cloudinary.com/ahossain/image/upload/v1655097002/placeholder_kvepfp.png"
            width={18}
            height={18}
            alt="category"
          />
        )}

        <div className="inline-flex items-center justify-between ml-3 text-sm font-medium w-full hover:text-gray-600">
          {title}
          {nested?.length > 0 && (
            <span className="transition duration-700 ease-in-out inline-flex loading-none items-end text-gray-400">
              {show ? <IoChevronDownOutline /> : <IoChevronForwardOutline />}
            </span>
          )}
        </div>
      </a>
      {show && nested.length > 0 && (
        <ul className="pl-6 pb-3 pt-1 -mt-1">
          {nested?.map((children) => (
            <li key={children._id}>
              {children?.children?.length > 0 ? (
                <a
                  onClick={() =>
                    handleSubNestedCategory(children?._id, children?.name)
                  }
                  className="flex items-center font-serif pr-2 text-sm text-gray-600 hover:text-gray-600 py-1 cursor-pointer"
                >
                  {children?.name}
                  <div className="inline-flex items-center justify-between ml-3 text-sm font-medium w-full hover:text-gray-600">
                    {children.children.length > 0 ? (
                      <span className="transition duration-700 ease-in-out inline-flex loading-none items-end text-gray-400">
                        {showSubCategory.id === children._id &&
                        showSubCategory.show ? (
                          <IoChevronDownOutline />
                        ) : (
                          <IoChevronForwardOutline />
                        )}
                      </span>
                    ) : null}
                  </div>
                </a>
              ) : (
                <a
                  onClick={() => handleSubCategory(children._id, children.name)}
                  className="flex items-center font-serif py-1 text-sm text-gray-600 hover:text-gray-600 cursor-pointer"
                >
                  {children?.name}
                </a>
              )}

              {/* sub children category */}
              {showSubCategory.id === children._id &&
              showSubCategory.show === true ? (
                <ul className="pl-6 pb-3">
                  {children.children.map((subChildren) => (
                    <li key={subChildren._id}>
                      <a
                        onClick={() =>
                          handleSubChildrenCategory(
                            subChildren._id,
                            subChildren?.name
                          )
                        }
                        className="flex items-center font-serif py-1 text-sm text-gray-600 hover:text-gray-600 cursor-pointer"
                      >
                        {subChildren?.name}
                        {showingTranslateValue(subChildren?.name)}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : null}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default CategoryCard;
