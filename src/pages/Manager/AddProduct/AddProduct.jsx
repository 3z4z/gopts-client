import { LuImagePlus } from "react-icons/lu";
import { container } from "../../../utils/classNames";
import { useForm, useWatch } from "react-hook-form";
import { useEffect, useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import useCategories from "../../../hooks/useCategories";

export default function AddProductPage() {
  const [imageFiles, setImageFiles] = useState([]);
  const { data: categories = [], isLoading } = useCategories();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm({
    mode: "all",
    defaultValues: {
      images: [],
    },
  });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const watchUploadImages = useWatch({ name: "images", control }) || [];
  const addProduct = (data) => {
    console.log(data);
  };
  useEffect(() => {
    setImageFiles((prev) => [...prev, ...Array.from(watchUploadImages)]);
  }, [watchUploadImages]);

  const handleImageChange = (e) => {
    const newFiles = Array.from(e.target.files);
    setImageFiles(Array.from(newFiles));
    console.log("newFiles", imageFiles);
  };

  const removeImage = (index) => {
    const updatedFiles = imageFiles.filter((_, i) => i !== index);
    console.log("updatedFiles", updatedFiles);
    setImageFiles(updatedFiles);
  };
  return (
    <>
      <h4 className="mb-4 text-3xl">Add a product</h4>
      <div className="bg-base-200 rounded-lg py-8">
        <form
          onSubmit={handleSubmit(addProduct)}
          className={`fieldset ${container}`}
        >
          <div className="grid grid-cols-2 gap-10">
            <div>
              <div className="flex gap-6 mb-3">
                <div className="flex flex-col gap-1 flex-1">
                  <label>Product Name</label>
                  <input
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
                    className="select w-full"
                    defaultValue={"Select a category"}
                    {...register("category", {
                      validate: (value) =>
                        value !== "Select a category" ||
                        "A valid category is required",
                    })}
                  >
                    <option value="Select a category">Select a category</option>
                    {isLoading ? (
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
              <div className="flex gap-6 mb-3">
                <div className="flex flex-col gap-1 flex-1">
                  <label>Price in BDT</label>
                  <input
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
                    type="number"
                    className="input w-full"
                    placeholder="Available Quantity"
                    {...register("availableQuantity", {
                      required: "Available quantity is required",
                      min: {
                        value: 100,
                        message: "Quantity is too small",
                      },
                    })}
                  />
                  {errors.availableQuantity && (
                    <p className="text-error">
                      {errors.availableQuantity.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-2 mb-6">
                <label>Minimum Order Quantity</label>
                <div className="flex gap-4 mt-2">
                  {[50, 100, 150, 200].map((value) => (
                    <label
                      key={value}
                      className="cursor-pointer flex items-center gap-2"
                    >
                      <input
                        type="radio"
                        name="quantity"
                        className="radio radio-sm"
                        value={value}
                        defaultChecked={value === 50}
                        {...register("minOrderAmount", {
                          required: "Minimum Order amount is required",
                        })}
                      />
                      <span>{value}</span>
                    </label>
                  ))}
                  {errors.minOrderAmount && (
                    <p className="text-error">
                      {errors.minOrderAmount.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex gap-6 mb-3">
                <div className="flex flex-col gap-1 flex-1">
                  <label>Payment Method</label>
                  <select
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
                <div className="flex flex-col gap-1 flex-1">
                  <label>Youtube Video Demo</label>
                  <input
                    type="text"
                    className="input w-full"
                    placeholder="https://..."
                  />
                </div>
              </div>
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="checkbox checkbox-sm checkbox-primary rounded-md"
                />
                <span className="mt-px ms-2">
                  Feature this product on <strong>Home Page</strong>
                </span>
              </label>
            </div>
            <div>
              <label>Upload Images</label>
              <div className="grid grid-cols-2 gap-3">
                <label className="flex flex-col items-center justify-center w-full h-40 border border-dashed border-neutral/35 rounded-xl cursor-pointer bg-base-200/25 hover:bg-base-200/50 transition">
                  <div className="flex flex-col items-center gap-2">
                    <LuImagePlus className="w-12 h-12 text-primary/75" />
                    <p className="text-sm text-accent">
                      <span className="font-semibold">Click to upload</span>
                    </p>
                    <p className="text-xs text-accent/75">
                      PNG, JPG, JPEG, WEBP, JFIF (1:1 preferred)
                    </p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    multiple
                    onChange={handleImageChange}
                    {...register("images")}
                  />
                </label>
                {imageFiles.map((image, index) => (
                  <figure
                    key={index}
                    className="h-40 w-full overflow-hidden flex items-center justify-center border border-primary/20 rounded-lg relative"
                  >
                    <img
                      src={URL.createObjectURL(image)}
                      alt=""
                      className="object-contain h-full"
                    />
                    <button
                      className="absolute top-2 right-2 text-error text-2xl cursor-pointer"
                      onClick={() => removeImage(index)}
                    >
                      <IoMdCloseCircle />
                    </button>
                  </figure>
                ))}
              </div>
            </div>
          </div>
          <button className="btn w-max btn-primary h-auto py-2.5 px-8 rounded-full mt-6">
            Add Product
          </button>
        </form>
      </div>
    </>
  );
}
