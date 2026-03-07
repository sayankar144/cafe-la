import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import SectionReveal from "@/components/SectionReveal";

import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import heroCafe from "@/assets/hero-cafe.jpg";
import coffee from "@/assets/coffee-latte.jpg";
import burger from "@/assets/burger.jpg";
import dessert from "@/assets/dessert.jpg";

const images = [gallery1, gallery2, gallery3, gallery4, heroCafe, coffee, burger, dessert];

export default function GalleryPage() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="pt-20 min-h-screen bg-background">
      <section className="cafe-section">
        <SectionReveal className="cafe-container">
          <div className="text-center mb-12">
            <p className="text-accent font-medium mb-2 tracking-widest uppercase text-sm">Gallery</p>
            <h1 className="cafe-heading text-foreground">The Cafe LA Experience</h1>
          </div>

          <div className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
            {images.map((img, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.02 }}
                className="break-inside-avoid rounded-xl overflow-hidden cursor-pointer"
                onClick={() => setSelected(img)}
              >
                <img src={img} alt={`Gallery ${i + 1}`} className="w-full object-cover" loading="lazy" />
              </motion.div>
            ))}
          </div>
        </SectionReveal>
      </section>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-foreground/90 flex items-center justify-center p-4"
            onClick={() => setSelected(null)}
          >
            <button className="absolute top-6 right-6 text-primary-foreground" onClick={() => setSelected(null)}>
              <X className="h-8 w-8" />
            </button>
            <motion.img
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              src={selected}
              alt="Full view"
              className="max-w-full max-h-[90vh] rounded-2xl object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
