import { Outlet } from "react-router";
import HeaderComponent from "../components/Common/Header/Header";
import FooterComponent from "../components/Common/Footer/Footer";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
import "swiper/css/thumbs";
import "swiper/css/free-mode";

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
