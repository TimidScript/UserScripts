// ==UserScript==
// @name                [TS] deviantART DeviationWatch Load All
// @namespace           TimidScript
// @version             1.0.17
// @description         Loads all deviations in Inbox DeviantWatch
// @author              TimidScript
// @homepageURL         https://openuserjs.org/users/TimidScript
// @copyright           © 2014 TimidScript, All Rights Reserved.
// @license             Creative Commons BY-NC-SA + Please notify me if distributing
// @include             *://www.deviantart.com/notifications/*
// @require             https://openuserjs.org/src/libs/TimidScript/TSL_-_GM_Update.js
// @homeURL             https://openuserjs.org/scripts/TimidScript/[TS]_deviantART_DeviationWatch_Load_All
// @grant               GM_xmlhttpRequest
// @grant               GM_info
// @grant               GM_getMetadata
// @grant               GM_getValue
// @grant               GM_setValue
// @grant               GM_deleteValue
// @grant               GM_registerMenuCommand
// @icon                data:image/png;base64,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
// ==/UserScript==

/* Information
**************************************************************************************************
Copyright © 2014 TimidScript, All Rights Reserved.
Script's Homepage:              Check homepages below

TimidScript's Homepage:         https://openuserjs.org/users/TimidScript
                                https://greasyfork.org/users/1455-timidscript
                                https://monkeyguts.com/author.php?un=timidscript

                                http://userscripts.org/users/TimidScript
                                http://userscripts-mirror.org/users/100610/scripts


------------------------------------
 Version History
------------------------------------
1.0.17 (2015-07-02)
 - Support https
1.0.16 (2015-06-27)
 - Using URI (base64) for script icon
1.0.15 (2015-06-04)
 - Bug fix to changes in DeviantArt url from "messages" to "notifications".
1.0.14 (2014-08-29)
 - Added GM_update
1.0.13 (2014-08-19)
 - Cleaned up header for OUJS
 - Saved in Unicode
1.0.12 (2013-05-06)
 - Added empty deviations
1.0.11
 - Cleaned up header and comments
 - Changed USO ID
1.0.10
 - Update script to work with new DeviantArt changes
 - Changed userscript URL page due to a spam review and a dead install counter.
 - Changed the name
1.0.9
 - Bug Fix: URL hostname changed from my.deviantart.com to www.deviantart.com
1.0.8  (09-03-2013)
 -Button is not shown if there is only one page.
1.0.7  (07-03-2013)
 -Bug: It seems DeviantArt has stopped the ability to remove thumbnails or hide them. That's
    what's been causing issues since 1.0.3.  New mechanism is made.
 -Replaced the whole code. Made it based on interval checking instead of event listener.
1.0.6
 -Bug: When you click Deviations for the first time and then the "Display all Devations"
    it does not load the last set of thumbnails. Reason is unknown. You can avoid this by clicking
    something from the inbox menu then back to "Deviations", after you press the button all
    deviations will load on the table.
 -Small fix, displays a error log if deviations are not all loaded as error is captured now.
1.0.5 (05-03-2013)
 -Changed the way it gets the thumbnails. It now waits for the nav link bar to be added
    before it tries to load all thumbnails in once go into the table.
 -OffSet is set according to the first time the button pressed. Had a mechanism where it was
    used but decided to remove it. It is still in place for future assurance.
 -Increased the time wait between each load to 1000ms
1.0.3 (26-02-2013)
 -Added 500ms timeout between each page fetch.
 -Added summary box at the bottom.
1.0.2 (25-02-2013)
 -Changed the behaviour. You now need to press the button
    to get a table of all images.
 -No need to set offset. It no longer uses it
 -New Feature: You are able to drag and drop thumbnails to Favourites
 -New Feature: Set hideInbox to true if you wish to hide it when view deviations
**************************************************************************************************
*/

console.info("DeviantScript");
var deviationCount = 0;
var offSet = 0;
var pageCount = 0;
var timeout = 1000; //Timeout between each fetch of Next page.
var intervalIDWait;
var intervalIDCheck;
var hideInbox = false;

var gmi = document.getElementById("gmi-ResourceStream");
var table = document.createElement("table");



CheckURL();
document.addEventListener("DOMSubtreeModified", CheckURL, true);


/*
=========================================================================================================
    Checks URL of document to see if its deviations first page.
=========================================================================================================*/
function CheckURL()
{
    if (document.getElementsByClassName("alink nav2").length > 0 && (document.URL == "http://www.deviantart.com/notifications/#view=deviations" || document.URL == "http://www.deviantart.com/notifications/#view=deviations&page=1"))
    {
        if (!document.getElementById("deviantScriptButton"))
        {
            button = document.createElement("button");
            button.id = "deviantScriptButton"
            button.setAttribute("style", "width: 100%; height: 25px;");
            button.textContent = "Display all Deviations";
            button.onclick = LoadTable;
            gmi = document.getElementById("gmi-ResourceStream");
            gmi.parentNode.insertBefore(button, gmi);
            table.style.height = 0;
            table.innerHTML = "";
        }
    }
    else if (document.getElementById("deviantScriptButton"))
    {
        document.getElementById("deviantScriptButton").parentElement.removeChild(document.getElementById("deviantScriptButton"));
    }
}

