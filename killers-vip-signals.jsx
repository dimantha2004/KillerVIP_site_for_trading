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
        className="flex-shrink-0 flex items-center justify-center rounded-full transition-all"
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

const defaultMarketTickers = [
  { pair: "BTC/USDT", price: "$68,450.00", change: "+3.45%", up: true },
  { pair: "ETH/USDT", price: "$2,640.20", change: "+2.15%", up: true },
  { pair: "XAU/USD (Gold)", price: "$2,735.50", change: "+1.10%", up: true },
  { pair: "SOL/USDT", price: "$152.80", change: "+5.80%", up: true },
  { pair: "BNB/USDT", price: "$595.40", change: "+1.90%", up: true },
  { pair: "EUR/USD", price: "1.0850", change: "+0.15%", up: true },
  { pair: "GBP/USD", price: "1.2980", change: "-0.22%", up: false },
  { pair: "USD/JPY", price: "152.40", change: "+0.35%", up: true },
];

const platformPartners = [
  {
    name: "BINANCE",
    badge: "VIP CRYPTO SIGNALS",
    color: "#F0B90B",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="#F0B90B">
        <path d="M12 2L8.5 5.5L12 9L15.5 5.5L12 2ZM3 12L6.5 8.5L10 12L6.5 15.5L3 12ZM21 12L17.5 8.5L14 12L17.5 15.5L21 12ZM12 22L8.5 18.5L12 15L15.5 18.5L12 22ZM12 10.5L9.5 13L12 15.5L14.5 13L12 10.5Z" />
      </svg>
    ),
  },
  {
    name: "FOREX (MT4 / MT5)",
    badge: "HIGH ACCURACY CALLS",
    color: "#3ED6B5",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="#3ED6B5" strokeWidth="2">
        <path d="M6 3v4m0 10v4m-2-14h4v10H4zM18 1v6m0 10v6m-2-16h4v10h-4zM12 7v2m0 8v2m-2-8h4v6h-4z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: "XAU / USD GOLD",
    badge: "96% - 98% ACCURACY",
    color: "#F2C230",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="#F2C230" strokeWidth="2">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v10M9 10h6M9 14h6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: "TRADINGVIEW",
    badge: "LIVE TECHNICAL CHARTS",
    color: "#4084F4",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="#4084F4" strokeWidth="2">
        <path d="M3 19h18M5 15l4-8 4 6 5-10" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: "BYBIT & DERIVATIVES",
    badge: "SCALPING & SWING",
    color: "#F7A600",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="#F7A600">
        <path d="M4 4h7v16H4V4zm9 0h7v8h-7V4zm0 10h7v6h-7v-6z" />
      </svg>
    ),
  },
];

