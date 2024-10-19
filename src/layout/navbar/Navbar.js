import { useContext, useEffect, useState, useRef } from "react";
import Cookies from "js-cookie";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useCart } from "react-use-cart";
import { IoSearchOutline } from "react-icons/io5";
import { FiShoppingCart, FiUser, FiBell } from "react-icons/fi";
import useTranslation from "next-translate/useTranslation";

//internal import
import NavbarPromo from "@layout/navbar/NavbarPromo";
import { UserContext } from "@context/UserContext";
import LoginModal from "@component/modal/LoginModal";
import CartDrawer from "@component/drawer/CartDrawer";
import { SidebarContext } from "@context/SidebarContext";
import useGetSetting from "@hooks/useGetSetting";
import ProductServices from "@services/ProductServices";
import { notifyError, notifySuccess } from "@utils/toast";
import ProductEnquiry from "@component/modal/ProductEnquiry";
import NotificationDrawer from "@component/drawer/NotificationDrawer";
import useAsync from "@hooks/useAsync";
import NotificationServices from "@services/NotificationServices";

const Navbar = () => {
  const { t } = useTranslation();
  const [imageUrl, setImageUrl] = useState("");
  const [searchText, setSearchText] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpenEnquiry, setModalOpenEnquiry] = useState(false);
  const [searchData, setSearchData] = useState(null);
  const [showSearchData, setShowSearchData] = useState(false);
  const [searchRes, setSearchRes] = useState(false);

  const { toggleCartDrawer } = useContext(SidebarContext);
  const { toggleNotificationDrawer } = useContext(SidebarContext);
  const { totalItems } = useCart();
  const router = useRouter();
  const { data } = useAsync(NotificationServices.getAllNotification);
  const searchRef = useRef(null);

  const { storeCustomizationSetting } = useGetSetting();

  const {
    state: { userInfo },
  } = useContext(UserContext);

  const handleSearchInput = (e) => {
    const val = e.target.value;
    setSearchText(val);
    if (val.length > 2) {
      ProductServices.getSearchSuggestProducts({ query: val }).then((res) => {
        if (res) {
          if (res?.success === true) {
            setSearchData(res);
            setShowSearchData(true);
            if (!res?.categorysearchResult && !res?.productsearchResult) {
              setSearchRes(true);
            } else {
              setSearchRes(false);
            }
          } else {
            notifyError(res.message);
          }
        }
      });
    } else {
      setSearchData(null);
      setShowSearchData(false);
      setSearchRes(false); // Reset searchRes when input length is less than 3
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (searchText) {
      router.push(`/search?category=${searchText}`, null, { scroll: false });
      setSearchText("");
    } else {
      router.push(`/`, null, { scroll: false });
      setSearchText("");
    }
  };

  useEffect(() => {
    if (Cookies.get("userInfo")) {
      const user = JSON.parse(Cookies.get("userInfo"));
      setImageUrl(user.image);
    }
  }, []);

  // Handle clicks outside the search bar to hide search data
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchData(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchRef]);

  return (
    <>
      <CartDrawer />
      <NotificationDrawer />
      {modalOpen && (
        <LoginModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
      )}
      {modalOpenEnquiry && (
        <ProductEnquiry
          modalOpen={modalOpenEnquiry}
          setModalOpen={setModalOpenEnquiry}
        />
      )}
{/* bg-gray-800 */}
      <div className="bg-gray-800 sticky top-0 z-20">
        <div className="max-w-screen-2xl mx-auto px-3 sm:px-10">
          <div className="top-bar h-16 lg:h-auto flex items-center justify-between py-4 mx-auto">
            <Link href="/">
              <a className="mr-3 lg:mr-12 xl:mr-12 hidden md:hidden lg:block">
                <img
                  width={50}
                  height={20}
                  src={
                    storeCustomizationSetting?.navbar?.header_logo ||
                    "/logo/Ecomedge.png"
                  }
                  // /logo/Ecomedge.png
                  alt="logo"
                />
              </a>
            </Link>
            <div className="w-full transition-all duration-200 ease-in-out lg:flex lg:max-w-[520px] xl:max-w-[750px] 2xl:max-w-[900px] md:mx-12 lg:mx-4 xl:mx-0">
              <div
                className="w-full flex flex-col justify-center flex-shrink-0 relative z-30"
                ref={searchRef}
              >
                <div className="flex flex-col mx-auto w-full">
                  <form
                    onSubmit={handleSubmit}
                    className="relative pr-12 md:pr-14 bg-white overflow-hidden shadow-sm rounded-md w-full"
                  >
                    <label className="flex items-center py-0.5">
                      <input
                        onChange={handleSearchInput}
                        value={searchText}
                        className="form-input w-full pl-5 appearance-none transition ease-in-out border text-input text-sm font-sans rounded-md min-h-10 h-10 duration-200 bg-white focus:ring-0 outline-none border-none focus:outline-none placeholder-gray-500 placeholder-opacity-75"
                        placeholder="Search by products"
                      />
                    </label>
                    <button
                      aria-label="Search"
                      type="submit"
                      className="outline-none text-xl text-gray-400 absolute top-0 right-0 end-0 w-12 md:w-14 h-full flex items-center justify-center transition duration-200 ease-in-out hover:text-heading focus:outline-none"
                    >
                      <IoSearchOutline />
                    </button>
                    <hr />
                  </form>
                  {showSearchData && (
                    <div className="absolute w-full top-10 px-[20px] py-[20px] left-0 bg-white rounded">
                      {searchData &&
                        searchData.productsearchResult?.length > 0 && (
                          <>
                            <h5 className="text-slate-600 text-[13px]">
                              Products:
                            </h5>
                            <hr />
                            {searchData.productsearchResult.map((item, i) => (
                              <Link
                                href={`/product/${item?.slug?.toLowerCase()}`}
                                key={i}
                              >
                                <div className=" flex gap-2 items-center m-1 py-1 px-3 text-[12px] text-gray-500 hover:text-[#189669] rounded bg-slate-100 cursor-pointer hover:bg-[#d1fae5]">
                                  <img
                                    src={item?.image[0]?.medialink}
                                    alt="product"
                                    width={25}
                                    height={25}
                                  />
                                  <p>{item?.title}</p>
                                </div>
                              </Link>
                            ))}
                          </>
                        )}
                      {searchData &&
                        searchData.categorysearchResult?.length > 0 && (
                          <>
                            <h1 className="text-slate-600 text-[13px]">
                              Categories:
                            </h1>
                            <hr />
                            {searchData.categorysearchResult.map((item, i) => (
                              <Link
                                href={`/search?category=${item?.name}&_id=${item?._id}`}
                                key={i}
                              >
                                <div className=" flex gap-2 items-center m-1 py-1 px-3 text-[12px] text-gray-500 hover:text-[#189669] rounded bg-slate-100 cursor-pointer hover:bg-[#d1fae5]">
                                  <img
                                    src={item?.icon}
                                    alt="product"
                                    width={25}
                                    height={25}
                                  />
                                  <p>{item.name}</p>
                                </div>
                              </Link>
                            ))}
                          </>
                        )}
                      {searchRes || (
                        <div className="flex gap-2 items-center m-1 py-1 px-3 text-[12px] text-gray-500 rounded bg-slate-100 cursor-pointer">
                          <p>Do enquiry if product is not available </p>
                          <button
                            onClick={() => setModalOpenEnquiry(true)}
                            className="py-1 px-3 rounded bg-gray-800 text-white"
                          >
                            Enquiry
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="hidden md:hidden md:items-center lg:flex xl:block absolute inset-y-0 right-0 pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              {/* notification */}
              <button
                className="relative pr-5 text-white text-2xl font-bold"
                aria-label="Alert"
                onClick={toggleNotificationDrawer}
              >
                <span className="absolute z-10 top-0 right-0 inline-flex items-center justify-center p-1 h-5 w-5 text-xs font-medium leading-none text-red-100 transform -translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full">
                  {data?.notificationDetails?.length}
                </span>
                <FiBell className="w-6 h-6 drop-shadow-xl" />
              </button>

              {/* cart */}
              
              <button
                aria-label="Total"
                onClick={toggleCartDrawer}
                className="relative px-5 text-white text-2xl font-bold"
              >
                <span className="absolute z-10 top-0 right-0 inline-flex items-center justify-center p-1 h-5 w-5 text-xs font-medium leading-none text-red-100 transform -translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full">
                  {totalItems}
                </span>
                <FiShoppingCart className="w-6 h-6 drop-shadow-xl" />
              </button>

              {/* Profile dropdown */}

              <button
                className="pl-5 text-white text-2xl font-bold"
                aria-label="Login"
              >
                {imageUrl || userInfo?.image ? (
                  <Link href="/user/dashboard">
                    <a className="relative top-1 w-6 h-6">
                      <img
                        width={29}
                        height={29}
                        src={imageUrl || userInfo?.image}
                        alt="user"
                        className="bg-white rounded-full"
                      />
                    </a>
                  </Link>
                ) : userInfo?.name ? (
                  <Link href="/user/dashboard">
                    <a className="leading-none font-bold font-serif block">
                      {userInfo?.name[0]}
                    </a>
                  </Link>
                ) : (
                  <span onClick={() => setModalOpen(!modalOpen)}>
                    <FiUser className="w-6 h-6 drop-shadow-xl" />
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* second header */}
        <NavbarPromo />
      </div>
    </>
  );
};
export default dynamic(() => Promise.resolve(Navbar), { ssr: false });
