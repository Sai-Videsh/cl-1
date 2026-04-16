import { motion } from "framer-motion";
import { useState } from "react";

type Review = {
  name: string;
  profile: string;
  when: string;
  quote: string;
  rating: number;
  source: string;
  sourceUrl: string;
  badge?: string;
};

const googleMapsReviewsUrl =
  "https://www.google.com/maps/search/?api=1&query=Tabun+Chai+Tirupati";

const reviewUrls: Record<string, string> = {
  "poorna chandra": "https://maps.app.goo.gl/KuRrQYCeTxuTFAGN9",
  "Vakada Jhansi": "https://maps.app.goo.gl/y3UhJakCnGqLF5k39",
  "Gopinadh Gali": "https://maps.app.goo.gl/yqs4NqxXDCQQbBtx8",
  "Pavan Sagar": "https://maps.app.goo.gl/UEycmjyVEHUXusCK7",
  "Poojitha Reddy": "https://maps.app.goo.gl/oxoLD1NLWLa9WX2r5",
  "Vamsi Naidu": "https://maps.app.goo.gl/NL4Z6XxFunbL7bRGA",
};

const featuredReviews: Review[] = [
  {
    name: "poorna chandra",
    profile: "1 review",
    when: "2 months ago",
    rating: 5,
    source: "Google",
    sourceUrl: reviewUrls["poorna chandra"],
    quote: "Foods great, nice place to chill",
  },
  {
    name: "Vakada Jhansi",
    profile: "Local Guide · 20 reviews · 17 photos",
    when: "a month ago",
    rating: 5,
    source: "Google",
    sourceUrl: reviewUrls["Vakada Jhansi"],
    quote: "Momos here tastes good 👍 …",
  },
  {
    name: "Gopinadh Gali",
    profile: "Local Guide · 137 reviews · 120 photos",
    when: "a month ago",
    rating: 5,
    source: "Google",
    sourceUrl: reviewUrls["Gopinadh Gali"],
    quote: "Very nice taste and preferable for quick relax..",
  },
  {
    name: "Pavan Sagar",
    profile: "2 reviews",
    when: "2 months ago",
    rating: 5,
    source: "Google",
    sourceUrl: reviewUrls["Pavan Sagar"],
    quote:
      "Some places don't just serve chai they serve comfort This chai warmed my heart as much as my soul. Absolutely loved it More",
  },
  {
    name: "Poojitha Reddy",
    profile: "",
    when: "a day ago",
    badge: "New",
    rating: 5,
    source: "Google",
    sourceUrl: reviewUrls["Poojitha Reddy"],
    quote:
      "Nice Cafe, i really enjoyed the atmosphere of this cafe and i never miss the famous tabun chai taste whenever i visit More",
  },
  {
    name: "Vamsi Naidu",
    profile: "3 reviews · 18 photos",
    when: "2 weeks ago",
    badge: "New",
    rating: 5,
    source: "Google",
    sourceUrl: reviewUrls["Vamsi Naidu"],
    quote:
      "The pace is very good,\nwith green environment, peaceful air,\nDelicious food must try everyone.\nFood:…",
  },
];

const liveSnapshots = [
  {
    image: "/media/fallback-maggi.webp",
    title: "Counter rush",
    time: "Updated 8 min ago",
  },
  {
    image: "/media/fallback-momos.webp",
    title: "Late-evening crowd",
    time: "Updated 14 min ago",
  },
  {
    image: "/media/fallback-spring-roll.webp",
    title: "Fresh batch served",
    time: "Updated 22 min ago",
  },
  {
    image: "/media/collage-chai-pour.jpg",
    title: "Fresh chai pour",
    time: "Updated 6 min ago",
  },
  {
    image: "/media/collage-chai-trio.jpg",
    title: "Serving line-up",
    time: "Updated 11 min ago",
  },
];

const starText = (rating: number) => "★".repeat(rating) + "☆".repeat(5 - rating);

