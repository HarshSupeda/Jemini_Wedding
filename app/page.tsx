"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
  MotionValue, // <-- Add this
} from "framer-motion";

const WEDDING = {
  bride: "Jemini",
  groom: "Tejendra",
  monogram: "TJ",
  requestLine:
    "REQUESTS THE PLEASURE OF YOUR COMPANY TO CELEBRATE OUR WEDDING ON",
  date: {
    day: "26",
    month: "JANUARY",
    weekday: "TUESDAY",
    year: "2027",
    iso: "2027-01-26T18:00:00+05:30",
  },
  venue: "BAPS Shri Swaminarayan Mandir, Nadiad",
  time: "At Twelve O'Clock in the Afternoon",
  events: [
    {
      label: "Mandva Murat",
      venue: "Aneri Heights, Dumral, Nadiad",
      time: "10:00 AM",
      dress: "Traditionals",
      art: "/assets/tremezzo-sketch.svg",
      eyebrow: "MONDAY · 25 JANUARY",
    },
    {
      label: "Haldi Ceremony",
      venue: "Aneri Heights, Dumral, Nadiad",
      time: "1:00 PM",
      dress: "Yellow Traditionals",
      art: "/assets/haldi.svg",
      eyebrow: "MONDAY · 25 JANUARY",
    },
    {
      label: "Sangeet Ceremony",
      venue: "Aneri Heights, Dumral, Nadiad",
      time: "8:30 PM",
      dress: "Black Traditionals",
      art: "/assets/villa-sketch1.svg",
      eyebrow: "MONDAY · 25 JANUARY",
    },
  ],
} as const;

const MOTION = {
  seal: { type: "spring" as const, stiffness: 250, damping: 24, mass: 0.55 },
  flap: { type: "spring" as const, stiffness: 82, damping: 20, mass: 0.95 },
  card: { type: "spring" as const, stiffness: 88, damping: 22, mass: 0.9 },
  reveal: { type: "spring" as const, stiffness: 105, damping: 25, mass: 0.65 },
};

