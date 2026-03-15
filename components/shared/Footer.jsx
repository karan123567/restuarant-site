"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

// ─── Nav links ───────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { label: "Home",         href: "/" },
  { label: "Menu",         href: "/menu" },
  { label: "Reservations", href: "/reservations" },
  { label: "Gallery",      href: "/gallery" },
  { label: "Events",       href: "/events" },
  { label: "About",        href: "/about" },
];

const LEGAL_LINKS = [
  { label: "Privacy Policy",    href: "/privacy" },
  { label: "Terms of Service",  href: "/terms" },
  { label: "Allergen Info",     href: "/allergens" },
];

const SOCIALS = [
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://facebook.com",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
      </svg>
    ),
  },
  {
    label: "TripAdvisor",
    href: "https://tripadvisor.com",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 8v4l3 3"/>
      </svg>
    ),
  },
];

// ─── Animated link ────────────────────────────────────────────────────────────
function FooterLink({ href, children }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        fontFamily: "'DM Sans', sans-serif",
        fontSize: "13px",
        fontWeight: 300,
        color: hovered ? "#E8D5B0" : "rgba(245,240,232,0.45)",
        transition: "color 0.25s",
        textDecoration: "none",
      }}
    >
      <motion.span
        animate={{ width: hovered ? "16px" : "0px", opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        style={{
          display: "block",
          height: "1px",
          background: "#C9A96E",
          flexShrink: 0,
          overflow: "hidden",
        }}
      />
      {children}
    </Link>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function Footer() {
  const footerRef    = useRef(null);
  const topBarRef    = useRef(null);
  const col1Ref      = useRef(null);
  const col2Ref      = useRef(null);
  const col3Ref      = useRef(null);
  const col4Ref      = useRef(null);
  const bottomRef    = useRef(null);
  const [email, setEmail]       = useState("");
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Divider line draws itself across
      gsap.from(topBarRef.current, {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
        },
      });

      // Columns stagger up
      gsap.from([col1Ref.current, col2Ref.current, col3Ref.current, col4Ref.current], {
        y: 40,
        opacity: 0,
        stagger: 0.12,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 85%",
        },
      });

      // Bottom bar fades in
      gsap.from(bottomRef.current, {
        opacity: 0,
        duration: 0.8,
        delay: 0.4,
        scrollTrigger: {
          trigger: bottomRef.current,
          start: "top 98%",
        },
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  function handleSubscribe(e) {
    e.preventDefault();
    if (email.trim()) setSubscribed(true);
  }

  return (
    <footer
      ref={footerRef}
      style={{
        background: "#080604",
        borderTop: "1px solid rgba(201,169,110,0.1)",
        paddingTop: "80px",
      }}
    >
      {/* ── Top gold divider line ── */}
      <div
        ref={topBarRef}
        style={{
          width: "100%",
          height: "1px",
          background: "linear-gradient(to right, #C9A96E, rgba(201,169,110,0.1))",
          marginBottom: "72px",
        }}
      />

      {/* ── Main columns ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "48px 40px",
          padding: "0 max(40px, 5vw) 72px",
        }}
      >
        {/* Col 1 — Brand */}
        <div ref={col1Ref}>
          <div
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "32px",
              fontWeight: 300,
              color: "#F5F0E8",
              letterSpacing: "0.04em",
              marginBottom: "20px",
              lineHeight: 1,
            }}
          >
            La{" "}
            <em style={{ fontStyle: "italic", color: "#C9A96E" }}>Maison</em>
          </div>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "13px",
              fontWeight: 300,
              color: "rgba(245,240,232,0.4)",
              lineHeight: 1.75,
              maxWidth: "240px",
              marginBottom: "28px",
            }}
          >
            Fine dining in the heart of the city. Seasonal menus, curated wine, and evenings worth remembering.
          </p>

          {/* Social icons */}
          <div style={{ display: "flex", gap: "12px" }}>
            {SOCIALS.map(({ label, href, icon }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.12, borderColor: "rgba(201,169,110,0.6)" }}
                whileTap={{ scale: 0.94 }}
                title={label}
                style={{
                  width: "38px",
                  height: "38px",
                  borderRadius: "50%",
                  borderWidth: "1px",
                  borderStyle: "solid",
                  borderColor: "rgba(201,169,110,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "rgba(201,169,110,0.6)",
                  transition: "color 0.25s",
                  textDecoration: "none",
                }}
              >
                {icon}
              </motion.a>
            ))}
          </div>
        </div>

        {/* Col 2 — Navigation */}
        <div ref={col2Ref}>
          <div
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "10px",
              fontWeight: 500,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#C9A96E",
              marginBottom: "24px",
            }}
          >
            Navigate
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            {NAV_LINKS.map(({ label, href }) => (
              <FooterLink key={label} href={href}>{label}</FooterLink>
            ))}
          </div>
        </div>

        {/* Col 3 — Contact & Hours */}
        <div ref={col3Ref}>
          <div
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "10px",
              fontWeight: 500,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#C9A96E",
              marginBottom: "24px",
            }}
          >
            Visit Us
          </div>

          {[
            {
              label: "Address",
              value: "14 Maison Lane\nLondon EC1A 1BB",
            },
            {
              label: "Hours",
              value: "Tue – Sun\n6:00 PM – 11:00 PM",
            },
            {
              label: "Reservations",
              value: "+44 20 7946 0123",
            },
            {
              label: "Email",
              value: "hello@lamaison.co",
            },
          ].map(({ label, value }) => (
            <div
              key={label}
              style={{
                display: "flex",
                gap: "14px",
                marginBottom: "18px",
                paddingBottom: "18px",
                borderBottom: "1px solid rgba(201,169,110,0.07)",
              }}
            >
              <span
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "9px",
                  fontWeight: 500,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "rgba(201,169,110,0.5)",
                  minWidth: "68px",
                  paddingTop: "2px",
                  flexShrink: 0,
                }}
              >
                {label}
              </span>
              <span
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "12px",
                  fontWeight: 300,
                  color: "rgba(245,240,232,0.55)",
                  lineHeight: 1.65,
                  whiteSpace: "pre-line",
                }}
              >
                {value}
              </span>
            </div>
          ))}
        </div>

        {/* Col 4 — Newsletter */}
        <div ref={col4Ref}>
          <div
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "10px",
              fontWeight: 500,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#C9A96E",
              marginBottom: "24px",
            }}
          >
            Stay in the loop
          </div>

          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "13px",
              fontWeight: 300,
              color: "rgba(245,240,232,0.4)",
              lineHeight: 1.7,
              marginBottom: "24px",
            }}
          >
            Seasonal menus, private events, and chef&apos;s table announcements — straight to your inbox.
          </p>

          {subscribed ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              style={{
                padding: "16px",
                borderWidth: "1px",
                borderStyle: "solid",
                borderColor: "rgba(201,169,110,0.25)",
                borderRadius: "2px",
                background: "rgba(201,169,110,0.06)",
              }}
            >
              <div
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: "17px",
                  fontStyle: "italic",
                  fontWeight: 300,
                  color: "#E8D5B0",
                  marginBottom: "4px",
                }}
              >
                You&apos;re on the list.
              </div>
              <div
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "11px",
                  color: "rgba(245,240,232,0.35)",
                }}
              >
                We&apos;ll be in touch soon.
              </div>
            </motion.div>
          ) : (
            <form onSubmit={handleSubscribe}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  style={{
                    background: "rgba(245,240,232,0.04)",
                    borderWidth: "1px",
                    borderStyle: "solid",
                    borderColor: "rgba(201,169,110,0.15)",
                    borderRadius: "2px",
                    padding: "12px 16px",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "13px",
                    fontWeight: 300,
                    color: "#F5F0E8",
                    outline: "none",
                    width: "100%",
                    colorScheme: "dark",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "rgba(201,169,110,0.5)")}
                  onBlur={(e)  => (e.target.style.borderColor = "rgba(201,169,110,0.15)")}
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    background: "transparent",
                    borderWidth: "1px",
                    borderStyle: "solid",
                    borderColor: "rgba(201,169,110,0.35)",
                    borderRadius: "2px",
                    padding: "12px",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "11px",
                    fontWeight: 500,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "#C9A96E",
                    cursor: "pointer",
                    transition: "background 0.25s, borderColor 0.25s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(201,169,110,0.08)";
                    e.currentTarget.style.borderColor = "rgba(201,169,110,0.6)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.borderColor = "rgba(201,169,110,0.35)";
                  }}
                >
                  Subscribe
                </motion.button>
              </div>
            </form>
          )}

          {/* Michelin / award badges */}
          <div
            style={{
              display: "flex",
              gap: "16px",
              marginTop: "36px",
              paddingTop: "28px",
              borderTop: "1px solid rgba(201,169,110,0.08)",
              flexWrap: "wrap",
            }}
          >
            {["Michelin Guide 2024", "AA Rosette", "Top 50 UK"].map((badge) => (
              <div
                key={badge}
                style={{
                  padding: "5px 12px",
                  borderWidth: "1px",
                  borderStyle: "solid",
                  borderColor: "rgba(201,169,110,0.18)",
                  borderRadius: "2px",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "9px",
                  fontWeight: 400,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "rgba(201,169,110,0.5)",
                }}
              >
                {badge}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Divider ── */}
      <div
        style={{
          margin: "0 max(40px, 5vw)",
          height: "1px",
          background: "rgba(201,169,110,0.08)",
        }}
      />

      {/* ── Bottom bar ── */}
      <div
        ref={bottomRef}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "16px",
          padding: "24px max(40px, 5vw) 32px",
        }}
      >
        <span
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "11px",
            fontWeight: 300,
            color: "rgba(245,240,232,0.2)",
            letterSpacing: "0.05em",
          }}
        >
          © {new Date().getFullYear()} La Maison. All rights reserved.
        </span>

        <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
          {LEGAL_LINKS.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "11px",
                fontWeight: 300,
                color: "rgba(245,240,232,0.2)",
                textDecoration: "none",
                letterSpacing: "0.05em",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(201,169,110,0.6)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(245,240,232,0.2)")}
            >
              {label}
            </Link>
          ))}
        </div>

        <div
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "12px",
            fontStyle: "italic",
            color: "rgba(201,169,110,0.25)",
            letterSpacing: "0.08em",
          }}
        >
          Crafted with care — London
        </div>
      </div>
    </footer>
  );
}