export function SocialProofWall() {
  const [hoveredReview, setHoveredReview] = useState<string | null>(null);
  const [activeSnapshotIndex, setActiveSnapshotIndex] = useState(0);
  const [hoveredSnapshot, setHoveredSnapshot] = useState<number | null>(null);

  const rotateSnapshot = (direction: "next" | "prev") => {
    setActiveSnapshotIndex((current) => {
      const total = liveSnapshots.length;
      if (direction === "next") {
        return (current + 1) % total;
      }
      return (current - 1 + total) % total;
    });
  };

  const stackOffset = (index: number) => {
    const total = liveSnapshots.length;
    const raw = (index - activeSnapshotIndex + total) % total;
    return raw <= Math.floor(total / 2) ? raw : raw - total;
  };

  return (
    <section id="proof" className="mx-auto w-full max-w-[108rem]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col items-center gap-3 text-center">
          <p className="menu-sketch text-sm uppercase tracking-[0.2em] text-[#ffd9ba]/88">Testimonials</p>
          <h2 className="menu-sketch text-4xl text-[#ffefdf] sm:text-5xl">Real Voices, Unfiltered</h2>
          <p className="text-sm text-[#ffd7b6]/84">4.8 / 5 based on 48 Google reviews</p>
        </div>

        <div className="mt-8 px-4 sm:px-8 grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-8">
          {featuredReviews.map((review, index) => (
            <motion.article
              key={review.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: index * 0.07, duration: 0.35 }}
              animate={{ y: [0, -5, 0] }}
              onMouseEnter={() => setHoveredReview(review.name)}
              onMouseLeave={() => setHoveredReview(null)}
              className="review-flip-shell relative h-[200px] cursor-pointer rounded-[14px] sm:h-[216px]"
            >
              <motion.div
                animate={{ rotateY: hoveredReview === review.name ? 180 : 0 }}
                transition={{ duration: 0.55, ease: "easeInOut" }}
                className="review-flip-inner"
              >
                <div className="review-face review-front rounded-[14px] border border-white/18 bg-[#f7e8d7]/8 p-4 backdrop-blur-xl sm:p-5">
                  <span className="review-shine" />

                  <div className="flex h-full flex-col gap-4">
                    <div className="flex items-start justify-between gap-3">
                      <p className="menu-sketch text-[2rem] leading-[1.05] text-[#fff0df]">{review.name}</p>
                      <span className="rounded-full border border-amber-100/32 bg-amber-100/12 px-3 py-1 text-sm font-semibold text-amber-100">
                        {starText(review.rating)}
                      </span>
                    </div>

                    <div className="space-y-2">
                      {review.profile ? <p className="text-[13px] leading-5 text-[#ffd1ae]/86">{review.profile}</p> : null}
                      <p className="text-xs uppercase tracking-[0.12em] text-[#ffd1ae]/86">
                        {review.when} on {review.source}
                      </p>
                      {review.badge ? (
                        <p className="text-xs uppercase tracking-[0.12em] text-[#ffe4c8]/90">
                          {review.badge}
                        </p>
                      ) : null}
                    </div>

                    <p className="mt-auto text-xs uppercase tracking-[0.14em] text-[#ffd8ba]/78">Tap card to read full review</p>
                  </div>
                </div>

                <div className="review-face review-back rounded-[14px] border border-emerald-200/24 bg-[linear-gradient(155deg,rgba(54,38,25,0.95),rgba(20,13,9,0.96))] p-4 text-[#ffe8d3] sm:p-5">
                  <div className="flex h-full flex-col gap-2.5">
                    <p className="menu-sketch text-xl text-[#fff2e3]">Original Review</p>
                    <p className="whitespace-pre-line text-[15px] leading-6 text-[#ffe1c7]/92">{review.quote}</p>

                    <div className="mt-auto flex items-center justify-between gap-3">
                      <span className="text-[13px] uppercase tracking-[0.12em] text-[#ffd6b3]/84">{review.source}</span>
                      <a
                        href={review.sourceUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => { if (typeof window !== 'undefined' && window.gtag) window.gtag('event', 'review_click', { event_category: 'engagement', event_label: 'review_' + review.name.replace(/\s+/g, '_').toLowerCase(), value: 1 }); }}
                        className="menu-sketch inline-flex h-10 items-center justify-center rounded-full border border-white/28 bg-white/10 px-4 text-sm uppercase tracking-[0.14em] text-[#fff1e2] transition-colors hover:bg-white/16"
                      >
                        Open Review
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.article>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.45 }}
        className="relative mt-14 -mx-5 bg-[linear-gradient(180deg,rgba(40,22,12,0.62)_0%,rgba(58,31,17,0.74)_52%,rgba(82,46,26,0.66)_100%)] px-5 py-8 sm:-mx-10 sm:px-10 sm:py-10 lg:-mx-14 lg:px-14"
      >
        <div className="mb-5 flex flex-col items-center gap-2.5 text-center">
          <p className="menu-sketch text-xs uppercase tracking-[0.22em] text-[#ffd9ba]/86">Photo Collage</p>
          <h3 className="menu-sketch text-3xl leading-tight text-[#fff0df] sm:text-4xl">Live Moments From Tabun Chai</h3>
          <p className="max-w-2xl text-base text-[#ffd7b6]/88">Swipe the center photo to reorder the stack and explore recent snapshots.</p>
        </div>

        <div className="relative h-[320px]">
          {liveSnapshots.map((snapshot, index) => {
            const offset = stackOffset(index);
            const isCenter = offset === 0;
            const isPopped = hoveredSnapshot === index;

            let x = 0;
            let y = 0;
            let rotate = 0;
            let scale = 1;
            let opacity = 1;
            let zIndex = 20;

            // All cards (except center) tilt to the right for alignment
            if (offset === -2) {
              x = -198;
              y = 18;
              rotate = 18;
              scale = 0.8;
              opacity = 0.66;
              zIndex = 10;
            } else if (offset === -1) {
              x = -104;
              y = 8;
              rotate = 10;
              scale = 0.9;
              opacity = 0.86;
              zIndex = 15;
            } else if (offset === 1) {
              x = 104;
              y = 8;
              rotate = 10;
              scale = 0.9;
              opacity = 0.86;
              zIndex = 15;
            } else if (offset === 2) {
              x = 198;
              y = 18;
              rotate = 18;
              scale = 0.8;
              opacity = 0.66;
              zIndex = 10;
            }

            if (isPopped) {
              rotate = rotate > 0 ? Math.max(4, rotate - 5) : rotate < 0 ? Math.min(-4, rotate + 5) : 0;
              y -= 10;
              scale = isCenter ? 1.08 : scale + 0.08;
              opacity = 1;
              zIndex = 40;
            }

            return (
              <motion.figure
                key={snapshot.title}
                initial={false}
                animate={{ x, y, rotate, scale, opacity }}
                transition={{ type: "spring", stiffness: 260, damping: 26 }}
                drag={isCenter ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={(_, info) => {
                  if (!isCenter) {
                    return;
                  }

                  if (info.offset.x < -65) {
                    rotateSnapshot("next");
                  } else if (info.offset.x > 65) {
                    rotateSnapshot("prev");
                  }
                }}
                onMouseEnter={() => setHoveredSnapshot(index)}
                onMouseLeave={() => setHoveredSnapshot(null)}
                onClick={() => setActiveSnapshotIndex(index)}
                className="absolute left-1/2 top-1/2 h-[224px] w-[58%] max-w-[300px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[18px] shadow-[0_26px_52px_rgba(0,0,0,0.42)] sm:h-[236px] sm:w-[54%]"
                style={{ zIndex }}
              >
                <div
                  className={`pointer-events-none absolute left-1/2 top-3 z-20 w-[86%] -translate-x-1/2 rounded-xl border border-white/28 bg-[linear-gradient(165deg,rgba(67,36,20,0.94),rgba(24,12,7,0.95))] px-3 py-2 text-center shadow-[0_12px_24px_rgba(0,0,0,0.42)] transition-all duration-250 ${
                    isPopped ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
                  }`}
                >
                  <p className="menu-sketch text-sm text-[#fff0df]">{snapshot.title}</p>
                </div>

                <img src={snapshot.image} alt={snapshot.title} className="h-full w-full object-cover" />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent px-3 py-2">
                  <p className="menu-sketch text-base text-[#fff0df]">{snapshot.title}</p>
                  <p className="text-xs text-[#ffd1ae]/84">{snapshot.time}</p>
                </figcaption>
              </motion.figure>
            );
          })}
        </div>

        <div className="mt-3 flex items-center justify-center gap-2">
          {liveSnapshots.map((snapshot, index) => (
            <button
              key={snapshot.title}
              type="button"
              onClick={() => setActiveSnapshotIndex(index)}
              className={`h-2.5 rounded-full transition-all ${
                index === activeSnapshotIndex ? "w-7 bg-[#ffe6cd]" : "w-2.5 bg-white/30"
              }`}
              aria-label={`Show snapshot ${index + 1}`}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
