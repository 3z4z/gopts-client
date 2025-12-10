import FooterComponent from "../../components/Common/Footer/Footer";
import HeaderComponent from "../../components/Common/Header/Header";
import errorImg from "../../assets/404.png";
import { Link, useLocation } from "react-router";
export default function ErrorPage() {
  const { pathname } = useLocation();
  return (
    <>
      {pathname.includes("-orders") ? (
        <div className="flex-1 flex flex-col items-center mt-36">
          <figure className="max-w-xl mx-auto px-10 mb-20">
            <img src={errorImg} alt="" />
          </figure>
          <Link to={"/dashboard"} className="btn btn-primary rounded-full px-8">
            Back to home
          </Link>
        </div>
      ) : (
        <div className="flex flex-col min-h-dvh">
          <HeaderComponent />
          <div className="flex-1 flex flex-col items-center mt-36">
            <figure className="max-w-xl mx-auto px-10 mb-20">
              <img src={errorImg} alt="" />
            </figure>
            <Link to={"/"} className="btn btn-primary rounded-full px-8">
              Back to home
            </Link>
          </div>
          <FooterComponent />
        </div>
      )}
    </>
  );
}
