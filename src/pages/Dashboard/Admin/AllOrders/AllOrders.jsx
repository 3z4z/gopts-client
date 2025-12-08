import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../../hooks/useAxios";
import { Link } from "react-router";

export default function AllOrdersPage() {
  const axios = useAxios();
  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const res = await axios.get("/orders");
      return res.data;
    },
  });
  return (
    <>
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
                <td colSpan={6} className="py-6 text-center">
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
                    <p
                      className={`badge badge-sm badge-outline ${
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
                      {(o.deliveryStatus === "not_started" && "Not Started") ||
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
                        to={`/dashboard/all-orders/${o._id}`}
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
    </>
  );
}
