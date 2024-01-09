"use strict";

const isLocal = true;

console.log("jeelo from desktop!!");

// // ----------------------------
// Toggle Search
// // ----------------------------
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

// ----------------------------
//Swiper slider
// ----------------------------

$(".slider_container").each(function () {
    const sliderTimeline = $(this).find(".swiper.is-timeline")[0];
    const sliderVideo = $(this).find(".swiper.is-video")[0];

    console.log("slider");
    const swiperTimeline = new Swiper(sliderTimeline, {
        slidesPerView: "auto",
        speed: 700,
        // centeredSlides: true,
        initialSlide: 0,
        // loop: true,
        // spaceBetween: 40,
        navigation: {
            nextEl: $(this).find(".arrow-next")[0],
            prevEl: $(this).find(".arrow-prev")[0],
            disabledClass: "is-disabled",
        },
        slideActiveClass: "is-active",
        slideDuplicateActiveClass: "is-active",
    });

    const swiperVideo = new Swiper(sliderVideo, {
        slidesPerView: "auto",
        speed: 700,
        // centeredSlides: true,
        initialSlide: 1,
        // loop: true,
        // spaceBetween: 40,
        navigation: {
            nextEl: $(this).find(".arrow-next")[0],
            prevEl: $(this).find(".arrow-prev")[0],
            disabledClass: "is-disabled",
        },
        slideActiveClass: "is-active",
        slideDuplicateActiveClass: "is-active",
    });
});

//
// Slider timeline
//
$(".slider-timeline-all").each(function () {
    const swiperSlideImgs = new Swiper(
        $(this).find("[swiper-timeline-imgs]")[0],
        {
            slidesPerView: 1,
            speed: 500,
            effect: "fade",
            loop: false,
            navigation: {
                nextEl: $(this).find("[arrow-next]")[0],
                prevEl: $(this).find("[arrow-prev]")[0],
                disabledClass: "is-disabled",
            },
            fadeEffect: {
                crossFade: true,
            },
        }
    );

    const swiperSlideTimeline = new Swiper(
        $(this).find("[swiper-timeline-text]")[0],
        {
            slidesPerView: "auto",
            speed: 500,
            loop: false,
            slideToClickedSlide: true,
            control: "[swiper-timeline-imgs]",
            navigation: {
                nextEl: $(this).find("[arrow-next]")[0],
                prevEl: $(this).find("[arrow-prev]")[0],
                disabledClass: "is-disabled",
            },
            slideActiveClass: "is-active",
            slideDuplicateActiveClass: "is-active",
        }
    );
    swiperSlideTimeline.controller.control = swiperSlideImgs;
});

// ----------------------------
//Video showreel
// ----------------------------
// const video = $(".video-fluid video");
const video = $(".video-fluid").find("video")[0];
if (video.length) {
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
