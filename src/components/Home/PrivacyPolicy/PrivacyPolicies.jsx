import { use } from "react";
import { BiTime, BiUser } from "react-icons/bi";

export default function PrivacyPolicies({ getPolicies }) {
  const policyObj = use(getPolicies);

  return (
    <div className="px-4 md:px-10 lg:px-20 py-10 max-w-6xl mx-auto">
      <h1 className="text-3xl text-primary text-center font-semibold">
        Privacy Policy for {policyObj.projectName}
      </h1>

      <div className="mt-12">
        <div>
          <h4 className="text-secondary border-b pb-1 pe-3 border-b-neutral/20 mb-4 w-max text-xl">
            Updated by
          </h4>
          <div className="flex flex-col md:flex-row gap-2 md:gap-6 items-start md:items-center mb-2">
            <div className="flex gap-2 items-center">
              <BiUser className="w-7 h-7 rounded-full p-1 shadow-lg border border-neutral/8" />
              <p>{policyObj.updatedBy}</p>
            </div>
            <div className="flex gap-2 items-center">
              <BiTime className="w-7 h-7 rounded-full p-1 shadow-lg border border-neutral/8" />
              <p>{policyObj.lastUpdated}</p>
            </div>
          </div>
        </div>
        <div>
          <section className="pt-10!">
            <h4 className="text-secondary border-b pb-1 pe-3 border-b-neutral/20 mb-4 w-max text-xl">
              Introduction
            </h4>
            <p className="text-neutral/80 mb-2">
              {policyObj.privacyPolicy.introduction.description}
            </p>
            <p className="text-neutral/80 italic">
              {policyObj.privacyPolicy.introduction.agreement}
            </p>
          </section>
          <section className="pt-10!">
            <h4 className="text-secondary border-b pb-1 pe-3 border-b-neutral/20 mb-4 w-max text-xl">
              Information We Collect
            </h4>

            {Object.entries(policyObj.privacyPolicy.informationWeCollect).map(
              ([key, values]) => (
                <div key={key} className="mb-4">
                  <h5 className="text-primary mb-1 capitalize">
                    {key.replace(/([A-Z])/g, " $1")}
                  </h5>
                  <ul className="list-disc list-inside text-neutral/80">
                    {values.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              )
            )}
          </section>
          <section className="pt-10!">
            <h4 className="text-secondary border-b pb-1 pe-3 border-b-neutral/20 mb-4 w-max text-xl">
              How We Use Information
            </h4>
            <ul className="list-disc list-inside text-neutral/80">
              {policyObj.privacyPolicy.howWeUseInformation.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </section>
          <section className="pt-10!">
            <h4 className="text-secondary border-b pb-1 pe-3 border-b-neutral/20 mb-4 w-max text-xl">
              Data Storage & Security
            </h4>
            <p className="text-neutral/80 mb-2">
              {policyObj.privacyPolicy.dataStorageAndSecurity.note}
            </p>
            <ul className="list-disc list-inside text-neutral/80">
              {policyObj.privacyPolicy.dataStorageAndSecurity.measures.map(
                (item, i) => (
                  <li key={i}>{item}</li>
                )
              )}
            </ul>
          </section>
          <section className="pt-10!">
            <h4 className="text-secondary border-b pb-1 pe-3 border-b-neutral/20 mb-4 w-max text-xl">
              Cookies & Tracking
            </h4>
            <p className="text-neutral/80 mb-2">
              {policyObj.privacyPolicy.cookiesAndTracking.optional}
            </p>
            <ul className="list-disc list-inside text-neutral/80">
              {policyObj.privacyPolicy.cookiesAndTracking.usage.map(
                (item, i) => (
                  <li key={i}>{item}</li>
                )
              )}
            </ul>
          </section>
          <section className="pt-10!">
            <h4 className="text-secondary border-b pb-1 pe-3 border-b-neutral/20 mb-4 w-max text-xl">
              Data Sharing
            </h4>
            <p className="text-neutral/80 mb-2">
              {policyObj.privacyPolicy.dataSharing.notShared}
            </p>
            <ul className="list-disc list-inside text-neutral/80">
              {policyObj.privacyPolicy.dataSharing.allowedWhenNecessary.map(
                (item, i) => (
                  <li key={i}>{item}</li>
                )
              )}
            </ul>
          </section>
          <section className="pt-10!">
            <h4 className="text-secondary border-b pb-1 pe-3 border-b-neutral/20 mb-4 w-max text-xl">
              User Rights
            </h4>
            <ul className="list-disc list-inside text-neutral/80">
              {policyObj.privacyPolicy.userRights.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </section>
          <section className="pt-10!">
            <h4 className="text-secondary border-b pb-1 pe-3 border-b-neutral/20 mb-4 w-max text-xl">
              Data Retention
            </h4>
            <p className="text-neutral/80">
              {policyObj.privacyPolicy.dataRetention.policy}
            </p>
            <p className="text-neutral/80 italic">
              {policyObj.privacyPolicy.dataRetention.note}
            </p>
          </section>
          <section className="pt-10!">
            <h4 className="text-secondary border-b pb-1 pe-3 border-b-neutral/20 mb-4 w-max text-xl">
              Third-Party Integrations
            </h4>
            <p className="text-neutral/80">
              {policyObj.privacyPolicy.thirdPartyIntegrations.description}
            </p>
            <p className="text-neutral/80 italic">
              {policyObj.privacyPolicy.thirdPartyIntegrations.advice}
            </p>
          </section>
          <section className="pt-10!">
            <h4 className="text-secondary border-b pb-1 pe-3 border-b-neutral/20 mb-4 w-max text-xl">
              Policy Updates
            </h4>
            <p className="text-neutral/80">
              {policyObj.privacyPolicy.policyUpdates.description}
            </p>
            <p className="text-neutral/80 italic">
              {policyObj.privacyPolicy.policyUpdates.agreement}
            </p>
          </section>
          <section className="pt-10!">
            <h4 className="text-secondary border-b pb-1 pe-3 border-b-neutral/20 mb-4 w-max text-xl">
              Contact Information
            </h4>
            <p className="text-neutral/80">
              Email: {policyObj.privacyPolicy.contactInformation.email}
            </p>
            <p className="text-neutral/80">
              Phone: {policyObj.privacyPolicy.contactInformation.phone}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
