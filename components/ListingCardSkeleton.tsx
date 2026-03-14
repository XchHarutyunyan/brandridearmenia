export default function ListingCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-card bg-white shadow-soft">
      <div className="aspect-[4/3] animate-pulse bg-slate-200" />
      <div className="p-5">
        <div className="h-5 w-3/4 animate-pulse rounded bg-slate-200" />
        <div className="mt-2 h-4 w-1/2 animate-pulse rounded bg-slate-100" />
        <div className="mt-3 h-6 w-20 animate-pulse rounded bg-slate-200" />
      </div>
    </div>
  );
}
