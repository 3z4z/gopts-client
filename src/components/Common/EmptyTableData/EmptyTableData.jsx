import Lottie from "lottie-react";
import notFoundAnimation from "../../../assets/animations/box-empty.json";
export default function EmptyTableDataComponent({ data }) {
  return (
    <div className="pt-8 pb-12 flex flex-col items-center justify-center bg-base-200 px-3 text-neutral/80 text-lg mt-7 rounded-lg">
      <div className="h-50 aspect-square">
        <Lottie animationData={notFoundAnimation} loop={false} />
      </div>
      <span className="mt-4 font-semibold">No {data} found</span>
    </div>
  );
}
