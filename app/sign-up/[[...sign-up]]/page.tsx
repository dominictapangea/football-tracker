import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="flex flex-1 items-center justify-center bg-muted/40 px-4 py-16">
      <SignUp
        appearance={{
          variables: {
            colorPrimary: "#f97316",
          },
        }}
      />
    </div>
  );
}
