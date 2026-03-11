import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight, Star, MapPin, Clock, Phone, ChevronDown, Coffee, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionReveal from "@/components/SectionReveal";
import { MenuItem } from "@/lib/menu-data";
import api from "@/lib/api";
import { useCart } from "@/lib/cart-context";

import heroTray from "@/assets/hero-tray.png";
import gallery1 from "@/assets/gallery/gallery-1.jpg";
import gallery2 from "@/assets/gallery/gallery-2.jpg";
import gallery3 from "@/assets/gallery/gallery-3.jpg";
import gallery4 from "@/assets/gallery/gallery-4.jpg";

const testimonials = [
  { name: "Sarah M.", rating: 5, text: "The best café in LA! Their latte art is mesmerizing and the truffle burger is to die for." },
  { name: "James K.", rating: 5, text: "Perfect spot for working remotely. Great WiFi, even better coffee. The ambiance is unmatched." },
  { name: "Priya R.", rating: 5, text: "We had our first date here and now it's our spot. The tiramisu is absolutely heavenly!" },
  { name: "David L.", rating: 5, text: "The espresso here is a game changer. Friendly staff and fantastic freshly baked pastries." },
  { name: "Emma W.", rating: 5, text: "A hidden gem in the city. The cold brew is refreshing and the overall vibe is extremely chill." },
  { name: "Michael T.", rating: 5, text: "Best pizza slice I've ever had at a cafe. The crust is perfect. Highly recommend!" },
];



