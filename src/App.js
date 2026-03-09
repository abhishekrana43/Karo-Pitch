import { useState, useEffect, useRef } from "react";

const COLORS = {
  bg: "#0A0A0F",
  bgCard: "#13131A",
  bgCardHover: "#1C1C27",
  accent: "#FF5C00",
  accentLight: "#FF7A2E",
  gold: "#FFB800",
  teal: "#00D4AA",
  white: "#F5F5F0",
  muted: "#8A8A9A",
  border: "#2A2A3A",
};

const styles = {
  "@import": "url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap')",
};

function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function AnimatedCounter({ target, suffix = "" }) {
  const [count, setCount] = useState(0);
  const [ref, visible] = useInView();
  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const step = target / 60;
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [visible, target]);
  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

const startups = [
  { name: "NourishKart", cat: "D2C Brand", city: "Jaipur", raise: "₹50L", desc: "Organic snack brand delivering rural superfoods to urban India.", color: "#FF5C00" },
  { name: "CraftNest", cat: "Consumer", city: "Varanasi", raise: "₹30L", desc: "Artisan handicraft marketplace connecting weavers to global buyers.", color: "#FFB800" },
  { name: "FarmStack", cat: "Agri-Tech", city: "Pune", raise: "₹1Cr", desc: "SaaS platform enabling precision farming for small landholders.", color: "#00D4AA" },
  { name: "BharatPay", cat: "FinTech", city: "Surat", raise: "₹75L", desc: "UPI-native B2B payment stack built for Tier-3 merchants.", color: "#7C6EFF" },
  { name: "MediVahan", cat: "HealthTech", city: "Bhopal", raise: "₹40L", desc: "Last-mile medicine delivery on electric 3-wheelers.", color: "#FF5C00" },
  { name: "SkillDuniya", cat: "EdTech", city: "Patna", raise: "₹60L", desc: "Vernacular vocational training for youth in non-metro cities.", color: "#FFB800" },
];

const investors = [
  { name: "Arjun Mehta", role: "Partner, Bharat Ventures", focus: "D2C & Consumer" },
  { name: "Priya Sharma", role: "Angel Investor", focus: "Deep Tech & SaaS" },
  { name: "Ravi Nair", role: "MD, Udyog Capital", focus: "MSME & Manufacturing" },
  { name: "Neha Gupta", role: "Founding Partner, Tier2 Fund", focus: "Bharat Startups" },
];

const steps = [
  { num: "01", title: "Apply with Pitch Deck", desc: "Submit a short application and your pitch deck. We review every submission personally.", icon: "📋" },
  { num: "02", title: "Get Shortlisted", desc: "Our expert team evaluates your startup and selects the strongest founders.", icon: "⭐" },
  { num: "03", title: "Pitch Live to Investors", desc: "Present in a curated closed-room session with India's top investors.", icon: "🎤" },
  { num: "04", title: "Raise & Scale", desc: "Secure funding, mentorship, and visibility to grow your startup.", icon: "🚀" },
];

const categories = [
  { icon: "🛍️", label: "D2C Brands" },
  { icon: "🏭", label: "Manufacturing" },
  { icon: "💻", label: "SaaS Startups" },
  { icon: "🧑‍🤝‍🧑", label: "Consumer Apps" },
  { icon: "🏪", label: "MSMEs" },
  { icon: "🌾", label: "Bharat Startups" },
];

