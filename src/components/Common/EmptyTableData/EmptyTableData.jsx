export default function EmptyTableDataComponent({ data }) {
  return (
    <div className="py-10 text-center bg-base-200 px-3 text-neutral/80 text-lg font-semibold mt-7 rounded-lg">
      No {data} found
    </div>
  );
}
