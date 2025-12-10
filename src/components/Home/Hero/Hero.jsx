import { Link } from "react-router";
import { container } from "../../../utils/classNames";
import heroImg from "../../../assets/hero.png";
import { motion, scale } from "framer-motion";

export default function HeroComponent() {
  return (
    <section className="bg-base-100 lg:py-24 pt-24 pb-0 xl:mt-24 lg:mt-18 md:mt-12 mt-4">
      <div className={`${container} grid lg:grid-cols-2 gap-16 h-max`}>
        <div>
          <motion.h1
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="xl:text-6xl text-5xl flex flex-col gap-4 text-primary mb-3 xl:leading-18 leading-14"
          >
            Garments Order & <br /> Production Tracker System
          </motion.h1>
          <motion.h3
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="xl:text-2xl text-xl text-secondary"
          >
            Manage Garment Orders & Production — From Order to Delivery
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="my-10"
          >
            Track buyer orders, monitor production stages (cutting → sewing →
            finishing), manage teams & supervisors, and ensure every shipment is
            delivered on time — with real-time visibility across your factory.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.5,
              delay: 1.5,
              type: "spring",
              stiffness: 300,
              damping: 15,
            }}
          >
            <Link
              to={"/auth/register"}
              className="btn btn-primary text-lg rounded-full h-auto py-2.5 px-12"
            >
              Start your tour
            </Link>
          </motion.div>
        </div>
        <motion.figure
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay: 0.5,
            duration: 1.5,
            scale: { type: "spring", visualDuration: 1, bounce: 0.5 },
          }}
          className="w-full aspect-video rounded-2xl overflow-hidden"
        >
          <img src={heroImg} alt="" className="" />
        </motion.figure>
      </div>
    </section>
  );
}
