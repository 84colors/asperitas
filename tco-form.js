"use strict";
// const isLocalForm = true;

console.log("from desktop form :!!");

// // ----------------------------
// Set variables
// // ----------------------------

//Set PUE cost
let global_pueAirVal = 1.4;
let inPue = $("#tco-air-pue");
inPue.val(global_pueAirVal);

let global_pueAir = inPue.val();
let global_pueImm = global_pueAir - 0.18;

//Global values
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
// FORM UserInput change
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
            `Remove values from "Typical Server Power" and "#Servers" to use this input`
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
//CALCULATE VALUES
// ----------
// btnCalculate.addEventListener("click", calculateCost);
$(btnCalculate).on("click", function () {
    // calculateCost();
    if (userPersona !== "none") {
        calculateCost();
        $("#btn-download").removeClass("disabled");
        $("#btn-download").click(function () {
            $window.print();
        });
    }
});

// Update text values
function tcoUpdateVals(target, tcoAir, tcoImm, tcoSavings, tcoPerc, unit) {
    $(target)
        .find(`[tcoCost = "air"]`)
        .eq(0)
        .text(tcoAir.toLocaleString() + unit);
    $(target)
        .find(`[tcoCost = "imm"]`)
        .eq(0)
        .text(tcoImm.toLocaleString() + unit);
    $(target)
        .find(`[tcoCost = "savings"]`)
        .eq(0)
        .text(tcoSavings.toLocaleString() + unit);
    $(target)
        .find(`[tcoCost = "bar"]`)
        .eq(0)
        .css("width", `${100 - tcoPerc}` + `%`);
    $(target)
        .find(`.donut-percent`)
        .eq(0)
        .text(tcoPerc + `%`);
    $(target)
        .find(`.donut-segment`)
        .eq(0)
        .attr("stroke-dasharray", `${tcoPerc} ${100 - tcoPerc}`);
}

function calculateCost() {
    let outSavingsTotalTenYText =
        parseFloat(inElCost.val()) + parseFloat(inServersNum.val());

    //For IT Persona
    // ----------------
    //POWER PUE
    // ----------------
    let tcoCriticalPowerAir,
        tcoUtilityPowerAir,
        tcoCriticalPowerImm,
        tcoUtilityPowerImm;
    if (userPersona == "IT") {
        tcoCriticalPowerAir =
            (parseFloat(inServerPower.val()) * parseFloat(inServersNum.val())) /
            1000000;
        tcoUtilityPowerAir = tcoCriticalPowerAir * global_pueAir;

        tcoCriticalPowerImm = tcoCriticalPowerAir;
        tcoUtilityPowerImm = tcoCriticalPowerAir * global_pueImm;
    } else {
        tcoCriticalPowerAir = parseFloat(inCapacity.val()) / global_pueAir;
        tcoUtilityPowerAir = inCapacity.val();
        tcoCriticalPowerImm = parseFloat(inCapacity.val()) / global_pueImm;
        tcoUtilityPowerImm = inCapacity.val();
    }

    let tcoOverheadPowerAir = tcoUtilityPowerAir - tcoCriticalPowerAir;
    let tcoOverheadPowerImm = tcoUtilityPowerImm - tcoCriticalPowerImm;

    //Calculate savings and percentage
    let tcoPUESavings = tcoOverheadPowerAir - tcoOverheadPowerImm;
    let tcoPUEPerc = Math.ceil((tcoPUESavings / tcoOverheadPowerAir) * 100);

    // Update text values
    tcoUpdateVals(
        `#panelPue`,
        tcoOverheadPowerAir,
        tcoOverheadPowerImm,
        tcoPUESavings,
        tcoPUEPerc,
        ``
    );

    // -------
    //ENERGY $(`#panelEnergy`)
    // -------

    let tcoEnergyAir = Math.ceil(tcoUtilityPowerAir * 1000 * 8760);
    let tcoEnergyImm = Math.ceil(
        tcoUtilityPowerImm * 1000 * 8760 * (1 - global_fanLosses)
    );
    //Calculate savings and percentage
    let tcoEnergySavings = tcoEnergyAir - tcoEnergyImm;
    let tcoEnergyPerc = Math.ceil((tcoEnergySavings / tcoEnergyAir) * 100);

    // Update text values
    tcoUpdateVals(
        `#panelEnergy`,
        tcoEnergyAir,
        tcoEnergyImm,
        tcoEnergySavings,
        tcoEnergyPerc,
        ``
    );

    // -------
    //OPEX $(`#panelOpex`)
    // -------
    let tcoOpexAir = Math.ceil((tcoEnergyAir * inElCost.val()) / 1000);
    let tcoOpexImm = Math.ceil(
        ((tcoEnergyImm * inElCost.val()) / 1000) * (1 - global_fanLosses)
    );

    //Calculate savings and percentage
    let tcoOpexSavings = tcoOpexAir - tcoOpexImm;
    let tcoOpexPerc = Math.ceil((tcoOpexSavings / tcoOpexAir) * 100);

    // Update text values
    tcoUpdateVals(
        `#panelOpex`,
        tcoOpexAir,
        tcoOpexImm,
        tcoOpexSavings,
        tcoOpexPerc,
        ``
    );

    // -------
    //CO2 $(`#panelCO2`)
    // -------
    let tcoCO2Air = Math.ceil((tcoEnergyAir * global_elCO2Impact) / 1000000);
    let tcoCO2Imm = Math.ceil(
        ((tcoEnergyImm * global_elCO2Impact) / 1000000) * (1 - global_fanLosses)
    );

    //Calculate savings and percentage
    let tcoCO2Savings = tcoCO2Air - tcoCO2Imm;
    let tcoCO2Perc = Math.ceil((tcoCO2Savings / tcoCO2Air) * 100);

    // Update text values
    tcoUpdateVals(
        `#panelCO2`,
        tcoCO2Air,
        tcoCO2Imm,
        tcoCO2Savings,
        tcoCO2Perc,
        ``
    );

    // -------
    //OVERVIEW
    // -------
    let outTotalAir = 100 / 5;
    let outTotalCosts = 1000 * 10;
    // outTotalImmersedBar.css("width", outTotalAir + `%`);
    // outSavingsTotalPer.text(outTotalAir + `% `);

    //Donut Text
    // donutTotalPer.text(outTotalAir + `%`);
    //Donut Inner
    // donutTotalCosts.attr("stroke-dasharray", "30 70");

    //Overview text
    $(`#textOverview`).html(
        `<h2 class="heading-style-h4">You could be saving <em>${tcoOpexPerc}% </em>with Asperitas,<br><em>€${
            tcoCO2Savings * 10
        }</em> over 10 Years</h2>`
    );
}
