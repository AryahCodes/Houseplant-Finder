"use client";

import { useEffect, useMemo, useState } from "react";
import type { Plant, Question } from "@/lib/scoring/types";
import { getPersonalizedBullets } from "@/components/personalization";

export default function PersonalizedMatch({
  plant,
  questions,
}: {
  plant: Plant;
  questions: Question[];
}) {
  const [answers, setAnswers] = useState<Record<string, string> | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("plantQuizAnswers");
    setAnswers(stored ? JSON.parse(stored) : null);
  }, []);

  const bullets = useMemo(() => {
    return getPersonalizedBullets({ plant, questions, answers });
  }, [plant, questions, answers]);

  if (!answers) {
    return (
      <p className="text-sm text-slate-600">
        Take the quiz to see personalized reasons this plant fits you.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <p className="text-sm font-semibold text-emerald-900">Why this plant fits you</p>
        <ul className="mt-2 space-y-1 text-sm text-slate-700">
          {bullets.fits.slice(0, 3).map((b) => (
            <li key={b} className="flex gap-2">
              <span className="text-emerald-600 mt-[2px]">✓</span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <p className="text-sm font-semibold text-amber-900">Things to consider</p>
        <ul className="mt-2 space-y-1 text-sm text-slate-700">
          {bullets.consider.slice(0, 2).map((b) => (
            <li key={b} className="flex gap-2">
              <span className="text-amber-600 mt-[2px]">•</span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
