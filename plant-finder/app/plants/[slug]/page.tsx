import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import rawPlants from "@/data/plants.json";
import rawQuestions from "@/data/questions.json";
import type { Plant, Question } from "@/lib/scoring/types";

import { CARE_INFO } from "@/data/careInfo";
import { EQUIPMENT_BY_PLANT } from "@/data/equipment";

const plants = rawPlants as Plant[];
const questions = rawQuestions as Question[];

/* ---------------- HELPERS ---------------- */

function wateringRule(watering: string) {
  if (watering === "low")
    return "Water only when the soil is fully dry. If unsure, wait two more days.";
  if (watering === "medium")
    return "Water when the top one to two inches of soil are dry.";
  return "Keep soil lightly moist. Water when the surface just starts to dry.";
}

function weeklyPlan(careTime: string) {
  if (careTime === "very-low")
    return ["Check soil once", "Wipe dust off leaves"];
  if (careTime === "low")
    return ["Check soil once or twice", "Rotate the pot"];
  return ["Check soil twice", "Inspect for pests"];
}

function getPlantTip(plant: Plant) {
  const a = plant.attributes;

  if (a.light === "low" && a.watering === "low") {
    return "Low light plus overwatering is the fastest way to kill this plant. Less is more.";
  }
  if (a.light === "low") {
    return "Window distance matters more than direction. A few feet back is usually perfect.";
  }
  if (a.light === "medium") {
    return "Bright indirect light works best. Soft shadows mean you’re in the right spot.";
  }
  if (a.light === "bright") {
    return "Ease this plant into direct sun slowly to avoid leaf burn.";
  }
  if (a.watering === "low") {
    return "If you’re unsure whether to water, wait another day.";
  }

  return "Consistency beats perfection. Pick a spot and let the plant settle.";
}

/* ---------------- PAGE ---------------- */

export default async function PlantDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const plant = plants.find((p) => p.slug === slug);
  if (!plant) notFound();

  const a = plant.attributes;

  const lightLabel = CARE_INFO.light[a.light as keyof typeof CARE_INFO.light];
  const waterLabel = CARE_INFO.watering[a.watering as keyof typeof CARE_INFO.watering];
  const careLabel = CARE_INFO.careTime[a.careTime as keyof typeof CARE_INFO.careTime];

  const petSafe = a.petSafety === "safe";
  const equipment = EQUIPMENT_BY_PLANT[plant.slug] ?? [];

  const niceToHaves = [
    "Pot with drainage holes",
    "Saucer or drip tray",
    "Indoor potting mix",
    ...(a.light === "low" ? ["Small grow light (optional)"] : []),
    ...(a.watering === "low" ? ["Soil moisture meter (optional)"] : []),
  ];

  const plantTip = getPlantTip(plant);

  return (
    <main className="min-h-screen bg-[#f7f4ed] px-6 py-12">
      <div className="max-w-6xl mx-auto space-y-14">

        {/* BACK */}
        <Link
          href="/results"
          className="text-sm font-semibold text-emerald-700 hover:text-emerald-900"
        >
          ← Back to results
        </Link>

        {/* ================= HERO ================= */}
        <section className="space-y-10">
          <div className="text-center font-semibold tracking-wide text-emerald-800">
            🌿 Houseplant Finder
          </div>

          <div className="text-center">
            <h1 className="text-5xl font-serif font-semibold text-slate-900">
              {plant.name}
            </h1>
            <p className="mt-2 text-slate-600">
              A care guide you can actually follow.
            </p>

            <div className="mt-5 flex flex-wrap justify-center gap-2">
              <span className="px-4 py-1 rounded-full border bg-white text-sm">
                ☀️ {lightLabel}
              </span>
              <span className="px-4 py-1 rounded-full border bg-white text-sm">
                💧 {waterLabel}
              </span>
              <span className="px-4 py-1 rounded-full border bg-white text-sm">
                🧤 {careLabel}
              </span>
              <span className="px-4 py-1 rounded-full border bg-white text-sm">
                {petSafe ? "🐾 Pet-safe" : "⚠️ Not pet-safe"}
              </span>
            </div>
          </div>

          <div className="border-t border-slate-300" />

          {/* ================= TOP CARDS ================= */}
          <div className="flex justify-center">
            <div className="grid grid-cols-3 gap-6 max-w-5xl w-full">

              <div className="h-[220px] rounded-2xl bg-[#cfe0d2] p-5 shadow-sm">
                <h3 className="font-serif text-base font-semibold mb-3 text-center">
                  Good for you if…
                </h3>
                <ul className="space-y-1.5 text-sm">
                  <li>✓ You want minimal care.</li>
                  <li>✓ Your space matches {lightLabel.toLowerCase()}.</li>
                  <li>✓ You can follow a {waterLabel.toLowerCase()} routine.</li>
                </ul>
              </div>

              <div className="h-[220px] rounded-2xl bg-[#e7c99a] p-5 shadow-sm">
                <h3 className="font-serif text-base font-semibold mb-3 text-center">
                  Watch out if…
                </h3>
                <ul className="space-y-1.5 text-sm">
                  {!petSafe && <li>⚠ Pets can reach it.</li>}
                  {a.watering === "low" && <li>⚠ You water “just in case”.</li>}
                  {a.light === "low" && <li>⚠ Harsh direct sun.</li>}
                </ul>
              </div>

              <div className="h-[220px] rounded-2xl bg-white border border-slate-200 shadow-md relative">
                <Image
                  src={`/images/plants/${plant.slug}.jpg`}
                  alt={plant.name}
                  fill
                  priority
                  className="object-contain p-3"
                />
              </div>

            </div>
          </div>

          {/* TIP */}
          <div className="flex justify-center">
            <div className="rounded-full bg-[#f3e7b6] px-5 py-2 text-sm shadow-sm">
              💡 {plantTip}
            </div>
          </div>

          <div className="border-t border-slate-300" />
        </section>

        {/* ================= CARE + WATER (FIXED) ================= */}
        <section className="bg-[#f3f1eb] rounded-2xl py-10">
          <div className="flex justify-center">
            <div className="grid grid-cols-2 gap-6 max-w-5xl w-full">

              {/* CARE BASICS */}
              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <h3 className="font-serif text-base font-semibold mb-4">
                  Care basics
                </h3>
                <div className="space-y-2 text-sm">
                  <div>☀️ {lightLabel}</div>
                  <div>💧 {waterLabel}</div>
                  <div>🧤 {careLabel}</div>
                  <div>📈 Growth: {a.growthRate}</div>
                  <div>💨 Dry air: {a.dryAirTolerance}</div>
                  <div>📏 Size: {a.size}</div>
                </div>
              </div>

              {/* WATERING RULE */}
              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <h3 className="font-serif text-base font-semibold mb-4">
                  Watering rule
                </h3>

                <div className="text-sm mb-4">
                  💧 {wateringRule(a.watering)}
                </div>

                <div className="space-y-2 text-sm">
                  {weeklyPlan(a.careTime).map((x) => (
                    <div key={x}>• {x}</div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ================= SHOPPING LIST ================= */}
        <section className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="font-semibold mb-4">Shopping list</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {equipment.map((item) => (
              <div
                key={item.id}
                className="rounded-xl bg-[#f3f1eb] p-4 text-center text-sm"
              >
                {item.label}
              </div>
            ))}
            {niceToHaves.map((item) => (
              <div
                key={item}
                className="rounded-xl bg-[#f3f1eb] p-4 text-center text-sm"
              >
                {item}
              </div>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}
