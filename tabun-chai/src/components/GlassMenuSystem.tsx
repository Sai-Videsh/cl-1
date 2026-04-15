import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

type MenuCategory = "chai" | "snacks" | "specials";

type MenuItem = {
  id: string;
  name: string;
  price: number;
  category: MenuCategory;
  tag: string;
};

const menuItems: MenuItem[] = [
  { id: "garam-chai", name: "Garam Chai", price: 15, category: "chai", tag: "Hot Sips" },
  { id: "filter-coffee", name: "Filter Coffee", price: 25, category: "chai", tag: "Hot Sips" },
  { id: "boost-horlicks", name: "Boost / Horlicks", price: 25, category: "chai", tag: "Hot Sips" },
  { id: "milk-badam", name: "Milk / Badam", price: 30, category: "chai", tag: "Hot Sips" },
  { id: "lemon-tea", name: "Lemon Tea", price: 25, category: "chai", tag: "Hot Sips" },
  { id: "green-tea", name: "Green Tea", price: 25, category: "chai", tag: "Hot Sips" },
  { id: "black-tea", name: "Black Tea", price: 20, category: "chai", tag: "Hot Sips" },
  { id: "black-coffee", name: "Black Coffee", price: 30, category: "chai", tag: "Hot Sips" },

  { id: "french-fries", name: "French Fries", price: 60, category: "snacks", tag: "French Fries" },
  { id: "masala-fries", name: "Masala Fries", price: 70, category: "snacks", tag: "French Fries" },
  { id: "omelette", name: "Omelette", price: 30, category: "snacks", tag: "Omelette" },
  { id: "cheese-omelette", name: "Cheese Omelette", price: 40, category: "snacks", tag: "Omelette" },
  { id: "bread-omelette", name: "Bread Omelette", price: 50, category: "snacks", tag: "Omelette" },
  { id: "cheese-bread-omelette", name: "Cheese Bread Omelette", price: 60, category: "snacks", tag: "Omelette" },
  { id: "corn-samosa", name: "Corn Samosa", price: 50, category: "snacks", tag: "Samosa" },
  { id: "chicken-samosa", name: "Chicken Samosa", price: 60, category: "snacks", tag: "Samosa" },
  { id: "veg-roll", name: "Veg Roll", price: 50, category: "snacks", tag: "Rolls" },
  { id: "chicken-roll", name: "Chicken Roll", price: 70, category: "snacks", tag: "Rolls" },

  { id: "maggie-plain", name: "Maggie Plain", price: 40, category: "specials", tag: "Maggie" },
  { id: "maggie-masala", name: "Maggie Masala", price: 50, category: "specials", tag: "Maggie" },
  { id: "egg-maggie-masala", name: "Egg Maggie Masala", price: 60, category: "specials", tag: "Maggie" },
  { id: "mushroom-maggie", name: "Mushroom Maggie", price: 70, category: "specials", tag: "Maggie" },
  { id: "panner-maggie", name: "Panner Maggie", price: 70, category: "specials", tag: "Maggie" },
  { id: "cheese-maggie", name: "Cheese Maggie", price: 60, category: "specials", tag: "Maggie" },
];

const categoryLabels: Record<MenuCategory, string> = {
  chai: "Chai",
  snacks: "Snacks",
  specials: "Specials",
};

