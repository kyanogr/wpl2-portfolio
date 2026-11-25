{
  const rustig = matchMedia("(prefers-reduced-motion: reduce)").matches;

  const kijker = "IntersectionObserver" in window && !rustig
    ? new IntersectionObserver((items) => {
        items.forEach((it) => {
          if (it.isIntersecting) { it.target.classList.add("in"); kijker.unobserve(it.target); }
        });
      }, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 })
    : null;

  window.animeer = (root = document) => {
    root.querySelectorAll("[data-in]:not(.in)").forEach((el) => {
      if (kijker) kijker.observe(el); else el.classList.add("in");
    });
  };
  window.animeer();

  document.querySelectorAll(".wiebel").forEach((el) => {
    el.style.setProperty("--wd", `${(-Math.random() * 1.5).toFixed(2)}s`);
  });

  const lagen = [...document.querySelectorAll("[data-snelheid]")];

  let wacht = false;
  const opScroll = () => {
    if (wacht) return;
    wacht = true;
    requestAnimationFrame(() => {
      const y = Math.min(scrollY, innerHeight * 1.5);
      lagen.forEach((el) => el.style.translate = `0 ${(y * parseFloat(el.dataset.snelheid)).toFixed(1)}px`);
      wacht = false;
    });
  };

  if (!rustig && lagen.length) {
    addEventListener("scroll", opScroll, { passive: true });
    opScroll();
  }

  const opening = document.querySelector(".opening");
  if (opening) {
    let bezig = false;
    const zetOpen = () => {
      if (bezig) return;
      bezig = true;
      requestAnimationFrame(() => {
        const navh = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--navh")) || 0;
        const bereik = Math.max(1, (opening.offsetHeight - (innerHeight - navh)) * 0.7);
        const p = Math.min(1, Math.max(0, scrollY / bereik));
        opening.style.setProperty("--open", rustig ? 1 : p.toFixed(3));
        bezig = false;
      });
    };
    addEventListener("scroll", zetOpen, { passive: true });
    addEventListener("resize", zetOpen);
    zetOpen();
  }

  const dossiers = document.querySelector(".dossiers");
  if (dossiers) {
    const groot = matchMedia("(min-width: 1025px) and (min-height: 700px)");
    const mappen = [...dossiers.querySelectorAll(".dossier-map")];
    const ids = ["over-mij", "projecten", "diensten", "contact"];
    const navLinks = [...document.querySelectorAll(".nav ul a[href^='#']")];
    let huidig = -1;

    const seg = () => parseFloat(getComputedStyle(dossiers).getPropertyValue("--seg")) / 100 * innerHeight || innerHeight * 0.85;
    const stickyTop = () => (parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--navh")) || 0) + 52;
    const kastTop = () => dossiers.getBoundingClientRect().top + scrollY;

    const toon = (i) => {
      if (i === huidig) return;
      const oud = mappen[huidig];
      if (oud) {
        oud.classList.remove("actief");
        oud.classList.add("was");
        setTimeout(() => oud.classList.remove("was"), 760);
      }
      mappen[i].classList.add("actief");
      huidig = i;
      window.kastActief = true;
    };

    let druk = false;
    const werk = () => {
      if (druk || !dossiers.classList.contains("kast")) return;
      druk = true;
      requestAnimationFrame(() => {
        const voortgang = scrollY - (kastTop() - stickyTop());
        const i = Math.min(mappen.length - 1, Math.max(0, Math.floor(voortgang / seg() + 0.35)));
        toon(i);

        if (voortgang < -seg() * 0.35) {
          navLinks.forEach((a) => a.setAttribute("aria-current", a.getAttribute("href") === "#home"));
        } else {
          navLinks.forEach((a) => a.setAttribute("aria-current", a.getAttribute("href") === "#" + ids[i]));
        }
        druk = false;
      });
    };

    const zetModus = () => {
      const aan = groot.matches && !rustig;
      dossiers.classList.toggle("kast", aan);
      window.kastActief = aan;
      if (!aan) { mappen.forEach((m) => m.classList.remove("actief", "was")); huidig = -1; }
      else { huidig = -1; werk(); }
    };

    document.addEventListener("click", (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const i = ids.indexOf(a.getAttribute("href").slice(1));
      if (i < 0) return;
      e.preventDefault();
      let y;
      if (dossiers.classList.contains("kast")) {
        y = kastTop() - stickyTop() + i * seg() + 4;
      } else {
        y = document.getElementById(ids[i]).getBoundingClientRect().top + scrollY - 90;
      }
      scrollTo({ top: y, behavior: rustig ? "auto" : "smooth" });
      history.replaceState(null, "", "#" + ids[i]);
    });

    const springNaarHash = () => {
      const i = ids.indexOf(location.hash.slice(1));
      if (i < 0) return;
      const y = dossiers.classList.contains("kast")
        ? kastTop() - stickyTop() + i * seg() + 4
        : document.getElementById(ids[i]).getBoundingClientRect().top + scrollY - 90;
      scrollTo({ top: y, behavior: "instant" });
      werk();
    };
    if ("scrollRestoration" in history && location.hash) history.scrollRestoration = "manual";
    addEventListener("load", springNaarHash);
    addEventListener("hashchange", springNaarHash);

    groot.addEventListener?.("change", zetModus);
    addEventListener("scroll", werk, { passive: true });
    addEventListener("resize", werk);
    zetModus();
  }
}
