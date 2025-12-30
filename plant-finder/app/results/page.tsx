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

export default function ResultsPage() {
  const [answers, setAnswers] = useState<Record<string, string> | null>(null);
  const [loading, setLoading] = useState(true);

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

  const rankedPlants = useMemo(() => {
    if (!answers) return [];

    const scored = plants.map((plant) =>
      scorePlant(plant, answers, questions)
    );

    const filtered = scored.filter(({ plant }) => {
      const a = plant.attributes;
      if (petSafeOnly && a.petSafety !== "safe") return false;
      if (lowLightOnly && a.light !== "low") return false;
      if (lowWaterOnly && a.watering !== "low") return false;
      return true;
    });

    const sorted = [...filtered].sort((a, b) => {
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

    return sorted;
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

        {/* FILTERS */}
        <div className="border bg-white p-4 flex flex-wrap gap-6 items-center justify-between">
          <div className="flex flex-wrap gap-6">
            {/* Helper */}
            {(
              [
                ["Pet-safe only", petSafeOnly, setPetSafeOnly],
                ["Low light only", lowLightOnly, setLowLightOnly],
                ["Low watering only", lowWaterOnly, setLowWaterOnly],
              ] as const
            ).map(([label, value, setter]) => (
              <button
                key={label}
                onClick={() => setter(!value)}
                className="flex items-center gap-3 text-sm"
              >
                <span
                  className={`w-5 h-5 border flex items-center justify-center ${
                    value
                      ? "bg-gray-900 text-white"
                      : "bg-white"
                  }`}
                >
                  {value && "✓"}
                </span>
                <span>{label}</span>
              </button>
            ))}
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2">
            <span className="text-sm">Sort</span>
            <select
              value={sortMode}
              onChange={(e) => setSortMode(e.target.value as SortMode)}
              className="border px-2 py-1 text-sm"
            >
              <option value="score">Best match (score)</option>
              <option value="care">Lowest care</option>
              <option value="pet">Pet-safe first</option>
            </select>
          </div>
        </div>

        {/* RESULTS */}
        {rankedPlants.length === 0 && (
          <div className="border p-6 bg-white text-center">
            No plants match your current filters.
          </div>
        )}

        {rankedPlants.map(({ plant, score }) => {
          const lightCare =
            CARE_INFO.light[plant.attributes.light as keyof typeof CARE_INFO.light];
          const wateringCare =
            CARE_INFO.watering[
              plant.attributes.watering as keyof typeof CARE_INFO.watering
            ];
          const careTimeCare =
            CARE_INFO.careTime[
              plant.attributes.careTime as keyof typeof CARE_INFO.careTime
            ];

          const whyAttributes = (Object.keys(
            plant.attributes
          ) as Attribute[]).filter((attr) => {
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
                  <p className="text-sm text-gray-600">
                    Match score: {score}
                  </p>

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
