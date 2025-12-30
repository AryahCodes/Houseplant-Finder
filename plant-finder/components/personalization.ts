import type { Attribute, Plant, Question } from "@/lib/scoring/types";

const fitText: Record<Attribute, string> = {
  light: "Matches your light conditions",
  careTime: "Fits the amount of care you want to give",
  watering: "Works with your watering style",
  dryAirTolerance: "Handles typical indoor air well",
  size: "Fits the space you have available",
  petSafety: "Safer around pets (based on your answers)",
  growthRate: "Grows at a pace you’ll enjoy",
  form: "Matches the look you prefer",
};

function mismatchText(attribute: Attribute, wanted: string, actual: string) {
  switch (attribute) {
    case "light":
      return "May need a different light level than your space";
    case "watering":
      return "Watering needs may not match your habits";
    case "careTime":
      return "May require more routine care than you prefer";
    case "petSafety":
      return actual === "toxic" ? "Not ideal if you have pets that can reach plants" : "Pet safety may not be a priority for you";
    case "size":
      return "Might not fit your size preference";
    case "form":
      return "Plant style might not match your preference";
    case "growthRate":
      return "Growth speed might not match what you want";
    case "dryAirTolerance":
      return "May struggle if your home is very dry";
    default:
      return "May not match one of your preferences";
  }
}

export function getPersonalizedBullets({
  plant,
  questions,
  answers,
}: {
  plant: Plant;
  questions: Question[];
  answers: Record<string, string> | null;
}) {
  const fits: string[] = [];
  const consider: string[] = [];

  if (!answers) return { fits, consider };

  for (const q of questions) {
    const wanted = answers[q.id];
    if (!wanted) continue;

    const actual = plant.attributes[q.attribute];

    if (actual === wanted) {
      fits.push(fitText[q.attribute] ?? "Matches one of your preferences");
    } else {
      consider.push(mismatchText(q.attribute, wanted, actual));
    }
  }

  // de-dupe
  return {
    fits: Array.from(new Set(fits)),
    consider: Array.from(new Set(consider)),
  };
}
