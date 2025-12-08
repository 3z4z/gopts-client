import SectionTitleComponent from "../../../../components/Common/SectionTitle/SectionTitle";

export default function PaymentFailedPage() {
  return (
    <div className="mt-32 px-3 text-center">
      <SectionTitleComponent
        title="Payment Cancelled"
        subtitle="Your booking has not been finalized as the payment was cancelled or failed."
      />
      <div className="max-w-xl mx-auto p-6 bg-yellow-100 border border-yellow-400 rounded-lg shadow-lg">
        <p className="text-lg font-semibold text-yellow-700">What now?</p>
        <p className="mt-2">
          Your order status remains as **unpaid**. You can attempt the payment
          again from your order history.
        </p>
        {/* Link back to where they can find their unpaid order, e.g., an order history page */}
        <a href="/dashboard/my-orders" className="btn btn-warning mt-4">
          Go to My Orders
        </a>
      </div>
    </div>
  );
}
