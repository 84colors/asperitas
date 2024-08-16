"use strict";
// const isLocalForm = true;

console.log("from desktop form???");

// // ----------------------------
// Set variables
// // ----------------------------

//Global values
const global_pueAir = 1.4;
const global_pueImm = 1.22;
let global_elCost = 0.4;
let global_elImpact = 258;
const global_fanLosses = 0.15;

const userInputs = $("[userInput = 'true']");
const inPower = $("#tco-power");
let inPowerVal = inPower.val();
const inServers = $("#tco-servers-num");
let inServersVal = inServers.val();
const inCapacity = $("#tco-total-capacity");
let inCapacityVal = inCapacity.val();
let inElCost = $("#tco-el-cost");
let inElCostVal = inElCost.val(global_elCost);

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

// ------
// UserInput change
// ------
userInputs.on("blur", function () {
    console.log("user input!");
});
// inServers.on("blur", updateValServers);
// inCapacity.on("blur", updateValCapacity);
// inElCost.on("blur", updateValCosts);

// function updateValPower() {
//     inPowerVal = $(this).val();
// }

// console.log(`yo`);

function updateVal() {
    let valueThis = $(this).val();
    if (inPowerVal.length === 0 || inServersVal.length === 0) {
        console.log(`persona Ops`);
    } else {
        console.log(`persona IT`);
    }
    // if (valueThis.length === 0) {
    //     console.log(`is empty`);
    // } else {
    //     console.log(valueThis);
    // }
}

//Select persona
let userPersona = `userOps`;
let setUserPersona = function () {
    userPersona = `userIT`;
    console.log(userPersona);
};

setUserPersona();

inElCost.val(global_elCost);

// disable inputs if first 2 are have active
// on click

// ----------
//CALCULATE
// ----------
// btnCalculate.addEventListener("click", calculateCost);
$(btnCalculate).on("click", function () {
    // console.log("stuff");
    //Do some error handling stuff here
    //add error divs under inputs in row

    calculateCost();
});

function calculateCost() {
    let outSavingsTotalTenYText =
        parseFloat(inElCost.val()) + parseFloat(inServersNum.val());
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
    console.log(inElCost.val());
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
