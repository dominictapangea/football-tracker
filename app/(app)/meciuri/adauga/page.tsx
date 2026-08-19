import { createMatch } from "../actions";
import { MatchForm } from "../match-form";

export default function AdaugaMeciPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
        Adaugă meci
      </h1>
      <MatchForm action={createMatch} submitLabel="Salvează meciul" />
    </div>
  );
}
