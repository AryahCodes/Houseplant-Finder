import type { EquipmentItem } from "@/data/equipment";

interface EquipmentListProps {
  items: EquipmentItem[];
  maxItems?: number;
}

export default function EquipmentList({
  items,
  maxItems = 3,
}: EquipmentListProps) {
  const displayItems = items.slice(0, maxItems);

  return (
    <section className="mb-10">
      <h2 className="text-xl font-semibold mb-3">Helpful equipment</h2>

      <ul className="space-y-2">
        {displayItems.map((item) => (
          <li key={item.id} className="flex items-start gap-2">
            <span className="text-green-600 mt-1">•</span>
            {item.url ? (
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="text-gray-700 hover:text-green-600 hover:underline"
              >
                {item.label}
              </a>
            ) : (
              <span className="text-gray-700">{item.label}</span>
            )}
          </li>
        ))}
      </ul>

      <p className="text-sm text-gray-500 mt-3">
        These items can make care easier, especially for beginners.
      </p>
    </section>
  );
}