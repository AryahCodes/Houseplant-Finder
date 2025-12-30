import Image from "next/image";
import Link from "next/link";
import Chip from "@/components/Chip";
import { ButtonLink } from "@/components/Button";
import type { Plant } from "@/lib/scoring/types";
import { CARE_INFO } from "@/data/careInfo";

export default function PlantResultCard({
  plant,
  score,
  whyBullets,
}: {
  plant: Plant;
  score: number;
  whyBullets: string[];
}) {
  const lightLabel =
    CARE_INFO.light[plant.attributes.light as keyof typeof CARE_INFO.light] ??
    plant.attributes.light;

  const waterLabel =
    CARE_INFO.watering[
      plant.attributes.watering as keyof typeof CARE_INFO.watering
    ] ?? plant.attributes.watering;

  const careLabel =
    CARE_INFO.careTime[
      plant.attributes.careTime as keyof typeof CARE_INFO.careTime
    ] ?? plant.attributes.careTime;

  const petSafe = plant.attributes.petSafety === "safe";

  return (
    <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
      <div className="grid gap-4 p-4 sm:grid-cols-[140px_1fr]">
        <div className="relative h-32 w-full overflow-hidden rounded-xl bg-stone-100 sm:h-36">
          <Image
            src={`/images/plants/${plant.slug}.jpg`}
            alt={plant.name}
            fill
            unoptimized
            sizes="(max-width: 640px) 100vw, 140px"
            className="object-cover"
          />
        </div>

        <div className="min-w-0">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h3 className="truncate text-lg font-semibold text-stone-900">
                {plant.name}
              </h3>
              <p className="mt-1 text-sm text-stone-600">
                Score <span className="font-semibold text-stone-900">{score}</span>{" "}
                <span className="text-stone-500">(lower = better)</span>
              </p>
            </div>

            <Link
              href={`/plants/${plant.slug}`}
              className="text-sm font-medium text-emerald-700 hover:text-emerald-800"
            >
              View care guide →
            </Link>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            <Chip tone="leaf">☀️ {lightLabel}</Chip>
            <Chip tone="water">💧 {waterLabel}</Chip>
            <Chip tone="care">🧤 {careLabel}</Chip>
            <Chip tone={petSafe ? "neutral" : "warning"}>
              {petSafe ? "🐾 Pet-safe" : "⚠️ Not pet-safe"}
            </Chip>
          </div>

          <div className="mt-4">
            <p className="text-sm font-semibold text-stone-900">Why it fits you</p>
            <ul className="mt-2 space-y-1 text-sm text-stone-700">
              {whyBullets.slice(0, 3).map((b) => (
                <li key={b} className="flex gap-2">
                  <span className="mt-0.5 text-emerald-700">•</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-4">
            <ButtonLink href={`/plants/${plant.slug}`} variant="primary">
              View care guide →
            </ButtonLink>
          </div>
        </div>
      </div>
    </div>
  );
}
