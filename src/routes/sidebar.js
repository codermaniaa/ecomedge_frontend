import {
  FiGrid,
  FiUsers,
  FiUser,
  FiCompass,
  FiSettings,
  FiSlack,
  FiGlobe,
  FiTarget,
  FiHome,
} from "react-icons/fi";

import { PiMoneyLight } from "react-icons/pi";
import { FaShippingFast } from "react-icons/fa";
import { BiSolidBookReader } from "react-icons/bi";
import { TbUserQuestion } from "react-icons/tb";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { IoPricetags } from "react-icons/io5";
import { IoMdContact } from "react-icons/io";

/**
 * ⚠ These are used just to render the Sidebar!
 * You can include any link here, local or external.
 *
 * If you're looking to actual Router routes, go to
 * `routes/index.js`
 */
const sidebar = [
  {
    path: "/admin/dashboard", // the url
    icon: FiGrid, // icon
    name: "Dashboard", // name that appear in Sidebar
  },

  {
    icon: MdOutlineProductionQuantityLimits,
    name: "Product Manager",
    routes: [
      {
        path: "/admin/products",
        name: "Products",
      },
      {
        path: "/admin/categories",
        name: "Categories",
      },
      {
        path: "/admin/attributes",
        name: "Attributes",
      },
      {
        path: "/admin/coupons",
        name: "Coupons",
      },
    ],
  },
  {
    icon: FiHome,
    name: "Customization",
    routes: [
      {
        name: "Home page",
        path: "/admin/home",
      },
      {
        name: "Promotional banner",
        path: "/admin/banner",
      },
      {
        name: "About us",
        path: "/admin/about",
      },
    ],
  },
  {
    path: "/admin/customers",
    icon: FiUsers,
    name: "Customers",
  },
  {
    path: "/admin/orders",
    icon: FiCompass,
    name: "Orders",
  },

  {
    path: "/admin/our-staff",
    icon: FiUser,
    name: "OurStaff",
  },

  {
    path: "/admin/settings",
    icon: FiSettings,
    name: "StoreSetting",
  },
  {
    path: "/admin/tax",
    icon: PiMoneyLight,
    name: "Tax Details",
  },
  {
    path: "/admin/shipping",
    icon: FaShippingFast,
    name: "Shipping",
  },
  {
    path: "/admin/catalog",
    icon: BiSolidBookReader,
    name: "Catalog",
  },
  {
    path: "/admin/enquiry",
    icon: TbUserQuestion,
    name: "Enquiry",
  },
  {
    path: "/admin/request",
    icon: IoPricetags,
    name: "Request Price",
  },
  {
    path: "/admin/contact",
    icon: IoMdContact,
    name: "Contact",
  },

  // {
  //   icon: FiGlobe,
  //   name: "International",
  //   routes: [
  //     {
  //       path: "/languages",
  //       name: "Languages",
  //     },
  //     {
  //       path: "/currencies",
  //       name: "Currencies",
  //     },
  //   ],
  // },
  {
    icon: FiTarget,
    name: "ViewStore",
    path: "http://localhost:3000",
    outside: "store",
  },

  {
    icon: FiSlack,
    name: "Pages",
    routes: [
      // submenu

      {
        path: "/404",
        name: "404",
      },
      {
        path: "/coming-soon",
        name: "Coming Soon",
      },
    ],
  },
];

export default sidebar;
