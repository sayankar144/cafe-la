import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart-context";
import { motion, AnimatePresence } from "framer-motion";

export default function OrderPage() {
  const { items, updateQuantity, removeItem, total, clearCart } = useCart();

  return (
    <div className="pt-20 min-h-screen bg-background">
      <section className="cafe-section">
        <div className="cafe-container max-w-3xl">
          <div className="text-center mb-12">
            <p className="text-accent font-medium mb-2 tracking-widest uppercase text-sm">Your Order</p>
            <h1 className="cafe-heading text-foreground">Cart</h1>
          </div>

          {items.length === 0 ? (
            <div className="text-center py-16">
              <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground/30 mb-4" />
              <p className="text-muted-foreground text-lg mb-6">Your cart is empty</p>
              <Link to="/menu">
                <Button className="rounded-full bg-primary text-primary-foreground gap-2">
                  Browse Menu <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          ) : (
            <div>
              <AnimatePresence>
                {items.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, x: -100 }}
                    className="flex items-center gap-4 py-4 border-b border-border"
                  >
                    <img src={item.image} alt={item.name} className="w-20 h-20 rounded-xl object-cover" />
                    <div className="flex-1">
                      <h3 className="font-heading font-semibold text-foreground">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">${item.price.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80">
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-8 text-center font-medium text-foreground">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80">
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                    <span className="font-heading font-bold text-foreground w-20 text-right">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                    <button onClick={() => removeItem(item.id)} className="text-muted-foreground hover:text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>

              <div className="mt-8 p-6 bg-card rounded-2xl" style={{ boxShadow: "var(--shadow-card)" }}>
                <div className="flex justify-between mb-2 text-muted-foreground">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2 text-muted-foreground">
                  <span>Tax (10%)</span>
                  <span>${(total * 0.1).toFixed(2)}</span>
                </div>
                <div className="border-t border-border pt-3 flex justify-between text-lg font-heading font-bold text-foreground">
                  <span>Total</span>
                  <span>${(total * 1.1).toFixed(2)}</span>
                </div>
                <Button className="w-full mt-6 rounded-full bg-primary text-primary-foreground hover:bg-accent text-base py-6">
                  Proceed to Checkout
                </Button>
                <button onClick={clearCart} className="w-full mt-3 text-sm text-muted-foreground hover:text-destructive transition-colors">
                  Clear Cart
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
