export default function ProfilLoading() {
  return (
    <div aria-busy="true" aria-live="polite">
      <div className="h-9 w-56 animate-pulse rounded-md bg-muted" />

      <div className="mt-6 flex max-w-sm flex-col gap-5">
        <div>
          <div className="mb-1.5 h-4 w-20 animate-pulse rounded bg-muted" />
          <div className="h-11 w-full animate-pulse rounded-md bg-muted" />
        </div>
        <div>
          <div className="mb-1.5 h-4 w-32 animate-pulse rounded bg-muted" />
          <div className="h-11 w-full animate-pulse rounded-md bg-muted" />
        </div>
        <div className="mt-2 h-11 w-full animate-pulse rounded-md bg-muted" />
      </div>
    </div>
  );
}
