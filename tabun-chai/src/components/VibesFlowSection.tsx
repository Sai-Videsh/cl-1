import { motion } from "framer-motion";

type VibeCase = {
  id: string;
  hook: string;
  story: string;
};

const vibeCases: VibeCase[] = [
  {
    id: "long-drive-reset",
    hook: "Pull in for 15 minutes, stretch your legs, and sip a strong Garam Chai before the next highway run.",
    story:
      "Night highway, windows half down, legs tired. You park for a short reset, share Garam Chai and Masala Fries, laugh once, breathe once, and continue fresh.",
  },
  {
    id: "tirupati-devotee-stop",
    hook: "Devotion complete, now konchem fun mode on. One hot sip, one quick bite, journey full set.",
    story:
      "Darshanam done, hearts calm, stomachs suddenly loud. One Filter Coffee, one Chicken Roll, and the ride turns from silent devotion to happy post-trip banter.",
  },
  {
    id: "release-night-reset",
    hook: "One roadside chai break can reset the whole vibe before the crowd rush.",
    story:
      "Show timings are late, energy is low, group chat is dry. You stop for Boost or Horlicks with Corn Samosa, and suddenly everyone is back in first-day-first-show mode.",
  },
  {
    id: "group-split-short",
    hook: "No debate needed, both sides leave happy and fully recharged.",
    story:
      "Half the gang wants chai, half wants coffee. No drama, no voting, just Garam Chai, Black Coffee, shared fries, and one table where everyone chills together.",
  },
  {
    id: "quick-cozy-date",
    hook: "Not a full cafe session, not a rush exit, just the right in-between pause. Side glance, shared sip, little blush guaranteed.",
    story:
      "Between two plans, you steal a small pause. Cheese Bread Omelette arrives, two Lemon Teas steam up, and the conversation gets softer, closer, and a little flirty.",
  },
  {
    id: "post-work-soft-landing",
    hook: "End the day with street warmth, light banter, and one last comfort cup.",
    story:
      "Laptop bags down, deadlines over, minds still racing. Green Tea and Veg Roll slow the pace, and your team leaves lighter than when they arrived.",
  },
  {
    id: "solo-rider-cool-weather",
    hook: "This is the cup that hits exactly when the air gets colder.",
    story:
      "You are riding solo, weather turns cool, and the road gets quiet. A hot Black Tea with Chicken Samosa feels like perfect timing and perfect company.",
  },
];

export function VibesFlowSection() {
  const trackItems = [...vibeCases, ...vibeCases];

  return (
    <section id="vibes" className="mx-auto w-full max-w-7xl py-3 sm:py-5">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.6 }}
        className="section-shell-matte-alt relative overflow-hidden rounded-[40px] px-4 py-8 sm:px-7 sm:py-10"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_14%_18%,rgba(255,189,130,0.18),transparent_42%)]" />

        <div className="relative mb-6 sm:mb-8">
          <p className="menu-sketch text-xs uppercase tracking-[0.24em] text-[#ffd8b8]/88">Vibes Lane</p>
          <h2 className="menu-sketch mt-2 text-4xl text-[#fff0df] sm:text-5xl">
            Floating Scenarios, Real Break Moments
          </h2>
          <p className="hero-subcaption-classy mt-3 max-w-3xl text-base leading-7 text-[#ffe2c7]/88">
            Swipe through moments people actually stop for.
          </p>
        </div>

        <div className="relative overflow-hidden py-5">
          <div className="vibes-orbit-track flex w-max gap-4 sm:gap-5">
            {trackItems.map((vibe, index) => (
              <motion.article
                key={`${vibe.id}-${index}`}
                whileHover={{ scale: 1.05, y: -8, rotate: 0 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="vibes-float-card group relative w-[280px] shrink-0 overflow-visible rounded-[24px] border border-white/20 bg-white/10 px-4 py-4 sm:w-[320px]"
              >
                <div className="absolute right-3 top-3 h-10 w-10 rounded-full bg-[#ffd8b3]/20 blur-xl" />
                <p className="vibes-main-hook text-sm leading-6 text-[#fff2e3]">{vibe.hook}</p>

                <div className="vibes-popup pointer-events-none absolute -top-3 left-2 right-2 z-30 rounded-2xl border border-amber-100/24 bg-[#22130c] p-4 text-sm leading-6 text-[#ffe7cf] opacity-0 shadow-[0_16px_34px_rgba(0,0,0,0.45)]">
                  {vibe.story}
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
