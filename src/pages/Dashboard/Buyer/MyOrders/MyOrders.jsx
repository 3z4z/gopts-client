import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "../../../../stores/useAuthStore";
import useAxios from "../../../../hooks/useAxios";
import { Link } from "react-router";
import { handlePayment } from "../../../../utils/handlePayment";
import { useState } from "react";
import Swal from "sweetalert2";
import EmptyTableDataComponent from "../../../../components/Common/EmptyTableData/EmptyTableData";

export default function MyOrdersPage() {
  const { user } = useAuthStore();
  const [search, setSearch] = useState("");
  const [payment, setPayment] = useState("");
  const axios = useAxios();
  const {
    data: orders = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["orders", user?.email, search, payment],
    queryFn: async () => {
      const res = await axios.get(
        `/orders?email=${user?.email}&search=${search}&payment=${payment}`
      );
      return res.data;
    },
  });
  const payments = ["unpaid", "paid", "cod"];
  const handleCancelOrder = async (order) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this order!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`/orders/${order._id}`);
          refetch();
          Swal.fire({
            title: "Deleted!",
            text: "Your order has been cancelled.",
            icon: "success",
          });
        } catch (error) {
          console.error("Error cancelling order:", error);
          Swal.fire({
            title: "Error!",
            text: "Could not cancel the order. Please try again.",
            icon: "error",
          });
        }
      }
    });
  };
  return (
    <>
      <h4 className="text-2xl mb-4">My All Orders</h4>
      <div className="flex max-sm:flex-col justify-between sm:gap-3 gap-4">
        <input
          type="search"
          className="input max-sm:w-full"
          placeholder="Search"
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          defaultValue={""}
          className="select max-sm:w-full capitalize"
          onChange={(e) => {
            setPayment(
              e.target.value === "Select payment" ? "" : e.target.value
            );
          }}
        >
          <option value="Select payment">Select payment</option>
          {payments.map((p, i) => (
            <option key={i} value={p} className="capitalize">
              {p === "cod" ? "Cash on Delivery" : p}
            </option>
          ))}
        </select>
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : orders?.length > 0 ? (
        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 mt-4">
          <table className="table">
            <thead className="bg-base-300">
              <tr>
                <th>Sl no</th>
                <th>Order ID</th>
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
                  <td>{o._id}</td>
                  <td>
                    <p className="text-primary font-bold text-[1rem] min-w-40">
                      {o.productName}
                    </p>
                    <p className="text-xs">T.ID: {o.trackingId}</p>
                  </td>
                  <td>{o.orderQuantity}</td>
                  <td>
                    {o.paymentStatus === "paid" ? (
                      <p className="badge badge-sm badge-outline badge-success">
                        Paid
                      </p>
                    ) : o.paymentStatus === "cod" ? (
                      <p className="badge badge-sm badge-outline badge-info">
                        Cash on Delivery
                      </p>
                    ) : (
                      <button
                        className="btn btn-sm btn-success rounded-full"
                        onClick={() => handlePayment(o?._id, axios)}
                      >
                        Pay now
                      </button>
                    )}
                  </td>
                  <td>
                    <p
                      className={`badge badge-sm font-bold capitalize ${
                        o.deliveryStatus === "pending"
                          ? "badge-warning"
                          : o.deliveryStatus === "approved" ||
                            o.deliveryStatus === "delivery_done"
                          ? "badge-success"
                          : o.deliveryStatus === "not_started" ||
                            o.deliveryStatus === "rejected"
                          ? "badge-error"
                          : "badge-info"
                      }`}
                    >
                      {(o.deliveryStatus === "not_started" && "Not Started") ||
                        o.deliveryStatus.split("_").join(" ")}
                    </p>
                  </td>
                  <td>
                    <div className="flex gap-2">
                      <Link
                        to={`/products/${o.productId}`}
                        className="btn btn-sm rounded-full btn-soft btn-info border-info/20"
                      >
                        View Product
                      </Link>
                      <Link
                        to={`/dashboard/my-orders/${o._id}`}
                        className="btn btn-sm rounded-full btn-soft btn-success border-success/20"
                      >
                        View Order
                      </Link>
                      {o.deliveryStatus === "pending" ||
                      o.deliveryStatus === "not_started" ? (
                        <button
                          className="btn btn-sm rounded-full btn-soft btn-error border-error/20"
                          onClick={() => handleCancelOrder(o)}
                        >
                          Cancel
                        </button>
                      ) : null}
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
