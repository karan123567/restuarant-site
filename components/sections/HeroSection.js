"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

// ─── Framer Motion Variants ─────────────────────────────────────────────────
const ctaVariants = {
  rest: { scale: 1 },
  hover: { scale: 1.04, transition: { duration: 0.25, ease: "easeOut" } },
  tap:  { scale: 0.97 },
};

const badgeVariants = {
  hidden:  { opacity: 0, y: -16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut", delay: 0.2 } },
};

// ─── Component ───────────────────────────────────────────────────────────────
export default function HeroSection() {
  const containerRef  = useRef(null);
  const bgRef         = useRef(null);
  const overlayRef    = useRef(null);
  const eyebrowRef    = useRef(null);
  const headlineRef   = useRef(null);
  const sublineRef    = useRef(null);
  const ctaRef        = useRef(null);
  const scrollHintRef = useRef(null);
  const imageRef      = useRef(null);
  const statsRef      = useRef(null);

  // ── GSAP: cinematic entrance + parallax ────────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Set initial states
      gsap.set(overlayRef.current, { opacity: 1 });
      gsap.set(bgRef.current, { scale: 1.12, opacity: 0 });
      gsap.set(imageRef.current, { x: 60, opacity: 0 });
      gsap.set(eyebrowRef.current,    { y: 30, opacity: 0 });
      gsap.set(headlineRef.current,   { y: 60, opacity: 0, clipPath: "inset(0 0 100% 0)" });
      gsap.set(sublineRef.current,    { y: 24, opacity: 0 });
      gsap.set(ctaRef.current,        { y: 24, opacity: 0 });
      gsap.set(scrollHintRef.current, { opacity: 0 });
      gsap.set(statsRef.current,      { y: 20, opacity: 0 });

      // 2. Master entrance timeline
      const tl = gsap.timeline({ delay: 0.2 });

      tl.to(bgRef.current, {
          scale: 1,
          opacity: 1,
          duration: 1.8,
          ease: "power3.out",
        })
        .to(overlayRef.current, {
          opacity: 0.55,
          duration: 1.2,
          ease: "power2.inOut",
        }, "<0.4")
        .to(imageRef.current, {
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
        }, "<0.3")
        .to(eyebrowRef.current, {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
        }, "<0.2")
        .to(headlineRef.current, {
          y: 0,
          opacity: 1,
          clipPath: "inset(0 0 0% 0)",
          duration: 1.0,
          ease: "power4.out",
        }, "<0.15")
        .to(sublineRef.current, {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
        }, "<0.3")
        .to(ctaRef.current, {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
        }, "<0.2")
        .to(statsRef.current, {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
        }, "<0.1")
        .to(scrollHintRef.current, {
          opacity: 1,
          duration: 0.5,
        }, "<0.3");

      // 3. Parallax on scroll
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          gsap.to(bgRef.current, {
            y: self.progress * 120,
            ease: "none",
            overwrite: "auto",
          });
          gsap.to(headlineRef.current, {
            y: self.progress * 40,
            ease: "none",
            overwrite: "auto",
          });
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* ── Google Font import (Cormorant Garamond + DM Sans) ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');

        :root {
          --gold:      #C9A96E;
          --gold-lt:   #E8D5B0;
          --gold-dk:   #8B6914;
          --cream:     #F5F0E8;
          --ink:       #0F0D0A;
          --ink-soft:  rgba(15,13,10,0.65);
          --serif:     'Cormorant Garamond', Georgia, serif;
          --sans:      'DM Sans', sans-serif;
        }

        @keyframes scrollBounce {
          0%, 100% { transform: translateY(0);   opacity: 0.9; }
          50%       { transform: translateY(8px); opacity: 0.4; }
        }
        .scroll-dot { animation: scrollBounce 1.8s ease-in-out infinite; }

        .grain::after {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 5;
          opacity: 0.35;
        }
      `}</style>

      <section
        ref={containerRef}
        className="relative w-full overflow-hidden grain"
        style={{
          height: "100svh",
          minHeight: "700px",
          background: "#0F0D0A",
          fontFamily: "var(--sans)",
        }}
      >
        {/* ── Background image ─────────────────────────────────────────── */}
        <div
          ref={bgRef}
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1800&q=85&auto=format')`,
            backgroundSize: "cover",
            backgroundPosition: "center 30%",
            willChange: "transform",
          }}
        />

        {/* ── Dark overlay ─────────────────────────────────────────────── */}
        <div
          ref={overlayRef}
          className="absolute inset-0 z-10"
          style={{
            background:
              "linear-gradient(105deg, rgba(15,13,10,0.92) 0%, rgba(15,13,10,0.6) 55%, rgba(15,13,10,0.2) 100%)",
          }}
        />

        {/* ── Decorative gold vertical line ────────────────────────────── */}
        <motion.div
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 1 }}
          transition={{ duration: 1.4, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: "absolute",
            left: "max(40px, 5vw)",
            top: "15%",
            bottom: "15%",
            width: "1px",
            background:
              "linear-gradient(to bottom, transparent, var(--gold) 20%, var(--gold) 80%, transparent)",
            transformOrigin: "top",
            zIndex: 20,
          }}
        />

        {/* ── Main content ─────────────────────────────────────────────── */}
        <div
          className="relative z-20 flex h-full"
          style={{ padding: "0 max(40px, 5vw)" }}
        >
          {/* LEFT: Text column */}
          <div
            className="flex flex-col justify-center"
            style={{ maxWidth: "640px", paddingTop: "80px" }}
          >
            {/* Badge / eyebrow */}
            <motion.div variants={badgeVariants} initial="hidden" animate="visible">
              <div
                ref={eyebrowRef}
                style={{ display: "inline-flex", alignItems: "center", gap: "10px", marginBottom: "28px" }}
              >
                <span style={{ display: "block", width: "32px", height: "1px", background: "var(--gold)" }} />
                <span
                  style={{
                    fontFamily: "var(--sans)",
                    fontSize: "11px",
                    fontWeight: 500,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "var(--gold)",
                  }}
                >
                  Est. 2018 · Fine Dining
                </span>
              </div>
            </motion.div>

            {/* Headline */}
            <h1
              ref={headlineRef}
              style={{
                fontFamily: "var(--serif)",
                fontSize: "clamp(52px, 7vw, 96px)",
                fontWeight: 300,
                lineHeight: 1.0,
                color: "var(--cream)",
                margin: "0 0 28px",
                letterSpacing: "-0.01em",
              }}
            >
              Where Every
              <br />
              <em style={{ fontStyle: "italic", color: "var(--gold-lt)" }}>Bite Tells</em>
              <br />a Story
            </h1>

            {/* Subline */}
            <p
              ref={sublineRef}
              style={{
                fontFamily: "var(--sans)",
                fontSize: "clamp(14px, 1.6vw, 17px)",
                fontWeight: 300,
                lineHeight: 1.75,
                color: "rgba(245,240,232,0.65)",
                margin: "0 0 44px",
                maxWidth: "460px",
              }}
            >
              Seasonal ingredients, reimagined classics, and an atmosphere
              designed to slow time — right in the heart of the city.
            </p>

            {/* CTA buttons */}
            <div ref={ctaRef} style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
              <motion.div variants={ctaVariants} initial="rest" whileHover="hover" whileTap="tap">
                <Link
                  href="/reservations"
                  style={{
                    display: "inline-block",
                    padding: "14px 36px",
                    background: "var(--gold)",
                    color: "#0F0D0A",
                    fontFamily: "var(--sans)",
                    fontSize: "13px",
                    fontWeight: 500,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    textDecoration: "none",
                    borderRadius: "2px",
                  }}
                >
                  Reserve a Table
                </Link>
              </motion.div>

              <motion.div variants={ctaVariants} initial="rest" whileHover="hover" whileTap="tap">
                <Link
                  href="/menu"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "var(--gold)";
                    e.currentTarget.style.color = "var(--cream)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(201,169,110,0.45)";
                    e.currentTarget.style.color = "var(--gold-lt)";
                  }}
                  style={{
                    display: "inline-block",
                    padding: "13px 36px",
                    border: "1px solid rgba(201,169,110,0.45)",
                    color: "var(--gold-lt)",
                    fontFamily: "var(--sans)",
                    fontSize: "13px",
                    fontWeight: 400,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    textDecoration: "none",
                    borderRadius: "2px",
                    backdropFilter: "blur(4px)",
                    transition: "border-color 0.3s, color 0.3s",
                  }}
                >
                  Explore Menu
                </Link>
              </motion.div>
            </div>

            {/* Stats row */}
            <div
              ref={statsRef}
              style={{
                display: "flex",
                gap: "40px",
                marginTop: "64px",
                paddingTop: "32px",
                borderTop: "1px solid rgba(201,169,110,0.18)",
              }}
            >
              {[
                { value: "12+", label: "Years of craft" },
                { value: "4.9", label: "Guest rating" },
                { value: "60+", label: "Dishes weekly" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div
                    style={{
                      fontFamily: "var(--serif)",
                      fontSize: "28px",
                      fontWeight: 300,
                      color: "var(--gold)",
                      lineHeight: 1,
                    }}
                  >
                    {stat.value}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--sans)",
                      fontSize: "11px",
                      fontWeight: 400,
                      color: "rgba(245,240,232,0.5)",
                      marginTop: "6px",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Floating image card */}
          <div
            className="hidden lg:flex items-center justify-end flex-1"
            style={{ paddingLeft: "60px" }}
          >
            <div ref={imageRef} style={{ position: "relative", width: "360px" }}>
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                style={{
                  borderRadius: "4px",
                  overflow: "hidden",
                  border: "1px solid rgba(201,169,110,0.2)",
                  boxShadow: "0 32px 80px rgba(0,0,0,0.6)",
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1544025162-d76694265947?w=720&q=85&auto=format"
                  alt="Signature dish"
                  style={{ width: "100%", height: "420px", objectFit: "cover", display: "block" }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: "24px",
                    background: "linear-gradient(to top, rgba(15,13,10,0.92), transparent)",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "var(--sans)",
                      fontSize: "10px",
                      fontWeight: 500,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "var(--gold)",
                      marginBottom: "6px",
                    }}
                  >
                    Chef&apos;s Selection
                  </div>
                  <div style={{ fontFamily: "var(--serif)", fontSize: "20px", fontWeight: 400, color: "var(--cream)" }}>
                    Truffle-glazed Duck Confit
                  </div>
                </div>
              </motion.div>

              {/* Floating review pill */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 2.4, duration: 0.7, ease: "easeOut" }}
                style={{
                  position: "absolute",
                  top: "-20px",
                  right: "-24px",
                  background: "rgba(15,13,10,0.9)",
                  border: "1px solid rgba(201,169,110,0.3)",
                  borderRadius: "8px",
                  padding: "12px 16px",
                  backdropFilter: "blur(12px)",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
                }}
              >
                <div style={{ lineHeight: 1 }}>
                  <div style={{ color: "var(--gold)", fontSize: "13px", letterSpacing: "1px" }}>★ ★ ★ ★ ★</div>
                  <div style={{ fontFamily: "var(--sans)", fontSize: "11px", color: "rgba(245,240,232,0.55)", marginTop: "4px" }}>
                    1,200+ reviews
                  </div>
                </div>
              </motion.div>

              {/* Floating open status pill */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 2.7, duration: 0.7, ease: "easeOut" }}
                style={{
                  position: "absolute",
                  bottom: "30px",
                  left: "-28px",
                  background: "rgba(15,13,10,0.9)",
                  border: "1px solid rgba(201,169,110,0.25)",
                  borderRadius: "8px",
                  padding: "10px 14px",
                  backdropFilter: "blur(12px)",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
                }}
              >
                <span
                  style={{
                    display: "block",
                    width: "7px",
                    height: "7px",
                    borderRadius: "50%",
                    background: "#5DBB63",
                    boxShadow: "0 0 6px #5DBB63",
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontFamily: "var(--sans)",
                    fontSize: "11px",
                    color: "rgba(245,240,232,0.75)",
                    letterSpacing: "0.04em",
                  }}
                >
                  Open today · 6 PM – 11 PM
                </span>
              </motion.div>
            </div>
          </div>
        </div>

        {/* ── Navbar ─────────────────────────────────────────────────────── */}
        <motion.nav
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 30,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "28px max(40px, 5vw)",
          }}
        >
          <div style={{ fontFamily: "var(--serif)", fontSize: "22px", fontWeight: 400, color: "var(--cream)", letterSpacing: "0.04em" }}>
            La <em style={{ color: "var(--gold)", fontStyle: "italic" }}>Maison</em>
          </div>

          <div
            style={{
              display: "flex",
              gap: "36px",
              fontFamily: "var(--sans)",
              fontSize: "12px",
              fontWeight: 400,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "rgba(245,240,232,0.65)",
            }}
          >
            {["Menu", "About", "Events", "Gallery"].map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase()}`}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold-lt)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(245,240,232,0.65)")}
                style={{ color: "inherit", textDecoration: "none", transition: "color 0.25s" }}
              >
                {item}
              </Link>
            ))}
          </div>

          <motion.div variants={ctaVariants} initial="rest" whileHover="hover" whileTap="tap">
            <Link
              href="/reservations"
              style={{
                fontFamily: "var(--sans)",
                fontSize: "11px",
                fontWeight: 500,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--gold)",
                textDecoration: "none",
                padding: "9px 22px",
                border: "1px solid rgba(201,169,110,0.4)",
                borderRadius: "2px",
                transition: "all 0.25s",
              }}
            >
              Book Now
            </Link>
          </motion.div>
        </motion.nav>

        {/* ── Scroll hint ──────────────────────────────────────────────── */}
        <div
          ref={scrollHintRef}
          style={{
            position: "absolute",
            bottom: "32px",
            left: "max(40px, 5vw)",
            zIndex: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <div style={{ width: "1px", height: "40px", background: "linear-gradient(to bottom, var(--gold), transparent)", marginBottom: "4px" }} />
          <div className="scroll-dot" style={{ width: "5px", height: "5px", borderRadius: "50%", background: "var(--gold)" }} />
          <span
            style={{
              fontFamily: "var(--sans)",
              fontSize: "9px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(245,240,232,0.4)",
              writingMode: "vertical-rl",
              marginTop: "8px",
            }}
          >
            Scroll
          </span>
        </div>
      </section>
    </>
  );
}