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
  const { data: categories = [], isLoading: isCategoriesLoading } =
    useCategories();
  const axios = useAxios();
  const { user } = useAuthStore();
  const { reset, setValue, control } = useForm({
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
            createdAt: new Date().toISOString(),
            managerName: user?.displayName,
            managerEmail: user?.email,
            minOrderAmount: Number(data.minOrderAmount),
            images: productImageUrls,
          };
          const productRes = await axios.post("/products", productData);
          if (productRes.status === 201) {
            toast.success(productRes.data?.message);
            reset();
            setImageFiles([]);
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
    setImageFiles((prev) => [...prev, ...Array.from(newFiles)]);
    console.log("newFiles", imageFiles);
    console.log("newFiles", newFiles);
  };

  const removeImage = (index) => {
    const updatedFiles = imageFiles.filter((_, i) => i !== index);
    if (updatedFiles.length === 0) {
      setValue("images", [], { shouldValidate: true });
    }
    console.log("updatedFiles", updatedFiles);
    setImageFiles(updatedFiles);
  };
  return (
    <>
      <h4 className="mb-4 text-3xl">Add a product</h4>
      <div className="bg-base-200 rounded-lg py-8">
        <ProductForm
          categories={categories}
          handleImageChange={handleImageChange}
          onSubmit={addProduct}
          isCategoriesLoading={isCategoriesLoading}
          isProductAdding={isProductAdding}
          removeImage={removeImage}
          imageFiles={imageFiles}
          setImageFiles={setImageFiles}
        />
      </div>
    </>
  );
}
