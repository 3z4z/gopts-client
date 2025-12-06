import { BiExit } from "react-icons/bi";
import { FaClipboardUser } from "react-icons/fa6";

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
