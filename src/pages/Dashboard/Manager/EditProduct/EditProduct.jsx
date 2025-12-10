import { useParams } from "react-router";
import ProductForm from "../Common/ProductForm";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../../hooks/useAxios";
import { useEffect, useState } from "react";
import useCategories from "../../../../hooks/useCategories";
import { axiosInstance } from "../../../../utils/axiosInstance";
import toast from "react-hot-toast";

export default function EditProductPage() {
  const { id } = useParams();
  const axios = useAxios();
  const [isProductEditing, setIsProductEditing] = useState(false);
  const [imageFiles, setImageFiles] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const { data: categories, isLoading: isCategoriesLoading } = useCategories();
  const {
    data: product = {},
    isLoading: isProductLoading,
    refetch,
  } = useQuery({
    queryKey: ["products", id],
    queryFn: async () => {
      const res = await axios.get(`/products/${id}`);
      return res.data;
    },
    enabled: !!id,
  });
  useEffect(() => {
    if (product.images && product.images.length > 0) {
      setImageUrls(product.images);
      setImageFiles(product.images);
    }
  }, [product]);

  const handleImageChange = (e) => {
    const newFiles = Array.from(e.target.files);
    const objImageUrls = newFiles.map((f) => URL.createObjectURL(f));
    setImageUrls((prev) => [...prev, ...objImageUrls]);
    setImageFiles((prev) => [...prev, ...newFiles]);
  };

  const removeImage = (index) => {
    const updatedFiles = imageFiles.filter((_, i) => i !== index);
    const updatedUrls = imageUrls.filter((_, i) => i !== index);
    setImageFiles(updatedFiles);
    setImageUrls(updatedUrls);
  };
  const editProduct = async (data) => {
    setIsProductEditing(true);
    let finalImageUrls = [];

    try {
      const filesToUpload = imageFiles.filter((file) => file instanceof File);
      const existingImageUrls = imageFiles.filter(
        (file) => typeof file === "string"
      );

      if (filesToUpload.length > 0) {
        const formData = new FormData();
        filesToUpload.forEach((file) => formData.append("productImages", file));

        const uploadRes = await axiosInstance.post(
          "/upload/product-images",
          formData
        );
        finalImageUrls = [
          ...existingImageUrls,
          // eslint-disable-next-line no-unsafe-optional-chaining
          ...uploadRes.data?.productImageUrls,
        ];
      } else {
        finalImageUrls = existingImageUrls;
      }

      const productData = {
        ...data,
        demoVideoLink: data.demoVideoLink,
        minOrderAmount: Number(data.minOrderAmount),
        images: finalImageUrls,
      };
      console.log("productData", productData);

      const productRes = await axios.patch(`/products/${id}`, productData);

      console.log("productRes", productRes);
      if (productRes.status === 200) {
        toast.success(
          productRes.data?.message || "Product updated successfully!"
        );
        refetch();
      } else {
        toast.error(productRes.data?.message || "Product update failed.");
      }
    } catch (err) {
      toast.error(
        err.response?.data?.message || "An error occurred during update."
      );
      console.error(err);
    } finally {
      setIsProductEditing(false);
    }
  };

  if (isProductLoading || isCategoriesLoading) {
    return <div>Loading product and categories...</div>;
  }

  if (!product || !product.name) {
    return <div>Product not found or failed to load.</div>;
  }

  return (
    <>
      <h4 className="mb-4 text-3xl">Edit your product: {product.name}</h4>
      <div className="bg-base-200 rounded-lg py-8">
        <ProductForm
          product={product}
          onSubmit={editProduct}
          categories={categories}
          isCategoriesLoading={isCategoriesLoading}
          removeImage={removeImage}
          handleImageChange={handleImageChange}
          isProductAdding={isProductEditing}
          setImageFiles={setImageFiles}
          imageUrls={imageUrls}
          imageFiles={imageFiles}
        />
      </div>
    </>
  );
}
