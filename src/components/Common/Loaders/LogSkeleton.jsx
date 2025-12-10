import { FaCheckCircle } from "react-icons/fa";

export default function LogSkeleton() {
  return (
    <ul className="timeline timeline-vertical w-max">
      <li className="grid grid-cols-[var(--timeline-col-start,minmax(0,1fr))_auto_var(--timeline-col-end,minmax(0,3fr))]">
        <div className="timeline-start border border-dashed border-primary/40 bg-base-300 p-3 rounded-md skeleton">
          <div className="skeleton w-28 h-6 bg-neutral/20"></div>
          <div className="skeleton w-28 h-6 bg-neutral/20 mt-4"></div>
        </div>
        <div className="timeline-middle skeleton">
          <FaCheckCircle className="text-neutral/20 text-xl" />
        </div>
        <div className="timeline-end timeline-box text-sm capitalize xl:max-w-80 max-w-60 w-full h-20 bg-neutral/30 skeleton">
          <div className="w-3/4 h-10 skeleton"></div>
        </div>
      </li>
    </ul>
  );
}
