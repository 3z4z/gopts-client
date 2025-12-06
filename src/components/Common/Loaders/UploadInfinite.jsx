export default function UploadInfiniteLoader() {
  return (
    <div className="absolute w-full h-full left-0 top-0 bg-base-300/70 flex items-center justify-center z-10">
      <span className="loading loading-infinity text-primary/70 loading-xl"></span>
    </div>
  );
}
