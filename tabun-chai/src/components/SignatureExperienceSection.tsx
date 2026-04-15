import { motion } from "framer-motion";

const steps = [
  {
    id: "01",
    title: "Boiling",
    sensory: "Steam curls up with cardamom, ginger, and tea leaf oils before the first pour.",
    copy: "Every batch starts on visible heat. The boil is deliberate, not rushed, so aroma rises first and flavor follows with depth.",
  },
  {
    id: "02",
    title: "Mixing",
    sensory: "The swirl turns bold tannins into a creamy, spiced body with a warm finish.",
    copy: "Milk, tea, and spice are balanced in motion. The texture is tuned cup by cup so each sip feels rich, rounded, and clean.",
  },
  {
    id: "03",
    title: "Serving",
    sensory: "A hot pour, frothy edge, and instant comfort in hand.",
    copy: "Service is immediate while the cup is at its peak. What reaches you is hot, aromatic, and ready for roads, talks, and night energy.",
  },
];

export function SignatureExperienceSection() {
  return (
    <section id="experience" className="signature-flow mx-auto max-w-7xl px-1 py-2">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-3xl">
          <p className="menu-sketch text-sm uppercase tracking-[0.22em] text-[#ffd7b5]/86">
            Signature Experience
          </p>
          <h2 className="menu-sketch mt-2 text-4xl text-[#ffefdf] sm:text-5xl">
            Not About Us. About The Cup Journey.
          </h2>
          <p className="hero-subcaption-classy mt-3 text-base leading-7 text-[#ffe1c6]/90">
            Street credibility comes from process you can see. Heat, mix, and pour happen in front of
            you, making consistency part of the experience, not a hidden promise.
          </p>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {steps.map((step, index) => (
            <motion.article
              key={step.id}
              initial={{ opacity: 0, y: 16, rotate: index % 2 === 0 ? -2.4 : 2.4 }}
              whileInView={{ opacity: 1, y: 0, rotate: index % 2 === 0 ? -2.4 : 2.4 }}
              whileHover={{ scale: 1.028, y: -6, rotate: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: index * 0.08, duration: 0.55, ease: "easeOut" }}
              className="signature-hand-box relative overflow-hidden rounded-[30px] p-6"
            >
              <div className="absolute right-[-1.8rem] top-[-1.8rem] h-24 w-24 rounded-full bg-[#f3b681]/14 blur-2xl" />
              <p className="menu-sketch text-xs uppercase tracking-[0.2em] text-[#f9cfa9]/82">
                Step {step.id}
              </p>
              <h3 className="menu-sketch mt-2 text-3xl text-[#fff0df]">{step.title}</h3>
              <p className="hero-subcaption-classy mt-3 text-sm leading-6 text-[#ffe6cd]/88">
                {step.sensory}
              </p>
              <p className="mt-3 text-sm leading-7 text-[#ffdcc0]/82">{step.copy}</p>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
