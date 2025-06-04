"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface TrucoEffectsProps {
  type: "truco" | "manilha" | "win";
  level?: number;
  onComplete: () => void;
}

export function TrucoEffects({
  type,
  level = 1,
  onComplete,
}: TrucoEffectsProps) {
  const [particles, setParticles] = useState<
    Array<{ id: number; x: number; y: number }>
  >([]);

  useEffect(() => {
    // Generate particles for effects
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
    }));
    setParticles(newParticles);

    const timer = setTimeout(onComplete, 2000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  const getTrucoText = () => {
    if (type === "truco") {
      return level === 1
        ? "TRUUUCO!"
        : level === 3
          ? "TRUUUCO!"
          : level === 6
            ? "SEIS!"
            : level === 9
              ? "NOVE!"
              : "DOZE!";
    }
    if (type === "manilha") return "MANILHA!";
    return "VITÓRIA!";
  };

  const getEffectColor = () => {
    if (type === "truco") return "text-red-500";
    if (type === "manilha") return "text-yellow-500";
    return "text-green-500";
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 pointer-events-none">
        {/* Screen Shake Effect */}
        <motion.div
          className="absolute inset-0"
          animate={
            type === "truco"
              ? {
                  x: [0, -5, 5, -5, 5, 0],
                  y: [0, -2, 2, -2, 2, 0],
                }
              : {}
          }
          transition={{ duration: 0.5, repeat: 2 }}
        />

        {/* Main Text Effect */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [0, 1.5, 1.2, 1.3, 1.1, 1.2],
            opacity: [0, 1, 1, 1, 1, 0],
            rotate: [0, -5, 5, -3, 3, 0],
          }}
          transition={{ duration: 2, ease: "easeOut" }}
        >
          <div
            className={`text-8xl font-black ${getEffectColor()} drop-shadow-2xl`}
          >
            {getTrucoText()}
          </div>
        </motion.div>

        {/* Fire/Lightning Effects for Truco */}
        {type === "truco" && (
          <>
            {/* Lightning Bolts */}
            <motion.div
              className="absolute top-0 left-1/4 w-1 bg-yellow-400 origin-top"
              initial={{ height: 0, opacity: 0 }}
              animate={{
                height: ["0vh", "100vh", "0vh"],
                opacity: [0, 1, 0],
                x: [0, 20, -20, 10, 0],
              }}
              transition={{ duration: 0.3, delay: 0.2 }}
            />
            <motion.div
              className="absolute top-0 right-1/4 w-1 bg-yellow-400 origin-top"
              initial={{ height: 0, opacity: 0 }}
              animate={{
                height: ["0vh", "100vh", "0vh"],
                opacity: [0, 1, 0],
                x: [0, -20, 20, -10, 0],
              }}
              transition={{ duration: 0.3, delay: 0.4 }}
            />

            {/* Fire Particles */}
            {particles.map((particle) => (
              <motion.div
                key={particle.id}
                className="absolute w-2 h-2 bg-red-500 rounded-full"
                initial={{
                  x: particle.x,
                  y: particle.y,
                  scale: 0,
                  opacity: 0,
                }}
                animate={{
                  y: particle.y - 200,
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 1.5,
                  delay: Math.random() * 0.5,
                  ease: "easeOut",
                }}
              />
            ))}
          </>
        )}

        {/* Golden Sparkles for Manilha */}
        {type === "manilha" && (
          <>
            {particles.map((particle) => (
              <motion.div
                key={particle.id}
                className="absolute w-3 h-3 bg-yellow-400 rounded-full"
                style={{
                  left: particle.x,
                  top: particle.y,
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: [0, 1.5, 0],
                  opacity: [0, 1, 0],
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 1,
                  delay: Math.random() * 0.8,
                  ease: "easeOut",
                }}
              />
            ))}
          </>
        )}

        {/* Confetti for Win */}
        {type === "win" && (
          <>
            {particles.map((particle) => (
              <motion.div
                key={particle.id}
                className="absolute w-4 h-4 rounded-full"
                style={{
                  left: particle.x,
                  top: -20,
                  backgroundColor: [
                    "#ff6b6b",
                    "#4ecdc4",
                    "#45b7d1",
                    "#96ceb4",
                    "#feca57",
                  ][particle.id % 5],
                }}
                initial={{ y: -20, rotate: 0 }}
                animate={{
                  y: window.innerHeight + 20,
                  rotate: 360,
                  x: particle.x + (Math.random() - 0.5) * 200,
                }}
                transition={{
                  duration: 3,
                  delay: Math.random() * 2,
                  ease: "easeOut",
                }}
              />
            ))}
          </>
        )}

        {/* Background Flash */}
        <motion.div
          className="absolute inset-0 bg-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.3, 0] }}
          transition={{ duration: 0.2, delay: 0.1 }}
        />
      </div>
    </AnimatePresence>
  );
}
