import { motion } from "framer-motion";

const currentBranch = {
  name: "Balaji Colony - Bengaluru Tirupati Highway",
  address:
    "Balaji Colony, Bengaluru - Tirupati Hwy, Bangarupalem to Bangalore road, Venkatagiri, Andhra Pradesh 517416",
  photos: ["/media/current-branch-main.png"],
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=Balaji+Colony+Bengaluru+Tirupati+Hwy+Bangarupalem+Venkatagiri+Andhra+Pradesh+517416",
};

const otherBranches = [
  {
    name: "Bairagi Patteda",
    status: "Active",
    address: "JCCC+Q8 Bairagi patteda, Tirupati, Andhra Pradesh",
    note: "Urban neighborhood stop with fast takeaway and evening chai flow.",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=JCCC%2BQ8+Bairagi+patteda%2C+Tirupati%2C+Andhra+Pradesh",
  },
  {
    name: "Tiruchanur",
    status: "Active",
    address: "Revenue Colony, Tiruchanur, Andhra Pradesh 517503",
    note: "Steady local crowd branch focused on warm service and repeat cups.",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Revenue+Colony%2C+Tiruchanur%2C+Andhra+Pradesh+517503",
  },
  {
    name: "Greamspet, Chittoor",
    status: "Active",
    address: "4-421, CB Rd, opp. SBI bank, Greamspet, Chittoor, Andhra Pradesh 517002",
    note: "Roadside-ready branch for quick pit-stop chai and snack pairings.",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=4-421%2C+CB+Rd%2C+opp.+SBI+bank%2C+Greamspet%2C+Chittoor%2C+Andhra+Pradesh+517002",
  },
];

export function BranchNetworkSection() {
  return (
    <section id="branches" className="branch-flow mx-auto max-w-7xl px-1 py-2">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        className="relative p-1 sm:p-2"
      >
        <div className="relative">
          <p className="menu-sketch text-sm uppercase tracking-[0.2em] text-[#ffd8b8]/88">
            Branch Network
          </p>
          <h2 className="menu-sketch mt-2 text-4xl text-[#fff0df] sm:text-5xl">
            Current Branch And The Next Stops
          </h2>
          <p className="hero-subcaption-classy mt-3 max-w-3xl text-base leading-7 text-[#ffe1c6]/88">
            Built from one strong counter-first experience, now extending the same ritual quality
            into nearby routes. Each location follows the same heat-mix-serve standard.
          </p>
        </div>

        <div className="relative mt-8 grid gap-5 lg:grid-cols-[1.12fr_0.88fr] lg:items-stretch">
          <motion.article
            initial={{ opacity: 0, x: -22 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-[32px] border border-amber-100/34 p-6 sm:p-8"
          >
            <img
              src={currentBranch.photos[0]}
              alt="Current branch exterior"
              className="absolute inset-0 h-full w-full scale-[1.08] object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#1a0c05]/42 via-[#1a0c05]/58 to-[#1a0c05]/78" />
            <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(120,72,44,0.34),rgba(53,30,18,0.16)_45%,rgba(78,43,25,0.3)_100%)]" />

            <div className="relative z-10 flex min-h-[360px] flex-col items-center justify-center text-center sm:min-h-[420px]">
              <motion.p
                className="menu-sketch relative rounded-full border border-amber-200/60 bg-black/28 px-4 py-1 text-xs uppercase tracking-[0.22em] text-[#ffe4c8]/90 shadow-[0_0_16px_2px_rgba(255,222,180,0.38)]"
                animate={{
                  boxShadow: [
                    "0 0 16px 2px rgba(255,222,180,0.38)",
                    "0 0 32px 6px rgba(255,222,180,0.72)",
                    "0 0 16px 2px rgba(255,222,180,0.38)"
                  ]
                }}
                transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
              >
                Current Branch
              </motion.p>
              <h3 className="menu-sketch mt-4 max-w-4xl text-4xl text-[#fff4e8] sm:text-5xl">
                {currentBranch.name}
              </h3>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-[#ffe6cf]/92 sm:text-base">
                {currentBranch.address}
              </p>

              <a
                href={currentBranch.mapUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex h-11 items-center justify-center rounded-full border border-white/24 bg-white/8 px-6 text-xs font-semibold uppercase tracking-[0.14em] text-[#fff4e7] transition-colors hover:bg-white/14"
              >
                Check Location
              </a>
            </div>
          </motion.article>

          <motion.div
            initial={{ opacity: 0, x: 22 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55 }}
            className="relative rounded-[30px] border border-white/18 bg-white/7 p-5"
          >
            <div className="absolute left-[20px] top-9 h-[calc(100%-72px)] w-px bg-gradient-to-b from-[#ffd6b0]/70 to-transparent" />

            <p className="menu-sketch text-xs uppercase tracking-[0.22em] text-[#ffd0aa]/84">
              Other Branches
            </p>

            <div className="mt-4 space-y-3">
              {otherBranches.map((branch, index) => (
                <motion.article
                  key={branch.name}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ delay: index * 0.08, duration: 0.35 }}
                  whileHover={{ scale: 1.015, x: 4 }}
                  className="relative rounded-[22px] border border-white/18 bg-black/22 p-4"
                >
                  <motion.span
                    className="absolute left-[-9px] top-1/2 h-4 w-4 -translate-y-1/2 rounded-full border border-amber-200/70 bg-[#ffd5ad]"
                    animate={{ boxShadow: ["0 0 0 rgba(255,213,173,0)", "0 0 12px rgba(255,213,173,0.55)", "0 0 0 rgba(255,213,173,0)"] }}
                    transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: index * 0.35 }}
                  />

                  <div className="flex items-center justify-between gap-3">
                    <h3 className="menu-sketch text-2xl text-[#fff1e0]">{branch.name}</h3>
                    <span className="rounded-full border border-amber-100/28 bg-amber-100/12 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#ffe6cf]">
                      {branch.status}
                    </span>
                  </div>
                  <p className="mt-2 text-xs leading-5 text-[#ffd4b6]/78">{branch.address}</p>
                  <p className="mt-2 text-sm leading-6 text-[#ffdcbf]/84">{branch.note}</p>
                  <a
                    href={branch.mapUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-flex h-9 items-center justify-center rounded-full border border-white/24 bg-white/10 px-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#fff1e2] transition-colors hover:bg-white/16"
                  >
                    Check Location
                  </a>
                </motion.article>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="relative mt-7 overflow-hidden rounded-[22px] border border-white/16 bg-black/20 px-2 py-2">
          <div className="branch-mini-marquee flex w-max gap-2">
            {[...otherBranches, currentBranch, ...otherBranches, currentBranch].map((branch, index) => (
              <a
                key={`${branch.name}-${index}`}
                href={"mapUrl" in branch ? branch.mapUrl : currentBranch.mapUrl}
                target="_blank"
                rel="noreferrer"
                className="branch-mini-chip inline-flex items-center gap-2 rounded-full border border-white/22 bg-white/10 px-3 py-2 text-xs text-[#ffe8d2]"
              >
                <span className="h-2 w-2 rounded-full bg-amber-200" />
                {branch.name}
              </a>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
