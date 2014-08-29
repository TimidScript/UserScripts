// ==UserScript==
// @name                [TS] deviantART DeviationWatch Load All
// @namespace           TimidScript
// @version             1.0.14
// @description         Loads all deviations in Inbox DeviantWatch
// @icon                https://i.imgur.com/1KiUR7g.png
// @author              TimidScript
// @homepageURL         https://openuserjs.org/users/TimidScript
// @copyright           © 2014 TimidScript, All Rights Reserved.
// @license             Creative Commons BY-NC-SA + Please notify me if distributing
// @include             http://www.deviantart.com/messages/*
// @require             https://openuserjs.org/src/libs/TimidScript/TSL_-_GM_Update.js
// @homeURL             https://openuserjs.org/scripts/TimidScript/[TS]_deviantART_DeviationWatch_Load_All
// @grant               GM_xmlhttpRequest
// @grant               GM_info
// @grant               GM_getMetadata
// @grant               GM_getValue
// @grant               GM_setValue
// @grant               GM_deleteValue
// @grant               GM_registerMenuCommand
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
    if (document.getElementsByClassName("alink nav2").length > 0 && (document.URL == "http://www.deviantart.com/messages/#view=deviations" || document.URL == "http://www.deviantart.com/messages/#view=deviations&page=1"))
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
