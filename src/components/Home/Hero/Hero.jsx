import { Link } from "react-router";
import { container } from "../../../utils/classNames";
import heroImg from "../../../assets/gopts-hero.jpg";
export default function HeroComponent() {
  return (
    <section className="bg-base-100 py-24 mt-24">
      <div className={`${container} grid grid-cols-2 gap-16 h-max`}>
        <div>
          <h1 className="text-6xl flex flex-col gap-4 text-primary mb-3 leading-18">
            Garments Order & <br /> Production Tracker System
          </h1>
          <h3 className="text-2xl text-secondary">
            Manage Garment Orders & Production — From Order to Delivery
          </h3>
          <p className="my-10">
            Track buyer orders, monitor production stages (cutting → sewing →
            finishing), manage teams & supervisors, and ensure every shipment is
            delivered on time — with real-time visibility across your factory.
          </p>
          <Link
            to={"/auth/register"}
            className="btn btn-primary text-lg rounded-full h-auto py-2.5 px-12"
          >
            Start your tour
          </Link>
        </div>
        <figure className="w-full aspect-video bg-base-200 rounded-2xl overflow-hidden shadow-lg shadow-primary/20">
          <img src={heroImg} alt="" />
        </figure>
      </div>
    </section>
  );
}
