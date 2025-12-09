import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../../hooks/useAxios";
import { useAuthStore } from "../../../../stores/useAuthStore";
import dayjs from "dayjs";
import { Link } from "react-router";
import { useEffect, useRef, useState } from "react";
import EmptyTableDataComponent from "../../../../components/Common/EmptyTableData/EmptyTableData";

export default function ApprovedOrdersPage() {
  const axios = useAxios();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [search, setSearch] = useState("");

  const { user } = useAuthStore();
  const {
    data: orders = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["orders", user?.email, search],
    queryFn: async () => {
      const res = await axios.get(
        `/orders/approved?email=${user.email}&search=${search}`
      );
      return res.data;
    },
  });
  const updateDeliveryStatusModalRef = useRef();
  const handleModalOpen = (order) => {
    setSelectedOrder(order);
  };
  useEffect(() => {
    if (selectedOrder && updateDeliveryStatusModalRef.current) {
      updateDeliveryStatusModalRef.current.showModal();
    }
  }, [selectedOrder]);

  const handleUpdateStatus = async (order, status, details) => {
    try {
      const statusInfo = {
        deliveryStatus: status,
        trackingId: order.trackingId,
        details: details,
      };
      const res = await axios.patch(`/orders/${order._id}`, statusInfo);
      console.log(res.data);
      refetch();
    } catch (err) {
      console.log(err);
    }
    updateDeliveryStatusModalRef.current.close();
  };
  return (
    <>
      <h4 className="text-3xl mb-4">Manage Approved Orders</h4>
      <input
        type="search"
        className="input"
        placeholder="Search by product name..."
        onChange={(e) => setSearch(e.target.value)}
      />
      {isLoading ? (
        <p>Loading...</p>
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
                <th>Approve Date</th>
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
                  <td>
                    {o.approvedAt
                      ? dayjs(o.approvedAt).format("DD MMM, YYYY @ hh:mm a")
                      : "N/A"}
                  </td>
                  <td>
                    <div className="flex gap-2">
                      <button
                        className="btn btn-sm btn-success btn-soft border-success/20 rounded-full"
                        onClick={() => handleModalOpen(o)}
                      >
                        Add Tracking
                      </button>
                      <Link
                        className="btn btn-sm btn-info btn-soft border-info/20 rounded-full"
                        to={`/dashboard/approved-orders/${o._id}`}
                      >
                        View
                      </Link>
                      <dialog
                        ref={updateDeliveryStatusModalRef}
                        className="modal"
                      >
                        <div className="modal-box">
                          <div className="bg-base-300 p-4 rounded-md">
                            <h4 className="text-lg mb-3 font-bold text-primary">
                              Buyer Info
                            </h4>
                            <p className="mb-1">
                              <span className="text-neutral/70">Email:</span>{" "}
                              {selectedOrder?.buyerEmail}
                            </p>
                            <p className="mb-1">
                              <span className="text-neutral/70">
                                Buyer Contact:
                              </span>{" "}
                              {selectedOrder?.contactNumber}
                            </p>
                            <p className="mb-1">
                              <span className="text-neutral/70">Address:</span>{" "}
                              {selectedOrder?.address}
                            </p>
                            <p className="mb-1">
                              <span className="text-neutral/70">
                                Instructions:
                              </span>{" "}
                              {selectedOrder?.additionalNotes}
                            </p>
                          </div>
                          <div className="modal-action">
                            {(() => {
                              let details = "";
                              switch (selectedOrder?.deliveryStatus) {
                                case "approved":
                                  details =
                                    "Order is ready to start processing";
                                  return (
                                    <button
                                      className="btn btn-primary h-auto rounded-full px-6 py-2"
                                      onClick={() =>
                                        handleUpdateStatus(
                                          selectedOrder,
                                          "product_ready",
                                          details
                                        )
                                      }
                                    >
                                      Mark as Product Ready
                                    </button>
                                  );
                                case "product_ready":
                                  details =
                                    "Product prepared, ready for QC check";
                                  return (
                                    <button
                                      className="btn btn-primary h-auto rounded-full px-6 py-2"
                                      onClick={() =>
                                        handleUpdateStatus(
                                          selectedOrder,
                                          "qc_passed",
                                          details
                                        )
                                      }
                                    >
                                      Mark as QC Passed
                                    </button>
                                  );
                                case "qc_passed":
                                  details = "QC passed, ready to pack";
                                  return (
                                    <button
                                      className="btn btn-primary h-auto rounded-full px-6 py-2"
                                      onClick={() =>
                                        handleUpdateStatus(
                                          selectedOrder,
                                          "packed",
                                          details
                                        )
                                      }
                                    >
                                      Mark as Packed
                                    </button>
                                  );
                                case "packed":
                                  details =
                                    "Packing completed, Sending to delivery";
                                  return (
                                    <button
                                      className="btn btn-primary h-auto rounded-full px-6 py-2"
                                      onClick={() =>
                                        handleUpdateStatus(
                                          selectedOrder,
                                          "sent",
                                          details
                                        )
                                      }
                                    >
                                      Mark as Sent
                                    </button>
                                  );
                                case "sent":
                                  details = "Order is ready to pickup";
                                  return (
                                    <button
                                      className="btn btn-primary h-auto rounded-full px-6 py-2"
                                      onClick={() =>
                                        handleUpdateStatus(
                                          selectedOrder,
                                          "pickup_ready",
                                          details
                                        )
                                      }
                                    >
                                      Ready for Pickup
                                    </button>
                                  );
                                case "pickup_ready":
                                  if (selectedOrder.paymentMethod === "cod") {
                                    details = `Cash payment received. <br/> Amount: ${selectedOrder.totalCost.toLocaleString(
                                      "en-EN"
                                    )} BDT`;
                                    return (
                                      <button
                                        className="btn btn-primary h-auto rounded-full px-6 py-2"
                                        onClick={() =>
                                          handleUpdateStatus(
                                            selectedOrder,
                                            "payment_confirmed",
                                            details
                                          )
                                        }
                                      >
                                        Mark as paid
                                      </button>
                                    );
                                  }
                                  details = "Delivery Successfully Completed";
                                  return (
                                    <button
                                      className="btn btn-primary h-auto rounded-full px-6 py-2"
                                      onClick={() =>
                                        handleUpdateStatus(
                                          selectedOrder,
                                          "delivery_done",
                                          details
                                        )
                                      }
                                    >
                                      Mark as done
                                    </button>
                                  );
                                case "payment_confirmed":
                                  details = "Delivery Successfully Completed";
                                  return (
                                    <button
                                      className="btn btn-primary h-auto rounded-full px-6 py-2"
                                      onClick={() =>
                                        handleUpdateStatus(
                                          selectedOrder,
                                          "delivery_done",
                                          details
                                        )
                                      }
                                    >
                                      Mark as done
                                    </button>
                                  );
                                default:
                                  return (
                                    <button
                                      disabled
                                      className="btn btn-primary h-auto rounded-full px-6 py-2"
                                    >
                                      Product Delivered
                                    </button>
                                  );
                              }
                            })()}
                            <button
                              className="btn btn-error btn-outline h-auto rounded-full px-6 py-2"
                              onClick={() =>
                                updateDeliveryStatusModalRef.current.close()
                              }
                            >
                              Close
                            </button>
                          </div>
                        </div>
                      </dialog>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <EmptyTableDataComponent data={"Approved Orders"} />
      )}
    </>
  );
}
