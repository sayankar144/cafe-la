import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import MenuCard from "@/components/MenuCard";
import { categories, MenuItem } from "@/lib/menu-data";
import api from "@/lib/api";
import { Loader2 } from "lucide-react";

export default function MenuPage() {
  const [active, setActive] = useState("All");
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await api.get('/menu');
        if (res.data && res.data.length > 0) {
            // Map the DB schema to the frontend structure
            const formatted = res.data.map((item: any) => ({
                id: item.id,
                name: item.name,
                description: item.description || undefined,
                price: parseFloat(item.price),
                image: item.imageUrl,
                category: item.category,
                tags: [] // Can add tags to DB later if needed
            }));
            setItems(formatted);
        }
      } catch (err) {
        console.error("Failed to load menu items", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMenu();
  }, []);

  const filtered = active === "All" ? items : items.filter((i) => i.category === active);

  if (loading) {
    return (
        <div className="pt-24 min-h-screen bg-background flex justify-center items-center">
            <Loader2 className="w-8 h-8 animate-spin text-coffee-primary" />
        </div>
    );
  }

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
