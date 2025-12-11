import { Link } from "react-router";
import { footerNavSocialLinks } from "../../../utils/navLinks";

export default function SocialNavComponent() {
  return (
    <nav className="flex gap-4 mt-6">
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
  );
}
