"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";

type PrismaRevealProps = {
  children: ReactNode;
  delay?: number;
};

export default function PrismaReveal({
  children,
  delay = 0,
}: PrismaRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  );
}
