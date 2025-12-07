import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../../hooks/useAxios";
import toast from "react-hot-toast";

export default function AllProductsPage() {
  const axios = useAxios();
  const {
    data: products = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axios.get("/products");
      return res.data;
    },
  });
  const updateFeatureStatus = async (product) => {
    const status = { markFeatured: product.markFeatured };
    if (product.markFeatured) {
      status.markFeatured = false;
    } else {
      status.markFeatured = true;
    }
    await axios
      .patch(`/products/${product._id}/markFeatured`, status)
      .then(() => {
        toast.success("Status Updated!");
        refetch();
      })
      .catch((err) =>
        toast.error(
          err?.response.data?.message || err?.message || "Failed to update!"
        )
      );
  };
  return (
    <>
      <p>this is all products {products.length}</p>
      {isLoading ? (
        <p>Loading...</p>
      ) : products.length > 0 ? (
        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 mt-4">
          <table className="table">
            <thead className="bg-base-300">
              <tr>
                <th>Sl no</th>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Created By</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p, i) => (
                <tr key={p._id}>
                  <td>{i + 1}</td>
                  <td>
                    <figure className="w-12 h-12 flex items-center justify-center border border-primary/25 rounded-sm overflow-hidden">
                      <img
                        src={p.images[0]}
                        alt=""
                        className="object-cover w-full h-full"
                      />
                    </figure>
                  </td>
                  <td>{p.name}</td>
                  <td>{p.price}</td>
                  <td>{p.category}</td>
                  <td>{p.managerName}</td>
                  <td>
                    <button
                      className="btn btn-sm"
                      onClick={() => updateFeatureStatus(p)}
                    >
                      {p.markFeatured ? "Remove from home" : "Add to home"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No products right now</p>
      )}
    </>
  );
}
