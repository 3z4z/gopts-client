import { useQuery } from "@tanstack/react-query";
import parse from "html-react-parser";
import { useParams } from "react-router";
import useAxios from "../../../../hooks/useAxios";
import { container } from "../../../../utils/classNames";
import useRole from "../../../../hooks/useRole";
import dayjs from "dayjs";
import { FaCheckCircle } from "react-icons/fa";
import { FaCircleXmark } from "react-icons/fa6";
import ErrorPage from "../../../Error/Error";
import QueryLoader from "../../../../components/Common/Loaders/QueryLoader";
import LogSkeleton from "../../../../components/Common/Loaders/LogSkeleton";

export default function OrderDetailsPage() {
  const { id } = useParams();
  const axios = useAxios();
  const { role } = useRole();
  const {
    data: order = {},
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["order", id],
    queryFn: async () => {
      const res = await axios.get(`/orders/${id}`);
      return res.data;
    },
  });
  const { data: logs = {}, isLoading: isLogsLoading } = useQuery({
    queryKey: ["logs", order?.trackingId],
    queryFn: async () => {
      const res = await axios.get(`/tracking/${order?.trackingId}/logs`);
      return res.data;
    },
    retry: false,
  });
  if (isLoading) return <QueryLoader />;
  if (isError) return <ErrorPage />;
  return (
    <div className="bg-base-200 rounded-xl">
      <title>Order Details | GOPTS</title>
      <div className={container}>
        <div className="grid lg:grid-cols-2 md:grid-cols-5 py-7 gap-10">
          <div className="lg:col-span-1 md:col-span-2">
            <h4 className="text-2xl mb-5 font-extrabold text-secondary border-b border-b-neutral/10 max-w-max pe-4 pb-1">
              Order info
            </h4>
            <p>
              <span className="text-neutral/70">Product Name:</span>
              <span className="text-primary font-bold ms-2">
                {order?.productName}
              </span>
            </p>
            <p className="mb-1">
              <span className="text-neutral/70 me-1.5">Created date:</span>
              {dayjs(order.createdAt).format("DD MMM YYYY @ hh:mm:ss a")}
            </p>
            <p className="mb-1">
              <span className="text-neutral/70 me-1.5">Tracking ID:</span>
              {order.trackingId}
            </p>
            <p className="mb-1">
              <span className="text-neutral/70 me-1.5">
                Total unit ordered:
              </span>
              {order.orderQuantity}
            </p>
            <p className="mb-1">
              <span className="text-neutral/70 me-1.5">Total price:</span>
              {order.totalCost.toLocaleString("en-EN")} BDT
            </p>
            <div>
              {order.paymentStatus === "cod" ? (
                <p>
                  <span className="text-neutral/70 me-1.5">
                    Payment method:
                  </span>
                  <span>Cash on Delivery</span>
                </p>
              ) : order.paymentStatus === "unpaid" ? (
                <p>
                  <span className="text-neutral/70 me-1.5">
                    Payment method:
                  </span>
                  <span>Pay First (UNPAID)</span>
                </p>
              ) : (
                order.transactionId && (
                  <>
                    <span className="text-neutral/70 me-1.5">Tx ID:</span>
                    {order.transactionId}
                    <span className="badge badge-primary badge-soft border-primary/20 ms-2 mb-1">
                      Stripe
                    </span>
                  </>
                )
              )}
            </div>
            <h4 className="text-2xl my-5 font-extrabold text-secondary border-b border-b-neutral/10 max-w-max pe-4 pb-1">
              Buyer info
            </h4>
            <p className="mb-1">
              <span className="me-2 text-neutral/70">Ordered by:</span>
              <span className="me-1.5 text-primary font-bold">
                {order.firstName}
              </span>
              <span className="text-primary font-bold">{order.lastName}</span>
            </p>
            <p className="mb-1">
              <span className="text-neutral/70 me-1.5">Email:</span>
              {order.buyerEmail}
            </p>
            <p className="mb-1">
              <span className="text-neutral/70 me-1.5">Contact No:</span>
              {order.contactNumber}
            </p>
            <p className="mb-1">
              <span className="text-neutral/70 me-1.5">Address:</span>
              {order.address}
            </p>
            <p className="mb-1">
              <span className="text-neutral/70 me-1.5">Instructions:</span>
              {order.additionalNotes}
            </p>
            {role.role.toLowerCase() !== "manager" && (
              <>
                <h4 className="text-2xl my-5 font-extrabold text-secondary border-b border-b-neutral/10 max-w-max pe-4 pb-1">
                  Manager info
                </h4>
                <p>
                  <span className="text-neutral/70 me-1.5">Email:</span>
                  {order.managerEmail}
                </p>
              </>
            )}
          </div>
          <div className="lg:col-span-1 md:col-span-3">
            <h4 className="mb-5 text-2xl font-extrabold text-secondary border-b border-b-neutral/10 max-w-max pe-4 pb-1">
              Delivery Log
            </h4>
            {isLogsLoading ? (
              <LogSkeleton />
            ) : logs.length > 0 ? (
              <ul className="timeline timeline-vertical max-sm:timeline-compact w-max sm:max-w-max max-w-md">
                {logs.map((log, index) => (
                  <li
                    key={log._id}
                    className="grid grid-cols-[var(--timeline-col-start,minmax(0,1fr))_auto_var(--timeline-col-end,minmax(0,3fr))]"
                  >
                    {index !== 0 && <hr />}
                    <div className="timeline-start max-sm:mb-0 max-sm:mt-2 border border-dashed border-primary/40 bg-base-300 p-3 rounded-md">
                      <p className="text-sm text-primary font-bold mb-1 text-nowrap">
                        {dayjs(log.createdAt).format("DD MMM, YYYY")}
                      </p>
                      <p className="text-xs text-accent font-medium text-nowrap">
                        {dayjs(log.createdAt).format("hh:mm:ss a")}
                      </p>
                      <p className="text-xs font-semibold">
                        {log?.location || "N/A"}
                      </p>
                    </div>
                    <div className="timeline-middle">
                      {log.deliveryStatus === "rejected" ? (
                        <FaCircleXmark className="text-error text-xl" />
                      ) : (
                        <FaCheckCircle className="text-success text-xl" />
                      )}
                    </div>
                    <div
                      className={`timeline-end max-sm:-mt-1 max-sm:mb-2 timeline-box text-sm capitalize sm:max-w-80 max-w-64 ${
                        log.deliveryStatus === "rejected"
                          ? "text-error"
                          : "text-primary-content bg-primary"
                      }`}
                    >
                      {parse(log.details)}
                    </div>
                    {index !== logs.length - 1 && <hr />}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-6 py-10 bg-base-300 rounded-xl text-center">
                No logs found
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
