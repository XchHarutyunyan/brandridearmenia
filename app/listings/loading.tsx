import ListingCardSkeleton from "@/components/ListingCardSkeleton";

export default function ListingsLoading() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="h-9 w-48 animate-pulse rounded bg-slate-200" />
      <div className="mt-2 h-5 w-72 animate-pulse rounded bg-slate-100" />
      <div className="mt-8 h-10 w-24 animate-pulse rounded-button bg-slate-200" />
      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <ListingCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
