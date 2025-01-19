export function Skeleton() {
  return (
    <div className="relative flex flex-col items-center p-4 bg-base-200 rounded-lg shadow-md animate-pulse">
      <div className="w-full h-[200px] bg-gray-300 rounded-lg mb-4"></div>
      <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
      <div className="h-3 bg-gray-300 rounded w-1/2 mb-4"></div>
      <div className="h-8 bg-gray-300 rounded w-2/3"></div>
    </div>
  );
}
