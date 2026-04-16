const instagramUrl = "https://www.instagram.com/tabun.chai/";
const justdialUrl = "https://jsdl.in/DT-99XLMPNDV1K";
const restaurantGuruUrl = "https://restaurant-guru.in/Tabun-Chai-Tirupati";
const phoneNumber = "+91 98765 43210";
const shopKeeperName = "S. Ramesh";

export function TrustUtilityFooter() {
  return (
    <footer className="mx-auto w-full max-w-7xl border-t border-white/18 pt-5 pb-1.5">
      <div className="flex flex-col items-center justify-center gap-4 pb-1 text-center sm:flex-row sm:justify-between sm:text-left">
        <div>
          <p className="footer-quote-handwritten text-3xl leading-tight text-[#ffe8d3]/92 sm:text-4xl">
            "Every long day deserves one warm cup and one easy pause."
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4 md:justify-end">
          <a
            href={restaurantGuruUrl}
            target="_blank"
            rel="noreferrer"
            onClick={() => { if (typeof window !== 'undefined' && window.gtag) window.gtag('event', 'social_click', { event_category: 'engagement', event_label: 'restaurant_guru', value: 1 }); }}
            className="footer-lucida flex items-center justify-center text-[#fff] transition-all hover:scale-110"
            aria-label="Restaurant Guru"
          >
            {/* Restaurant Guru SVG - chef hat icon */}
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 6c-4 0-7 2-7 5 0 1 .5 2 1.5 2.5v7c0 2 2.5 3.5 5.5 3.5s5.5-1.5 5.5-3.5v-7c1-.5 1.5-1.5 1.5-2.5 0-3-3-5-7-5z" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 20v2c0 2 2 4 4 4s4-2 4-4v-2" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </a>
          <a
            href={justdialUrl}
            target="_blank"
            rel="noreferrer"
            onClick={() => { if (typeof window !== 'undefined' && window.gtag) window.gtag('event', 'social_click', { event_category: 'engagement', event_label: 'justdial', value: 1 }); }}
            className="footer-lucida flex items-center justify-center text-[#fff] transition-all hover:scale-110"
            aria-label="Justdial"
          >
            {/* Justdial SVG - no outline, larger */}
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.5 10.5c-1.5 2-2.5 4.5-3 7.5-.5 3-1.5 5.5-3 7.5" stroke="#fff" strokeWidth="2" strokeLinecap="round"/><circle cx="16" cy="16" r="7" stroke="#fff" strokeWidth="2"/></svg>
          </a>
          <a
            href={instagramUrl}
            target="_blank"
            rel="noreferrer"
            onClick={() => { if (typeof window !== 'undefined' && window.gtag) window.gtag('event', 'social_click', { event_category: 'engagement', event_label: 'instagram', value: 1 }); }}
            className="footer-lucida flex items-center justify-center text-[#fff] transition-all hover:scale-110"
            aria-label="Instagram"
          >
            {/* Instagram SVG - no outline, larger */}
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="16" cy="16" r="7" stroke="#fff" strokeWidth="2"/><circle cx="16" cy="16" r="4" stroke="#fff" strokeWidth="2"/><circle cx="22.5" cy="9.5" r="1.5" fill="#fff"/></svg>
          </a>
          <a
            href={`tel:${phoneNumber.replace(/\s+/g,"")}`}
            onClick={() => { if (typeof window !== 'undefined' && window.gtag) window.gtag('event', 'call_click', { event_category: 'engagement', event_label: 'phone_call', value: 1 }); }}
            className="footer-lucida flex items-center justify-center text-[#fff] transition-all hover:scale-110"
            aria-label="Phone"
          >
            {/* Phone SVG - no outline, larger */}
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 12c1.5 3 4.5 6 7.5 7.5l2.5-2.5c.5-.5 1.5-.5 2 0l2 2c.5.5.5 1.5 0 2-1.5 1.5-4.5 2.5-7.5 2.5s-6-1-7.5-2.5S4 18.5 4 16s1-6 2.5-7.5c.5-.5 1.5-.5 2 0l2 2c.5.5.5 1.5 0 2l-2.5 2.5z" stroke="#fff" strokeWidth="2"/></svg>
          </a>
          <span className="footer-lucida ml-3 text-base text-[#ffe8d3]/90">Owned by <span className="font-semibold text-[#fff4e7]">{shopKeeperName}</span></span>
        </div>
      </div>

      <div className="mt-1 border-t border-white/14 pt-1 pb-0 text-center">
        <p className="text-sm text-[#ffd9ba]/84">Designed and Developed by Videsh. Enjoy the break.</p>
      </div>
    </footer>
  );
}
