import { container } from "../../../utils/classNames";
import SectionTitleComponent from "../../Common/SectionTitle/SectionTitle";
import useProducts from "../../../hooks/useProducts";
import FeaturedProductCard from "./FeaturedProductCard";
import { Link } from "react-router";

export default function OurProductsComponent() {
  const { data: products = [], isLoading } = useProducts({
    featured: true,
    limit: 6,
  });
  const { data: fallBackProds = [], isLoading: isFallbackProdsLoading } =
    useProducts({
      limit: 6,
    });
  return (
    <section>
      <SectionTitleComponent
        title={"See Our Products"}
        subtitle={
          "Discover the latest products posted by factory managers — handpicked and approved for buyers"
        }
      />
      <div
        className={`grid lg:grid-cols-3 sm:grid-cols-2 gap-10 ${container} max-lg:max-w-3xl! max-sm:max-w-sm! max-w-6xl!`}
      >
        {isLoading ? (
          <p>Loading...</p>
        ) : products?.result?.length > 5 ? (
          products?.result?.map((p, index) => (
            <FeaturedProductCard p={p} key={index} />
          ))
        ) : isFallbackProdsLoading ? (
          <p>Loading...</p>
        ) : (
          fallBackProds?.result?.map((p, index) => (
            <FeaturedProductCard p={p} key={index} />
          ))
        )}
      </div>
      <div className="flex justify-center mt-14">
        <Link
          to={"/products"}
          className="btn btn-primary btn-lg h-auto py-2.5 px-12 rounded-full"
        >
          See All Products
        </Link>
      </div>
    </section>
  );
}
