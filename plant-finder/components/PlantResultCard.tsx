// components/PlantResultCard.tsx
import Image from "next/image";
import Link from "next/link";
import type { Plant } from "@/lib/scoring/types";

export default function PlantResultCard({
  plant,
  score,
  whyBullets,
}: {
  plant: Plant;
  score: number;
  whyBullets: string[];
}) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white overflow-hidden">
      
      {/* IMAGE — SIMPLE, ALWAYS VISIBLE */}
      <div className="relative h-56 bg-slate-100">
        <Image
          src={`/images/plants/${plant.slug}.jpg`}
          alt={plant.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 500px"
        />
      </div>

      {/* CONTENT */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-slate-900">
          {plant.name}
        </h3>

        <p className="text-sm text-slate-600 mt-1">
          Match score: <span className="font-semibold">{score}</span>{" "}
          <span className="text-slate-400">(lower is better)</span>
        </p>

        <ul className="mt-3 space-y-1 text-sm text-slate-700">
          {(whyBullets.length
            ? whyBullets
            : ["Solid match to your answers."]
          ).slice(0, 3).map((reason) => (
            <li key={reason}>✓ {reason}</li>
          ))}
        </ul>

        <Link
          href={`/plants/${plant.slug}`}
          className="inline-block mt-4 text-sm font-semibold text-emerald-700 hover:text-emerald-900"
        >
          View care guide →
        </Link>
      </div>
    </article>
  );
}
