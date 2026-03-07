import { useState } from "react";
import { motion } from "framer-motion";
import MenuCard from "@/components/MenuCard";
import { menuItems, categories } from "@/lib/menu-data";

export default function MenuPage() {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? menuItems : menuItems.filter((i) => i.category === active);

  return (
    <div className="pt-20 min-h-screen bg-background">
      <section className="cafe-section">
        <div className="cafe-container">
          <div className="text-center mb-12">
            <p className="text-accent font-medium mb-2 tracking-widest uppercase text-sm">Explore</p>
            <h1 className="cafe-heading text-foreground">Our Menu</h1>
          </div>

          <div className="flex justify-center gap-2 flex-wrap mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  active === cat
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((item) => (
              <MenuCard key={item.id} item={item} />
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
