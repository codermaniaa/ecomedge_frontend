import useAsync from "@hooks/useAsync";
import CategoryServices from "@services/CategoryServices";
import React from "react";
import { useRouter } from "next/router";
import { useState } from "react";
import { useEffect } from "react";
import style from "../../styles/tridyota.module.css";

const TopCard = () => {
  const [category, setCategory] = useState(null);

  const router = useRouter();
  const { query } = router;
  const param1 = query?._id;
  const { data } = useAsync(() => CategoryServices.getShowingCategory());
  const arr = data[0]?.children;

  const findCategoryById = (categories, id) => {
    for (const category of categories) {
      if (category._id === id) {
        return category;
      }
      if (category.children && category.children.length > 0) {
        const found = findCategoryById(category.children, id);
        if (found) {
          return found;
        }
      }
    }
    return null;
  };

  useEffect(() => {
    if (arr) {
      setCategory(findCategoryById(arr, param1));
    }
  }, [param1, arr]);
  const staticData = [
    {
      id: 1,
      title1: 'Taste of Fresh & Natural',
      title2: 'Taste of Fresh & Natural',
      subtitle: 'Weekend discount offer',
      buttonLabel: 'Shop Now',
      imageUrl: 'https://img.freepik.com/premium-photo/beautiful-asian-woman-carrying-colorful-bags-shopping-online-with-mobile-phone_8087-3877.jpg',
      link: '/search?category=fresh-vegetable',
    },
    {
      id: 2,
      title1: 'Taste of Fresh & Natural',
      title2: 'Taste of Fresh & Natural', subtitle: 'Weekend discount offer',
      buttonLabel: 'Shop Now',
      imageUrl: 'https://img.freepik.com/premium-photo/beautiful-asian-woman-carrying-colorful-bags-shopping-online-with-mobile-phone_441990-6626.jpg',
      link: '/search?Category=fish--meat',
    },
    {
      id: 3,
      title1: 'Taste of Fresh & Natural',
      title2: 'Taste of Fresh & Natural', subtitle: 'Weekend discount offer',
      buttonLabel: 'Shop Now',
      imageUrl: 'https://www.esquire.com.au/wp-content/uploads/2024/04/main-2-1024x683.png',
    },
  ];
  return (
    <>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 xl:gap-6">
        {staticData.map((item) => (
          // <div
          //   key={item.id}
          //   className="mx-auto w-full relative rounded-lg overflow-hidden transition ease-out duration-400 delay-150 transform hover:shadow-xl"
          // >
          //   <a href={item.link} className="block">
          //     <img
          //       src={item.imageUrl}
          //       alt={item.title}
          //       className="object-cover w-full h-60"
          //       loading="lazy"
          //     />
          //     <div className="absolute top-0 left-0 z-10 p-4 flex flex-col w-full text-center justify-center  from-transparent to-black">
          //       <h2 className="font-serif text-base sm:text-lg md:text-lg lg:text-lg font-semibold text-gray-100">
          //         {item.title1}
          //         <br />
          //         <span className="text-lg sm:text-2xl md:text-2xl lg:text-2xl font-bold text-white">
          //         {item.title2}
          //         </span>
          //         <br />
          //           {item.subtitle}
          //       </h2>

          //     </div>
          //   </a>
          // </div>
          // <div
          //   key={item.id}
          //   className="mx-auto w-full relative rounded-lg overflow-hidden transition ease-out duration-400 delay-150 transform hover:shadow-xl"
          // >
          //   <a href={item.link} className="block">
          //     <img
          //       src={item.imageUrl}
          //       alt={item.title}
          //       className="object-cover w-full h-60 filter blur-sm"
          //       loading="lazy"
          //     />
          //     <div className="absolute top-0 left-0 z-10 p-4 flex flex-col w-full text-center justify-center">
          //       <h2 className="font-serif text-base sm:text-lg md:text-lg lg:text-lg font-semibold text-white">
          //         {item.title1}
          //         <br />
          //         <span className="text-lg sm:text-2xl md:text-2xl lg:text-2xl font-bold text-white">
          //           {item.title2}
          //         </span>
          //         <br />
          //         {item.subtitle}
          //       </h2>
          //     </div>
          //   </a>
          // </div>
          <div
            key={item.id}
            className="mx-auto w-full relative rounded-lg overflow-hidden transition ease-out duration-400 delay-150 transform hover:shadow-xl"
          >
            <a href={item.imageUrl} className="block">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="object-cover w-full h-60 "
                loading="lazy"
              />
              <div className="absolute bottom-0 left-0 z-10 p-4 flex flex-col w-full text-center justify-end">
                <h2 className="font-serif text-base sm:text-lg md:text-lg lg:text-lg font-semibold text-white">
                  {item.title1}
                  <br />
                  <span className="text-lg sm:text-2xl md:text-2xl lg:text-2xl font-bold text-white">
                    {item.title2}
                  </span>
                  <br />
                  <span className="text-white">{item.subtitle}</span>
                </h2>
              </div>
            </a>
          </div>


        ))}
      </div>
      {/* <div className="w-full h-40 rounded flex justify-between bg-[#CF9970]">
        <div className="px-[50px] py-3 text-slate-50">
          <h1
            className={`flex items-center font-bold text-slate-50 ${style.fontFamily}`}
          >
            {
              query?.category &&
              query?.category
                .split("-") // Split the string into an array of words
                .slice(0, 2) // Take the first two words
                .join(" ") // Join the first two words back into a string
            }
            {query?.category && query?.category.split("-").length > 2 && "..."}
          </h1>
        </div>
        <div className="p-2 flex justify-center items-center">
          <img className="h-[130px] rounded" src={category?.icon} alt="image" />
        </div>
      </div> */}
    </>
  );
};

export default TopCard;