/*
=========================================================================================================
    Removes unwanted bars.
=========================================================================================================*/
function RemoveUnwantedBars()
{
    var el = document.getElementById("sidebar-you-know-what");
    if (el) el.parentNode.removeChild(el);

    el = document.getElementById("overhead-you-know-what");
    if (el) el.parentNode.removeChild(el);

    if (hideInbox)
    {
        el = document.getElementsByClassName("f messages-left")[0];
        if (el) el.parentNode.removeChild(el);
    }
}

/*
=========================================================================================================
    Gets deviation count from title div
=========================================================================================================*/
function DeviationsCount()
{
    var titles = document.body.getElementsByClassName("mczone-title");


    for (var i = 0; title = titles[i].textContent, i < titles.length; i++)
    {
        if (title.indexOf("Deviations") > 0)
        {
            return title.match(/^\d+/)[0];
        }
    }

    return -1;
}


/*
=========================================================================================================
    Loads deviations into the table
=========================================================================================================*/
function LoadTable(event)
{
    deviationCount = 0;
    offSet = gmi.getElementsByClassName("mcbox ch mcbox-thumb mcbox-thumb-deviation").length;

    table.setAttribute("style", "width: 100%; height: 100px; padding: 0px 25px 0px 25px");
    table.innerHTML = "";
    gmi.parentNode.insertBefore(table, gmi);
    RemoveUnwantedBars();
    pageCount = 0;
    intervalIDCheck = setInterval(CheckIfImagesAreLoaded, 200);
    //GetThumbnails();
    //GetNextPage();
}


/*
=========================================================================================================
    Imitates mouse click on next
=========================================================================================================*/
var dispatchMouseEvent = function (target, var_args)
{
    var e = document.createEvent("MouseEvents");
    // If you need clientX, clientY, etc., you can call
    // initMouseEvent instead of initEvent
    e.initEvent.apply(e, Array.prototype.slice.call(arguments, 1));
    target.dispatchEvent(e);
};


/*
=========================================================================================================
    Places thumbnail into table
=========================================================================================================*/
function GetThumbnail(thumbnail)
{
    //console.log(thumbnail.getAttribute("marked"));
    if (!thumbnail.getAttribute("marked"))
    {
        thumbnail.setAttribute("marked", "true");
        var d = document.createElement("div");
        d.innerHTML = thumbnail.innerHTML;

        d.setAttribute("style", "width: 210px; display: inline-block; vertical-align:middle; text-align:center; margin-right: 5px; margin-bottom: 5px;");

        table.appendChild(d);
        deviationCount++;
        if (d.className.indexOf("mcbox-thumb-deviation"))
            d.getElementsByClassName("mcb-app")[0].innerHTML = "<strong>" + deviationCount + "</strong>";
    }
}

/*
=========================================================================================================
    Parses through the thumbnails after display deviations button is pressed
=========================================================================================================*/
function GetThumbnails()
{
    var thumbnails = document.querySelectorAll("div.mcbox-thumb-deviation, div.mcbox-thumb-orphaned");
    var errorCount = 0;
    pageCount++;
    for (var i = 0; i < thumbnails.length; i++)
    {
        try
        {
            GetThumbnail(thumbnails[i]);
        }
        catch (err) { errorCount++; console.error(errorCount); }
    }
    if (errorCount > 0) console.error("Failed to add " + errorCount + " thumbnails from page " + pageCount);
}

/*
=========================================================================================================
    Gets next page if any otherwise returns false
=========================================================================================================*/
function GetNextPage()
{
    var next = document.getElementsByClassName("r page");
    //console.log(next);
    if (next.length > 0)
    {
        next = next[0];
        console.log(next.href);
        var evt = document.createEvent("MouseEvents");
        evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        next.dispatchEvent(evt);
        return true;
    }
    return false;
}

function AddSummaryBar()
{
    d = document.createElement("div");
    p = document.createElement("p");
    d.setAttribute("style", "width:100%; text-align:center;  border: outset; background-color: #A6C1C0;");
    d.appendChild(p);
    p.setAttribute("style", "width:100%; text-align:center; ");
    table.appendChild(d);


    if (DeviationsCount() != deviationCount)
        p.innerHTML = "<strong style=\"color:red;\">ERROR: </strong> Only got " + deviationCount + " out of " + DeviationsCount();
    else
        p.textContent = "Got " + deviationCount + " out of " + DeviationsCount();
}

function CheckIfImagesAreLoaded()
{
    var nav = document.getElementsByClassName("alink nav2");
    if (nav && nav.length == 1)
    {
        thumbnails = gmi.getElementsByClassName("mcbox ch mcbox-thumb mcbox-thumb-deviation");
        images = gmi.getElementsByTagName("img");
        if (thumbnails.length <= images.length)
        {
            clearInterval(intervalIDCheck);
            GetThumbnails();
            if (GetNextPage()) intervalIDCheck = setInterval(CheckIfImagesAreLoaded, 200);
            else //Reached last page
            {
                console.log("Hiding GMI as unable to remove thumbnails");
                var thumbnails = gmi.getElementsByClassName("mcbox ch mcbox-thumb mcbox-thumb-deviation");
                for (var i = 0; i < thumbnails.length; i++)
                {
                    thumbnails[i].innerHTML = "";
                }
                AddSummaryBar();
            }
        }
    }
}
