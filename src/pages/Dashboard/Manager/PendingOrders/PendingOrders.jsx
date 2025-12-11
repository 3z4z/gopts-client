import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "../../../../stores/useAuthStore";
import useAxios from "../../../../hooks/useAxios";
import dayjs from "dayjs";
import { Link } from "react-router";
import EmptyTableDataComponent from "../../../../components/Common/EmptyTableData/EmptyTableData";
import { useState } from "react";
import Swal from "sweetalert2";
import useUserStatus from "../../../../hooks/useUserStatus";
import TableSkeleton from "../../../../components/Common/Loaders/TableSkeleton";
import QueryLoader from "../../../../components/Common/Loaders/QueryLoader";

export default function PendingOrdersPage() {
  const axios = useAxios();
  const { user } = useAuthStore();
  const [search, setSearch] = useState("");
  const { status, isLoading: isStatusLoading } = useUserStatus();

  const {
    data: orders = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["orders", user?.email, search],
    queryFn: async () => {
      const res = await axios.get(
        `/orders/pending?email=${user?.email}&search=${search}`
      );
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
      ? (statusInfo.deliveryStatus = "approved")
      : null;
    Swal.fire({
      title: "Are you sure?",
      text: "This order is going to be approved!",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "oklch(70% 0.2 145)",
      cancelButtonColor: "oklch(65% 0.28 25)",
      confirmButtonText: "Yes, Approve it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios.patch(`/orders/${order._id}`, statusInfo);
        refetch();
        Swal.fire({
          title: "Approved!",
          text: "Order is approved successfully.",
          icon: "success",
        });
      }
    });
  };
  const handleRejection = async (order) => {
    const statusInfo = {
      deliveryStatus: order?.deliveryStatus,
      orderId: order._id,
      trackingId: order.trackingId,
      location: "Dhaka",
    };
    order?.deliveryStatus === "pending"
      ? (statusInfo.deliveryStatus = "rejected")
      : null;
    Swal.fire({
      title: "Are you sure?",
      text: "This order is going to be rejected permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "oklch(75% 0.15 240)",
      cancelButtonColor: "oklch(65% 0.28 25)",
      confirmButtonText: "Yes, reject it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios.patch(`/orders/${order._id}`, statusInfo);
        refetch();
        Swal.fire({
          title: "Rejected!",
          text: "This order is rejected successfully.",
          icon: "success",
        });
      }
    });
  };
  if (isStatusLoading) return <QueryLoader />;
  return (
    <>
      <title>Pending Orders | GOPTS</title>
      <h4 className="text-3xl mb-4">Manage Pending Orders</h4>
      <div className="flex justify-between">
        <input
          type="search"
          className="input max-sm:w-full"
          placeholder="Search by product name..."
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      {isLoading ? (
        <TableSkeleton />
      ) : orders.length > 0 ? (
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
              {orders.map((o, i) => (
                <tr key={i} className="even:bg-base-200">
                  <td>{i + 1}</td>
                  <td>{o._id}</td>
                  <td>
                    <p>{`${o.firstName} ${o.lastName}`}</p>
                    <p>{o.buyerEmail}</p>
                  </td>
                  <td>{o.productName}</td>
                  <td>{o.orderQuantity}</td>
                  <td>{dayjs(o.createdAt).format("DD MMM, YYYY @ hh:mm a")}</td>
                  <td>
                    <div className="flex gap-2">
                      {status.status === "rejected" ? null : (
                        <>
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
                        </>
                      )}
                      <Link
                        className="btn btn-sm btn-soft btn-info border-info/20 rounded-full"
                        to={`/dashboard/pending-orders/${o._id}`}
                      >
                        View
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <EmptyTableDataComponent data={"Pending Orders"} />
      )}
    </>
  );
}
