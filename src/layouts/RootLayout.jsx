import { Outlet } from "react-router";
import HeaderComponent from "../components/Common/Header/Header";
import FooterComponent from "../components/Common/Footer/Footer";

export default function RootLayout() {
  return (
    <div className="flex flex-col min-h-dvh">
      <HeaderComponent />
      <div className="flex-1">
        <Outlet />
      </div>
      <FooterComponent />
    </div>
  );
}
