import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "../../../../stores/useAuthStore";
import useAxios from "../../../../hooks/useAxios";
import dayjs from "dayjs";
import { Link } from "react-router";
import toast from "react-hot-toast";

export default function PendingOrdersPage() {
  const axios = useAxios();
  const { user } = useAuthStore();
  const {
    data: orders = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["orders", user?.email],
    queryFn: async () => {
      const res = await axios.get(`/orders/pending?email=${user?.email}`);
      return res.data;
    },
  });
  const handleApproval = async (order) => {
    const statusInfo = {
      deliveryStatus: order?.deliveryStatus,
      orderId: order._id,
      trackingId: order.trackingId,
    };
    order?.deliveryStatus === "pending"
      ? (statusInfo.deliveryStatus = "ready")
      : null;
    console.log("statusInfo", statusInfo);
    await axios
      .patch(`/orders/${order._id}`, statusInfo)
      .then(() => toast.success("Accepted!"))
      .catch((err) => toast.error(err));
    refetch();
  };
  const handleRejection = async (order) => {
    const statusInfo = {
      deliveryStatus: order?.deliveryStatus,
      orderId: order._id,
      trackingId: order.trackingId,
    };
    order?.deliveryStatus === "pending"
      ? (statusInfo.deliveryStatus = "rejected")
      : null;
    console.log(statusInfo);
    await axios
      .patch(`/orders/${order._id}`, statusInfo)
      .then(() => toast.error("Rejected"))
      .catch((err) => toast.error(err));
    refetch();
  };
  if (isLoading) return <p>Loading...</p>;
  return (
    <>
      <p>this is pending products for manager</p>
      {orders.length > 0 ? (
        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 mt-4">
          <table className="table">
            <thead className="bg-base-300">
              <tr>
                <th>Sl no</th>
                <th>Order ID</th>
                <th>User</th>
                <th>Product</th>
                <th>Quantity</th>
                <th>Order Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="py-6 text-center">
                    Loading...
                  </td>
                </tr>
              ) : (
                orders.map((o, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{o._id}</td>
                    <td>
                      <p>{`${o.firstName} ${o.lastName}`}</p>
                      <p>{o.buyerEmail}</p>
                    </td>
                    <td>{o.productName}</td>
                    <td>{o.orderQuantity}</td>
                    <td>
                      {dayjs(o.createdAt).format("DD MMM, YYYY @ hh:mm a")}
                    </td>
                    <td>
                      <div className="flex gap-2">
                        <button
                          className="btn btn-sm btn-soft btn-success border-success/20 rounded-full"
                          onClick={() => handleApproval(o)}
                        >
                          Approve
                        </button>
                        <button
                          className="btn btn-sm btn-soft btn-error border-error/20 rounded-full"
                          onClick={() => handleRejection(o)}
                        >
                          Reject
                        </button>
                        <Link
                          className="btn btn-sm btn-soft btn-info border-info/20 rounded-full"
                          to={`/dashboard/pending-orders/${o._id}`}
                        >
                          View
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
        <p>No pending orders right now!</p>
      )}
    </>
  );
}
