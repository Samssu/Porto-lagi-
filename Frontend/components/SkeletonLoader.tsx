export default function SkeletonLoader() {
  return (
    <div aria-hidden="true">
      {/* Hero skeleton */}
      <div className="min-h-screen flex items-center py-20 px-6">
        <div className="max-w-4xl w-full">
          <div className="h-24 bg-white/10 mb-8 w-3/4"></div>
          <div className="h-12 bg-white/10 mb-8 w-1/2"></div>
          <div className="h-6 bg-white/10 mb-12 w-2/3"></div>
          <div className="flex gap-4">
            <div className="h-12 w-40 bg-white/10"></div>
            <div className="h-12 w-40 bg-white/10"></div>
          </div>
        </div>
      </div>

      {/* Skills skeleton */}
      <div className="py-20 px-6">
        <div className="max-w-4xl">
          <div className="h-16 bg-white/10 mb-16 w-1/3"></div>
          <div className="space-y-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="card">
                <div className="h-6 bg-white/10 mb-4 w-1/2"></div>
                <div className="h-2 bg-white/10"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Projects skeleton */}
      <div className="py-20 px-6">
        <div className="max-w-6xl">
          <div className="h-16 bg-white/10 mb-16 w-1/3"></div>
          <div className="grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="card space-y-4">
                <div className="h-8 bg-white/10 w-2/3"></div>
                <div className="h-4 bg-white/10"></div>
                <div className="h-4 bg-white/10 w-3/4"></div>
                <div className="h-6 bg-white/10 w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