export function GlassMenuSystem() {
  const [activeCategory, setActiveCategory] = useState<MenuCategory>("chai");
  const [orbitPhase, setOrbitPhase] = useState(0);

  const filteredItems = useMemo(
    () => menuItems.filter((item) => item.category === activeCategory),
    [activeCategory],
  );

  const orbitItems = useMemo(() => filteredItems.slice(0, 6), [filteredItems]);
  const orbitRadiusX = 165;
  const orbitRadiusY = 205;

  useEffect(() => {
    const timer = window.setInterval(() => {
      setOrbitPhase((current) => current + 0.28);
    }, 85);

    return () => window.clearInterval(timer);
  }, []);

  const handleCategorySelect = (category: MenuCategory) => {
    const isSameCategory = category === activeCategory;
    setActiveCategory(category);
    setOrbitPhase((current) => current + (isSameCategory ? 38 : 94));
  };

  return (
    <section id="menu" className="mx-auto max-w-7xl">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.55 }}
        className="px-1 py-2 sm:px-2"
      >
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="menu-sketch text-sm tracking-[0.24em] text-[#ffd8b6]/88">GLASS MENU SYSTEM</p>
            <h2 className="menu-sketch mt-2 text-4xl font-semibold tracking-wide text-[#fff0df] sm:text-5xl">
              Vertical Orbit Menu
            </h2>
          </div>

          <div className="inline-flex w-full flex-wrap items-center gap-2 rounded-full border border-white/18 bg-black/20 p-2 backdrop-blur-xl sm:w-auto">
            {(Object.keys(categoryLabels) as MenuCategory[]).map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => handleCategorySelect(category)}
                className="relative rounded-full px-4 py-2 text-sm font-semibold text-[#ffe5cd]"
              >
                {activeCategory === category ? (
                  <motion.span
                    layoutId="menu-category-pill"
                    className="absolute inset-0 rounded-full border border-white/40 bg-white/16"
                    transition={{ type: "spring", stiffness: 320, damping: 28 }}
                  />
                ) : null}
                <span className="menu-sketch relative tracking-[0.08em]">{categoryLabels[category]}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <div className="relative mx-auto w-full max-w-[560px] [perspective:1200px]">
            <div className="relative mx-auto h-[440px] w-[360px] sm:h-[500px] sm:w-[460px]">
              <div className="absolute inset-0 rounded-full border border-white/16 bg-[radial-gradient(circle,rgba(255,229,200,0.08)_0%,rgba(255,190,136,0.05)_38%,rgba(17,8,4,0)_72%)]" />
              <div className="absolute inset-[12%] rounded-full border border-white/12" />

              {orbitItems.map((item, index) => {
                const angleDeg = orbitPhase + (360 / orbitItems.length) * index;
                const angleRad = (angleDeg * Math.PI) / 180;
                const x = Math.sin(angleRad) * orbitRadiusX;
                const y = -Math.cos(angleRad) * orbitRadiusY;
                const tilt = Math.sin((angleRad * 2) / 3) * 3;

                return (
                  <motion.article
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.92 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.15 }}
                    animate={{ x, y, rotate: tilt }}
                    whileHover={{ y: y - 10, scale: 1.05, rotate: tilt * 0.6 }}
                    transition={{ type: "tween", duration: 0.75, ease: "linear" }}
                    className="group/menu absolute left-1/2 top-1/2 z-10 w-[156px] -translate-x-1/2 -translate-y-1/2 hover:z-50"
                  >
                    <div className="rounded-[20px] border border-white/25 bg-[linear-gradient(145deg,rgba(255,236,215,0.2),rgba(57,31,18,0.68))] px-3 py-2 text-center shadow-[0_12px_24px_rgba(12,6,2,0.36)] backdrop-blur-xl transition-transform transition-colors group-hover/menu:bg-[linear-gradient(145deg,rgba(255,240,220,0.28),rgba(66,36,21,0.78))] group-hover/menu:rotate-2">
                      <p className="menu-sketch truncate text-[12px] uppercase tracking-[0.12em] text-[#ffd7b3]/84">{item.tag}</p>
                      <p className="menu-sketch mt-0.5 truncate text-lg leading-tight text-[#fff2e3]">{item.name}</p>
                      <p className="menu-sketch mt-0.5 text-xl leading-none text-[#ffd796]">Rs.{item.price}</p>
                    </div>
                  </motion.article>
                );
              })}

              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 6.2, ease: "easeInOut", repeat: Infinity }}
                className="absolute left-1/2 top-1/2 z-20 flex h-[126px] w-[126px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-white/26 bg-[linear-gradient(150deg,rgba(255,222,189,0.24),rgba(58,31,17,0.82))] text-center shadow-[0_14px_28px_rgba(10,5,2,0.34)] backdrop-blur-xl"
              >
                <p className="menu-sketch text-[11px] uppercase tracking-[0.15em] text-[#ffd8ba]/86">Now Orbiting</p>
                <p className="menu-sketch mt-1 text-xl text-[#fff1e2]">{categoryLabels[activeCategory]}</p>
                <p className="mt-1 text-[11px] uppercase tracking-[0.12em] text-[#ffd5b3]/82">{filteredItems.length} options</p>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
