type MatchStatChipProps = {
  goals: number;
  assists: number;
  rating: number | null;
};

export function MatchStatChip({ goals, assists, rating }: MatchStatChipProps) {
  return (
    <div className="mt-2 flex flex-wrap items-center gap-2">
      <span className="inline-flex items-center rounded-md bg-pitch/15 px-2 py-0.5 font-display text-sm font-bold tabular-nums text-pitch">
        {goals}G
      </span>
      <span className="inline-flex items-center rounded-md bg-accent/15 px-2 py-0.5 font-display text-sm font-bold tabular-nums text-accent">
        {assists}A
      </span>
      {rating ? (
        <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
          <span className="h-1.5 w-16 overflow-hidden rounded-full bg-muted">
            <span
              className="block h-full rounded-full bg-gold"
              style={{ width: `${(rating / 10) * 100}%` }}
            />
          </span>
          {rating}/10
        </span>
      ) : null}
    </div>
  );
}
