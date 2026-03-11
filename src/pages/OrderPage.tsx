import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Loader2, QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart-context";
import { useTable } from "@/lib/table-context";
import api from "@/lib/api";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

export default function OrderPage() {
  const { items, updateQuantity, removeItem, total, clearCart } = useCart();
  const { tableNumber, setTableNumber } = useTable();
  const navigate = useNavigate();
  const { id } = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [manualTableNumber, setManualTableNumber] = useState<string>("");

  useEffect(() => {
    // If we land on /order/table/:id, we update the context.
    // If not, we do nothing and rely on whatever tableNumber is already stored in context
    // LocalStorage (managed by TableProvider) handles persistence across reloads/navigation
    if (id) {
      const parsedId = parseInt(id, 10);
      if (!isNaN(parsedId)) {
        setTableNumber(parsedId);
      }
    }
  }, [id, setTableNumber]);

  const subtotal = total;
  const tax = total * 0.1;
  const grandTotal = subtotal + tax;

  const handlePlaceOrder = async () => {
    let finalTableNumber = tableNumber;

    if (!finalTableNumber) {
      if (!manualTableNumber) {
        toast.error("Please enter your table number to place an order.");
        return;
      }

      const parsedNum = parseInt(manualTableNumber, 10);
      if (isNaN(parsedNum) || parsedNum <= 0) {
        toast.error("Please enter a valid table number.");
        return;
      }
      finalTableNumber = parsedNum;
      // Save it back to context so they don't have to enter it again 
      setTableNumber(finalTableNumber);
    }

    if (items.length === 0) return;

    setIsSubmitting(true);
    try {
      // 1. Create the Order
      const { data: orderData } = await api.post('/orders', {
        tableNumber: finalTableNumber,
        subtotal: subtotal,
        tax: tax,
        total: grandTotal,
        items: items.map(item => ({
          itemName: item.name,
          price: item.price,
          quantity: item.quantity
        }))
      });

      const newOrderId = orderData.id;

      // Save to local storage for recovery
      localStorage.setItem('cafe_active_order_id', newOrderId);
      window.dispatchEvent(new Event('cafe_order_updated'));

      // Success!
      toast.success("Order placed successfully!");
      clearCart();
      navigate(`/order/${newOrderId}`);

    } catch (error: any) {
      console.error("Error placing order:", error);
      toast.error(error.message || "Failed to place order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // We are fixing the early return structure from the original file
  // Using a cleaner conditional rendering block for empty vs populated cart
  return (
    <div className="pt-20 min-h-screen bg-background">
      <section className="cafe-section">
        <div className="cafe-container max-w-3xl">
          <div className="text-center mb-12">
            <p className="text-accent font-medium mb-2 tracking-widest uppercase text-sm">Your Order</p>
            <h1 className="cafe-heading text-foreground">Cart</h1>
            {tableNumber && (
              <div className="flex items-center justify-center gap-2 mt-2">
                <p className="text-muted-foreground font-medium">Ordering for Table {tableNumber}</p>
                <button
                  onClick={() => setTableNumber(null)}
                  className="text-xs text-primary hover:text-primary/80 underline underline-offset-2 transition-colors"
                >
                  Change
                </button>
              </div>
            )}
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
                      <p className="text-sm text-muted-foreground">₹{item.price}</p>
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
                      ₹{(item.price * item.quantity).toFixed(2)}
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
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2 text-muted-foreground">
                  <span>Tax (10%)</span>
                  <span>₹{tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-border pt-3 flex justify-between text-lg font-heading font-bold text-foreground">
                  <span>Total</span>
                  <span>₹{grandTotal.toFixed(2)}</span>
                </div>

                {!tableNumber ? (
                  <div className="mt-8 pt-6 border-t border-border">
                    <div className="flex flex-col mb-4">
                      <label htmlFor="table-number" className="text-sm font-medium mb-2 text-foreground flex items-center gap-2">
                        <QrCode className="h-4 w-4" />
                        Enter Table Number
                      </label>
                      <input
                        id="table-number"
                        type="number"
                        min="1"
                        placeholder="e.g. 5"
                        value={manualTableNumber}
                        onChange={(e) => setManualTableNumber(e.target.value)}
                        className="flex h-12 w-full rounded-xl border border-input bg-background px-4 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                      <p className="text-xs text-muted-foreground mt-2">
                        You can find the table number printed on the QR code sign on your table.
                      </p>
                    </div>

                    <Button
                      onClick={handlePlaceOrder}
                      disabled={isSubmitting || !manualTableNumber}
                      className="w-full rounded-full bg-primary text-primary-foreground hover:bg-accent text-base py-6 flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-5 w-5 animate-spin" />
                          Placing Order...
                        </>
                      ) : (
                        'Place Order'
                      )}
                    </Button>
                  </div>
                ) : (
                  <Button
                    onClick={handlePlaceOrder}
                    disabled={isSubmitting}
                    className="w-full mt-6 rounded-full bg-primary text-primary-foreground hover:bg-accent text-base py-6 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Placing Order...
                      </>
                    ) : (
                      'Place Order'
                    )}
                  </Button>
                )}

                <button onClick={clearCart} className="w-full mt-4 text-sm text-muted-foreground hover:text-destructive transition-colors">
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
