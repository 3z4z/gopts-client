import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "../../../../stores/useAuthStore";
import useAxios from "../../../../hooks/useAxios";
import { Link } from "react-router";

export default function MyOrdersPage() {
  const { user } = useAuthStore();
  const axios = useAxios();
  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["orders", user?.email],
    queryFn: async () => {
      const res = await axios.get(`/orders?email=${user?.email}`);
      return res.data;
    },
  });
  if (isLoading) return <p>Loading...</p>;
  return (
    <>
      <h4 className="text-2xl mb-4">My All Orders</h4>
      {orders?.length > 0 ? (
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
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="py-5 text-center">
                    Loading...
                  </td>
                </tr>
              ) : (
                orders.map((o, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>
                      <p className="text-primary font-bold">{o.productName}</p>
                      <p>TID: {o.trackingId}</p>
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
                        <button className="btn btn-sm btn-success rounded-full">
                          Pay now
                        </button>
                      )}
                    </td>
                    <td>
                      <p
                        className={`badge badge-sm font-bold capitalize ${
                          o.deliveryStatus === "pending"
                            ? "badge-warning"
                            : o.deliveryStatus === "delivered"
                            ? "badge-success"
                            : o.deliveryStatus === "not_started"
                            ? "badge-error"
                            : "badge-info"
                        }`}
                      >
                        {(o.deliveryStatus === "not_started" &&
                          "Not Started") ||
                          o.deliveryStatus}
                      </p>
                    </td>
                    <td>
                      <div className="flex gap-2">
                        <Link
                          to={`/products/${o.productId}`}
                          className="btn btn-sm"
                        >
                          View Product
                        </Link>
                        <Link
                          to={`/dashboard/my-orders/${o._id}`}
                          className="btn btn-sm"
                        >
                          View Order
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No orders right now</p>
      )}
    </>
  );
}
