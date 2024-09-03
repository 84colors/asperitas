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
        console.log(videoCurrentTime);

        //Play start loop if loop is set to start
        if (looping == `start`) {
            playStartLoop();
            //hide all modals
        } else if (looping == `is-1`) {
            playLoop(1, 12, 14);
        } else if (looping == `is-2`) {
            playLoop(1, 6, 9);
        } else if (looping == `is-3`) {
            playLoop(1, 6, 9);
        }
    });

    //Play initial in loop
    function playStartLoop() {
        // video.get(0).currentTime = 1;
        // video.get(0).play();
        // restart video if current time is longer than
        if (videoCurrentTime >= 9.9) {
            video.get(0).currentTime = 0;
            video.get(0).play();
        }
    }

    // Play loop with transition
    function playLoop(startTransTime, startTime, endTime) {
        // video.get(0).currentTime = startTransTime;
        if (videoCurrentTime >= endTime) {
            video.get(0).currentTime = startTime;
            video.get(0).play();
        }
    }

    //Dots video
    $(dot1).on("click", function () {
        video.get(0).currentTime = 9.9;
        video.get(0).play();
        let dotID = $(this).attr(`s-energy-dot`);
        looping = dotID; // get from this data attr
        //hide modals, show matching modal. Toggle is hidden
        $(modals).removeClass(`is-hidden`);
        $(`.s-energy-anim_dots`).addClass(`is-hidden`);
        $(`[s-energy-panel = "${dotID}"]`).removeClass(`is-hidden`);
    });
    $(dot2).on("click", function () {
        video.get(0).currentTime = 2;
        video.get(0).play();
        looping = `is-2`;
        // video.get(0).play();
    });
    $(dot3).on("click", function () {
        video.get(0).currentTime = 3;
        video.get(0).play();
        looping = `is-3`;
    });

    //Close modal set looping == `start`, play rest of loop to zoom back in. Or reverse? No, just add a copy in AE  If modal 1...
    $(`.s-energy-anim_panel-close`).on(`click`, function () {
        //parent remove class
        $(this).parent(`[s-energy-panel]`).addClass(`is-hidden`);
        video.get(0).currentTime = 1;
        video.get(0).play();
        looping == `start`;

        //parent get attr
        //if attr is-1, play from to once, check with if the current time is over then set looping == `start`

        $(`.s-energy-anim_dots`).removeClass(`is-hidden`);
    });
});

// https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/currentTime
// https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/timeupdate_event
