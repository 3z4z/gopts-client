import { Link, useLocation, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { useAuthStore } from "../../stores/useAuthStore";
import { passwordRegex } from "../../utils/regex";

import MainLogoComponent from "../../components/Common/MainLogo/MainLogo";
import GoogleSigninAction from "../../components/Auth/GoogleSigninAction/GoogleSigninAction";
import AuthSpinnerLoader from "../../components/Common/Loaders/AuthSpinner";

export default function LoginPage() {
  const { isSigningIn, signIn } = useAuthStore();
  const navigate = useNavigate();
  const { state } = useLocation();
  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
  } = useForm({
    mode: "all",
  });
  const handleSignin = async (data) => {
    const { user, error } = await signIn(data.email, data.password);
    if (!user) {
      toast.error(error);
    } else {
      toast.success("Logged in successfully!");
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
        <h4 className="text-2xl mt-6">Welcome to login</h4>
        <p className="mt-1 mb-6 text-sm">
          <span className="me-1">New here?</span>
          <Link to={"/auth/register"} className="link link-primary">
            Create a new account
          </Link>
        </p>
      </div>
      <form onSubmit={handleSubmit(handleSignin)} className="fieldset">
        <label>Email</label>
        <input
          disabled={isSigningIn}
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
          disabled={isSigningIn}
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
        <button
          disabled={!isValid || isSigningIn}
          className="btn btn-primary rounded-full mt-3"
        >
          {isSigningIn && <AuthSpinnerLoader />}
          Login Now
        </button>
      </form>
      <div className="divider max-w-36 mx-auto">or</div>
      <GoogleSigninAction isSigningIn={isSigningIn} />
    </div>
  );
}
