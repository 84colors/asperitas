"use strict";
// const isLocalForm = true;

console.log("from desktop form?");

// // ----------------------------
// Set variables
// // ----------------------------

//Global values
const global_pueAir = 1.4;
const global_pueImm = 1.22;
let global_elCost = 0.2;
const global_elCO2Impact = 258;
const global_fanLosses = 0.15;

const userInputs = $("[userInput = 'true']");
let inServerPower = $("#tco-power");
let inServersNum = $("#tco-servers-num");
let inCapacity = $("#tco-total-capacity");
let inElCost = $("#tco-el-cost");

let btnCalculate = $("#tco-submit");

let outTotalAirText = $("#tco-overview-savings-air");
let outTotalImmersed = $("#tco-overview-savings-imm");
let outTotalImmersedBar = $("#tco-overview-immersed .s-tco_graph-row-bar");
let outSavingsTotalYear = $("#tco-overview-savings-total");

let donutTotalPer = $("#tco-overview-donut .donut-percent");
let donutTotalCosts = $("#tco-overview-donut .donut-segment");

let userPersona = "none";

// // ----------------------------
// TCO form
// // ----------------------------

//Set electricity cost
inElCost.val(global_elCost);

//Disable calculcate button
$(btnCalculate).addClass("disabled");

// ------
// UserInput change
// ------
userInputs.on("blur", function () {
    //If any of the fields are full
    if (!$(inServerPower).val().length == 0 && userPersona !== "Ops") {
        userPersona = "IT";
        //disable Ops
        $(inCapacity).addClass("disabled");
        $(inCapacity).attr("disabled", true);
        $(inCapacity).attr(
            "title",
            `Remove input from Power and Servers to use this field`
        );
        //enable calculate button
        $(btnCalculate).removeClass("disabled");
    }
    if (!$(inServersNum).val().length == 0 && userPersona !== "Ops") {
        userPersona = "IT";
        $(inCapacity).addClass("disabled");
        $(inCapacity).attr("disabled", true);
        $(inCapacity).attr(
            "title",
            `Remove input from Power and Servers to use this field`
        );

        //enable calculate button
        $(btnCalculate).removeClass("disabled");
    }
    if (!$(inCapacity).val().length == 0 && userPersona !== "IT") {
        userPersona = "Ops";
        $(inServerPower).addClass("disabled");
        $(inServerPower).attr("disabled", true);
        $(inServerPower).attr(
            "title",
            `Remove input from Capacity to use this field`
        );
        $(inServersNum).addClass("disabled");
        $(inServersNum).attr("disabled", true);
        $(inServersNum).attr(
            "title",
            `Remove input from Capacity to use this field`
        );
        //enable calculate button
        $(btnCalculate).removeClass("disabled");
    }

    //If none of the fields are full
    if (
        $(inServerPower).val().length == 0 &&
        $(inServersNum).val().length == 0 &&
        $(inCapacity).val().length == 0
    ) {
        userPersona = "none";
        //If none of the fields are full, remove disabled
        $(inCapacity).attr("disabled", false);
        $(inServerPower).attr("disabled", false);
        $(inServersNum).attr("disabled", false);

        $(inCapacity).removeClass("disabled");
        $(inServerPower).removeClass("disabled");
        $(inServersNum).removeClass("disabled");

        //Disable calculate button
        $(btnCalculate).addClass("disabled");
    }

    console.log(userPersona);
});

// ----------
//CALCULATE
// ----------
// btnCalculate.addEventListener("click", calculateCost);
$(btnCalculate).on("click", function () {
    // console.log(userPersona);
    // calculateCost();
    if (userPersona !== "none") {
        calculateCost();
        $("#btn-download").removeClass("disabled");
    }
});

