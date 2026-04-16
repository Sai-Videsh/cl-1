import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { FallbackCarousel } from "./FallbackCarousel";

const trendLines = [
  "Tonight trend: Spiced chai for late show crowds",
  "Release-week special: Fresh karak with spring rolls",
  "City favorite right now: Steaming cups and street bites",
  "Weekend pulse: Hot chai, momos, and friends",
];

const fallbackImages = [
  "/media/fallback-maggi.webp",
  "/media/fallback-spring-roll.webp",
  "/media/fallback-momos.webp",
  "/media/fallback-fries.webp",
];

const directionsUrl =
  "https://www.google.com/maps/place/Tabun+Chai/@13.2053398,78.9045259,17z/data=!4m16!1m9!3m8!1s0x3bad655ad323fa63:0x52023a4eb52eb34b!2sTabun+Chai!8m2!3d13.2053398!4d78.9045014!9m1!1b1!16s%2Fg%2F11ys7qvgyz!3m5!1s0x3bad655ad323fa63:0x52023a4eb52eb34b!8m2!3d13.2053398!4d78.9045014!16s%2Fg%2F11ys7qvgyz?entry=ttu&g_ep=EgoyMDI2MDQxMi4wIKXMDSoASAFQAw%3D%3D";
const whatsappUrl = "https://wa.me/919999999999?text=Hi%20Tabun%20Chai%2C%20I%20want%20to%20order.";

