import Swal from "sweetalert2";

export const handleProductDelete = (product, axios, refetch) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "oklch(75% 0.15 240)",
    cancelButtonColor: "oklch(65% 0.28 25)",
    confirmButtonText: "Yes, delete it!",
  }).then(async (result) => {
    if (result.isConfirmed) {
      await axios.delete(`/products/${product._id}`);
      refetch();
      Swal.fire({
        title: "Deleted!",
        text: "This product has been deleted.",
        icon: "success",
      });
    }
  });
};
