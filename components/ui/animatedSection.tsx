'use client';

import { motion } from 'framer-motion';

export const AnimatedSection = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 1,
        ease: [0.25, 0.1, 0.25, 1], // une courbe de Bézier plus douce (easeInOut)
      }}
      className="transition-all"
    >
      {children}
    </motion.div>
  );
};
