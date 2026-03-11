import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Menu, X, Coffee, Clock } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Menu", path: "/menu" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { itemCount } = useCart();
  const location = useLocation();
  const [activeOrderId, setActiveOrderId] = useState<string | null>(null);

  useEffect(() => {
    // Check initially
    const checkActiveOrder = () => {
      const orderId = localStorage.getItem('cafe_active_order_id');
      setActiveOrderId(orderId);
    };

    checkActiveOrder();

    // Listen for storage events (in case it changes in another tab)
    window.addEventListener('storage', checkActiveOrder);

    // Custom event listener for same-tab updates
    window.addEventListener('cafe_order_updated', checkActiveOrder);

    return () => {
      window.removeEventListener('storage', checkActiveOrder);
      window.removeEventListener('cafe_order_updated', checkActiveOrder);
    };
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent py-4 text-[#4a3424]">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 flex items-center justify-between h-16">

        {/* Logo - Left */}
        <Link to="/" className="flex items-center gap-2 z-10 w-40">
          <Coffee className="h-5 w-5 stroke-[1.5]" />
          <span className="font-heading text-xl md:text-2xl font-semibold">
            Cafe LA
          </span>
        </Link>

        {/* Links - Center (Desktop) */}
        <div className="hidden md:flex items-center gap-8 justify-center flex-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm tracking-wide transition-all relative py-1 ${location.pathname === link.path
                ? "text-[#6B3E26] font-medium after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-[#6B3E26]"
                : "text-[#4a3424]/80 hover:text-[#6B3E26]"
                }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Icons/Buttons - Right */}
        <div className="flex items-center gap-4 z-10 w-40 justify-end">
          <Link to="/order" className="relative group">
            <div className="w-10 h-10 rounded-full bg-[#D4B996] flex items-center justify-center transition-transform group-hover:scale-105">
              <ShoppingBag className="h-4 w-4 text-[#4a3424] stroke-[1.5]" />
            </div>
            {itemCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 bg-[#6B3E26] text-white text-[10px] w-[18px] h-[18px] rounded-full flex items-center justify-center font-medium"
              >
                {itemCount}
              </motion.span>
            )}
          </Link>

          {activeOrderId && (
            <Link to={`/order/${activeOrderId}`} className="hidden md:flex items-center gap-2 px-4 py-2 bg-coffee-primary/10 text-coffee-primary rounded-full hover:bg-coffee-primary/20 transition-colors">
              <Clock className="w-4 h-4 animate-pulse" />
              <span className="text-sm font-medium">Track Order</span>
            </Link>
          )}

          <Link to="/contact" className="hidden md:block">
            <Button className="rounded-full bg-[#6B3E26] text-white hover:bg-[#5A331F] transition-colors h-10 px-6 font-normal">
              Visit Us
            </Button>
          </Link>

          <button className="md:hidden" onClick={() => setOpen(!open)}>
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden bg-[#F5E9DD] border-t border-coffee-primary/10"
          >
            <div className="cafe-container px-4 py-8 flex flex-col items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setOpen(false)}
                  className={`text-lg font-medium transition-colors ${location.pathname === link.path
                    ? "text-coffee-primary font-bold"
                    : "text-coffee-primary/80 hover:text-coffee-primary"
                    }`}
                >
                  {link.label}
                </Link>
              ))}

              {activeOrderId && (
                <Link
                  to={`/order/${activeOrderId}`}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 text-lg font-bold text-coffee-primary transition-colors"
                >
                  <Clock className="w-5 h-5 animate-pulse" />
                  Track Active Order
                </Link>
              )}

              <Link to="/contact" onClick={() => setOpen(false)} className="w-full mt-4">
                <Button className="w-full rounded-full bg-[#7B4B2A] text-white hover:bg-[#6B3E26] transition-colors py-6 text-lg font-semibold">
                  Visit Us
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
