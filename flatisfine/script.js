(() => {
  "use strict";

  const root = document.documentElement;

  /* ---------- Hero: scroll flattens the range ---------- */

  const hero = document.querySelector(".hero");
  const readout = document.getElementById("readout");
  if (hero && readout) {
    const PEAK = 8849; // The height of Everest. Nobody here is going.
    const ease = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
    let shown = -1;
    let ticking = false;

    const update = () => {
      ticking = false;
      const distance = hero.offsetHeight - window.innerHeight;
      const progress = distance > 0 ? Math.min(1, Math.max(0, window.scrollY / distance)) : 0;
      const flatness = ease(Math.min(1, progress / 0.82));
      root.style.setProperty("--flat", flatness.toFixed(4));
      const metres = Math.round(PEAK * (1 - flatness));
      if (metres === shown) return;
      shown = metres;
      readout.textContent = metres === 0 ? "0 m. There. Much better." : `Elevation ${metres.toLocaleString("en-GB")} m`;
      readout.classList.toggle("is-flat", metres === 0);
    };
    const request = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
    update();
  }

  /* ---------- Reveal ---------- */

  const revealables = [...document.querySelectorAll("[data-reveal]")];
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) { entry.target.classList.add("in"); io.unobserve(entry.target); }
      }
    }, { threshold: 0.15, rootMargin: "0px 0px -8% 0px" });
    revealables.forEach((el) => io.observe(el));
  } else {
    revealables.forEach((el) => el.classList.add("in"));
  }
})();
