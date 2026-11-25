{

  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const projecten = window.PROJECTEN || [];
  const basis = document.body.dataset.basis || "";

  const raster = document.getElementById("projectraster");
  const filters = document.getElementById("filters");

  const tegel = (p, pad = basis) => {
    const t = p.tegel || {};
    if (t.type === "logo") return `
      <div class="tegel t-logo" style="--tbg:${esc(t.bg)}">
        <img src="${pad}${esc(t.logo)}" alt="">
        ${t.ondertitel ? `<span class="t-onder">${esc(t.ondertitel)}</span>` : ""}
      </div>`;
    if (t.type === "stapel") return `
      <div class="tegel t-stapel">
        ${t.achter.info && pad === "../"
          ? `<button type="button" class="t-kaart t-achter" style="--tbg:${esc(t.achter.bg)}" aria-expanded="false" aria-label="Meer over ${esc(t.achter.info.titel)}"><img src="${pad}${esc(t.achter.logo)}" alt=""><span class="t-klik">klik mij ❄</span></button>`
          : `<div class="t-kaart t-achter" style="--tbg:${esc(t.achter.bg)}"><img src="${pad}${esc(t.achter.logo)}" alt=""></div>`}
        <div class="t-kaart t-voor" style="--tbg:${esc(t.voor.bg)}"><img src="${pad}${esc(t.voor.logo)}" alt=""></div>
      </div>`;
    if (t.type === "monolith") return `
      <div class="tegel t-monolith">
        <b>MONOLITH</b>
        <span>carved by nature.<br>pure from the core.</span>
        <ul><li style="--k:#9ad13b">granite lime</li><li style="--k:#7b4dd6">slate berry</li><li style="--k:#e0a083">marble peach</li></ul>
      </div>`;
    if (t.type === "scherm") return `
      <div class="tegel t-scherm"><span class="t-balk"><i></i><i></i><i></i></span><img src="${pad}${esc(t.src)}" alt=""></div>`;
    return `<div class="tegel"><img src="${pad}${esc(p.afbeelding || "")}" alt=""></div>`;
  };
  window.tegelHTML = tegel;

  const kaart = (p, i) => `
    <li class="projectkaart" data-in style="--d:${(i % 4) * 0.1}s">
      <img class="punaise" src="${basis}afbeeldingen/decoratie/punaise.svg" alt="">
      <span class="pk-nr">${String(i + 1).padStart(2, "0")}</span>
      ${tegel(p)}
      <h3><a href="${basis}projecten/project.html#${esc(p.id)}">${esc(p.titel)}</a></h3>
      <p class="meta">${esc(p.vak)}</p>
      <span class="pk-bekijk" aria-hidden="true">bekijk project →</span>
    </li>`;

  const toon = (cat) => {
    const lijst = cat === "Alle" ? projecten : projecten.filter((p) => p.groep === cat);
    raster.innerHTML = lijst.length
      ? lijst.map((p) => kaart(p, projecten.indexOf(p))).join("")
      : `<li class="leeg">Nog geen projecten in deze categorie.</li>`;
    window.animeer?.(raster);
  };

  if (raster && filters) {
    const cats = ["Alle", ...new Set(projecten.map((p) => p.groep))];
    filters.innerHTML = cats.map((c, i) =>
      `<li><button type="button" class="label" aria-pressed="${i === 0}" data-cat="${esc(c)}">${esc(c)}</button></li>`).join("");
    filters.addEventListener("click", (e) => {
      const knop = e.target.closest("button");
      if (!knop) return;
      filters.querySelectorAll("button").forEach((b) => b.setAttribute("aria-pressed", b === knop));
      toon(knop.dataset.cat);
    });
    toon("Alle");
  }

  const detail = document.getElementById("projectdetail");

  const toonDetail = () => {
    const id = location.hash.slice(1);
    const i = Math.max(0, projecten.findIndex((p) => p.id === id));
    const p = projecten[i];
    if (!p) return;
    const vorige = projecten[(i - 1 + projecten.length) % projecten.length];
    const volgende = projecten[(i + 1) % projecten.length];
    document.title = `${p.titel} · Kyano Grieten`;

    const nr = (n) => String(n + 1).padStart(2, "0");
    const info = p.tegel?.achter?.info;
    const winter = info ? `
      <aside class="winterkaart" hidden>
        <span class="sneeuw" aria-hidden="true">❄ ❅ ❆ ❄ ❅</span>
        <p class="wk-seizoen">ondertussen, in de ${esc(info.seizoen)}…</p>
        <h2>${esc(info.titel)}</h2>
        ${info.tekst.map((t) => `<p>${esc(t)}</p>`).join("")}
        <a class="pd-link" href="${esc(info.link.url)}">${esc(info.link.label)}</a>
        <button type="button" class="wk-terug">← terug naar de zomer</button>
      </aside>` : "";
    const foto = p.foto ? `
      <section class="pd-galerij">
        <h2 class="pd-kop">${esc(p.foto.label)}</h2>
        <figure class="pd-groot ${p.foto.scherm ? "is-scherm" : ""}">
          <img class="punaise" src="../afbeeldingen/decoratie/punaise.svg" alt="">
          ${p.foto.scherm ? '<span class="t-balk"><i></i><i></i><i></i></span>' : ""}
          <img src="../${esc(p.foto.src)}" alt="${esc(p.foto.label)}">
        </figure>
      </section>` : "";
    const links = (p.links || []).map((l) => `<a class="pd-link" href="${esc(l.url)}">${esc(l.label)}</a>`).join("");

    detail.innerHTML = `
      <a class="terug" href="../index.html#projecten">← Terug naar alle projecten</a>
      <div class="dossier-map project-map" data-groep="${esc(p.groep)}">
        <a class="map-tab" href="../index.html#projecten">${nr(i)} · ${esc(p.groep)}</a>
        <div class="pd-grid">
          <div class="pd-held">
            <img class="punaise" src="../afbeeldingen/decoratie/punaise.svg" alt="">
            ${tegel(p, "../")}
            ${winter}
          </div>
          <div class="pd-info">
            <p class="pd-nr">project ${nr(i)} van ${nr(projecten.length - 1)}</p>
            <h1>${esc(p.titel)}</h1>
            <ul class="pd-stickers">
              <li class="s-groep">${esc(p.groep)}</li>
              <li class="s-rol">${esc(p.rol)}</li>
            </ul>
            <div class="pd-notitie">
              <img class="clip" src="../afbeeldingen/decoratie/paperclip.svg" alt="">
              ${p.tekst.map((t) => `<p>${esc(t)}</p>`).join("")}
            </div>
            <div class="pd-fiche">
              <p class="pd-fiche-kop">PROJECTFICHE</p>
              <dl>
                <div><dt>Voor</dt><dd>${esc(p.vak)}</dd></div>
                <div><dt>Mijn rol</dt><dd>${esc(p.rol)}</dd></div>
                <div><dt>Skills</dt><dd>${esc(p.skills.join(" · "))}</dd></div>
              </dl>
              ${links ? `<div class="pd-links">${links}</div>` : ""}
            </div>
          </div>
        </div>
        ${foto}
      </div>
      <nav class="volgende" aria-label="Andere projecten">
        <a class="tag-knop" href="#${esc(vorige.id)}"><span>vorig project</span>${esc(vorige.titel)}</a>
        <a class="tag-knop" href="#${esc(volgende.id)}"><span>volgend project</span>${esc(volgende.titel)}</a>
      </nav>`;

    const stapel = detail.querySelector(".pd-held .t-stapel");
    const achter = detail.querySelector("button.t-achter");
    const kaartje = detail.querySelector(".winterkaart");
    if (stapel && achter && kaartje) {
      const zet = (aan) => {
        stapel.classList.toggle("winter", aan);
        detail.querySelector(".pd-held").classList.toggle("winter", aan);
        achter.setAttribute("aria-expanded", aan);
        kaartje.hidden = !aan;
      };
      achter.addEventListener("click", () => zet(achter.getAttribute("aria-expanded") !== "true"));
      kaartje.querySelector(".wk-terug").addEventListener("click", () => zet(false));
      stapel.querySelector(".t-voor").addEventListener("click", () => { if (stapel.classList.contains("winter")) zet(false); });
    }
    window.scrollTo({ top: 0 });
  };

  if (detail) {
    toonDetail();
    window.addEventListener("hashchange", toonDetail);
  }

  const form = document.getElementById("contactformulier");
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const melding = form.querySelector(".formmelding");
      const knop = form.querySelector("button[type=submit]");
      const naam = form.naam.value.trim();
      if (!naam || !form.email.value.trim() || !form.bericht.value.trim()) {
        melding.textContent = "Vul je naam, e-mail en bericht in.";
        return;
      }
      knop.disabled = true;
      melding.textContent = "Je kaartje wordt verstuurd…";
      try {
        const antwoord = await fetch(form.action, {
          method: "POST",
          body: new FormData(form),
          headers: { Accept: "application/json" }
        });
        if (!antwoord.ok) throw new Error();
        form.reset();
        melding.textContent = `Bedankt, ${naam}! Je kaartje is onderweg. Ik antwoord zo snel mogelijk.`;
        form.closest(".ansicht")?.classList.add("verstuurd");
      } catch {
        melding.textContent = "Oei, versturen lukte niet. Mail me gerust rechtstreeks: kyano.grieten@gmail.com";
      } finally {
        knop.disabled = false;
      }
    });
  }

  document.querySelectorAll("img[data-logo]").forEach((img) => {
    const pogingen = [".svg", ".png"].map((ext) => img.dataset.logo + ext);
    const volgende = () => {
      const src = pogingen.shift();
      if (!src) { img.remove(); return; }
      img.src = src;
    };
    img.addEventListener("load", () => img.closest(".tool")?.classList.add("met-logo"));
    img.addEventListener("error", volgende);
    volgende();
  });

  const links = [...document.querySelectorAll(".nav ul a[href^='#'], .tabs a")];
  const secties = [...new Set(links.map((a) => document.querySelector(a.getAttribute("href"))).filter(Boolean))];
  if (secties.length && "IntersectionObserver" in window) {
    const kijker = new IntersectionObserver((items) => {
      items.forEach((it) => {
        if (!it.isIntersecting || window.kastActief) return;
        links.forEach((a) => a.setAttribute("aria-current", a.getAttribute("href") === "#" + it.target.id));
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    secties.forEach((s) => kijker.observe(s));
  }
}
