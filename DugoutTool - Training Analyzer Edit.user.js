// ==UserScript==
// @name            DugoutTool
// @namespace       Dugtool
// @version         1.4
// @description     This is a useful tool for Dugout-Online game.
// @include         http*://*dugout-online.com/players/details*playerID/*
// @include         http*://*dugout-online.com/players/none/view*clubid*
// @include         http*://*dugout-online.com/players/none/clubid*
// @include         https://*dugout-online.com/players_nt/none/clubid/*
// @include         http*://*dugout-online.com/finances/*
// @require         https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.2/Chart.min.js
// ==/UserScript==yyy

var APPNAME = "DugoutTool v1.4";
var FORUMLINK = "/forum/viewtopic/t/450035";

switch (checkPage(document.URL))
{
    case 0: doPlayerStuff(); break;
}

function checkPage (string1)
{
    'use strict';
    if(!document.getElementById("login_form_id")){
        if(isExist(string1, "players/details")){
            return 0;
        }
    }
    return -1;
}

function isExist(mainString, substring) {
    'use strict';
    if (mainString.indexOf(substring) != -1) {
        return true;
    }
    else {
        return false;
    }
}

function doPlayerStuff() {
    'use strict';
    if(document.getElementById("tra2")){
        createTrainingAnalyzerHtml(getPlayerTrainingAnalyzerAtributes());
        // if(document.getElementById("tra2").className == "tab_on_content"){
        //     document.getElementsByClassName("dogtoolWrapper")[0].classList.add("hide");
        // } else {
        //     document.getElementsByClassName("dogtoolWrapper")[1].classList.add("hide");
        // }
    }

    var actions = document.getElementsByClassName("tabs_content")[0].querySelectorAll("div");
    if (actions) {
        actions.forEach(function(elem) {
            elem.addEventListener("click", function() {
                var dogtoolWrapperElements = document.getElementsByClassName("dogtoolWrapper");

                if(elem.id.indexOf("tra") > -1){
                    dogtoolWrapperElements[0].classList.remove("hide");
                } else {
                    dogtoolWrapperElements[0].classList.add("hide");
                }
            });
        });
    }
}

function createTrainingAnalyzerHtml(playerTrainingAnalyzerAtributes){
    var html =
        '<table class="dugToolTable">'+
           '<thead>' +
              '<tr>' +
                 '<th>Attributes</th>' +
                 '<th>Training points</th>' +
              '</tr>' +
           '</thead>' +
           '<tbody>';

    for(var pos in playerTrainingAnalyzerAtributes){
        var playerTrainin = playerTrainingAnalyzerAtributes[pos];
        html +=
            '<tr>' +
               '<td>' + playerTrainin.name + '</td>'+
                 '<td>' + playerTrainin.value + '</td>' +
            '</tr>';
    }

    html +=
           '</tbody>' +
        '</table>';

    var css = '.dogtoolContent .graph {margin-bottom: 15px} ' +
    '.dugToolTable td, .dugToolTable th {font-size: 10px} ' +
    '.dugToolTable {margin-bottom: 10px; background-color: transparent; border-spacing: 0; border-collapse: collapse; width: 100%; max-width: 100%;} ' +
    '.dugToolTable>thead>tr>th {vertical-align: bottom; border-bottom: 2px solid rgba(0,0,0,.06); padding: 4px; line-height: 1.42857143;} ' +
    '.dugToolTable th, .dugToolTable td {text-align: left;} ' +
    '.dugToolTable>tbody>tr:nth-of-type(odd) {background-color: #f9f9f9;}' +
    '.dugToolTable>tbody>tr>td {padding: 4px; line-height: 1.42857143; vertical-align: top; border-top: 1px solid rgba(0,0,0,.06);}' +
    '.dugToolTable>tbody>tr:hover {background-color: #f5f5f5;}' +
    '.dugToolTable>tbody>tr.active td{background-color: #f5f5f5;}' +
    '.dugToolTable>tbody>tr.active:hover>td {background-color: #e8e8e8;}' +
    '.dugToolTable>tbody>tr.dugToolPositionHighlight {font-weight: bold;}' +
    '.dugToolTable .addInChart {cursor: pointer;}' +
    '.dugToolTable .addInChart:not(.active) {color: rgba(56, 56, 56, 0.1);}' +
    '.tooltip {position: absolute; display: inline-block;}' +
    '.tooltip .tooltiptext {visibility: hidden; width: 120px; background-color: #555; color: #fff; text-align: left; padding: 5px; font-size: 9px; border-radius: 6px; position: absolute; z-index: 1; bottom: 125%; right: -4px; margin-left: -65px; opacity: 0; transition: opacity 0.3s; line-height: 11px;}' +
    '.tooltip .tooltiptext::after {content: ""; position: absolute; top: 100%; right: 6px; margin-left: -5px; border-width: 5px; border-style: solid; border-color: #555 transparent transparent transparent;}' +
    '.tooltip:active .tooltiptext {visibility: visible; opacity: 1;}' +
    '.tooltip.graphLegend {left: 88%; cursor: pointer;}';

    createDugtoolHtml(html, css);
}



