import { Suspense } from "react";
import HeroComponent from "../../components/Home/Hero/Hero";
import OurProductsComponent from "../../components/Home/OurProducts/OurProducts";
import WorkFlowComponent from "../../components/Home/WorkFlow/WorkFlow";
import CustomerReviewsComponent from "../../components/Home/CustomerReviews/CustomerReviews";
import PartnersComponent from "../../components/Home/Partners/Partners";
import OurTeamComponent from "../../components/Home/OurTeam/OurTeam";
import TeamMemberSkeleton from "../../components/Common/Loaders/TeamMemberSkeleton";

export default function HomePage() {
  const getReviews = () =>
    fetch("/data/customerReviews.json").then((res) => res.json());
  const getTeamMembers = () =>
    fetch("/data/teamMembers.json").then((res) => res.json());
  return (
    <>
      <HeroComponent />
      <OurProductsComponent />
      <WorkFlowComponent />
      <Suspense fallback={<p></p>}>
        <CustomerReviewsComponent getReviews={getReviews()} />
      </Suspense>
      <PartnersComponent />
      <Suspense fallback={<TeamMemberSkeleton />}>
        <OurTeamComponent getTeamMembers={getTeamMembers()} />
      </Suspense>
    </>
  );
}
