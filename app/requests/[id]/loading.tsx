export default function RequestDetailLoading() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <div className="overflow-hidden rounded-card bg-white shadow-soft-lg">
        <div className="p-8 md:p-10">
          <div className="h-6 w-24 animate-pulse rounded-full bg-slate-200" />
          <div className="mt-4 h-9 w-3/4 animate-pulse rounded bg-slate-200" />
          <div className="mt-2 h-5 w-1/3 animate-pulse rounded bg-slate-100" />
          <div className="mt-6 h-10 w-28 animate-pulse rounded bg-slate-200" />
          <div className="mt-6 space-y-2">
            <div className="h-4 w-full animate-pulse rounded bg-slate-100" />
            <div className="h-4 w-full animate-pulse rounded bg-slate-100" />
            <div className="h-4 w-2/3 animate-pulse rounded bg-slate-100" />
          </div>
          <div className="mt-8 flex gap-4">
            <div className="h-12 w-40 animate-pulse rounded-button bg-slate-200" />
            <div className="h-12 w-32 animate-pulse rounded-button bg-slate-100" />
          </div>
        </div>
      </div>
    </div>
  );
}
