export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-950 dark:to-purple-950">
      <div className="text-center p-8 max-w-md">
        <h1 className="text-4xl font-bold mb-4">DeepDive Explorer</h1>
        <p className="mb-8">
          AI-driven educational platform for exploring complex topics
        </p>
        <div className="flex gap-4 justify-center">
          <a
            href="/sign-in"
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Sign In
          </a>
          <a
            href="/sign-up"
            className="px-6 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50"
          >
            Sign Up
          </a>
        </div>
      </div>
    </div>
  );
}
