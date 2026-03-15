"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─── Gallery images ───────────────────────────────────────────────────────────
const IMAGES = [
  { id: 1,  src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=85", span: 2, label: "The dining room" },
  { id: 2,  src: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600&q=85", span: 1, label: "Chef at work" },
  { id: 3,  src: "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=85", span: 1, label: "Duck confit" },
  { id: 4,  src: "https://images.unsplash.com/photo-1541014741259-de529411b96a?w=600&q=85", span: 1, label: "Burrata starter" },
  { id: 5,  src: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&q=85", span: 2, label: "Wine cellar" },
  { id: 6,  src: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=600&q=85", span: 1, label: "Cocktail hour" },
  { id: 7,  src: "https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?w=600&q=85", span: 1, label: "Crème brûlée" },
  { id: 8,  src: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600&q=85", span: 1, label: "Table setting" },
  { id: 9,  src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=85", span: 1, label: "Seared scallops" },
  { id: 10, src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=85", span: 2, label: "Private dining" },
  { id: 11, src: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=600&q=85", span: 1, label: "Mushroom risotto" },
  { id: 12, src: "https://images.unsplash.com/photo-1567327894473-19b72c8f63f0?w=600&q=85", span: 1, label: "Chocolate fondant" },
];

// ─── Lightbox ─────────────────────────────────────────────────────────────────
function Lightbox({ image, onClose, onPrev, onNext }) {
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape")     onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft")  onPrev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose, onPrev, onNext]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(10,8,6,0.95)",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px",
        backdropFilter: "blur(12px)",
      }}
    >
      {/* Image */}
      <motion.div
        initial={{ scale: 0.88, opacity: 0 }}
        animate={{ scale: 1,    opacity: 1 }}
        exit={{ scale: 0.92,    opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          maxWidth: "900px",
          width: "100%",
          borderRadius: "2px",
          overflow: "hidden",
          border: "1px solid rgba(201,169,110,0.15)",
          boxShadow: "0 40px 100px rgba(0,0,0,0.8)",
        }}
      >
        <img
          src={image.src}
          alt={image.label}
          style={{ width: "100%", maxHeight: "75vh", objectFit: "cover", display: "block" }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding: "20px 24px",
            background: "linear-gradient(to top, rgba(10,8,6,0.9), transparent)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <span
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "18px",
              fontWeight: 300,
              fontStyle: "italic",
              color: "#E8D5B0",
            }}
          >
            {image.label}
          </span>
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "10px",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "rgba(245,240,232,0.3)",
            }}
          >
            La Maison
          </span>
        </div>
      </motion.div>

      {/* Prev / Next */}
      {[
        { label: "←", action: onPrev, side: "left",  offset: "20px" },
        { label: "→", action: onNext, side: "right", offset: "20px" },
      ].map(({ label, action, side, offset }) => (
        <motion.button
          key={label}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.92 }}
          onClick={(e) => { e.stopPropagation(); action(); }}
          style={{
            position: "absolute",
            [side]: offset,
            top: "50%",
            transform: "translateY(-50%)",
            background: "rgba(201,169,110,0.12)",
            border: "1px solid rgba(201,169,110,0.25)",
            borderRadius: "50%",
            width: "48px",
            height: "48px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#C9A96E",
            fontSize: "18px",
            cursor: "pointer",
            outline: "none",
          }}
        >
          {label}
        </motion.button>
      ))}

      {/* Close */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onClose}
        style={{
          position: "absolute",
          top: "24px",
          right: "24px",
          background: "rgba(201,169,110,0.1)",
          border: "1px solid rgba(201,169,110,0.2)",
          borderRadius: "50%",
          width: "40px",
          height: "40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#C9A96E",
          fontSize: "16px",
          cursor: "pointer",
          outline: "none",
        }}
      >
        ✕
      </motion.button>
    </motion.div>
  );
}

