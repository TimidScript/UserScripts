// ==UserScript==
// @name            [TS] deviantART Gallery Pager
// @namespace       TimidScript
// @version         1.0.19.2
// @description     Auto-pager for DeviantArt gallery/favourites. On-top of FireFox, it now works with G-Chrome and Opera. NOW: With sticky paging button switch.
// @author          TimidScript
// @homepageURL     https://github.com/TimidScript
// @copyright       © 2013+ TimidScript, Some Rights Reserved.
// @license         https://github.com/TimidScript/UserScripts/blob/master/license.txt
// @include         *://*.deviantart.com/gallery/*
// @include         *://*.deviantart.com/favourites/*
// @require         https://greasyfork.org/scripts/19967/code/TSL - GM_update.js
// @homeURL         https://greasyfork.org/en/scripts/4682
// @updateURL       https://greasyfork.org/scripts/4682/code/4682.meta.js
// @grant           GM_xmlhttpRequest
// @grant           GM_info
// @grant           GM_getMetadata
// @grant           GM_getValue
// @grant           GM_setValue
// @grant           GM_addStyle
// @grant           GM_deleteValue
// @grant           GM_registerMenuCommand
// @icon            data:image/png;base64,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
// ==/UserScript==

/* License + Copyright Notice
********************************************************************************************
License can be found at: https://github.com/TimidScript/UserScripts/blob/master/license.txt
Below is a copy of the license the may not be up-to-date.

Copyright © TimidScript, Some Rights Reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the
following conditions are met:

1) GPL-3 License is met that does not conflict with the rest of the license (http://www.gnu.org/licenses/gpl-3.0.en.html)
2) This notice must be included
3) Due credits and link to original author's homepage (included in this notice).
4) Notify the original author of redistribution
5) Clear clarification of the License and Notice to the end user
6) Do not upload on OpenUserJS.org or any other site that infringes on this license

TimidScript's Homepages:  GitHub:      https://github.com/TimidScript
                          GreasyFork:  https://greasyfork.org/users/1455
*/
/* Information
**************************************************************************************************
 Version History
------------------------------------
1.0.19 (2016-10-15)
 - Fix for Google Chrome as not longer able to access href property in link element.
1.0.18 (2016-05-27)
 - Altered license
1.0.17 (2016-05-25)
 - Moving to GreasyFork and preparing the removal of files from OUJS
1.0.16 (2016-04-10)
 - updateURL added
1.0.15 (2016-04-03)
 - Changed license to GPL-3
1.0.14
 - Ability to set the scroll offset to allow more pages loaded as you scroll
1.0.13
 - BugFix to support Chrome and Opera. Replaced createHTMLDocument('MPIV') as it only seems to work in FireFox
1.0.12 (2015-02-07)
 - Support https
1.0.11 (2015-06-27)
 - Using URI (base64) for script icon
1.0.10 (2015-05-25)
 - Changed the position of the auto-pager button.
1.0.9 (2015-01-17)
 - Changed the position of the Auto-Pager button and enlarged.
 - Auto-paging button is always enabled now
 - Removed search box from extra pages
 - Bug fix in the way to detect group galleries
 - Bug fix to Auto-Pager button
1.0.8 (2015-01-16)
 - Bug fix to paging as it did not work in high resolution.
 - Paging button added. It saves last setting.
 - Added a setting to update url to the last page loaded. Remove the commenting from: GM_setValue("UpdateURL",1);
1.0.7 (2015-01-09)
 - Big fix due favourites paging due to changes in divantArt site
 - Take into account favourites folders when working out scrollOffsetExtra.
1.0.6 (2015-01-02)
 - At least from Firefox version 34.0.5 window.scrollMaxY value no longer returns the max scrollable document
 value. Replaced it with document.documentElement.scrollHeight.
//From version 34.# of FF scrollMaxY no longer returns
1.0.5 (2014-11-01)
 - Bug fix: Check if comments are present in the gallery
 - Bug fix: Loading icon gets removed now when you change page
1.0.4 (2014-10-31)
 - Fix to support other browsers beside FireFox
1.0.3 (2014-08-29)
 - Added GM_update
1.0.2 (2014-08-19)
 - Cleaned up header for OUJS
1.0.1 (2013-02-27)
 - Initial Release
**************************************************************************************************/
console.info("DeviantScript Gallery Pager");
/************** Variable you can set **************/
//Once set update, run the script once and then force update to allow automatic updating
//GM_setValue("UpdateURL", 1) //Turn on update URL
//GM_deleteValue("UpdateURL") //Turn off update URL
//GM_setValue("ScrollOffset", 500); //The gap between page loading

