// app/plants/[slug]/page.tsx
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import rawPlants from "@/data/plants.json";
import rawQuestions from "@/data/questions.json";
import type { Plant, Question } from "@/lib/scoring/types";

import { CARE_INFO } from "@/data/careInfo";
import { EQUIPMENT_BY_PLANT } from "@/data/equipment";

import Chip from "@/components/Chip";
import PersonalizedMatch from "@/components/PersonalizedMatch";

const plants = rawPlants as Plant[];
const questions = rawQuestions as Question[];

function lightTip(light: string) {
  if (light === "low") return "Place near a bright window, but not in direct sun. A few feet back from an east window is perfect.";
  if (light === "medium") return "Bright indirect light is ideal. Near a window with a sheer curtain usually works.";
  return "Give it strong light. A south or west window can work, but ease into direct sun slowly.";
}

function wateringRule(watering: string) {
  if (watering === "low") return "Water only when the soil is fully dry. If you’re unsure, wait 2 more days.";
  if (watering === "medium") return "Water when the top 1–2 inches of soil are dry.";
  return "Keep soil lightly moist. Water when the surface just starts to dry.";
}

function weeklyPlan(careTime: string) {
  if (careTime === "very-low") return ["Check soil once.", "Wipe dust off leaves if needed.", "Done."];
  if (careTime === "low") return ["Check soil 1–2 times.", "Rotate the pot for even growth.", "Remove any dead leaves."];
  return ["Check soil twice.", "Rotate the pot.", "Inspect for pests (leaf undersides)."];
}

