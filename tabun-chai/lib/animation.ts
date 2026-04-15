import gsap from "gsap";

export const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export const staggerContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

export const rotateLoop = (element: gsap.TweenTarget, duration = 10) => {
  gsap.to(element, {
    rotate: 360,
    duration,
    repeat: -1,
    ease: "linear",
  });
};