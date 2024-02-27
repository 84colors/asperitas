// gsap.registerPlugin(ScrollTrigger);
"use strict";
// const isLocalMV = true;

$(document).ready(function () {
    //Get model-viewer with ID of model
    const mv = document.querySelector("#model");
    const mvJ = $("#model");

    const btnOpen = $(".btn-open");
    const btnClose = $(".btn-close");

    // console.log("hello???");

    btnOpen.show();
    btnClose.hide();

    // --------------------
    // Toggle anim on click
    // --------------------
    mv.addEventListener("load", (e) => {
        let isOpen = true;
        btnClose.hide();

        // if (isOpen) {
        //     btnOpen.on("click", function () {
        //         mv.animationName = "MoveUp";
        //         mv.timeScale = 1;
        //         mv.play({ repetitions: 1 });
        //     });
        //     isOpen = false;
        // } else {
        //     btnOpen.on("click", function () {
        //         mv.animationName = "MoveUp";
        //         mv.timeScale = -1;
        //         mv.play({ repetitions: 1 });
        //     });
        //     isOpen = true;
        // }

        btnOpen.on("click", function () {
            mv.animationName = "ArmatureAction.001";
            mv.timeScale = 1;
            mv.play({ repetitions: 1 });
            $(this).hide();
            btnClose.show();
        });
        btnClose.on("click", function () {
            mv.timeScale = -1;
            mv.animationName = "ArmatureAction.001";
            mv.play({ repetitions: 1 });
            $(this).hide();
            btnOpen.show();
        });
    });

    // --------------------
    // Play GLTF animation. note: bug with repetion when using name
    // --------------------

    mv.addEventListener("camera-change", (e) => {
        let cameraTargetNew = mv.getCameraTarget();
        let cameraOrbitNew = mv.getCameraOrbit();
        // console.log(`Target: ${cameraTargetNew};`, `Orbit: ${cameraOrbitNew}`);
    });
});
