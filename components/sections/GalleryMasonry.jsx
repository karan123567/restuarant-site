"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─── Gallery images (using stable Unsplash IDs) ───────────────────────────────
const IMAGES = [
  { id: 1,  src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&q=85&auto=format&fit=crop", span: 2, label: "The dining room",      color: "#2a1f14" },
  { id: 2,  src: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=600&q=85&auto=format&fit=crop", span: 1, label: "Chef at work",          color: "#1a1410" },
  { id: 3,  src: "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=85&auto=format&fit=crop", span: 1, label: "Duck confit",            color: "#1e1510" },
  { id: 4,  src: "https://images.unsplash.com/photo-1541014741259-de529411b96a?w=600&q=85&auto=format&fit=crop", span: 1, label: "Burrata starter",       color: "#221a12" },
  { id: 5,  src: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=900&q=85&auto=format&fit=crop", span: 2, label: "Wine cellar",           color: "#16100c" },
  { id: 6,  src: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=600&q=85&auto=format&fit=crop", span: 1, label: "Cocktail hour",          color: "#1a1614" },
  { id: 7,  src: "https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?w=600&q=85&auto=format&fit=crop", span: 1, label: "Crème brûlée",          color: "#201a10" },
  { id: 8,  src: "https://images.unsplash.com/photo-1428515613728-6b4607e44363?w=600&q=85&auto=format&fit=crop", span: 1, label: "Table setting",         color: "#1a1612" },
  { id: 9,  src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=85&auto=format&fit=crop", span: 1, label: "Seared scallops",        color: "#1c1410" },
  { id: 10, src: "https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=900&q=85&auto=format&fit=crop", span: 2, label: "Private dining",        color: "#18120e" },
  { id: 11, src: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=600&q=85&auto=format&fit=crop", span: 1, label: "Mushroom risotto",      color: "#1e1810" },
  { id: 12, src: "https://images.unsplash.com/photo-1567327894473-19b72c8f63f0?w=600&q=85&auto=format&fit=crop", span: 1, label: "Chocolate fondant",     color: "#1a1010" },
];

// ─── Image with fallback ───────────────────────────────────────────────────────
function GalleryImage({ src, alt, fallbackColor, style, animate, transition }) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError]   = useState(false);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%", background: fallbackColor || "#1a1410" }}>
      {!error && (
        <motion.img
          src={src}
          alt={alt}
          animate={animate}
          transition={transition}
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          style={{
            ...style,
            opacity: loaded ? 1 : 0,
            transition: "opacity 0.5s ease",
          }}
        />
      )}
      {error && (
        <div
          style={{
            width: "100%",
            height: "100%",
            background: `linear-gradient(135deg, ${fallbackColor || "#1a1410"}, #0a0806)`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
          }}
        >
          <span style={{ fontSize: "28px", opacity: 0.4 }}>🍽</span>
          <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "13px", fontStyle: "italic", color: "rgba(201,169,110,0.5)" }}>
            {alt}
          </span>
        </div>
      )}
    </div>
  );
}

// ─── Lightbox ─────────────────────────────────────────────────────────────────
function Lightbox({ image, onClose, onPrev, onNext }) {
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape")     onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft")  onPrev();
    };
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
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
        background: "rgba(8,6,4,0.97)",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "clamp(16px, 4vw, 40px)",
        backdropFilter: "blur(16px)",
      }}
    >
      <motion.div
        initial={{ scale: 0.88, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          maxWidth: "min(900px, 90vw)",
          width: "100%",
          borderRadius: "2px",
          overflow: "hidden",
          border: "1px solid rgba(201,169,110,0.15)",
          boxShadow: "0 40px 100px rgba(0,0,0,0.9)",
        }}
      >
        <GalleryImage
          src={image.src}
          alt={image.label}
          fallbackColor={image.color}
          style={{ width: "100%", maxHeight: "75vh", objectFit: "cover", display: "block" }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 0, left: 0, right: 0,
            padding: "20px 24px",
            background: "linear-gradient(to top, rgba(8,6,4,0.95), transparent)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "18px", fontWeight: 300, fontStyle: "italic", color: "#E8D5B0" }}>
            {image.label}
          </span>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(245,240,232,0.25)" }}>
            La Maison
          </span>
        </div>
      </motion.div>

      {/* Prev / Next — repositioned on mobile */}
      {[
        { label: "←", action: onPrev, side: "left" },
        { label: "→", action: onNext, side: "right" },
      ].map(({ label, action, side }) => (
        <motion.button
          key={label}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.92 }}
          onClick={(e) => { e.stopPropagation(); action(); }}
          style={{
            position: "absolute",
            [side]: "clamp(8px, 2vw, 20px)",
            top: "50%",
            transform: "translateY(-50%)",
            background: "rgba(201,169,110,0.1)",
            border: "1px solid rgba(201,169,110,0.25)",
            borderRadius: "50%",
            width: "clamp(36px, 5vw, 48px)",
            height: "clamp(36px, 5vw, 48px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#C9A96E",
            fontSize: "clamp(14px, 2vw, 18px)",
            cursor: "pointer",
            outline: "none",
            zIndex: 10,
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
          top: "clamp(12px, 2vw, 24px)",
          right: "clamp(12px, 2vw, 24px)",
          background: "rgba(201,169,110,0.1)",
          border: "1px solid rgba(201,169,110,0.2)",
          borderRadius: "50%",
          width: "40px",
          height: "40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#C9A96E",
          fontSize: "14px",
          cursor: "pointer",
          outline: "none",
          zIndex: 10,
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

  useEffect(() => {
    const el = tileRef.current;
    gsap.fromTo(
      el,
      { opacity: 0, y: 40, scale: 0.97 },
      {
        opacity: 1, y: 0, scale: 1,
        duration: 0.9,
        ease: "power3.out",
        delay: (index % 4) * 0.08,
        scrollTrigger: { trigger: el, start: "top 92%" },
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
        border: `1px solid ${hovered ? "rgba(201,169,110,0.35)" : "rgba(201,169,110,0.08)"}`,
        aspectRatio: image.span === 2 ? "16/9" : "4/5",
        transition: "border-color 0.3s, box-shadow 0.3s",
        boxShadow: hovered ? "0 8px 40px rgba(0,0,0,0.5)" : "none",
      }}
    >
      <GalleryImage
        src={image.src}
        alt={image.label}
        fallbackColor={image.color}
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
          background: "rgba(8,6,4,0.55)",
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
        <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "15px", fontStyle: "italic", fontWeight: 300, color: "#E8D5B0" }}>
          {image.label}
        </span>
      </motion.div>

      {/* Always-visible label on mobile (no hover) */}
      <div
        style={{
          position: "absolute",
          bottom: 0, left: 0, right: 0,
          padding: "12px 14px",
          background: "linear-gradient(to top, rgba(8,6,4,0.85), transparent)",
          pointerEvents: "none",
        }}
        className="gallery-tile-label"
      >
        <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "13px", fontStyle: "italic", color: "rgba(232,213,176,0.7)" }}>
          {image.label}
        </span>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function GalleryMasonry() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const [lightbox, setLightbox] = useState(null);

  const openLightbox  = (i) => setLightbox(i);
  const closeLightbox = ()  => setLightbox(null);
  const prevImage     = ()  => setLightbox((i) => (i - 1 + IMAGES.length) % IMAGES.length);
  const nextImage     = ()  => setLightbox((i) => (i + 1) % IMAGES.length);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current.children, {
        y: 40, opacity: 0, stagger: 0.12, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: headingRef.current, start: "top 85%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <style>{`
        /* ── Desktop: 3-col masonry ── */
        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }
        /* ── Tablet: 2-col ── */
        @media (max-width: 900px) {
          .gallery-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .gallery-grid > div[style*="span 2"] {
            grid-column: span 2 !important;
            aspect-ratio: 16/9 !important;
          }
        }
        /* ── Mobile: 1-col ── */
        @media (max-width: 600px) {
          .gallery-grid {
            grid-template-columns: 1fr;
            gap: 10px;
          }
          .gallery-grid > div {
            grid-column: span 1 !important;
            aspect-ratio: 4/3 !important;
          }
        }

        /* Hide hover label on desktop (hover overlay handles it) */
        @media (hover: hover) {
          .gallery-tile-label { display: none; }
        }

        .gallery-header-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          flex-wrap: wrap;
          gap: 24px;
        }
      `}</style>

      <section
        ref={sectionRef}
        style={{
          background: "#0A0806",
          padding: "clamp(60px, 8vw, 100px) clamp(20px, 5vw, 80px) clamp(60px, 8vw, 120px)",
        }}
      >
        {/* ── Heading ── */}
        <div ref={headingRef} style={{ marginBottom: "clamp(36px, 5vw, 60px)" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
            <span style={{ display: "block", width: "32px", height: "1px", background: "#C9A96E" }} />
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: "#C9A96E" }}>
              Our space
            </span>
          </div>

          <div className="gallery-header-row">
            <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(36px, 5vw, 72px)", fontWeight: 300, color: "#F5F0E8", margin: 0, lineHeight: 1.05 }}>
              A feast for
              <br />
              <em style={{ fontStyle: "italic", color: "#E8D5B0" }}>the eyes</em>
            </h2>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 300, color: "rgba(245,240,232,0.4)", maxWidth: "320px", lineHeight: 1.75, margin: 0 }}>
              From our intimate dining room to the open kitchen — every detail is designed to stay with you long after the meal.
            </p>
          </div>
        </div>

        {/* ── Grid ── */}
        <div className="gallery-grid">
          {IMAGES.map((image, i) => (
            <GalleryTile key={image.id} image={image} index={i} onOpen={openLightbox} />
          ))}
        </div>

        {/* ── Bottom CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8 }}
          style={{ marginTop: "clamp(36px, 5vw, 64px)", display: "flex", alignItems: "center", justifyContent: "center", gap: "20px", flexDirection: "column" }}
        >
          <span style={{ display: "block", width: "1px", height: "40px", background: "linear-gradient(to bottom, transparent, rgba(201,169,110,0.4))" }} />
          <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "18px", fontStyle: "italic", fontWeight: 300, color: "rgba(245,240,232,0.35)", margin: 0, textAlign: "center" }}>
            {IMAGES.length} images · Tap to explore
          </p>
        </motion.div>
      </section>

      <AnimatePresence>
        {lightbox !== null && (
          <Lightbox image={IMAGES[lightbox]} onClose={closeLightbox} onPrev={prevImage} onNext={nextImage} />
        )}
      </AnimatePresence>
    </>
  );
}