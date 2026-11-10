/* skrphenix.dev — UI behaviour (theme, rotator, collapsibles, lightbox, etc.) */
(() => {
    const root = document.documentElement;
    const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

    const store = {
        get(k) { try { return localStorage.getItem(k); } catch { return null; } },
        set(k, v) { try { localStorage.setItem(k, v); } catch { /* ignore */ } },
    };

    /* ---------- Theme toggle with circular View Transition ---------- */
    // Default is the OS theme. A choice is only saved when the visitor clicks the toggle.
    // ("theme" replaces the old "web-mode" key, which the previous site always set to "light".)
    function setTheme(theme, persist) {
        root.dataset.theme = theme;
        if (persist) store.set("theme", theme);
        const meta = document.querySelector('meta[name="theme-color"]');
        if (meta) meta.content = theme === "dark" ? "#09090f" : "#f6f6fa";
    }

    function initTheme() {
        const meta = document.querySelector('meta[name="theme-color"]');
        if (meta) meta.content = root.dataset.theme === "dark" ? "#09090f" : "#f6f6fa";
        const btn = document.querySelector(".theme-toggle");
        if (!btn) return;
        btn.addEventListener("click", (e) => {
            const next = root.dataset.theme === "dark" ? "light" : "dark";
            if (!document.startViewTransition || reduceMotion) {
                setTheme(next, true);
                return;
            }
            const x = e.clientX || innerWidth - 40;
            const y = e.clientY || 40;
            const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
            const t = document.startViewTransition(() => setTheme(next, true));
            t.ready.then(() => {
                root.animate(
                    { clipPath: [`circle(0 at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
                    { duration: 550, easing: "cubic-bezier(.2,.7,.2,1)", pseudoElement: "::view-transition-new(root)" }
                );
            });
        });

        // Follow the OS setting until the visitor picks a theme themselves
        matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
            if (!store.get("theme")) setTheme(e.matches ? "dark" : "light", false);
        });
    }

    /* ---------- Typing role rotator ---------- */
    function initRotator() {
        const el = document.querySelector(".rotator");
        if (!el) return;
        const words = JSON.parse(el.dataset.words || "[]");
        if (!words.length || reduceMotion) return;

        let w = 0, c = words[0].length, deleting = true;
        const tick = () => {
            const word = words[w];
            el.textContent = word.slice(0, c);
            let delay = deleting ? 35 : 70;
            if (deleting && c === 0) { deleting = false; w = (w + 1) % words.length; delay = 300; }
            else if (!deleting && c === words[w].length) { deleting = true; delay = 2200; }
            else c += deleting ? -1 : 1;
            setTimeout(tick, delay);
        };
        setTimeout(tick, 2200);
    }

    /* ---------- Collapsibles (Show more / Show less) ---------- */
    function initCollapsibles() {
        document.querySelectorAll(".more-btn").forEach((btn) => {
            const panel = document.getElementById(btn.getAttribute("aria-controls"));
            if (!panel) return;
            const label = btn.querySelector("span");
            btn.addEventListener("click", () => {
                const open = panel.classList.toggle("open");
                panel.querySelector(":scope > div").inert = !open;
                btn.setAttribute("aria-expanded", String(open));
                if (label) label.textContent = open ? btn.dataset.less : btn.dataset.more;
            });
            panel.querySelector(":scope > div").inert = true;
        });
    }

    /* ---------- Cursor spotlight on cards ---------- */
    function initSpotlight() {
        if (!matchMedia("(hover: hover)").matches) return;
        document.addEventListener("pointermove", (e) => {
            const card = e.target.closest?.(".card.spot");
            if (!card) return;
            const r = card.getBoundingClientRect();
            card.style.setProperty("--mx", `${e.clientX - r.left}px`);
            card.style.setProperty("--my", `${e.clientY - r.top}px`);
        }, { passive: true });
    }

    /* ---------- Certificate lightbox ---------- */
    function initLightbox() {
        const dlg = document.getElementById("lightbox");
        if (!dlg) return;
        const img = dlg.querySelector("img");
        const title = dlg.querySelector(".lightbox-title");
        const link = dlg.querySelector(".lightbox-link");

        document.querySelectorAll(".cert-thumb").forEach((btn) => {
            btn.addEventListener("click", () => {
                const card = btn.closest(".cert");
                const src = btn.querySelector("img");
                img.src = src.src;
                img.alt = src.alt;
                title.textContent = card.querySelector(".cert-name").textContent;
                link.href = card.querySelector(".proj-link").href;
                dlg.showModal();
            });
        });
        dlg.querySelector(".lightbox-close").addEventListener("click", () => dlg.close());
        // Click on the backdrop closes it
        dlg.addEventListener("click", (e) => { if (e.target === dlg) dlg.close(); });
    }

    /* ---------- Copy email ---------- */
    function initCopy() {
        document.querySelectorAll(".copy-btn").forEach((btn) => {
            const label = btn.querySelector("span");
            const original = label.textContent;
            btn.addEventListener("click", async () => {
                try {
                    await navigator.clipboard.writeText(btn.dataset.copy);
                    btn.classList.add("copied");
                    label.textContent = "Copied!";
                } catch {
                    location.href = `mailto:${btn.dataset.copy}`;
                    return;
                }
                setTimeout(() => { btn.classList.remove("copied"); label.textContent = original; }, 1800);
            });
        });
    }

    /* ---------- Mobile menu: close after picking a link ---------- */
    function initMobileMenu() {
        const menu = document.getElementById("mobile-menu");
        if (!menu || !menu.hidePopover) return;
        menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => menu.hidePopover()));
    }

    function initYear() {
        const el = document.getElementById("copyright-year");
        if (!el) return;
        const start = 2024, now = new Date().getFullYear();
        el.textContent = now > start ? `© ${start}–${now}` : `© ${now}`;
    }

    document.addEventListener("DOMContentLoaded", () => {
        initTheme();
        initRotator();
        initCollapsibles();
        initSpotlight();
        initLightbox();
        initCopy();
        initMobileMenu();
        initYear();
    });
})();
