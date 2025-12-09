import useAxios from "../../../../hooks/useAxios";
import toast from "react-hot-toast";
import useProducts from "../../../../hooks/useProducts";
import { useState } from "react";
import useCategories from "../../../../hooks/useCategories";
import { Link } from "react-router";
import { handleProductDelete } from "../../../../utils/handleDeleteProduct";
import EmptyTableDataComponent from "../../../../components/Common/EmptyTableData/EmptyTableData";

export default function AllProductsAdmin() {
  const axios = useAxios();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const {
    data: products = [],
    isLoading,
    refetch,
  } = useProducts({
    search: search,
    category: category,
  });
  const { data: categories = [], isLoading: isCategoriesLoading } =
    useCategories();
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
      <h4 className="text-2xl mb-4">Manage All Products</h4>
      <div className="flex justify-between">
        <input
          type="search"
          className="input"
          placeholder="Search"
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          defaultValue={""}
          className="select"
          onChange={(e) => {
            setCategory(
              e.target.value === "Select category" ? "" : e.target.value
            );
            refetch();
          }}
        >
          <option value="Select category">Select category</option>
          {isCategoriesLoading ? (
            <option>Loading...</option>
          ) : (
            categories.map((c) => (
              <option key={c._id} value={c.name}>
                {c.name}
              </option>
            ))
          )}
        </select>
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : products.result.length > 0 ? (
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
              {products.result.map((p, i) => (
                <tr key={p._id} className="even:bg-base-200">
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
                    <Link
                      className="btn btn-sm btn-info me-2"
                      to={`/dashboard/edit-product/${p._id}`}
                    >
                      Update
                    </Link>
                    <button
                      className="btn btn-sm btn-error me-2"
                      onClick={() => handleProductDelete(p, axios, refetch)}
                    >
                      Delete
                    </button>
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
        <EmptyTableDataComponent data={"Products"} />
      )}
    </>
  );
}
