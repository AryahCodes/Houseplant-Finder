import { describe, it, expect } from "vitest";
import { scorePlant } from "../scorePlant";
import type { Plant, Question } from "../types";

const questions: Question[] = [
  { id: "light", attribute: "light", weight: 5 },
  { id: "petSafety", attribute: "petSafety", weight: 6 },
];

const snakePlant: Plant = {
  name: "Snake Plant",
  slug: "snake-plant",
  attributes: {
    light: "low",
    careTime: "very-low",
    watering: "low",
    dryAirTolerance: "high",
    size: "medium",
    growthRate: "slow",
    form: "upright",
    petSafety: "toxic",
  },
};

describe("scorePlant", () => {
  it("gives zero penalty for exact matches", () => {
    const answers = { light: "low" };

    const result = scorePlant(snakePlant, answers, questions);

    expect(result.score).toBe(0);
  });

  it("penalizes distance-based mismatches correctly", () => {
    const answers = { light: "bright" };

    const result = scorePlant(snakePlant, answers, questions);

    // low → bright = distance 2 × weight 5
    expect(result.score).toBe(10);
  });

  it("penalizes toxic plants when user has pets", () => {
    const answers = { petSafety: "safe" };

    const result = scorePlant(snakePlant, answers, questions);

    // weight 6 × 2
    expect(result.score).toBe(12);
  });

  it("combines multiple penalties correctly", () => {
    const answers = {
      light: "bright",
      petSafety: "safe",
    };

    const result = scorePlant(snakePlant, answers, questions);

    expect(result.score).toBe(22);
  });
});
