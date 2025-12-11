import { Suspense, useEffect } from "react";
import { container } from "../../../utils/classNames";
import PageLoader from "../../Common/Loaders/PageLoader";
import PrivacyPolicies from "./PrivacyPolicies";
import SectionTitleComponent from "../../Common/SectionTitle/SectionTitle";
import { scrollUp } from "../../../utils/scrollUp";

export default function PrivacyPolicyPage() {
  const getPolicies = () =>
    fetch("/data/privacyPolicy.json").then((res) => res.json());
  useEffect(() => {
    scrollUp();
  }, []);
  return (
    <>
      <div className={`${container} mt-26`}>
        <div className="bg-base-100 rounded-2xl shadow-lg sm:p-8 p-4 md:p-12">
          <SectionTitleComponent
            title={"Privacy and Policy"}
            subtitle={
              "This section explains in detail how the Garments Order & Production Tracker System collects, uses, stores, and protects your personal and business information, ensuring transparency, security, and responsible handling of all data shared within the platform."
            }
          />
          <Suspense fallback={<PageLoader />}>
            <PrivacyPolicies getPolicies={getPolicies()} />
          </Suspense>
        </div>
      </div>
    </>
  );
}
