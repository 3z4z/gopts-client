import Marquee from "react-fast-marquee";
import SectionTitleComponent from "../../Common/SectionTitle/SectionTitle";
import adidasLogo from "../../../assets/brands/adidas.svg";
import burberryLogo from "../../../assets/brands/burberry.svg";
import dngLogo from "../../../assets/brands/dng.svg";
import gucciLogo from "../../../assets/brands/gucci.svg";
import hermesLogo from "../../../assets/brands/hermes.svg";
import louisLogo from "../../../assets/brands/louis.svg";
import nikeLogo from "../../../assets/brands/nike.svg";
import wranglerLogo from "../../../assets/brands/wrangler.svg";
import { container } from "../../../utils/classNames";
export default function PartnersComponent() {
  const brands = [
    adidasLogo,
    burberryLogo,
    dngLogo,
    gucciLogo,
    hermesLogo,
    louisLogo,
    nikeLogo,
    wranglerLogo,
  ];
  return (
    <section className={container}>
      <SectionTitleComponent
        title={"Our Partners"}
        subtitle={"Building success together with our trusted partners"}
      />
      <Marquee>
        {brands.map((b, i) => (
          <figure
            key={i}
            className="h-12 mx-10 w-max flex items-center justify-center"
          >
            <img src={b} alt="" className="h-full" />
          </figure>
        ))}
      </Marquee>
    </section>
  );
}
