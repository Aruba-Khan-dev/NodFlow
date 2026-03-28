import { Phone, MapPin } from "lucide-react";
import logo from "@/assets/nodflow_logo_clean.png";

const Footer = () => {
  return (
    <footer className="bg-brand text-brand-foreground">
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* About */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <img src={logo} alt="NodFlow" className="h-12 w-auto object-contain" />
            <span className="font-display text-lg font-bold">NodFlow</span>
          </div>
          <p className="text-sm text-brand-foreground/70 leading-relaxed">
            A centralized workflow portal for managing client deliverables, feedback, and approvals for modern creative teams.
          </p>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-display font-semibold text-sm mb-3 uppercase tracking-wider">
            Contact
          </h4>
          <ul className="space-y-2 text-sm text-brand-foreground/70">
            <li className="flex items-center gap-2">
              <span>Hamza Ghaffar</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-primary shrink-0" />
              <span>+92 332 1866306</span>
            </li>
          </ul>
        </div>

        {/* Location */}
        <div>
          <h4 className="font-display font-semibold text-sm mb-3 uppercase tracking-wider">
            Location
          </h4>
          <div className="flex items-start gap-2 text-sm text-brand-foreground/70">
            <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
            <span>
              LDA Avenue<br />
              Near COMSATS UNIVERSITY LAHORE
            </span>
          </div>
        </div>
      </div>

      <div className="border-t border-brand-foreground/10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-brand-foreground/50">
          <span>© 2026 NodFlow. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;