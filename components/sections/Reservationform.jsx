"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─── Config ───────────────────────────────────────────────────────────────────
const TIME_SLOTS    = ["18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30"];
const GUEST_OPTIONS = [1, 2, 3, 4, 5, 6, 7, 8];
const STEPS         = ["Date & Guests", "Time", "Details", "Confirm"];

// ─── Framer variants ──────────────────────────────────────────────────────────
const stepVariants = {
  enter:  (dir) => ({ x: dir > 0 ? 60  : -60, opacity: 0 }),
  center:           { x: 0, opacity: 1, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
  exit:   (dir) => ({ x: dir > 0 ? -60 : 60,  opacity: 0, transition: { duration: 0.3, ease: "easeIn" } }),
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
function getTodayString() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split("T")[0];
}

// ─── Step indicator ───────────────────────────────────────────────────────────
function StepIndicator({ current }) {
  return (
    <div style={{ display: "flex", alignItems: "center", marginBottom: "clamp(28px, 4vw, 48px)", overflowX: "auto" }}>
      {STEPS.map((label, i) => {
        const done   = i < current;
        const active = i === current;
        return (
          <div key={label} style={{ display: "flex", alignItems: "center", flex: i < STEPS.length - 1 ? 1 : "none", minWidth: 0 }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px", flexShrink: 0 }}>
              <motion.div
                animate={{
                  background: done || active ? "#C9A96E" : "transparent",
                  borderColor: done || active ? "#C9A96E" : "rgba(201,169,110,0.25)",
                  scale: active ? 1.1 : 1,
                }}
                transition={{ duration: 0.3 }}
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  border: "1px solid",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "11px",
                  fontWeight: 500,
                  color: done || active ? "#0F0D0A" : "rgba(245,240,232,0.3)",
                  flexShrink: 0,
                }}
              >
                {done ? "✓" : i + 1}
              </motion.div>
              <span
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "clamp(7px, 1.5vw, 9px)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: active ? "#C9A96E" : "rgba(245,240,232,0.25)",
                  whiteSpace: "nowrap",
                }}
              >
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <motion.div
                animate={{ background: done ? "#C9A96E" : "rgba(201,169,110,0.15)" }}
                transition={{ duration: 0.4 }}
                style={{ flex: 1, height: "1px", margin: "0 6px", marginBottom: "22px", minWidth: "12px" }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Styled input ─────────────────────────────────────────────────────────────
function FieldInput({ label, type = "text", value, onChange, min, placeholder }) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "10px", fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase", color: focused ? "#C9A96E" : "rgba(245,240,232,0.4)", transition: "color 0.2s" }}>
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        min={min}
        placeholder={placeholder}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          background: "rgba(245,240,232,0.04)",
          border: `1px solid ${focused ? "rgba(201,169,110,0.6)" : "rgba(201,169,110,0.15)"}`,
          borderRadius: "2px",
          padding: "14px 16px",
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "14px",
          fontWeight: 300,
          color: "#F5F0E8",
          outline: "none",
          transition: "border-color 0.2s",
          width: "100%",
          colorScheme: "dark",
          WebkitAppearance: "none",
        }}
      />
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function ReservationForm() {
  const sectionRef = useRef(null);
  const leftRef    = useRef(null);
  const formRef    = useRef(null);

  const [step, setStep]           = useState(0);
  const [direction, setDir]       = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    date: "", guests: 2, time: "",
    name: "", email: "", phone: "", notes: "",
  });

  const update = (key, val) => setForm((p) => ({ ...p, [key]: val }));

  function goNext() { setDir(1);  setStep((s) => Math.min(s + 1, STEPS.length - 1)); }
  function goBack() { setDir(-1); setStep((s) => Math.max(s - 1, 0)); }
  function handleSubmit() { setSubmitted(true); }

  // Validation — basic
  const canProceed = [
    form.date,
    form.time,
    form.name && form.email,
    true,
  ][step];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(leftRef.current, {
        x: -50, opacity: 0, duration: 1.2, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      });
      gsap.from(formRef.current, {
        x: 50, opacity: 0, duration: 1.2, ease: "power3.out", delay: 0.15,
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <style>{`
        input[type="date"]::-webkit-calendar-picker-indicator {
          filter: invert(0.6) sepia(1) saturate(2) hue-rotate(5deg);
          cursor: pointer;
        }
        .slot-btn  { background: none; cursor: pointer; outline: none; transition: all 0.2s; }
        .guest-btn { background: none; cursor: pointer; outline: none; }
        textarea   { resize: none; }
        textarea:focus { outline: none; }

        /* ── Reservation layout responsive ── */
        .res-layout {
          display: flex;
          gap: clamp(32px, 6vw, 80px);
          align-items: flex-start;
          flex-wrap: wrap;
        }

        .res-left {
          flex: 0 0 clamp(260px, 30vw, 340px);
          max-width: 340px;
        }

        .res-right {
          flex: 1 1 340px;
          max-width: 580px;
          min-width: 0;
        }

        /* ── On mobile stack vertically ── */
        @media (max-width: 768px) {
          .res-left {
            flex: 1 1 100%;
            max-width: 100%;
          }
          .res-right {
            flex: 1 1 100%;
            max-width: 100%;
          }
        }

        /* ── Time slot grid ── */
        .time-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
          gap: 10px;
        }
        @media (max-width: 400px) {
          .time-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        /* ── Guest buttons ── */
        .guest-grid {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        /* ── Nav buttons ── */
        .form-nav {
          display: flex;
          gap: 12px;
          margin-top: 36px;
          padding-top: 24px;
          border-top: 1px solid rgba(201,169,110,0.1);
        }
        @media (max-width: 480px) {
          .form-nav {
            flex-direction: column-reverse;
          }
          .form-nav button {
            width: 100% !important;
            justify-content: center;
          }
        }

        /* ── Contact info items ── */
        .contact-item {
          display: flex;
          gap: 16px;
          margin-bottom: 20px;
          padding-bottom: 20px;
          border-bottom: 1px solid rgba(201,169,110,0.08);
        }
      `}</style>

      <section
        ref={sectionRef}
        style={{ background: "#0D0B08", padding: "clamp(60px, 8vw, 100px) clamp(20px, 5vw, 80px) clamp(60px, 8vw, 120px)" }}
      >
        <div className="res-layout">

          {/* ── LEFT: info panel ── */}
          <div ref={leftRef} className="res-left">
            <div style={{ display: "inline-flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
              <span style={{ display: "block", width: "32px", height: "1px", background: "#C9A96E" }} />
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: "#C9A96E" }}>
                Reservations
              </span>
            </div>

            <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(32px, 4vw, 56px)", fontWeight: 300, color: "#F5F0E8", lineHeight: 1.1, margin: "0 0 24px" }}>
              Reserve your
              <br />
              <em style={{ fontStyle: "italic", color: "#E8D5B0" }}>evening</em>
            </h2>

            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", fontWeight: 300, lineHeight: 1.75, color: "rgba(245,240,232,0.5)", margin: "0 0 36px" }}>
              Tables fill quickly on weekends. We hold reservations for 15 minutes — please call if you're running late.
            </p>

            {[
              { label: "Phone",   value: "+44 20 7946 0123" },
              { label: "Hours",   value: "Tue–Sun  6 PM – 11 PM" },
              { label: "Address", value: "14 Maison Lane, London EC1" },
            ].map(({ label, value }) => (
              <div key={label} className="contact-item">
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "10px", fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase", color: "#C9A96E", minWidth: "56px", paddingTop: "2px" }}>
                  {label}
                </span>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 300, color: "rgba(245,240,232,0.6)", lineHeight: 1.5 }}>
                  {value}
                </span>
              </div>
            ))}
          </div>

          {/* ── RIGHT: form card ── */}
          <div
            ref={formRef}
            className="res-right"
            style={{
              background: "#161412",
              border: "1px solid rgba(201,169,110,0.12)",
              borderRadius: "4px",
              padding: "clamp(24px, 4vw, 48px)",
            }}
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                /* ── Success ── */
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  style={{ textAlign: "center", padding: "clamp(20px, 4vw, 40px) 0" }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    style={{ width: "64px", height: "64px", borderRadius: "50%", border: "1px solid #C9A96E", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px", fontSize: "24px", color: "#C9A96E" }}
                  >
                    ✓
                  </motion.div>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(24px, 4vw, 32px)", fontWeight: 300, color: "#F5F0E8", margin: "0 0 12px" }}>
                    Table Reserved
                  </h3>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 300, color: "rgba(245,240,232,0.5)", lineHeight: 1.7 }}>
                    A confirmation has been sent to <span style={{ color: "#C9A96E" }}>{form.email}</span>.
                    <br />We look forward to welcoming you.
                  </p>
                  <div style={{ marginTop: "28px", padding: "20px", background: "rgba(201,169,110,0.06)", border: "1px solid rgba(201,169,110,0.15)", borderRadius: "2px" }}>
                    {[
                      { label: "Date",   value: form.date },
                      { label: "Time",   value: form.time },
                      { label: "Guests", value: `${form.guests} ${form.guests === 1 ? "guest" : "guests"}` },
                    ].map(({ label, value }) => (
                      <div key={label} style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(245,240,232,0.35)" }}>{label}</span>
                        <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "16px", color: "#E8D5B0" }}>{value}</span>
                      </div>
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => { setSubmitted(false); setStep(0); setForm({ date: "", guests: 2, time: "", name: "", email: "", phone: "", notes: "" }); }}
                    style={{ marginTop: "24px", background: "none", border: "1px solid rgba(201,169,110,0.3)", borderRadius: "2px", padding: "10px 28px", fontFamily: "'DM Sans', sans-serif", fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(245,240,232,0.45)", cursor: "pointer" }}
                  >
                    New Reservation
                  </motion.button>
                </motion.div>
              ) : (
                <motion.div key="form">
                  <StepIndicator current={step} />

                  <div style={{ overflow: "hidden", position: "relative" }}>
                    <AnimatePresence mode="wait" custom={direction}>

                      {/* ── STEP 0: Date & Guests ── */}
                      {step === 0 && (
                        <motion.div key="step0" custom={direction} variants={stepVariants} initial="enter" animate="center" exit="exit">
                          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                            <FieldInput
                              label="Date"
                              type="date"
                              value={form.date}
                              min={getTodayString()}
                              onChange={(e) => update("date", e.target.value)}
                            />
                            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                              <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "10px", fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(245,240,232,0.4)" }}>
                                Guests
                              </label>
                              <div className="guest-grid">
                                {GUEST_OPTIONS.map((n) => (
                                  <motion.button
                                    key={n}
                                    className="guest-btn"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => update("guests", n)}
                                    style={{
                                      width: "44px",
                                      height: "44px",
                                      border: `1px solid ${form.guests === n ? "#C9A96E" : "rgba(201,169,110,0.2)"}`,
                                      borderRadius: "2px",
                                      fontFamily: "'DM Sans', sans-serif",
                                      fontSize: "14px",
                                      color: form.guests === n ? "#0F0D0A" : "rgba(245,240,232,0.5)",
                                      background: form.guests === n ? "#C9A96E" : "transparent",
                                      transition: "all 0.2s",
                                    }}
                                  >
                                    {n}
                                  </motion.button>
                                ))}
                              </div>
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                              <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "10px", fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(245,240,232,0.4)" }}>
                                Special occasion
                              </label>
                              <textarea
                                value={form.notes}
                                onChange={(e) => update("notes", e.target.value)}
                                placeholder="Anniversary, birthday, dietary notes…"
                                rows={3}
                                style={{
                                  background: "rgba(245,240,232,0.04)",
                                  border: "1px solid rgba(201,169,110,0.15)",
                                  borderRadius: "2px",
                                  padding: "14px 16px",
                                  fontFamily: "'DM Sans', sans-serif",
                                  fontSize: "13px",
                                  fontWeight: 300,
                                  color: "#F5F0E8",
                                  width: "100%",
                                  colorScheme: "dark",
                                }}
                              />
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {/* ── STEP 1: Time slot ── */}
                      {step === 1 && (
                        <motion.div key="step1" custom={direction} variants={stepVariants} initial="enter" animate="center" exit="exit">
                          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "rgba(245,240,232,0.4)", marginBottom: "24px", lineHeight: 1.6 }}>
                            Select a time for <span style={{ color: "#C9A96E" }}>{form.guests} {form.guests === 1 ? "guest" : "guests"}</span> on{" "}
                            <span style={{ color: "#E8D5B0" }}>{form.date || "your chosen date"}</span>
                          </p>
                          <div className="time-grid">
                            {TIME_SLOTS.map((slot) => (
                              <motion.button
                                key={slot}
                                className="slot-btn"
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                onClick={() => update("time", slot)}
                                style={{
                                  padding: "14px 8px",
                                  border: `1px solid ${form.time === slot ? "#C9A96E" : "rgba(201,169,110,0.2)"}`,
                                  borderRadius: "2px",
                                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                                  fontSize: "18px",
                                  fontWeight: 300,
                                  color: form.time === slot ? "#0F0D0A" : "#E8D5B0",
                                  background: form.time === slot ? "#C9A96E" : "transparent",
                                  transition: "all 0.2s",
                                }}
                              >
                                {slot}
                              </motion.button>
                            ))}
                          </div>
                        </motion.div>
                      )}

                      {/* ── STEP 2: Contact details ── */}
                      {step === 2 && (
                        <motion.div key="step2" custom={direction} variants={stepVariants} initial="enter" animate="center" exit="exit">
                          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                            <FieldInput label="Full name"  value={form.name}  onChange={(e) => update("name",  e.target.value)} placeholder="Jane Smith" />
                            <FieldInput label="Email" type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="jane@example.com" />
                            <FieldInput label="Phone" type="tel"   value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="+44 7700 000000" />
                          </div>
                        </motion.div>
                      )}

                      {/* ── STEP 3: Confirm ── */}
                      {step === 3 && (
                        <motion.div key="step3" custom={direction} variants={stepVariants} initial="enter" animate="center" exit="exit">
                          <div style={{ background: "rgba(201,169,110,0.05)", border: "1px solid rgba(201,169,110,0.12)", borderRadius: "2px", padding: "clamp(16px, 3vw, 24px)", marginBottom: "20px" }}>
                            {[
                              { label: "Date",   value: form.date },
                              { label: "Time",   value: form.time },
                              { label: "Guests", value: `${form.guests}` },
                              { label: "Name",   value: form.name },
                              { label: "Email",  value: form.email },
                              { label: "Phone",  value: form.phone },
                              ...(form.notes ? [{ label: "Notes", value: form.notes }] : []),
                            ].map(({ label, value }) => (
                              <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px", marginBottom: "12px", paddingBottom: "12px", borderBottom: "1px solid rgba(201,169,110,0.08)" }}>
                                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(245,240,232,0.3)", paddingTop: "3px", flexShrink: 0 }}>{label}</span>
                                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 300, color: "#E8D5B0", textAlign: "right", wordBreak: "break-all" }}>{value}</span>
                              </div>
                            ))}
                          </div>
                          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", color: "rgba(245,240,232,0.3)", lineHeight: 1.7, margin: 0 }}>
                            By confirming, you agree to our cancellation policy. A confirmation email will be sent to{" "}
                            <span style={{ color: "rgba(201,169,110,0.6)" }}>{form.email}</span>.
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* ── Nav buttons ── */}
                  <div
                    className="form-nav"
                    style={{ justifyContent: step === 0 ? "flex-end" : "space-between" }}
                  >
                    {step > 0 && (
                      <motion.button
                        whileHover={{ x: -3 }}
                        onClick={goBack}
                        style={{
                          flex: "0 0 auto",
                          background: "none",
                          border: "1px solid rgba(201,169,110,0.2)",
                          borderRadius: "2px",
                          padding: "12px 28px",
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "11px",
                          fontWeight: 400,
                          letterSpacing: "0.12em",
                          textTransform: "uppercase",
                          color: "rgba(245,240,232,0.45)",
                          cursor: "pointer",
                          outline: "none",
                          transition: "all 0.2s",
                        }}
                      >
                        ← Back
                      </motion.button>
                    )}

                    {step < STEPS.length - 1 ? (
                      <motion.button
                        whileHover={{ scale: canProceed ? 1.03 : 1 }}
                        whileTap={{ scale: canProceed ? 0.97 : 1 }}
                        onClick={canProceed ? goNext : undefined}
                        style={{
                          flex: "0 0 auto",
                          background: canProceed ? "#C9A96E" : "rgba(201,169,110,0.2)",
                          border: "none",
                          borderRadius: "2px",
                          padding: "13px 36px",
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "11px",
                          fontWeight: 500,
                          letterSpacing: "0.14em",
                          textTransform: "uppercase",
                          color: canProceed ? "#0F0D0A" : "rgba(245,240,232,0.25)",
                          cursor: canProceed ? "pointer" : "not-allowed",
                          outline: "none",
                          transition: "all 0.25s",
                        }}
                      >
                        Continue →
                      </motion.button>
                    ) : (
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={handleSubmit}
                        style={{
                          flex: "0 0 auto",
                          background: "#C9A96E",
                          border: "none",
                          borderRadius: "2px",
                          padding: "13px 36px",
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "11px",
                          fontWeight: 500,
                          letterSpacing: "0.14em",
                          textTransform: "uppercase",
                          color: "#0F0D0A",
                          cursor: "pointer",
                          outline: "none",
                        }}
                      >
                        Confirm Reservation
                      </motion.button>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </section>
    </>
  );
}