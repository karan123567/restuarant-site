"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─── Sample data ──────────────────────────────────────────────────────────────
const CATEGORIES = ["All", "Starters", "Mains", "Desserts", "Drinks"];

const DISHES = [
  { id: 1,  name: "Burrata & Heritage Tomato",  category: "Starters", price: 18, tag: "Chef's pick", color: "#221a12", emoji: "🧀", image: "https://images.unsplash.com/photo-1541014741259-de529411b96a?w=600&q=80&auto=format&fit=crop" },
  { id: 2,  name: "Seared Scallops",             category: "Starters", price: 24, tag: "Seasonal",   color: "#1c1814", emoji: "🫧", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80&auto=format&fit=crop" },
  { id: 3,  name: "Duck Liver Parfait",          category: "Starters", price: 16, tag: null,          color: "#1e1510", emoji: "🍴", image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80&auto=format&fit=crop" },
  { id: 4,  name: "Truffle Duck Confit",         category: "Mains",    price: 42, tag: "Signature",  color: "#1a1208", emoji: "🦆", image: "https://images.unsplash.com/photo-1546833998-877b37c2e5c6?w=600&q=80&auto=format&fit=crop" },
  { id: 5,  name: "Wagyu Striploin 200g",        category: "Mains",    price: 68, tag: "Premium",    color: "#180e08", emoji: "🥩", image: "https://images.unsplash.com/photo-1558030006-450675393462?w=600&q=80&auto=format&fit=crop" },
  { id: 6,  name: "Pan-roasted Sea Bass",        category: "Mains",    price: 38, tag: null,          color: "#121820", emoji: "🐟", image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600&q=80&auto=format&fit=crop" },
  { id: 7,  name: "Wild Mushroom Risotto",       category: "Mains",    price: 32, tag: "Vegetarian", color: "#1a1810", emoji: "🍄", image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=600&q=80&auto=format&fit=crop" },
  { id: 8,  name: "Crème Brûlée",                category: "Desserts", price: 14, tag: "Classic",    color: "#201a0a", emoji: "🍮", image: "https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?w=600&q=80&auto=format&fit=crop" },
  { id: 9,  name: "Dark Chocolate Fondant",      category: "Desserts", price: 16, tag: "Chef's pick", color: "#140e0a", emoji: "🍫", image: "https://images.unsplash.com/photo-1567327894473-19b72c8f63f0?w=600&q=80&auto=format&fit=crop" },
  { id: 10, name: "Elderflower Martini",         category: "Drinks",   price: 18, tag: "Signature",  color: "#141a10", emoji: "🍸", image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=600&q=80&auto=format&fit=crop" },
  { id: 11, name: "Aged Negroni",                category: "Drinks",   price: 16, tag: null,          color: "#1a1008", emoji: "🥃", image: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=600&q=80&auto=format&fit=crop" },
  { id: 12, name: "Sommelier Wine Flight",       category: "Drinks",   price: 48, tag: "Pairing",    color: "#180e14", emoji: "🍷", image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=600&q=80&auto=format&fit=crop" },
];

// ─── Framer variants ──────────────────────────────────────────────────────────
const cardVariants = {
  hidden:  { opacity: 0, y: 32, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
  exit:    { opacity: 0, y: -20, scale: 0.95, transition: { duration: 0.3, ease: "easeIn" } },
};

const containerVariants = {
  visible: { transition: { staggerChildren: 0.07 } },
};

// ─── Dish image with fallback ─────────────────────────────────────────────────
function DishImage({ src, alt, color, emoji, hovered }) {
  const [loaded, setLoaded] = useState(false);
  const [error,  setError]  = useState(false);

  return (
    <div style={{ position: "relative", overflow: "hidden", height: "220px", background: color || "#161412" }}>
      {!error && (
        <motion.img
          src={src}
          alt={alt}
          animate={{ scale: hovered ? 1.07 : 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
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
            background: `linear-gradient(145deg, ${color}, #0a0806)`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
          }}
        >
          <span style={{ fontSize: "36px", filter: "grayscale(0.3)" }}>{emoji}</span>
          <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "13px", fontStyle: "italic", color: "rgba(201,169,110,0.6)", textAlign: "center", padding: "0 16px" }}>
            {alt}
          </span>
        </div>
      )}

      {/* Hover overlay */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(15,13,10,0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
        }}
      >
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: "#C9A96E", padding: "8px 20px", border: "1px solid rgba(201,169,110,0.5)", borderRadius: "2px" }}>
          View Details
        </span>
      </motion.div>
    </div>
  );
}

// ─── DishCard ─────────────────────────────────────────────────────────────────
function DishCard({ dish }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      layout
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        position: "relative",
        borderRadius: "4px",
        overflow: "hidden",
        background: "#161412",
        border: `1px solid ${hovered ? "rgba(201,169,110,0.4)" : "rgba(201,169,110,0.12)"}`,
        cursor: "pointer",
        transition: "border-color 0.3s, box-shadow 0.3s",
        boxShadow: hovered ? "0 8px 40px rgba(0,0,0,0.5)" : "none",
      }}
    >
      {/* Tag badge */}
      {dish.tag && (
        <div style={{
          position: "absolute",
          top: "14px", left: "14px", zIndex: 10,
          background: "rgba(15,13,10,0.88)",
          border: "1px solid rgba(201,169,110,0.35)",
          borderRadius: "2px",
          padding: "4px 10px",
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "9px",
          fontWeight: 500,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: "#C9A96E",
          backdropFilter: "blur(8px)",
        }}>
          {dish.tag}
        </div>
      )}

      <DishImage
        src={dish.image}
        alt={dish.name}
        color={dish.color}
        emoji={dish.emoji}
        hovered={hovered}
      />

      {/* Content */}
      <div style={{ padding: "20px" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "12px" }}>
          <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "20px", fontWeight: 400, color: "#F5F0E8", lineHeight: 1.2, margin: 0 }}>
            {dish.name}
          </h3>
          <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "20px", fontWeight: 300, color: "#C9A96E", flexShrink: 0 }}>
            £{dish.price}
          </span>
        </div>
        <div style={{ marginTop: "14px", paddingTop: "14px", borderTop: "1px solid rgba(201,169,110,0.1)", display: "flex", alignItems: "center", gap: "6px" }}>
          <span style={{ display: "block", width: "16px", height: "1px", background: "#C9A96E", opacity: 0.5 }} />
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "10px", fontWeight: 400, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(245,240,232,0.35)" }}>
            {dish.category}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function MenuGrid() {
  const [activeCategory, setActiveCategory] = useState("All");
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const filterRef  = useRef(null);

  const filtered = activeCategory === "All"
    ? DISHES
    : DISHES.filter((d) => d.category === activeCategory);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        y: 50, opacity: 0, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: headingRef.current, start: "top 85%" },
      });
      gsap.from(filterRef.current, {
        y: 24, opacity: 0, duration: 0.8, ease: "power3.out", delay: 0.2,
        scrollTrigger: { trigger: filterRef.current, start: "top 88%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <style>{`
        .filter-btn { background: none; cursor: pointer; border: none; outline: none; }
        .filter-btn:focus-visible { outline: 1px solid #C9A96E; }

        /* ── Filter scroll on mobile ── */
        .filter-bar {
          display: flex;
          gap: 6px;
          margin-bottom: 52px;
          flex-wrap: wrap;
        }
        @media (max-width: 600px) {
          .filter-bar {
            flex-wrap: nowrap;
            overflow-x: auto;
            padding-bottom: 8px;
            margin-bottom: 36px;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
          }
          .filter-bar::-webkit-scrollbar { display: none; }
          .filter-btn { flex-shrink: 0; }
        }

        /* ── Menu grid responsive ── */
        .menu-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 24px;
        }
        @media (max-width: 640px) {
          .menu-grid {
            grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
            gap: 16px;
          }
        }
        @media (max-width: 420px) {
          .menu-grid {
            grid-template-columns: 1fr;
            gap: 14px;
          }
        }

        /* ── Bottom note responsive ── */
        .menu-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 16px;
        }
        @media (max-width: 500px) {
          .menu-bottom {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>

      <section
        ref={sectionRef}
        style={{
          background: "#0F0D0A",
          padding: "clamp(60px, 8vw, 100px) clamp(20px, 5vw, 80px) clamp(60px, 8vw, 120px)",
          minHeight: "100vh",
        }}
      >
        {/* ── Section heading ── */}
        <div ref={headingRef} style={{ marginBottom: "clamp(36px, 5vw, 60px)" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
            <span style={{ display: "block", width: "32px", height: "1px", background: "#C9A96E" }} />
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: "#C9A96E" }}>
              Seasonal menu
            </span>
          </div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(36px, 5vw, 72px)", fontWeight: 300, color: "#F5F0E8", margin: 0, lineHeight: 1.05 }}>
            Crafted with
            <br />
            <em style={{ fontStyle: "italic", color: "#E8D5B0" }}>intention</em>
          </h2>
        </div>

        {/* ── Filter tabs ── */}
        <div ref={filterRef} className="filter-bar">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            const count = cat === "All" ? DISHES.length : DISHES.filter(d => d.category === cat).length;
            return (
              <button
                key={cat}
                className="filter-btn"
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: "9px 20px",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "11px",
                  fontWeight: 500,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: isActive ? "#0F0D0A" : "rgba(245,240,232,0.45)",
                  background: isActive ? "#C9A96E" : "transparent",
                  border: `1px solid ${isActive ? "#C9A96E" : "rgba(201,169,110,0.2)"}`,
                  borderRadius: "2px",
                  transition: "all 0.25s",
                  whiteSpace: "nowrap",
                }}
              >
                {cat}
                <span style={{ marginLeft: "6px", opacity: 0.6, fontSize: "9px" }}>{count}</span>
              </button>
            );
          })}
        </div>

        {/* ── Grid ── */}
        <motion.div
          layout
          variants={containerVariants}
          initial="visible"
          animate="visible"
          className="menu-grid"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((dish) => (
              <DishCard key={dish.id} dish={dish} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* ── Bottom note ── */}
        <div
          style={{
            marginTop: "clamp(36px, 5vw, 64px)",
            paddingTop: "clamp(20px, 3vw, 40px)",
            borderTop: "1px solid rgba(201,169,110,0.1)",
          }}
          className="menu-bottom"
        >
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "rgba(245,240,232,0.3)", margin: 0, letterSpacing: "0.05em", lineHeight: 1.7 }}>
            Menu changes weekly · All prices include VAT
            <br className="mobile-only" />
            {" "}· Please inform us of any allergies
          </p>
          <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "13px", fontStyle: "italic", color: "rgba(201,169,110,0.45)", flexShrink: 0 }}>
            {filtered.length} {filtered.length === 1 ? "dish" : "dishes"}
          </span>
        </div>
      </section>
    </>
  );
}