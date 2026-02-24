"use strict";
// const isLocal = true;

console.log("jeelo from desktopss!!");

// // ----------------------------
// Toggle Search
// // ----------------------------
const searchInput = $(".search-wrap .v");
const searchInputWrap = $(".search-field-wrap");
const searchIcon = $(".search-wrap .icon-search");
const searchIClose = $(".search-wrap .icon-search-close");
const siteNav = $(".nav-links");
const navSearch = $(".nav-search");
const navWrap = $(".mobile-nav");

//Set width of search box init
// navSearch.css("width", "0px");

//Set input size init
const tlSearch = gsap.timeline({
    paused: true,
    ease: "power4.in0ut",
});

tlSearch.to(searchInputWrap, {
    width: "100%",
    duration: 0.4,
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
    navSearch,
    {
        width: 400,
        duration: 0.3,
    },
    "<"
);
tlSearch.to(
    siteNav,
    {
        opacity: 0,
        duration: 0.5,
    },
    0
);
tlSearch.to(
    searchIClose,
    {
        opacity: 1,
        duration: 0.2,
    },
    "<0.1"
);

//On click of search icon, resize input and show close btn, fade nav, add focus
$(searchIcon).on("click", function () {
    tlSearch.restart();
    searchInput.focus();
    $(this).css("pointer-events", "none");
});

//On click of close btn, reverse timeline, clear value
$(searchIClose).on("click", function () {
    tlSearch.reverse();
    searchInput.val("");
    searchIcon.css("pointer-events", "auto");
});

// ----------------------------
//Swiper slider
// ----------------------------

// ------------------------
// Slider timeline
//

// ----------------------------
//Video showreel
// ----------------------------
// const video = $(".video-fluid video");
const video = $(".video-fluid").find("video")[0];
if ($(".video-fluid video").length) {
    video.pause();
}

//Intro Video play
function scrollVideo() {
    let tlVideo = gsap.timeline({
        scrollTrigger: {
            trigger: ".video-fluid",
            start: "top 60%",
            end: "bottom 20%",
            // markers: "true",
            ease: "none",
            onEnter: () => video.play(),
            onEnterBack: () => video.play(),
            onLeave: () => video.pause(),
            onLeaveBack: () => video.pause(),
        },
    });
}
scrollVideo();

// Splash hover effect
$(".splash").ripples({
    resolution: 768,
    dropRadius: 15,
    perturbance: 0.03,
});

// FAQ TOGGLES
// -------------------
// [faq='faq-container'] on container of all items, usually a flex, with item as direct child
// [faq='faq-item-content'] on container of text to be hidden, gets 0 height by default and height auto on 'is-active' class
// [faq='faq-item-img'] on icon that spins
// -------------------
let faqContainer = $("[faq='faq-container']");

faqContainer.each(function () {
    let faqItem = $(this).find($("[faq='faq-container'] > div"));

    // add a timeline for each tab item and pass index
    faqItem.each(function () {
        let faqContent = $(this).find("[faq='faq-item-content']");
        let faqContentImg = $(this).find("[faq='faq-item-img']");
        //on click active class to clicked tab and play timeline
        $(this).on("click", function () {
            faqItem.removeClass("is-active");
            faqItem
                .find($("[faq='faq-item-content']"))
                .removeClass("is-active");
            faqItem.find($("[faq='faq-item-img']")).removeClass("is-active");
            $(this).toggleClass("is-active");
            faqContentImg.toggleClass("is-active");
            faqContent.toggleClass("is-active");
        });
    });
});