function Monogram({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative inline-flex items-center justify-center ${className}`}
      aria-label="Jemini and Tejendra monogram"
    >
      <span className="font-script text-[4.15rem] leading-none text-[#685e5b]">
        T
      </span>
      <span className="absolute left-[40%] top-[20%] font-serif text-[5rem] font-light leading-none text-[#685e5b]">
        J
      </span>
    </div>
  );
}

function LanguageSwitch() {
  return (
    <div className="absolute right-4 top-4 z-[80] flex items-center rounded-full border border-[#9a8168]/25 bg-white/55 p-1 text-[9px] uppercase tracking-[0.28em] backdrop-blur">
      <span className="rounded-full bg-[#667466] px-2.5 py-1 text-white">
        EN
      </span>
      <span className="px-2 text-black/45">DE</span>
    </div>
  );
}

function MusicButton() {
  const [on, setOn] = useState(false);
  return (
    <button
      type="button"
      aria-label={on ? "Mute music" : "Play music"}
      onClick={() => setOn((value) => !value)}
      className="absolute bottom-5 right-5 z-[80] flex h-11 w-11 items-center justify-center rounded-full border border-[#9a8168]/25 bg-[#faf2ec]/78 text-[#625957] shadow-sm backdrop-blur"
    >
      {on ? (
        <span className="flex items-end gap-[3px]" aria-hidden="true">
          <i className="h-3 w-[2px] bg-current" />
          <i className="h-4 w-[2px] bg-current" />
          <i className="h-2 w-[2px] bg-current" />
        </span>
      ) : (
        <span className="relative block h-4 w-4" aria-hidden="true">
          <span className="absolute left-0 top-1 h-2 w-[2px] bg-current" />
          <span className="absolute left-[2px] top-1 h-[2px] w-[7px] bg-current" />
          <span className="absolute left-[7px] top-3 h-1.5 w-1.5 rounded-full border border-current" />
          <span className="absolute left-[7px] top-1 h-2 w-[2px] bg-current" />
        </span>
      )}
    </button>
  );
}

function EnvelopeArt() {
  return (
    <div className="absolute inset-0 overflow-hidden rounded-[1.2rem] texture-linen">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#f7ebe7_0%,#f4dee2_49%,#edcfd6_100%)]" />
      <Image
        src="/assets/envelope-texture.svg"
        fill
        priority
        sizes="480px"
        alt=""
        className="object-cover opacity-[0.42] mix-blend-multiply"
      />

      <div className="absolute inset-x-0 top-0 h-[49%] bg-[#f3d9dd]/95 [clip-path:polygon(0_0,100%_0,50%_100%)]" />
      <div className="absolute inset-x-0 top-0 h-[49%] border-b border-[#b58e73]/20 [clip-path:polygon(0_0,100%_0,50%_100%)]" />

      <div className="absolute left-1/2 top-[19%] -translate-x-1/2 text-center text-[#6d605b]">
        <div className="text-[8px] uppercase tracking-[0.42em]">
          THE WEDDING OF
        </div>
        <div className="mt-3 h-px w-20 bg-[#c5a078]/60" />
      </div>

      <div className="absolute inset-x-8 bottom-[14%] flex justify-center text-center">
        <div className="max-w-[285px] font-display text-[1.55rem] italic leading-tight text-[#615553]">
          Requests the pleasure
          <br />
          of your company
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-[7%] bg-[linear-gradient(180deg,rgba(138,103,74,.02),rgba(138,103,74,.13))]" />
    </div>
  );
}

const INTRO_PARTICLES = [
  { side: "left", x: 74, y: -126, r: -38, d: 0.0, c: "#d0ad82", kind: "petal" },
  { side: "left", x: 94, y: -90, r: 52, d: 0.05, c: "#b97883", kind: "dot" },
  { side: "left", x: 112, y: -156, r: 18, d: 0.1, c: "#9caa93", kind: "petal" },
  { side: "left", x: 58, y: -66, r: -18, d: 0.14, c: "#ead2a0", kind: "dot" },
  {
    side: "left",
    x: 126,
    y: -120,
    r: 70,
    d: 0.18,
    c: "#f7efe3",
    kind: "petal",
  },
  { side: "left", x: 92, y: -188, r: -62, d: 0.22, c: "#d0ad82", kind: "dot" },
  { side: "left", x: 150, y: -58, r: 34, d: 0.26, c: "#b97883", kind: "petal" },
  { side: "left", x: 42, y: -150, r: 92, d: 0.3, c: "#9caa93", kind: "dot" },
  {
    side: "right",
    x: -78,
    y: -112,
    r: 44,
    d: 0.02,
    c: "#d0ad82",
    kind: "petal",
  },
  {
    side: "right",
    x: -110,
    y: -78,
    r: -60,
    d: 0.08,
    c: "#b97883",
    kind: "dot",
  },
  {
    side: "right",
    x: -130,
    y: -154,
    r: 18,
    d: 0.12,
    c: "#9caa93",
    kind: "petal",
  },
  { side: "right", x: -58, y: -64, r: 28, d: 0.16, c: "#ead2a0", kind: "dot" },
  {
    side: "right",
    x: -126,
    y: -122,
    r: -72,
    d: 0.2,
    c: "#f7efe3",
    kind: "petal",
  },
  { side: "right", x: -96, y: -186, r: 54, d: 0.24, c: "#d0ad82", kind: "dot" },
  {
    side: "right",
    x: -152,
    y: -58,
    r: -30,
    d: 0.28,
    c: "#b97883",
    kind: "petal",
  },
  {
    side: "right",
    x: -42,
    y: -148,
    r: -92,
    d: 0.32,
    c: "#9caa93",
    kind: "dot",
  },
] as const;

type IntroPhase = "idle" | "envelope" | "joy_screen" | "curtains" | "done";

function CelebrationPoppers({ active }: { active: boolean }) {
  // Doubled the particle count and randomized offsets for the "lots of poppers" effect
  const particles = [
    ...INTRO_PARTICLES,
    ...INTRO_PARTICLES.map((p) => ({
      ...p,
      x: p.side === "left" ? p.x + 30 : p.x - 30,
      y: p.y - 40,
      d: p.d + 0.15,
      r: p.r * -1.5,
    })),
  ];

  return (
    <div className="pointer-events-none absolute inset-0 z-[75] overflow-hidden">
      {particles.map((particle, index) => (
        <motion.span
          key={`${particle.side}-${index}`}
          className="absolute top-[63%] block"
          style={{
            left: particle.side === "left" ? "9%" : undefined,
            right: particle.side === "right" ? "9%" : undefined,
            width: particle.kind === "petal" ? 6 : 5,
            height: particle.kind === "petal" ? 10 : 5,
            borderRadius: particle.kind === "petal" ? "70% 30% 70% 30%" : "999px",
            background: particle.c,
            boxShadow: "0 1px 6px rgba(78,58,43,.16)",
          }}
          initial={{ opacity: 0, x: 0, y: 0, scale: 0.25, rotate: 0 }}
          animate={
            active
              ? {
                  opacity: [0, 1, 1, 0],
                  x: particle.x,
                  y: particle.y,
                  scale: [0.25, 1, 1, 0.78],
                  rotate: particle.r,
                }
              : { opacity: 0, x: 0, y: 0, scale: 0.25, rotate: 0 }
          }
          transition={{
            duration: 1.55,
            delay: particle.d,
            ease: [0.16, 1, 0.3, 1],
          }}
        />
      ))}
    </div>
  );
}

function CurtainReveal({ active }: { active: boolean }) {
  return (
    <div className="absolute inset-0 z-10 overflow-hidden">
      {/* Left Curtain */}
      <motion.div
        className="absolute inset-y-0 left-0 w-1/2 bg-no-repeat [background-size:200%_100%] [background-position:left_top] will-change-transform"
        style={{ backgroundImage: "url('/assets/curtain.svg')" }}
        initial={{ x: "0%" }}
        animate={{ x: active ? "-104%" : "0%" }}
        // Significantly slower duration (4.5s) with a delay (0.8s) so the envelope fades out first
        transition={{ duration: 4.5, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
      />
      {/* Right Curtain */}
      <motion.div
        className="absolute inset-y-0 right-0 w-1/2 bg-no-repeat [background-size:200%_100%] [background-position:right_top] will-change-transform"
        style={{ backgroundImage: "url('/assets/curtain.svg')" }}
        initial={{ x: "0%" }}
        animate={{ x: active ? "104%" : "0%" }}
        transition={{ duration: 4.5, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}

function WeddingIntro({
  onComplete,
  onReveal,
}: {
  onComplete: () => void;
  onReveal: () => void;
}) {
  const [phase, setPhase] = useState<IntroPhase>("idle");
  const started = phase !== "idle";
  const finished = phase === "done";

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    if (finished) return;

    const previousHtmlOverflow = html.style.overflow;
    const previousBodyOverflow = body.style.overflow;
    const previousTouchAction = body.style.touchAction;

    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    body.style.touchAction = "none";

    const preventScrollKeys = (event: KeyboardEvent) => {
      if (["ArrowDown", "ArrowUp", "PageDown", "PageUp", " ", "Home", "End"].includes(event.key)) {
        event.preventDefault();
      }
    };

    window.addEventListener("keydown", preventScrollKeys);

    return () => {
      html.style.overflow = previousHtmlOverflow;
      body.style.overflow = previousBodyOverflow;
      body.style.touchAction = previousTouchAction;
      window.removeEventListener("keydown", preventScrollKeys);
    };
  }, [finished]);

  useEffect(() => {
    if (phase === "envelope") {
      // Wait for the envelope flap to fully open before transitioning
      const timer = window.setTimeout(() => setPhase("joy_screen"), 1400);
      return () => window.clearTimeout(timer);
    }

    if (phase === "joy_screen") {
      // Hold the plain screen with text and poppers for exactly 4 seconds
      const timer = window.setTimeout(() => setPhase("curtains"), 4000);
      return () => window.clearTimeout(timer);
    }

    if (phase === "curtains") {
      // Trigger the page underneath to start fading up while curtains part
      onReveal();
      const timer = window.setTimeout(() => setPhase("done"), 5500);
      return () => window.clearTimeout(timer);
    }

    if (phase === "done") {
      const timer = window.setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
        onComplete();
      }, 100);
      return () => window.clearTimeout(timer);
    }

    return undefined;
  }, [phase, onComplete, onReveal]);

  const start = useCallback(() => {
    if (started) return;
    window.scrollTo({ top: 0, behavior: "auto" });
    setPhase("envelope");
  }, [started]);

  return (
    <motion.div
      className={`fixed inset-0 z-[100] overflow-hidden ${
        finished ? "pointer-events-none" : "pointer-events-auto"
      }`}
      animate={{ opacity: finished ? 0 : 1 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      aria-hidden={finished}
    >
      {/* LAYER 1: The Curtains (Bottom layer) */}
      <CurtainReveal active={phase === "curtains" || phase === "done"} />

      {/* LAYER 2: Joy Screen (Fades in after envelope opens, stays for 4s, fades out for curtains) */}
      <motion.div
        className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#ece4da]"
        initial={{ opacity: 0 }}
        animate={{ opacity: phase === "joy_screen" ? 1 : 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        style={{ pointerEvents: phase === "joy_screen" ? "auto" : "none" }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,#fffaf6_0,#eee4db_55%,#e0d3c7_100%)]" />

        <div className="relative z-10 flex flex-col items-center text-center px-6">
          <div className="text-[11px] uppercase tracking-[0.38em] text-[#766a68]">
            With great joy
          </div>
          <Monogram className="scale-[.63] text-[#625a58] mt-4 mb-2" />
          <div className="mt-1 font-script text-[3.95rem] leading-[1.1] text-[#625a58]">
            {WEDDING.bride}
            <br />
            &amp; {WEDDING.groom}
          </div>
          <div className="mx-auto mt-4 max-w-[265px] font-serif text-[11px] uppercase leading-[1.7] tracking-[0.16em] text-[#5c5552]">
            REQUESTS THE PLEASURE OF YOUR COMPANY TO CELEBRATE OUR WEDDING
          </div>
          <div className="mx-auto mt-6 h-px w-24 bg-[#c5a078]/80" />
        </div>

        <CelebrationPoppers active={phase === "joy_screen"} />
      </motion.div>

      {/* LAYER 3: The Envelope (Top layer, fades out to reveal the Joy Screen) */}
      <motion.div
        className="absolute inset-0 z-30 bg-[#ece4da]"
        animate={{ opacity: phase === "idle" || phase === "envelope" ? 1 : 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        style={{ pointerEvents: phase === "idle" || phase === "envelope" ? "auto" : "none" }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,#fffaf6_0,#eee4db_55%,#e0d3c7_100%)]" />

        <div className="absolute inset-0 flex items-center justify-center px-5 py-8">
          <motion.div
            className="relative w-[min(86vw,420px)] aspect-[3/4] max-h-[calc(100svh-64px)] [perspective:1400px]"
            initial={{ opacity: 1, scale: 1 }}
            animate={{
              scale: phase === "envelope" ? 1 : 0.97,
            }}
          >
            <motion.div
              className="absolute inset-0 overflow-hidden rounded-[1.2rem] border border-[#9d7b59]/20 bg-[#f1d9dd] shadow-paper [transform-style:preserve-3d]"
              animate={{
                y: phase === "envelope" ? -6 : 0,
                scale: phase === "envelope" ? 0.995 : 1,
                rotateX: phase === "envelope" ? 3 : 0,
              }}
              transition={MOTION.card}
              onClick={start}
              role="button"
              tabIndex={0}
              aria-label="Start wedding invitation"
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  start();
                }
              }}
            >
              <EnvelopeArt />

              <motion.div
                className="absolute inset-x-0 top-0 z-20 h-[52%] origin-top [transform-style:preserve-3d] [backface-visibility:hidden]"
                animate={{
                  rotateX: phase === "envelope" ? -168 : 0,
                  y: phase === "envelope" ? -2 : 0,
                }}
                transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="absolute inset-0 bg-[#f0d5d9]/98 shadow-[0_8px_18px_rgba(91,64,57,.08)] [clip-path:polygon(0_0,100%_0,50%_100%)]" />
                <div className="absolute inset-[4%] border border-[#fffaf2]/50 [clip-path:polygon(0_0,100%_0,50%_100%)]" />
              </motion.div>

              {/* Removed the inner card box entirely */}

              <motion.button
                type="button"
                aria-label="Open wedding invitation"
                onClick={(event) => {
                  event.stopPropagation();
                  start();
                }}
                className="pointer-events-auto absolute left-1/2 top-[50%] z-50 flex h-[92px] w-[92px] cursor-pointer touch-manipulation items-center justify-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-[#8b7157]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f1d9dd]"
                initial={{ x: "-50%", y: "-50%" }}
                animate={{
                  x: "-50%",
                  y: phase === "envelope" ? "calc(-50% - 30px)" : "-50%",
                  scale: phase === "envelope" ? 1.3 : 1,
                  opacity: phase === "envelope" ? 0 : 1,
                  rotate: phase === "envelope" ? 6 : 0,
                }}
                transition={MOTION.seal}
              >
                <motion.div
                  animate={{
                    boxShadow: started
                      ? "0 9px 22px rgba(70,48,39,.14)"
                      : "0 7px 16px rgba(70,48,39,.18)",
                  }}
                  className="flex h-[92px] w-[92px] items-center justify-center rounded-full border border-[#8b7157]/45 bg-[radial-gradient(circle_at_35%_30%,#eadbbd,#c3a46f_60%,#927351)] p-2 shadow-wax"
                >
                  <div className="flex h-full w-full items-center justify-center rounded-full border border-white/30 bg-[#c7b38e]/35">
                    <div
                      className="relative h-12 w-12 text-[#685e5b]"
                      aria-hidden="true"
                    >
                      <span className="absolute left-[7px] top-[1px] font-script text-[3rem] leading-none">
                        T
                      </span>
                      <span className="absolute left-[23px] top-[12px] font-serif text-[3.3rem] font-light leading-none">
                        J
                      </span>
                    </div>
                  </div>
                </motion.div>
              </motion.button>

              <motion.div
                className="absolute inset-x-6 bottom-[7%] z-40 text-center text-[10px] uppercase tracking-[0.32em] text-[#766764]"
                animate={{ opacity: started ? 0 : 1, y: started ? 18 : 0 }}
                transition={MOTION.reveal}
              >
                Tap to open
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function FloralGateway({ progress }: { progress: MotionValue<number> }) {
  const smoothProgress = useSpring(progress, {
    stiffness: 105,
    damping: 30,
    mass: 0.55,
  });
  const scaleRaw = useTransform(
    smoothProgress,
    [0, 0.42, 0.7, 0.9, 1],
    [1, 1.06, 1.28, 1.7, 2.1],
  );
  const scale = useSpring(scaleRaw, {
    stiffness: 115,
    damping: 28,
    mass: 0.62,
  });
  const opacityRaw = useTransform(
    smoothProgress,
    [0, 0.52, 0.72, 1],
    [1, 0.9, 0.35, 0],
  );
  const opacity = useSpring(opacityRaw, {
    stiffness: 120,
    damping: 32,
    mass: 0.5,
  });

  return (
    <motion.div
      className="pointer-events-none absolute inset-0 z-30 overflow-hidden"
      style={{ opacity }}
    >
      <motion.div
        className="absolute left-[-31%] top-[-1%] h-[102%] w-[64%] origin-left will-change-transform"
        style={{ scale }}
      >
        <Image
          src="/assets/floral-arch.svg"
          fill
          sizes="520px"
          alt=""
          className="object-cover object-left"
          priority
        />
      </motion.div>
      <motion.div
        className="absolute right-[-31%] top-[-1%] h-[102%] w-[64%] origin-right will-change-transform"
        style={{ scale }}
      >
        <Image
          src="/assets/floral-arch.svg"
          fill
          sizes="520px"
          alt=""
          className="object-cover object-right scale-x-[-1]"
          priority
        />
      </motion.div>
    </motion.div>
  );
}

function TempleGroundIllustration() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#dcd6cc]">
      <Image
        src="/assets/lake-villa.svg"
        fill
        sizes="480px"
        alt="Luxury temple and open wedding ground illustration"
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(255,255,255,.18),transparent_46%),linear-gradient(180deg,rgba(249,238,225,.08),rgba(123,99,75,.12))]" />
      <div className="absolute inset-x-0 bottom-0 h-[28%] bg-[linear-gradient(180deg,transparent,rgba(94,100,81,.16))]" />
    </div>
  );
}

function GatewayScene() {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 95,
    damping: 30,
    mass: 0.55,
  });

  const lakeOpacityRaw = useTransform(
    smoothProgress,
    [0, 0.18, 0.42, 0.72, 1],
    [1, 1, 0.98, 0.92, 0.84],
  );
  const lakeOpacity = useSpring(lakeOpacityRaw, {
    stiffness: 90,
    damping: 30,
    mass: 0.5,
  });
  const lakeScale = useTransform(
    smoothProgress,
    [0, 0.45, 1],
    [1.07, 1.025, 1],
  );
  const contentY = useTransform(
    smoothProgress,
    [0, 0.32, 0.62, 1],
    [0, 0, -8, -18],
  );
  const contentOpacityRaw = useTransform(
    smoothProgress,
    [0, 0.16, 0.38, 0.74, 1],
    [1, 1, 1, 0.96, 0.9],
  );
  const contentOpacity = useSpring(contentOpacityRaw, {
    stiffness: 100,
    damping: 28,
    mass: 0.6,
  });
  const contentScale = useTransform(
    smoothProgress,
    [0, 0.42, 0.8, 1],
    [1, 1, 1.01, 1],
  );

return (
    <section
      ref={ref}
      className="relative h-[190vh] overflow-x-clip bg-[#e9e1d6]"
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden overscroll-none bg-[#e9e1d6]">
        <motion.div
          className="absolute inset-0 will-change-transform"
          style={{ opacity: lakeOpacity, scale: lakeScale }}
        >
          {/* Replaced the busy illustration with a clean, textured theme background */}
          <div className="absolute inset-0 bg-[#f4e4e5] invitation-paper" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.5),transparent_70%)]" />
        </motion.div>

        <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_50%_18%,rgba(255,250,242,.3),transparent_42%),linear-gradient(180deg,rgba(243,231,218,.22),transparent_42%,rgba(78,71,60,.08))]" />
        
        <FloralGateway progress={scrollYProgress} />

        <motion.div
          className="absolute inset-x-8 top-[27%] z-50 text-center will-change-transform"
          style={{ y: contentY, opacity: contentOpacity, scale: contentScale }}
        >
          {/* Changed text from white to dark ink colors for perfect readability */}
          <div className="text-[11px] uppercase tracking-[0.38em] text-[#766a68]">
            With great joy
          </div>
          
          <Monogram className="scale-[.63] text-[#625a58]" />
          
          <div className="mt-1 font-script text-[3.95rem] leading-[1.1] text-[#625a58]">
            {WEDDING.bride}
            <br />
            &amp; {WEDDING.groom}
          </div>
          
          <div className="mx-auto mt-4 max-w-[265px] font-serif text-[11px] uppercase leading-[1.7] tracking-[0.16em] text-[#5c5552]">
            REQUESTS THE PLEASURE OF YOUR COMPANY TO CELEBRATE OUR WEDDING
          </div>
          
          <div className="mx-auto mt-6 h-px w-24 bg-[#c5a078]/80" />
        </motion.div>

        <LanguageSwitch />
        <MusicButton />
      </div>
    </section>
  );
}

function FloralFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative overflow-hidden">
      {/* Increased height from h-28 to h-48, adjusted object position to top */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-48 opacity-80">
        <Image 
          src="/assets/floral-arch.svg" 
          fill 
          sizes="480px" 
          alt="" 
          className="object-cover object-top opacity-65" 
        />
      </div>
      
      <div className="pointer-events-none absolute bottom-0 left-[-30%] h-40 w-[60%] opacity-70">
        <Image src="/assets/floral-arch.svg" fill sizes="300px" alt="" className="object-cover object-[35%_85%]" />
      </div>
      
      <div className="pointer-events-none absolute bottom-0 right-[-30%] h-40 w-[60%] opacity-70">
        <Image src="/assets/floral-arch.svg" fill sizes="300px" alt="" className="object-cover object-[65%_85%] scale-x-[-1]" />
      </div>
      
      {children}
    </div>
  );
}

function MainInvitation({ revealed }: { revealed: boolean }) {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 30,
    mass: 0.55,
  });

  const yRaw = useTransform(smoothProgress, [0, 0.6, 1], [0, -20, -50]);
  const y = useSpring(yRaw, { stiffness: 85, damping: 28, mass: 0.6 });
  
  const opacityRaw = useTransform(smoothProgress, [0, 0.6, 1], [1, 1, 0]);
  const opacity = useSpring(opacityRaw, { stiffness: 95, damping: 30, mass: 0.55 });
  
  const scale = useTransform(smoothProgress, [0, 1], [1, 0.96]);

  return (
    <section
      ref={ref}
      className="relative min-h-[125vh] overflow-hidden bg-[#f3e2dc]"
    >
      <div className="relative min-h-[125vh] overflow-hidden invitation-paper">
        <FloralFrame>
          <motion.div
            className="relative z-10 mx-auto flex min-h-[125vh] max-w-[420px] flex-col items-center px-7 pb-20 pt-28 text-center will-change-transform"
            style={{ y, opacity, scale }}
          >
            {/* NEW: Entrance Reveal Wrapper */}
            <motion.div
              className="flex flex-col items-center w-full"
              initial={{ opacity: 0, y: 60 }}
              animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
              // Delayed to trigger right as the curtains visually start parting
              transition={{ duration: 2.6, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="text-[9px] uppercase tracking-[0.45em] text-[#766a68]">
                Together with our families
              </div>
              
              <Monogram className="mt-4 mb-0 scale-[.68]" />

              <h1 className="mt-8 font-script text-[4.35rem] leading-[.82] text-[#625a58]">
                {WEDDING.bride} &amp; {WEDDING.groom} 
              </h1>
              
              <div className="my-7 w-40 gold-rule" />
              
              <p className="max-w-[265px] font-serif text-[11px] font-semibold uppercase leading-[1.6] tracking-[0.18em] text-[#5c5552]">
                {WEDDING.requestLine}
              </p>
              
              <div className="mt-8 flex items-end justify-center gap-3 text-[#554f4d]">
                <span className="mb-2 font-serif text-[10px] uppercase tracking-[0.28em]">
                  {WEDDING.date.month}
                </span>
                <span className="font-display text-[5.1rem] font-light leading-[.74]">
                  {WEDDING.date.day}
                </span>
                <span className="mb-2 border-l border-[#5e5552]/30 pl-3 font-serif text-[10px] uppercase tracking-[0.24em]">
                  {WEDDING.date.year}
                </span>
              </div>
              
              <div className="mt-2 text-[9px] uppercase tracking-[0.4em] text-[#6c625f]">
                {WEDDING.date.weekday}
              </div>
              
              <div className="mt-7 text-[9px] uppercase tracking-[0.38em] text-[#716663]">
                To be held at
              </div>
              
              <div className="mt-2 max-w-[280px] font-script text-[2.35rem] leading-[.9] text-[#6d5d60]">
                {WEDDING.venue}
              </div>
              
              <div className="mt-4 font-serif text-[10px] uppercase tracking-[0.22em] text-[#665d5a]">
                {WEDDING.time}
              </div>
              
              <div className="mt-10 w-full overflow-hidden rounded-[18px] border border-[#6f625d]/20 bg-white/10">
                <div className="relative h-[250px] w-full">
                  <Image
                    src="/assets/lake-villa.svg"
                    fill
                    sizes="420px"
                    alt="Illustration of a grand temple and luxury wedding lawn"
                    className="object-cover object-bottom opacity-[.8]"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#d7c8bd]/25 to-transparent" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </FloralFrame>
      </div>
    </section>
  );
}

function Countdown() {
  const target = useMemo(() => new Date(WEDDING.date.iso).getTime(), []);
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);
  const diff = Math.max(0, target - (now ?? target));
  const days = Math.floor(diff / 86_400_000);
  const hours = Math.floor((diff / 3_600_000) % 24);
  const minutes = Math.floor((diff / 60_000) % 60);
  const values = [days, hours, minutes];
  const labels = ["DAYS", "HOURS", "MINUTES"];

  return (
    <div className="mt-7 flex items-start justify-center gap-3 sm:gap-7">
      {values.map((value, index) => (
        /* Changed min-w-[58px] to w-20 to force equal column widths. 
           This locks the center item perfectly in the middle of the screen. */
        <div key={labels[index]} className="w-20 text-center">
          <div className="font-display text-[2.3rem] leading-none text-[#5f5754]">
            {String(value).padStart(2, "0")}
          </div>
          <div className="mt-2 text-[8px] uppercase tracking-[0.3em] text-[#796c68]">
            {labels[index]}
          </div>
        </div>
      ))}
    </div>
  );
}

function CountdownSection() {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 88,
    damping: 30,
    mass: 0.55,
  });
  const scaleRaw = useTransform(
    smoothProgress,
    [0, 0.35, 0.65, 1],
    [0.965, 1, 1.01, 0.99],
  );
  const scale = useSpring(scaleRaw, {
    stiffness: 105,
    damping: 28,
    mass: 0.55,
  });
  const y = useTransform(smoothProgress, [0, 0.35, 0.65, 1], [28, 0, -4, -16]);
  const opacityRaw = useTransform(
    smoothProgress,
    [0, 0.12, 0.28, 0.78, 1],
    [0, 0.4, 1, 1, 0.28],
  );
  const opacity = useSpring(opacityRaw, {
    stiffness: 100,
    damping: 30,
    mass: 0.55,
  });

  return (
    <section
      ref={ref}
      /* Changed py-24 to pt-24 pb-16 to balance the bottom gap against the next section's curtain */
      className="relative overflow-hidden bg-[#f3e3df] pt-24 pb-16 px-7"
    >
      <motion.div
        className="mx-auto max-w-[390px] text-center will-change-transform flex flex-col items-center"
        style={{ y, scale, opacity }}
      >
        <div className="relative h-36 w-full overflow-hidden">
          <Image
            src="/assets/curtain.svg"
            fill
            sizes="390px"
            alt=""
            className="curtain-breathe object-cover object-top"
          />
        </div>
        
        {/* Changed mt-1 to mt-14 to push the text perfectly into the vertical center */}
        <div className="mt-14 font-script text-[3.1rem] leading-none text-[#695f5d]">
          Countdown
        </div>
        
        <div className="mt-3 text-[9px] uppercase tracking-[0.4em] text-[#7d6e6c]">
          Until {WEDDING.date.day} {WEDDING.date.month} {WEDDING.date.year}
        </div>
        
        <Countdown />
      </motion.div>
    </section>
  );
}

function VenueSketch({ src, label }: { src: string; label: string }) {
  return (
    <div className="relative mx-auto mt-5 h-44 w-full max-w-[360px] overflow-hidden rounded-[12px] opacity-90">
      <Image
        src={src}
        fill
        sizes="360px"
        alt={`${label} architectural sketch`}
        className="object-contain"
      />
    </div>
  );
}

function EventCard({
  event,
  index,
}: {
  event: (typeof WEDDING.events)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 92%", "center 48%"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 92,
    damping: 28,
    mass: 0.55,
  });
  const yRaw = useTransform(smoothProgress, [0, 0.55, 1], [42, 8, 0]);
  const y = useSpring(yRaw, { stiffness: 90, damping: 28, mass: 0.55 });
  const opacityRaw = useTransform(
    smoothProgress,
    [0, 0.22, 0.62, 1],
    [0, 0.35, 1, 1],
  );
  const opacity = useSpring(opacityRaw, {
    stiffness: 105,
    damping: 30,
    mass: 0.5,
  });
  const scale = useTransform(smoothProgress, [0, 0.6, 1], [0.975, 0.995, 1]);

  return (
    <motion.div
      ref={ref}
      style={{ y, opacity, scale }}
      className="relative border-t border-[#776865]/25 py-14 text-center will-change-transform"
    >
      <div className="text-[8px] uppercase tracking-[0.36em] text-[#7c6e6b]">
        {event.eyebrow}
      </div>
      <div className="mt-3 font-script text-[2.95rem] leading-[.92] text-[#6a5e5d]">
        {event.label}
      </div>
      <VenueSketch src={event.art} label={event.venue} />
      <div className="mt-2 font-script text-[2rem] leading-[.9] text-[#726461]">
        {event.venue}
      </div>
      <div className="mt-5 flex flex-wrap items-center justify-center gap-3 text-[9px] uppercase tracking-[0.24em] text-[#6f625e]">
        <span>{event.time}</span>
        <span className="h-1 w-1 rounded-full bg-[#b78f88]" />
        <span>{event.dress}</span>
      </div>
      {index < WEDDING.events.length - 1 ? (
        <div className="mx-auto mt-12 w-24 gold-rule" />
      ) : null}
    </motion.div>
  );
}

function CelebrationsSection() {
  return (
    <section className="relative overflow-hidden bg-[#f4e5e2] px-7 pb-28">
      <div className="relative mx-auto max-w-[390px] text-center">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 opacity-75">
          <Image
            src="/assets/curtain.svg"
            fill
            sizes="390px"
            alt=""
            className="object-cover object-top"
          />
        </div>
        
        {/* Increased padding from pt-28 to pt-40 (160px) to clear the absolutely positioned curtain */}
        <div className="pt-40">
          <div className="font-script text-[3.2rem] leading-none text-[#685d5a]">
            The Celebrations
          </div>
          <div className="mx-auto mt-4 max-w-[230px] text-[9px] uppercase leading-[1.8] tracking-[0.28em] text-[#7b6b67]">
            Three moments, one day, surrounded with love.
          </div>
        </div>
        
        <div className="mt-8">
          {WEDDING.events.map((event, index) => (
            <EventCard
              key={`${event.venue}-${event.label}`}
              event={event}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ClosingSection() {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 88,
    damping: 30,
    mass: 0.55,
  });
  const yRaw = useTransform(smoothProgress, [0, 0.3, 0.55, 1], [30, 4, 0, -18]);
  const y = useSpring(yRaw, { stiffness: 90, damping: 28, mass: 0.55 });
  const opacityRaw = useTransform(
    smoothProgress,
    [0, 0.16, 0.3, 0.88, 1],
    [0, 0.45, 1, 1, 0.2],
  );
  const opacity = useSpring(opacityRaw, {
    stiffness: 100,
    damping: 30,
    mass: 0.55,
  });

  return (
    <section
      ref={ref}
      className="relative min-h-[85vh] overflow-hidden bg-[#eadbda] px-8 pb-24 pt-28"
    >
      <motion.div
        className="mx-auto flex max-w-[390px] flex-col items-center text-center will-change-transform"
        style={{ y, opacity }}
      >
        <Monogram className="mt-4 mb-7 scale-[.69]" />
        <div className="mt-3 font-script text-[4rem] leading-[.8] text-[#655a59]">
          {WEDDING.bride} &amp; {WEDDING.groom}
        </div>
        <div className="mt-8 w-36 gold-rule" />
        <p className="mt-8 max-w-[260px] font-serif text-[13px] italic leading-[1.65] text-[#6d625f]">
          We cannot wait to celebrate this unforgettable chapter with you in the
          place we love.
        </p>
        <div className="mt-8 text-[10px] uppercase tracking-[0.38em] text-[#726764]">
          See you in Nadiad, Gujarat
        </div>
      </motion.div>
    </section>
  );
}

export default function Page() {
  const [opened, setOpened] = useState(false);
  const [revealed, setRevealed] = useState(false);

  // ... keep event listeners intact ...

  return (
    <main className="min-h-screen bg-[#e9dfd6]">
      <div className="mx-auto min-h-screen w-full max-w-[480px] overflow-x-hidden bg-[#f4e4e5] shadow-[0_0_60px_rgba(74,51,48,.12)]">
        {!opened && (
          <WeddingIntro 
            onReveal={() => setRevealed(true)}
            onComplete={() => {
              setOpened(true);
              setRevealed(true); // Fallback in case skipped
            }} 
          />
        )}
        
        <MainInvitation revealed={opened || revealed} />
        <CountdownSection />
        <CelebrationsSection />
        <ClosingSection />
      </div>
    </main>
  );
}
