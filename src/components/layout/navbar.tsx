"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";

const navLinks = [
  { href: "/villa", label: "The Villa" },
  { href: "/experience", label: "Experience" },
  { href: "/retreats", label: "Retreats" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const showTransparent = isHome && !scrolled;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        showTransparent
          ? "bg-transparent"
          : "bg-[#FAF8F5]/95 backdrop-blur-xl shadow-sm border-b border-[#C8A96E]/10"
      }`}
    >
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="group flex flex-col items-start">
          <div className="flex items-baseline gap-1">
            <span
              className={`font-[family-name:var(--font-playfair)] text-2xl font-semibold tracking-tight transition-colors duration-500 ${
                showTransparent ? "text-white" : "text-[#2D2A26]"
              }`}
            >
              Alma
            </span>
            <span
              className={`font-[family-name:var(--font-playfair)] text-2xl font-light tracking-tight transition-colors duration-500 ${
                showTransparent ? "text-white/70" : "text-[#2D2A26]/70"
              }`}
            >
              Retreat
            </span>
          </div>
          <span className="text-[9px] font-medium uppercase tracking-[0.35em] text-[#C8A96E]">
            Mallorca
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-10 md:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-sm font-medium tracking-wide transition-colors duration-300 ${
                  showTransparent
                    ? isActive
                      ? "text-white"
                      : "text-white/70 hover:text-white"
                    : isActive
                      ? "text-[#2D2A26]"
                      : "text-[#2D2A26]/60 hover:text-[#2D2A26]"
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-[1.5px] bg-gradient-to-r from-[#C8A96E] to-[#E8D5A8] transition-all duration-300 ${
                    isActive ? "w-full" : "w-0"
                  }`}
                />
              </Link>
            );
          })}

          {/* Book Now Button */}
          <Link
            href="/retreats"
            className="rounded-full bg-[#5B7B5E] px-6 py-2.5 text-sm font-medium tracking-wide text-white transition-all duration-300 hover:bg-[#4A6A4D] hover:shadow-md"
          >
            Book Now
          </Link>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <button
                aria-label="Open menu"
                className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors ${
                  showTransparent
                    ? "text-white/80 hover:bg-white/10 hover:text-white"
                    : "text-[#2D2A26]/70 hover:bg-[#C8A96E]/10 hover:text-[#2D2A26]"
                }`}
              >
                <Menu className="h-5 w-5" />
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              showCloseButton={false}
              className="w-full border-l-0 bg-[#FAF8F5] p-0 sm:max-w-sm"
            >
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <div className="flex h-full flex-col">
                {/* Mobile Header */}
                <div className="flex items-center justify-between border-b border-[#C8A96E]/10 px-6 py-5">
                  <div className="flex flex-col items-start">
                    <div className="flex items-baseline gap-1">
                      <span className="font-[family-name:var(--font-playfair)] text-xl font-semibold tracking-tight text-[#2D2A26]">
                        Alma
                      </span>
                      <span className="font-[family-name:var(--font-playfair)] text-xl font-light tracking-tight text-[#2D2A26]/70">
                        Retreat
                      </span>
                    </div>
                    <span className="text-[8px] font-medium uppercase tracking-[0.35em] text-[#C8A96E]">
                      Mallorca
                    </span>
                  </div>
                  <button
                    onClick={() => setMobileOpen(false)}
                    aria-label="Close menu"
                    className="flex h-10 w-10 items-center justify-center rounded-full text-[#2D2A26]/70 transition-colors hover:bg-[#C8A96E]/10 hover:text-[#2D2A26]"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Mobile Links */}
                <div className="flex flex-1 flex-col justify-center px-6">
                  <div className="space-y-2">
                    {navLinks.map((link) => {
                      const isActive = pathname === link.href;
                      return (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={() => setMobileOpen(false)}
                          className={`group flex items-center justify-between rounded-xl px-4 py-4 text-lg transition-all duration-300 ${
                            isActive
                              ? "bg-[#C8A96E]/10 text-[#2D2A26]"
                              : "text-[#2D2A26]/60 hover:bg-[#C8A96E]/5 hover:text-[#2D2A26]"
                          }`}
                        >
                          <span className="font-[family-name:var(--font-playfair)] font-medium tracking-wide">
                            {link.label}
                          </span>
                          {isActive && (
                            <span className="h-1.5 w-1.5 rounded-full bg-[#C8A96E]" />
                          )}
                        </Link>
                      );
                    })}
                  </div>

                  {/* Mobile Book Now */}
                  <div className="mt-10">
                    <Link
                      href="/retreats"
                      onClick={() => setMobileOpen(false)}
                      className="flex w-full items-center justify-center rounded-full bg-[#5B7B5E] px-8 py-4 text-base font-medium tracking-wide text-white transition-all duration-300 hover:bg-[#4A6A4D]"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>

                {/* Mobile Footer */}
                <div className="border-t border-[#C8A96E]/10 px-6 py-6">
                  <p className="text-center text-xs tracking-wide text-[#2D2A26]/40">
                    Camp de Mar, Andratx, Mallorca
                  </p>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
