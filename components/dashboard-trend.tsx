type TrendPoint = {
  date: Date;
  goals: number;
};

type DashboardTrendProps = {
  points: TrendPoint[];
};

export function DashboardTrend({ points }: DashboardTrendProps) {
  if (points.length < 2) return null;

  const width = 280;
  const height = 64;
  const max = Math.max(1, ...points.map((p) => p.goals));
  const stepX = width / (points.length - 1);

  const coords = points.map((p, i) => ({
    x: i * stepX,
    y: height - (p.goals / max) * (height - 8) - 4,
  }));

  const path = coords
    .map((c, i) => `${i === 0 ? "M" : "L"}${c.x.toFixed(1)},${c.y.toFixed(1)}`)
    .join(" ");

  const summary = points
    .map((p) => `${new Date(p.date).toLocaleDateString("ro-RO")}: ${p.goals} goluri`)
    .join(", ");

  return (
    <div className="mt-6">
      <p className="eyebrow">Evoluție goluri — ultimele {points.length} meciuri</p>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="mt-2 h-16 w-full"
        role="img"
        aria-label={`Goluri pe ultimele ${points.length} meciuri: ${summary}`}
      >
        <path
          d={path}
          fill="none"
          stroke="var(--pitch)"
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        {coords.map((c, i) => (
          <circle key={i} cx={c.x} cy={c.y} r="2.5" fill="var(--pitch)" />
        ))}
      </svg>
      <table className="sr-only">
        <caption>Goluri pe meci, în ordine cronologică</caption>
        <tbody>
          <tr>
            {points.map((p, i) => (
              <td key={i}>
                {new Date(p.date).toLocaleDateString("ro-RO")}: {p.goals} goluri
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
