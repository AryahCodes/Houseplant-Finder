import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <h1 className="text-4xl font-bold mb-4">
        Find the Right Houseplant 🌱
      </h1>

      <p className="text-lg text-gray-600 max-w-xl mb-8">
        Answer a few quick questions and we’ll recommend beginner-friendly
        houseplants that fit your lifestyle and space.
      </p>

      <Link
        href="/quiz"
        className="rounded-lg bg-green-600 px-6 py-3 text-white font-medium hover:bg-green-700 transition"
      >
        Start Quiz
      </Link>
    </main>
  );
}
