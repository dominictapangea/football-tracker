export default function MeciuriLoading() {
  return (
    <div aria-busy="true" aria-live="polite">
      <div className="flex items-center justify-between gap-4">
        <div className="h-9 w-48 animate-pulse rounded-md bg-muted" />
        <div className="h-11 w-32 animate-pulse rounded-md bg-muted" />
      </div>

      <div className="mt-6 flex flex-col gap-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="card p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="h-4 w-40 animate-pulse rounded bg-muted" />
                <div className="mt-2 h-3 w-56 animate-pulse rounded bg-muted" />
              </div>
              <div className="h-8 w-20 animate-pulse rounded bg-muted" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
