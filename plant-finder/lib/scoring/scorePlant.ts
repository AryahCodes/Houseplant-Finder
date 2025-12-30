import { Plant, Question, ScoreResult, Attribute } from "./types";
import { ORDER_MAP } from "./orderMap";
import {
  orderedPenalty,
  formPenalty,
  petSafetyPenalty,
} from "./penalties";

export function scorePlant(
  plant: Plant,
  answers: Record<string, string>,
  questions: Question[]
): ScoreResult {
  let score = 0;

  const breakdown: Partial<Record<Attribute, number>> = {};

  for (const q of questions) {
    const userValue = answers[q.id];
    const plantValue = plant.attributes[q.attribute];

    if (!userValue || !plantValue) continue;

    let penalty = 0;

    if (q.attribute in ORDER_MAP) {
      penalty = orderedPenalty(
        q.attribute as keyof typeof ORDER_MAP,
        userValue,
        plantValue,
        q.weight
      );
    } else if (q.attribute === "form") {
      penalty = formPenalty(userValue, plantValue, q.weight);
    } else if (q.attribute === "petSafety") {
      penalty = petSafetyPenalty(userValue, plantValue, q.weight);
    }

    if (penalty > 0) {
      breakdown[q.attribute] = penalty;
      score += penalty;
    }
  }

  return { plant, score, breakdown };
}
