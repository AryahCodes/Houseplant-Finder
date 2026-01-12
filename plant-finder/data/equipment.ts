export type EquipmentItem = {
  id: string;
  label: string;
  image: string;
  url?: string; // Optional: for future affiliate links
};

export const EQUIPMENT_BY_PLANT: Record<string, EquipmentItem[]> = {
  // ----------------------------
  // Snake Plant (Sansevieria)
  // ----------------------------
  "snake-plant": [
    {
      id: "watering-can",
      label: "Small watering can",
      image: "/images/equipment/SmallWateringCan.png",
    },
    {
      id: "pot-drainage",
      label: "Pot with drainage holes",
      image: "/images/equipment/PotWithDrainageHoles.png",
    },
    {
      id: "saucer",
      label: "Saucer or drip tray",
      image: "/images/equipment/SaucerOrDripTray.png",
    },
    {
      id: "moisture-meter",
      label: "Soil moisture meter (optional)",
      image: "/images/equipment/SoilMoistureMeter.png",
    },
  ],

  // ----------------------------
  // ZZ Plant
  // ----------------------------
  "zz-plant": [
    {
      id: "watering-can",
      label: "Small watering can",
      image: "/images/equipment/SmallWateringCan.png",
    },
    {
      id: "pot-drainage",
      label: "Pot with drainage holes",
      image: "/images/equipment/PotWithDrainageHoles.png",
    },
    {
      id: "saucer",
      label: "Saucer or drip tray",
      image: "/images/equipment/SaucerOrDripTray.png",
    },
    {
      id: "moisture-meter",
      label: "Soil moisture meter (optional)",
      image: "/images/equipment/SoilMoistureMeter.png",
    },
  ],

  // ----------------------------
  // Pothos
  // ----------------------------
  pothos: [
    {
      id: "watering-can",
      label: "Small watering can",
      image: "/images/equipment/SmallWateringCan.png",
    },
    {
      id: "potting-mix",
      label: "Indoor potting mix",
      image: "/images/equipment/IndoorPottingMix.png",
    },
    {
      id: "pruning-shears",
      label: "Small pruning scissors",
      image: "/images/equipment/SmallPruningScissors.png",
    },
    {
      id: "hanging-hook",
      label: "Hanging hook (if trailing)",
      image: "/images/equipment/HangingHook.png",
    },
    {
      id: "moss-pole",
      label: "Moss pole or support stake (optional)",
      image: "/images/equipment/MossPole.png", 
    },
  ],

  // ----------------------------
  // Spider Plant
  // ----------------------------
  "spider-plant": [
    {
      id: "watering-can",
      label: "Small watering can",
      image: "/images/equipment/SmallWateringCan.png",
    },
    {
      id: "pot-drainage",
      label: "Pot with drainage holes",
      image: "/images/equipment/PotWithDrainageHoles.png",
    },
    {
      id: "pruning-shears",
      label: "Small pruning scissors (for plantlets)",
      image: "/images/equipment/SmallPruningScissors.png",
    },
    {
      id: "hanging-hook",
      label: "Hanging hook (optional)",
      image: "/images/equipment/HangingHook.png",
    },
  ],

  // ----------------------------
  // Heartleaf Philodendron
  // ----------------------------
  "heartleaf-philodendron": [
    {
      id: "watering-can",
      label: "Small watering can",
      image: "/images/equipment/SmallWateringCan.png",
    },
    {
      id: "potting-mix",
      label: "Indoor potting mix",
      image: "/images/equipment/IndoorPottingMix.png",
    },
    {
      id: "pruning-shears",
      label: "Small pruning scissors",
      image: "/images/equipment/SmallPruningScissors.png",
    },
    {
      id: "hanging-hook",
      label: "Hanging hook (if trailing)",
      image: "/images/equipment/HangingHook.png",
    },
    {
      id: "spray-bottle",
      label: "Spray bottle for humidity (optional)",
      image: "/images/equipment/SprayBottle.png", 
    },
  ],

  // ----------------------------
  // Peace Lily
  // ----------------------------
  "peace-lily": [
    {
      id: "watering-can",
      label: "Watering can with narrow spout",
      image: "/images/equipment/SmallWateringCan.png",
    },
    {
      id: "pot-drainage",
      label: "Pot with drainage holes",
      image: "/images/equipment/PotWithDrainageHoles.png",
    },
    {
      id: "saucer",
      label: "Saucer or drip tray",
      image: "/images/equipment/SaucerOrDripTray.png",
    },
    {
      id: "moisture-meter",
      label: "Soil moisture meter (optional)",
      image: "/images/equipment/SoilMoistureMeter.png",
    },
    {
      id: "humidity-tray",
      label: "Humidity tray or pebble tray (optional)",
      image: "/images/equipment/HumidityTray.png", 
    },
  ],

  // ----------------------------
  // Rubber Plant
  // ----------------------------
  "rubber-plant": [
    {
      id: "watering-can",
      label: "Watering can",
      image: "/images/equipment/SmallWateringCan.png",
    },
    {
      id: "pot-drainage",
      label: "Pot with drainage holes",
      image: "/images/equipment/PotWithDrainageHoles.png",
    },
    {
      id: "pruning-shears",
      label: "Small pruning scissors",
      image: "/images/equipment/SmallPruningScissors.png",
    },
    {
      id: "grow-light",
      label: "Small grow light (optional)",
      image: "/images/equipment/SmallGrowLight.png",
    },
  ],

  // ----------------------------
  // Aloe Vera
  // ----------------------------
  "aloe-vera": [
    {
      id: "watering-can",
      label: "Small watering can",
      image: "/images/equipment/SmallWateringCan.png",
    },
    {
      id: "cactus-soil",
      label: "Cactus / succulent potting mix",
      image: "/images/equipment/IndoorPottingMix.png",
    },
    {
      id: "terracotta-pot",
      label: "Terracotta pot with drainage",
      image: "/images/equipment/PotWithDrainageHoles.png",
    },
    {
      id: "gloves",
      label: "Gardening gloves (optional)",
      image: "/images/equipment/GardeningGloves.png", 
    },
  ],
};