function getPlayerTrainingAnalyzerAtributes() {
    'use strict';
    var table = document.getElementById("progress").getElementsByTagName("table")[1].getElementsByTagName("td");

    var playerTrainingAnalyzerAtributes = {};
    playerTrainingAnalyzerAtributes.ratinggoalkeeper = {};
    playerTrainingAnalyzerAtributes.ratinggoalkeeper.name = "Goalkeeper";
    playerTrainingAnalyzerAtributes.ratinggoalkeeper.value = getTrainingPoint(table[2]);

    playerTrainingAnalyzerAtributes.ratingdefender = {};
    playerTrainingAnalyzerAtributes.ratingdefender.name = "Defender";
    playerTrainingAnalyzerAtributes.ratingdefender.value = getTrainingPoint(table[7]);

    playerTrainingAnalyzerAtributes.ratingmidfielder = {};
    playerTrainingAnalyzerAtributes.ratingmidfielder.name = "Midfielder";
    playerTrainingAnalyzerAtributes.ratingmidfielder.value = getTrainingPoint(table[12]);

    playerTrainingAnalyzerAtributes.ratingforward = {};
    playerTrainingAnalyzerAtributes.ratingforward.name = "Forward";
    playerTrainingAnalyzerAtributes.ratingforward.value = getTrainingPoint(table[17]);

    playerTrainingAnalyzerAtributes.reflexes = {};
    playerTrainingAnalyzerAtributes.reflexes.name = "Reflexes";
    playerTrainingAnalyzerAtributes.reflexes.value = getTrainingPoint(table[22]);

    playerTrainingAnalyzerAtributes.oneonones = {};
    playerTrainingAnalyzerAtributes.oneonones.name = "One on ones";
    playerTrainingAnalyzerAtributes.oneonones.value = getTrainingPoint(table[27]);

    playerTrainingAnalyzerAtributes.handling = {};
    playerTrainingAnalyzerAtributes.handling.name = "Handling";
    playerTrainingAnalyzerAtributes.handling.value = getTrainingPoint(table[32]);

    playerTrainingAnalyzerAtributes.communication = {};
    playerTrainingAnalyzerAtributes.communication.name = "Communication";
    playerTrainingAnalyzerAtributes.communication.value = getTrainingPoint(table[37]);

    playerTrainingAnalyzerAtributes.positioning = {};
    playerTrainingAnalyzerAtributes.positioning.name = "Positioning";
    playerTrainingAnalyzerAtributes.positioning.value = getTrainingPoint(table[42]);

    playerTrainingAnalyzerAtributes.tackling = {};
    playerTrainingAnalyzerAtributes.tackling.name = "Tackling";
    playerTrainingAnalyzerAtributes.tackling.value = getTrainingPoint(table[47]);

    playerTrainingAnalyzerAtributes.marking = {};
    playerTrainingAnalyzerAtributes.marking.name = "Marking";
    playerTrainingAnalyzerAtributes.marking.value = getTrainingPoint(table[52]);

    playerTrainingAnalyzerAtributes.heading = {};
    playerTrainingAnalyzerAtributes.heading.name= "Heading";
    playerTrainingAnalyzerAtributes.heading.value = getTrainingPoint(table[57]);

    playerTrainingAnalyzerAtributes.passing = {};
    playerTrainingAnalyzerAtributes.passing.name = "Passing";
    playerTrainingAnalyzerAtributes.passing.value = getTrainingPoint(table[62]);

    playerTrainingAnalyzerAtributes.creativity = {};
    playerTrainingAnalyzerAtributes.creativity.name = "Creativity";
    playerTrainingAnalyzerAtributes.creativity.value = getTrainingPoint(table[67]);

    playerTrainingAnalyzerAtributes.crossing = {};
    playerTrainingAnalyzerAtributes.crossing.name = "Crossing";
    playerTrainingAnalyzerAtributes.crossing.value = getTrainingPoint(table[72]);

    playerTrainingAnalyzerAtributes.longshots = {}
    playerTrainingAnalyzerAtributes.longshots.name = "Long shots";
    playerTrainingAnalyzerAtributes.longshots.value = getTrainingPoint(table[77]);

    playerTrainingAnalyzerAtributes.dribbling = {};
    playerTrainingAnalyzerAtributes.dribbling.name = "Dribbling";
    playerTrainingAnalyzerAtributes.dribbling.value = getTrainingPoint(table[82]);

    playerTrainingAnalyzerAtributes.firsttouch = {};
    playerTrainingAnalyzerAtributes.firsttouch.name = "First touch";
    playerTrainingAnalyzerAtributes.firsttouch.value = getTrainingPoint(table[87]);

    playerTrainingAnalyzerAtributes.shooting = {};
    playerTrainingAnalyzerAtributes.shooting.name = "Shooting";
    playerTrainingAnalyzerAtributes.shooting.value = getTrainingPoint(table[92]);

    playerTrainingAnalyzerAtributes.speed ={};
    playerTrainingAnalyzerAtributes.speed.name = "Speed";
    playerTrainingAnalyzerAtributes.speed.value = getTrainingPoint(table[97]);

    playerTrainingAnalyzerAtributes.strength = {};
    playerTrainingAnalyzerAtributes.strength.name = "Strength";
    playerTrainingAnalyzerAtributes.strength.value = getTrainingPoint(table[102]);

    return playerTrainingAnalyzerAtributes;
}

