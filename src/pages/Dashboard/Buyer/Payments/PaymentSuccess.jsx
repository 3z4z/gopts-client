import { useLocation } from "react-router";
import { useEffect, useState } from "react";
import useAxios from "../../../../hooks/useAxios";
import SectionTitleComponent from "../../../../components/Common/SectionTitle/SectionTitle";

export default function PaymentSuccessPage() {
  const location = useLocation();
  const axios = useAxios();
  const [loading, setLoading] = useState(true);
  const [successData, setSuccessData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const sessionId = query.get("session_id");

    if (sessionId) {
      const finalizePayment = async () => {
        try {
          const res = await axios.patch(
            `/payment/payment-success?session_id=${sessionId}`
          );

          if (res.data.success) {
            if (res?.status === 400) {
              return;
            }
            return setSuccessData(res.data);
          } else {
            return setError(
              res.data.message ||
                "Payment processing failed or already recorded."
            );
          }
        } catch (err) {
          console.error("Payment success error:", err);
          if (err?.status === 400) {
            return;
          }
          return setError(
            err?.response?.data?.message ||
              "Failed to process payment on server."
          );
        } finally {
          setLoading(false);
        }
      };
      finalizePayment();
    } else {
      setError("Missing session ID.");
      setLoading(false);
    }
  }, [axios, location.search]);

  if (loading)
    return (
      <p className="text-center mt-32">Processing Payment... Please wait.</p>
    );

  return (
    <div className="mt-32 px-3 text-center">
      <SectionTitleComponent
        title={successData ? "Payment Successful!" : "Payment Issue"}
        subtitle={
          successData
            ? "Your booking is complete and payment is confirmed."
            : "There was an issue finalizing your payment."
        }
      />
      {successData && (
        <div className="max-w-xl mx-auto p-6 bg-green-100 border border-green-400 rounded-lg shadow-lg">
          <p className="text-lg font-semibold text-green-700">
            Booking Complete!
          </p>
          <p className="mt-2">
            Transaction ID:{" "}
            <span className="text-gray-800">{successData.transactionId}</span>
          </p>
          <p>
            Order Tracking ID:{" "}
            <span className="text-gray-800">{successData.trackingId}</span>
          </p>
          {/* Add a link to the user's order history */}
          <a href="/dashboard/my-orders" className="btn btn-primary mt-4">
            View My Orders
          </a>
        </div>
      )}
      {error && (
        <div className="max-w-xl mx-auto p-6 bg-red-100 border border-red-400 rounded-lg shadow-lg">
          <p className="text-lg font-semibold text-red-700">Error:</p>
          <p className="mt-2 text-red-700">{error}</p>
          <a href="/dashboard/my-orders" className="btn btn-warning mt-4">
            Check Order Status
          </a>
        </div>
      )}
    </div>
  );
}
