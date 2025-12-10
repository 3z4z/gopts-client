export default function CardSkeleton() {
  return (
    <div className="card bg-base-100 shadow-md w-full max-w-sm">
      <div className="card-body gap-4">
        <div className="skeleton rounded-xl h-52 w-full" />

        <div className="skeleton h-5 w-2/3" />

        <div className="space-y-2">
          <div className="skeleton h-4 w-1/2" />
          <div className="skeleton h-4 w-1/3" />
          <div className="skeleton h-4 w-2/5" />
        </div>

        <div className="skeleton h-10 w-full rounded-full mt-2" />
      </div>
    </div>
  );
}
