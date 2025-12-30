"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import questions from "@/data/questions.json";
import { ANSWERS_KEY } from "@/lib/scoring/storageKeys";

type AnswerMap = Record<string, string>;

export default function QuizPage() {
  const router = useRouter();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<AnswerMap>({});

  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;
  const progress = ((currentIndex + 1) / totalQuestions) * 100;
  const selectedAnswer = answers[currentQuestion.id];

  function handleSelect(value: string) {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: value,
    }));
  }

  function handleNext() {
    if (!selectedAnswer) return;

    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      localStorage.setItem(ANSWERS_KEY, JSON.stringify(answers));
      router.push("/results");
    }
  }

  function handleBack() {
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
    }
  }

  return (
    <main className="min-h-screen bg-[#f6f3ec] px-6 py-16">
      <div className="max-w-3xl mx-auto">
        <div className="bg-[#f3efe6] rounded-[32px] shadow-xl px-10 py-12">

          {/* HEADER */}
          <div className="mb-10">
            <p className="text-sm text-emerald-700 font-medium mb-3">
              🌱 Plant Finder Quiz
            </p>

            <div className="flex justify-between text-sm text-slate-500 mb-4">
              <span>
                Question {currentIndex + 1} of {totalQuestions}
              </span>
              <span>{Math.round(progress)}%</span>
            </div>

            <div className="relative h-3 bg-emerald-100 rounded-full overflow-hidden">
              <div
                className="absolute left-0 top-0 h-full bg-gradient-to-r from-emerald-500 to-emerald-600"
                style={{ width: `${progress}%` }}
              />
              <span
                className="absolute top-1/2 -translate-y-1/2 text-lg"
                style={{ left: `calc(${progress}% - 10px)` }}
              >
                🍃
              </span>
            </div>
          </div>

          {/* IMAGE - Before question, shows full image without cropping */}
          <div className="flex justify-center mb-8">
            <div className="w-full max-w-2xl h-48 bg-[#e9e4d8] rounded-2xl overflow-hidden flex items-center justify-center">
              <Image
                src={currentQuestion.image}
                alt={currentQuestion.question}
                width={800}
                height={192}
                className="object-contain max-h-48"
                priority
                unoptimized
              />
            </div>
          </div>

          {/* QUESTION */}
          <h2 className="text-2xl md:text-3xl font-serif font-semibold text-slate-900 text-center mb-12">
            <span className="mr-2">{currentQuestion.icon}</span>
            {currentQuestion.question}
          </h2>

          {/* OPTIONS */}
          <div className="space-y-6 mb-14">
            {currentQuestion.options.map((option) => {
              const isSelected = selectedAnswer === option.value;

              return (
                <button
                  key={option.value}
                  onClick={() => handleSelect(option.value)}
                  className={[
                    "w-full flex items-center gap-5 px-8 py-6 rounded-full transition-all",
                    "bg-white/70 border",
                    isSelected
                      ? "border-emerald-600 ring-2 ring-emerald-300 shadow-md"
                      : "border-transparent hover:border-emerald-300 hover:bg-white",
                  ].join(" ")}
                >
                  <span className="text-2xl w-8 text-center">
                    {option.icon}
                  </span>

                  <span className="flex-1 text-lg font-medium text-slate-800">
                    {option.label}
                  </span>

                  <span
                    className={[
                      "w-6 h-6 rounded-full border-2 flex items-center justify-center",
                      isSelected
                        ? "bg-emerald-600 border-emerald-600 text-white"
                        : "border-slate-300",
                    ].join(" ")}
                  >
                    {isSelected && "✓"}
                  </span>
                </button>
              );
            })}
          </div>

          {/* NAVIGATION */}
          <div className="flex justify-between items-center">
            {currentIndex > 0 ? (
              <button
                onClick={handleBack}
                className="text-slate-500 hover:text-slate-900 font-medium"
              >
                ← Back
              </button>
            ) : (
              <div />
            )}

            <button
              onClick={handleNext}
              disabled={!selectedAnswer}
              className="px-10 py-4 bg-emerald-700 text-white rounded-full font-semibold
                         hover:bg-emerald-800 transition
                         disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {currentIndex === totalQuestions - 1
                ? "See My Matches 🌿"
                : "Next"}
            </button>
          </div>

        </div>
      </div>
    </main>
  );
}
