import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";

type NavItem = {
  id: string;
  label: string;
  icon: JSX.Element;
};

const navItems: NavItem[] = [
  {
    id: "entry",
    label: "Entry",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" aria-hidden="true">
        <path d="M3 11.8 12 4l9 7.8v8.2h-6.2v-5.5H9.2V20H3v-8.2Z" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: "offers-crowd",
    label: "Offers",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" aria-hidden="true">
        <path d="M5 5h14v14H5V5Zm3 3v8h8V8H8Zm1.6 1.7h4.8v1.6H9.6V9.7Zm0 2.8h3.2v1.6H9.6v-1.6Z" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: "experience",
    label: "Experience",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" aria-hidden="true">
        <path d="M11 3h2v8h-2V3Zm5.66 2.34 1.41 1.41-5.66 5.66-1.41-1.41 5.66-5.66ZM6.93 6.75l1.41-1.41 5.66 5.66-1.41 1.41-5.66-5.66ZM4 13h16v2H4v-2Zm2.5 4.5h11v2h-11v-2Z" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: "menu",
    label: "Menu",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" aria-hidden="true">
        <path d="M4 6h16v2H4V6Zm0 5h16v2H4v-2Zm0 5h11v2H4v-2Z" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: "vibes",
    label: "Vibes",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" aria-hidden="true">
        <path d="M12 21s-7-4.7-7-10.1A4.6 4.6 0 0 1 9.5 6c1 0 1.9.34 2.5 1.03A3.2 3.2 0 0 1 14.5 6 4.6 4.6 0 0 1 19 10.9C19 16.3 12 21 12 21Z" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: "proof",
    label: "Proof",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" aria-hidden="true">
        <path d="M12 4 4 8v8l8 4 8-4V8l-8-4Zm0 2.2L17.8 9 12 11.8 6.2 9 12 6.2Zm-6 4.6 5 2.4v4.4l-5-2.4v-4.4Zm7 6.8v-4.4l5-2.4v4.4l-5 2.4Z" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: "branches",
    label: "Branches",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" aria-hidden="true">
        <path d="M12 2a7 7 0 0 1 7 7c0 4.8-7 13-7 13S5 13.8 5 9a7 7 0 0 1 7-7Zm0 4.5A2.5 2.5 0 1 0 12 11a2.5 2.5 0 0 0 0-4.5Z" fill="currentColor" />
      </svg>
    ),
  },
];

const menuAnchors: Record<string, string> = {
  entry: "#entry",
  "offers-crowd": "#offers-crowd",
  experience: "#experience",
  menu: "#menu",
  vibes: "#vibes",
  proof: "#proof",
  branches: "#branches",
};

type GlassNavbarProps = {
  activeItem: string;
  onItemSelect: (id: string) => void;
};

export function GlassNavbar({ activeItem, onItemSelect }: GlassNavbarProps) {
  const [mobileExpanded, setMobileExpanded] = useState(false);

  const activeLabel = useMemo(
    () => navItems.find((item) => item.id === activeItem)?.label ?? "Entry",
    [activeItem],
  );

  return (
    <>
      <header className="fixed left-1/2 top-4 z-50 hidden w-[min(97vw,1180px)] -translate-x-1/2 md:block">
        <div className="flex items-center justify-between rounded-[999px] border border-white/26 bg-[#f8ecde]/18 px-4 py-2 shadow-[0_14px_45px_rgba(27,14,8,0.24)] backdrop-blur-xl">
          <div className="flex items-center gap-3.5">
            <img src="/tabun-logo.png" alt="Tabun Chai logo" className="h-11 w-11 rounded-full object-cover" />
            <p className="navbar-brand-bushi text-lg text-[#fef2e7]">Tabun Chai</p>
          </div>

          <nav aria-label="Primary" className="flex items-center gap-2.5">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={menuAnchors[item.id]}
                onClick={() => onItemSelect(item.id)}
                className="relative inline-flex h-9 items-center gap-1.5 rounded-full px-3.5 text-sm font-medium text-[#fef2e7]/92"
              >
                {activeItem === item.id ? (
                  <motion.span
                    layoutId="desktop-active-pill"
                    className="absolute inset-0 rounded-full border border-white/35 bg-white/12 backdrop-blur-sm"
                    transition={{ type: "spring", stiffness: 320, damping: 30 }}
                  />
                ) : null}
                <span className="relative">{item.icon}</span>
                <span className="relative">{item.label}</span>
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* Floating Sidebar Button (left, upper-middle) and vertical sidebar */}
      <div className="fixed left-3 top-1/4 z-50 md:hidden">
        <button
          type="button"
          onClick={() => setMobileExpanded((value) => !value)}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-[#e7d3c0]/60 shadow-lg text-[#a07c5b] opacity-80 backdrop-blur-xl transition-all hover:scale-105 focus:outline-none"
          aria-expanded={mobileExpanded}
          aria-label="Open navigation menu"
        >
          <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <circle cx="12" cy="12" r="10" stroke="#a07c5b" strokeWidth="2" fill="#f6e7d6" fillOpacity="0.7" />
            <path d="M7 12h10M7 16h10M7 8h10" stroke="#a07c5b" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        <AnimatePresence>
          {mobileExpanded && (
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="fixed left-3 top-1/4 z-50 w-fit max-h-[80vh] overflow-y-auto rounded-[30px] border border-white/35 bg-[#f8ecde]/28 p-2 shadow-[0_16px_40px_rgba(25,12,6,0.36)] backdrop-blur-2xl"
              style={{ minWidth: 64 }}
            >
              <div className="flex flex-col gap-2">
                {navItems.map((item) => (
                  <a
                    key={item.id}
                    href={menuAnchors[item.id]}
                    onClick={() => {
                      onItemSelect(item.id);
                      setMobileExpanded(false);
                    }}
                    className="group relative"
                    aria-label={item.label}
                  >
                    {activeItem === item.id ? (
                      <motion.span
                        layoutId="mobile-active-pill"
                        className="absolute inset-0 rounded-full border border-white/50 bg-white/24"
                        transition={{ type: "spring", stiffness: 320, damping: 32 }}
                      />
                    ) : null}

                    <div className="relative flex h-11 items-center rounded-full px-3 text-[#7a4a1a]">
                      <span className="inline-flex h-7 w-7 items-center justify-center">{item.icon}</span>
                      <AnimatePresence initial={false}>
                        {mobileExpanded ? (
                          <motion.span
                            initial={{ width: 0, opacity: 0 }}
                            animate={{ width: "auto", opacity: 1 }}
                            exit={{ width: 0, opacity: 0 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className="ml-2 overflow-hidden whitespace-nowrap pr-2 text-xs font-semibold uppercase tracking-[0.2em]"
                          >
                            {item.label}
                          </motion.span>
                        ) : null}
                      </AnimatePresence>
                    </div>
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="fixed right-3 top-4 z-50 flex items-center gap-2 rounded-full border-2 border-white/60 bg-[#f8ecde]/32 px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.17em] text-[#fff2e2] shadow-[0_12px_32px_rgba(19,9,5,0.35)] backdrop-blur-xl md:hidden">
        <img src="/tabun-logo.png" alt="Tabun Chai logo" className="h-9 w-9 rounded-full object-cover" />
        <span className="navbar-brand-bushi text-lg font-bold tracking-wide text-white">Tabun Chai</span>
      </div>
    </>
  );
}
