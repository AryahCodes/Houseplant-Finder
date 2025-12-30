import type { Attribute } from "./types";

export const WHY_EXPLANATIONS: Record<Attribute, string> = {
  light: "Matches your light conditions",
  careTime: "Fits the amount of care you want to give",
  watering: "Works with your watering habits",
  dryAirTolerance: "Handles your home’s humidity well",
  size: "Fits the space you have available",
  growthRate: "Grows at a pace you’ll enjoy",
  form: "Matches the plant style you prefer",
  petSafety: "Safer around pets",
};

export const MISMATCH_EXPLANATIONS: Record<Attribute, string> = {
  light: "Needs a different light level than your space",
  careTime: "Requires more care than you prefer",
  watering: "Watering needs don’t match your habits",
  dryAirTolerance: "May struggle with your home’s humidity",
  size: "May not fit your available space well",
  growthRate: "Grows at a different pace than you prefer",
  form: "Plant style doesn’t match your preference",
  petSafety: "Not safe for pets",
};
