import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../../hooks/useAxios";
import { Link } from "react-router";
import { useState } from "react";
import EmptyTableDataComponent from "../../../../components/Common/EmptyTableData/EmptyTableData";
import TableSkeleton from "../../../../components/Common/Loaders/TableSkeleton";
import BarSkeleton from "../../../../components/Common/Loaders/BarSkeleton";

export default function AllOrdersPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const axios = useAxios();
  const {
    data: orders = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["orders", status, search],
    queryFn: async () => {
      const res = await axios.get(`/orders?search=${search}&status=${status}`);
      return res.data;
    },
  });
  const { data: statuses = [], isLoading: isStatusesLoading } = useQuery({
    queryKey: ["statuses"],
    queryFn: async () => {
      const res = await axios.get("/orders/statuses");
      return res.data;
    },
  });
  const uniqueStatuses = [...new Set(statuses.map((s) => s.deliveryStatus))];
  return (
    <>
      <h4 className="text-2xl mb-4">Manage All Orders</h4>
      <title>All Orders | GOPTS</title>
      <div className="flex max-sm:flex-col justify-between sm:gap-3 gap-4">
        <input
          type="search"
          className="input max-sm:w-full"
          placeholder="Search by product name..."
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          defaultValue={""}
          className="select capitalize max-sm:w-full"
          onChange={(e) => {
            setStatus(e.target.value === "Select status" ? "" : e.target.value);
            refetch();
          }}
        >
          <option value="Select status">Select status</option>
          {isStatusesLoading ? (
            <BarSkeleton forOption={true} />
          ) : uniqueStatuses.length > 0 ? (
            uniqueStatuses?.map((s, i) => (
              <option key={i} value={s} className="capitalize">
                {s.split("_").join(" ")}
              </option>
            ))
          ) : (
            <option>No filter option found</option>
          )}
        </select>
      </div>
      {isLoading ? (
        <TableSkeleton />
      ) : orders.length > 0 ? (
        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 mt-4">
          <table className="table">
            <thead className="bg-base-300">
              <tr>
                <th>Sl no</th>
                <th>Product</th>
                <th>Order Quantity</th>
                <th>Payment Info</th>
                <th>Delivery Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o, i) => (
                <tr key={i} className="even:bg-base-200">
                  <td>{i + 1}</td>
                  <td>
                    <p className="text-primary font-bold min-w-40">
                      {o.productName}
                    </p>
                    <p>TID: {o.trackingId}</p>
                  </td>
                  <td>{o.orderQuantity}</td>
                  <td className="whitespace-nowrap">
                    <p
                      className={`badge badge-sm badge-outline capitalize ${
                        o.paymentStatus === "paid"
                          ? "badge-success bg-success/20 border-success/30"
                          : o.paymentStatus === "cod"
                          ? "badge-info bg-info/20 border-info/30"
                          : "badge-warning bg-warning/20 border-warning/30"
                      }`}
                    >
                      {o.paymentStatus === "cod"
                        ? "Cash on delivery"
                        : o.paymentStatus}
                    </p>
                  </td>
                  <td className="whitespace-nowrap">
                    <p
                      className={`badge badge-sm font-bold capitalize ${
                        o.deliveryStatus === "pending"
                          ? "badge-warning"
                          : o.deliveryStatus === "delivery_done"
                          ? "badge-success"
                          : o.deliveryStatus === "not_started" ||
                            o.deliveryStatus === "rejected"
                          ? "badge-error"
                          : "badge-info"
                      }`}
                    >
                      {o.deliveryStatus.split("_").join(" ")}
                    </p>
                  </td>
                  <td>
                    <div className="flex gap-2">
                      <Link
                        to={`/products/${o.productId}`}
                        className="btn btn-sm btn-info border-info/20 btn-soft rounded-full"
                      >
                        View Product
                      </Link>
                      <Link
                        to={`/dashboard/all-orders/${o._id}`}
                        className="btn btn-sm btn-accent border-accent/20 btn-soft rounded-full"
                      >
                        View Order
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <EmptyTableDataComponent data={"Orders"} />
      )}
    </>
  );
}
