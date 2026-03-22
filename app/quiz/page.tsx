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
  const [progress, setProgress] = useState(0);

  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;

  const selectedAnswer = answers[currentQuestion.id];

  function handleSelect(value: string) {
    setProgress(((currentIndex + 1) / totalQuestions) * 100);
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
    setProgress(((currentIndex - 1) / totalQuestions) * 100);
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
    }
  }

  return (
  <main className="h-screen flex items-center justify-center bg-[#f8fafc] px-4 overflow-hidden">
  <div className="w-full max-w-2xl h-full flex items-center">

    {/* Card */}
    <div className="bg-white rounded-2xl shadow-xl p-6 w-full h-[90vh] flex flex-col">

      {/* Top Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-500 mb-1">
          <span>{currentIndex + 1} / {totalQuestions}</span>
          <span>{Math.round(progress)}%</span>
        </div>

        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* SCROLLABLE CONTENT */}
      <div className="flex-1 overflow-y-auto pr-2">

        {/* Image */}
        <div className="mb-4 flex justify-center">
          <Image
            src={currentQuestion.image}
            alt={currentQuestion.question}
            width={250}
            height={150}
            className="rounded-lg object-contain"
            priority
            blurDataURL="https://media.licdn.com/dms/image/v2/D4E0BAQFEAKvQAZ8Zmg/company-logo_200_200/B4EZsOHFSBJ0AQ-/0/1765468296836/img_logo?e=2147483647&v=beta&t=shYVYg3atXalYcBkQoeU4p0Ih2_wf5HwRFWiLTemLt8"
          />
        </div>

        {/* Question */}
        <h2 className="text-lg md:text-xl font-semibold text-gray-800 text-center mb-4">
          {currentQuestion.icon} {currentQuestion.question}
        </h2>

        {/* Options */}
        <div className="space-y-2">
          {currentQuestion.options.map((option) => {
            const isSelected = selectedAnswer === option.value;

            return (
              <button
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className={`
                  w-full text-left px-4 py-3 rounded-lg border transition
                  flex items-center justify-between
                  ${
                    isSelected
                      ? "bg-blue-50 border-blue-500"
                      : "bg-gray-50 hover:bg-gray-100 border-gray-200"
                  }
                `}
              >
                <span className="flex items-center gap-2">
                  <span>{option.icon}</span>
                  <span className="text-sm">{option.label}</span>
                </span>

                {isSelected && (
                  <span className="text-blue-500 font-bold">✓</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* FIXED FOOTER */}
      <div className="pt-4 flex justify-between">
        <button
          onClick={handleBack}
          disabled={currentIndex === 0}
          className="px-4 py-2 rounded-lg border text-gray-600 disabled:opacity-40"
        >
          Back
        </button>

        <button
          onClick={handleNext}
          disabled={!selectedAnswer}
          className="px-6 py-2 rounded-lg bg-blue-500 text-white disabled:opacity-40"
        >
          {currentIndex === totalQuestions - 1 ? "Finish" : "Next"}
        </button>
      </div>

    </div>
  </div>
</main>
);
}