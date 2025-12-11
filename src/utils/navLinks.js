import { FiUsers } from "react-icons/fi";
import { TbRotateClockwise2 } from "react-icons/tb";
import {
  LuBox,
  LuBoxes,
  LuClipboardCheck,
  LuClipboardList,
  LuCog,
  LuLayoutDashboard,
  LuUser,
  LuUserRoundCog,
  LuUsers,
} from "react-icons/lu";
import { MdOutlineAddBox, MdOutlinePendingActions } from "react-icons/md";
import { FaFacebookF, FaInstagram, FaXTwitter } from "react-icons/fa6";

export const headerNavLinks = [
  { title: "Home", path: "/" },
  { title: "All Products", path: "/products" },
  { title: "About Us", path: "/about-us" },
  { title: "Dashboard", path: "/dashboard", isPrivate: true },
];

export const footerNavLinks = [
  { title: "Join Us", path: "/auth/register" },
  { title: "Privacy & Policy", path: "/privacy-policy" },
  { title: "About Us", path: "/about-us" },
  { title: "FaQ", path: "/faq" },
];

export const footerNavSocialLinks = [
  { path: "https://fb.com", icon: FaFacebookF },
  { path: "https://x.com/", icon: FaXTwitter },
  { path: "https://www.instagram.com/", icon: FaInstagram },
];

export const userDdLinks = [
  { title: "My Profile", path: "/dashboard/my-profile", icon: LuUser },
  {
    title: "Manage Users",
    path: "/dashboard/manage-users",
    icon: FiUsers,
    access: "admin",
  },
  {
    title: "All Products",
    path: "/dashboard/all-products",
    icon: LuBox,
    access: "admin",
  },
  {
    title: "Pending Orders",
    path: "/dashboard/pending-orders",
    icon: TbRotateClockwise2,
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
    icon: LuClipboardList,
    access: "buyer",
  },
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