export default function KaroPitch() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [activeNav, setActiveNav] = useState("");
  const [heroRef, heroVisible] = useInView(0.05);
  const [aboutRef, aboutVisible] = useInView(0.1);
  const [stepsRef, stepsVisible] = useInView(0.1);
  const [startupsRef, startupsVisible] = useInView(0.05);
  const [ctaRef, ctaVisible] = useInView(0.1);

  const sectionRefs = {
    About: useRef(null),
    "How It Works": useRef(null),
    Startups: useRef(null),
    Investors: useRef(null),
  };

  const scrollToSection = (label) => {
    setActiveNav(label);
    sectionRefs[label]?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap";
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setActiveStep(s => (s + 1) % 4), 2800);
    return () => clearInterval(interval);
  }, []);

  const css = `
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { background: ${COLORS.bg}; color: ${COLORS.white}; font-family: 'DM Sans', sans-serif; overflow-x: hidden; }
    ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: ${COLORS.bg}; } ::-webkit-scrollbar-thumb { background: ${COLORS.accent}; border-radius: 2px; }
    @keyframes fadeUp { from { opacity:0; transform:translateY(30px); } to { opacity:1; transform:translateY(0); } }
    @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
    @keyframes pulse { 0%,100% { box-shadow: 0 0 0 0 ${COLORS.accent}44; } 50% { box-shadow: 0 0 0 16px ${COLORS.accent}00; } }
    @keyframes float { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-12px); } }
    @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
    @keyframes gradientShift { 0%,100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
    @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
    .syne { font-family: 'Syne', sans-serif; }
    .btn-primary { background: ${COLORS.accent}; color: #fff; border: none; padding: 14px 32px; border-radius: 8px; font-family: 'Syne', sans-serif; font-weight: 700; font-size: 15px; cursor: pointer; transition: all 0.25s; letter-spacing: 0.5px; position: relative; overflow: hidden; }
    .btn-primary::after { content: ''; position: absolute; inset: 0; background: linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.12) 50%, transparent 70%); transform: translateX(-100%); transition: transform 0.4s; }
    .btn-primary:hover::after { transform: translateX(100%); }
    .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 24px ${COLORS.accent}55; }
    .btn-outline { background: transparent; color: ${COLORS.white}; border: 1.5px solid ${COLORS.border}; padding: 14px 32px; border-radius: 8px; font-family: 'Syne', sans-serif; font-weight: 600; font-size: 15px; cursor: pointer; transition: all 0.25s; }
    .btn-outline:hover { border-color: ${COLORS.accent}; color: ${COLORS.accent}; transform: translateY(-2px); }
    .card { background: ${COLORS.bgCard}; border: 1px solid ${COLORS.border}; border-radius: 16px; transition: all 0.3s; }
    .card:hover { background: ${COLORS.bgCardHover}; border-color: ${COLORS.accent}44; transform: translateY(-4px); box-shadow: 0 20px 40px rgba(0,0,0,0.4); }
    .tag { display: inline-block; background: ${COLORS.accent}18; color: ${COLORS.accent}; border: 1px solid ${COLORS.accent}33; border-radius: 100px; padding: 4px 14px; font-size: 12px; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; }
    .glow-text { background: linear-gradient(135deg, ${COLORS.white} 0%, ${COLORS.accentLight} 60%, ${COLORS.gold} 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
    .noise::before { content: ''; position: absolute; inset: 0; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E"); pointer-events: none; z-index: 0; }
  `;

  return (
    <>
      <style>{css}</style>

      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, borderBottom: `1px solid ${COLORS.border}`, backdropFilter: "blur(20px)", background: `${COLORS.bg}CC`, padding: "0 5%" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: COLORS.accent, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Syne", fontWeight: 800, fontSize: 18, color: "#fff", animation: "pulse 3s infinite" }}>K</div>
            <div>
              <div className="syne" style={{ fontWeight: 800, fontSize: 16, lineHeight: 1, letterSpacing: 0.5 }}>KARO</div>
              <div style={{ fontSize: 10, letterSpacing: 3, color: COLORS.accent, fontWeight: 600, textTransform: "uppercase" }}>PITCH</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
            {["About", "How It Works", "Startups", "Investors"].map(item => (
              <span key={item} onClick={() => scrollToSection(item)}
                style={{ color: activeNav === item ? COLORS.accent : COLORS.muted, fontSize: 14, cursor: "pointer", transition: "color 0.2s", fontWeight: 500, position: "relative" }}
                onMouseEnter={e => e.currentTarget.style.color = COLORS.white}
                onMouseLeave={e => e.currentTarget.style.color = activeNav === item ? COLORS.accent : COLORS.muted}>
                {item}
                {activeNav === item && <span style={{ position: "absolute", bottom: -4, left: 0, right: 0, height: 2, background: COLORS.accent, borderRadius: 2 }} />}
              </span>
            ))}
            <button className="btn-primary" style={{ padding: "10px 22px", fontSize: 13 }}>Apply to Pitch →</button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section ref={heroRef} className="noise" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden", paddingTop: 68 }}>
        {/* BG orbs */}
        <div style={{ position: "absolute", width: 600, height: 600, borderRadius: "50%", background: `radial-gradient(circle, ${COLORS.accent}18 0%, transparent 70%)`, top: "10%", left: "-10%", animation: "float 8s ease-in-out infinite" }} />
        <div style={{ position: "absolute", width: 400, height: 400, borderRadius: "50%", background: `radial-gradient(circle, ${COLORS.gold}12 0%, transparent 70%)`, bottom: "10%", right: "5%", animation: "float 10s ease-in-out infinite reverse" }} />
        <div style={{ position: "absolute", width: 300, height: 300, borderRadius: "50%", background: `radial-gradient(circle, ${COLORS.teal}10 0%, transparent 70%)`, top: "50%", right: "20%", animation: "float 12s ease-in-out infinite" }} />

        {/* Grid lines */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(${COLORS.border}22 1px, transparent 1px), linear-gradient(90deg, ${COLORS.border}22 1px, transparent 1px)`, backgroundSize: "60px 60px", opacity: 0.5 }} />

        <div style={{ position: "relative", zIndex: 1, textAlign: "center", maxWidth: 900, padding: "0 5%", animation: heroVisible ? "fadeUp 0.9s ease both" : "none" }}>
          <div className="tag" style={{ marginBottom: 28, animation: heroVisible ? "fadeIn 0.6s 0.1s both" : "none" }}>🇮🇳 India's Startup Pitch Platform</div>
          <h1 className="syne glow-text" style={{ fontSize: "clamp(42px, 7vw, 82px)", fontWeight: 800, lineHeight: 1.05, marginBottom: 24, animation: heroVisible ? "fadeUp 0.9s 0.2s both" : "none" }}>
            Pitch Your Startup<br />to India's Top Investors.
          </h1>
          <p style={{ color: COLORS.muted, fontSize: "clamp(16px, 2vw, 20px)", lineHeight: 1.7, maxWidth: 640, margin: "0 auto 40px", animation: heroVisible ? "fadeUp 0.9s 0.35s both" : "none" }}>
            Karo Pitch is a curated investor pitch platform built for early-stage founders from Tier-2, Tier-3 cities and Bharat — where great businesses meet the right investors.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", animation: heroVisible ? "fadeUp 0.9s 0.5s both" : "none" }}>
            <button className="btn-primary" style={{ fontSize: 16, padding: "16px 40px" }}>Apply to Pitch 🚀</button>
            <button className="btn-outline" style={{ fontSize: 16, padding: "16px 40px" }}>Explore Startups →</button>
          </div>
          {/* Stats */}
          <div style={{ display: "flex", gap: "clamp(20px,4vw,60px)", justifyContent: "center", marginTop: 64, animation: heroVisible ? "fadeIn 1s 0.7s both" : "none" }}>
            {[["5000+", "Startup Stories"], ["200+", "Investors", true], ["50+", "Cities Covered"], ["₹10Cr+", "Funding Facilitated"]].map(([num, label, isTarget]) => (
              <div key={label} style={{ textAlign: "center" }}>
                <div className="syne" style={{ fontSize: "clamp(22px,3vw,36px)", fontWeight: 800, color: isTarget ? COLORS.gold : COLORS.accent }}>
                  {num}
                </div>
                <div style={{ color: COLORS.muted, fontSize: 13, marginTop: 4 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll hint */}
        <div style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, opacity: 0.4 }}>
          <div style={{ width: 1, height: 40, background: `linear-gradient(to bottom, transparent, ${COLORS.accent})` }} />
          <span style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase" }}>Scroll</span>
        </div>
      </section>

      {/* MARQUEE */}
      <div style={{ borderTop: `1px solid ${COLORS.border}`, borderBottom: `1px solid ${COLORS.border}`, overflow: "hidden", padding: "14px 0", background: `${COLORS.accent}08` }}>
        <div style={{ display: "flex", animation: "marquee 18s linear infinite", width: "max-content" }}>
          {[...Array(2)].map((_, i) => (
            <div key={i} style={{ display: "flex", gap: 48, paddingRight: 48 }}>
              {["D2C Brands", "Consumer Startups", "MSMEs", "SaaS", "Manufacturing", "AgriTech", "FinTech", "EdTech", "HealthTech", "Bharat Startups"].map(cat => (
                <span key={cat} style={{ color: COLORS.muted, fontSize: 13, fontWeight: 500, whiteSpace: "nowrap", letterSpacing: 1 }}>
                  <span style={{ color: COLORS.accent, marginRight: 12 }}>✦</span>{cat}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ABOUT */}
      <section ref={(el) => { aboutRef.current = el; sectionRefs["About"].current = el; }} style={{ padding: "100px 5%", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
          <div style={{ animation: aboutVisible ? "fadeUp 0.8s 0.1s both" : "none", opacity: aboutVisible ? 1 : 0 }}>
            <div className="tag" style={{ marginBottom: 20 }}>About Karo Pitch</div>
            <h2 className="syne" style={{ fontSize: "clamp(28px,4vw,48px)", fontWeight: 800, lineHeight: 1.15, marginBottom: 24 }}>
              Bridging Bharat's<br /><span style={{ color: COLORS.accent }}>Founders</span> with<br />Capital
            </h2>
            <p style={{ color: COLORS.muted, lineHeight: 1.8, fontSize: 16, marginBottom: 20 }}>
              Thousands of founders are building amazing businesses across India — but they lack access to investors, mentorship, and visibility. Karo Pitch was built to change that.
            </p>
            <p style={{ color: COLORS.muted, lineHeight: 1.8, fontSize: 16, marginBottom: 32 }}>
              We connect these founders with investors through curated pitch events and a discovery platform, creating India's most accessible startup funding ecosystem for Bharat entrepreneurs.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              {["Curated Pitches", "Investor Matchmaking", "Mentorship Access", "Media Visibility"].map(tag => (
                <span key={tag} style={{ background: `${COLORS.teal}15`, color: COLORS.teal, border: `1px solid ${COLORS.teal}33`, borderRadius: 100, padding: "6px 16px", fontSize: 13, fontWeight: 500 }}>{tag}</span>
              ))}
            </div>
          </div>

          <div style={{ animation: aboutVisible ? "fadeUp 0.8s 0.3s both" : "none", opacity: aboutVisible ? 1 : 0 }}>
            <div style={{ background: `linear-gradient(135deg, ${COLORS.bgCard}, ${COLORS.bgCardHover})`, border: `1px solid ${COLORS.border}`, borderRadius: 24, padding: 40, position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: -30, right: -30, width: 160, height: 160, borderRadius: "50%", background: `radial-gradient(circle, ${COLORS.accent}20, transparent)` }} />
              <div className="syne" style={{ fontSize: 15, fontWeight: 700, color: COLORS.accent, letterSpacing: 2, textTransform: "uppercase", marginBottom: 24 }}>KaroStartup × Karo Pitch</div>
              {[
                { icon: "📰", title: "5,000+ Startup Stories", sub: "India's largest startup storytelling platform" },
                { icon: "🌐", title: "50+ Cities Covered", sub: "From metros to Bharat's heartland" },
                { icon: "👥", title: "200K+ Founder Community", sub: "India's most engaged startup network" },
                { icon: "🏆", title: "5 Years of Impact", sub: "Inspiring entrepreneurs across India" },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", gap: 16, marginBottom: i < 3 ? 24 : 0, paddingBottom: i < 3 ? 24 : 0, borderBottom: i < 3 ? `1px solid ${COLORS.border}` : "none" }}>
                  <span style={{ fontSize: 24 }}>{item.icon}</span>
                  <div>
                    <div className="syne" style={{ fontWeight: 700, fontSize: 15 }}>{item.title}</div>
                    <div style={{ color: COLORS.muted, fontSize: 13, marginTop: 3 }}>{item.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section ref={(el) => { stepsRef.current = el; sectionRefs["How It Works"].current = el; }} style={{ padding: "100px 5%", background: `${COLORS.bgCard}55`, borderTop: `1px solid ${COLORS.border}`, borderBottom: `1px solid ${COLORS.border}` }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64, animation: stepsVisible ? "fadeUp 0.8s both" : "none", opacity: stepsVisible ? 1 : 0 }}>
            <div className="tag" style={{ marginBottom: 16 }}>Process</div>
            <h2 className="syne" style={{ fontSize: "clamp(28px,4vw,48px)", fontWeight: 800 }}>How It Works</h2>
            <p style={{ color: COLORS.muted, marginTop: 12, fontSize: 16 }}>Four simple steps from application to funding</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }}>
            {steps.map((step, i) => (
              <div key={i} className="card" onClick={() => setActiveStep(i)}
                style={{ padding: 32, cursor: "pointer", borderColor: activeStep === i ? COLORS.accent : COLORS.border, background: activeStep === i ? `${COLORS.accent}0A` : COLORS.bgCard, animation: stepsVisible ? `fadeUp 0.7s ${i * 0.1}s both` : "none", opacity: stepsVisible ? 1 : 0, position: "relative" }}>
                {activeStep === i && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, borderRadius: "16px 16px 0 0", background: `linear-gradient(90deg, ${COLORS.accent}, ${COLORS.gold})` }} />}
                <div style={{ fontSize: 36, marginBottom: 16 }}>{step.icon}</div>
                <div className="syne" style={{ color: COLORS.accent, fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>{step.num}</div>
                <div className="syne" style={{ fontWeight: 700, fontSize: 17, marginBottom: 10 }}>{step.title}</div>
                <div style={{ color: COLORS.muted, fontSize: 14, lineHeight: 1.6 }}>{step.desc}</div>
              </div>
            ))}
          </div>

          {/* Progress bar */}
          <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 32 }}>
            {steps.map((_, i) => (
              <div key={i} onClick={() => setActiveStep(i)} style={{ height: 4, width: i === activeStep ? 32 : 16, borderRadius: 2, background: i === activeStep ? COLORS.accent : COLORS.border, cursor: "pointer", transition: "all 0.3s" }} />
            ))}
          </div>
        </div>
      </section>

      {/* WHO CAN APPLY */}
      <section style={{ padding: "100px 5%", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div className="tag" style={{ marginBottom: 16 }}>Eligibility</div>
          <h2 className="syne" style={{ fontSize: "clamp(28px,4vw,48px)", fontWeight: 800 }}>Who Can Apply?</h2>
          <p style={{ color: COLORS.muted, marginTop: 12, fontSize: 16, maxWidth: 500, margin: "12px auto 0" }}>We welcome founders from all sectors building for India</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 16 }}>
          {categories.map((cat, i) => (
            <div key={i} className="card" style={{ padding: "28px 16px", textAlign: "center", cursor: "pointer" }}
              onMouseEnter={e => e.currentTarget.style.borderColor = COLORS.accent}
              onMouseLeave={e => e.currentTarget.style.borderColor = COLORS.border}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>{cat.icon}</div>
              <div className="syne" style={{ fontSize: 13, fontWeight: 700, lineHeight: 1.3 }}>{cat.label}</div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: 40 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 12, padding: "16px 28px", background: `${COLORS.bgCard}`, border: `1px solid ${COLORS.border}`, borderRadius: 12, color: COLORS.muted, fontSize: 14 }}>
            <span style={{ color: COLORS.gold }}>💡</span>
            Early-stage startups with a working product or strong traction are prioritized
          </div>
        </div>
      </section>

      {/* INVESTORS */}
      <section ref={sectionRefs["Investors"]} style={{ padding: "100px 5%", background: `${COLORS.bgCard}44`, borderTop: `1px solid ${COLORS.border}`, borderBottom: `1px solid ${COLORS.border}` }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div className="tag" style={{ marginBottom: 16 }}>Investors</div>
            <h2 className="syne" style={{ fontSize: "clamp(28px,4vw,48px)", fontWeight: 800 }}>
              Meet Investors Looking for<br /><span style={{ color: COLORS.gold }}>India's Next Big Startup</span>
            </h2>
            <p style={{ color: COLORS.muted, marginTop: 14, fontSize: 16 }}>Our curated investor panel includes top VCs, angels, and family offices</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20, marginBottom: 48 }}>
            {investors.map((inv, i) => (
              <div key={i} className="card" style={{ padding: 28, textAlign: "center" }}>
                <div style={{ width: 64, height: 64, borderRadius: "50%", background: `linear-gradient(135deg, ${[COLORS.accent, COLORS.gold, COLORS.teal, "#7C6EFF"][i]}, ${[COLORS.gold, COLORS.teal, COLORS.accent, COLORS.gold][i]})`, margin: "0 auto 16px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span className="syne" style={{ color: "#fff", fontWeight: 800, fontSize: 22 }}>{inv.name[0]}</span>
                </div>
                <div className="syne" style={{ fontWeight: 700, fontSize: 15, marginBottom: 6 }}>{inv.name}</div>
                <div style={{ color: COLORS.muted, fontSize: 13, marginBottom: 10 }}>{inv.role}</div>
                <div style={{ background: `${COLORS.teal}15`, color: COLORS.teal, border: `1px solid ${COLORS.teal}22`, borderRadius: 100, padding: "4px 12px", display: "inline-block", fontSize: 12, fontWeight: 500 }}>{inv.focus}</div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center" }}>
            <div style={{ display: "inline-flex", gap: 32, padding: "24px 40px", background: COLORS.bgCard, border: `1px solid ${COLORS.border}`, borderRadius: 16 }}>
              {[["30+", "Active Investors"], ["₹50Cr+", "Total Investment Pool"], ["3", "Pitch Events per Quarter"]].map(([num, label]) => (
                <div key={label} style={{ textAlign: "center" }}>
                  <div className="syne" style={{ fontWeight: 800, fontSize: 28, color: COLORS.accent }}>{num}</div>
                  <div style={{ color: COLORS.muted, fontSize: 13, marginTop: 4 }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED STARTUPS */}
      <section ref={(el) => { startupsRef.current = el; sectionRefs["Startups"].current = el; }} style={{ padding: "100px 5%", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 48 }}>
          <div>
            <div className="tag" style={{ marginBottom: 16 }}>Featured</div>
            <h2 className="syne" style={{ fontSize: "clamp(28px,4vw,48px)", fontWeight: 800 }}>Startups on Karo Pitch</h2>
          </div>
          <button className="btn-outline" style={{ flexShrink: 0 }}>View All →</button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {startups.map((s, i) => (
            <div key={i} className="card" style={{ padding: 28, cursor: "pointer", animation: startupsVisible ? `fadeUp 0.7s ${i * 0.08}s both` : "none", opacity: startupsVisible ? 1 : 0 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: `${s.color}20`, border: `1px solid ${s.color}33`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span className="syne" style={{ color: s.color, fontWeight: 800, fontSize: 18 }}>{s.name[0]}</span>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 11, color: COLORS.muted, marginBottom: 3 }}>Raising</div>
                  <div className="syne" style={{ color: COLORS.gold, fontWeight: 700, fontSize: 16 }}>{s.raise}</div>
                </div>
              </div>
              <div className="syne" style={{ fontWeight: 700, fontSize: 17, marginBottom: 6 }}>{s.name}</div>
              <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
                <span style={{ background: `${s.color}18`, color: s.color, border: `1px solid ${s.color}33`, borderRadius: 100, padding: "3px 10px", fontSize: 11, fontWeight: 600 }}>{s.cat}</span>
                <span style={{ color: COLORS.muted, fontSize: 12, padding: "4px 0" }}>📍 {s.city}</span>
              </div>
              <p style={{ color: COLORS.muted, fontSize: 14, lineHeight: 1.6 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section ref={ctaRef} style={{ padding: "100px 5%", position: "relative", overflow: "hidden", borderTop: `1px solid ${COLORS.border}` }}>
        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at center, ${COLORS.accent}12, transparent 70%)` }} />
        <div style={{ position: "absolute", width: 500, height: 500, borderRadius: "50%", background: `radial-gradient(circle, ${COLORS.gold}08, transparent)`, top: "50%", left: "50%", transform: "translate(-50%,-50%)" }} />
        <div style={{ position: "relative", textAlign: "center", maxWidth: 700, margin: "0 auto", animation: ctaVisible ? "fadeUp 0.8s both" : "none", opacity: ctaVisible ? 1 : 0 }}>
          <div style={{ fontSize: 56, marginBottom: 20 }}>🚀</div>
          <h2 className="syne" style={{ fontSize: "clamp(32px,5vw,60px)", fontWeight: 800, lineHeight: 1.1, marginBottom: 20 }}>
            Ready to Pitch<br /><span className="glow-text">Your Startup?</span>
          </h2>
          <p style={{ color: COLORS.muted, fontSize: 18, lineHeight: 1.7, marginBottom: 40, maxWidth: 500, margin: "0 auto 40px" }}>
            Join hundreds of founders who have taken the stage and connected with investors who believe in Bharat.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <button className="btn-primary" style={{ fontSize: 17, padding: "18px 48px" }}>Apply Now 🎤</button>
            <button className="btn-outline" style={{ fontSize: 17, padding: "18px 48px" }}>Partner With Us</button>
          </div>
          <div style={{ marginTop: 32, color: COLORS.muted, fontSize: 13 }}>
            Next pitch cohort opens <span style={{ color: COLORS.accent, fontWeight: 600 }}>April 2025</span> · Limited slots available
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: `1px solid ${COLORS.border}`, padding: "48px 5%", background: `${COLORS.bgCard}44` }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 48, marginBottom: 48 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: COLORS.accent, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Syne", fontWeight: 800, fontSize: 18, color: "#fff" }}>K</div>
                <div>
                  <div className="syne" style={{ fontWeight: 800, fontSize: 16 }}>KARO PITCH</div>
                  <div style={{ fontSize: 10, color: COLORS.accent, letterSpacing: 2 }}>BY KAROSTARTUP</div>
                </div>
              </div>
              <p style={{ color: COLORS.muted, fontSize: 14, lineHeight: 1.7, maxWidth: 280 }}>India's most accessible startup discovery and funding platform for Bharat entrepreneurs.</p>
              <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
                {[
                  { label: "Instagram", url: "https://www.instagram.com/karopitch/", hoverColor: "#E1306C", svg: <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg> },
                  { label: "X / Twitter", url: "https://x.com/karo_startup", hoverColor: "#fff", svg: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> },
                  { label: "LinkedIn", url: "https://www.linkedin.com/company/karo-startup/", hoverColor: "#0A66C2", svg: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
                  { label: "YouTube", url: "https://www.youtube.com/@karostartup/videos", hoverColor: "#FF0000", svg: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg> },
                  { label: "Facebook", url: "https://www.facebook.com/karostartup", hoverColor: "#1877F2", svg: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg> },
                ].map(({ label, url, hoverColor, svg }) => (
                  <a key={label} href={url} target="_blank" rel="noopener noreferrer"
                    style={{ width: 36, height: 36, borderRadius: 8, background: COLORS.bgCard, border: `1px solid ${COLORS.border}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: COLORS.muted, transition: "all 0.25s", textDecoration: "none" }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = hoverColor; e.currentTarget.style.color = hoverColor; e.currentTarget.style.background = `${hoverColor}15`; e.currentTarget.style.transform = "translateY(-2px)"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = COLORS.border; e.currentTarget.style.color = COLORS.muted; e.currentTarget.style.background = COLORS.bgCard; e.currentTarget.style.transform = "translateY(0)"; }}>
                    {svg}
                  </a>
                ))}
              </div>
            </div>
            {[
              { title: "Platform", links: [{ label: "Apply to Pitch", url: "#" }, { label: "Explore Startups", url: "#" }, { label: "For Investors", url: "#" }, { label: "Partner With Us", url: "#" }] },
              { title: "Company", links: [{ label: "About KaroStartup", url: "https://karostartup.com" }, { label: "Our Mission", url: "#" }, { label: "Media & Press", url: "#" }, { label: "Careers", url: "#" }] },
              { title: "Connect", links: [{ label: "karostartup.com", url: "https://karostartup.com" }, { label: "Instagram", url: "https://www.instagram.com/karopitch/" }, { label: "LinkedIn", url: "https://www.linkedin.com/company/karo-startup/" }, { label: "business@karostartup.com", url: "mailto:business@karostartup.com" }] },
            ].map(col => (
              <div key={col.title}>
                <div className="syne" style={{ fontWeight: 700, fontSize: 13, letterSpacing: 1, textTransform: "uppercase", marginBottom: 20 }}>{col.title}</div>
                {col.links.map(({ label, url }) => (
                  <a key={label} href={url} target={url.startsWith("http") ? "_blank" : "_self"} rel="noopener noreferrer"
                    style={{ display: "block", color: COLORS.muted, fontSize: 14, marginBottom: 10, cursor: "pointer", transition: "color 0.2s", textDecoration: "none" }}
                    onMouseEnter={e => e.currentTarget.style.color = COLORS.white}
                    onMouseLeave={e => e.currentTarget.style.color = COLORS.muted}>{label}</a>
                ))}
              </div>
            ))}
          </div>
          <div style={{ borderTop: `1px solid ${COLORS.border}`, paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ color: COLORS.muted, fontSize: 13 }}>© 2025 KaroStartup. All rights reserved.</div>
            <div style={{ color: COLORS.muted, fontSize: 13 }}>Built with ❤️ for Bharat's founders</div>
          </div>
        </div>
      </footer>
    </>
  );
}