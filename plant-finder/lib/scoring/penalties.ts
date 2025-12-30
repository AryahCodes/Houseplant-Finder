import { ORDER_MAP } from "./orderMap";

export function orderedPenalty(
  attribute: keyof typeof ORDER_MAP,
  userValue: string,
  plantValue: string,
  weight: number
) {
  const order = ORDER_MAP[attribute] as readonly string[];

  const distance = Math.abs(
    order.indexOf(userValue) - order.indexOf(plantValue)
  );

  return distance * weight;
}


export function formPenalty(
  userValue: string,
  plantValue: string,
  weight: number
) {
  return userValue === plantValue ? 0 : weight;
}

export function petSafetyPenalty(
  userValue: string,
  plantValue: string,
  weight: number
) {
  if (userValue === "safe" && plantValue === "toxic") {
    return weight * 2; // strong but not absolute
  }
  return 0;
}
