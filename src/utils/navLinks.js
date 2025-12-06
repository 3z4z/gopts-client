import { FaClipboardUser } from "react-icons/fa6";
import {
  LuBoxes,
  LuClipboardCheck,
  LuClipboardList,
  LuCog,
  LuLayoutDashboard,
  LuUserRoundCog,
  LuUsers,
} from "react-icons/lu";
import { MdOutlineAddBox, MdOutlinePendingActions } from "react-icons/md";

export const headerNavLinks = [
  { title: "Home", path: "/" },
  { title: "All Products", path: "/products" },
  { title: "About Us", path: "/about-us" },
  { title: "Dashboard", path: "/dashboard", isPrivate: true },
];

export const footerNavLinks = [
  { title: "Join Us", link: "/auth/register" },
  { title: "Privacy & Policy", link: "/privacy-policy" },
  { title: "About Us", link: "/about-us" },
  { title: "FaQ", link: "/faq" },
];

export const userDdLinks = [
  { title: "My Orders", path: "/dashboard/my-orders", icon: FaClipboardUser },
];

export const dashboardSidebarLinks = [
  { title: "Dashboard Home", path: "/dashboard/home", icon: LuLayoutDashboard },
  {
    title: "Manage Users",
    path: "/dashboard/manage-users",
    icon: LuUsers,
    access: "admin",
  },
  {
    title: "All Products",
    path: "/dashboard/all-products",
    icon: LuBoxes,
    access: "admin",
  },
  {
    title: "All Orders",
    path: "/dashboard/all-orders",
    icon: LuClipboardList,
    access: "admin",
  },
  {
    title: "Add Product",
    path: "/dashboard/add-product",
    icon: MdOutlineAddBox,
    access: "manager",
  },
  {
    title: "Manage Products",
    path: "/dashboard/manage-products",
    icon: LuCog,
    access: "manager",
  },
  {
    title: "Pending Orders",
    path: "/dashboard/pending-orders",
    icon: MdOutlinePendingActions,
    access: "manager",
  },
  {
    title: "Approved Orders",
    path: "/dashboard/approved-orders",
    icon: LuClipboardCheck,
    access: "manager",
  },
  {
    title: "My Orders",
    path: "/dashboard/my-orders",
    icon: LuBoxes,
    access: "buyer",
  },
  { title: "My Profile", path: "/dashboard/my-profile", icon: LuUserRoundCog },
];
