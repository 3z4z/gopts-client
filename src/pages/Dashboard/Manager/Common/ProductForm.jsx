import { useForm, useWatch } from "react-hook-form";
import { container } from "../../../../utils/classNames";
import UploadInfiniteLoader from "../../../../components/Common/Loaders/UploadInfinite";
import { IoMdCloseCircle } from "react-icons/io";
import AuthSpinnerLoader from "../../../../components/Common/Loaders/AuthSpinner";
import { LuImagePlus } from "react-icons/lu";
import { useEffect } from "react";

export default function ProductForm({
  product,
  onSubmit,
  isProductAdding,
  categories = [],
  isCategoriesLoading,
  handleImageChange,
  removeImage,
  imageUrls = [],
}) {
  const {
    register,
    handleSubmit,
    trigger,
    setValue,
    reset,
    control,
    formState: { errors, isValid },
  } = useForm({
    mode: "all",
    defaultValues: {
      name: "",
      category: "Select a category",
      description: "",
      price: null,
      availableQuantity: null,
      minOrderAmount: "50",
      markFeatured: false,
      paymentMethod: "Select payment method",
      images: [],
    },
  });
  useEffect(() => {
    if (product && product._id) {
      reset({
        name: product.name,
        category: product.category,
        description: product.description,
        price: product.price,
        availableQuantity: product.availableQuantity,
        minOrderAmount: product.minOrderAmount,
        markFeatured: product.markFeatured,
        paymentMethod: product.paymentMethod,
        images: product.images,
      });
    } else {
      reset({
        name: "",
        category: "Select a category",
        description: "",
        price: null,
        availableQuantity: null,
        minOrderAmount: "50",
        markFeatured: "",
        paymentMethod: "Select payment method",
        images: [],
      });
    }
  }, [product, reset]);

  const watchMinimumOrder = useWatch({ name: "minOrderAmount", control });
  const watchAvailableQts = useWatch({ name: "availableQuantity", control });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={`fieldset ${container}`}>
      <div className="grid lg:grid-cols-2 gap-10">
        <div>
          <div className="flex max-sm:flex-col sm:gap-6 gap-3 mb-3">
            <div className="flex flex-col gap-1 flex-1">
              <label>Product Name</label>
              <input
                disabled={isProductAdding}
                type="text"
                className="input w-full"
                placeholder="Product Name"
                {...register("name", {
                  required: "Product name is required",
                })}
              />
              {errors.name && (
                <p className="text-error">{errors.name.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-1 flex-1">
              <label>Product Category</label>
              <select
                disabled={isProductAdding}
                className="select w-full"
                defaultValue={"Select a category"}
                {...register("category", {
                  validate: (value) =>
                    value !== "Select a category" ||
                    "A valid category is required",
                })}
              >
                <option value="Select a category">Select a category</option>
                {isCategoriesLoading ? (
                  <option>Loading...</option>
                ) : (
                  categories.map((cat) => (
                    <option key={cat._id} value={cat.name}>
                      {cat.name}
                    </option>
                  ))
                )}
              </select>
              {errors.category && (
                <p className="text-error">{errors.category.message}</p>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-1 mb-3">
            <label>Product Description</label>
            <textarea
              disabled={isProductAdding}
              rows={6}
              className="textarea resize-none w-full"
              placeholder="Product Description"
              {...register("description", {
                required: "Description is required",
                minLength: {
                  value: 10,
                  message: "Description is too short",
                },
              })}
            ></textarea>
            {errors.description && (
              <p className="text-error">{errors.description.message}</p>
            )}
          </div>
          <div className="flex max-sm:flex-col sm:gap-6 gap-3 mb-3">
            <div className="flex flex-col gap-1 flex-1">
              <label>Price in BDT</label>
              <input
                disabled={isProductAdding}
                type="number"
                className="input w-full"
                placeholder="Price in BDT"
                {...register("price", {
                  valueAsNumber: true,
                  required: "Product price is required",
                  min: {
                    value: 100,
                    message: "Price is too small",
                  },
                })}
              />
              {errors.price && (
                <p className="text-error">{errors.price.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-1 flex-1">
              <label>Available Quantity</label>
              <input
                disabled={isProductAdding}
                type="number"
                className="input w-full"
                placeholder="Available Quantity"
                {...register("availableQuantity", {
                  valueAsNumber: true,
                  required: "Available quantity is required",
                  min: {
                    value: Number(watchMinimumOrder) + 1,
                    message:
                      "Available quantity must be more than minimum order",
                  },
                })}
              />
              {errors.availableQuantity && (
                <p className="text-error">{errors.availableQuantity.message}</p>
              )}
            </div>
          </div>
          <div className="flex max-sm:flex-col sm:gap-6 gap-3 mb-3">
            <div className="flex flex-col gap-1 flex-1">
              <label className="block">Minimum Order Quantity</label>
              <input
                disabled={isProductAdding}
                type="number"
                className="input w-full"
                placeholder="Available Quantity"
                {...register("minOrderAmount", {
                  valueAsNumber: true,
                  required: "Minimum order amount is required",
                  min: {
                    value: 50,
                    message: "Minimum amount is too small",
                  },
                  max: {
                    value: Number(watchAvailableQts) - 1,
                    message: "Can't exceed available quantity",
                  },
                })}
              />
              {errors.minOrderAmount && (
                <p className="text-error">{errors.minOrderAmount.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-1 flex-1">
              <label>Payment Method</label>
              <select
                disabled={isProductAdding}
                className="select w-full"
                defaultValue={"Select payment method"}
                {...register("paymentMethod", {
                  validate: (value) =>
                    value !== "Select payment method" ||
                    "A valid payment method is required",
                })}
              >
                <option value="Select payment method">
                  Select payment method
                </option>
                <option value="cod">Cash On delivery</option>
                <option value="stripe">Stripe</option>
              </select>
              {errors.paymentMethod && (
                <p className="text-error">{errors.paymentMethod.message}</p>
              )}
            </div>
          </div>
          <div className="flex max-sm:flex-col sm:gap-6 gap-3 mb-3">
            <div className="flex flex-col gap-1 flex-1">
              <label>Youtube Video Demo</label>
              <input
                disabled={isProductAdding}
                type="text"
                className="input w-full"
                placeholder="https://..."
              />
            </div>
          </div>
          <label className="flex items-center cursor-pointer">
            <input
              disabled={isProductAdding}
              type="checkbox"
              className="checkbox checkbox-sm checkbox-primary rounded-md"
              defaultChecked={false}
              {...register("markFeatured", { valueAsBoolean: true })}
            />
            <span className="mt-px ms-2">
              Feature this product on <strong>Home Page</strong>
            </span>
          </label>
        </div>
        <div>
          <label className="mb-1.5 block">Upload Images</label>
          <div className="grid grid-cols-2 gap-3">
            <label className="max-sm:col-span-2 flex flex-col items-center justify-center w-full h-40 border border-dashed border-neutral/35 rounded-xl cursor-pointer bg-base-200/25 hover:bg-base-200/50 transition">
              <div className="flex flex-col items-center gap-2">
                <LuImagePlus className="w-12 h-12 text-primary/75" />
                <p className="text-sm text-accent">
                  <span className="font-semibold">Click to upload</span>
                </p>
                <p className="text-xs text-accent/75 text-center">
                  PNG, JPG, JPEG, WEBP, JFIF (1:1 preferred)
                </p>
              </div>
              <input
                disabled={isProductAdding}
                onClick={() => trigger("images")}
                type="file"
                accept="image/*"
                className="hidden"
                multiple
                onChange={handleImageChange}
              />
            </label>
            {imageUrls.map((image, index) => (
              <figure
                key={index}
                className="h-40 w-full overflow-hidden flex items-center justify-center border border-primary/20 rounded-lg relative"
              >
                <img
                  src={
                    typeof image === "string"
                      ? image
                      : URL.createObjectURL(image)
                  }
                  alt=""
                  className="object-contain h-full"
                />
                {isProductAdding && <UploadInfiniteLoader />}
                <button
                  type="button"
                  className="absolute top-2 right-2 text-error text-2xl cursor-pointer"
                  onClick={() => removeImage(index, setValue)}
                >
                  <IoMdCloseCircle />
                </button>
              </figure>
            ))}
          </div>

          {errors.images && (
            <p className="text-error">{errors.images.message}</p>
          )}
        </div>
      </div>
      <button
        disabled={!isValid || imageUrls?.length < 1 || isProductAdding}
        className="btn w-max btn-primary h-auto py-2.5 px-8 rounded-full mt-6"
      >
        {isProductAdding && <AuthSpinnerLoader />}
        {product?.name ? "Edit Product" : "Add Product"}
      </button>
    </form>
  );
}
