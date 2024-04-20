'use client';

import { motion } from 'framer-motion';

export default function Template({ children }) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      ease={{ ease: 'easeInOut', duration: 0.8 }}
    >
      {children}
    </motion.div>
  );
}
