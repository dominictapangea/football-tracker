import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex flex-1 items-center justify-center bg-muted/40 px-4 py-16">
      <SignIn
        appearance={{
          variables: {
            colorPrimary: "#0c0a09",
          },
        }}
      />
    </div>
  );
}
