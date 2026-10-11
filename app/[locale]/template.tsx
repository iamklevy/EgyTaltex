"use client";

import { motion } from "motion/react";

/** Re-mounts on every navigation, giving each page the fade-in the Vite build had. */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, ease: "easeOut" }}>
      {children}
    </motion.div>
  );
}
