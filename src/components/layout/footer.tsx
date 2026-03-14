import Link from "next/link";
import { Instagram, Mail, MapPin } from "lucide-react";

const footerLinks = [
  { href: "/villa", label: "The Villa" },
  { href: "/experience", label: "Experience" },
  { href: "/retreats", label: "Retreats" },
  { href: "/book", label: "Book Now" },
  { href: "/book", label: "FAQ" },
];

export default function Footer() {
  return (
    <footer className="bg-[#F5F2ED] border-t border-[#C8A96E]/10">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid gap-12 py-16 md:grid-cols-3 md:gap-8 lg:py-20">
          {/* Brand Column */}
          <div className="space-y-6">
            <div className="flex flex-col items-start">
              <div className="flex items-baseline gap-1">
                <span className="font-[family-name:var(--font-playfair)] text-2xl font-semibold tracking-tight text-[#2D2A26]">
                  Alma
                </span>
                <span className="font-[family-name:var(--font-playfair)] text-2xl font-light tracking-tight text-[#2D2A26]/70">
                  Retreat
                </span>
              </div>
              <span className="text-[9px] font-medium uppercase tracking-[0.35em] text-[#C8A96E]">
                Mallorca
              </span>
            </div>
            <p className="font-[family-name:var(--font-playfair)] text-lg italic text-[#2D2A26]/50">
              Your soul&apos;s home in Mallorca
            </p>
            <div className="gold-line" />
          </div>

          {/* Links Column */}
          <div className="space-y-6">
            <h4 className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C8A96E]">
              Explore
            </h4>
            <nav className="grid grid-cols-2 gap-x-8 gap-y-3">
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-[#2D2A26]/50 transition-colors duration-300 hover:text-[#2D2A26]"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact Column */}
          <div className="space-y-6">
            <h4 className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C8A96E]">
              Contact
            </h4>
            <div className="space-y-4">
              <a
                href="mailto:hello@almaretreat.com"
                className="flex items-center gap-3 text-sm text-[#2D2A26]/50 transition-colors duration-300 hover:text-[#2D2A26]"
              >
                <Mail className="h-4 w-4 flex-shrink-0 text-[#C8A96E]/60" />
                hello@almaretreat.com
              </a>
              <div className="flex items-start gap-3 text-sm text-[#2D2A26]/50">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0 text-[#C8A96E]/60" />
                <span>
                  Camp de Mar, Andratx
                  <br />
                  Mallorca, Spain
                </span>
              </div>
              <a
                href="https://instagram.com/almaretreatmallorca"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-[#2D2A26]/50 transition-colors duration-300 hover:text-[#2D2A26]"
              >
                <Instagram className="h-4 w-4 flex-shrink-0 text-[#C8A96E]/60" />
                @almaretreatmallorca
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="section-divider" />

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-4 py-8 sm:flex-row">
          <p className="text-xs tracking-wide text-[#2D2A26]/30">
            &copy; {new Date().getFullYear()} Alma Retreat Mallorca. All rights
            reserved.
          </p>
          <p className="text-xs tracking-wide text-[#2D2A26]/30">
            Crafted with intention in Mallorca
          </p>
        </div>
      </div>
    </footer>
  );
}
