import { useEffect, useState } from "react";
import useCategories from "../../../../hooks/useCategories";
import { axiosInstance } from "../../../../utils/axiosInstance";
import useAxios from "../../../../hooks/useAxios";
import toast from "react-hot-toast";
import { useAuthStore } from "../../../../stores/useAuthStore";
import ProductForm from "../Common/ProductForm";
import useUserStatus from "../../../../hooks/useUserStatus";
import AccessDeniedComponent from "../../Common/AccessDenied/AccessDenied";
import QueryLoader from "../../../../components/Common/Loaders/QueryLoader";

export default function AddProductPage() {
  const [isProductAdding, setIsProductAdding] = useState(false);
  const [imageFiles, setImageFiles] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [formResetKey, setFormResetKey] = useState(0);
  const { status, isLoading: isStatusLoading } = useUserStatus();
  const { data: categories = [], isLoading: isCategoriesLoading } =
    useCategories();
  const axios = useAxios();
  const { user } = useAuthStore();

  const addProduct = async (data) => {
    setIsProductAdding(true);
    try {
      const duplicateRes = await axios.post("/products/check-duplicate", {
        name: data?.name,
      });
      if (duplicateRes.data?.existed) {
        toast.error(duplicateRes.data?.message);
        setIsProductAdding(false);
        return;
      }

      const formData = new FormData();
      imageFiles.forEach((file) => formData.append("productImages", file));

      const uploadRes = await axiosInstance.post(
        "/upload/product-images",
        formData
      );
      if (!uploadRes?.data?.success) {
        toast.error(uploadRes?.data?.message || "Image upload failed!");
        setIsProductAdding(false);
        return;
      }

      const productData = {
        ...data,
        managerName: user?.displayName,
        managerEmail: user?.email,
        minOrderAmount: Number(data.minOrderAmount),
        images: uploadRes.data.productImageUrls || [],
      };

      const productRes = await axios.post("/products", productData);
      if (productRes.status === 201) {
        toast.success(productRes.data?.message);
        setFormResetKey((prev) => prev + 1);
        setImageFiles([]);
        setImageUrls([]);
      } else {
        toast.error(productRes.data?.message || "Failed to add product!");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Something went wrong!");
      console.log(err);
    }
    setIsProductAdding(false);
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newFiles = files.filter(
      (file) =>
        !imageFiles.some((f) => f.name === file.name && f.size === file.size)
    );
    if (newFiles.length === 0) {
      e.target.value = "";
      return;
    }
    setImageFiles((prev) => [...prev, ...newFiles]);
    setImageUrls((prev) => [
      ...prev,
      ...newFiles.map((f) => URL.createObjectURL(f)),
    ]);
    e.target.value = "";
  };
  useEffect(() => {
    console.log(imageUrls);
    console.log(imageFiles);
  }, [imageFiles, imageUrls]);

  const removeImage = (index) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
    setImageUrls((prev) => prev.filter((_, i) => i !== index));
  };

  if (isStatusLoading) return <QueryLoader />;

  return (
    <>
      {status.status === "rejected" ? (
        <AccessDeniedComponent />
      ) : (
        <>
          <title>Add Product | GOPTS</title>
          <h4 className="mb-4 text-3xl">Add a product</h4>
          <div className="bg-base-200 rounded-lg py-8">
            <ProductForm
              key={formResetKey}
              categories={categories}
              handleImageChange={handleImageChange}
              onSubmit={addProduct}
              isCategoriesLoading={isCategoriesLoading}
              isProductAdding={isProductAdding}
              removeImage={removeImage}
              imageFiles={imageFiles}
              imageUrls={imageUrls}
              setImageFiles={setImageFiles}
            />
          </div>
        </>
      )}
    </>
  );
}