var scrollOffset = GM_getValue("ScrollOffset", 500);
var addPagination = true; //Adds page divider
var gmi = document.querySelector("#gmi-GZone[gmi-name='top_left']");

var intervalID = 0;
var nextPageURL = null;
var galleryPager = document.getElementById("gallery_pager");
var pagerSwitch;

AddPagerSwitch();
if (GetNextPageURL(document)) intervalID = setInterval(CheckScrollPosition, 200);

var loading = "data:image/gif;base64,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";


function AddPagerSwitch()
{
    var holder = document.createElement("div");
    pagerSwitch = document.createElement("button");
    holder.appendChild(pagerSwitch);
    holder.setAttribute("style", "text-align:center;");

    GM_addStyle(".smbutton-red2 {background:linear-gradient(center top , #ED7968, #EB462D) repeat scroll 0% 0% transparent;"
        + "background: -moz-linear-gradient(center top , #ED7968, #EB462D) repeat scroll 0% 0% transparent;"
        + "background: -webkit-linear-gradient(center top , #ED7968, #EB462D) repeat scroll 0% 0% transparent;"
        + "background: -o-linear-gradient(center top , #ED7968, #EB462D) repeat scroll 0% 0% transparent;}"
        + ".smbutton-red2:hover {background:linear-gradient(center top , #ED9588, #E9604B) repeat scroll 0% 0% transparent;"
        + "background: -moz-linear-gradient(center top , #ED9588, #E9604B) repeat scroll 0% 0% transparent;"
        + "background: -webkit-linear-gradient(center top , #ED9588, #E9604B) repeat scroll 0% 0% transparent;"
        + "background: -o-linear-gradient(center top , #ED9588, #E9604B) repeat scroll 0% 0% transparent;}"
        + ".smbutton-dead, .smbutton-dead:hover  {background:linear-gradient(center top , #A39F9F, #787473) repeat scroll 0% 0% transparent;"
        + "background: -moz-linear-gradient(center top , #A39F9F, #787473) repeat scroll 0% 0% transparent;"
        + "background: -webkit-linear-gradient(center top , #A39F9F, #787473) repeat scroll 0% 0% transparent;"
        + "background: -o-linear-gradient(center top , #A39F9F, #787473) repeat scroll 0% 0% transparent;}"
        + ".pagerbtn {font-size: 14px !important; padding: 2px 50px; margin: 0;}"
        );

    GM_addStyle(".smbutton-red2 {bac}");

    pagerSwitch.textContent = "Auto-Paging";
    pagerSwitch.value = GM_getValue("Paging", 1);
    pagerSwitch.className = (pagerSwitch.value == 1) ? "pagerbtn smbutton smbutton-green" : "pagerbtn smbutton smbutton-red2";

    pagerSwitch.onclick = function ()
    {
        //if (pagerSwitch.value == -1) return;
        if (pagerSwitch.value == 1)
        {
            pagerSwitch.value = 0;
            pagerSwitch.className = "pagerbtn smbutton smbutton-red2";
        }
        else
        {
            pagerSwitch.value = 1;
            pagerSwitch.className = "pagerbtn smbutton smbutton-green";
        }
        GM_setValue("Paging", pagerSwitch.value);
    }

    var holder = document.createElement("div");
    holder.setAttribute("style", "text-align:center;");
    holder.appendChild(pagerSwitch);

    var container = document.querySelector(".folderview-art");
    if (!container) container = document.getElementById("gmi-ResourceStream");
    //.folderview-art > .pagination-wrapper
    if (container)
    {
        container.appendChild(holder);
        container.insertBefore(holder, container.firstElementChild);
    }
}

