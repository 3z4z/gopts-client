import { Link } from "react-router";
export default function ProductCardComponent({ product }) {
  return (
    <div
      key={product._id}
      className="sm:p-4.5 p-3 shadow rounded-lg cursor-pointer hover:bg-base-200/50 bg-base-200/35 transition-all flex flex-col border border-base-200"
    >
      <figure className="aspect-square bg-base-300 rounded-xl w-full overflow-hidden">
        <img
          src={product.images[0]}
          alt=""
          className="object-cover h-full w-full"
        />
      </figure>

      <div>
        <h4 className="sm:text-xl text-lg text-prim mt-3 line-clamp-2 h-14 mb-2">
          {product.name}
        </h4>
        <p>
          Price:{" "}
          <span className="text-primary font-bold">৳{product.price}/ unit</span>
        </p>
        <div className="max-sm:text-sm flex flex-col gap-1 mt-3 mb-5">
          <p>
            Category:{" "}
            <span className="text-secondary font-semibold">
              {product.category}
            </span>
          </p>
          <p>
            Available:{" "}
            <span className="text-secondary font-semibold">
              {product.availableQuantity} Units
            </span>
          </p>
        </div>
      </div>
      <Link
        to={`/products/${product._id}`}
        className="btn btn-primary btn-outline rounded-full"
      >
        View Details
      </Link>
    </div>
  );
}
