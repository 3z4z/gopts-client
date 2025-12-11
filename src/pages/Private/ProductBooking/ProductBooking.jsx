import { useParams } from "react-router";
import useProduct from "../../../hooks/useProduct";
import { useForm, useWatch } from "react-hook-form";
import { useAuthStore } from "../../../stores/useAuthStore";
import SectionTitleComponent from "../../../components/Common/SectionTitle/SectionTitle";
import { useEffect, useState } from "react";
import useAxios from "../../../hooks/useAxios";
import toast from "react-hot-toast";
import { handlePayment } from "../../../utils/handlePayment";
import useUserStatus from "../../../hooks/useUserStatus";
import AccessDeniedComponent from "../../Dashboard/Common/AccessDenied/AccessDenied";
import QueryLoader from "../../../components/Common/Loaders/QueryLoader";
import AuthSpinnerLoader from "../../../components/Common/Loaders/AuthSpinner";

export default function ProductBookingPage() {
  const { id } = useParams();
  const { user } = useAuthStore();
  const [cost, setCost] = useState(null);
  const axios = useAxios();
  const [isBooking, setIsBooking] = useState(false);
  const { status, isLoading: isStatusLoading } = useUserStatus();
  const { data: product = {}, isLoading } = useProduct({ id: id });
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: "all",
  });
  const watchOrderQuantity = useWatch({ name: "orderQuantity", control });
  const handleBookProduct = async (data) => {
    setIsBooking(true);
    const bookingInfo = {
      ...data,
      productId: product._id,
      managerEmail: product.managerEmail,
      totalCost: Number(
        data.totalCost !== product.price ? cost : data.totalCost
      ),
      orderQuantity: Number(data.orderQuantity),
      paymentMethod: product.paymentMethod,
    };
    try {
      const res = await axios.post("/orders", bookingInfo);
      if (bookingInfo?.paymentMethod?.toLowerCase() === "stripe") {
        const orderId = res.data.orderId;
        await handlePayment(orderId, axios);
      }
      console.log("bookingInfo", bookingInfo);
      if (res?.status === 201) {
        toast.success("Booking confirmed!");
        reset();
      } else {
        toast.error(res?.response.data.message || "Something went wrong!");
      }
    } catch (err) {
      toast.error(
        err?.response?.data?.message || err?.message || "Server failed to post"
      );
    } finally {
      setIsBooking(false);
    }
  };
  useEffect(() => {
    if (watchOrderQuantity && product?.price) {
      const total = Number(watchOrderQuantity) * Number(product.price);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCost(total);
    }
  }, [product, watchOrderQuantity]);
  if (isLoading || isStatusLoading)
    return (
      <div className="mt-32">
        <QueryLoader />
      </div>
    );
  return (
    <>
      {status.status === "rejected" ? (
        <AccessDeniedComponent />
      ) : (
        <div className="mt-32 px-3">
          <SectionTitleComponent
            title={"Book your product"}
            subtitle={"Book your desired product with quick simple steps"}
          />
          <form
            onSubmit={handleSubmit(handleBookProduct)}
            className="fieldset max-w-2xl mx-auto border border-base-300 shadow-lg rounded-xl bg-base-200 py-8 lg:px-8 px-2"
          >
            <div className="mb-3">
              <label>Product Name</label>
              <input
                className="input disabled:bg-primary/7 w-full"
                type="text"
                placeholder="Product name"
                defaultValue={product?.name}
                {...register("productName")}
                disabled
              />
            </div>
            <div className="flex flex-wrap gap-4 mb-3">
              <div className="sm:flex-1 max-sm:w-full">
                <label className="block">Payment Method</label>
                <input
                  className="input disabled:bg-primary/7 w-full"
                  type="text"
                  placeholder="Payment method"
                  defaultValue={
                    product?.paymentMethod === "stripe"
                      ? "Pay First"
                      : product?.paymentMethod
                  }
                  disabled
                />
              </div>
              <div className="sm:flex-1 max-sm:w-full">
                <label className="block">Price per unit</label>
                <input
                  className="input disabled:bg-primary/7 w-full"
                  type="number"
                  placeholder="Product price"
                  defaultValue={product?.price}
                  disabled
                />
              </div>
            </div>
            <div className="flex flex-wrap gap-4 mb-3">
              <div className="sm:flex-1 max-sm:w-full">
                <label className="block">First Name</label>
                <input
                  disabled={isBooking}
                  type="text"
                  className="input w-full"
                  placeholder="John"
                  {...register("firstName", {
                    required: "First name is required",
                    minLength: {
                      value: 3,
                      message: "First name is too short",
                    },
                  })}
                />
                {errors.firstName && (
                  <p className="text-error">{errors.firstName.message}</p>
                )}
              </div>
              <div className="sm:flex-1 max-sm:w-full">
                <label className="block">Last Name</label>
                <input
                  disabled={isBooking}
                  type="text"
                  className="input w-full"
                  placeholder="Doe"
                  {...register("lastName", {
                    required: "Last name is required",
                    minLength: {
                      value: 3,
                      message: "Last name is too short",
                    },
                  })}
                />
                {errors.lastName && (
                  <p className="text-error">{errors.lastName.message}</p>
                )}
              </div>
            </div>
            <div className="flex flex-wrap gap-4 mb-3">
              <div className="sm:flex-1 max-sm:w-full">
                <label className="block">Email</label>
                <input
                  type="email"
                  className="input disabled:bg-primary/7 w-full"
                  placeholder="Email"
                  defaultValue={user?.email}
                  {...register("buyerEmail")}
                  disabled
                />
              </div>
              <div className="sm:flex-1 max-sm:w-full">
                <label className="block">Contact Number</label>
                <input
                  disabled={isBooking}
                  type="text"
                  className="input w-full"
                  placeholder="01xxxx"
                  {...register("contactNumber", {
                    required: "Contact number is required",
                    pattern: {
                      value: /^01[356789][0-9]{8}$/,
                      message: "Invalid contact number",
                    },
                  })}
                />
                {errors.contactNumber && (
                  <p className="text-error">{errors.contactNumber.message}</p>
                )}
              </div>
            </div>
            <div className="flex flex-wrap gap-4 mb-3">
              <div className="sm:flex-1 max-sm:w-full">
                <label className="block">Order Quantity</label>
                <input
                  disabled={isBooking}
                  type="number"
                  className="input w-full"
                  placeholder="1"
                  {...register("orderQuantity", {
                    required: "Order Quantity is required",
                    min: {
                      value: product?.minOrderAmount,
                      message: `Order at least minimum of ${product?.minOrderAmount} units`,
                    },
                    max: {
                      value: product?.availableQuantity,
                      message: `Quantity can't exceed ${product?.availableQuantity} units`,
                    },
                  })}
                />
                {errors.orderQuantity && (
                  <p className="text-error">{errors.orderQuantity.message}</p>
                )}
              </div>
              <div className="sm:flex-1 max-sm:w-full">
                <label className="block">Total Cost</label>
                <input
                  type="text"
                  className="input disabled:bg-base-100 font-bold text-primary w-full"
                  placeholder="0"
                  value={cost || product?.price}
                  {...register("totalCost")}
                  disabled
                />
              </div>
            </div>
            <div className="mb-4">
              <label>Address</label>
              <textarea
                disabled={isBooking}
                className="textarea w-full resize-none"
                placeholder="Jatrabari, Dhaka"
                rows={3}
                {...register("address", {
                  required: "Address is required",
                  minLength: {
                    value: 6,
                    message: "Address is too short",
                  },
                })}
              ></textarea>
              {errors.address && (
                <p className="text-error">{errors.address.message}</p>
              )}
            </div>
            <div className="mb-4">
              <label>Additional Notes</label>
              <textarea
                disabled={isBooking}
                className="textarea w-full resize-none"
                placeholder="Handle with care"
                rows={3}
                {...register("additionalNotes", {
                  required: "Additional notes is required",
                  minLength: {
                    value: 6,
                    message: "Note is too short",
                  },
                })}
              ></textarea>
              {errors.additionalNotes && (
                <p className="text-error">{errors.additionalNotes.message}</p>
              )}
            </div>
            <button
              disabled={!isValid || isBooking}
              className="btn btn-primary w-max px-8 rounded-full"
            >
              {isBooking && <AuthSpinnerLoader />}
              Confirm Booking
            </button>
          </form>
        </div>
      )}
    </>
  );
}
