import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart-context";
import type { MenuItem } from "@/lib/menu-data";

export default function MenuCard({ item }: { item: MenuItem }) {
  const { addItem } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="cafe-card bg-card group"
    >
      <div className="relative overflow-hidden aspect-[4/3]">
        <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
        {item.tags && (
          <div className="absolute top-3 left-3 flex gap-1.5">
            {item.tags.map((tag) => (
              <span key={tag} className="px-2.5 py-1 text-xs font-semibold rounded-full bg-accent text-accent-foreground capitalize">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-heading text-lg font-semibold text-foreground">{item.name}</h3>
          <span className="font-heading text-lg font-bold text-accent whitespace-nowrap">₹{item.price}</span>
        </div>
        {item.description && <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{item.description}</p>}
        <Button
          onClick={() => addItem(item)}
          className="w-full rounded-full bg-primary text-primary-foreground hover:bg-accent gap-2"
        >
          <Plus className="h-4 w-4" /> Add to Cart
        </Button>
      </div>
    </motion.div>
  );
}
