import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "../../../../stores/useAuthStore";
import useAxios from "../../../../hooks/useAxios";
import Swal from "sweetalert2";
import { Link } from "react-router";

export default function ManageProductsPage() {
  const { user } = useAuthStore();
  const axios = useAxios();
  const {
    data: products = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["products", user?.email],
    queryFn: async () => {
      const res = await axios.get(`/products?email=${user?.email}`);
      return res.data;
    },
  });
  const handleProductDelete = (product) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios.delete(`/products/${product._id}`);
        refetch();
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };
  const updateProduct = () => {};
  return (
    <>
      <h4 className="text-3xl mb-4">Manage your products</h4>
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
                <th>Payment Mode</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p, i) => (
                <tr key={i} className="even:bg-base-200">
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
                  <td>{p.paymentMethod}</td>
                  <td>
                    <div className="flex gap-2">
                      <Link
                        to={`/dashboard/edit-product/${p._id}`}
                        className="btn btn-sm"
                        onClick={updateProduct}
                      >
                        Update
                      </Link>
                      <button
                        className="btn btn-sm"
                        onClick={() => handleProductDelete(p)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="bg-base-300 py-10 px-4 rounded-2xl text-center mt-2">
          No products to show
        </p>
      )}
    </>
  );
}
