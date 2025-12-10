export default function TableSkeleton() {
  return (
    <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 mt-4">
      <table className="table">
        <thead className="bg-base-300">
          <tr>
            <th>
              <div className="skeleton bg-neutral/30 h-4 w-6" />
            </th>
            <th>
              <div className="skeleton bg-neutral/30 h-4 w-12" />
            </th>
            <th>
              <div className="skeleton bg-neutral/30 h-4 w-24" />
            </th>
            <th>
              <div className="skeleton bg-neutral/30 h-4 w-21" />
            </th>
            <th>
              <div className="skeleton bg-neutral/30 h-4 w-24" />
            </th>
            <th>
              <div className="skeleton bg-neutral/30 h-4 w-16" />
            </th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 3 }).map((_, i) => (
            <tr key={i} className="even:bg-base-200">
              {/* Sl no */}
              <td>
                <div className="skeleton h-4 w-6" />
              </td>

              {/* Product */}
              <td>
                <div className="skeleton h-4 w-40 mb-2" />
                <div className="skeleton h-3 w-28" />
              </td>

              {/* Quantity */}
              <td>
                <div className="skeleton h-4 w-14" />
              </td>

              {/* Payment */}
              <td className="whitespace-nowrap">
                <div className="skeleton h-5 w-32 rounded-full" />
              </td>

              {/* Delivery */}
              <td className="whitespace-nowrap">
                <div className="skeleton h-5 w-28 rounded-full" />
              </td>

              {/* Action buttons */}
              <td>
                <div className="flex gap-2">
                  <div className="skeleton h-8 w-24 rounded-full" />
                  <div className="skeleton h-8 w-24 rounded-full" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
