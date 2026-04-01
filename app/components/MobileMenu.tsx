"use client";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: string;
  menuItems: string[];
  onNavigate: (item: string) => void;
}

export function MobileMenu({ isOpen, onClose, activeTab, menuItems, onNavigate }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="fixed top-20 left-4 right-4 z-[49] flex flex-col p-6 rounded-[32px] border shadow-2xl backdrop-blur-3xl md:hidden overflow-hidden"
          style={{
            backgroundColor: 'var(--glass-bg)',
            borderColor: 'var(--glass-border)'
          }}
        >
          <div className="flex flex-col gap-2 items-center justify-center">
            {menuItems.map((item, index) => (
              <motion.button
                key={item}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => {
                  onClose();
                  onNavigate(item);
                }}
                className="w-full py-4 text-lg font-medium border-b last:border-0 border-white/5 hover:bg-white/5 rounded-xl transition-colors"
                style={{
                  color: activeTab === item ? 'var(--primary-light-color)' : 'var(--primary-text-color)'
                }}
              >
                {item}
              </motion.button>
            ))}
          </div>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="w-full mt-6 py-4 rounded-2xl font-bold text-lg text-white shadow-lg active:scale-95 transition-transform"
            style={{ backgroundColor: 'var(--primary-color)' }}
          >
            Solicita tu demo
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
