"use client";

import { motion } from "motion/react";

import PrismaHero from "@/components/blocks/prisma-hero";
import FeatureList from "@/components/prisma/FeatureList";
import PrismaCTA from "@/components/prisma/PrismaCTA";
import ReviewList from "@/components/prisma/ReviewList";

export default function PrismaContent() {
  return (
    <>
      <PrismaHero />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, delay: 0.05 }}
      >
        <FeatureList />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <ReviewList />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, delay: 0.15 }}
      >
        <PrismaCTA />
      </motion.div>
    </>
  );
}
