export default function SkeletonLoader() {
  return (
    <div aria-hidden="true" className="animate-pulse">
      {/* Hero skeleton */}
      <div className="min-h-screen bg-neutral-50">
        <div className="md:pl-32 lg:pl-36">
          <div className="mx-auto w-full max-w-5xl px-6 pt-24 sm:px-10">
            <div className="flex items-center justify-between border-b border-neutral-200 pb-6">
              <div className="h-4 w-48 rounded bg-neutral-200" />
              <div className="h-10 w-10 rounded-full bg-neutral-200" />
            </div>
            <div className="pt-16">
              <div className="mb-6 h-4 w-40 rounded bg-neutral-200" />
              <div className="mb-8 h-20 w-3/4 rounded-2xl bg-neutral-200" />
              <div className="mb-10 h-5 w-2/3 rounded bg-neutral-200" />
              <div className="flex gap-4">
                <div className="h-12 w-36 rounded-full bg-neutral-200" />
                <div className="h-12 w-36 rounded-full bg-neutral-200" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Skills skeleton */}
      <div className="py-24 bg-white">
        <div className="md:pl-32 lg:pl-36">
          <div className="mx-auto w-full max-w-5xl px-6 sm:px-10">
            <div className="mb-14 h-12 w-48 rounded-2xl bg-neutral-200" />
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6">
                  <div className="mb-5 h-4 w-24 rounded bg-neutral-200" />
                  <div className="space-y-3">
                    {[1, 2, 3, 4].map((j) => (
                      <div key={j} className="h-4 w-2/3 rounded bg-neutral-200" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Projects skeleton */}
      <div className="py-24 bg-neutral-50">
        <div className="md:pl-32 lg:pl-36">
          <div className="mx-auto w-full max-w-5xl px-6 sm:px-10">
            <div className="mb-14 h-12 w-56 rounded-2xl bg-neutral-200" />
            <div className="grid gap-6 md:grid-cols-2">
              {[1, 2].map((i) => (
                <div key={i} className="overflow-hidden rounded-2xl border border-neutral-200 bg-white">
                  <div className="h-44 bg-neutral-200" />
                  <div className="space-y-4 p-6">
                    <div className="h-5 w-1/2 rounded bg-neutral-200" />
                    <div className="h-4 rounded bg-neutral-200" />
                    <div className="h-4 w-3/4 rounded bg-neutral-200" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
