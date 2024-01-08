"use strict";

const isLocal = true;

console.log("jeelo from desktop??");

// //
// Toggle Search
// //
const searchInput = $(".search-wrap .v");
const searchInputWrap = $(".search-field-wrap");
const searchIcon = $(".search-wrap .icon-search");
const searchIClose = $(".search-wrap .icon-search-close");
const siteNav = $(".nav-links");

//Set input size init
const tlSearch = gsap.timeline({
    paused: true,
    ease: "power4.in0ut",
});

tlSearch.to(searchInputWrap, {
    width: "100%",
    duration: 0.6,
});
tlSearch.to(
    searchIcon,
    {
        opacity: 0,
        duration: 0.3,
    },
    "<"
);
tlSearch.to(
    siteNav,
    {
        opacity: 0.5,
        duration: 0.5,
    },
    0
);
tlSearch.to(
    searchIClose,
    {
        opacity: 1,
        duration: 0.3,
    },
    "<0.1"
);

//On click of search icon, resize input and show close btn, fade nav, add focus
$(searchIcon).on("click", function () {
    tlSearch.timeScale(1);
    tlSearch.restart();
    searchInput.focus();
    $(this).css("pointer-events", "none");
});

//On click of close btn, reverse timeline, clear value
$(searchIClose).on("click", function () {
    tlSearch.timeScale(1.5);
    tlSearch.reverse();
    searchInput.val("");
    searchIcon.css("pointer-events", "auto");
});

////
