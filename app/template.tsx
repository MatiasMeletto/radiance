"use client";
import { motion } from "framer-motion";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ y: 200, opacity: 0 }} 
      animate={{ y: 0, opacity: 1 }}   
      transition={{
        type: "spring",
        stiffness: 100, 
        damping: 20,
        mass: 1,        
      }}
      className="min-h-screen bg-[var(--bg-color)]" 
    >
      {children}
    </motion.div>
  );
}