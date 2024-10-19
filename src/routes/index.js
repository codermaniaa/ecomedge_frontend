import About from "@/pages/About";
import Banner from "@/pages/Banner";
import HomePage from "@/pages/HomePage";
// import RequestPriceInvoice from "@/pages/RequestPriceInvoice";
import { lazy } from "react";

// use lazy for better code splitting
const Dashboard = lazy(() => import("@/pages/Dashboard"));
const Attributes = lazy(() => import("@/pages/Attributes"));
const ChildAttributes = lazy(() => import("@/pages/ChildAttributes"));
const Products = lazy(() => import("@/pages/Products"));
const ProductDetails = lazy(() => import("@/pages/ProductDetails"));
const Category = lazy(() => import("@/pages/Category"));
const ChildCategory = lazy(() => import("@/pages/ChildCategory"));
const Staff = lazy(() => import("@/pages/Staff"));
const Tax = lazy(() => import("@/pages/Tax"));
const Shipping = lazy(() => import("@/pages/Shipping"));
const Catalog = lazy(() => import("@/pages/Catalog"));
const Enquiry = lazy(() => import("@/pages/Enquiry"));
const RequestPrice = lazy(() => import("@/pages/RequestPrice"));
const RequestPriceInvoice = lazy(() => import("@/pages/RequestPriceInvoice"));

const Customers = lazy(() => import("@/pages/Customers"));
const CustomerOrder = lazy(() => import("@/pages/CustomerOrder"));
const Orders = lazy(() => import("@/pages/Orders"));
const OrderInvoice = lazy(() => import("@/pages/OrderInvoice"));
const Coupons = lazy(() => import("@/pages/Coupons"));
// const Setting = lazy(() => import("@/pages/Setting"));
const Page404 = lazy(() => import("@/pages/404"));
const ComingSoon = lazy(() => import("@/pages/ComingSoon"));
// const EditProfile = lazy(() => import("@/pages/EditProfile"));
import EditProfile from "@/pages/EditProfile";
const Languages = lazy(() => import("@/pages/Languages"));
const Currencies = lazy(() => import("@/pages/Currencies"));
const Setting = lazy(() => import("@/pages/Setting"));
const Contact = lazy(() => import("@/pages/Contact"));

/*
//  * ⚠ These are internal routes!
//  * They will be rendered inside the app, using the default `containers/Layout`.
//  * If you want to add a route to, let's say, a landing page, you should add
//  * it to the `App`'s router, exactly like `Login`, `CreateAccount` and other pages
//  * are routed.
//  *
//  * If you're looking for the links rendered in the SidebarContent, go to
//  * `routes/sidebar.js`
 */

const routes = [
  {
    path: "/admin/dashboard",
    component: Dashboard,
  },
  {
    path: "/admin/products",
    component: Products,
  },
  {
    path: "/admin/attributes",
    component: Attributes,
  },
  {
    path: "/admin/attributes/:id",
    component: ChildAttributes,
  },
  {
    path: "/admin/product/:id",
    component: ProductDetails,
  },
  {
    path: "/admin/categories",
    component: Category,
  },
  {
    path: "/admin/home",
    component: HomePage,
  },
  {
    path: "/admin/languages",
    component: Languages,
  },
  {
    path: "/admin/currencies",
    component: Currencies,
  },

  {
    path: "/admin/categories/:id",
    component: ChildCategory,
  },
  {
    path: "/admin/customers",
    component: Customers,
  },
  {
    path: "/admin/customer-order/:id",
    component: CustomerOrder,
  },
  {
    path: "/admin/our-staff",
    component: Staff,
  },
  {
    path: "/admin/orders",
    component: Orders,
  },
  {
    path: "/admin/order/:id",
    component: OrderInvoice,
  },
  {
    path: "/admin/requestprice/:id",
    component: RequestPriceInvoice,
  },
  {
    path: "/admin/coupons",
    component: Coupons,
  },
  { path: "/admin/settings", component: Setting },
  {
    path: "/admin/404",
    component: Page404,
  },
  {
    path: "/admin/coming-soon",
    component: ComingSoon,
  },
  {
    path: "/admin/edit-profile",
    component: EditProfile,
  },
  {
    path: "/admin/tax",
    component: Tax,
  },
  {
    path: "/admin/shipping",
    component: Shipping,
  },
  {
    path: "/admin/catalog",
    component: Catalog,
  },
  {
    path: "/admin/enquiry",
    component: Enquiry,
  },
  {
    path: "/admin/banner",
    component: Banner,
  },
  {
    path: "/admin/about",
    component: About,
  },
  {
    path: "/admin/request",
    component: RequestPrice,
  },
  {
    path: "/admin/contact",
    component: Contact,
  },
];

export default routes;
