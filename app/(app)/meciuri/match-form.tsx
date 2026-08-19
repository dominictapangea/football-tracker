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
    <form action={action} className="mt-6 flex max-w-sm flex-col gap-5">
      {match ? <input type="hidden" name="id" value={match.id} /> : null}

      <div>
        <label htmlFor="date" className="field-label">
          Data
        </label>
        <input
          id="date"
          name="date"
          type="date"
          defaultValue={match ? toDateInputValue(match.date) : toDateInputValue(new Date())}
          required
          className="field-input"
        />
      </div>

      <div>
        <label htmlFor="note" className="field-label">
          Context (opțional)
        </label>
        <input
          id="note"
          name="note"
          type="text"
          defaultValue={match?.note ?? ""}
          placeholder="ex: meci de vineri"
          className="field-input"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="goals" className="field-label">
            Goluri
          </label>
          <input
            id="goals"
            name="goals"
            type="number"
            min={0}
            defaultValue={match?.goals ?? 0}
            className="field-input"
          />
        </div>
        <div>
          <label htmlFor="assists" className="field-label">
            Assist-uri
          </label>
          <input
            id="assists"
            name="assists"
            type="number"
            min={0}
            defaultValue={match?.assists ?? 0}
            className="field-input"
          />
        </div>
      </div>

      <div>
        <label htmlFor="rating" className="field-label">
          Rating personal (1-10, opțional)
        </label>
        <input
          id="rating"
          name="rating"
          type="number"
          min={1}
          max={10}
          defaultValue={match?.rating ?? ""}
          className="field-input"
        />
      </div>

      <button type="submit" className="btn-primary mt-2 w-full">
        {submitLabel}
      </button>
    </form>
  );
}
