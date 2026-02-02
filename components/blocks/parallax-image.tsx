"use client";

import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useRef } from "react";

interface ParallaxImageProps {
  imageSrc: string;
  imageAlt?: string;
  height?: string;
  overlayOpacity?: number;
  title?: string;
  subtitle?: string;
}

export const ParallaxImage = ({
  imageSrc,
  imageAlt = "Parallax image",
  height = "h-[400px] md:h-[500px] lg:h-[600px]",
  overlayOpacity = 0.3,
  title,
  subtitle,
}: ParallaxImageProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Parallax effect: image moves slower than scroll
  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  // Scale effect: image scales slightly on scroll
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1]);

  // Opacity effect: fade in/out
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.6, 1, 1, 0.6]
  );

  return (
    <section
      ref={containerRef}
      className={`relative w-full overflow-hidden ${height}`}
    >
      {/* Parallax Image */}
      <motion.div
        style={{ y, scale }}
        className="absolute inset-0 w-full h-full"
      >
        <motion.div style={{ opacity }} className="relative w-full h-full">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover"
            priority={false}
            quality={90}
          />
        </motion.div>
      </motion.div>

      {/* Dark Overlay */}
      <div
        className="absolute inset-0 bg-black z-10"
        style={{ opacity: overlayOpacity }}
      />

      {/* Optional: Gradient Overlay for better text contrast if needed */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20 z-[11]" />

      {/* Title and Subtitle */}
      {(title || subtitle) && (
        <div className="absolute inset-0 z-20 flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl">
            {title && (
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-white font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight drop-shadow-2xl"
              >
                {title}
              </motion.h2>
            )}
            {subtitle && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-white/90 mt-4 md:mt-6 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed drop-shadow-lg"
              >
                {subtitle}
              </motion.p>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

