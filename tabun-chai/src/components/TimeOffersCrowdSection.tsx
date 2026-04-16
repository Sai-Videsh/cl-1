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

const getOfferEndTime = (now: Date, offerId: string) => {
  const target = new Date(now);
  target.setSeconds(0, 0);
  
  switch (offerId) {
    case "morning-kickstart":
      target.setHours(10, 0, 0, 0);
      break;
    case "tea-time-pair":
      target.setHours(18, 0, 0, 0);
      break;
    case "after-8-special":
      target.setHours(23, 0, 0, 0);
      break;
    default:
      target.setHours(23, 0, 0, 0);
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
    
    // Select active offer based on time of day
    let activeOffer: Offer;
    if (hour >= 7 && hour < 10) {
      activeOffer = offers[0]; // Morning Kickstart (7-10 AM)
    } else if (hour >= 10 && hour < 18) {
      activeOffer = offers[1]; // Tea Time Pair (10 AM - 6 PM)
    } else {
      activeOffer = offers[2]; // After 8 PM Special (6-11 PM)
    }

    if (isBusinessTime) {
      const offerEndTime = getOfferEndTime(now, activeOffer.id);
      const countdown = formatCountdown(offerEndTime.getTime() - now.getTime());

      return {
        isBusinessTime,
        activeOffer,
        countdown,
        mode: "live" as const,
      };
    }

    // Shop closed - show next opening time (7 AM)
    const openAt = new Date(now);
    openAt.setHours(7, 0, 0, 0);
    if (now.getHours() >= 23) {
      openAt.setDate(openAt.getDate() + 1);
    }
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
      ? `Today's Offer: ${view.activeOffer.title} • Ends in ${view.countdown}`
      : `Shop opens in ${view.countdown} • Morning Kickstart (10% OFF) starts at 7:00 AM`,
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
              {view.mode === "live" ? "Today's Offer" : "Opens In"}
            </p>
            <p className="menu-sketch mt-2 text-2xl text-[#fff1e2] sm:text-3xl">
              {view.mode === "live" ? view.activeOffer.title : view.countdown}
            </p>
            <p className="menu-sketch mt-1 text-3xl text-[#ffb178] sm:text-4xl">
              {view.mode === "live" ? view.countdown : "Morning Kickstart (10% OFF)"}
            </p>
            <p className="mt-1 text-xs text-[#ffdcbc]/82">
              {view.mode === "live"
                ? "Hurry up before it ends!"
                : "Business time: 7:00 AM - 11:00 PM"}
            </p>
          </div>
        </div>

        <div className="relative mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-2 text-xs text-[#ffe0c4]/84">
            <span className="rounded-full border border-white/18 bg-white/8 px-3 py-1">Daily: 7:00 AM - 11:00 PM</span>
            <span className="rounded-full border border-white/18 bg-white/8 px-3 py-1">Peak: 8-11 AM, 5-10 PM</span>
            <span className="rounded-full border border-white/18 bg-white/8 px-3 py-1">260+ Happy Customers</span>
            <span className="rounded-full border border-white/18 bg-white/8 px-3 py-1">Avg Prep: 4-6 mins</span>
            <span className="rounded-full border border-white/18 bg-white/8 px-3 py-1">Premium Quality</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