// ─── Gallery tile ─────────────────────────────────────────────────────────────
function GalleryTile({ image, index, onOpen }) {
  const [hovered, setHovered] = useState(false);
  const tileRef = useRef(null);

  // Per-tile GSAP scroll reveal with stagger via delay
  useEffect(() => {
    const el = tileRef.current;
    gsap.fromTo(
      el,
      { opacity: 0, y: 40, scale: 0.97 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.9,
        ease: "power3.out",
        delay: (index % 4) * 0.1,
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
        },
      }
    );
  }, [index]);

  return (
    <div
      ref={tileRef}
      onClick={() => onOpen(index)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        gridColumn: `span ${image.span}`,
        position: "relative",
        overflow: "hidden",
        borderRadius: "2px",
        cursor: "pointer",
        border: "1px solid rgba(201,169,110,0.08)",
        aspectRatio: image.span === 2 ? "16/9" : "4/5",
        transition: "border-color 0.3s",
        ...(hovered && { borderColor: "rgba(201,169,110,0.3)" }),
      }}
    >
      <motion.img
        src={image.src}
        alt={image.label}
        animate={{ scale: hovered ? 1.06 : 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
      />

      {/* Hover overlay */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(10,8,6,0.55)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "12px",
        }}
      >
        <motion.div
          animate={{ scale: hovered ? 1 : 0.8, opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3, delay: 0.05 }}
          style={{
            width: "44px",
            height: "44px",
            border: "1px solid rgba(201,169,110,0.6)",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#C9A96E",
            fontSize: "18px",
          }}
        >
          +
        </motion.div>
        <span
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "15px",
            fontStyle: "italic",
            fontWeight: 300,
            color: "#E8D5B0",
          }}
        >
          {image.label}
        </span>
      </motion.div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function GalleryMasonry() {
  const sectionRef  = useRef(null);
  const headingRef  = useRef(null);
  const [lightbox, setLightbox] = useState(null); // index or null

  const openLightbox  = (i) => setLightbox(i);
  const closeLightbox = ()  => setLightbox(null);
  const prevImage     = ()  => setLightbox((i) => (i - 1 + IMAGES.length) % IMAGES.length);
  const nextImage     = ()  => setLightbox((i) => (i + 1) % IMAGES.length);

  // GSAP heading reveal
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current.children, {
        y: 40,
        opacity: 0,
        stagger: 0.12,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 85%",
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');
        @media (max-width: 640px) {
          .gallery-grid { grid-template-columns: 1fr !important; }
          .gallery-grid > div { grid-column: span 1 !important; aspect-ratio: 4/3 !important; }
        }
      `}</style>

      <section
        ref={sectionRef}
        style={{
          background: "#0A0806",
          padding: "100px max(40px, 5vw) 120px",
        }}
      >
        {/* ── Heading ── */}
        <div ref={headingRef} style={{ marginBottom: "60px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
            <span style={{ display: "block", width: "32px", height: "1px", background: "#C9A96E" }} />
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: "#C9A96E" }}>
              Our space
            </span>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "24px" }}>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "clamp(40px, 5vw, 72px)",
                fontWeight: 300,
                color: "#F5F0E8",
                margin: 0,
                lineHeight: 1.05,
              }}
            >
              A feast for
              <br />
              <em style={{ fontStyle: "italic", color: "#E8D5B0" }}>the eyes</em>
            </h2>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "13px",
                fontWeight: 300,
                color: "rgba(245,240,232,0.4)",
                maxWidth: "320px",
                lineHeight: 1.75,
                margin: 0,
              }}
            >
              From our intimate dining room to the open kitchen — every detail is designed to stay with you long after the meal.
            </p>
          </div>
        </div>

        {/* ── Masonry grid ── */}
        <div
          className="gallery-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "12px",
          }}
        >
          {IMAGES.map((image, i) => (
            <GalleryTile
              key={image.id}
              image={image}
              index={i}
              onOpen={openLightbox}
            />
          ))}
        </div>

        {/* ── Bottom CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: "power3.out" }}
          style={{
            marginTop: "64px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "20px",
            flexDirection: "column",
          }}
        >
          <span
            style={{
              display: "block",
              width: "1px",
              height: "40px",
              background: "linear-gradient(to bottom, transparent, rgba(201,169,110,0.4))",
            }}
          />
          <p
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "18px",
              fontStyle: "italic",
              fontWeight: 300,
              color: "rgba(245,240,232,0.35)",
              margin: 0,
              textAlign: "center",
            }}
          >
            {IMAGES.length} images · Click to explore
          </p>
        </motion.div>
      </section>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightbox !== null && (
          <Lightbox
            image={IMAGES[lightbox]}
            onClose={closeLightbox}
            onPrev={prevImage}
            onNext={nextImage}
          />
        )}
      </AnimatePresence>
    </>
  );
}