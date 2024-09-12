"use strict";
// const isLocalVideo = true;

jQuery(document).ready(function ($) {
    console.log("from the jqs :D");

    //Get vars
    const video = $("#video-loop");
    let videoCurrentTime = 1;
    const dot1 = $(`[s-energy-dot = "is-1"]`);
    const dot2 = $(`[s-energy-dot = "is-2"]`);
    const dot3 = $(`[s-energy-dot = "is-3"]`);

    let looping = `start`;

    let dots = $("[s-energy-dot]");
    let modals = $("[s-energy-panel]");

    //Start video
    video.get(0).play();

    //Set event to get current video time. Only runs when the video is playing
    video.get(0).addEventListener("timeupdate", (event) => {
        videoCurrentTime = video.get(0).currentTime;
        // console.log(videoCurrentTime);

        //Play start loop if loop is set to start
        if (looping == `start`) {
            playStartLoop();
        } else if (looping == `is-1`) {
            playLoop(10.79, 14.14);
        } else if (looping == `is-2`) {
            playLoop(16.52, 19.22);
        } else if (looping == `is-3`) {
            playLoop(21.55, 23.76);
        } else if (looping == `is-1-reversed`) {
            if (video.get(0).currentTime < 14.14) {
                video.get(0).currentTime = 14.35;
                video.get(0).play();
            } else if (video.get(0).currentTime >= 15.29) {
                video.get(0).currentTime = 0;
                video.get(0).play();
                looping = `start`;
            }
        } else if (looping == `is-2-reversed`) {
            if (video.get(0).currentTime < 19.15) {
                video.get(0).currentTime = 19.25;
                video.get(0).play();
            } else if (video.get(0).currentTime >= 20.22) {
                video.get(0).currentTime = 0;
                video.get(0).play();
                looping = `start`;
            }
        } else if (looping == `is-3-reversed`) {
            if (video.get(0).currentTime < 23.81) {
                video.get(0).currentTime = 24.0;
                video.get(0).play();
            } else if (video.get(0).currentTime >= 24.38) {
                video.get(0).currentTime = 0;
                video.get(0).play();
                looping = `start`;
            }
        }
    });

    //Play initial in loop, restart video if current time is longer than
    function playStartLoop() {
        if (videoCurrentTime >= 9.22) {
            video.get(0).currentTime = 0;
            video.get(0).play();
        }
    }

    // Play loop with transition
    function playLoop(startTime, endTime) {
        if (videoCurrentTime >= endTime) {
            video.get(0).currentTime = startTime;
            video.get(0).play();
        }
    }

    // Play reverse loop with transition
    function playReverseLoop(startTime, endTime) {
        if (video.get(0).currentTime >= endTime) {
            video.get(0).currentTime = 0;
            video.get(0).play();
            looping = `start`;
            console.log(video.get(0).currentTime);
        }
    }

    //Dots video
    $(dot1).on("click", function () {
        video.get(0).currentTime = 9.65;
        video.get(0).play();
        looping = `is-1`;
        showModal();
    });
    $(dot2).on("click", function () {
        video.get(0).currentTime = 15.41;
        video.get(0).play();
        looping = `is-2`;
        showModal();
    });
    $(dot3).on("click", function () {
        video.get(0).currentTime = 20.42;
        video.get(0).play();
        looping = `is-3`;
        showModal();
    });

    //Show modals
    function showModal() {
        $(modals).addClass(`is-hidden`);
        $(`.s-energy-anim_dots`).addClass(`is-hidden`);
        //add a delay of 1s or smth, event...umm..
        setTimeout(() => {
            $(`[s-energy-panel = "${looping}"]`).removeClass(`is-hidden`);
        }, 500);
    }

    //Close btn
    $(`.s-energy-anim_panel-close`).on(`click`, function () {
        //parent remove class, hide modal
        $(this).parent(`[s-energy-panel]`).addClass(`is-hidden`);
        $(`.s-energy-anim_dots`).removeClass(`is-hidden`);
        if (looping == `is-1`) {
            looping = `is-1-reversed`;
        } else if (looping == `is-2`) {
            looping = `is-2-reversed`;
        } else if (looping == `is-3`) {
            looping = `is-3-reversed`;
        }
        console.log(looping);
    });
});

// https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/currentTime
// https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/timeupdate_event
