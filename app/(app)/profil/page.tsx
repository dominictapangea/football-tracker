import { getCurrentPlayer } from "@/lib/auth";
import { updateProfile } from "./actions";

export default async function ProfilPage() {
  const player = await getCurrentPlayer();

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground">
        Profilul meu
      </h1>
      <form action={updateProfile} className="mt-6 flex max-w-sm flex-col gap-5">
        <div>
          <label htmlFor="name" className="field-label">
            Nume
          </label>
          <input
            id="name"
            name="name"
            type="text"
            defaultValue={player.name}
            required
            className="field-input"
          />
        </div>
        <div>
          <label htmlFor="position" className="field-label">
            Poziție preferată
          </label>
          <input
            id="position"
            name="position"
            type="text"
            defaultValue={player.position ?? ""}
            placeholder="ex: mijlocaș, atacant, fundaș"
            className="field-input"
          />
        </div>
        <button type="submit" className="btn-primary mt-2 w-full">
          Salvează
        </button>
      </form>
    </div>
  );
}
