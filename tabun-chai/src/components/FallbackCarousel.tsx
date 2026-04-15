import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

type FallbackCarouselProps = {
  images: string[];
  altPrefix?: string;
};

export function FallbackCarousel({ images, altPrefix = "Tabun Chai" }: FallbackCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (images.length < 2) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % images.length);
    }, 3600);

    return () => window.clearInterval(timer);
  }, [images.length]);

  return (
    <div className="absolute inset-0">
      <AnimatePresence mode="wait">
        <motion.img
          key={images[activeIndex]}
          src={images[activeIndex]}
          alt={`${altPrefix} fallback image ${activeIndex + 1}`}
          className="h-full w-full object-cover"
          initial={{ opacity: 0.25, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0.35, scale: 0.98 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </AnimatePresence>

      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/30 bg-black/20 px-3 py-2 backdrop-blur-xl">
        {images.map((image, index) => (
          <button
            key={image}
            type="button"
            onClick={() => setActiveIndex(index)}
            aria-label={`Show fallback image ${index + 1}`}
            className={`h-2.5 rounded-full transition-all ${
              index === activeIndex ? "w-8 bg-amber-100" : "w-2.5 bg-white/55"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
