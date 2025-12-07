import { Link } from "react-router";
import { container } from "../../../utils/classNames";
import SectionTitleComponent from "../../Common/SectionTitle/SectionTitle";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../../utils/axiosInstance";

export default function OurProductsComponent() {
  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products", "featured"],
    queryFn: async () => {
      const res = await axiosInstance.get(
        "/products?featured=true&limit=6&fields=name,markFeatured,images,price,description"
      );
      return res.data;
    },
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
        ) : (
          products.map((p, index) => {
            return (
              <div
                key={index}
                className="p-6 shadow rounded-xl cursor-pointer hover:bg-base-200/50 bg-base-200/35 transition-all flex flex-col border border-base-200"
              >
                <figure className="aspect-square bg-base-300 rounded-xl w-full overflow-hidden">
                  <img
                    src={p.images[0]}
                    alt=""
                    className="object-cover h-full w-full"
                  />
                </figure>
                <div>
                  <h4 className="text-xl text-neutral mt-3 line-clamp-2 h-14 mb-2">
                    {p.name}
                  </h4>
                  <p className="text-primary/70 font-bold">
                    {p.price} BDT / per unit
                  </p>
                  <p className="h-12 line-clamp-2 mt-5 mb-7 text-neutral/70">
                    {p.description}
                  </p>
                </div>
                <Link
                  to={`/products/${p._id}`}
                  className="btn btn-primary btn-outline px-10 rounded-full"
                >
                  View Details
                </Link>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}
