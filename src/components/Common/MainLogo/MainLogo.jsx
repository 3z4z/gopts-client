import { GiBigGear } from "react-icons/gi";
import "./MainLogo.css";
import { Link } from "react-router";

export default function MainLogoComponent({ mainColor, subColor }) {
  return (
    <Link to={"/"} className={`logo font-bold ${mainColor} flex items-center`}>
      <GiBigGear className="text-3xl me-1.5" />
      <span className="text-2xl flex gap-px">
        GO <span className={subColor || ""}>PTS</span>
      </span>
    </Link>
  );
}
