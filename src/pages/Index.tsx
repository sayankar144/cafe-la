import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Star, MapPin, Clock, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionReveal from "@/components/SectionReveal";
import MenuCard from "@/components/MenuCard";
import { menuItems } from "@/lib/menu-data";

import heroCafe from "@/assets/hero-cafe.jpg";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";

const testimonials = [
  { name: "Sarah M.", rating: 5, text: "The best café in LA! Their latte art is mesmerizing and the truffle burger is to die for." },
  { name: "James K.", rating: 5, text: "Perfect spot for working remotely. Great WiFi, even better coffee. The ambiance is unmatched." },
  { name: "Priya R.", rating: 5, text: "We had our first date here and now it's our spot. The tiramisu is absolutely heavenly!" },
];

const featuredItems = menuItems.filter((i) => i.tags?.includes("signature") || i.tags?.includes("popular")).slice(0, 4);

export default function Index() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative h-screen flex items-center">
        <div className="absolute inset-0">
          <img src={heroCafe} alt="Cafe LA interior" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/70 via-foreground/40 to-transparent" />
        </div>
        <div className="cafe-container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-xl"
          >
            <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground leading-tight mb-6">
              Where Coffee Meets Comfort
            </h1>
            <p className="text-lg text-primary-foreground/80 mb-8 max-w-md">
              Indulge in handcrafted coffee, artisan food, and a welcoming atmosphere designed to inspire and unwind.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/menu">
                <Button size="lg" className="rounded-full bg-accent text-accent-foreground hover:bg-cafe-gold gap-2 text-base px-8">
                  View Menu <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/menu">
                <Button size="lg" variant="outline" className="rounded-full border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 text-base px-8">
                  Order Now
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Menu */}
      <section className="cafe-section bg-background">
        <SectionReveal className="cafe-container">
          <div className="text-center mb-12">
            <p className="text-accent font-medium mb-2 tracking-widest uppercase text-sm">Our Menu</p>
            <h2 className="cafe-heading text-foreground">Handmade Just For You</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredItems.map((item) => (
              <MenuCard key={item.id} item={item} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/menu">
              <Button variant="outline" className="rounded-full border-primary text-primary hover:bg-primary hover:text-primary-foreground gap-2 px-8">
                View Full Menu <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </SectionReveal>
      </section>

      {/* About / Experience */}
      <section className="cafe-section bg-card">
        <SectionReveal className="cafe-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-accent font-medium mb-2 tracking-widest uppercase text-sm">Our Story</p>
              <h2 className="cafe-heading text-foreground mb-6">Made In Los Angeles</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Welcome to Cafe LA, where the charm of Los Angeles meets the aroma of freshly brewed coffee. Our café is a cozy haven where friends gather, ideas spark, and every sip tells a story.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Come and experience the soul of LA in every cup and bite — we can't wait to welcome you!
              </p>
              <Link to="/about">
                <Button variant="outline" className="rounded-full border-primary text-primary hover:bg-primary hover:text-primary-foreground gap-2">
                  Learn More <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="rounded-2xl overflow-hidden" style={{ boxShadow: "var(--shadow-elevated)" }}>
              <img src={gallery1} alt="Cafe LA cozy interior" className="w-full h-[400px] object-cover" loading="lazy" />
            </div>
          </div>
        </SectionReveal>
      </section>

      {/* Gallery Preview */}
      <section className="cafe-section bg-background">
        <SectionReveal className="cafe-container">
          <div className="text-center mb-12">
            <p className="text-accent font-medium mb-2 tracking-widest uppercase text-sm">Gallery</p>
            <h2 className="cafe-heading text-foreground">The Cafe LA Experience</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[gallery1, gallery2, gallery3, gallery4].map((img, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.03 }}
                className="rounded-xl overflow-hidden aspect-square"
              >
                <img src={img} alt={`Gallery ${i + 1}`} className="w-full h-full object-cover" loading="lazy" />
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/gallery">
              <Button variant="outline" className="rounded-full border-primary text-primary hover:bg-primary hover:text-primary-foreground gap-2">
                View Gallery <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </SectionReveal>
      </section>

      {/* Reservation CTA */}
      <section className="cafe-section bg-primary text-primary-foreground">
        <SectionReveal className="cafe-container text-center">
          <h2 className="font-heading text-3xl md:text-5xl font-bold mb-4">Reserve Your Table</h2>
          <p className="text-lg opacity-80 mb-8 max-w-lg mx-auto">
            Whether it's a casual brunch or a special evening, book your perfect spot at Cafe LA.
          </p>
          <Link to="/reservation">
            <Button size="lg" className="rounded-full bg-accent text-accent-foreground hover:bg-cafe-gold gap-2 px-10 text-base">
              Book a Table <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </SectionReveal>
      </section>

      {/* Testimonials */}
      <section className="cafe-section bg-card">
        <SectionReveal className="cafe-container">
          <div className="text-center mb-12">
            <p className="text-accent font-medium mb-2 tracking-widest uppercase text-sm">Testimonials</p>
            <h2 className="cafe-heading text-foreground">What Our Guests Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="bg-background rounded-2xl p-6"
                style={{ boxShadow: "var(--shadow-card)" }}
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-cafe-gold text-cafe-gold" />
                  ))}
                </div>
                <p className="text-foreground mb-4 italic">"{t.text}"</p>
                <p className="font-heading font-semibold text-foreground">{t.name}</p>
              </motion.div>
            ))}
          </div>
        </SectionReveal>
      </section>

      {/* Location */}
      <section className="cafe-section bg-background">
        <SectionReveal className="cafe-container">
          <div className="text-center mb-12">
            <p className="text-accent font-medium mb-2 tracking-widest uppercase text-sm">Visit Us</p>
            <h2 className="cafe-heading text-foreground">Find Cafe LA</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: MapPin, title: "Address", lines: ["123 Coffee Lane", "Los Angeles, CA 90001"] },
              { icon: Clock, title: "Hours", lines: ["Mon–Fri: 7AM – 10PM", "Sat–Sun: 8AM – 11PM"] },
              { icon: Phone, title: "Contact", lines: ["(213) 555-0142", "hello@cafela.com"] },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="h-5 w-5 text-accent" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                {item.lines.map((line, j) => (
                  <p key={j} className="text-muted-foreground text-sm">{line}</p>
                ))}
              </div>
            ))}
          </div>
        </SectionReveal>
      </section>
    </div>
  );
}
