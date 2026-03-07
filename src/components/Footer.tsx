import { Link } from "react-router-dom";
import { Coffee, Instagram, Facebook, Twitter, MapPin, Phone, Clock } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="cafe-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Coffee className="h-6 w-6" />
              <span className="font-heading text-2xl font-bold">Cafe LA</span>
            </div>
            <p className="text-sm opacity-80 leading-relaxed">
              Where coffee meets comfort. Handcrafted beverages, artisan food, and a space to connect.
            </p>
            <div className="flex gap-3 mt-6">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-heading text-lg font-semibold mb-4">Quick Links</h4>
            <div className="flex flex-col gap-2">
              {[{ l: "Menu", p: "/menu" }, { l: "Reserve a Table", p: "/reservation" }, { l: "Gallery", p: "/gallery" }, { l: "About Us", p: "/about" }, { l: "Contact", p: "/contact" }].map((link) => (
                <Link key={link.p} to={link.p} className="text-sm opacity-80 hover:opacity-100 transition-opacity">{link.l}</Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-heading text-lg font-semibold mb-4">Hours</h4>
            <div className="flex flex-col gap-2 text-sm opacity-80">
              <div className="flex items-center gap-2"><Clock className="h-4 w-4" /> Mon–Fri: 7AM – 10PM</div>
              <div className="flex items-center gap-2"><Clock className="h-4 w-4" /> Sat–Sun: 8AM – 11PM</div>
            </div>
          </div>

          <div>
            <h4 className="font-heading text-lg font-semibold mb-4">Find Us</h4>
            <div className="flex flex-col gap-2 text-sm opacity-80">
              <div className="flex items-center gap-2"><MapPin className="h-4 w-4 flex-shrink-0" /> 123 Coffee Lane, Los Angeles, CA 90001</div>
              <div className="flex items-center gap-2"><Phone className="h-4 w-4" /> (213) 555-0142</div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/15 mt-12 pt-8 text-center text-sm opacity-60">
          © {new Date().getFullYear()} Cafe LA. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
