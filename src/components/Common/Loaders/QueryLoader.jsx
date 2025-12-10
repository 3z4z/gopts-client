import Lottie from "lottie-react";
import loadingAnimation from "../../../assets/animations/time-hourglass.json";
export default function QueryLoader() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="w-80 aspect-square">
        <Lottie animationData={loadingAnimation} loop={true} />
      </div>
    </div>
  );
}
