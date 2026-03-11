import SectionReveal from "@/components/SectionReveal";
import gallery1 from "@/assets/gallery/gallery-1.jpg";
import gallery2 from "@/assets/gallery/gallery-2.jpg";
import heroCafe from "@/assets/menu/hero-cafe.jpg";

export default function AboutPage() {
  return (
    <div className="pt-20 min-h-screen bg-background">
      <section className="cafe-section">
        <SectionReveal className="cafe-container">
          <div className="text-center mb-16">
            <p className="text-accent font-medium mb-2 tracking-widest uppercase text-sm">About Us</p>
            <h1 className="cafe-heading text-foreground">Our Story</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-6">Born from a Love of Coffee</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Cafe LA started with a simple dream — to create a space where the best coffee, thoughtfully prepared food, and genuine community come together. Founded in 2020, we set out to reimagine the café experience for Kalyani.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Every cup we serve is a testament to the relationships we've built with local roasters, farmers, and artisans. Our beans are ethically sourced, our pastries baked fresh daily, and our recipes crafted with love.
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden" style={{ boxShadow: "var(--shadow-elevated)" }}>
              <img src={heroCafe} alt="Cafe LA interior" className="w-full h-[400px] object-cover" loading="lazy" />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="order-2 lg:order-1 rounded-2xl overflow-hidden" style={{ boxShadow: "var(--shadow-elevated)" }}>
              <img src={gallery1} alt="Cafe LA lounge" className="w-full h-[400px] object-cover" loading="lazy" />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-6">A Space Designed for You</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Our interior blends industrial warmth with cozy comfort — exposed brick, live plants, custom-crafted wooden furniture, and ambient lighting that changes with the time of day.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Whether you're here for a power meeting, a quiet read, or a long brunch with friends, every corner of Cafe LA is designed to make you feel at home.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-6">Food Philosophy</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We believe food should be an experience. Our menu is a fusion of global flavors with local ingredients — from wood-fired pizzas to signature smash burgers, artisan sandwiches to decadent desserts.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Every dish is plated with care, photographed by nature, and designed to be shared. At Cafe LA, the food is always the main character.
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden" style={{ boxShadow: "var(--shadow-elevated)" }}>
              <img src={gallery2} alt="Barista at work" className="w-full h-[400px] object-cover" loading="lazy" />
            </div>
          </div>
        </SectionReveal>
      </section>
    </div>
  );
}
