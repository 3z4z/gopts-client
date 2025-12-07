import { useParams } from "react-router";
import useAxios from "../../../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { container } from "../../../utils/classNames";
import { useEffect, useState } from "react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "./ProductDetails.css";
export default function ProductDetailsPage() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  const { id } = useParams();
  const axios = useAxios();
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const { data: product = {}, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const res = await axios.get(`/products/${id}`);
      return res.data;
    },
    enabled: !!id,
  });
  if (isLoading) return <p>Loading...</p>;
  return (
    <div className={`${container} mt-24`}>
      <div className="grid grid-cols-3">
        <div className="col-span-2">
          <h1 className="text-4xl">{product?.name}</h1>
        </div>
        <div>
          {product.images.length > 1 ? (
            <>
              <Swiper
                style={{
                  "--swiper-navigation-color": "#fff",
                  "--swiper-pagination-color": "#fff",
                }}
                loop={true}
                spaceBetween={10}
                navigation={true}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper2"
              >
                {product.images.map((image, index) => (
                  <SwiperSlide
                    key={index}
                    className="aspect-square bg-base-300 select-none"
                  >
                    <img
                      src={image}
                      alt=""
                      className="object-cover w-full h-full"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
              <Swiper
                onSwiper={setThumbsSwiper}
                loop={true}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper"
              >
                {product.images.map((image, index) => (
                  <SwiperSlide
                    key={index}
                    className="aspect-square select-none"
                  >
                    <img
                      src={image}
                      alt=""
                      className="object-cover w-full h-full"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </>
          ) : (
            <figure className="aspect-square w-full h-full rounded-xl bg-base-300 overflow-hidden">
              <img
                src={product.images[0]}
                alt=""
                className="w-full h-full object-cover"
              />
            </figure>
          )}
        </div>
      </div>
    </div>
  );
}