function calculateCost() {
    let outSavingsTotalTenYText =
        parseFloat(inElCost.val()) + parseFloat(inServersNum.val());

    // console.log(outSavingsTotalTenYText);
    // outSavingsTotalTenY.text(`-€` + outSavingsTotalTenYText);

    //For IT Persona
    // ----------------
    //POWER
    // ----------------
    let tcoCriticalPowerAir =
        (parseFloat(inServerPower.val()) * parseFloat(inServersNum.val())) /
        1000000;
    let tcoUtilityPowerAir = tcoCriticalPowerAir * global_pueAir;
    let tcoOverheadPowerAir = tcoUtilityPowerAir - tcoCriticalPowerAir;

    let tcoCriticalPowerImm = tcoCriticalPowerAir;
    let tcoUtilityPowerImm = tcoCriticalPowerAir * global_pueImm;
    let tcoOverheadPowerImm = tcoUtilityPowerImm - tcoCriticalPowerImm;

    console.log(`critical power Air: ${tcoCriticalPowerAir}`);
    console.log(`utility power Air: ${tcoUtilityPowerAir}`);
    console.log(`overhead power Air: ${tcoOverheadPowerAir.toFixed(2)}`);

    console.log(`critical power Imm: ${tcoCriticalPowerImm}`);
    console.log(`utility power Imm: ${tcoUtilityPowerImm}`);
    console.log(`overhead power Imm: ${tcoOverheadPowerImm.toFixed(2)}`);

    // -------
    //ENERGY $(`#panelEnergy`)
    // -------
    let tcoEnergyAir = Math.ceil(tcoUtilityPowerAir * 1000 * 8760);
    let tcoEnergyImm = Math.ceil(
        tcoUtilityPowerImm * 1000 * 8760 * (1 - global_fanLosses)
    );
    let tcoEnergySavings = tcoEnergyAir - tcoEnergyImm;
    let tcoEnergyPerc = Math.ceil((tcoEnergySavings / tcoEnergyAir) * 100);
    // tcoEnergyPerc.toFixed();
    $("#panelEnergy #tco-energy-air").text(`€` + tcoEnergyAir.toLocaleString());
    $("#panelEnergy #tco-energy-val").text(`€` + tcoEnergyImm.toLocaleString());

    $("#panelEnergy .donut-percent").text(tcoEnergyPerc + `%`);
    $("#panelEnergy .donut-segment").attr(
        "stroke-dasharray",
        `${tcoEnergyPerc} ${100 - tcoEnergyPerc}`
    );

    $("#panelEnergy #tco-energy-bar").css("width", tcoEnergyPerc + `%`);
    $("#panelEnergy #tco-energy-savings").text(
        `-€` + tcoEnergySavings.toLocaleString()
    );

    // -------
    //OPEX $(`#panelEnergy`)
    // -------
    let tcoOpexAir = Math.ceil(tcoUtilityPowerAir * 1000 * 8760);
    let tcoOpexImm = Math.ceil(
        tcoUtilityPowerImm * 1000 * 8760 * (1 - global_fanLosses)
    );
    let tcoOpexSavings = tcoOpexAir - tcoOpexImm;
    let tcoOpexPerc = Math.ceil((tcoOpexSavings / tcoOpexAir) * 100);
    // tcoOpexPerc.toFixed();
    $("#panelOpex #tco-Opex-air").text(`€` + tcoOpexAir.toLocaleString());
    $("#panelOpex #tco-Opex-val").text(`€` + tcoOpexImm.toLocaleString());

    $("#panelOpex .donut-percent").text(tcoOpexPerc + `%`);
    $("#panelOpex .donut-segment").attr(
        "stroke-dasharray",
        `${tcoOpexPerc} ${100 - tcoOpexPerc}`
    );

    $("#panelOpex #tco-Opex-bar").css("width", tcoOpexPerc + `%`);
    $("#panelOpex #tco-Opex-savings").text(
        `-€` + tcoOpexSavings.toLocaleString()
    );

    // -------
    //OVERVIEW
    // -------
    let outTotalAir = 100 / 5;
    let outTotalCosts = 1000 * 10;
    outTotalImmersedBar.css("width", outTotalAir + `%`);
    // outSavingsTotalPer.text(outTotalAir + `% `);

    //Donut Text
    // donutTotalPer.text(outTotalAir + `%`);
    //Donut Inner
    // donutTotalCosts.attr("stroke-dasharray", "30 70");

    //Overview text
    $(`#textOverview`).html(
        `<h2 class="heading-style-h4">You could be saving <em>${outTotalAir}% </em>with Asperitas,<br><em>€${outTotalCosts}</em> over 10 Years</h2>`
    );
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
