import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";
import { CgMenu } from "react-icons/cg";
import { useEffect, useState } from "react";

import SectionTitleComponent from "../../components/Common/SectionTitle/SectionTitle";
import useProducts from "../../hooks/useProducts";
import { container } from "../../utils/classNames";
import useCategories from "../../hooks/useCategories";
import ProductCardComponent from "./ProductCard";
import EmptyTableDataComponent from "../../components/Common/EmptyTableData/EmptyTableData";
import { scrollUp } from "../../utils/scrollUp";
import CardSkeleton from "../../components/Common/Loaders/cardSkeleton";
import { MdClose } from "react-icons/md";
import BarSkeleton from "../../components/Common/Loaders/BarSkeleton";

export default function AllProductsPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sort, setSort] = useState("");
  const [time, setTime] = useState("");
  const [payMethod, setPayMethod] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [skip, setSkip] = useState(0);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const limit = 6;

  useEffect(() => {
    scrollUp();
  }, []);

  const { data: products = [], isLoading } = useProducts({
    search,
    category: selectedCategory,
    fields:
      "name,images,category,price,availableQuantity,createdAt,paymentMethod",
    sort,
    time,
    limit,
    skip,
    payMethod,
  });

  const { data: categories = [], isLoading: isCategoryLoading } =
    useCategories();

  const totalPages = Math.ceil(products?.count / limit);
  useEffect(() => {
    if (!products?.count) return;

    const lastPageIndex = Math.max(Math.ceil(products.count / limit) - 1, 0);

    if (currentPage > lastPageIndex) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCurrentPage(lastPageIndex);
      setSkip(lastPageIndex * limit);
    }
  }, [products, limit]);

  return (
    <div className={`${container} mt-36`}>
      <SectionTitleComponent
        subtitle={"Browse and find the best choice that matches your taste"}
        title={"See all products"}
      />

      {isFilterOpen && (
        <div
          onClick={() => setIsFilterOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
        />
      )}

      <div className="grid lg:grid-cols-4 md:grid-cols-3 gap-8">
        <div
          className={`
            bg-base-200 p-5 max-lg:rounded-none rounded-lg h-max max-lg:min-h-full
            lg:sticky lg:top-24 lg:block lg:translate-x-0
            fixed top-0 left-0 z-50 max-lg:w-72 max-lg:pt-12
            transition-transform duration-300
            ${isFilterOpen ? "translate-x-0" : "-translate-x-full"}
          `}
        >
          <button
            onClick={() => setIsFilterOpen(false)}
            className="h-auto p-2 btn bg-base-300 absolute top-2 right-2 lg:hidden"
          >
            <MdClose className="w-5 h-5" />
          </button>

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
          <div className="rounded-lg bg-base-100">
            <div className="p-3">
              <label className="mb-2 font-semibold! block">Categories</label>
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
                  <BarSkeleton forOption={true} />
                ) : categories.length > 0 ? (
                  categories.map((cat) => (
                    <option key={cat._id}>{cat.name}</option>
                  ))
                ) : (
                  <option>No categories found</option>
                )}
              </select>
            </div>

            <div className="p-3">
              <label className="mb-2 font-semibold! block">Created time</label>
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

            <div className="p-3">
              <label className="mb-2 font-semibold! block">Payment type</label>
              <select
                className="select"
                onChange={(e) =>
                  setPayMethod(
                    e.target.value === "Select an option" ? "" : e.target.value
                  )
                }
              >
                <option value="Select an option">Select an option</option>
                <option value="cod">Cash on delivery</option>
                <option value="stripe">Stripe</option>
              </select>
            </div>
          </div>
        </div>

        <div className="col-span-3">
          <div className="flex mb-6">
            <button
              onClick={() => setIsFilterOpen(true)}
              className="lg:hidden flex btn me-3 rounded-full"
            >
              <CgMenu />
              <span>Filters</span>
            </button>

            <input
              type="search"
              className="input"
              placeholder="search"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="grid md:grid-cols-3 xs:grid-cols-2 gap-6">
            {isLoading ? (
              <CardSkeleton />
            ) : products.result.length > 0 ? (
              products.result.map((product) => (
                <ProductCardComponent key={product._id} product={product} />
              ))
            ) : (
              <div className="col-span-3">
                <EmptyTableDataComponent data={"Products"} />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="text-center mt-14">
        {totalPages > 0 && products.count > limit ? (
          <div className="join">
            <button
              disabled={skip <= 0}
              onClick={() => {
                setTimeout(() => {
                  scrollUp();
                }, 10);
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
              [...Array(totalPages).keys()].map((i) => (
                <button
                  key={i}
                  onClick={() => {
                    scrollUp();
                    setSkip(i * limit);
                    setCurrentPage(i);
                  }}
                  className={`join-item btn ${
                    currentPage === i && "btn-primary"
                  }`}
                >
                  {i + 1}
                </button>
              ))
            )}

            <button
              disabled={currentPage >= totalPages - 1}
              onClick={() => {
                setTimeout(() => {
                  scrollUp();
                }, 10);
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
  );
}
