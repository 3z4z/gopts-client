import { container } from "../../../utils/classNames";
import SectionTitleComponent from "../../Common/SectionTitle/SectionTitle";
import useProducts from "../../../hooks/useProducts";
import ProductCard from "./ProductCard";

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
      <div className={`grid grid-cols-3 gap-10 ${container} max-w-6xl!`}>
        {isLoading ? (
          <p>Loading...</p>
        ) : products?.result?.length > 5 ? (
          products?.result?.map((p, index) => (
            <ProductCard p={p} index={index} />
          ))
        ) : isFallbackProdsLoading ? (
          <p>Loading...</p>
        ) : (
          fallBackProds?.result?.map((p, index) => (
            <ProductCard p={p} index={index} />
          ))
        )}
      </div>
    </section>
  );
}
