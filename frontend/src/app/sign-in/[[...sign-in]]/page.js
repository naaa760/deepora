import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-950 dark:to-purple-950">
      <div className="w-full max-w-md p-8 space-y-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-gray-900 dark:text-white">
            Welcome to DeepDive Explorer
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Sign in to start exploring complex topics with AI assistance
          </p>
        </div>
        <SignIn
          redirectUrl="/dashboard"
          appearance={{
            elements: {
              rootBox: "mx-auto w-full",
              card: "shadow-none p-0 bg-transparent",
            },
          }}
        />
      </div>
    </div>
  );
}
