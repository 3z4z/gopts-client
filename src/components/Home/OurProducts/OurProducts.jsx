import { Link } from "react-router";
import { container } from "../../../utils/classNames";
import SectionTitleComponent from "../../Common/SectionTitle/SectionTitle";

export default function OurProductsComponent() {
  return (
    <section>
      <SectionTitleComponent
        title={"See Our Products"}
        subtitle={
          "Discover the latest products posted by factory managers — handpicked and approved for buyers"
        }
      />
      <div className={`grid grid-cols-3 gap-10 ${container}`}>
        {Array.from({ length: 6 }).map((_, index) => {
          return (
            <div
              key={index}
              className="p-6 shadow rounded-xl cursor-pointer hover:bg-base-200/50 bg-base-200/35 transition-all flex flex-col items-center"
            >
              <figure className="aspect-5/4 bg-base-300 rounded-xl w-full"></figure>
              <div>
                <h4 className="text-xl text-neutral mt-3 line-clamp-2 h-14 mb-2">
                  Selected Item Selected Item Selected Item Selected Item
                  Selected Item Selected Item Selected Item Selected Item
                  Selected Item {index + 1}
                </h4>
                <p className="text-primary/70 font-bold">$60.00 / 100 unit</p>
                <p className="h-12 line-clamp-2 mt-5 mb-7 text-neutral/70">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Neque sint fuga aspernatur, quis ipsam reiciendis.
                </p>
              </div>
              <Link
                to={`/products/product-id-${index}`}
                className="btn btn-primary btn-outline px-10 rounded-full"
              >
                View Details
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
}
