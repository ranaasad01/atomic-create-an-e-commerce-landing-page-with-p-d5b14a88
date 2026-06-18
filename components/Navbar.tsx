"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Menu, X, Sparkles } from 'lucide-react';
import { navLinks, navCTA, APP_NAME } from "@/lib/data";

interface NavbarProps {
  cartCount?: number;
}

export default function Navbar({ cartCount = 0 }: NavbarProps) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleAnchorClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href.startsWith("#") && pathname === "/") {
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
      setMobileOpen(false);
    } else {
      setMobileOpen(false);
    }
  };

  const getLinkHref = (href: string) => {
    if (href.startsWith("#")) {
      return pathname === "/" ? href : "/" + href;
    }
    return href;
  };

  return (
    <motion.header
      initial={{ y: -64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-200">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold text-gray-900 tracking-tight">
              {APP_NAME}
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={getLinkHref(link.href)}
                onClick={(e) => handleAnchorClick(e, link.href)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-orange-50 hover:text-orange-600 ${
                  pathname === link.href && !link.href.startsWith("#")
                    ? "text-orange-600 bg-orange-50"
                    : "text-gray-600"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Cart */}
            <Link
              href="#products"
              onClick={(e) => handleAnchorClick(e, "#products")}
              className="relative p-2 rounded-lg text-gray-600 hover:text-orange-600 hover:bg-orange-50 transition-all duration-200"
              aria-label="Shopping cart"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-orange-500 text-white text-xs font-bold rounded-full flex items-center justify-center"
                >
                  {cartCount > 99 ? "99+" : cartCount}
                </motion.span>
              )}
            </Link>

            {/* CTA */}
            <Link
              href={getLinkHref(navCTA.href)}
              onClick={(e) => handleAnchorClick(e, navCTA.href)}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-lg shadow-sm hover:shadow-md transition-all duration-200 active:scale-95"
            >
              {navCTA.label}
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors duration-200"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="md:hidden overflow-hidden bg-white border-t border-gray-100 shadow-lg"
          >
            <nav className="flex flex-col px-4 py-3 gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={getLinkHref(link.href)}
                  onClick={(e) => handleAnchorClick(e, link.href)}
                  className="px-4 py-3 rounded-lg text-sm font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-all duration-200"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href={getLinkHref(navCTA.href)}
                onClick={(e) => handleAnchorClick(e, navCTA.href)}
                className="mt-2 px-4 py-3 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-lg text-center transition-all duration-200"
              >
                {navCTA.label}
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}