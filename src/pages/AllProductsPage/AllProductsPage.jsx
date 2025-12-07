import { Link } from "react-router";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";

import SectionTitleComponent from "../../components/Common/SectionTitle/SectionTitle";
import useProducts from "../../hooks/useProducts";
import { container } from "../../utils/classNames";
import { useState } from "react";
import useCategories from "../../hooks/useCategories";

export default function AllProductsPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sort, setSort] = useState("");
  const [time, setTime] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [skip, setSkip] = useState(0);
  const limit = 6;

  const { data: products = [], isLoading } = useProducts({
    search: search,
    category: selectedCategory,
    fields: "name,images,category,price,availableQuantity,createdAt",
    sort: sort,
    time: time,
    limit: limit,
    skip: skip,
  });

  const { data: categories = [], isLoading: isCategoryLoading } =
    useCategories();
  const totalPages = Math.ceil(products?.count / limit);
  return (
    <div className={`${container} mt-36`}>
      <SectionTitleComponent
        subtitle={"Browse and find the best choice that matches your taste"}
        title={"See all products"}
      />
      <div className="grid grid-cols-4 gap-8">
        <div className="bg-base-200 p-5 rounded-lg h-max sticky top-24">
          <p className="text-lg mb-4 font-bold">Sort</p>
          <select
            className="select w-full mb-4"
            onChange={(e) =>
              setSort(
                e.target.value === "Sort by..."
                  ? "createdAt-asc"
                  : e.target.value
              )
            }
          >
            <option value="Sort by...">Sort by...</option>
            <option value="createdAt-asc">Date - Oldest First</option>
            <option value="createdAt-desc">Date - Newest First</option>
            <option value="name-asc">Name - A to Z</option>
            <option value="name-desc">Name - Z to A</option>
            <option value="price-asc">Price - Lowest First</option>
            <option value="price-desc">Price - Highest First</option>
          </select>
          <p className="text-lg mb-4 font-bold">Filters</p>
          <div>
            <div className="p-3 rounded-md bg-base-100">
              <label className="mb-2 font-semibold block">Categories</label>
              <select
                className="select w-full"
                onChange={(e) =>
                  setSelectedCategory(
                    e.target.value === "Select a category" ? "" : e.target.value
                  )
                }
              >
                <option value="Select a category">Select a category</option>
                {isCategoryLoading ? (
                  <option>Loading...</option>
                ) : categories.length > 0 ? (
                  categories.map((cat) => (
                    <option key={cat._id}>{cat.name}</option>
                  ))
                ) : (
                  <option>No categories found</option>
                )}
              </select>
            </div>
            <div className="p-3 rounded-md bg-base-100">
              <label className="mb-2 font-semibold block">Created time</label>
              <select
                className="select w-full"
                onChange={(e) =>
                  setTime(
                    e.target.value === "Select a time" ? "" : e.target.value
                  )
                }
              >
                <option value="Select a time">Select a time</option>
                <option value="today">Today</option>
                <option value="last-3-days">Last 3 days</option>
                <option value="last-week">Last 7 days</option>
                <option value="last-month">Last 1 month</option>
              </select>
            </div>
          </div>
        </div>
        <div className="col-span-3">
          <div className="flex justify-between mb-6">
            <input
              type="search"
              className="input"
              placeholder="search"
              onChange={(e) => setSearch(e.target.value)}
            />
            <div>
              {totalPages > 0 && products.count > limit ? (
                <div className="join">
                  <button
                    disabled={skip <= 0}
                    onClick={() => {
                      setSkip(currentPage * limit - limit);
                      setCurrentPage(currentPage - 1);
                    }}
                    className="join-item btn"
                  >
                    <IoChevronBackOutline />
                  </button>
                  {isLoading ? (
                    <button disabled className="join-item btn">
                      <span className="loading loading-dots loading-xs text-primary/50"></span>
                    </button>
                  ) : (
                    [
                      ...Array(totalPages)
                        .keys()
                        .map((i) => (
                          <button
                            onClick={() => {
                              setSkip(i * limit);
                              setCurrentPage(i);
                            }}
                            key={i}
                            className={`join-item btn ${
                              currentPage === i && "btn-primary"
                            }`}
                          >
                            {i + 1}
                          </button>
                        )),
                    ]
                  )}
                  <button
                    disabled={currentPage >= totalPages - 1}
                    onClick={() => {
                      setSkip(currentPage * limit + limit);
                      setCurrentPage(currentPage + 1);
                    }}
                    className="join-item btn"
                  >
                    <IoChevronForwardOutline />
                  </button>
                </div>
              ) : null}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-6">
            {isLoading ? (
              <p>Loading...</p>
            ) : products.result.length > 0 ? (
              products.result.map((product) => (
                <div
                  key={product._id}
                  className="p-4.5 shadow rounded-lg cursor-pointer hover:bg-base-200/50 bg-base-200/35 transition-all flex flex-col border border-base-200"
                >
                  <figure className="aspect-square bg-base-300 rounded-xl w-full overflow-hidden">
                    <img
                      src={product.images[0]}
                      alt=""
                      className="object-cover h-full w-full"
                    />
                  </figure>

                  <div>
                    <h4 className="text-xl text-neutral mt-3 line-clamp-2 h-14 mb-2">
                      {product.name}
                    </h4>
                    <p>
                      Price:{" "}
                      <span className="text-primary font-bold">
                        ৳{product.price}/ unit
                      </span>
                    </p>
                    <div className="flex flex-col gap-1 mt-3 mb-5">
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
              ))
            ) : (
              <p>No products found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