export default function App() {
  const [navOpen, setNavOpen] = useState(false);
  const [marketTickers, setMarketTickers] = useState(defaultMarketTickers);
  const [isLiveActive, setIsLiveActive] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchLivePrices = async () => {
      try {
        const symbolsParam = encodeURIComponent(
          JSON.stringify(["BTCUSDT", "ETHUSDT", "SOLUSDT", "BNBUSDT", "PAXGUSDT"])
        );
        const binancePromise = fetch(
          `https://api.binance.com/api/v3/ticker/24hr?symbols=${symbolsParam}`
        ).then((res) => (res.ok ? res.json() : null)).catch(() => null);

        const forexPromise = fetch("https://open.er-api.com/v6/latest/USD")
          .then((res) => (res.ok ? res.json() : null))
          .catch(() => null);

        const [binanceData, forexData] = await Promise.all([
          binancePromise,
          forexPromise,
        ]);

        const items = [];

        if (Array.isArray(binanceData)) {
          const bMap = {};
          binanceData.forEach((item) => {
            bMap[item.symbol] = {
              price: parseFloat(item.lastPrice),
              change: parseFloat(item.priceChangePercent),
            };
          });

          if (bMap["BTCUSDT"]) {
            const btc = bMap["BTCUSDT"];
            items.push({
              pair: "BTC/USDT",
              price: `$${btc.price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
              change: `${btc.change >= 0 ? "+" : ""}${btc.change.toFixed(2)}%`,
              up: btc.change >= 0,
            });
          }

          if (bMap["ETHUSDT"]) {
            const eth = bMap["ETHUSDT"];
            items.push({
              pair: "ETH/USDT",
              price: `$${eth.price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
              change: `${eth.change >= 0 ? "+" : ""}${eth.change.toFixed(2)}%`,
              up: eth.change >= 0,
            });
          }

          if (bMap["PAXGUSDT"]) {
            const paxg = bMap["PAXGUSDT"];
            items.push({
              pair: "XAU/USD (Gold)",
              price: `$${paxg.price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
              change: `${paxg.change >= 0 ? "+" : ""}${paxg.change.toFixed(2)}%`,
              up: paxg.change >= 0,
            });
          }

          if (bMap["SOLUSDT"]) {
            const sol = bMap["SOLUSDT"];
            items.push({
              pair: "SOL/USDT",
              price: `$${sol.price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
              change: `${sol.change >= 0 ? "+" : ""}${sol.change.toFixed(2)}%`,
              up: sol.change >= 0,
            });
          }

          if (bMap["BNBUSDT"]) {
            const bnb = bMap["BNBUSDT"];
            items.push({
              pair: "BNB/USDT",
              price: `$${bnb.price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
              change: `${bnb.change >= 0 ? "+" : ""}${bnb.change.toFixed(2)}%`,
              up: bnb.change >= 0,
            });
          }
        }

        if (forexData && forexData.rates) {
          const rates = forexData.rates;
          if (rates.EUR) {
            const eurUsd = 1 / rates.EUR;
            items.push({
              pair: "EUR/USD",
              price: eurUsd.toFixed(4),
              change: "Live FX",
              up: true,
            });
          }
          if (rates.GBP) {
            const gbpUsd = 1 / rates.GBP;
            items.push({
              pair: "GBP/USD",
              price: gbpUsd.toFixed(4),
              change: "Live FX",
              up: true,
            });
          }
          if (rates.JPY) {
            items.push({
              pair: "USD/JPY",
              price: rates.JPY.toFixed(2),
              change: "Live FX",
              up: true,
            });
          }
        }

        if (isMounted && items.length > 0) {
          setMarketTickers(items);
          setIsLiveActive(true);
        }
      } catch (err) {
        console.warn("Live market fetch fallback:", err);
      }
    };

    fetchLivePrices();
    const interval = setInterval(fetchLivePrices, 15000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

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
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;500;600;700;800&display=swap');
        .display-font { font-family: 'Anton', 'Inter', sans-serif; }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track { animation: marquee 28s linear infinite; }
        @keyframes glowPulse {
          0%, 100% { opacity: 0.55; }
          50% { opacity: 1; }
        }
        .glow-pulse { animation: glowPulse 5s ease-in-out infinite; }
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .float-slow { animation: floatSlow 6s ease-in-out infinite; }
        @keyframes floatBadge1 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-14px) rotate(1.5deg); }
        }
        .float-badge-1 { animation: floatBadge1 5.5s ease-in-out infinite; }
        @keyframes floatBadge2 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-16px) rotate(-1.5deg); }
        }
        .float-badge-2 { animation: floatBadge2 6.5s ease-in-out infinite 0.8s; }
        @keyframes marqueeReverse {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .marquee-reverse { animation: marqueeReverse 32s linear infinite; }
        @keyframes dashLine {
          0% { stroke-dashoffset: 1000; }
          100% { stroke-dashoffset: 0; }
        }
        .animate-dash-line {
          stroke-dasharray: 1000;
          animation: dashLine 4s cubic-bezier(0.4, 0, 0.2, 1) forwards infinite alternate;
        }
        html { scroll-behavior: smooth; }
        ::selection { background: ${GOLD}; color: #000; }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track, .marquee-reverse, .glow-pulse, .float-slow, .float-badge-1, .float-badge-2, .animate-dash-line { animation: none !important; }
        }
        a, button { -webkit-tap-highlight-color: transparent; }
      `}</style>

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
          <div className="flex items-center gap-2">
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
            <button onClick={() => scrollTo("signals")} className="hover:text-white transition-colors">Signals</button>
            <button onClick={() => scrollTo("how")} className="hover:text-white transition-colors">How it works</button>
            <button onClick={() => scrollTo("payment")} className="hover:text-white transition-colors">Payment</button>
            <button onClick={() => scrollTo("contact")} className="hover:text-white transition-colors">Contact</button>
          </nav>

          <button
            onClick={() => scrollTo("signals")}
            className="hidden md:inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition-transform hover:scale-105"
            style={{ background: GOLD, color: "#0A0A0A" }}
          >
            Join VIP
          </button>

          <button className="md:hidden" onClick={() => setNavOpen((v) => !v)} aria-label="Toggle menu">
            {navOpen ? <X color={TEXT} /> : <Menu color={TEXT} />}
          </button>
        </div>

        {navOpen && (
          <div className="md:hidden px-5 pb-5 flex flex-col gap-4 text-sm font-medium" style={{ color: MUTED, borderTop: `1px solid ${LINE}` }}>
            <button className="text-left pt-4" onClick={() => scrollTo("signals")}>Signals</button>
            <button className="text-left" onClick={() => scrollTo("how")}>How it works</button>
            <button className="text-left" onClick={() => scrollTo("payment")}>Payment</button>
            <button className="text-left" onClick={() => scrollTo("contact")}>Contact</button>
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

        {/* Animated Live Trading Chart Wave in Hero Background */}
        <div className="absolute inset-0 pointer-events-none opacity-30 overflow-hidden flex items-center justify-center">
          <svg className="w-full h-full min-w-[900px]" viewBox="0 0 1200 380" fill="none" preserveAspectRatio="none">
            <defs>
              <linearGradient id="chartGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#F2C230" stopOpacity="0.2" />
                <stop offset="35%" stopColor="#3ED6B5" stopOpacity="0.9" />
                <stop offset="70%" stopColor="#F2C230" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#3ED6B5" stopOpacity="0.3" />
              </linearGradient>
              <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3ED6B5" stopOpacity="0.12" />
                <stop offset="100%" stopColor="#07080A" stopOpacity="0" />
              </linearGradient>
            </defs>
            <line x1="0" y1="90" x2="1200" y2="90" stroke="rgba(242,194,48,0.06)" strokeDasharray="5 5" />
            <line x1="0" y1="180" x2="1200" y2="180" stroke="rgba(242,194,48,0.06)" strokeDasharray="5 5" />
            <line x1="0" y1="270" x2="1200" y2="270" stroke="rgba(242,194,48,0.06)" strokeDasharray="5 5" />
            <path d="M0,300 C200,280 300,190 450,210 C600,230 680,110 880,130 C1020,150 1100,70 1200,60 L1200,380 L0,380 Z" fill="url(#areaGradient)" />
            <path d="M0,300 C200,280 300,190 450,210 C600,230 680,110 880,130 C1020,150 1100,70 1200,60" stroke="url(#chartGradient)" strokeWidth="3" className="animate-dash-line" />
          </svg>
        </div>

        <div className="max-w-5xl mx-auto text-center relative">
          {/* Floating Binance Trading Badge */}
          <div
            className="hidden md:flex items-center gap-3 absolute md:-left-12 lg:-left-20 -top-6 p-3.5 rounded-2xl float-badge-1 backdrop-blur-md z-20 cursor-pointer transition-transform hover:scale-110"
            style={{
              background: "rgba(17,18,22,0.9)",
              border: "1px solid rgba(240,185,11,0.45)",
            }}
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(240,185,11,0.14)" }}>
              <svg viewBox="0 0 24 24" className="w-6 h-6 animate-pulse" fill="#F0B90B">
                <path d="M12 2L8.5 5.5L12 9L15.5 5.5L12 2ZM3 12L6.5 8.5L10 12L6.5 15.5L3 12ZM21 12L17.5 8.5L14 12L17.5 15.5L21 12ZM12 22L8.5 18.5L12 15L15.5 18.5L12 22ZM12 10.5L9.5 13L12 15.5L14.5 13L12 10.5Z" />
              </svg>
            </div>
            <div className="text-left">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#3ED6B5] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#3ED6B5]"></span>
                </span>
                <span className="text-[11px] font-extrabold tracking-wider text-[#F0B90B] uppercase">BINANCE VIP</span>
              </div>
              <div className="text-xs font-semibold text-[#F3EFE4] flex items-center gap-1.5 mt-0.5">
                <span>BTC/USDT Long</span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[rgba(62,214,181,0.18)] text-[#3ED6B5] border border-[rgba(62,214,181,0.4)]">
                  +14.2%
                </span>
              </div>
            </div>
          </div>

          {/* Floating Forex Gold Badge */}
          <div
            className="hidden md:flex items-center gap-3 absolute md:-right-8 lg:-right-16 top-40 p-3.5 rounded-2xl float-badge-2 backdrop-blur-md z-20 cursor-pointer transition-transform hover:scale-110"
            style={{
              background: "rgba(17,18,22,0.9)",
              border: "1px solid rgba(62,214,181,0.45)",
            }}
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(62,214,181,0.14)" }}>
              <svg viewBox="0 0 24 24" className="w-6 h-6 animate-pulse" fill="none" stroke="#3ED6B5" strokeWidth="2">
                <path d="M6 3v4m0 10v4m-2-14h4v10H4zM18 1v6m0 10v6m-2-16h4v10h-4zM12 7v2m0 8v2m-2-8h4v6h-4z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="text-left">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F2C230] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F2C230]"></span>
                </span>
                <span className="text-[11px] font-extrabold tracking-wider text-[#3ED6B5] uppercase">FOREX / GOLD</span>
              </div>
              <div className="text-xs font-semibold text-[#F3EFE4] flex items-center gap-1.5 mt-0.5">
                <span>XAU/USD Call</span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[rgba(242,194,48,0.18)] text-[#F2C230] border border-[rgba(242,194,48,0.4)]">
                  +180 Pips
                </span>
              </div>
            </div>
          </div>

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
            <div className="relative inline-block w-full max-w-4xl mx-auto py-2">
              {/* Left Candlestick Cluster */}
              <div className="hidden sm:flex items-end gap-2 absolute -left-4 md:-left-12 lg:-left-20 top-1/2 -translate-y-1/2 pointer-events-none opacity-50 md:opacity-75 float-candles">
                {/* Candle 1 (Bullish Teal) */}
                <div className="flex flex-col items-center candle-pulse-a">
                  <div className="w-[1.5px] h-3 bg-[#3ED6B5]"></div>
                  <div className="w-3.5 h-12 rounded-[2px] bg-[#3ED6B5] shadow-[0_0_10px_rgba(62,214,181,0.6)]"></div>
                  <div className="w-[1.5px] h-4 bg-[#3ED6B5]"></div>
                </div>
                {/* Candle 2 (Bearish Gold) */}
                <div className="flex flex-col items-center candle-pulse-b">
                  <div className="w-[1.5px] h-4 bg-[#F2C230]"></div>
                  <div className="w-3.5 h-7 rounded-[2px] bg-[#F2C230] shadow-[0_0_8px_rgba(242,194,48,0.5)]"></div>
                  <div className="w-[1.5px] h-2 bg-[#F2C230]"></div>
                </div>
                {/* Candle 3 (Strong Bullish Teal) */}
                <div className="flex flex-col items-center candle-pulse-c">
                  <div className="w-[1.5px] h-2 bg-[#3ED6B5]"></div>
                  <div className="w-3.5 h-16 rounded-[2px] bg-[#3ED6B5] shadow-[0_0_12px_rgba(62,214,181,0.8)]"></div>
                  <div className="w-[1.5px] h-3 bg-[#3ED6B5]"></div>
                </div>
              </div>

              {/* Right Candlestick Cluster */}
              <div
                className="hidden sm:flex items-end gap-2 absolute -right-4 md:-right-12 lg:-right-20 top-1/2 -translate-y-1/2 pointer-events-none opacity-50 md:opacity-75 float-candles"
                style={{ animationDelay: "1.2s" }}
              >
                {/* Candle 4 (Bullish Teal) */}
                <div className="flex flex-col items-center candle-pulse-c">
                  <div className="w-[1.5px] h-3 bg-[#3ED6B5]"></div>
                  <div className="w-3.5 h-10 rounded-[2px] bg-[#3ED6B5] shadow-[0_0_10px_rgba(62,214,181,0.6)]"></div>
                  <div className="w-[1.5px] h-5 bg-[#3ED6B5]"></div>
                </div>
                {/* Candle 5 (Gold/Bearish) */}
                <div className="flex flex-col items-center candle-pulse-a">
                  <div className="w-[1.5px] h-5 bg-[#F2C230]"></div>
                  <div className="w-3.5 h-7 rounded-[2px] bg-[#F2C230] shadow-[0_0_8px_rgba(242,194,48,0.5)]"></div>
                  <div className="w-[1.5px] h-2 bg-[#F2C230]"></div>
                </div>
                {/* Candle 6 (Big Bull Teal) */}
                <div className="flex flex-col items-center candle-pulse-b">
                  <div className="w-[1.5px] h-4 bg-[#3ED6B5]"></div>
                  <div className="w-3.5 h-14 rounded-[2px] bg-[#3ED6B5] shadow-[0_0_12px_rgba(62,214,181,0.7)]"></div>
                  <div className="w-[1.5px] h-2 bg-[#3ED6B5]"></div>
                </div>
              </div>

              {/* Moving Neon Laser Trading Trendline across Title */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-visible opacity-55 z-0">
                <svg className="w-full h-28 overflow-visible laser-glide" viewBox="0 0 700 90" fill="none">
                  <path
                    d="M0,55 Q130,75 240,40 T440,48 T620,18 L700,28"
                    stroke="url(#titleLineGrad)"
                    strokeWidth="2.5"
                    strokeDasharray="6 4"
                  />
                  {/* Moving Blinking Trade Marker on the line */}
                  <circle cx="440" cy="48" r="4.5" fill="#3ED6B5" className="animate-pulse-dot" />
                  <defs>
                    <linearGradient id="titleLineGrad" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#F2C230" stopOpacity="0" />
                      <stop offset="25%" stopColor="#F2C230" stopOpacity="0.85" />
                      <stop offset="65%" stopColor="#3ED6B5" stopOpacity="1" />
                      <stop offset="100%" stopColor="#3ED6B5" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              <h1
                className="display-font leading-[0.95] tracking-wide relative z-10"
                style={{
                  fontSize: "clamp(2.6rem, 8vw, 5.2rem)",
                  color: TEXT,
                  textShadow: "0 0 35px rgba(242,194,48,0.18)",
                }}
              >
                KILLERS <span style={{ color: GOLD }}>VIP</span> SIGNALS
              </h1>
            </div>
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
                className="w-full sm:w-auto rounded-full px-8 py-3.5 font-bold transition-transform hover:scale-105"
                style={{ background: `linear-gradient(135deg, ${GOLD}, ${GOLD_DEEP})`, color: "#0A0A0A" }}
              >
                View VIP Plans
              </button>
              <button
                onClick={() => scrollTo("contact")}
                className="w-full sm:w-auto rounded-full px-8 py-3.5 font-bold transition-colors"
                style={{ border: `1px solid ${LINE}`, color: TEXT }}
              >
                Talk to an Admin
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* TICKER 1: LIVE MARKET PRICES */}
      <div
        className="overflow-hidden py-3.5 flex items-center"
        style={{ borderTop: `1px solid ${LINE}`, borderBottom: `1px solid rgba(242,194,48,0.08)`, background: BG_ELEV }}
      >
        <div className="flex w-max marquee-track">
          {[...marketTickers, ...marketTickers].map((t, i) => (
            <div key={i} className="flex items-center gap-3 px-6 text-sm whitespace-nowrap">
              <span className="font-bold text-[#F3EFE4]">{t.pair}</span>
              <span className="font-mono text-xs text-[#8B8D95]">{t.price}</span>
              <span
                className="px-2 py-0.5 rounded text-xs font-mono font-bold"
                style={{
                  color: t.up ? TEAL : "#FF5B5B",
                  background: t.up ? "rgba(62,214,181,0.12)" : "rgba(255,91,91,0.12)",
                  border: `1px solid ${t.up ? "rgba(62,214,181,0.3)" : "rgba(255,91,91,0.3)"}`,
                }}
              >
                {t.change}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* TICKER 2: MOVING BINANCE & FOREX PLATFORMS MARQUEE */}
      <div
        className="overflow-hidden py-3"
        style={{ borderBottom: `1px solid ${LINE}`, background: "rgba(10,11,14,0.95)" }}
      >
        <div className="flex w-max marquee-reverse">
          {[...platformPartners, ...platformPartners].map((p, i) => (
            <div
              key={i}
              className="flex items-center gap-2.5 px-5 py-2 mx-2 rounded-xl transition-all hover:scale-105"
              style={{
                background: "rgba(23,24,29,0.7)",
                border: "1px solid rgba(242,194,48,0.12)",
              }}
            >
              <div className="flex-shrink-0">{p.icon}</div>
              <div className="text-left">
                <div className="text-xs font-bold tracking-wider" style={{ color: p.color }}>
                  {p.name}
                </div>
                <div className="text-[10px] uppercase font-semibold text-[#8B8D95]">
                  {p.badge}
                </div>
              </div>
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

              <a
                href="https://chat.whatsapp.com/IEtjp3hJlOfFOykoE0ptAx"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full px-6 py-3.5 font-bold text-center transition-transform hover:scale-[1.03] block"
                style={{ background: GOLD, color: "#0A0A0A" }}
              >
                Join FX Group
              </a>
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
                <a
                  href="https://t.me/+rZFGwHu2Lq0xYWU1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 rounded-full px-5 py-3.5 font-bold transition-transform hover:scale-[1.03] text-center block"
                  style={{ background: TEAL, color: "#0A0A0A" }}
                >
                  Crypto Swing Group
                </a>
                <a
                  href="https://t.me/+etFvZxza_zsyODE1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 rounded-full px-5 py-3.5 font-bold transition-transform hover:scale-[1.03] text-center block"
                  style={{ background: TEAL, color: "#0A0A0A" }}
                >
                  Scalping Group
                </a>
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
                href="https://api.whatsapp.com/send/?phone=94789784846&text&type=phone_number&app_absent=0"
                target="_blank"
                rel="noreferrer"
                className="flex-1 flex items-center justify-center gap-2.5 rounded-full px-6 py-4 font-bold transition-transform hover:scale-[1.03]"
                style={{ border: `1px solid ${GOLD}`, color: GOLD }}
              >
                <MessageCircle size={19} />
                WhatsApp
              </a>
              <a
                href="https://t.me/dila_owner"
                target="_blank"
                rel="noreferrer"
                className="flex-1 flex items-center justify-center gap-2.5 rounded-full px-6 py-4 font-bold transition-transform hover:scale-[1.03]"
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
