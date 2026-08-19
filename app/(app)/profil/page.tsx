import { getCurrentPlayer } from "@/lib/auth";
import { updateProfile } from "./actions";

export default async function ProfilPage() {
  const player = await getCurrentPlayer();

  return (
    <div>
      <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
        Profilul meu
      </h1>
      <form action={updateProfile} className="mt-6 flex max-w-sm flex-col gap-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
          >
            Nume
          </label>
          <input
            id="name"
            name="name"
            type="text"
            defaultValue={player.name}
            required
            className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900"
          />
        </div>
        <div>
          <label
            htmlFor="position"
            className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
          >
            Poziție preferată
          </label>
          <input
            id="position"
            name="position"
            type="text"
            defaultValue={player.position ?? ""}
            placeholder="ex: mijlocaș, atacant, fundaș"
            className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900"
          />
        </div>
        <button
          type="submit"
          className="mt-2 rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-zinc-700 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
        >
          Salvează
        </button>
      </form>
    </div>
  );
}
