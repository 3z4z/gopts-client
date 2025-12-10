import { container } from "../../../utils/classNames";

export default function ProductDetailsSkeleton() {
  return (
    <div className={`${container} mx-auto px-4 mt-24`}>
      <div className="grid xl:grid-cols-3 lg:grid-cols-5 md:grid-cols-2 gap-12">
        <div className="order-2 md:order-1 xl:col-span-2 lg:col-span-3">
          <div className="skeleton h-14 w-2/3 mb-3" />
          <div className="flex items-center gap-2 mb-10">
            <div className="skeleton h-4 w-20" />
            <div className="skeleton h-4 w-32" />
          </div>
          <div className="mt-10">
            <div className="skeleton h-6 w-40 mb-4" />
            <div className="space-y-2">
              <div className="skeleton h-4 w-52" />
              <div className="skeleton h-4 w-64" />
              <div className="skeleton h-4 w-48" />
              <div className="skeleton h-4 w-56" />
            </div>
          </div>
          <div className="mt-10">
            <div className="skeleton h-6 w-36 mb-4" />
            <div className="space-y-2">
              <div className="skeleton h-4 w-48" />
              <div className="skeleton h-4 w-72" />
            </div>
          </div>
          <div className="mt-10">
            <div className="skeleton h-6 w-40 mb-4" />
            <div className="space-y-2 max-w-3xl">
              <div className="skeleton h-4 w-full" />
              <div className="skeleton h-4 w-11/12" />
              <div className="skeleton h-4 w-10/12" />
            </div>
          </div>
          <div className="my-16">
            <div className="skeleton h-12 w-48 rounded-full" />
          </div>
          <div>
            <div className="skeleton h-6 w-44 mb-4" />
            <div className="skeleton aspect-video max-w-3xl rounded-xl" />
          </div>
        </div>
        <div className="order-1 md:order-2 xl:col-span-1 lg:col-span-2 aspect-[4.5/5] max-md:max-h-120 max-md:w-[calc(100dvw-2rem)]">
          <div className="skeleton w-full max-md:h-80 md:aspect-4/5 rounded-xl mb-4" />
          <div className="grid grid-cols-4 gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="skeleton aspect-square rounded-md" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
