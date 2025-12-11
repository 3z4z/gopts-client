export default function BarSkeleton(forOption) {
  if (forOption) {
    return (
      <option disabled className="skeleton w-full h-8 rounded-sm"></option>
    );
  }
  return <div className="skeleton w-full h-8 rounded-sm"></div>;
}
