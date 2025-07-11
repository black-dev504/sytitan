const ProfileSkeleton = () => {
  return (
    <section className="animate-pulse bg-[#252525] px-5 lg:px-20 py-10">
      <div className="container max-w-[1800px] mx-auto flex flex-col md:flex-row gap-10">
        {/* Image Skeleton */}
        <div className="flex flex-col lg:flex-row gap-5">
          <div className="w-full lg:w-[500px] h-[500px] bg-gray-700 rounded-[20px]" />
          <div className="flex flex-row lg:flex-col gap-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-[100px] h-[100px] bg-gray-700 rounded-[20px]"
              />
            ))}
          </div>
        </div>

        {/* Info Skeleton */}
        <div className="flex flex-col gap-4 w-full text-white">
          <div className="h-10 w-1/2 bg-gray-700 rounded" /> {/* Dog name */}
          {[...Array(8)].map((_, i) => (
            <div key={i} className="flex gap-6">
              <div className="w-[120px] h-5 bg-gray-700 rounded" />
              <div className="w-1/2 h-5 bg-gray-600 rounded" />
            </div>
          ))}
          <div className="w-full h-24 bg-gray-800 rounded" /> {/* Description */}
        </div>
      </div>
    </section>
  );
};

export default ProfileSkeleton;
