import { Outlet } from "react-router";
import { RiMenuFold2Line, RiMenuFoldLine } from "react-icons/ri";

import DashboardSidebar from "../components/Common/DashboardSidebar/DashboardSidebar";
import { useRef, useState } from "react";
import DashboardHeader from "../components/Common/DashboardHeader/DashboardHeader";

export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const handleToggle = () => setIsSidebarOpen(sidebarRef.current.checked);
  return (
    <div className="drawer lg:drawer-open">
      <input
        id="dashboard"
        type="checkbox"
        className="drawer-toggle"
        ref={sidebarRef}
        onChange={handleToggle}
      />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <nav className="navbar w-full bg-base-300">
          <label
            htmlFor="dashboard"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost"
          >
            {/* Sidebar toggle icon */}
            {isSidebarOpen ? (
              <RiMenuFoldLine className="text-xl" />
            ) : (
              <RiMenuFold2Line className="text-xl" />
            )}
          </label>
          <DashboardHeader />
        </nav>
        {/* Page content here */}
        <div className="p-4 flex-1">
          <Outlet />
        </div>
      </div>
      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="dashboard"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="flex min-h-full flex-col items-start bg-base-300 is-drawer-close:w-14 is-drawer-open:w-64">
          <DashboardSidebar isSidebarOpen={isSidebarOpen} />
        </div>
      </div>
    </div>
  );
}
