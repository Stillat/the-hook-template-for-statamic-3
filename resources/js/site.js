require('./components/infinite-scroll.js')

var btn = document.querySelector("button"),
    nav = document.querySelector("nav");

btn.addEventListener("click", () => {
    nav.classList.toggle("hidden");
});