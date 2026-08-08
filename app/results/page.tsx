"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import rawPlants from "@/data/plants.json";
import rawQuestions from "@/data/questions.json";

import type { Plant, Question, Attribute } from "@/lib/scoring/types";
import { scorePlant } from "@/lib/scoring/scorePlant";
import { CARE_INFO } from "@/data/careInfo";
import { WHY_EXPLANATIONS } from "@/lib/scoring/explanations";
import { ANSWERS_KEY } from "@/lib/scoring/storageKeys";

const plants = rawPlants as Plant[];
const questions = rawQuestions as Question[];

type SortMode = "score" | "care" | "pet";

const careOrder: Record<string, number> = {
  "very-low": 0,
  low: 1,
  medium: 2,
  high: 3,
};

/* ----------------------------------------
   Match score → human-friendly label
---------------------------------------- */
function getMatchLabel(score: number) {
  if (score <= 10) return { label: "Excellent match", color: "emerald" };
  if (score <= 14) return { label: "Great match", color: "green" };
  if (score <= 18) return { label: "Good match", color: "yellow" };
  return { label: "Okay match", color: "gray" };
}

export default function ResultsPage() {
  const [answers, setAnswers] = useState<Record<string, string> | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch("/api/quiz/submit", { method: "POST" }).catch(() => {});
  }, []);

  // filters
  const [petSafeOnly, setPetSafeOnly] = useState(false);
  const [lowLightOnly, setLowLightOnly] = useState(false);
  const [lowWaterOnly, setLowWaterOnly] = useState(false);
  const [sortMode, setSortMode] = useState<SortMode>("score");

  useEffect(() => {
    const stored =
      localStorage.getItem(ANSWERS_KEY) ||
      localStorage.getItem("plantQuizAnswers");

    if (stored) {
      setAnswers(JSON.parse(stored));
      localStorage.setItem(ANSWERS_KEY, stored);
    }

    setLoading(false);
  }, []);

  const handleRetakeQuiz = () => {
    localStorage.removeItem(ANSWERS_KEY);
    localStorage.removeItem("plantQuizAnswers");
  };

  const rankedPlants = useMemo(() => {
    if (!answers) return [];

    const scored = plants.map((plant) => scorePlant(plant, answers, questions));

    const filtered = scored.filter(({ plant }) => {
      const a = plant.attributes;
      if (petSafeOnly && a.petSafety !== "safe") return false;
      if (lowLightOnly && a.light !== "low") return false;
      if (lowWaterOnly && a.watering !== "low") return false;
      return true;
    });

    return [...filtered].sort((a, b) => {
      if (sortMode === "score") return a.score - b.score;

      if (sortMode === "care") {
        const ca = careOrder[a.plant.attributes.careTime] ?? 999;
        const cb = careOrder[b.plant.attributes.careTime] ?? 999;
        return ca !== cb ? ca - cb : a.score - b.score;
      }

      const pa = a.plant.attributes.petSafety === "safe" ? 0 : 1;
      const pb = b.plant.attributes.petSafety === "safe" ? 0 : 1;
      return pa !== pb ? pa - pb : a.score - b.score;
    });
  }, [answers, petSafeOnly, lowLightOnly, lowWaterOnly, sortMode]);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        Loading…
      </main>
    );
  }

  if (!answers) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p>No quiz results found</p>
          <Link href="/quiz">Take the quiz →</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-4xl font-bold text-center">
          Your Plant Matches 🌱
        </h1>

        <p className="text-center text-sm text-slate-600 max-w-xl mx-auto">
          Plants are ranked by how closely they match your space, care
          preferences, and lifestyle. Higher-ranked plants are a better fit for
          you.
        </p>

        <div className="flex justify-center">
          <Link
            href="/quiz"
            onClick={handleRetakeQuiz}
            className="inline-flex items-center rounded-full border-2 border-emerald-700 px-6 py-2.5 text-sm font-semibold text-emerald-800 no-underline transition-colors duration-200 hover:bg-emerald-700 hover:text-white"
          >
            Retake the quiz
          </Link>
        </div>

        {/* FILTERS + SORT */}
        <section className="bg-white border rounded-xl px-4 py-3">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {(
                [
                  ["Pet-safe", petSafeOnly, setPetSafeOnly],
                  ["Low light", lowLightOnly, setLowLightOnly],
                  ["Low watering", lowWaterOnly, setLowWaterOnly],
                ] as const
              ).map(([label, value, setter]) => (
                <button
                  key={label}
                  onClick={() => setter(!value)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm border transition
                    ${
                      value
                        ? "bg-emerald-600 text-white border-emerald-600"
                        : "bg-white text-slate-700 hover:bg-slate-100"
                    }`}
                >
                  <span
                    className={`w-4 h-4 flex items-center justify-center rounded-full border text-xs font-bold
                      ${
                        value
                          ? "bg-white text-emerald-600 border-white"
                          : "border-slate-300 text-transparent"
                      }`}
                  >
                    ✓
                  </span>
                  {label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 text-sm">
              <span className="text-slate-500">Sort by</span>
              <select
                value={sortMode}
                onChange={(e) => setSortMode(e.target.value as SortMode)}
                className="border rounded-md px-2 py-1 bg-white"
              >
                <option value="score">Best match</option>
                <option value="care">Lowest care</option>
                <option value="pet">Pet-safe first</option>
              </select>
            </div>
          </div>
        </section>

        {/* RESULTS */}
        {rankedPlants.map(({ plant, score }, index) => {
          const match = getMatchLabel(score);

          const lightCare =
            CARE_INFO.light[
              plant.attributes.light as keyof typeof CARE_INFO.light
            ];
          const wateringCare =
            CARE_INFO.watering[
              plant.attributes.watering as keyof typeof CARE_INFO.watering
            ];
          const careTimeCare =
            CARE_INFO.careTime[
              plant.attributes.careTime as keyof typeof CARE_INFO.careTime
            ];

          const whyAttributes = (
            Object.keys(plant.attributes) as Attribute[]
          ).filter((attr) => {
            const q = questions.find((qq) => qq.attribute === attr);
            return q && answers[q.id] === plant.attributes[attr];
          });

          return (
            <article key={plant.slug} className="bg-white border p-6">
              <div className="flex gap-6">
                <Image
                  src={`/images/plants/${plant.slug}.jpg`}
                  alt={plant.name}
                  width={128}
                  height={128}
                  className="object-cover"
                />

                <div className="flex-1">
                  <h2 className="text-2xl font-bold">{plant.name}</h2>

                  {index === 0 && (
                    <div className="mt-1 text-xs font-semibold text-emerald-700">
                      🌟 Best overall match for you
                    </div>
                  )}

                  {index !== 0 && (
                    <div className="flex items-center gap-2 mt-1">
                      <span
                        className={`text-xs font-semibold px-2 py-1 rounded-full
        ${match.color === "emerald" && "bg-emerald-100 text-emerald-700"}
        ${match.color === "green" && "bg-green-100 text-green-700"}
        ${match.color === "yellow" && "bg-yellow-100 text-yellow-700"}
        ${match.color === "gray" && "bg-gray-100 text-gray-600"}
      `}
                      >
                        {match.label}
                      </span>
                    </div>
                  )}

                  <div className="grid grid-cols-3 gap-4 mt-3 text-sm">
                    <div>☀️ {lightCare}</div>
                    <div>💧 {wateringCare}</div>
                    <div>🧤 {careTimeCare}</div>
                  </div>

                  {whyAttributes.length > 0 && (
                    <ul className="mt-4 text-sm">
                      {whyAttributes.slice(0, 2).map((attr) => (
                        <li key={attr}>✓ {WHY_EXPLANATIONS[attr]}</li>
                      ))}
                    </ul>
                  )}

                  <Link
                    href={`/plants/${plant.slug}`}
                    className="inline-block mt-4 font-semibold"
                  >
                    View full care guide →
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </main>
  );
}
