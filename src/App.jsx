import React, { useState, useEffect, useRef } from "react";
import {
  MessageCircle,
  Send,
  TrendingUp,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Menu,
  X,
  Bitcoin,
  LineChart,
  Target,
  Clock,
  Copy,
  Check,
} from "lucide-react";

const GOLD = "#F2C230";
const GOLD_DEEP = "#C79A1E";
const TEAL = "#3ED6B5";
const BG = "#07080A";
const BG_ELEV = "#111216";
const BG_ELEV_2 = "#17181D";
const TEXT = "#F3EFE4";
const MUTED = "#8B8D95";
const LINE = "rgba(242,194,48,0.16)";

function useReveal() {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, shown];
}

function Reveal({ children, delay = 0, className = "" }) {
  const [ref, shown] = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : "translateY(18px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s cubic-bezier(.2,.7,.2,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

function CopyField({ label, value }) {
  const [copied, setCopied] = useState(false);
  const doCopy = () => {
    navigator.clipboard?.writeText(value).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <div
      className="flex items-center justify-between gap-3 py-3"
      style={{ borderBottom: `1px solid ${LINE}` }}
    >
      <div>
        <div className="text-xs uppercase tracking-wide" style={{ color: MUTED, letterSpacing: "0.06em" }}>
          {label}
        </div>
        <div className="text-sm sm:text-base font-medium" style={{ color: TEXT }}>
          {value}
        </div>
      </div>
      <button
        onClick={doCopy}
        aria-label={`Copy ${label}`}
        className="flex-shrink-0 flex items-center justify-center rounded-full transition-all cursor-pointer"
        style={{
          width: 34,
          height: 34,
          border: `1px solid ${copied ? TEAL : LINE}`,
          color: copied ? TEAL : GOLD,
          background: "transparent",
        }}
      >
        {copied ? <Check size={15} /> : <Copy size={14} />}
      </button>
    </div>
  );
}

const tickerItems = [
  { pair: "XAU/USD", result: "+ 118 pips", up: true },
  { pair: "BTC/USDT", result: "+ 3.8%", up: true },
  { pair: "EUR/USD", result: "+ 62 pips", up: true },
  { pair: "ETH/USDT", result: "+ 5.1%", up: true },
  { pair: "GBP/JPY", result: "+ 94 pips", up: true },
  { pair: "SOL/USDT", result: "+ 7.4%", up: true },
  { pair: "USD/JPY", result: "+ 41 pips", up: true },
];

export default function App() {
  const [navOpen, setNavOpen] = useState(false);

  const scrollTo = (id) => {
    setNavOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      style={{
        background: BG,
        color: TEXT,
        fontFamily: "'Inter', system-ui, sans-serif",
        minHeight: "100vh",
        overflowX: "hidden",
      }}
    >
      {/* NAV */}
      <header
        className="sticky top-0 z-50"
        style={{
          background: "rgba(7,8,10,0.85)",
          backdropFilter: "blur(10px)",
          borderBottom: `1px solid ${LINE}`,
        }}
      >
        <div className="max-w-6xl mx-auto px-5 sm:px-8 flex items-center justify-between h-16">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <div
              className="flex items-center justify-center rounded-md"
              style={{ width: 34, height: 34, background: GOLD, color: "#0A0A0A" }}
            >
              <TrendingUp size={18} strokeWidth={2.5} />
            </div>
            <span className="display-font text-lg tracking-wide" style={{ color: GOLD }}>
              KILLERS <span style={{ color: TEXT }}>VIP</span>
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium" style={{ color: MUTED }}>
            <button onClick={() => scrollTo("signals")} className="hover:text-white transition-colors cursor-pointer">Signals</button>
            <button onClick={() => scrollTo("how")} className="hover:text-white transition-colors cursor-pointer">How it works</button>
            <button onClick={() => scrollTo("payment")} className="hover:text-white transition-colors cursor-pointer">Payment</button>
            <button onClick={() => scrollTo("contact")} className="hover:text-white transition-colors cursor-pointer">Contact</button>
          </nav>

          <button
            onClick={() => scrollTo("signals")}
            className="hidden md:inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition-transform hover:scale-105 cursor-pointer"
            style={{ background: GOLD, color: "#0A0A0A" }}
          >
            Join VIP
          </button>

          <button className="md:hidden cursor-pointer" onClick={() => setNavOpen((v) => !v)} aria-label="Toggle menu">
            {navOpen ? <X color={TEXT} /> : <Menu color={TEXT} />}
          </button>
        </div>

        {navOpen && (
          <div className="md:hidden px-5 pb-5 flex flex-col gap-4 text-sm font-medium" style={{ color: MUTED, borderTop: `1px solid ${LINE}` }}>
            <button className="text-left pt-4 cursor-pointer" onClick={() => scrollTo("signals")}>Signals</button>
            <button className="text-left cursor-pointer" onClick={() => scrollTo("how")}>How it works</button>
            <button className="text-left cursor-pointer" onClick={() => scrollTo("payment")}>Payment</button>
            <button className="text-left cursor-pointer" onClick={() => scrollTo("contact")}>Contact</button>
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="relative px-5 sm:px-8 pt-20 pb-16 sm:pt-28 sm:pb-24 overflow-hidden">
        <div
          className="glow-pulse absolute rounded-full"
          style={{
            width: 480,
            height: 480,
            background: `radial-gradient(circle, ${GOLD} 0%, transparent 70%)`,
            filter: "blur(80px)",
            opacity: 0.18,
            top: -180,
            left: "50%",
            transform: "translateX(-50%)",
            pointerEvents: "none",
          }}
        />
        <div className="max-w-4xl mx-auto text-center relative">
          <Reveal>
            <div
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6 text-xs font-semibold"
              style={{ border: `1px solid ${LINE}`, color: GOLD }}
            >
              <span className="float-slow inline-block">🇱🇰</span>
              Sri Lanka's No.01 Crypto &amp; Forex Signals at Your Doorstep
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h1
              className="display-font leading-[0.95] tracking-wide"
              style={{ fontSize: "clamp(2.6rem, 8vw, 5rem)", color: TEXT }}
            >
              KILLERS <span style={{ color: GOLD }}>VIP</span> SIGNALS
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="mt-6 text-base sm:text-lg max-w-2xl mx-auto" style={{ color: MUTED }}>
              Daily crypto and forex trade calls, sent straight to WhatsApp and Telegram —
              built for traders who want clear entries, real analysis, and no guesswork.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => scrollTo("signals")}
                className="w-full sm:w-auto rounded-full px-8 py-3.5 font-bold transition-transform hover:scale-105 cursor-pointer"
                style={{ background: `linear-gradient(135deg, ${GOLD}, ${GOLD_DEEP})`, color: "#0A0A0A" }}
              >
                View VIP Plans
              </button>
              <button
                onClick={() => scrollTo("contact")}
                className="w-full sm:w-auto rounded-full px-8 py-3.5 font-bold transition-colors cursor-pointer"
                style={{ border: `1px solid ${LINE}`, color: TEXT }}
              >
                Talk to an Admin
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* TICKER */}
      <div
        className="overflow-hidden py-4"
        style={{ borderTop: `1px solid ${LINE}`, borderBottom: `1px solid ${LINE}`, background: BG_ELEV }}
      >
        <div className="flex w-max marquee-track">
          {[...tickerItems, ...tickerItems].map((t, i) => (
            <div key={i} className="flex items-center gap-2 px-6 text-sm font-semibold whitespace-nowrap">
              <span style={{ color: MUTED }}>{t.pair}</span>
              <span style={{ color: TEAL }}>{t.result}</span>
            </div>
          ))}
        </div>
      </div>

      {/* SIGNALS / PLANS */}
      <section id="signals" className="px-5 sm:px-8 py-20 sm:py-28 max-w-6xl mx-auto">
        <Reveal>
          <h2 className="display-font tracking-wide" style={{ fontSize: "clamp(1.9rem, 4.5vw, 2.75rem)" }}>
            Choose your signals
          </h2>
          <p className="mt-3 max-w-xl" style={{ color: MUTED }}>
            Two lifetime memberships. Pick forex, crypto, or run both side by side.
          </p>
        </Reveal>

        <div className="mt-12 grid md:grid-cols-2 gap-6">
          {/* FOREX CARD */}
          <Reveal delay={0.05}>
            <div
              className="rounded-2xl p-7 sm:p-8 h-full flex flex-col"
              style={{ background: BG_ELEV, border: `1px solid ${LINE}`, borderTop: `3px solid ${GOLD}` }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center justify-center rounded-lg" style={{ width: 42, height: 42, background: "rgba(242,194,48,0.12)" }}>
                  <LineChart size={20} color={GOLD} />
                </div>
                <h3 className="display-font text-2xl tracking-wide">FOREX VIP SIGNALS</h3>
              </div>

              <ul className="space-y-3 mb-7 flex-1">
                {[
                  "Lifetime service",
                  "Daily 2 – 5 signals",
                  "Accuracy 96% – 98%",
                  "BTC & gold updates",
                  "Signals with analysis",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm sm:text-base">
                    <CheckCircle2 size={18} color={GOLD} className="flex-shrink-0 mt-0.5" />
                    <span style={{ color: TEXT }}>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="flex items-baseline gap-2 mb-5">
                <span className="text-sm" style={{ color: MUTED }}>VIP Membership — Lifetime</span>
              </div>
              <div className="display-font text-3xl mb-6" style={{ color: GOLD }}>48 USD</div>

              <button
                onClick={() => scrollTo("payment")}
                className="rounded-full px-6 py-3.5 font-bold text-center transition-transform hover:scale-[1.03] cursor-pointer"
                style={{ background: GOLD, color: "#0A0A0A" }}
              >
                Join FX Group
              </button>
            </div>
          </Reveal>

          {/* CRYPTO CARD */}
          <Reveal delay={0.15}>
            <div
              className="rounded-2xl p-7 sm:p-8 h-full flex flex-col"
              style={{ background: BG_ELEV, border: `1px solid ${LINE}`, borderTop: `3px solid ${TEAL}` }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center justify-center rounded-lg" style={{ width: 42, height: 42, background: "rgba(62,214,181,0.12)" }}>
                  <Bitcoin size={20} color={TEAL} />
                </div>
                <h3 className="display-font text-2xl tracking-wide">CRYPTO VIP SIGNALS</h3>
              </div>

              <ul className="space-y-3 mb-7 flex-1">
                {[
                  "Daily 2 – 4 signals",
                  "Risk management plan",
                  "Guide service",
                  "High accurate BTC & ETH signals",
                  "Profit target alerts",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm sm:text-base">
                    <CheckCircle2 size={18} color={TEAL} className="flex-shrink-0 mt-0.5" />
                    <span style={{ color: TEXT }}>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="flex items-baseline gap-2 mb-5">
                <span className="text-sm" style={{ color: MUTED }}>VIP Membership — Lifetime</span>
              </div>
              <div className="display-font text-3xl mb-6" style={{ color: TEAL }}>30 USDT</div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => scrollTo("payment")}
                  className="flex-1 rounded-full px-5 py-3.5 font-bold transition-transform hover:scale-[1.03] cursor-pointer text-center"
                  style={{ background: TEAL, color: "#0A0A0A" }}
                >
                  Crypto Swing Group
                </button>
                <button
                  onClick={() => scrollTo("payment")}
                  className="flex-1 rounded-full px-5 py-3.5 font-bold transition-transform hover:scale-[1.03] cursor-pointer text-center"
                  style={{ background: TEAL, color: "#0A0A0A" }}
                >
                  Scalping Group
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="px-5 sm:px-8 py-20 sm:py-24" style={{ background: BG_ELEV, borderTop: `1px solid ${LINE}`, borderBottom: `1px solid ${LINE}` }}>
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <h2 className="display-font tracking-wide" style={{ fontSize: "clamp(1.9rem, 4.5vw, 2.75rem)" }}>
              How joining works
            </h2>
          </Reveal>

          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { n: "01", icon: Target, title: "Pick a plan", body: "Choose forex, crypto, or both based on how you trade." },
              { n: "02", icon: ShieldCheck, title: "Make payment", body: "Pay by bank transfer or Binance using the details below." },
              { n: "03", icon: MessageCircle, title: "Send your slip", body: "Share the payment slip with us on WhatsApp or Telegram." },
              { n: "04", icon: Zap, title: "Get approved", body: "Admins verify your payment and add you to the VIP group." },
            ].map((step, i) => (
              <Reveal key={step.n} delay={i * 0.08}>
                <div className="p-6 rounded-xl h-full" style={{ background: BG, border: `1px solid ${LINE}` }}>
                  <div className="flex items-center justify-between mb-5">
                    <step.icon size={20} color={GOLD} />
                    <span className="display-font text-2xl" style={{ color: "rgba(242,194,48,0.35)" }}>{step.n}</span>
                  </div>
                  <h4 className="font-bold mb-2" style={{ color: TEXT }}>{step.title}</h4>
                  <p className="text-sm" style={{ color: MUTED }}>{step.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PAYMENT */}
      <section id="payment" className="px-5 sm:px-8 py-20 sm:py-28 max-w-4xl mx-auto">
        <Reveal>
          <h2 className="display-font tracking-wide" style={{ fontSize: "clamp(1.9rem, 4.5vw, 2.75rem)" }}>
            Payment details
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-10 rounded-2xl p-7 sm:p-9" style={{ background: BG_ELEV, border: `1px solid ${LINE}` }}>
            <div className="mb-5">
              <div className="text-xs font-bold uppercase tracking-wide mb-1" style={{ color: GOLD, letterSpacing: "0.08em" }}>
                Bank Transfer
              </div>
            </div>
            <CopyField label="Account No" value="102552513896" />
            <CopyField label="Bank" value="SAMPATH" />
            <CopyField label="Branch" value="MATALE" />
            <CopyField label="Name" value="N G N D K NUGEKOTUWA" />

            <div className="mt-7 mb-5">
              <div className="text-xs font-bold uppercase tracking-wide mb-1" style={{ color: TEAL, letterSpacing: "0.08em" }}>
                Binance
              </div>
            </div>
            <div className="pb-1">
              <CopyField label="Binance ID" value="395789304" />
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div
            className="mt-6 rounded-2xl p-7 sm:p-9"
            style={{ border: `1px dashed ${LINE}`, background: "rgba(242,194,48,0.04)" }}
          >
            <div className="flex items-center gap-2 mb-4">
              <ShieldCheck size={18} color={GOLD} />
              <h3 className="font-bold tracking-wide" style={{ color: GOLD }}>IMPORTANT NOTICE</h3>
            </div>
            <p className="text-sm sm:text-base mb-2" style={{ color: TEXT }}>
              Payment slip eka WhatsApp ho Telegram harahaa apa wetha ewanna.
            </p>
            <p className="text-sm sm:text-base" style={{ color: MUTED }}>
              All payments and join requests are checked and approved by admins.
            </p>
          </div>
        </Reveal>
      </section>

      {/* CONTACT */}
      <section id="contact" className="px-5 sm:px-8 py-20 sm:py-28" style={{ background: BG_ELEV, borderTop: `1px solid ${LINE}` }}>
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <h2 className="display-font tracking-wide" style={{ fontSize: "clamp(1.9rem, 4.5vw, 2.75rem)" }}>
              Contact details
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-10 rounded-2xl p-7 sm:p-9 flex flex-col sm:flex-row gap-4" style={{ background: BG, border: `1px solid ${LINE}` }}>
              <a
                href="https://wa.me/"
                target="_blank"
                rel="noreferrer"
                className="flex-1 flex items-center justify-center gap-2.5 rounded-full px-6 py-4 font-bold transition-transform hover:scale-[1.03] cursor-pointer"
                style={{ border: `1px solid ${GOLD}`, color: GOLD }}
              >
                <MessageCircle size={19} />
                WhatsApp
              </a>
              <a
                href="https://t.me/"
                target="_blank"
                rel="noreferrer"
                className="flex-1 flex items-center justify-center gap-2.5 rounded-full px-6 py-4 font-bold transition-transform hover:scale-[1.03] cursor-pointer"
                style={{ border: `1px solid ${GOLD}`, color: GOLD }}
              >
                <Send size={19} />
                Telegram
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-6 flex items-center gap-2 text-sm" style={{ color: MUTED }}>
              <Clock size={15} />
              Admins usually reply within a few hours.
            </div>
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="px-5 sm:px-8 py-10" style={{ borderTop: `1px solid ${LINE}` }}>
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm" style={{ color: MUTED }}>
          <span className="display-font tracking-wide" style={{ color: GOLD, fontSize: "1rem" }}>
            KILLERS VIP SIGNALS
          </span>
          <span>Trading involves risk. Past results don't guarantee future performance.</span>
        </div>
      </footer>
    </div>
  );
}
