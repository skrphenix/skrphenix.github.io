document.addEventListener("DOMContentLoaded", (e) => setInterval(
    () => {
        let loader = document.getElementById("pre-loader");
        if (!loader.classList.contains("hidden"))
            loader.classList.add("hidden");
    },
    1000
))

function disable_images_interaction() {
    let images = document.getElementsByTagName("img");
    for (let i = 0; i < images.length; i++) {
        images[i].style.pointerEvents = "none";
    }
}

function get_copyright() {
    let publish_year = 2024;
    let cpy_elm = document.getElementById("copyright-year");

    const d = new Date();
    let curr_year = d.getFullYear();
    if (curr_year > publish_year)
        cpy_elm.innerHTML = `© ${publish_year}-${curr_year}`;
    else
        cpy_elm.innerHTML = `© ${curr_year}`;
}

function enable_tooltips() {
    const tooltipTriggerList = document.querySelectorAll(
        '[data-bs-toggle="tooltip"]'
    );
    const tooltipList = [...tooltipTriggerList].map(
        (tooltipTriggerEl) =>
            new bootstrap.Tooltip(tooltipTriggerEl)
    );
}

function toggle_mode_initialize() {
    let mode = localStorage.getItem("web-mode");
    if (mode === null) {
        localStorage.setItem("web-mode", "light");
        return;
    }

    if (mode === "light" || mode === "dark")
        console.log("working");
}

document.addEventListener("DOMContentLoaded", (e) => {
    disable_images_interaction()
});
document.addEventListener("DOMContentLoaded", (e) => {
    enable_tooltips()
});
document.addEventListener("DOMContentLoaded", (e) => {
    get_copyright()
});
document.addEventListener("DOMContentLoaded", (e) => toggle_mode_initialize());

document.addEventListener("DOMContentLoaded", (e) => {
    document.querySelectorAll(".exp-toggle").forEach((btn) => {
        btn.addEventListener("click", () => {
            let desc = btn.previousElementSibling;
            let collapsed = desc.classList.toggle("collapsed");
            btn.textContent = collapsed ? "Show more" : "Show less";
            btn.setAttribute("aria-expanded", String(!collapsed));
        });
    });
});