export default function Index() {
  const { addItem } = useCart();
  const [featuredItems, setFeaturedItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await api.get('/menu');
        if (res.data && res.data.length > 0) {
            // Get up to 4 items for featured
            const formatted = res.data.slice(0, 4).map((item: any) => ({
                id: item.id,
                name: item.name,
                description: item.description || undefined,
                price: parseFloat(item.price),
                image: item.imageUrl,
                category: item.category,
                tags: []
            }));
            setFeaturedItems(formatted);
        }
      } catch (err) {
        console.error("Failed to load featured items", err);
      }
    };
    fetchFeatured();
  }, []);

  // Scroll Parallax (for other sections if needed, but keeping for compatibility)
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 1000], ["0%", "20%"]);
  const textY = useTransform(scrollY, [0, 1000], ["0%", "10%"]);

  // Mouse Parallax Setup
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const x = (clientX / window.innerWidth - 0.5) * 2; // -1 to 1
    const y = (clientY / window.innerHeight - 0.5) * 2; // -1 to 1
    mouseX.set(x);
    mouseY.set(y);
  };

  const smoothMouseX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const cupX = useTransform(smoothMouseX, [-1, 1], [-15, 15]);
  const cupY = useTransform(smoothMouseY, [-1, 1], [-15, 15]);

  const beansX = useTransform(smoothMouseX, [-1, 1], [-30, 30]);
  const beansY = useTransform(smoothMouseY, [-1, 1], [-30, 30]);

  const bgX = useTransform(smoothMouseX, [-1, 1], [-5, 5]);
  const bgY = useTransform(smoothMouseY, [-1, 1], [-5, 5]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0, transition: { duration: 1.2, ease: "easeOut" as const, delay: 0.4 } },
  };

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Hero */}
      {/* Hero */}
      <section
        className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-[#F5EFE6]"
        onMouseMove={handleMouseMove}
      >
        {/* Abstract Background Shapes */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          {/* Top Right Curved Shape (Green/Olive) */}
          <div className="absolute -top-[10%] border border-transparent right-[15%] w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-[#B0C0A9] rounded-[40%_60%_70%_30%/40%_50%_60%_50%] opacity-80 mix-blend-multiply" />

          {/* Top Right Edge Shape (Copper/Orange) */}
          <div className="absolute -top-[5%] -right-[10%] w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] bg-[#C89274] opacity-70 mix-blend-multiply rounded-[50%_50%_20%_80%/50%_20%_80%_50%]" />

          {/* Bottom Left Shape (Soft Peach/Copper) */}
          <div className="absolute -bottom-[20%] left-0 w-[70vw] h-[40vw] max-w-[1000px] max-h-[500px] bg-[#D19D83] opacity-60 mix-blend-multiply rounded-[100%_100%_0_0]" />

          {/* Right Side Grey Stone Background Panel */}
          <div className="absolute top-0 right-0 w-[45%] h-full bg-[#D1D3D4] mix-blend-multiply clip-path-slant z-[-1]" style={{ clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 0% 100%)' }}>
            {/* Optional subtle noise/texture could be applied here */}
          </div>

          {/* Decorative Plant Line Art (Minimal SVG placement) */}
          <div className="absolute bottom-[10%] left-[45%] opacity-20 pointer-events-none w-64 h-64">
            <svg viewBox="0 0 100 100" fill="none" stroke="#4a3424" strokeWidth="0.5">
              <path d="M50 100 Q40 50 10 20 M50 100 Q60 50 90 20" />
              <ellipse cx="25" cy="40" rx="15" ry="5" transform="rotate(-45 25 40)" />
              <ellipse cx="75" cy="40" rx="15" ry="5" transform="rotate(45 75 40)" />
              <circle cx="50" cy="15" r="3" />
              <circle cx="55" cy="10" r="3" />
            </svg>
          </div>
        </div>

        {/* Inner Content Container */}
        <div className="max-w-[1400px] w-full mx-auto px-4 sm:px-8 md:px-12 py-20 flex flex-col md:grid md:grid-cols-2 lg:grid-cols-[1fr_1.1fr] items-center gap-8 lg:gap-16 relative z-10 pt-28 md:pt-32 h-full">

          {/* Left Side (Content) */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-start text-left space-y-2 md:space-y-4 pt-16 md:pt-0 max-w-xl"
          >
            <motion.p
              variants={itemVariants}
              className="font-script text-5xl sm:text-6xl lg:text-[5.5rem] text-[#4a3424] opacity-90 drop-shadow-sm mb-[-10px] pl-1"
            >
              Freshly Brewed
            </motion.p>
            <motion.h1
              variants={itemVariants}
              className="font-heading text-7xl sm:text-8xl lg:text-[8.5rem] font-bold text-[#422818] leading-[0.9] tracking-tight mb-4"
            >
              Coffee
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="font-body text-lg md:text-xl text-[#3d2e24]/80 max-w-[28rem] leading-relaxed mb-8 font-medium mt-4"
            >
              Experience the perfect blend of premium beans and artisanal craftsmanship in every cup. Start your day right.
            </motion.p>
            <motion.div variants={itemVariants} className="mt-8">
              <Link to="/menu" className="inline-block group">
                <Button size="lg" className="rounded-full bg-gradient-to-r from-[#B4905F] via-[#D8B986] to-[#B4905F] text-[#3d2e24] px-8 md:px-10 py-6 md:py-7 text-base md:text-lg font-semibold shadow-[0_8px_20px_rgba(180,144,95,0.3)] hover:shadow-[0_12px_25px_rgba(180,144,95,0.4)] hover:scale-105 transition-all duration-300 border border-[#FFF]/10 bg-[length:200%_auto] hover:bg-right">
                  View Menu <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Side (Visual) */}
          <motion.div
            variants={imageVariants}
            initial="hidden"
            animate="visible"
            className="relative w-full h-[450px] sm:h-[500px] md:h-full md:min-h-[550px] flex justify-center lg:justify-end items-center mt-12 md:mt-0 p-4 md:p-8"
          >
            {/* The soft rounded backing shape for the tray */}
            <div className="absolute right-[5%] lg:right-[2%] top-1/2 -translate-y-1/2 w-[85%] lg:w-[90%] aspect-square max-w-[450px] lg:max-w-[550px] bg-[#E5D7CA] rounded-[40px] shadow-lg z-0" />

            <motion.div
              style={{ x: cupX, y: cupY }}
              className="relative z-20 w-full flex justify-center lg:justify-end lg:pr-6"
            >
              <motion.img
                animate={{ y: [-5, 5, -5] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                src={heroTray}
                alt="Coffee tray"
                className="w-full max-w-[380px] sm:max-w-[460px] md:max-w-[520px] lg:max-w-[600px] h-auto object-contain drop-shadow-[0_35px_35px_rgba(66,40,24,0.30)]"
              />

              {/* Steam Animation */}
              <div className="absolute top-[10%] right-[30%] w-32 h-32 pointer-events-none opacity-50">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-16 bg-white/50 rounded-full blur-[10px]"
                    style={{ marginLeft: `${(i - 1) * 20}px` }}
                    animate={{
                      y: [0, -70, -110],
                      opacity: [0, 0.5, 0],
                      scaleX: [1, 2, 3],
                      scaleY: [1, 1.5, 2],
                      rotate: [0, i % 2 === 0 ? 15 : -15, i % 2 === 0 ? -15 : 15]
                    }}
                    transition={{
                      duration: 4.5,
                      repeat: Infinity,
                      ease: "easeOut",
                      delay: i * 1.5
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Featured Menu - Handmade Just For You */}
      <section className="relative w-full py-24 md:py-32 bg-[#F5EFE6] overflow-hidden">
        {/* Abstract Background Shapes */}
        <div className="absolute inset-0 pointer-events-none z-0">
          {/* Sage green blob (top right) */}
          <div className="absolute top-[5%] right-[-5%] w-[35vw] h-[35vw] max-w-[500px] max-h-[500px] bg-[#B0C0A9] rounded-[40%_60%_70%_30%/40%_50%_60%_50%] opacity-50 mix-blend-multiply blur-[60px]" />

          {/* Peach/Warm clay blob (bottom left) */}
          <div className="absolute bottom-[-10%] left-[-10%] w-[45vw] h-[45vw] max-w-[600px] max-h-[600px] bg-[#D19D83] opacity-40 mix-blend-multiply rounded-[50%_50%_20%_80%/50%_20%_80%_50%] blur-[60px]" />

          {/* Subtle decorative lines */}
          <div className="absolute top-[15%] left-[10%] opacity-20 pointer-events-none w-32 h-32 hidden md:block">
            <svg viewBox="0 0 100 100" fill="none" stroke="#4a3424" strokeWidth="0.5">
              <path d="M10 90 Q40 50 90 10 M10 90 Q60 50 90 10" />
              <circle cx="50" cy="50" r="2" />
              <circle cx="20" cy="70" r="1.5" />
            </svg>
          </div>
        </div>

        <SectionReveal className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 flex flex-col items-center">
            <p className="text-[#C89274] font-semibold mb-3 tracking-[0.2em] uppercase text-sm font-body">Our Menu</p>
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-[#4a3424]">
              Handmade Just For You
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-6 xl:gap-8">
            {featuredItems.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.4 }}
                className="bg-[#FFFCF8] rounded-[24px] overflow-hidden shadow-[0_15px_35px_rgba(74,52,36,0.08)] flex flex-col group relative"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-[#F5EFE6] rounded-t-[24px]">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  {item.tags && item.tags.length > 0 && (
                    <div className="absolute top-4 left-4 flex gap-2">
                      {item.tags.map((tag) => (
                        <span key={tag} className="px-3 py-1 text-[10px] sm:text-xs font-bold rounded-full bg-white/95 text-[#4a3424] capitalize backdrop-blur-sm shadow-sm">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex justify-between items-start gap-2 mb-2">
                    <h3 className="font-heading text-xl font-bold text-[#4a3424] leading-tight flex-1">{item.name}</h3>
                    <span className="font-heading text-xl font-bold text-[#B4905F] whitespace-nowrap pl-2">₹{item.price}</span>
                  </div>
                  {item.description ? (
                    <p className="text-sm text-[#4a3424]/60 mb-6 line-clamp-2 font-medium flex-1">{item.description}</p>
                  ) : (
                    <div className="mb-6 flex-1" />
                  )}

                  <Button
                    onClick={() => addItem(item)}
                    className="w-full rounded-full bg-[#8C6D53] hover:bg-[#4a3424] text-white transition-colors duration-300 gap-2 py-6 text-base shadow-md shadow-[#8C6D53]/20"
                  >
                    <Plus className="h-5 w-5" /> Add to Cart
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link to="/menu" className="inline-block group">
              <Button size="lg" className="rounded-full bg-transparent border-2 border-[#8C6D53] text-[#8C6D53] hover:bg-[#8C6D53] hover:text-white transition-all duration-300 gap-2 px-10 py-6 text-base font-semibold">
                View Full Menu <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </SectionReveal>
      </section>

      {/* About / Experience */}
      <section className="relative w-full py-24 md:py-32 bg-[#F5EFE6] overflow-hidden">
        {/* Soft Abstract Background Shapes */}
        <div className="absolute inset-0 pointer-events-none z-0">
          {/* Large Sage Green Blob (Bottom Right) */}
          <div className="absolute bottom-[0%] right-[-10%] w-[50vw] h-[50vw] max-w-[700px] max-h-[700px] bg-[#B0C0A9] opacity-40 mix-blend-multiply rounded-[60%_40%_30%_70%/60%_30%_70%_40%] blur-[80px]" />

          {/* Soft Peach/Clay Blob (Top Left) */}
          <div className="absolute top-[10%] left-[-5%] w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] bg-[#D19D83] opacity-35 mix-blend-multiply rounded-[30%_70%_70%_30%/30%_30%_70%_70%] blur-[70px]" />

          {/* Subtle decorative curved lines */}
          <div className="absolute bottom-[20%] left-[5%] opacity-15 pointer-events-none w-48 h-48 hidden lg:block">
            <svg viewBox="0 0 100 100" fill="none" stroke="#4a3424" strokeWidth="0.5">
              <path d="M0 50 Q25 0 50 50 T100 50" />
              <path d="M0 70 Q25 20 50 70 T100 70" />
            </svg>
          </div>
        </div>

        <SectionReveal className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-8 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex flex-col items-start"
            >
              <p className="text-[#C89274] font-semibold mb-3 tracking-[0.2em] uppercase text-sm font-body">Our Story</p>
              <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-[#4a3424] leading-tight mb-8">
                Made In India
              </h2>
              <div className="space-y-6 text-[#4a3424]/80 font-body text-base md:text-lg leading-relaxed font-medium max-w-xl">
                <p>
                  Welcome to Cafe LA, where the charm of Kalyani meets the aroma of freshly brewed coffee. Our café is a cozy haven where friends gather, ideas spark, and every sip tells a story.
                </p>
                <p>
                  Come and experience the soul of India in every cup and bite — we can't wait to welcome you!
                </p>
              </div>
              <div className="mt-10">
                <Link to="/about" className="inline-block group">
                  <Button size="lg" className="rounded-full bg-[#8C6D53] hover:bg-[#4a3424] text-white transition-colors duration-300 gap-2 px-10 py-7 text-base shadow-[0_8px_20px_rgba(140,109,83,0.3)] hover:shadow-[0_12px_25px_rgba(74,52,36,0.4)]">
                    Learn More <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Right Image */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="relative w-full aspect-[4/3] lg:aspect-square max-h-[600px] flex justify-center lg:justify-end items-center"
            >
              {/* Image Container with floating effect */}
              <motion.div
                whileHover={{ y: -10 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="relative w-full h-full lg:w-[90%] rounded-[32px] overflow-hidden shadow-[0_25px_50px_rgba(74,52,36,0.15)] bg-white p-2 md:p-3"
              >
                <img
                  src={gallery1}
                  alt="Cafe LA cozy interior"
                  className="w-full h-full object-cover rounded-[24px]"
                  loading="lazy"
                />

                {/* Decorative border/glass overlay styling */}
                <div className="absolute inset-0 rounded-[32px] border-[1px] border-[#4a3424]/5 pointer-events-none" />
              </motion.div>
            </motion.div>
          </div>
        </SectionReveal>
      </section>

      {/* Gallery Preview */}
      <section className="relative w-full py-24 md:py-32 bg-[#F5EFE6]">
        <SectionReveal className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16 flex flex-col items-center">
            <p className="text-[#C89274] font-semibold mb-3 tracking-[0.2em] uppercase text-sm font-body">Gallery</p>
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-[#4a3424]">
              The Cafe LA Experience
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[gallery1, gallery2, gallery3, gallery4].map((img, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ duration: 0.3 }}
                className="rounded-[24px] overflow-hidden aspect-[4/5] shadow-[0_4px_20px_rgba(74,52,36,0.08)] bg-white"
              >
                <img src={img} alt={`Gallery flex items ${i + 1}`} className="w-full h-full object-cover" loading="lazy" />
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-12 md:mt-16">
            <Link to="/gallery" className="inline-block group">
              <Button size="lg" className="rounded-full bg-transparent border-[1.5px] border-[#8C6D53] text-[#8C6D53] hover:bg-[#8C6D53] hover:text-white transition-all duration-300 gap-2 px-8 py-6 text-sm md:text-base font-semibold">
                View Gallery <ArrowRight className="h-4 w-4 md:h-5 md:w-5 transition-transform group-hover:translate-x-1" />
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
      <section className="cafe-section bg-card overflow-hidden">
        <SectionReveal className="cafe-container mb-8">
          <div className="text-center">
            <p className="text-accent font-medium mb-2 tracking-widest uppercase text-sm">Testimonials</p>
            <h2 className="cafe-heading text-foreground">What Our Guests Say</h2>
          </div>
        </SectionReveal>

        <div className="relative flex overflow-hidden group w-full pb-16 pt-4 gap-6">
          {/* We use two sets of testimonials for a seamless continuous loop */}
          {[...Array(2)].map((_, i) => (
            <div
              key={i}
              className="flex shrink-0 gap-6 animate-marquee group-hover:[animation-play-state:paused]"
            >
              {testimonials.map((t, idx) => (
                <div
                  key={idx}
                  className="w-[320px] md:w-[400px] bg-background rounded-2xl p-6 hover:-translate-y-2 hover:shadow-xl transition-all duration-300 border border-transparent hover:border-accent/10 cursor-default"
                  style={{ boxShadow: "var(--shadow-card)" }}
                >
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} className="h-4 w-4 fill-cafe-gold text-cafe-gold" />
                    ))}
                  </div>
                  <p className="text-foreground mb-4 italic text-lg leading-relaxed">"{t.text}"</p>
                  <p className="font-heading font-semibold text-foreground">{t.name}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
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
              { icon: MapPin, title: "Address", lines: ["Cafe LA, B-9/83", "Kalyani, WB 741235"] },
              { icon: Clock, title: "Hours", lines: ["All Days", "10:00 AM – 10:30 PM"] },
              { icon: Phone, title: "Contact", lines: ["06291162431", "hello@cafela.com"] },
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