export default async function PlantDetailPage({
  params,
}: {
  // Next may treat params as async depending on version/settings
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const plant = plants.find((p) => p.slug === slug);
  if (!plant) notFound();

  const a = plant.attributes;

  const lightLabel =
    CARE_INFO.light[a.light as keyof typeof CARE_INFO.light] ?? a.light;

  const waterLabel =
    CARE_INFO.watering[a.watering as keyof typeof CARE_INFO.watering] ??
    a.watering;

  const careLabel =
    CARE_INFO.careTime[a.careTime as keyof typeof CARE_INFO.careTime] ??
    a.careTime;

  const petSafe = a.petSafety === "safe";
  const equipment = EQUIPMENT_BY_PLANT[plant.slug] ?? [];

  const niceToHaves: string[] = [
    "Pot with drainage holes",
    "Saucer or drip tray",
    "Indoor potting mix",
  ];

  if (a.light === "low") niceToHaves.push("Small grow light (optional, but helps)");
  if (a.watering === "low") niceToHaves.push("Soil moisture meter (optional, great for beginners)");

  return (
    <main className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-amber-50 px-6 py-10">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6">
          <Link
            href="/results"
            className="text-sm font-semibold text-emerald-700 hover:text-emerald-900"
          >
            ← Back to results
          </Link>
        </div>

        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 items-start">
          <div>
            <h1 className="text-4xl font-bold text-slate-900">{plant.name}</h1>
            <p className="text-slate-600 mt-2">
              A care guide you can actually follow — simple rules, common mistakes, and a shopping list.
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              <Chip tone="emerald">☀️ {lightLabel}</Chip>
              <Chip tone="amber">💧 {waterLabel}</Chip>
              <Chip tone="sky">🧤 {careLabel}</Chip>
              <Chip tone={petSafe ? "emerald" : "rose"}>
                {petSafe ? "🐾 Pet-safe" : "⚠️ Not pet-safe"}
              </Chip>
            </div>

            {/* Good for you / Watch out */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm">
                <p className="text-sm font-semibold text-emerald-900">Good for you if…</p>
                <ul className="mt-2 space-y-1 text-sm text-slate-700">
                  <li className="flex gap-2">
                    <span className="text-emerald-600 mt-[2px]">✓</span>
                    <span>You want {careLabel.toLowerCase()}.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-emerald-600 mt-[2px]">✓</span>
                    <span>Your space matches {lightLabel.toLowerCase()}.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-emerald-600 mt-[2px]">✓</span>
                    <span>You can follow a {waterLabel.toLowerCase()} routine.</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-2xl border border-amber-200 bg-white p-5 shadow-sm">
                <p className="text-sm font-semibold text-amber-900">Watch out if…</p>
                <ul className="mt-2 space-y-1 text-sm text-slate-700">
                  {!petSafe && (
                    <li className="flex gap-2">
                      <span className="text-amber-600 mt-[2px]">⚠</span>
                      <span>Pets can reach it (this plant is not pet-safe).</span>
                    </li>
                  )}
                  {a.watering === "low" && (
                    <li className="flex gap-2">
                      <span className="text-amber-600 mt-[2px]">⚠</span>
                      <span>You tend to water “just in case” (overwatering risk).</span>
                    </li>
                  )}
                  {a.light === "low" && (
                    <li className="flex gap-2">
                      <span className="text-amber-600 mt-[2px]">⚠</span>
                      <span>You plan to put it in harsh direct sun.</span>
                    </li>
                  )}
                </ul>
              </div>

          {/* Hero */}
          <div className="rounded-2xl overflow-hidden border border-emerald-100 bg-white shadow-sm">
            <div className="relative w-full h-80 bg-emerald-50">
              <Image
                src={`/images/plants/${plant.slug}.jpg`}
                alt={plant.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 520px"
                className="object-cover"
              />
            </div>
            <div className="p-4 text-sm text-slate-600">
              Tip: take a photo of where you’ll place it (window distance matters more than people think).
            </div>
          </div>
        </div>

        {/* Personalized match (optional but nice) */}
        <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">Why this match works</h2>
          <p className="text-sm text-slate-600 mt-1">
            Based on your quiz answers, here’s what lined up.
          </p>
          <div className="mt-4">
            <PersonalizedMatch plant={plant} questions={questions} />
          </div>
        </section>

        {/* 4 cards */}
        <section className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Care basics */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900">Care basics (today)</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              <li><span className="font-semibold">Light:</span> {lightLabel}</li>
              <li><span className="font-semibold">Watering:</span> {waterLabel}</li>
              <li><span className="font-semibold">Care level:</span> {careLabel}</li>
              <li><span className="font-semibold">Growth rate:</span> {a.growthRate}</li>
              <li><span className="font-semibold">Dry air tolerance:</span> {a.dryAirTolerance}</li>
              <li><span className="font-semibold">Size:</span> {a.size}</li>
              <li><span className="font-semibold">Plant form:</span> {a.form}</li>
            </ul>
          </div>

          {/* Light tip */}
          <div className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900">Light placement tip</h3>
            <p className="mt-3 text-sm text-slate-700">{lightTip(a.light)}</p>
            <div className="mt-4 rounded-xl bg-emerald-50 border border-emerald-100 p-4 text-sm text-emerald-900">
              Quick check: if you can comfortably read a book there during the day, it’s usually bright enough.
            </div>
          </div>

          {/* Watering + weekly */}
          <div className="rounded-2xl border border-amber-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900">Watering rule + what to do this week</h3>

            <div className="mt-3">
              <p className="text-sm font-semibold text-amber-900">Simple watering trigger</p>
              <p className="text-sm text-slate-700 mt-1">{wateringRule(a.watering)}</p>
            </div>

            <div className="mt-4">
              <p className="text-sm font-semibold text-amber-900">This week</p>
              <ul className="mt-2 space-y-1 text-sm text-slate-700">
                {weeklyPlan(a.careTime).map((x) => (
                  <li key={x} className="flex gap-2">
                    <span className="text-amber-600 mt-[2px]">•</span>
                    <span>{x}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Mistakes + fixes */}
          <div className="rounded-2xl border border-rose-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900">Common mistakes + quick fixes</h3>

            <div className="mt-3 space-y-3 text-sm text-slate-700">
              {a.watering === "low" && (
                <div className="rounded-xl bg-rose-50 border border-rose-100 p-4">
                  <p className="font-semibold text-rose-900">Symptom:</p>
                  <p>Yellowing or mushy base</p>
                  <p className="mt-2 font-semibold text-rose-900">Likely cause:</p>
                  <p>Too much water</p>
                  <p className="mt-2 font-semibold text-rose-900">Fix:</p>
                  <p>Let soil dry fully, then water less often. Use a pot with drainage.</p>
                </div>
              )}

              {a.light === "low" && (
                <div className="rounded-xl bg-rose-50 border border-rose-100 p-4">
                  <p className="font-semibold text-rose-900">Symptom:</p>
                  <p>Scorched / crispy patches</p>
                  <p className="mt-2 font-semibold text-rose-900">Likely cause:</p>
                  <p>Too much direct sun</p>
                  <p className="mt-2 font-semibold text-rose-900">Fix:</p>
                  <p>Move it back from the window or add a sheer curtain.</p>
                </div>
              )}

              <div className="rounded-xl bg-rose-50 border border-rose-100 p-4">
                <p className="font-semibold text-rose-900">Symptom:</p>
                <p>Drooping or limp leaves</p>
                <p className="mt-2 font-semibold text-rose-900">Likely cause:</p>
                <p>Either underwatering or root issues</p>
                <p className="mt-2 font-semibold text-rose-900">Fix:</p>
                <p>Check soil moisture first. If soggy, pause watering. If dry, water thoroughly.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Shopping list */}
        <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">Shopping list</h2>
          <p className="text-sm text-slate-600 mt-1">
            Helpful tools to make care easier (especially for beginners).
          </p>

          <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm font-semibold text-slate-900">Recommended</p>
              <ul className="mt-2 space-y-2 text-sm text-slate-700">
                {equipment.length ? (
                  equipment.map((item) => (
                    <li key={item.id} className="flex gap-2">
                      <span className="text-emerald-600 mt-[2px]">•</span>
                      <span>{item.label}</span>
                    </li>
                  ))
                ) : (
                  <li className="text-slate-500">No specific tools listed for this plant yet.</li>
                )}
              </ul>
            </div>

            <div>
              <p className="text-sm font-semibold text-slate-900">Nice-to-haves</p>
              <ul className="mt-2 space-y-2 text-sm text-slate-700">
                {niceToHaves.map((x) => (
                  <li key={x} className="flex gap-2">
                    <span className="text-amber-600 mt-[2px]">•</span>
                    <span>{x}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </section>
      </div>
    </main>
  );
}
