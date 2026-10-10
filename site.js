/* =========================================================
   YELLW SITE SETTINGS: edit this block to update every page
   ========================================================= */
const SITE = {
  // New project
  projectTitle: "warm yellw's:\u00A0dagogo's memoir.",
  releaseDate: "2026-11-13T00:00:00+01:00",   // November 13, 2026, midnight Nigeria time
  releaseLabel: "November 13",
  projectCover: "images/warm-yellws-cover.jpg", // replace this file (same name) to change the cover art

  // Links (all point to the Linktree for now; replace with direct links when you have them)
  links: {
    listen:  "https://linktr.ee/yellw",
    presave: "https://linktr.ee/yellw",
    tickets: "https://linktr.ee/yellw",
    rsvp:    "https://linktr.ee/yellw",
    spotify: "https://linktr.ee/yellw",
    apple:   "https://linktr.ee/yellw",
    instagram: "https://linktr.ee/yellw",
    x:       "https://linktr.ee/yellw",
    youtube: "https://linktr.ee/yellw",
    tiktok:  "https://linktr.ee/yellw"
  },

  // Contact
  email: "businessforyellw@gmail.com",
  phoneDisplay: "0901 367 7181",
  phoneLink: "+2349013677181",

  // Email signup: paste a Formspree URL here (https://formspree.io) to collect emails.
  // If empty, the button opens an email to the address above instead.
  signupEndpoint: "",

  // YouTube video ID for "I'll Hold On" (the part after v= in the link). Empty = hidden.
  youtubeId: "",

  // Music shelf: add, remove or reorder releases
  releases: [
    { title: "warm yellw's: dagogo's memoir", note: "Out November 13", cover: "images/warm-yellws-cover.jpg", link: "presave", cta: "Pre-save" },
    { title: "I'll Hold On", note: "Latest single", cover: "images/ill-hold-on-cover.jpg", link: "listen", cta: "Listen now" },
    { title: "Tell Me", note: "Debut single, 2019", cover: "images/tell-me-cover.jpg", link: "listen", cta: "Listen now" }
  ],

  // Shows and events (used on the Yellw's Yard page)
  events: [
    { name: "Yellw's Yard", when: "Date and time is TBD", where: "Location is TBD",
      about: "Details will be shared with the fanmily first.", cta: "RSVP", link: "rsvp" },
    { name: "Warm Yellw's", when: "Date and time is TBD", where: "Location is TBD",
      about: "EP listening event", ticketType: "General Admission",
      price: "\u20A610,000.00", fee: "+ \u20A6250.00 ticket service fee", cta: "Buy Tickets", link: "tickets" }
  ]
};

