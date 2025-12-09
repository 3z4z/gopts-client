import { useLocation, useNavigate } from "react-router";
import useAxios from "../../../hooks/useAxios";
import { useAuthStore } from "../../../stores/useAuthStore";
import { handleGoogleAuth } from "../../../utils/handleGoogleAuth";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import AuthSpinnerLoader from "../../Common/Loaders/AuthSpinner";

export default function GoogleSigninAction({ isRegistering, isSigningIn }) {
  const { signInWithGoogle, isGoogleSigningIn } = useAuthStore();
  const axios = useAxios();
  const navigate = useNavigate();
  const { state } = useLocation();
  const handleGoogleSignin = async () => {
    const { user, error } = await handleGoogleAuth(signInWithGoogle, axios);
    if (user) {
      console.log("Logged in successfully!");
      toast.success("Logged in successfully!");
      if (user) return navigate(state || "/", { replace: true });
    } else {
      console.log(error);
      toast.error(error);
    }
  };
  return (
    <button
      disabled={isRegistering || isSigningIn || isGoogleSigningIn}
      onClick={handleGoogleSignin}
      className="btn btn-neutral rounded-full border-neutral/25 btn-outline btn-block disabled:border-transparent"
    >
      {isGoogleSigningIn ? (
        <AuthSpinnerLoader />
      ) : (
        <FcGoogle
          className={`text-lg me-px ${
            isRegistering || (isSigningIn && "grayscale opacity-35")
          }`}
        />
      )}
      Continue with Google
    </button>
  );
}
