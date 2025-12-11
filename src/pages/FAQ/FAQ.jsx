import { Suspense, useEffect } from "react";
import SectionTitleComponent from "../../components/Common/SectionTitle/SectionTitle";
import { container } from "../../utils/classNames";
import PageLoader from "../../components/Common/Loaders/PageLoader";
import FaqAccordions from "./FaqAccordions";
import { scrollUp } from "../../utils/scrollUp";

export default function FAQPage() {
  const getFaqs = () => fetch("/data/faq.json").then((res) => res.json());
  useEffect(() => {
    scrollUp();
  }, []);
  return (
    <>
      <div className={`${container} mt-26`}>
        <title>FAQ | GOPTS</title>
        <div className="bg-base-100 rounded-2xl shadow-lg sm:p-8 p-4 md:p-12">
          <SectionTitleComponent
            title={"General Questions"}
            subtitle={
              "Understand the purpose, goals, and overall benefits of using the Garments Order & Production Tracker System for your factory operations."
            }
          />
          <div className="max-w-5xl mx-auto w-full">
            <Suspense fallback={<PageLoader />}>
              <FaqAccordions getFaqs={getFaqs()} />
            </Suspense>
          </div>
        </div>
      </div>
    </>
  );
}