export function HeroSection() {
  const [isMobile, setIsMobile] = useState<boolean>(() => window.innerWidth < 768);
  const [activeTrend, setActiveTrend] = useState(0);
  const [videoFailed, setVideoFailed] = useState(false);
  const [isCrowdLive, setIsCrowdLive] = useState(() => {
    const hour = new Date().getHours();
    return hour >= 18 || hour <= 1;
  });
  // Animation states for intro
  const [showBlur, setShowBlur] = useState(false);
  const [showMain, setShowMain] = useState(false);

  // Prevent scroll until main glass is shown
  useEffect(() => {
    if (!showMain) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showMain]);

  useEffect(() => {
    // Hero intro: 3s video, 0.5s blur, then show main
    setShowBlur(false);
    setShowMain(false);
    const blurTimer = setTimeout(() => setShowBlur(true), 3000);
    const mainTimer = setTimeout(() => setShowMain(true), 3500);
    return () => {
      clearTimeout(blurTimer);
      clearTimeout(mainTimer);
    };
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");

    const handleChange = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches);
      setVideoFailed(false);
    };

    setIsMobile(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveTrend((value) => (value + 1) % trendLines.length);
    }, 3600);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const updateLiveState = () => {
      const hour = new Date().getHours();
      setIsCrowdLive(hour >= 18 || hour <= 1);
    };

    updateLiveState();
    const timer = window.setInterval(updateLiveState, 60000);

    return () => window.clearInterval(timer);
  }, []);

  const source = useMemo(
    () => ({
      video: isMobile ? "/media/hero-mobile.mp4" : "/media/hero-desktop.mp4",
      poster: isMobile ? "/media/hero-mobile-poster.jpg" : "/media/hero-desktop-poster.jpg",
    }),
    [isMobile],
  );

  return (
    <section className="relative min-h-screen overflow-hidden text-[#fff7ed]">
      <div className="absolute inset-0">
        {videoFailed ? (
          <FallbackCarousel images={fallbackImages} />
        ) : (
          <video
            key={source.video}
            className={`h-full w-full object-cover transition-all duration-700 ${showBlur ? 'blur-sm scale-105' : ''}`}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster={source.poster}
            onError={() => setVideoFailed(true)}
          >
            <source src={source.video} type="video/mp4" />
          </video>
        )}
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_18%,rgba(222,121,41,0.1),transparent_48%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#1f130d]/28 via-[#2f1c13]/10 to-[#120804]/36" />
      <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(255,178,112,0.04),transparent_38%,rgba(120,48,18,0.08)_100%)]" />

      <AnimatePresence>
        {showMain && (
          <motion.div
            initial={{ opacity: 0, y: 70 }}
            animate={{ opacity: 1, y: 40 }}
            exit={{ opacity: 0, y: 70 }}
            transition={{ duration: 1.4, ease: "easeOut" }}
            className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col justify-center px-3 pb-4 pt-16 sm:px-10 sm:pb-10 sm:pt-24 xl:px-14 xl:pb-16"
          >
            <motion.div
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="mx-auto w-full max-w-[56rem] min-h-[420px] rounded-[32px] border border-white/16 bg-white/3 p-5 backdrop-blur-xl shadow-[0_20px_60px_rgba(8,4,2,0.22)] flex flex-col gap-4 sm:rounded-[38px] sm:p-8"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <p className="hero-badge-italic inline-flex items-center rounded-full border border-amber-100/28 bg-amber-50/6 px-5 py-1.5 text-sm text-amber-50/90 sm:text-base">
                  Dynamic Entry
                </p>
                <span
                  className={`inline-flex items-center justify-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] shadow-[0_0_0_rgba(0,0,0,0)] transition-shadow ${
                    isCrowdLive
                      ? "border-emerald-200/45 bg-emerald-200/18 text-emerald-100 shadow-[0_0_18px_rgba(110,255,188,0.55)]"
                      : "border-amber-200/42 bg-amber-200/16 text-amber-100 shadow-[0_0_16px_rgba(255,213,134,0.42)]"
                  }`}
                >
                  <span
                    className={`h-2.5 w-2.5 rounded-full ${isCrowdLive ? "bg-emerald-300" : "bg-amber-200"} animate-pulse`}
                  />
                  {isCrowdLive ? "Open now" : "Live now"}
                </span>
              </div>

              {/* Title */}
              <h1 className="hero-caption-handwritten text-center text-[2.7rem] font-normal leading-[1.05] tracking-tight text-amber-50 sm:text-6xl xl:text-7xl">
                Taste the Pause Between Destinations.
              </h1>

              {/* Scrolling captions */}
              <div className="mx-auto w-full max-w-3xl rounded-2xl border border-white/14 bg-white/4 px-4 py-3 text-center text-sm leading-6 text-amber-50/95 backdrop-blur-md sm:text-base">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={trendLines[activeTrend]}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                    className="hero-subcaption-classy max-md:text-[0.95rem]"
                  >
                    {trendLines[activeTrend]}
                  </motion.p>
                </AnimatePresence>
              </div>

              {/* Today's offer */}
              <span className="hero-offer-chip relative mx-auto mt-2 inline-flex h-11 items-center overflow-hidden rounded-full border px-5 text-sm font-semibold text-amber-50/95">
                <span className="hero-offer-glint" />
                <span className="relative z-10 mr-2 text-[#ffe0b8]">Today's special:</span>
                <span className="relative z-10 text-[#fff6e9]">Karak Chai + Masala Fries</span>
              </span>

              {/* Buttons in a single horizontal line */}
              <div className="mt-4 flex w-full flex-row items-center justify-center gap-4">
                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => { if (typeof window !== 'undefined' && window.gtag) window.gtag('event', 'direction_click', { event_category: 'engagement', event_label: 'maps_open', value: 1 }); }}
                  className="inline-flex h-11 min-w-[120px] items-center justify-center rounded-full border border-amber-100/24 bg-amber-100/11 px-3 text-sm font-semibold text-amber-50 backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:bg-amber-100/18"
                >
                  <span className="relative z-10">Get Directions</span>
                </a>
                <a
                  href="#menu"
                  onClick={() => { if (typeof window !== 'undefined' && window.gtag) window.gtag('event', 'menu_click', { event_category: 'engagement', event_label: 'menu_navigate', value: 1 }); }}
                  className="inline-flex h-11 min-w-[120px] items-center justify-center rounded-full border border-white/18 bg-white/7 px-3 text-sm font-semibold text-amber-50 backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:bg-white/12"
                >
                  Go to Menu
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
