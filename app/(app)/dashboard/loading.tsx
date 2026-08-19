export default function DashboardLoading() {
  return (
    <div aria-busy="true" aria-live="polite">
      <div className="h-9 w-48 animate-pulse rounded-md bg-muted" />
      <div className="mt-2 h-4 w-64 animate-pulse rounded-md bg-muted" />

      <div className="mt-6 h-32 animate-pulse rounded-lg border border-border bg-card" />

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="card border-t-2 border-t-border p-4">
            <div className="h-5 w-5 animate-pulse rounded bg-muted" />
            <div className="mt-3 h-9 w-12 animate-pulse rounded bg-muted" />
            <div className="mt-2 h-3 w-20 animate-pulse rounded bg-muted" />
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <div className="h-11 w-36 animate-pulse rounded-md bg-muted" />
        <div className="h-11 w-36 animate-pulse rounded-md bg-muted" />
      </div>
    </div>
  );
}
