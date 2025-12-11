import { container } from "../../../utils/classNames";
import SectionTitleComponent from "../../Common/SectionTitle/SectionTitle";
import {
  BsBoxFill,
  BsClipboardCheckFill,
  BsClipboardPlusFill,
  BsFillTruckFrontFill,
} from "react-icons/bs";

export default function WorkFlowComponent() {
  const steps = [
    {
      title: "Add your Product",
      content:
        "Register as a manager and add your products with images, details and pricing.",
      icon: <BsClipboardPlusFill className="text-secondary text-5xl" />,
    },
    {
      title: "Approve and listing",
      content:
        "Admins review and publish the product on the marketplace for buyers to see.",
      icon: <BsClipboardCheckFill className="text-secondary text-5xl" />,
    },
    {
      title: "Browse & Order",
      content:
        "Being a buyer, browse the vast list of products and order anything easily.",
      icon: <BsBoxFill className="text-secondary text-5xl" />,
    },
    {
      title: "Process & Deliver",
      content:
        "Managers handle production and ensure timely and hassle-less delivery.",
      icon: <BsFillTruckFrontFill className="text-secondary text-5xl" />,
    },
  ];
  return (
    <section>
      <SectionTitleComponent
        title={"How it works"}
        subtitle={
          "Discover how our marketplace works for managers and buyers alike"
        }
      />
      <div
        className={`grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-2 gap-6 ${container}`}
      >
        {steps.map((step, index) => (
          <div
            data-aos="fade-right"
            data-aos-delay={index * 500}
            key={index}
            className="flex flex-col items-center text-center hover:bg-base-200 px-4 py-7 rounded-xl cursor-pointer transition-all"
          >
            {step.icon}
            <h4 className="text-primary text-xl mt-5 mb-3">{step.title}</h4>
            <p className="text-neutral/75">{step.content}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
