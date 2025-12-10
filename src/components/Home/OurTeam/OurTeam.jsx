import { use } from "react";
import SectionTitleComponent from "../../Common/SectionTitle/SectionTitle";
import { container } from "../../../utils/classNames";
import { motion } from "framer-motion";

export default function OurTeamComponent({ getTeamMembers }) {
  const teamMembers = use(getTeamMembers);
  return (
    <section>
      <SectionTitleComponent
        title={"Meet our team"}
        subtitle={"Dedicated professionals working to bring you the best"}
      />
      <div
        className={`${container} max-w-6xl! sm:gap-12 gap-7 grid lg:grid-cols-3 sm:grid-cols-2 max-lg:max-w-2xl! max-sm:max-w-xs! items-center`}
      >
        {teamMembers.map((m, i) => (
          <div key={i}>
            <figure className="aspect-square overflow-hidden px-10 pt-10 pb-3 bg-linear-to-b from-transparent from-60% to-base-300 to-60%">
              <motion.img
                whileHover={{ rotate: 5 }}
                transition={{ duration: 0.5 }}
                src={m.image}
                alt=""
                className="w-full h-full object-cover rounded-xl"
              />
              <div className="border-t border-t-primary/20 mt-2 w-[85%] mx-auto"></div>
            </figure>
            <div className="bg-base-300 pb-6 rounded-b-xl pt-5">
              <h4 className="text-center text-xl text-primary">{m.name}</h4>
              <h5 className="text-center text-secondary mb-3">
                {m.designation}
              </h5>
              <h6 className="text-center text-sm text-neutral/85">
                Experience: {m.experience}
              </h6>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
