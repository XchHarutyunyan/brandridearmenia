import Link from "next/link";
import LoginForm from "./LoginForm";

export default function LoginPage({
  searchParams,
}: {
  searchParams: { redirect?: string };
}) {
  const params = searchParams;
  const redirectTo = params.redirect ?? "/dashboard";

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-10 sm:px-6 sm:py-16 min-w-0">
      <div className="rounded-card bg-white p-5 sm:p-8 shadow-soft-lg">
        <h1 className="text-2xl font-bold text-text">Log in</h1>
        <p className="mt-2 text-slate-600">Use your email and password to sign in.</p>
        <LoginForm redirectTo={redirectTo} />
        <p className="mt-6 text-center text-sm text-slate-600">
          Don&apos;t have an account?{" "}
          <Link href={`/register${redirectTo !== "/dashboard" ? `?redirect=${encodeURIComponent(redirectTo)}` : ""}`} className="font-medium text-primary hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
