import { Link } from "react-router";
import { container } from "../../../utils/classNames";
import { footerNavLinks, footerNavSocialLinks } from "../../../utils/navLinks";
import MainLogoComponent from "../MainLogo/MainLogo";

export default function FooterComponent() {
  return (
    <footer className="mt-24 bg-base-300 pt-24 pb-6">
      <div className={`${container} flex flex-col items-center`}>
        <MainLogoComponent
          mainColor={"text-primary"}
          subColor={"text-secondary"}
        />
        <h2 className="text-lg text-neutral">
          Garments Order & Production Tracker System
        </h2>
        <p className="text-neutral/75 max-w-xl text-center py-10">
          Track buyer orders, monitor production stages (cutting → sewing →
          finishing), manage teams & supervisors, and ensure every shipment is
          delivered on time — with real-time visibility across your factory.
        </p>
        <nav className="flex gap-4">
          {footerNavLinks.map((link, index) => (
            <Link
              key={index}
              to={link.path}
              className="link link-hover link-neutral font-bold hover:text-primary"
            >
              {link.title}
            </Link>
          ))}
        </nav>
        <nav className="flex gap-4 mt-8">
          {footerNavSocialLinks.map((link, index) => (
            <Link
              key={index}
              to={link.path}
              className="btn w-9 h-9 rounded-full p-0 btn-primary"
            >
              <link.icon className="text-[1rem]" />
            </Link>
          ))}
        </nav>
      </div>
      <p className="text-center text-neutral/70 border-t border-t-neutral/10 pt-6 mt-18">
        © 2025 GOPTS. All rights reserved.
      </p>
    </footer>
  );
}
