import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

type Offer = {
  id: string;
  title: string;
  note: string;
  code: string;
};

const offers: Offer[] = [
  {
    id: "morning-kickstart",
    title: "Morning Kickstart - 10% OFF",
    note: "Going to end at 10 AM. Come fast and grab your comfort cup now.",
    code: "SUNRISE10",
  },
  {
    id: "tea-time-pair",
    title: "Tea Time Pair - 18% OFF",
    note: "Limited time offer till 6 PM. Hurry up before it ends.",
    code: "TEATIME18",
  },
  {
    id: "after-8-special",
    title: "After 8 PM Crowd Special - 23% OFF",
    note: "Ending soon at closing time. Come fast and enjoy the night deal.",
    code: "NIGHT23",
  },
];

const whatsappNumber = "919999999999";

const getCrowdLabel = (hour: number) => {
  const isBusy = (hour >= 8 && hour <= 11) || (hour >= 17 && hour <= 22);
  return isBusy ? "Busy now" : "Chill time";
};

const getCrowdSubline = (hour: number) => {
  if ((hour >= 8 && hour <= 11) || (hour >= 17 && hour <= 22)) {
    return "Quick service, high energy, live counter rhythm.";
  }

  return "Calmer pace, easy seating, ideal for slow sips.";
};

const getOpenTargetDate = (now: Date) => {
  const target = new Date(now);
  target.setHours(7, 0, 0, 0);
  if (now.getHours() >= 23) {
    target.setDate(target.getDate() + 1);
  }
  return target;
};

const formatCountdown = (ms: number) => {
  const total = Math.max(0, Math.floor(ms / 1000));
  const hours = Math.floor(total / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const seconds = total % 60;

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
};

export function TimeOffersCrowdSection() {
  const [now, setNow] = useState(new Date());
  const [bannerIndex, setBannerIndex] = useState(0);

  useEffect(() => {
    const tick = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(tick);
  }, []);

  useEffect(() => {
    const rotate = window.setInterval(() => {
      setBannerIndex((value) => (value + 1) % 3);
    }, 3500);

    return () => window.clearInterval(rotate);
  }, []);

  const view = useMemo(() => {
    const hour = now.getHours();
    const isBusinessTime = hour >= 7 && hour < 23;
    const activeOffer = offers[Math.floor(now.getMinutes() / 5) % offers.length];

    if (isBusinessTime) {
      const resetAt = new Date(now);
      resetAt.setSeconds(0, 0);
      const currentMinutes = now.getMinutes();
      const nextFive = Math.floor(currentMinutes / 5) * 5 + 5;

      if (nextFive >= 60) {
        resetAt.setHours(resetAt.getHours() + 1);
        resetAt.setMinutes(0, 0, 0);
      } else {
        resetAt.setMinutes(nextFive, 0, 0);
      }

      const countdown = formatCountdown(resetAt.getTime() - now.getTime());

      return {
        isBusinessTime,
        activeOffer,
        countdown,
        mode: "live" as const,
      };
    }

    const openAt = getOpenTargetDate(now);
    const countdown = formatCountdown(openAt.getTime() - now.getTime());

    return {
      isBusinessTime,
      activeOffer: offers[0],
      countdown,
      mode: "closed" as const,
    };
  }, [now]);

  const bannerMessages = [
    view.mode === "live"
      ? `Live refresh cycle • Resets in ${view.countdown}`
      : `Shop opens in ${view.countdown} • 5-minute cycles start at 7:00 AM`,
    `${getCrowdLabel(now.getHours())} • ${getCrowdSubline(now.getHours())}`,
    "Fresh batches move fast during peak windows. Quick order helps skip queue time.",
  ];

  const offerForWhatsApp = view.activeOffer;
  const whatsappText = encodeURIComponent(
    `Hi Tabun Chai, I want the ${offerForWhatsApp.title} offer (${offerForWhatsApp.code}).`,
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappText}`;

  return (
    <section id="offers-crowd" className="mx-auto max-w-7xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
        className="section-shell-glass relative overflow-hidden rounded-[34px] p-4 sm:p-6"
      >
        <div className="offer-scan-line pointer-events-none absolute inset-0" />

        <div className="relative rounded-[20px] border border-white/18 bg-black/20 px-4 py-3">
          <AnimatePresence mode="wait">
            <motion.p
              key={bannerMessages[bannerIndex]}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="menu-sketch text-sm text-[#ffe6cd] sm:text-base"
            >
              {bannerMessages[bannerIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

        <div className="relative mt-4 grid gap-4 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
          <div className="rounded-[20px] border border-white/16 bg-white/8 px-4 py-4 text-center lg:text-left">
            <p className="menu-sketch text-xs uppercase tracking-[0.2em] text-[#ffd7b7]/84">Crowd Signal</p>
            <p
              className={`menu-sketch mt-2 text-3xl ${
                getCrowdLabel(now.getHours()) === "Busy now" ? "text-amber-200" : "text-emerald-200"
              }`}
            >
              {getCrowdLabel(now.getHours())}
            </p>
            <p className="mt-1 text-xs text-[#ffdcbc]/82">{getCrowdSubline(now.getHours())}</p>
          </div>

          <div className="mx-auto h-20 w-px bg-gradient-to-b from-transparent via-[#ffd7b3]/70 to-transparent lg:h-28" />

          <div className="rounded-[20px] border border-amber-100/24 bg-[#f7d8b9]/10 px-4 py-4 text-center lg:text-right">
            <p className="menu-sketch text-xs uppercase tracking-[0.2em] text-[#ffd7b7]/84">
              {view.mode === "live" ? "5 Min Refresh Countdown" : "Opens In"}
            </p>
            <p className="menu-sketch mt-2 text-4xl text-[#fff1e2] sm:text-5xl">{view.countdown}</p>
            <p className="mt-1 text-xs text-[#ffdcbc]/82">
              {view.mode === "live"
                ? `${offerForWhatsApp.title} • auto-resets every 5 minutes during business hours`
                : "Business time: 7:00 AM - 11:00 PM"}
            </p>
          </div>
        </div>

        <div className="relative mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-2 text-xs text-[#ffe0c4]/84">
            <span className="rounded-full border border-white/18 bg-white/8 px-3 py-1">Daily: 7:00 AM - 11:00 PM</span>
            <span className="rounded-full border border-white/18 bg-white/8 px-3 py-1">Peak: 8-11 AM, 5-10 PM</span>
            <span className="rounded-full border border-white/18 bg-white/8 px-3 py-1">260+ Happy Customers</span>
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="menu-sketch inline-flex h-11 items-center justify-center rounded-full border border-emerald-200/36 bg-emerald-200/18 px-5 text-xs uppercase tracking-[0.14em] text-emerald-100 transition-all hover:-translate-y-0.5"
          >
            Claim on WhatsApp
          </a>
        </div>
      </motion.div>
    </section>
  );
}
