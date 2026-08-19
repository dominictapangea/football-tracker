type MatchFormProps = {
  action: (formData: FormData) => void | Promise<void>;
  submitLabel: string;
  match?: {
    id: string;
    date: Date;
    note: string | null;
    goals: number;
    assists: number;
    rating: number | null;
  };
};

function toDateInputValue(date: Date) {
  return date.toISOString().slice(0, 10);
}

export function MatchForm({ action, submitLabel, match }: MatchFormProps) {
  return (
    <form action={action} className="mt-6 flex max-w-sm flex-col gap-4">
      {match ? <input type="hidden" name="id" value={match.id} /> : null}

      <div>
        <label
          htmlFor="date"
          className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
        >
          Data
        </label>
        <input
          id="date"
          name="date"
          type="date"
          defaultValue={match ? toDateInputValue(match.date) : toDateInputValue(new Date())}
          required
          className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900"
        />
      </div>

      <div>
        <label
          htmlFor="note"
          className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
        >
          Context (opțional)
        </label>
        <input
          id="note"
          name="note"
          type="text"
          defaultValue={match?.note ?? ""}
          placeholder="ex: meci de vineri"
          className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="goals"
            className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
          >
            Goluri
          </label>
          <input
            id="goals"
            name="goals"
            type="number"
            min={0}
            defaultValue={match?.goals ?? 0}
            className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900"
          />
        </div>
        <div>
          <label
            htmlFor="assists"
            className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
          >
            Assist-uri
          </label>
          <input
            id="assists"
            name="assists"
            type="number"
            min={0}
            defaultValue={match?.assists ?? 0}
            className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="rating"
          className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
        >
          Rating personal (1-10, opțional)
        </label>
        <input
          id="rating"
          name="rating"
          type="number"
          min={1}
          max={10}
          defaultValue={match?.rating ?? ""}
          className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900"
        />
      </div>

      <button
        type="submit"
        className="mt-2 rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-zinc-700 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
      >
        {submitLabel}
      </button>
    </form>
  );
}
