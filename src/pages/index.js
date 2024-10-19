import { SidebarContext } from "@context/SidebarContext";
import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";

//internal import
import useAsync from "@hooks/useAsync";
import CouponServices from "@services/CouponServices";
import Layout from "@layout/Layout";
import Banner from "@component/banner/Banner";
import useGetSetting from "@hooks/useGetSetting";
import CardTwo from "@component/cta-card/CardTwo";
import OfferCard from "@component/offer/OfferCard";
import StickyCart from "@component/cart/StickyCart";
import Loading from "@component/preloader/Loading";
import ProductServices from "@services/ProductServices";
import ProductCard from "@component/product/ProductCard";
import MainCarousel from "@component/carousel/MainCarousel";
import FeatureCategory from "@component/category/FeatureCategory";
import AttributeServices from "@services/AttributeServices";
import CMSkeleton from "@component/preloader/CMSkeleton";
import PromotionalBannerCarousel from "@component/carousel/PromotionalBannerCarousel";
// import image from "/lineart.png"
const Home = ({
  popularProducts,
  discountProducts,
  fetureproduct,
  attributes,
}) => {
  const router = useRouter();
  const { isLoading, setIsLoading } = useContext(SidebarContext);
  const { loading, error, storeCustomizationSetting } = useGetSetting();

  const { data } = useAsync(CouponServices.getShowingCoupons);

  useEffect(() => {
    if (router.asPath === "/") {
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, [router]);

  return (
    <>
      {isLoading ? (
        <Loading loading={isLoading} />
      ) : (
        <Layout>
          <div className="min-h-screen">
            <StickyCart />
            <div className="bg-white">
              <div className="mx-auto py-4 w-full">
                <div className="flex w-full">
                  <div
                    className={`flex-shrink-0 xl:pr-0 lg:block w-full`}
                  >
                    <MainCarousel />
                  </div>
                  {/* {data?.length > 0 && (
                    <div className="w-full hidden lg:flex">
                      <OfferCard />
                    </div>
                  )} */}
                </div>
                {/* {storeCustomizationSetting?.home?.promotion_banner_status && (
                  <div className="bg-orange-100 px-10 py-6 rounded-lg mt-6">
                    <Banner />
                  </div>
                )} */}
              </div>
            </div>

            {/* Coupon Code  */}
            {data?.length > 0 && (
              <div className="w-full hidden lg:flex">
                <OfferCard />
              </div>
            )}

            {/* feature category's */}
            {storeCustomizationSetting?.home?.featured_status && (
              // <div className="bg-gray-100 lg:py-16 py-10">
              //   <div className="mx-auto max-w-screen-2xl px-3 sm:px-10">
              //     <div className="mb-10 flex justify-center">
              //       <div className="text-center w-full lg:w-2/5">
              //         <h2 className="text-xl lg:text-2xl mb-2 font-serif font-semibold">
              //           <CMSkeleton
              //             count={1}
              //             height={30}
              //             // error={error}
              //             loading={loading}
              //             data={storeCustomizationSetting?.home?.feature_title}
              //           />
              //         </h2>
              //         <p className="text-base font-sans text-gray-600 leading-6">
              //           <CMSkeleton
              //             count={4}
              //             height={10}
              //             error={error}
              //             loading={loading}
              //             data={
              //               storeCustomizationSetting?.home?.feature_description
              //             }
              //           />
              //         </p>
              //       </div>
              //     </div>

              //     <FeatureCategory />
              //   </div>
              // </div>
              <div className="bg-gray-100 lg:py-16 py-10">
                <section id="shopify-section-template" className="bg-gray-100 lg:py-16  shopify-section section">
                  <div className="page-width page-width--full-width section--padding">
                    <div className="slideshow slideshow--only1 slideshow--modern slideshow--adapt_first slideshow--mobile-adapt_first slideshow--mobile-overlay">

                      <div className="slideshow__center center mobile-left page-width"></div>

                      {/* trending text */}
                      {/* <div className="slideshow__right">
                        <div className="slideshow__slide is-selected">
                          <div className="slideshow__image-wrapper media-wrapper">
                            <div className="slideshow__image media media--adapt_first media-mobile--adapt_first" style={{ '--image-position': 'center center' }}>
                              <img
                                src="//sudathi.com/cdn/shop/files/27_25309c0c-1e81-4d25-a970-b5760ff0a362.jpg?v=1713878871&width=3840"
                                alt=""
                                srcSet="
                              //sudathi.com/cdn/shop/files/7_25309c0c-1e81-4d25-a970-b5760ff0a362.jpg?v=1713878871&width=375 375w,
                              //sudathi.com/cdn/shop/files/7_25309c0c-1e81-4d25-a970-b5760ff0a362.jpg?v=1713878871&width=750 750w,
                              //sudathi.com/cdn/shop/files/7_25309c0c-1e81-4d25-a970-b5760ff0a362.jpg?v=1713878871&width=1100 1100w,
                              //sudathi.com/cdn/shop/files/7_25309c0c-1e81-4d25-a970-b5760ff0a362.jpg?v=1713878871&width=1500 1500w,
                              //sudathi.com/cdn/shop/files/7_25309c0c-1e81-4d25-a970-b5760ff0a362.jpg?v=1713878871&width=1780 1780w,
                              //sudathi.com/cdn/shop/files/7_25309c0c-1e81-4d25-a970-b5760ff0a362.jpg?v=1713878871&width=2000 2000w,
                              //sudathi.com/cdn/shop/files/7_25309c0c-1e81-4d25-a970-b5760ff0a362.jpg?v=1713878871&width=3000 3000w,
                              //sudathi.com/cdn/shop/files/7_25309c0c-1e81-4d25-a970-b5760ff0a362.jpg?v=1713878871&width=3840 3840w
                            "
                                width="3840"
                                height="300"
                                loading="lazy"
                                className="small-hide"
                                sizes="100vw"
                              />

                            </div>
                          </div>
                        </div>
                      </div> */}
                      <div className="relative w-full h-32 lg:h-48 flex items-center justify-between">
                        <div className="absolute inset-0 flex items-center justify-between">
                          {/* Left Image */}
                          <img
                            src={"/logo/lineart4.png"}
                            alt="Left Image"
                            className="w-1/3 h-full object-cover"
                            style={{ width: "9%", height: "69px" }}
                          />
                          {/* Middle Text */}
                          <h1 className="z-2 text-gray-800 text-xl lg:text-5xl font-bold text-center mx-0 ">
                            Trending Categories
                          </h1>

                          {/* Right Mirrored Image */}
                          <img
                            src={"/logo/lineart4.png"}
                            alt="Right Image"
                            className="w-1/3 h-full object-cover transform scale-x-[-1]"
                            style={{ width: "9%", height: "69px" }}
                          />
                        </div>
                      </div>

                    </div>
                  </div>
                </section>
                <FeatureCategory />
              </div>

            )}

            {/* popular products */}
            {storeCustomizationSetting?.home?.popular_products_status && (
              <div className="bg-gray-50 lg:py-16 py-10 mx-auto max-w-screen-2xl px-3 sm:px-10">
                <div className="mb-10 flex justify-center">
                  <div className="text-center w-full lg:w-2/5">
                    <h2 className="text-xl lg:text-2xl mb-2 font-serif font-semibold">
                      <CMSkeleton
                        count={1}
                        height={30}
                        // error={error}
                        loading={loading}
                        data={storeCustomizationSetting?.home?.popular_title}
                      />
                    </h2>
                    <p className="text-base font-sans text-gray-600 leading-6">
                      <CMSkeleton
                        count={5}
                        height={10}
                        error={error}
                        loading={loading}
                        data={
                          storeCustomizationSetting?.home?.popular_description
                        }
                      />
                    </p>
                  </div>
                </div>
                <div className="flex">
                  <div className="w-full">
                    {loading ? (
                      <CMSkeleton
                        count={20}
                        height={20}
                        error={error}
                        loading={loading}
                      />
                    ) : (
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-6 gap-2 md:gap-3 lg:gap-3">
                        {popularProducts
                          ?.slice(
                            0,
                            storeCustomizationSetting?.home
                              ?.popular_product_limit
                          )
                          .map((product) => (
                            <ProductCard
                              key={product._id}
                              product={product}
                              attributes={attributes}
                            />
                          ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
            <PromotionalBannerCarousel />

            {/* promotional banner card */}
            {/* {storeCustomizationSetting?.home?.delivery_status && (
              <div className="block mx-auto max-w-screen-2xl">
                <div className="mx-auto max-w-screen-2xl px-4 sm:px-10">
                  <div className="lg:p-16 p-6 bg-gray-800 shadow-sm border rounded-lg">
                    <CardTwo />
                  </div>
                </div>
              </div>
            )} */}

            {/* discounted products */}
            {storeCustomizationSetting?.home?.discount_product_status && (
              <div
                id="discount"
                className="bg-gray-50 lg:py-16 py-10 mx-auto max-w-screen-2xl px-3 sm:px-10"
              >
                <div className="mb-10 flex justify-center">
                  <div className="text-center w-full lg:w-2/5">
                    <h2 className="text-xl lg:text-2xl mb-2 font-serif font-semibold">
                      <CMSkeleton
                        count={1}
                        height={30}
                        // error={error}
                        loading={loading}
                        data={
                          storeCustomizationSetting?.home?.latest_discount_title
                        }
                      />
                    </h2>
                    <p className="text-base font-sans text-gray-600 leading-6">
                      <CMSkeleton
                        count={5}
                        height={20}
                        // error={error}
                        loading={loading}
                        data={
                          storeCustomizationSetting?.home
                            ?.latest_discount_description
                        }
                      />
                    </p>
                  </div>
                </div>
                <div className="flex">
                  <div className="w-full">
                    {loading ? (
                      <CMSkeleton
                        count={20}
                        height={20}
                        error={error}
                        loading={loading}
                      />
                    ) : (
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-6 gap-2 md:gap-3 lg:gap-3">
                        {discountProducts
                          ?.slice(
                            0,
                            storeCustomizationSetting?.home
                              ?.latest_discount_product_limit
                          )
                          .map((product) => (
                            <ProductCard
                              key={product._id}
                              product={product}
                              attributes={attributes}
                            />
                          ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* fetureproduct */}
            {/* <div
              id="discount"
              className="bg-gray-50 lg:py-16 py-10 mx-auto max-w-screen-2xl px-3 sm:px-10"
            >
              <div className="mb-10 flex justify-center">
                <div className="text-center w-full lg:w-2/5">
                  <h2 className="text-xl lg:text-2xl mb-2 font-serif font-semibold">
                    FEATURE PRODUCT'S
                  </h2>
                  <p className="text-base font-sans text-gray-600 leading-6"></p>
                </div>
              </div>
              <div className="flex">
                <div className="w-full">
                  {loading ? (
                    <CMSkeleton
                      count={20}
                      height={20}
                      error={error}
                      loading={loading}
                    />
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-3 2xl:grid-cols-3 gap-2 md:gap-3 lg:gap-3">
                      {fetureproduct.slice(0, 6).map(
                        (products, index) =>
                          products.products.length >= 2 && (
                            <div
                              key={index}
                              className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-2 gap-2 md:gap-3 lg:gap-3"
                            >
                              {products.products.slice(0, 2).map((item, i) => (
                                <div className="mt-3" key={i}>
                                  <ProductCard
                                    key={item._id}
                                    product={item}
                                    attributes={attributes}
                                  />
                                </div>
                              ))}
                            </div>
                          )
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div> */}

            {/* footer banner  */}
            <div
              id="downloadApp"
              className="bg-indigo-50 py-10 lg:py-16 bg-repeat bg-center overflow-hidden"
            >
              <div className="max-w-screen-2xl mx-auto px-4 sm:px-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-2 md:gap-3 lg:gap-3 items-center">
                  {/* Left Image */}
                  <div className="hidden md:flex md:justify-center lg:justify-start">
                    <img
                      alt="app download"
                      fetchpriority="high"
                      width="500"
                      height="394"
                      decoding="async"
                      className="block w-auto"
                      srcSet="/logo/banner1.png"
                      src="/logo/banner1.png"
                      style={{ color: 'transparent' }}
                    />
                  </div>

                  {/* Text and Download Links */}
                  <div className="text-center">
                    <h3 className="text-xl md:text-2xl lg:text-3xl font-bold font-serif mb-3">
                      Get Your Daily Needs From Our EcommEdge Store
                    </h3>
                    <p className="text-base opacity-90 leading-7">
                      There are many products you will find in our shop, Choose your
                      daily necessary product from our EcommEdge shop and get some
                      special offers.
                    </p>
                    {/* <div className="mt-8 flex justify-center">
              <a
                className="mx-2"
                target="_blank"
                rel="noreferrer"
                href="https://www.apple.com/app-store/"
              >
                <img
                  alt="app store"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto"
                  src="https://res.cloudinary.com/ahossain/image/upload/v1697688165/settings/app-store_cyyc0f.svg"
                  style={{ color: 'transparent' }}
                />
              </a>
              <a
                target="_blank"
                rel="noreferrer"
                href="https://play.google.com/store/games?utm_source=apac_med&amp;utm_medium=hasem&amp;utm_content=Jun0122&amp;utm_campaign=Evergreen&amp;pcampaignid=MKT-EDR-apac-lk-1003227-med-hasem-py-Evergreen-Jun0122-Text_Search_BKWS-BKWS%7CONSEM_kwid_43700071429441653_creativeid_600975795576_device_c&amp;gclid=CjwKCAjwwo-WBhAMEiwAV4dybdy60tnQqCSnQ-cXShNnEcxmaBx2I6iwwc_WEqoA5sN9YSLJEXh9fBoC3u4QAvD_BwE&amp;gclsrc=aw.ds"
              >
                <img
                  alt="play store"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto"
                  src="https://res.cloudinary.com/ahossain/image/upload/v1697688167/settings/play-store_cavwua.svg"
                  style={{ color: 'transparent' }}
                />
              </a>
            </div> */}
                  </div>

                  {/* Right Image */}
                  <div className="hidden lg:flex justify-end">
                    <img
                      alt="app download"
                      fetchpriority="high"
                      width="500"
                      height="394"
                      decoding="async"
                      className="block w-auto"
                      srcSet="/logo/banner2.png"
                      src="/logo/banner2.png"
                      style={{ color: 'transparent' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Layout>
      )}
    </>
  );
};

export const getServerSideProps = async (context) => {
  const { cookies } = context.req;
  const { query, _id } = context.query;

  const [data, attributes] = await Promise.all([
    ProductServices.getShowingStoreProducts({
      category: _id ? _id : "",
      title: query ? query : "",
    }),

    AttributeServices.getShowingAttributes(),
  ]);
  console.log("getShowingStoreProducts", data);

  const popularProducts = data?.products.filter((p) => p.prices.discount >= 1);
  console.log("popularProducts", data);
  const discountProducts = data?.products.filter(
    (p) => p.prices?.discount >= 1
  );
  console.log("discountProducts", data);
  const fetureproduct = data?.fetureproduct;

  return {
    props: {
      popularProducts: popularProducts.slice(0, 50),
      discountProducts: discountProducts,
      fetureproduct: fetureproduct,
      cookies: cookies,
      attributes,
    },
  };
};

export default Home;
