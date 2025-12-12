import { Link, useParams } from "react-router";
import { container } from "../../../utils/classNames";
import { useEffect, useState } from "react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "./ProductDetails.css";
import useRole from "../../../hooks/useRole";
import useProduct from "../../../hooks/useProduct";
import { toYouTubeEmbed } from "../../../utils/toYtEmbed";
import ProductDetailsSkeleton from "../../../components/Common/Loaders/ProductDetailSkeleton";
export default function ProductDetailsPage() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  const { id } = useParams();
  const { role } = useRole();
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const { data: product = {}, isLoading } = useProduct({ id: id });
  if (isLoading) return <ProductDetailsSkeleton />;
  return (
    <div className={`${container} mt-24`}>
      <title>{isLoading ? "Product" : `${product?.name} | GOPTS`}</title>
      <div className="grid xl:grid-cols-3 lg:grid-cols-5 md:grid-cols-2 gap-12">
        <div className="order-2 md:order-1 xl:col-span-2 lg:col-span-3">
          <h1 className="text-5xl mb-2 text-primary">{product?.name}</h1>
          <p>
            <span className="me-1.5 text-neutral/75">Category:</span>
            <span className="text-primary font-bold">{product?.category}</span>
          </p>
          <div className="mt-10">
            <h5 className="mb-3 text-xl border-b border-b-neutral/10 max-w-max pe-4 text-secondary">
              Order Info
            </h5>
            <p>
              <span className="me-1.5 text-neutral/75">Per Unit Price:</span>
              <span className="font-bold">৳{product?.price} BDT</span>
            </p>
            <p>
              <span className="me-1.5 text-neutral/75">Payment Method:</span>
              <span className="capitalize">
                {product?.paymentMethod === "cod"
                  ? "cash on delivery"
                  : "Pay First"}
              </span>
            </p>
            <p>
              <span className="me-1.5 text-neutral/75">In Stock:</span>
              {product?.availableQuantity} Units
            </p>
            <p>
              <span className="me-1.5 text-neutral/75">Minimum Order:</span>
              {product?.minOrderAmount} Units
            </p>
          </div>
          <div className="mt-10">
            <h5 className="mb-3 text-xl border-b border-b-neutral/10 max-w-max pe-4 text-secondary">
              Seller Info
            </h5>
            <p>
              <span className="me-1.5 text-neutral/75">Name:</span>
              {product?.managerName}
            </p>
            <p>
              <span className="me-1.5 text-neutral/75">Email:</span>
              {product?.managerEmail}
            </p>
          </div>
          <div className="mt-10">
            <h5 className="mb-3 text-xl border-b border-b-neutral/10 max-w-max pe-4 text-secondary">
              Description
            </h5>
            <p>{product?.description}</p>
          </div>
          <div className="my-16">
            {role?.role?.toLowerCase() === "buyer" ? (
              <Link
                to={`/book-product/${product._id}`}
                className="btn btn-primary text-lg rounded-full h-auto py-2.5 px-12"
              >
                Book Now
              </Link>
            ) : (
              <Link
                to={`/dashboard/edit-product/${product._id}`}
                className="btn btn-primary text-lg rounded-full h-auto py-2.5 px-12"
              >
                Update Product
              </Link>
            )}
          </div>
          {product?.demoVideoLink && (
            <div>
              <h5 className="mb-3 text-xl border-b border-b-neutral/10 max-w-max pe-4 text-secondary">
                See Demo Video
              </h5>
              <iframe
                src={toYouTubeEmbed(product.demoVideoLink)}
                className="aspect-video max-w-3xl"
              ></iframe>
            </div>
          )}
        </div>
        <div className="order-1 md:order-2 xl:col-span-1 lg:col-span-2 aspect-4/5 max-md:max-h-120 max-md:w-[calc(100dvw-2rem)]">
          {product.images.length > 1 ? (
            <>
              <Swiper
                loop={true}
                spaceBetween={10}
                navigation={true}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper2"
              >
                {product.images.map((image, index) => (
                  <SwiperSlide key={index} className="bg-base-300 select-none">
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
            <figure className="w-full h-full rounded-xl bg-base-300 overflow-hidden shadow-md border border-neutral/5">
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
