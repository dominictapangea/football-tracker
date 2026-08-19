import { createMatch } from "../actions";
import { MatchForm } from "../match-form";

export default function AdaugaMeciPage() {
  return (
    <div>
      <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground">
        Adaugă meci
      </h1>
      <MatchForm action={createMatch} submitLabel="Salvează meciul" />
    </div>
  );
}
