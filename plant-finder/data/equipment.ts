export type EquipmentItem = {
  id: string;
  label: string;
  url?: string; // Optional: for future affiliate links
};

export const EQUIPMENT_BY_PLANT: Record<string, EquipmentItem[]> = {
  "snake-plant": [
    {
      id: "watering-can",
      label: "Small watering can",
      // url: "https://amzn.to/..." // Ready for affiliate links
    },
    {
      id: "moisture-meter",
      label: "Soil moisture meter",
      // url: "https://amzn.to/..."
    },
  ],
  "zz-plant": [
    {
      id: "watering-can",
      label: "Small watering can",
      // url: "https://amzn.to/..."
    },
    {
      id: "moisture-meter",
      label: "Soil moisture meter",
      // url: "https://amzn.to/..."
    },
  ],
  pothos: [
    {
      id: "pruning-shears",
      label: "Small pruning scissors",
      // url: "https://amzn.to/..."
    },
    {
      id: "hanging-hook",
      label: "Hanging hook (if trailing)",
      // url: "https://amzn.to/..."
    },
  ],
  "spider-plant": [
    {
      id: "pruning-shears",
      label: "Small pruning scissors",
      // url: "https://amzn.to/..."
    },
    {
      id: "hanging-hook",
      label: "Hanging hook (optional)",
      // url: "https://amzn.to/..."
    },
  ],
  "heartleaf-philodendron": [
    {
      id: "pruning-shears",
      label: "Small pruning scissors",
      // url: "https://amzn.to/..."
    },
    {
      id: "hanging-hook",
      label: "Hanging hook (if trailing)",
      // url: "https://amzn.to/..."
    },
  ],
  "peace-lily": [
    {
      id: "watering-can",
      label: "Watering can with narrow spout",
      // url: "https://amzn.to/..."
    },
    {
      id: "moisture-meter",
      label: "Soil moisture meter",
      // url: "https://amzn.to/..."
    },
  ],
  "rubber-plant": [
    {
      id: "watering-can",
      label: "Watering can",
      // url: "https://amzn.to/..."
    },
    {
      id: "plant-stand",
      label: "Plant stand (for light)",
      // url: "https://amzn.to/..."
    },
  ],
  "aloe-vera": [
    {
      id: "cactus-soil",
      label: "Cactus/succulent potting mix",
      // url: "https://amzn.to/..."
    },
    {
      id: "terracotta-pot",
      label: "Terracotta pot with drainage",
      // url: "https://amzn.to/..."
    },
  ],
};