"use strict";
// const isLocalForm = true;

console.log("from desktop form!!");

// // ----------------------------
// Get variables
// // ----------------------------
let inputPower = $("#tco-power");
let inputServersNum = $("#tco-servers-num");
let inputCapacity = $("#tco-total-capacity");
let inputElCost = $("#tco-el-cost");

let btnCalculate = $("#tco-submit");

let outTotalAirText = $("#tco-overview-savings-air");
let outTotalDirect = $("#tco-overview-savings-direct");
let outTotalImmersed = $("#tco-overview-savings-immersed");
let outTotalImmersedBar = $("#tco-overview-immersed .s-tco_graph-row-bar");
let outSavingsTotalYear = $("#tco-overview-savings-total");
let outSavingsTotalTenY = $("#tco-overview-savings-teny");
let outSavingsTotalPer = $("#tco-overview-savings-per-total");

let donutTotalPer = $("#tco-overview-donut .donut-percent");
let donutTotalCosts = $("#tco-overview-donut .donut-segment");

// // ----------------------------
// TCO form
// // ----------------------------

inputElCost.val(3);

// btnCalculate.addEventListener("click", calculateCost);
$(btnCalculate).on("click", function () {
    // console.log("stuff");
    //Do some error handling stuff here
    calculateCost();
});

function calculateCost() {
    let outSavingsTotalTenYText =
        parseFloat(inputElCost.val()) + parseFloat(inputServersNum.val());
    // console.log(outSavingsTotalTenYText);
    outSavingsTotalTenY.text(`-€` + outSavingsTotalTenYText);

    let outTotalAir = 100 / 10;
    outTotalImmersedBar.css("width", outTotalAir + `%`);
    outSavingsTotalPer.text(outTotalAir + `% `);

    //Donut Text
    donutTotalPer.text(outTotalAir + `%`);
    //Donut Inner
    donutTotalCosts.attr("stroke-dasharray", "30 70");
}

function calculateTip() {
    console.log(inputElCost.val());
    // let amount = parseFloat(document.getElementById("amount").value);
    // let persons = parseInt(document.getElementById("persons").value);
    // let service = parseFloat(document.getElementById("services").value);
    // if (
    //     isNaN(amount) ||
    //     isNaN(persons) ||
    //     isNaN(service) ||
    //     service === 0 ||
    //     persons === 0
    // ) {
    //     alert("Please enter valid values");
    //     return;
    // }
    // let total = (amount * service) / persons;
    // total = total.toFixed(2);
    // document.getElementById("tip-amount").classList.remove("hidden");
    // document.getElementById(
    //     "tip-amount"
    // ).innerHTML = `Tip Amount: ${total} ₹ each`;
}
