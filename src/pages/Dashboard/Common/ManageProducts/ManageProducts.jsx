import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "../../../../stores/useAuthStore";
import useAxios from "../../../../hooks/useAxios";
import Swal from "sweetalert2";
import { Link } from "react-router";
import { useState } from "react";
import useCategories from "../../../../hooks/useCategories";
import { handleProductDelete } from "../../../../utils/handleDeleteProduct";

export default function ManageProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const { user } = useAuthStore();
  const axios = useAxios();
  const {
    data: products = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["products", user?.email, searchValue, selectedCategory],
    queryFn: async () => {
      const res = await axios.get(
        `/products?email=${user?.email}&search=${searchValue}&category=${selectedCategory}`
      );
      return res.data;
    },
  });
  const { data: categories = [], isLoading: isCategoriesLoading } =
    useCategories();
  const updateProduct = () => {};
  return (
    <>
      <h4 className="text-3xl mb-4">Manage your products</h4>
      <div className="flex justify-between">
        <input
          type="search"
          className="input"
          placeholder="Search"
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <select
          defaultValue={""}
          className="select"
          onChange={(e) => {
            setSelectedCategory(
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
                <th>Payment Mode</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.result.map((p, i) => (
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
                  <td>
                    <p className="font-bold">{p.name}</p>
                    <p>Cat: {p.category}</p>
                  </td>
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
                        onClick={() => handleProductDelete(p, axios, refetch)}
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
