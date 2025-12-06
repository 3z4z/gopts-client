import { Link, useLocation, useNavigate } from "react-router";
import MainLogoComponent from "../../components/Common/MainLogo/MainLogo";
import { useForm, useWatch } from "react-hook-form";
import { IoIosCloseCircle } from "react-icons/io";
import { LuImagePlus } from "react-icons/lu";
import { passwordRegex } from "../../utils/regex";
import GoogleSigninAction from "../../components/Auth/GoogleSigninAction/GoogleSigninAction";
import useAxios from "../../hooks/useAxios";
import toast from "react-hot-toast";
import { useAuthStore } from "../../stores/useAuthStore";
import { axiosInstance } from "../../utils/axiosInstance";
import AuthSpinnerLoader from "../../components/Common/Loaders/AuthSpinner";
import { useState } from "react";
import UploadInfiniteLoader from "../../components/Common/Loaders/UploadInfinite";

export default function RegisterPage() {
  const [isRegistering, setIsRegistering] = useState();
  const axios = useAxios();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { signUp, isSigningIn } = useAuthStore();
  const {
    handleSubmit,
    register,
    trigger,
    control,
    reset,
    currentValues,
    formState: { errors, isValid },
  } = useForm({
    mode: "all",
    defaultValues: {
      image: "",
    },
  });
  const watchUploadImage = useWatch({ name: "image", control });
  const handleRegister = async (data) => {
    setIsRegistering(true);
    const formData = new FormData();
    const { password, ...rest } = data;
    formData.append("profileImage", data.image?.[0]);
    const res = await axiosInstance.post("/upload", formData);
    const profileImgUrl = await res.data?.profileImgUrl;
    const userData = {
      ...rest,
      image: profileImgUrl,
      status: "pending",
    };
    const { user, error } = await signUp(
      data.name,
      data.email,
      password,
      profileImgUrl
    );
    if (!user) {
      toast.error(error);
    } else {
      await axios.post("/users", userData);
      toast.success("User registration successful!");
      setIsRegistering(false);
      user && navigate(state || "/", { replace: true });
    }
  };
  return (
    <div className="py-8 px-16 rounded-xl shadow">
      <div className="flex items-center flex-col">
        <MainLogoComponent
          mainColor={"text-primary"}
          subColor={"text-secondary"}
        />
        <h4 className="text-2xl mt-6">Welcome to register</h4>
        <p className="mt-1 mb-6 text-sm">
          <span className="me-1">Already have an account?</span>
          <Link to={"/auth/login"} className="link link-primary">
            Login now
          </Link>
        </p>
      </div>
      <form onSubmit={handleSubmit(handleRegister)} className="fieldset">
        {watchUploadImage ? (
          <div className="relative">
            <button
              disabled={isRegistering}
              className="absolute top-2 right-2 cursor-pointer"
              onClick={() => reset({ ...currentValues, image: "" })}
            >
              <IoIosCloseCircle className="w-6 h-6 text-error" />
            </button>
            {isRegistering && (
              <div className="absolute w-full h-full left-0 top-0 bg-base-300/70 flex items-center justify-center">
                <UploadInfiniteLoader />
              </div>
            )}
            <img
              src={URL.createObjectURL(watchUploadImage?.[0])}
              alt=""
              className="w-full h-40 object-contain border border-primary/20"
            />
          </div>
        ) : (
          <>
            <label>Upload a photo</label>
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
                disabled={isRegistering}
                onClick={() => trigger("image")}
                type="file"
                accept="image/*"
                className="hidden"
                {...register("image", {
                  required: "User image is required",
                })}
              />
            </label>
          </>
        )}
        {errors.profileImage && (
          <p className="text-error">{errors.profileImage.message}</p>
        )}
        <label>Name</label>
        <input
          disabled={isRegistering}
          type="text"
          placeholder="Name"
          className="input w-full rounded-full"
          {...register("name", {
            required: "Name is required",
            minLength: { value: 3, message: "Name is too short" },
          })}
        />
        {errors.name && <p className="text-error">{errors.name.message}</p>}
        <label>Email</label>
        <input
          disabled={isRegistering}
          type="email"
          placeholder="Email"
          className="input w-full rounded-full"
          {...register("email", {
            required: "Email is required",
          })}
        />
        {errors.email && <p className="text-error">{errors.email.message}</p>}
        <label>Password</label>
        <input
          disabled={isRegistering}
          type="password"
          placeholder="Password"
          className="input w-full rounded-full"
          {...register("password", {
            required: "Password is required",
            pattern: {
              value: passwordRegex.value,
              message: passwordRegex.message,
            },
          })}
        />
        {errors.password && (
          <p className="text-error">{errors.password.message}</p>
        )}
        <label>Select Role</label>
        <select
          disabled={isRegistering}
          className="select w-full rounded-full"
          defaultValue={""}
          {...register("role", {
            required: "Role is required",
            validate: (value) =>
              value !== "Select a role" || "Select a valid role",
          })}
        >
          <option value="Select a role">Select a role</option>
          <option value="Buyer">Buyer</option>
          <option value="Manager">Manager</option>
        </select>
        {errors.role && <p className="text-error">{errors.role.message}</p>}
        <button
          disabled={!isValid || isRegistering || isSigningIn}
          className="btn btn-primary mt-3 rounded-full"
        >
          {isRegistering && <AuthSpinnerLoader />}
          Register Now
        </button>
      </form>
      <div className="divider max-w-36 mx-auto">or</div>
      <GoogleSigninAction isRegistering={isRegistering} />
    </div>
  );
}
