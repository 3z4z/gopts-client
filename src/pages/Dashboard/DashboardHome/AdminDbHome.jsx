import UserLoadingSpinnerLoader from "../../../components/Common/Loaders/UserLoadingSpinner";
import useOrders from "../../../hooks/useOrders";
import useProducts from "../../../hooks/useProducts";
import { LuBox, LuClipboardList, LuUsers } from "react-icons/lu";
import useUsers from "../../../hooks/useUsers";
import dayjs from "dayjs";
import ProductsLineChart from "./ProductsLineChart";
import UsersLineChart from "./UsersLineChart";
import BarSkeleton from "../../../components/Common/Loaders/BarSkeleton";

export default function AdminDbHome() {
  const { data: products = [], isLoading: isProdsLoading } = useProducts({
    limit: 6,
  });
  const { data: orders = [], isLoading: isOrdsLoading } = useOrders({});
  const { data: users = [], isLoading: isUsersLoading } = useUsers({});
  return (
    <>
      <div className="">
        <div className="grid grid-cols-4 gap-6">
          <div className="xl:col-span-3 col-span-4">
            <div className="grid sm:grid-cols-3 gap-6 mb-6">
              <div className="rounded-2xl shadow-lg bg-base-200 p-6 border border-primary/8 h-max">
                <p className="text-neutral/70 mb-6 font-bold">Total Products</p>
                <div className="flex justify-between items-end">
                  <LuBox className="w-10 h-10 text-neutral/50" />
                  <div className="font-bold text-primary text-4xl text-end">
                    {isProdsLoading ? (
                      <UserLoadingSpinnerLoader />
                    ) : (
                      products.count
                    )}
                  </div>
                </div>
              </div>
              <div className="rounded-2xl shadow-lg bg-base-200 p-6 border border-primary/8 h-max">
                <p className="text-neutral/70 mb-6 font-bold">Total Orders</p>
                <div className="flex justify-between items-end">
                  <LuClipboardList className="w-10 h-10 text-neutral/50" />
                  <div className="font-bold text-primary text-4xl text-end">
                    {isOrdsLoading ? (
                      <UserLoadingSpinnerLoader />
                    ) : (
                      orders.length
                    )}
                  </div>
                </div>
              </div>
              <div className="rounded-2xl shadow-lg bg-base-200 p-6 border border-primary/8 h-max">
                <p className="text-neutral/70 mb-6 font-bold">Total Users</p>
                <div className="flex justify-between items-end">
                  <LuUsers className="w-10 h-10 text-neutral/50" />
                  <div className="font-bold text-primary text-4xl text-end">
                    {isUsersLoading ? (
                      <UserLoadingSpinnerLoader />
                    ) : (
                      users?.length
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="grid lg:grid-cols-2 gap-6">
              <ProductsLineChart />
              <UsersLineChart />
            </div>
          </div>
          <div className="xl:col-span-1 col-span-4 rounded-2xl shadow-lg bg-base-200 p-6 border border-primary/8">
            <p className="text-neutral/70 mb-6 font-bold">Recent Products</p>
            {isProdsLoading ? (
              <BarSkeleton />
            ) : (
              <div className="grid xl:grid-cols-1 md:grid-cols-3 grid-cols-2 xl:gap-2 gap-3">
                {products?.result?.map((prod) => {
                  const orderCount = orders.filter(
                    (order) => order.productId === prod._id
                  ).length;
                  return (
                    <div
                      key={prod._id}
                      className="last:mb-0 bg-base-300 rounded-lg py-2.5 px-1.5 shadow flex gap-4"
                    >
                      <div>
                        <figure className="w-14 h-14 rounded-lg overflow-hidden border border-primary/8">
                          <img
                            src={prod.images[0]}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        </figure>
                      </div>
                      <div>
                        <p className="font-bold text-primary line-clamp-1">
                          {prod.name}
                        </p>
                        <p className="text-xs text-neutral/70">
                          Created at:{" "}
                          {dayjs(prod.createdAt).format("DD MMM, YYYY")}
                        </p>
                        <div className="flex gap-1.5 mt-2">
                          <span
                            className="badge badge-sm badge-soft badge-success cursor-pointer"
                            title="Total in stock amount"
                          >
                            <LuBox />
                            <span>{prod.availableQuantity}</span>
                          </span>
                          <span
                            className="badge badge-sm badge-soft badge-info cursor-pointer"
                            title="Total orders"
                          >
                            <LuClipboardList />
                            <span>{orderCount}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
