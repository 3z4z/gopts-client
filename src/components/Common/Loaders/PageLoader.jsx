import Lottie from "lottie-react";
import loadingAnimation from "../../../assets/animations/time-hourglass.json";
export default function PageLoader() {
  return (
    <div className="w-full h-dvh fixed bg-base-100 flex items-center justify-center top-0 left-0 z-100">
      <div className="w-80 aspect-square">
        <Lottie animationData={loadingAnimation} loop={true} />
      </div>
    </div>
  );
}
