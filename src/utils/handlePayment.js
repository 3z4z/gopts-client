export const handlePayment = async (orderId, axios) => {
  const paymentInfo = {
    orderId,
  };
  console.log(paymentInfo);
  const sessionRes = await axios.post(
    "/payment/create-checkout-session",
    paymentInfo
  );
  console.log("sessionRes", sessionRes);
  window.location.href = sessionRes.data.url;
};
