import { use } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  EffectCoverflow,
  Navigation,
  Pagination,
} from "swiper/modules";
import SectionTitleComponent from "../../Common/SectionTitle/SectionTitle";
import { container } from "../../../utils/classNames";
import { FaQuoteLeft } from "react-icons/fa6";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
import "./CustomerReviews.css";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

export default function CustomerReviewsComponent({ getReviews }) {
  const reviews = use(getReviews);
  console.log("reviews", reviews);
  return (
    <section className={container}>
      <SectionTitleComponent
        title={"Our satisfied users"}
        subtitle={
          "Discover how our platform makes buying and selling seamless."
        }
      />
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        slidesPerView={3}
        centeredSlides={true}
        spaceBetween={24}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 150,
          modifier: 1.75,
          slideShadows: false,
        }}
        autoplay={{
          delay: 2500,
          pauseOnMouseEnter: true,
          disableOnInteraction: true,
        }}
        navigation={{
          prevEl: ".slide-prev-nav",
          nextEl: ".slide-next-nav",
        }}
        pagination={{ el: ".pagination", clickable: true }}
        loop={true}
        modules={[EffectCoverflow, Pagination, Autoplay, Navigation]}
        className="slider py-4!"
      >
        {reviews.map((r, i) => (
          <SwiperSlide
            key={i}
            className="px-6 pt-8 pb-6 bg-base-200 rounded-2xl"
          >
            <FaQuoteLeft className="text-secondary/30 text-6xl mb-5" />
            <h4 className="text-neutral/80 text-sm border-b-2 border-dashed border-b-primary/10 pb-4 mb-4">
              {r.comment}
            </h4>
            <div className="flex gap-5">
              <figure className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center">
                <img src={r.image} alt="" />
              </figure>
              <div>
                <h5 className="text-primary text-xl">{r.name}</h5>
                <p className="text-sm text-neutral/80 font-semibold">
                  {r.designation}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="mt-6 flex justify-center items-center gap-6 w-max mx-auto">
        <button className="slide-prev-nav btn btn-accent btn-outline p-2 text-lg h-auto rounded-full">
          <BsArrowLeft />
        </button>
        <div className="pagination flex justify-center"></div>
        <button className="slide-next-nav btn btn-accent btn-outline p-2 text-lg h-auto rounded-full">
          <BsArrowRight />
        </button>
      </div>
    </section>
  );
}
