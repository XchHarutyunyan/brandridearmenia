import Link from "next/link";
import RegisterForm from "./RegisterForm";

export default function RegisterPage({
  searchParams,
}: {
  searchParams: { redirect?: string };
}) {
  const params = searchParams;
  const redirectTo = params.redirect ?? "/dashboard";

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-6 py-16">
      <div className="rounded-card bg-white p-8 shadow-soft-lg">
        <h1 className="text-2xl font-bold text-text">Create account</h1>
        <p className="mt-2 text-slate-600">Register with your email and password.</p>
        <RegisterForm redirectTo={redirectTo} />
        <p className="mt-6 text-center text-sm text-slate-600">
          Already have an account?{" "}
          <Link
            href={`/login${redirectTo !== "/dashboard" ? `?redirect=${encodeURIComponent(redirectTo)}` : ""}`}
            className="font-medium text-primary hover:underline"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
