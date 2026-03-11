import { Link } from "react-router-dom";
import { Coffee, Instagram, Facebook, Twitter, MapPin, Phone, Clock, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="cafe-container px-6 md:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-10">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
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

          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h4 className="font-heading text-lg font-semibold mb-4">Quick Links</h4>
            <div className="flex flex-col gap-2">
              {[{ l: "Menu", p: "/menu" }, { l: "Reserve a Table", p: "/reservation" }, { l: "Gallery", p: "/gallery" }, { l: "About Us", p: "/about" }, { l: "Contact", p: "/contact" }].map((link) => (
                <Link key={link.p} to={link.p} className="text-sm opacity-80 hover:opacity-100 transition-opacity">{link.l}</Link>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h4 className="font-heading text-lg font-semibold mb-4">Hours</h4>
            <div className="space-y-4 text-muted-foreground w-full flex justify-center md:justify-start">
              <div className="flex items-center gap-2"><Clock className="h-4 w-4" /> All Days: 10:00 AM – 10:30 PM</div>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h4 className="font-heading text-lg font-semibold mb-4">Find Us</h4>
            <div className="space-y-4 text-muted-foreground text-sm w-full">
              <div className="flex items-center justify-center md:justify-start gap-2"><MapPin className="h-4 w-4 flex-shrink-0" /> <span className="text-left md:text-left max-w-[200px] md:max-w-none">Cafe LA, B-9/83, Block B, Kalyani, West Bengal 741235</span></div>
              <div className="flex items-center justify-center md:justify-start gap-2"><Phone className="h-4 w-4" /> 06291162431</div>
              <div className="flex items-center justify-center md:justify-start gap-2"><Mail className="h-4 w-4" /> hello@cafela.com</div>
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
