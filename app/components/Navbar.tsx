"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";
import { DemoModal } from "./DemoModal";
import { useScrollNavigation } from "@/app/hooks/useScrollNavigation";
import { useMenuNavigation } from "@/app/hooks/useMenuNavigation";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const { activeTab, setActiveTab, isScrolled, formatSlug } = useScrollNavigation();
  const { handleNavigation, menuItems } = useMenuNavigation(setActiveTab);

  return (
    <>
      <nav className="md:hidden fixed top-4 left-4 right-4 z-50 flex items-center justify-between px-6 py-3 rounded-full border shadow-lg backdrop-blur-xl transition-all duration-300"
        style={{
          backgroundColor: 'var(--glass-bg)',
          borderColor: 'var(--glass-border)'
        }}>
        <Logo />
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-full transition-colors active:scale-95"
          style={{ color: 'var(--primary-text-color)' }}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        activeTab={activeTab}
        menuItems={menuItems}
        onNavigate={handleNavigation}
      />

      <nav
        className="hidden md:flex w-full max-w-7xl mx-auto items-center justify-between p-6 bg-transparent transition-opacity duration-300 z-50 relative"
        style={{ opacity: isScrolled ? 0 : 1, pointerEvents: isScrolled ? 'none' : 'auto' }}
      >
        <Logo />
        <div className="flex items-center gap-8">
          {menuItems.map((item) => (
            <button 
              key={item} 
              onClick={() => handleNavigation(item)} 
              className="text-sm font-medium transition-opacity" 
              style={{ 
                color: 'var(--primary-text-color)',
                opacity: activeTab === item ? 1 : 0.7 
              }}
            >
              {item}
            </button>
          ))}
        </div>
        <button 
          onClick={() => setIsDemoModalOpen(true)}
          className="px-6 py-2.5 rounded-full font-bold text-sm transition-all active:scale-95 text-white bg-black dark:bg-white dark:text-black"
        >
          Solicita tu demo
        </button>
      </nav>

      <AnimatePresence>
        {isScrolled && (
          <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.4, ease: "circOut" }}
            className="fixed top-0 left-0 right-0 z-50 flex justify-center p-6 pointer-events-none hidden md:flex"
          >
            <div
              className="pointer-events-auto flex items-center justify-between px-3 py-2 w-full max-w-5xl rounded-full border shadow-2xl backdrop-blur-md transition-colors duration-300 bg-[var(--glass-bg)] border-[var(--glass-border)]"
            >
              <Logo />
              <div className="flex items-center gap-1 relative">
                {menuItems.map((item) => (
                  <button
                    key={item}
                    onClick={() => handleNavigation(item)} 
                    className="relative px-4 py-2 text-sm font-medium transition-colors duration-300 z-10"
                    style={{ color: activeTab === item ? 'var(--primary-text-color)' : 'var(--secondary-text-color)' }}
                  >
                    <span className="relative z-10">{item}</span>
                    {activeTab === item && (
                      <motion.div
                        layoutId="active-pill"
                        className="absolute inset-0 rounded-full shadow-sm bg-[var(--bg-color)] border border-[var(--glass-border)]"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </button>
                ))}
              </div>
              <motion.button
                onClick={() => setIsDemoModalOpen(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2.5 rounded-full font-bold text-sm shadow-md text-white bg-[var(--primary-color)]"
              >
                Solicita tu demo
              </motion.button>
            </div>
          </motion.header>
        )}
      </AnimatePresence>

      <DemoModal 
        isOpen={isDemoModalOpen} 
        onClose={() => setIsDemoModalOpen(false)} 
      />
    </>
  );
}