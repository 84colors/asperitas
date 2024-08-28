"use strict";
const isLocalVideo = true;

jQuery(document).ready(function ($) {
    console.log("from the jqs :D");

    //Get vars
    const video = $("#video-loop");
    let videoCurrentTime;
    const btnPlay = $("#play");
    const btnPause = $("#pause");
    const btnLoop01 = $("#loop1");
    const btnLoop02 = $("#loop2");
    const btnLoop03 = $("#loop3");
    let looping;

    //Pause video
    $(btnPause).on("click", function () {
        video.get(0).pause();
    });

    //Loop video
    $(`#loop1`).on("click", function () {
        console.log("loop01");
        video.get(0).currentTime = 0.5;
        video.get(0).play();
        looping = "loop1";
    });
    $(`#loop2`).on("click", function () {
        console.log("loop01");
        video.get(0).currentTime = 1.5;
        video.get(0).play();
        looping = "loop2";
    });

    //Loop with transition
    // play
    video.get(0).addEventListener("timeupdate", (event) => {
        videoCurrentTime = video.get(0).currentTime;
        console.log(videoCurrentTime);
        if (looping === "loop1") {
            if (videoCurrentTime >= 1.5) {
                video.get(0).currentTime = 0.5;
                video.get(0).play();
            }
        } else if (looping === "loop2") {
            if (videoCurrentTime >= 2.5) {
                video.get(0).currentTime = 2;
                video.get(0).play();
            }
        }
    });
});

// https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/currentTime
// https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/timeupdate_event
