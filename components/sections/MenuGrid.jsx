"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";


gsap.registerPlugin(ScrollTrigger);

// ─── Sample data (replace with your MongoDB fetch) ──────────────────────────
const CATEGORIES = ["All", "Starters", "Mains", "Desserts", "Drinks"];
 
const DISHES = [
  { id: 1, name: "Burrata & Heritage Tomato", category: "Starters", price: 18, tag: "Chef's pick", image: "https://images.unsplash.com/photo-1541014741259-de529411b96a?w=600&q=80" },
  { id: 2, name: "Seared Scallops", category: "Starters", price: 24, tag: "Seasonal", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80" },
  { id: 3, name: "Duck Liver Parfait", category: "Starters", price: 16, tag: null, image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80" },
  { id: 4, name: "Truffle Duck Confit", category: "Mains", price: 42, tag: "Signature", image: "https://images.unsplash.com/photo-1546833998-877b37c2e5c6?w=600&q=80" },
  { id: 5, name: "Wagyu Striploin 200g", category: "Mains", price: 68, tag: "Premium", image: "https://images.unsplash.com/photo-1558030006-450675393462?w=600&q=80" },
  { id: 6, name: "Pan-roasted Sea Bass", category: "Mains", price: 38, tag: null, image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600&q=80" },
  { id: 7, name: "Wild Mushroom Risotto", category: "Mains", price: 32, tag: "Vegetarian", image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=600&q=80" },
  { id: 8, name: "Crème Brûlée", category: "Desserts", price: 14, tag: "Classic", image: "https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?w=600&q=80" },
  { id: 9, name: "Dark Chocolate Fondant", category: "Desserts", price: 16, tag: "Chef's pick", image: "https://images.unsplash.com/photo-1567327894473-19b72c8f63f0?w=600&q=80" },
  { id: 10, name: "Elderflower Martini", category: "Drinks", price: 18, tag: "Signature", image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=600&q=80" },
  { id: 11, name: "Aged Negroni", category: "Drinks", price: 16, tag: null, image: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=600&q=80" },
  { id: 12, name: "Sommelier Wine Flight", category: "Drinks", price: 48, tag: "Pairing", image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=600&q=80" },
];

// ─── Framer variants ─────────────────────────────────────────────────────────
const cardVariants = {
  hidden:  { opacity: 0, y: 32, scale: 0.96 },
  visible: { opacity: 1, y: 0,  scale: 1,    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
  exit:    { opacity: 0, y: -20, scale: 0.95, transition: { duration: 0.3, ease: "easeIn" } },
};
 
const containerVariants = {
  visible: { transition: { staggerChildren: 0.07 } },
};
 
// ─── DishCard ────────────────────────────────────────────────────────────────
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
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: hovered ? "rgba(201,169,110,0.4)" : "rgba(201,169,110,0.12)",
  cursor: "pointer",
  transition: "border-color 0.3s",
}}
    >
      {/* Image */}
      <div style={{ position: "relative", overflow: "hidden", height: "220px" }}>
        <motion.img
          src={dish.image}
          alt={dish.name}
          animate={{ scale: hovered ? 1.07 : 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
        {/* Overlay on hover */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(15,13,10,0.45)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "11px",
              fontWeight: 500,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#C9A96E",
              padding: "8px 20px",
              border: "1px solid rgba(201,169,110,0.5)",
              borderRadius: "2px",
            }}
          >
            View Details
          </span>
        </motion.div>
 
        {/* Tag badge */}
        {dish.tag && (
          <div
            style={{
              position: "absolute",
              top: "14px",
              left: "14px",
              background: "rgba(15,13,10,0.85)",
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
            }}
          >
            {dish.tag}
          </div>
        )}
      </div>
 
      {/* Content */}
      <div style={{ padding: "20px" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "12px" }}>
          <h3
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "20px",
              fontWeight: 400,
              color: "#F5F0E8",
              lineHeight: 1.2,
              margin: 0,
            }}
          >
            {dish.name}
          </h3>
          <span
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "20px",
              fontWeight: 300,
              color: "#C9A96E",
              flexShrink: 0,
            }}
          >
            £{dish.price}
          </span>
        </div>
 
        <div
          style={{
            marginTop: "14px",
            paddingTop: "14px",
            borderTop: "1px solid rgba(201,169,110,0.1)",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <span
            style={{
              display: "block",
              width: "16px",
              height: "1px",
              background: "#C9A96E",
              opacity: 0.5,
            }}
          />
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "10px",
              fontWeight: 400,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "rgba(245,240,232,0.35)",
            }}
          >
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
  const sectionRef  = useRef(null);
  const headingRef  = useRef(null);
  const filterRef   = useRef(null);
 
  const filtered = activeCategory === "All"
    ? DISHES
    : DISHES.filter((d) => d.category === activeCategory);
 
  // GSAP scroll reveal for section heading + filter bar
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 85%",
        },
      });
      gsap.from(filterRef.current, {
        y: 24,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.2,
        scrollTrigger: {
          trigger: filterRef.current,
          start: "top 88%",
        },
      });
    }, sectionRef);
 
    return () => ctx.revert();
  }, []);
 
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');
        .filter-btn { background: none; cursor: pointer; border: none; outline: none; }
        .filter-btn:focus-visible { outline: 1px solid #C9A96E; }
      `}</style>
 
      <section
        ref={sectionRef}
        style={{
          background: "#0F0D0A",
          padding: "100px max(40px, 5vw) 120px",
          minHeight: "100vh",
        }}
      >
        {/* ── Section heading ── */}
        <div ref={headingRef} style={{ marginBottom: "60px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "20px",
            }}
          >
            <span style={{ display: "block", width: "32px", height: "1px", background: "#C9A96E" }} />
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "11px",
                fontWeight: 500,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#C9A96E",
              }}
            >
              Seasonal menu
            </span>
          </div>
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
            Crafted with
            <br />
            <em style={{ fontStyle: "italic", color: "#E8D5B0" }}>intention</em>
          </h2>
        </div>
 
        {/* ── Filter tabs ── */}
        <div
          ref={filterRef}
          style={{
            display: "flex",
            gap: "4px",
            marginBottom: "52px",
            flexWrap: "wrap",
          }}
        >
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                className="filter-btn"
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: "9px 22px",
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
                }}
              >
                {cat}
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
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "24px",
          }}
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
            marginTop: "64px",
            paddingTop: "40px",
            borderTop: "1px solid rgba(201,169,110,0.1)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "12px",
              color: "rgba(245,240,232,0.3)",
              margin: 0,
              letterSpacing: "0.05em",
            }}
          >
            Menu changes weekly · All prices include VAT · Please inform us of any allergies
          </p>
          <span
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "13px",
              fontStyle: "italic",
              color: "rgba(201,169,110,0.45)",
            }}
          >
            {filtered.length} dishes
          </span>
        </div>
      </section>
    </>
  );
}