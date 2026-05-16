import React, { useEffect, useState } from "react";
import { motion } from "motion/react";

const particles = Array.from({ length: 18 });

export const Hero = () => {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMouse({
        x: (e.clientX / window.innerWidth - 0.5) * 28,
        y: (e.clientY / window.innerHeight - 0.5) * 28,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="relative isolate min-h-[92vh] overflow-hidden flex items-center justify-center py-24 bg-gradient-to-b from-[#050505] via-[#0b0b0b] to-[#070707]">
      {/* NOISE */}
      <motion.div
        animate={{ x: [0, -8, 8, 0], y: [0, 8, -8, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 bg-noise opacity-[0.05] pointer-events-none"
      />

      {/* GOLD GRID */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(201,168,76,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(201,168,76,0.02)_1px,transparent_1px)] bg-[size:100px_100px] pointer-events-none" />

      {/* AMBIENT GOLD GLOW */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.25, 0.45, 0.25] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-[-10%] left-[5%] w-[520px] h-[520px] bg-gold/15 blur-[140px] rounded-full"
        />
      </div>

      {/* ========================= */}
      {/* LAMP SHADOW BEAMS (3) */}
      {/* ========================= */}
      <div className="absolute top-0 inset-x-0 flex justify-around pointer-events-none">
        {/* left lamp */}
        <div className="relative w-[200px] h-[500px]">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-[120px] bg-gradient-to-b from-transparent via-gold/50 to-transparent blur-[1px]" />
          <div className="absolute top-[120px] left-1/2 -translate-x-1/2 w-[260px] h-[700px] bg-gradient-to-b from-gold/20 via-gold/5 to-transparent blur-[60px] opacity-70" />
        </div>

        {/* center lamp (strongest) */}
        <div className="relative w-[240px] h-[500px]">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[3px] h-[140px] bg-gradient-to-b from-transparent via-gold/70 to-transparent blur-[1px]" />
          <div className="absolute top-[120px] left-1/2 -translate-x-1/2 w-[340px] h-[750px] bg-gradient-to-b from-gold/25 via-gold/6 to-transparent blur-[70px] opacity-80" />
        </div>

        {/* right lamp */}
        <div className="relative w-[200px] h-[500px]">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-[120px] bg-gradient-to-b from-transparent via-gold/50 to-transparent blur-[1px]" />
          <div className="absolute top-[120px] left-1/2 -translate-x-1/2 w-[260px] h-[700px] bg-gradient-to-b from-gold/20 via-gold/5 to-transparent blur-[60px] opacity-70" />
        </div>
      </div>

      {/* ========================= */}
      {/* FOG LAYERS (FIXED VISIBILITY) */}
      {/* ========================= */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* base fog */}
        <motion.div
          animate={{ x: ["-10%", "10%"], y: ["0%", "5%"] }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-0 left-0 w-[120%] h-[60%] bg-[radial-gradient(circle_at_center,rgba(255,215,150,0.08),transparent_70%)] blur-[90px] opacity-80"
        />

        {/* mid fog */}
        <motion.div
          animate={{ x: ["10%", "-10%"], y: ["0%", "-5%"] }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-10%] left-[-10%] w-[140%] h-[70%] bg-[radial-gradient(circle_at_center,rgba(201,168,76,0.10),transparent_65%)] blur-[110px] opacity-70"
        />

        {/* top haze */}
        <motion.div
          animate={{ opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute top-0 left-0 w-full h-[40%] bg-gradient-to-b from-white/5 via-transparent to-transparent blur-[60px]"
        />
      </div>

      {/* ROTATING RINGS */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 220, repeat: Infinity, ease: "linear" }}
        style={{
          transform: `translate(${mouse.x * 0.35}px, ${mouse.y * 0.35}px)`,
        }}
        className="absolute w-[1100px] h-[1100px] rounded-full border border-gold/[0.03]"
      >
        <div className="absolute inset-24 rounded-full border border-gold/[0.02]" />
        <div className="absolute inset-48 rounded-full border border-gold/[0.015]" />
      </motion.div>

      {/* PARTICLES */}
      {particles.map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-gold/40 blur-[1px]"
          style={{
            width: `${2 + Math.random() * 3}px`,
            height: `${2 + Math.random() * 3}px`,
          }}
          initial={{
            x: `${Math.random() * 100}%`,
            y: `${Math.random() * 100}%`,
            opacity: 0,
          }}
          animate={{
            y: ["0%", "-140%"],
            opacity: [0, 0.6, 0],
            scale: [1, 2, 1],
          }}
          transition={{
            duration: 12 + Math.random() * 10,
            repeat: Infinity,
            delay: Math.random() * 6,
          }}
        />
      ))}

      {/* CM MONOGRAM */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          style={{
            transform: `translate(${mouse.x * 0.12}px, ${mouse.y * 0.12}px)`,
          }}
          className="absolute right-[-5%] bottom-[-10%]"
        >
          <span className="font-display text-[min(42vw,540px)] font-bold text-transparent [-webkit-text-stroke:1px_rgba(201,168,76,0.04)]">
            CM
          </span>
        </motion.div>
      </div>

      {/* CONTENT */}
      <div className="relative z-20 px-6 pt-24 md:pt-28 text-center max-w-5xl">
        <motion.h1 className="font-display text-[clamp(44px,6.8vw,108px)] text-white leading-[1]">
          C.M Scents
        </motion.h1>

        <p className="mt-8 text-white/60 text-lg">
          Crafted To Leave An Impression
        </p>
      </div>
    </section>
  );
};
