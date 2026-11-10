/* skrphenix.dev — scroll behaviour (reveal, scroll-spy, back-to-top) */
(() => {
    document.addEventListener("DOMContentLoaded", () => {
        /* Reveal elements as they enter the viewport */
        const items = document.querySelectorAll(".reveal");
        if ("IntersectionObserver" in window) {
            const io = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("in");
                        io.unobserve(entry.target);
                    }
                });
            }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
            items.forEach((el) => io.observe(el));
        } else {
            items.forEach((el) => el.classList.add("in"));
        }

        /* Highlight the nav link of the section in view */
        const links = document.querySelectorAll(".nav-links a, .mobile-menu a");
        const sections = [...document.querySelectorAll("main section[id]")];
        const setActive = (id) => links.forEach((a) =>
            a.classList.toggle("active", a.getAttribute("href") === `#${id}`));

        if ("IntersectionObserver" in window) {
            const spy = new IntersectionObserver((entries) => {
                entries.forEach((entry) => { if (entry.isIntersecting) setActive(entry.target.id); });
            }, { rootMargin: "-45% 0px -50% 0px" });
            sections.forEach((s) => spy.observe(s));
        }

        /* Back-to-top button */
        const btn = document.getElementById("scroll-top-btn");
        const onScroll = () => btn.classList.toggle("show", scrollY > 600);
        btn.addEventListener("click", () => scrollTo({ top: 0, behavior: "smooth" }));
        addEventListener("scroll", onScroll, { passive: true });
        onScroll();
    });
})();
