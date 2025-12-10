export default function TeamMemberSkeleton() {
  return (
    <div className="lg:max-w-6xl sm:max-w-2xl max-w-xs mx-auto px-5 py-20 grid lg:grid-cols-3 sm:grid-cols-2 gap-10">
      <div>
        <div className="skeleton aspect-square overflow-hidden px-10 pt-10 pb-3 bg-base-200 rounded-t-xl rounded-b-none">
          <div className="skeleton w-full h-full bg-base-300 rounded-xl"></div>
          <div className="skeleton border-t border-t-primary/20 mt-2 w-[85%] mx-auto"></div>
        </div>
        <div className="skeleton bg-base-200 pb-6 rounded-b-xl rounded-t-none pt-5">
          <h4 className="skeleton bg-base-300 rounded h-6 w-3/4 mx-auto mb-2"></h4>
          <h5 className="skeleton bg-base-300 rounded h-5 w-2/4 mx-auto mb-3"></h5>
          <h6 className="skeleton bg-base-300 rounded h-4 w-1/2 mx-auto"></h6>
        </div>
      </div>
    </div>
  );
}
