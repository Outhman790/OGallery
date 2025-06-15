const SkeletonCard = () => {
  return (
    <div className="w-full animate-pulse rounded-lg shadow-md bg-white p-4">
      {/* Image placeholder */}
      <div className="h-40 bg-gray-200 rounded mb-4"></div>

      {/* Title placeholder */}
      <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>

      {/* Subtitle placeholder */}
      <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>

      {/* Tags placeholder */}
      <div className="h-3 bg-gray-200 rounded w-1/3"></div>
    </div>
  );
};

export default SkeletonCard;
