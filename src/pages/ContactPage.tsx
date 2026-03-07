import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import SectionReveal from "@/components/SectionReveal";

export default function ContactPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! We'll get back to you soon.");
  };

  return (
    <div className="pt-20 min-h-screen bg-background">
      <section className="cafe-section">
        <SectionReveal className="cafe-container">
          <div className="text-center mb-12">
            <p className="text-accent font-medium mb-2 tracking-widest uppercase text-sm">Get in Touch</p>
            <h1 className="cafe-heading text-foreground">Contact Us</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <div className="space-y-6 mb-10">
                {[
                  { icon: MapPin, label: "Address", value: "123 Coffee Lane, Los Angeles, CA 90001" },
                  { icon: Phone, label: "Phone", value: "(213) 555-0142" },
                  { icon: Mail, label: "Email", value: "hello@cafela.com" },
                  { icon: Clock, label: "Hours", value: "Mon–Fri: 7AM–10PM | Sat–Sun: 8AM–11PM" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <item.icon className="h-4 w-4 text-accent" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{item.label}</p>
                      <p className="text-sm text-muted-foreground">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-3">
                {[Instagram, Facebook, Twitter].map((Icon, i) => (
                  <a key={i} href="#" className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-accent transition-colors">
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>

              <div className="mt-8 rounded-2xl overflow-hidden h-[250px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3305.7!2d-118.25!3d34.05!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzTCsDAzJzAwLjAiTiAxMTjCsDE1JzAwLjAiVw!5e0!3m2!1sen!2sus!4v1"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Cafe LA location"
                />
              </div>
            </div>

            <form onSubmit={handleSubmit} className="bg-card p-8 rounded-2xl space-y-5 h-fit" style={{ boxShadow: "var(--shadow-card)" }}>
              <h3 className="font-heading text-xl font-semibold text-foreground">Send Us a Message</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Name</label>
                  <Input required placeholder="Your name" className="rounded-xl bg-background" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Email</label>
                  <Input required type="email" placeholder="your@email.com" className="rounded-xl bg-background" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Subject</label>
                <Input required placeholder="How can we help?" className="rounded-xl bg-background" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Message</label>
                <Textarea required rows={5} placeholder="Your message..." className="rounded-xl bg-background" />
              </div>
              <Button type="submit" className="w-full rounded-full bg-primary text-primary-foreground hover:bg-accent text-base py-6">
                Send Message
              </Button>
            </form>
          </div>
        </SectionReveal>
      </section>
    </div>
  );
}
