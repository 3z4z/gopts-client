import { useForm, useWatch } from "react-hook-form";
import { useEffect, useState } from "react";
import useCategories from "../../../../hooks/useCategories";
import { axiosInstance } from "../../../../utils/axiosInstance";
import useAxios from "../../../../hooks/useAxios";
import toast from "react-hot-toast";
import { useAuthStore } from "../../../../stores/useAuthStore";
import ProductForm from "../Common/ProductForm";

export default function AddProductPage() {
  const [isProductAdding, setIsProductAdding] = useState(false);
  const [imageFiles, setImageFiles] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [formResetKey, setFormResetKey] = useState(0);
  const { data: categories = [], isLoading: isCategoriesLoading } =
    useCategories();
  const axios = useAxios();
  const { user } = useAuthStore();
  const { control } = useForm({
    mode: "all",
    defaultValues: {
      images: [],
    },
  });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const watchUploadImages = useWatch({ name: "images", control }) || [];

  useEffect(() => {
    setImageFiles((prev) => [...prev, ...Array.from(watchUploadImages)]);
  }, [watchUploadImages, setImageFiles]);

  const addProduct = async (data) => {
    setIsProductAdding(true);
    await axios
      .post("/products/check-duplicate", { name: data?.name })
      .then(async (res) => {
        if (res.data?.existed === false) {
          const formData = new FormData();
          for (let i = 0; imageFiles.length > i; i++) {
            formData.append("productImages", imageFiles[i]);
          }
          const res = await axiosInstance.post(
            "/upload/product-images",
            formData
          );
          const productImageUrls = await res.data?.productImageUrls;
          const productData = {
            ...data,
            managerName: user?.displayName,
            managerEmail: user?.email,
            minOrderAmount: Number(data.minOrderAmount),
            images: productImageUrls,
          };
          const productRes = await axios.post("/products", productData);
          if (productRes.status === 201) {
            toast.success(productRes.data?.message);
            setFormResetKey((prev) => prev + 1);
            setImageFiles([]);
            setImageUrls([]);
          } else {
            toast.error(productRes.data?.message);
          }
        } else {
          toast.error(res.data?.message);
        }
      })
      .catch((err) => {
        toast.error(err);
        console.log(err);
      });
    setIsProductAdding(false);
  };

  const handleImageChange = (e) => {
    const newFiles = Array.from(e.target.files);
    const getImageUrls = newFiles.map((i) => URL.createObjectURL(i));
    setImageFiles((prev) => [...prev, ...newFiles]);
    setImageUrls((prev) => [...prev, ...getImageUrls]);
  };

  const removeImage = (index) => {
    const updatedFiles = imageFiles.filter((_, i) => i !== index);
    const updatedUrls = imageUrls.filter((_, i) => i !== index);
    setImageFiles(updatedFiles);
    setImageUrls(updatedUrls);
  };
  return (
    <>
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
  );
}
