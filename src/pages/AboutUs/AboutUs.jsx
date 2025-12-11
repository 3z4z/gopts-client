import { useEffect } from "react";
import SectionTitleComponent from "../../components/Common/SectionTitle/SectionTitle";
import { container } from "../../utils/classNames";
import { scrollUp } from "../../utils/scrollUp";

export default function AboutUsPage() {
  useEffect(() => {
    scrollUp();
  }, []);
  return (
    <div className={`${container} mt-26`}>
      <title>About Us | GOPTS</title>
      <div className="bg-base-100 rounded-2xl shadow-lg sm:p-8 p-4 md:p-12">
        <SectionTitleComponent
          title={"About GOPTS"}
          subtitle={
            "The Garments Orders and Production Management System - GOPTS is a web-based platform designed to streamline garment order handling, production tracking, and workflow management for apparel businesses."
          }
        />

        <div>
          <h4 className="text-xl mb-4 text-secondary pb-1 border-b border-b-neutral/20 w-max pe-4">
            Objective
          </h4>
          <p className="text-base-content/80 leading-relaxed">
            This system aims to simplify the entire garments production cycle —
            from order placement to production status and delivery tracking. It
            helps reduce manual errors, improve efficiency, and provide clear
            visibility across all production stages.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10 mt-10">
          <div>
            <h4 className="text-xl mb-4 text-secondary pb-1 border-b border-b-neutral/20 w-max pe-4">
              Key Modules
            </h4>
            <ul className="space-y-2 text-base-content/80 list-disc ms-4">
              <li>Order management and tracking</li>
              <li>Production planning and status monitoring</li>
              <li>Workflow and process coordination</li>
              <li>Role-based access and user control</li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl mb-4 text-secondary pb-1 border-b border-b-neutral/20 w-max pe-4">
              Technology Used
            </h4>
            <ul className="space-y-2 text-base-content/80 list-disc ms-4">
              <li>MongoDB for secured database management</li>
              <li>Full MERN stack (MongoDB, Express, React, Node.js)</li>
              <li>Firebase Authentication for secure user login</li>
              <li>Secure REST APIs & JWT-based authorization</li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl mb-4 text-secondary pb-1 border-b border-b-neutral/20 w-max pe-4">
              Benefits
            </h4>
            <ul className="space-y-2 text-base-content/80 list-disc ms-4">
              <li>Improved production transparency</li>
              <li>Faster order processing</li>
              <li>Better coordination between departments</li>
              <li>Data-driven decision making</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