(function () {
  const $ = (id) => document.getElementById(id);
  const L = SITE.links;
  const page = (location.pathname.split("/").pop() || "index.html").toLowerCase();

  /* ----- Header, menu and footer (same on every page) ----- */
  const NAV = [
    ["index.html", "home."],
    ["bio.html", "bio."],
    ["music.html", "music."],
    ["yard.html", "yellw's yard"],
    ["index.html#fanmily", "join the fanmily"],
    ["booking.html", "booking & contact"]
  ];
  const headerSlot = $("site-header");
  if (headerSlot) {
    headerSlot.innerHTML =
      '<header><a class="logo" href="index.html" aria-label="Yellw, home">YELLW</a>' +
      '<button class="menu-btn" id="menuBtn" aria-label="Open menu" aria-expanded="false" aria-controls="menu"><span></span><span></span><span></span></button>' +
      '<div class="header-line"></div></header>' +
      '<nav id="menu" aria-label="Main">' +
      NAV.map(([href, label]) =>
        '<a href="' + href + '"' + (href === page ? ' aria-current="page"' : "") + ">" + label + "</a>").join("") +
      "</nav>";
  }
  const footerSlot = $("site-footer");
  if (footerSlot) footerSlot.innerHTML = "<footer>&copy; " + new Date().getFullYear() + " Yellw. All rights reserved.</footer>";

  /* ----- Menu ----- */
  const btn = $("menuBtn"), menu = $("menu");
  function setMenu(open) {
    menu.classList.toggle("open", open);
    btn.setAttribute("aria-expanded", String(open));
    btn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    document.body.style.overflow = open ? "hidden" : "";
  }
  if (btn && menu) {
    btn.addEventListener("click", () => setMenu(!menu.classList.contains("open")));
    menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });
  }

  /* ----- Text and links from settings ----- */
  const setText = (id, t) => { const e = $(id); if (e) e.textContent = t; };
  const setHref = (id, h) => { const e = $(id); if (e) e.href = h; };
  setText("projTitle", SITE.projectTitle);
  setText("projSub", "The new project from Yellw");
  if ($("projCover")) $("projCover").src = SITE.projectCover;
  setHref("presaveBtn", L.presave);
  setHref("holdBtn", L.listen);
  setHref("rsvpBtn", L.rsvp);
  setHref("ticketBtn", L.tickets);
  setHref("listenBtn", L.listen);
  setHref("bookBtn", "mailto:" + SITE.email + "?subject=" + encodeURIComponent("Booking inquiry: Yellw"));
  setText("phoneLink", SITE.phoneDisplay);
  setHref("phoneLink", "tel:" + SITE.phoneLink);
  setText("emailLink", SITE.email);
  setHref("emailLink", "mailto:" + SITE.email);
  setText("yr", new Date().getFullYear());

  if ($("socials")) {
    [["Spotify", L.spotify], ["Apple Music", L.apple], ["Instagram", L.instagram],
     ["X", L.x], ["YouTube", L.youtube], ["TikTok", L.tiktok]].forEach(([name, href]) => {
      const li = document.createElement("li");
      li.innerHTML = '<a target="_blank" rel="noopener"></a>';
      li.firstChild.textContent = name; li.firstChild.href = href;
      $("socials").appendChild(li);
    });
  }

  if ($("ytFrame") && SITE.youtubeId) {
    $("ytFrame").src = "https://www.youtube.com/embed/" + encodeURIComponent(SITE.youtubeId);
    $("videoSection").hidden = false;
  }

  /* ----- Music shelf ----- */
  if ($("crate")) {
    SITE.releases.forEach((r) => {
      const el = document.createElement("article");
      el.className = "release";
      el.innerHTML =
        '<div class="sleeve"><div class="disc" aria-hidden="true"></div><img class="cover" alt=""></div>' +
        '<h3></h3><p></p><a class="btn ghost" target="_blank" rel="noopener"></a>';
      el.querySelector("img").src = r.cover;
      el.querySelector("img").alt = "Cover art for " + r.title;
      el.querySelector("h3").textContent = r.title;
      el.querySelector("p").textContent = r.note;
      const a = el.querySelector("a");
      a.textContent = r.cta; a.href = L[r.link] || r.link;
      $("crate").appendChild(el);
    });
  }

  /* ----- Events list (Yellw's Yard page) ----- */
  if ($("events")) {
    SITE.events.forEach((ev, i) => {
      const el = document.createElement("div");
      el.className = "event";
      el.innerHTML = "<h3></h3><p class='when'></p><p class='about'></p>";
      el.querySelector("h3").textContent = ev.name;
      el.querySelector(".when").innerHTML = "";
      el.querySelector(".when").append(ev.when, document.createElement("br"), ev.where);
      el.querySelector(".about").textContent = ev.about || "";
      const a = document.createElement("a");
      a.className = "btn block"; a.target = "_blank"; a.rel = "noopener";
      a.textContent = ev.cta; a.href = L[ev.link] || ev.link;
      if (ev.price) {
        const card = document.createElement("div");
        card.className = "ticketcard";
        card.innerHTML = "<dl><dt>Ticket type</dt><dd></dd><dt>Price</dt><dd><small></small></dd></dl>";
        const dds = card.querySelectorAll("dd");
        dds[0].textContent = ev.ticketType || "General Admission";
        dds[1].prepend(ev.price);
        dds[1].querySelector("small").textContent = ev.fee || "";
        card.appendChild(a);
        el.appendChild(card);
      } else {
        el.appendChild(a);
      }
      $("events").appendChild(el);
      if (i < SITE.events.length - 1) $("events").appendChild(Object.assign(document.createElement("hr"), { className: "divider" }));
    });
  }

  /* ----- Vinyl slides out once when the project section appears ----- */
  const sleeve = $("heroSleeve");
  if (sleeve) {
    if ("IntersectionObserver" in window) {
      new IntersectionObserver((entries, obs) => {
        if (entries[0].isIntersecting) { sleeve.classList.add("out"); obs.disconnect(); }
      }, { threshold: .5 }).observe(sleeve);
    } else { sleeve.classList.add("out"); }
  }

  /* ----- Countdown ----- */
  if ($("countdown")) {
    const target = new Date(SITE.releaseDate).getTime();
    const pad = (n) => String(n).padStart(2, "0");
    const tick = () => {
      const ms = target - Date.now();
      if (ms <= 0) {
        $("countdown").hidden = true;
        setText("releaseLine", "Out now");
        setText("presaveBtn", "Listen now");
        setHref("presaveBtn", L.listen);
        clearInterval(timer);
        return;
      }
      const s = Math.floor(ms / 1000);
      setText("cd-d", Math.floor(s / 86400));
      setText("cd-h", pad(Math.floor(s % 86400 / 3600)));
      setText("cd-m", pad(Math.floor(s % 3600 / 60)));
      setText("cd-s", pad(s % 60));
      setText("releaseLine", "Out " + SITE.releaseLabel);
    };
    const timer = setInterval(tick, 1000); tick();
  }

  /* ----- Email signup ----- */
  if ($("signup")) {
    $("signup").addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = $("email").value.trim();
      const status = $("status");
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
        status.textContent = "Enter a valid email address, for example name@example.com.";
        $("email").focus(); return;
      }
      if (!SITE.signupEndpoint) {
        location.href = "mailto:" + SITE.email + "?subject=" + encodeURIComponent("Join the fanmily") +
          "&body=" + encodeURIComponent("Please add me to the fanmily: " + email);
        status.textContent = "Your email app should open. Send the message to finish signing up.";
        return;
      }
      status.textContent = "Signing you up...";
      try {
        const res = await fetch(SITE.signupEndpoint, {
          method: "POST", headers: { "Content-Type": "application/json", "Accept": "application/json" },
          body: JSON.stringify({ email })
        });
        if (!res.ok) throw new Error();
        status.textContent = "You're in the fanmily. Watch your inbox.";
        $("signup").reset();
      } catch (err) {
        status.textContent = "That didn't go through. Check your connection and try again.";
      }
    });
  }

  /* ----- Booking form: opens an email with the details filled in ----- */
  if ($("bookform")) {
    $("bookform").addEventListener("submit", (e) => {
      e.preventDefault();
      const f = new FormData($("bookform"));
      const body = [
        "Name: " + f.get("name"),
        "Email: " + f.get("email"),
        "Organisation: " + (f.get("org") || "-"),
        "Request type: " + f.get("type"),
        "Event date: " + (f.get("date") || "-"),
        "",
        f.get("message")
      ].join("\n");
      location.href = "mailto:" + SITE.email + "?subject=" +
        encodeURIComponent(f.get("type") + " request: " + f.get("name")) + "&body=" + encodeURIComponent(body);
      setText("bookStatus", "Your email app should open. Send the message to complete your request.");
    });
  }
})();