function getTrainingPoint(element) {
    return Math.round(parseInt(element.width) * 1.6);
}

function createDugtoolHtml(content, css){
    'use strict';
    var dogtoolContent = document.createElement("div");
    dogtoolContent.className="dogtoolWrapper hide";
    document.body.appendChild(dogtoolContent);
    document.body.appendChild(dogtoolContent);

    // begin display box
    dogtoolContent.innerHTML =
        '<div class="dogtoolContent">' +
           '<p class="dugtooltitle">' +
              '<a target="_blank" href="' + FORUMLINK + '">' + APPNAME + '</a>' +
           '</p>' +
           content +
           '<p class="dugtoolfooter">' +
              '<a target="_blank" href="/clubinfo/none/clubid/65315">Developed by FlyBoy</a>'+
           '</p>'+
           //'<p>'+
              '<form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_blank">' +
                 '<input type="hidden" name="cmd" value="_s-xclick">' +
                 '<input type="hidden" name="hosted_button_id" value="85CT44ERNNPC2">' +
                 '<input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_SM.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!" style="height: 16px;">' +
                 '<img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1">' +
               '</form>' +
           //'</p>'+
        '</div>';

    if(css === undefined){
        css = "";
    }

    addGlobalStyle('.dogtoolWrapper {position: absolute; top: 0px; right: 20px; width: 170px; z-index: 1; text-align: center;} ' +
                   '.dogtoolContent {background-color: #EEEEEE; box-shadow: 0px 0px 20px -5px grey; border-radius: 0px 10px 10px 0px; padding: 5px; width: 170px; position: fixed;} ' +
                   '.dugtooltitle {text-align: center; padding: 4px; font-weight: bold; font-size: 12px; border-radius: 0px 10px 0px 0px;} ' +
                   '.dugtoolfooter {text-align: center; padding: 3px; font-weight: bold; font-size: 8px; border-radius: 0px 0px 10px 0px; margin: 0px;} ' +
                   '.dugtoolfooter a {font-size: 8px;}' +
                   '.hide {display: none;}' + css);
}

function addGlobalStyle(css)
{
    'use strict';
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}