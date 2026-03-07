import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import SectionReveal from "@/components/SectionReveal";

export default function ReservationPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    toast.success("Reservation submitted! We'll confirm shortly.");
  };

  return (
    <div className="pt-20 min-h-screen bg-background">
      <section className="cafe-section">
        <SectionReveal className="cafe-container max-w-2xl">
          <div className="text-center mb-12">
            <p className="text-accent font-medium mb-2 tracking-widest uppercase text-sm">Reserve</p>
            <h1 className="cafe-heading text-foreground">Book a Table</h1>
            <p className="text-muted-foreground mt-4">Choose your date, time, and let us prepare a perfect experience for you.</p>
          </div>

          {submitted ? (
            <div className="text-center py-16 bg-card rounded-2xl" style={{ boxShadow: "var(--shadow-card)" }}>
              <div className="text-5xl mb-4">🎉</div>
              <h2 className="font-heading text-2xl font-bold text-foreground mb-2">Reservation Confirmed!</h2>
              <p className="text-muted-foreground">We'll send you a confirmation email shortly.</p>
              <Button onClick={() => setSubmitted(false)} className="mt-6 rounded-full bg-primary text-primary-foreground">
                Make Another Reservation
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-card p-8 rounded-2xl space-y-5" style={{ boxShadow: "var(--shadow-card)" }}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Name</label>
                  <Input required placeholder="Your name" className="rounded-xl bg-background" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Phone</label>
                  <Input required type="tel" placeholder="Your phone" className="rounded-xl bg-background" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Email</label>
                <Input required type="email" placeholder="your@email.com" className="rounded-xl bg-background" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Date</label>
                  <Input required type="date" className="rounded-xl bg-background" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Time</label>
                  <Input required type="time" className="rounded-xl bg-background" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Guests</label>
                  <Input required type="number" min={1} max={20} placeholder="2" className="rounded-xl bg-background" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Special Requests</label>
                <Textarea placeholder="Any dietary requirements or special requests..." className="rounded-xl bg-background" />
              </div>
              <Button type="submit" className="w-full rounded-full bg-primary text-primary-foreground hover:bg-accent text-base py-6">
                Reserve Now
              </Button>
            </form>
          )}
        </SectionReveal>
      </section>
    </div>
  );
}
