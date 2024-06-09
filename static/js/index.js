document.addEventListener("DOMContentLoaded", (e) => setInterval(
    () => {
        let loader = document.getElementById("pre-loader");
        if (!loader.classList.contains("hidden"))
            loader.classList.add("hidden");
    },
    2 * 1000
));

function disable_img_interaction(element_id) {
    let image = document.getElementById(element_id);
    image.style.pointerEvents = "none";
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

document.addEventListener("DOMContentLoaded", (e) => { disable_img_interaction("about-banner") });
document.addEventListener("DOMContentLoaded", (e) => { enable_tooltips() });
document.addEventListener("DOMContentLoaded", (e) => { get_copyright() });
