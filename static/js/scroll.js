function inScrollView(elem) {
    let rect = elem.getBoundingClientRect();
    return rect.bottom - Math.round(rect.bottom / 2) <= window.innerHeight;
}

function view_scroll_btn(btn) {
    if (window.scrollY < 300) {
        btn.style.display = "none";
    }
    else {
        btn.style.display = "block";
    }
}

function add_view_to_elements() {
    let cards = document.getElementsByClassName("card");
    for (let i = 0; i < cards.length; i++) {
        let card = cards[i];
        if (inScrollView(card))
            if ((i + 1) % 2 !== 0) {
                if (!(card.classList.contains("view") && card.classList.contains("odd")))
                    card.classList.add("view", "odd");
            }
            else {
                if (!(card.classList.contains("view") && card.classList.contains("even")))
                    card.classList.add("view", "even");
            }
    }

    let social_icons = document.querySelectorAll("#contact a.btn");
    for (let i = 0; i < social_icons.length; i++) {
        let icon = social_icons[i];
        if (inScrollView(icon))
            if (!icon.classList.contains("view"))
                icon.classList.add("view");
    }
};

document.addEventListener("DOMContentLoaded", (e) => {
    let btn = document.getElementById("scroll-top-btn");
    btn.addEventListener("click", (e) => {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        btn.style.display = "none";
    });

    view_scroll_btn(btn);
    add_view_to_elements();

    document.addEventListener("scroll", (e) => { view_scroll_btn(btn) });
    document.addEventListener("scroll", (e) => { add_view_to_elements() });
});
