export default function RequestCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-card bg-white shadow-soft">
      <div className="p-6">
        <div className="flex items-start gap-3">
          <div className="h-12 w-12 shrink-0 animate-pulse rounded-xl bg-slate-200" />
          <div className="min-w-0 flex-1 space-y-2">
            <div className="h-5 w-20 animate-pulse rounded-full bg-slate-200" />
            <div className="h-5 w-3/4 animate-pulse rounded bg-slate-200" />
            <div className="h-4 w-1/3 animate-pulse rounded bg-slate-100" />
            <div className="h-6 w-24 animate-pulse rounded bg-slate-200" />
            <div className="h-4 w-full animate-pulse rounded bg-slate-100" />
            <div className="h-4 w-2/3 animate-pulse rounded bg-slate-100" />
            <div className="mt-4 h-10 w-28 animate-pulse rounded-button bg-slate-200" />
          </div>
        </div>
      </div>
    </div>
  );
}