function CheckScrollPosition()
{
    if (pagerSwitch.value == 0) return;
    var posBottom = getAbsolutePosition(gmi).top + gmi.offsetHeight;
    if (window.innerHeight + window.scrollY > posBottom - scrollOffset)
    {
        GetNextPage();
    }

    function getAbsolutePosition(element)
    {
        var x = 0;
        var y = 0;

        while (element && !isNaN(element.offsetLeft) && !isNaN(element.offsetTop))
        {
            x += element.offsetLeft;
            y += element.offsetTop;
            element = element.offsetParent;
        }
        return { top: y, left: x };
    }
}

function GetNextPageURL(doc)
{
    var next = (doc.querySelector("#gmi-DoubleResourceStream")) ? doc.querySelector(".folderview-art > .pagination-wrapper li.next a.away") : doc.querySelector("#gallery_pager li.next a.away");

    if (next)
    {
        //nextPageURL = next.href; No longer works on google
        nextPageURL = next.getAttribute("href");
        return true;
    }

    pagerSwitch.value = -1;
    //pagerSwitch.className = "smbutton smbutton-dead";
    nextPageURL = null;
    return false;
}

function GetNextPage()
{
    clearInterval(intervalID);

    var div = document.createElement("div");
    div.id = "deviantscript";
    img = document.createElement("img");
    img.src = loading;
    div.appendChild(img);
    document.getElementById("gmi-GPage").appendChild(div);
    w = Math.round(img.clientWidth / 2);
    div.setAttribute("style", "position: fixed; z-index: 999; bottom: 50%; left: 50%; margin: 0 0 0 -" + w + "px;");


    var xhr = new XMLHttpRequest();
    xhr.open("GET", nextPageURL, true);
    //xhr.responseType = "document"; //Causes issues in Opera
    xhr.onload = function (e)
    {
        if (xhr.readyState == 4)
        {
            if (xhr.status == 200)
            {
                //var xdoc = xhr.response; //Causes issues in opera;
                //var xdoc = document.createElement("xml");
                //xdoc.innerHTML = xhr.responseText;

                var xdoc = new DOMParser().parseFromString(xhr.response, "text/html");

                if (xdoc.querySelector("#gmi-DoubleResourceStream")) //Groups
                {
                    gmi.appendChild(xdoc.querySelector("#gmi-GZone[gmi-name='top_left'] #gmi-GMFrame_Gruser").cloneNode(true));
                }
                else
                {
                    //var el = xdoc.querySelector(".gallery-topbar");
                    //console.log(el);
                    //if (el) el.parentElement.removeChild(el);
                    gmi.appendChild(xdoc.querySelector("#gmi-ResourceStream, #gmi-EditableResourceStream").cloneNode(true));
                    if (addPagination) gmi.appendChild(xdoc.getElementsByClassName("pagination")[0].parentElement.cloneNode(true));
                }

                if (GM_getValue("UpdateURL")) window.history.pushState(null, "", xhr.responseURL);
                if (GetNextPageURL(xdoc)) intervalID = setInterval(CheckScrollPosition, 200);
            } else
            {
                console.error(xhr.statusText);
            }
        }
        document.getElementById("deviantscript").parentNode.removeChild(document.getElementById("deviantscript"));
    };
    xhr.onerror = function (e)
    {
        document.getElementById("deviantscript").parentNode.removeChild(document.getElementById("deviantscript"));
        console.error(xhr.statusText);
    };
    xhr.send(null);
}
