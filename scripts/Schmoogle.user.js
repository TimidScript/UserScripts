// ==UserScript==
// @name            [TS] Schmoogle
// @namespace       TimidScript
// @version         2.1.42
// @description     Dated but most functions work; Google: Fully Customisable Skins (columns, font colors, bgc etc.) | AutoPaging with Lazy Load Support | Remove Tracking/Redirection | URL Cleaner | Quick Search Filter | URL Blacklisting | SSL Search | Multiple Search Services | Quick Links To Google Services | Ad Removal... 
// @icon            http://i.imgur.com/Kvb2Ili.png?1
// @author          TimidScript
// @homepageURL     https://openuserjs.org/users/TimidScript
// @copyright       © 2014 TimidScript, All Rights Reserved.
// @license         Creative Commons BY-NC-SA + Please notify me if distributing
// @include         *//www.google.*
// @include         *//encrypted.google.*
// @require         https://openuserjs.org/src/libs/TimidScript/TSL_-_jsColorGM.js
// @require         https://openuserjs.org/src/libs/TimidScript/TSL_-_Generic.js
// @require         https://openuserjs.org/src/libs/TimidScript/TSL_-_GM_Update.js
// @homeURL         https://openuserjs.org/scripts/TimidScript/[TS]_Schmoogle
// @grant           GM_listValues
// @grant           GM_xmlhttpRequest
// @grant           GM_info
// @grant           GM_getMetadata
// @grant           GM_getValue
// @grant           GM_setValue
// @grant           GM_deleteValue
// @grant           GM_registerMenuCommand
// ==/UserScript==


/* Information
********************************************************************************************
Copyright © 2014 TimidScript, All Rights Reserved.
Script's Homepage:              Check homepages below

TimidScript's Homepage:         https://openuserjs.org/users/TimidScript
                                https://greasyfork.org/users/1455-timidscript
                                https://monkeyguts.com/author.php?un=timidscript
                                
                                http://userscripts.org/users/TimidScript
                                http://userscripts-mirror.org/users/100610/scripts

----------------------------------------------
TODO List
----------------------------------------------
PRIMARY
 - Add Comments
 - Image Search
 - GUI to change Privacy settings
 - GUI to ad removal options
 - Better Skin Tab

SECONDARY
 - Better privacy: Scramble cookies, remove click tracking,
 replaces input box, replace instant search
 - CSS Tab (Add your own and access Schmoogle CSS)
 
BUGS
 - Change Settings Main Tab (Naming) match ContentType bug
 - No longer picking up places content type due to lazy
 loading
 
----------------------------------------------
    Version History
----------------------------------------------
2.1.X (2013/08/07  Complete re-write) 
  Since last release Google has changed a lot of it's html script by changing much of the
layout, removing some features and increase use of Lazy Loading. This has broken the script
in many places so I decided it was about time I rewrite the script to make it more concise 
and remove the broken features. This is a complete rewrite of the script. Please
show your appreciation by becoming a Fan of the script on USO (Userscript.org).
 - Full support of Lazy Loading. Images now work :)
 - Optimised and more powerful script (Concise Coding)
 - Efficient usage of CSS3
 - Better Interface
 - Remove Tracking Functionality
 - URL Cleaner
 - Better formatting according to content
 - More Google customization options and customisable skin
 - Safe Search Option 
 - Much more...
 - FRemoved: Schmoogle Menu (replaced by buttons)
 - FRemoved: GoogleSharing (service has been discontinued)
 - FRemoved: Preview Mode (Google has removed "Google Instant Previews"). 
   Preview locations of places is still available but all handled by Google and 
   not this script.

Image Search
GUI to change Privacy settings
GUI to ad removal options
Maybe better CSS interface
Fix Bug listed in 2.1.40 (Places)
2.1.42 (2014-08-29)
 - Added GM_update
2.1.41
 - Bug Fix: window.scrollMaxY undefined in Google Chrome
 - Bug Fix: Auto-paging in Google Chrome
 - Removal of unwanted grouping header li
 - [d] Bug Fix: Added missing image CSS for auto-page
2.1.40
 - Bug Fix: HTML Styles
 - Bug Fix: Introduced in 2.1.39 a bug by renaming table values. Temporary 
 fix is made. Need to change settings window html accordingly.
 attribute instead of element content in settings window. 
 - Bug: Introduced in 2.1.39. Due to changes in observe, result items with
 lazy loading class names (Places) are not being correctly detected. Will try to
 fix for version 2.1.41.
2.1.39
 - Context Menu Added (Skin, Jump)
 - Major rewrite in the way the first page is added
 - Major changes to the Beautifier object
 - CTinfo has fixed size now.
 - Improved URL cleaner
 - Support for instant search added and also rewrote Observe.callback & Pager.newPage
 - Bug Fix: UK stores navcnt in center_col while COM version does not. There
 is a list of conflicts between Google national services
2.1.38 (Features Added)
 - Pager runs through MutationObserver rather than interval timer
 - Support more topstuff and extra informational content (ongoing endeavour)
 - Minor Changes 
.1.37.BETA (Features Added)
 - Pager Timer Based
 - Minor Changes
2.1.36
 - Removed AutoPager Support (Found GoogleKingKong Lazy Loading Fix)
 - Major functionality changes
2.1.35.ALPHA (Features Added)
 - Major functionality changes
 - URL Cleaner
 - Remove Tracking
2.1.34.ALPHA Complete Rewrite
 - Most features added
 - Capture Changes through timer
 - New Interface
 - CSS Added
 - AutoPager Support

1.1.33
 - Small Changes
 
1.1.32
 - Bug Fix: HashChange pickup
 - Temporary bug fix: live.intervalTB never cleared
 
1.1.31
 - Feature Added: Filter already added it won't add it again.
 - Small Bug Fix: Filter  bug fix for Schmoogle

1.1.30
 - Small Bug Fix: Content of type moreLinks transparent setting was not being set.

1.1.29
 - With the introduction of Font colours, the skin window uses last loaded saved font colours. This
 replaces this behaviour by providing a default font colours if one does not exist. 
(Uses default on GM_getValue).

1.1.28
 - Bug Fix: Bug fixes to version 1.1.27 forget to take into account the way 
 colourizetable works

1.1.27
 - Added ability to change font colours
 - Added ability to change body background colour
 -
1.1.26
 - GUI Fix: InfoTab causes horizontal scrollbar.

1.1.25
 - Bug Fix: Search Filter in Schmoogle sometimes has Google redirection prefix. 
 - Added Feature: You can remove blacklist from the mini-form now. 

1.1.24
 - TBug Fix: When you add the Schmoogle menu too fast Google removes it. I thought I fixed
 the issue in latest release but failed. Try to add the menu twice. Temporary fix of adding
 AddGoogleToolbarButtons at the end of GoogleUpdate
 - Graphic Fix: Change the Preview eye style from relative to absolute and placed it to 
 the right.

1.1.23
 - Bug Fix: Unknown Content settings are not being saved from the "Main Settings" window
 - Bug Fix: If you check remove video content and there are more video links of type 
 "moreLinks" (video) an error use to occur.
 - GoogleSharing now has its own column storage
 - oldFormat checking is removed as only GoogleSharing has old google format
 - Default Values Changes: Unknown Content items take a whole row. 

1.1.22
 - GoogleSharing Bug Fix: Spelling correction appears at the top now 
 - Replaced setInterval with setTimout. LoadWaitPeriod() removed

1.1.21
 - Bug Fix: OnMouseOut changed to OnMouseLeave

1.1.20
 - Few changes to the Schmoogle Menu (Width, Order, Location).
 - Removed Beta Status

0.1.19
 - Bug Fix: Removed GM_info as Scriptish does not support it. 

0.1.18 Initial Early Beta Release
 - Added basic comments
 - Renaming functions and variables and cleaned up the code a little. 
 - Changed some default setting's values.
 - Uses version meta data to check settings. 
 - Bug Fix: GoogleSharing #rhs element is null and not checked

0.1.17 (3/03/2013) Initial Early Beta Release
 - Feature: Hidden RHS: Removed WindowResized. Fixes issues with table width.
      Now RHS panel can be accessed through vertical tab. 
 - Feature: Skins Settings Window
 - Feature: Dynamic Skins Menu
 - Feature: Main Settings Window + Lots of options
 - Feature: Blacklist Settings Window    
 - BUG!!! Still unable to fix autopaging error 

0.1.13 (24/02/2013)
 - Code Structure stabilized.
 - Implemented that coding the enables colour scheme changing with a single call.     
 - Storing most of the settings. Blacklisting is still temporary.
 - Partial functioning menu. CSS for menu has some noticeable cosmetic issues.     
 - AddGoogleToolbarButtons now executes GoogleUpdates if Mutation does not catch
      changes in time.
 - Better support for GoogleSharing. 
 - Blacklisting temporary state enabled. Permanent blacklisting and settings window
      yet to by implemented

0.1.12 
 - Restructured much of the code, using different approach in handling events and
      implementation of new interface using themes. 
 - Added blacklisted buttons.
 - Added "Similar" and "Cached" options

0.0.10 (18/02/2013)
 - Major changes to GUI.
 - Questionable fix for content width bug (useless)          
       
0.0.5
 - Added filtering
 - Auto-paging removed due to incomplete images. Possible fix is simulate a click on Google Next.

0.0.2
 - Fixed most of the sync issues
 - Changed layout
 - Multi-column support added
 - Partial support for GoogleSharing. GoogleSharing removes important ids from result and does
    slight reformatting.
 - Auto-paging added
 
0.0.1 (13/02/2013)
 - Initial release
********************************************************************************************/
console.info("Schmoogling Google");

/********************************************************************************************/
/*
---------------------------------------
 Variable You Can Change (VYCH)
---------------------------------------*/


/*
---------------------------------------
 Do not touch
---------------------------------------*/

var SEARCHTYPES = "unknown webSearch imageSearch videoSearch newsSearch blogSearch discussionSearch placesSearch bookSearch appSearch patentSearch recipeSearch";
var SearchTypes = new (makeStruct(SEARCHTYPES))();
var SearchType = GetSearchType();

var CONTENTTYPES = makeStruct("info images videos news places unknown standard moreLinks");
var ContentTypes = new CONTENTTYPES();

var rsoRemoved = false;
var Counter = 0;
var StartPage = 1;
var PageCount = 0;
var ResultItemCounter = 0;
var ResultItems = document.createElement("div");
/********************************************************************************************/

//#region Global Functions ---------------------------------------------------------------------
//For Google Chrome
//if (typeof window.scrollMaxY !== "number")
//{
//    Object.defineProperties(window, "scrollMaxY",
//            {
//                get: function () { return document.documentElement.scrollHeight - document.documentElement.clientHeight; },
//                //set : function(newValue){ bValue = newValue; },
//                enumerable: true,
//                configurable: true
//            });
//};

String.prototype.lPad = function (padString, length)
{
    var str = this;
    while (str.length < length)
        str = padString + str;
    return str;
}

function FindStringInArray(arr, str)
{
    var s2 = str.toLowerCase();
    for (var i = 0; i < arr.length; i++)
    {
        if (arr[i].toLowerCase() == s2) return i;
    }

    return -1;
}

/*
=================================================================================================
 Possible flag values for extra type of checking:
 2: start match
 4: contained match
 8: end match
 Always checks for exact match
 
=================================================================================================*/
function MatchArrayStringToString(arr, str, flag, prefix)
{
    if (!flag) flag = 2;

    var s1 = str.toLowerCase();


    for (var i = 0; i < arr.length; i++)
    {
        s2 = arr[i].toLowerCase();

        if (s1 == s2) return i;
        if (prefix) s2 = prefix + s2;

        var pos = s1.indexOf(s2);
        if (2 & flag && pos == 0) return i;
        else if (4 & flag && pos >= 0) return i;
        else if (8 & flag && pos > 0 && (pos + s2.length) == s1.length) return i;
    }

    return -1;
}

/*
=================================================================================================
 Tries to get domain name from hostname. Hit and miss with this. But in most cases it's a hit.
=================================================================================================*/
function GetDomain(hostname)
{
    if (hostname.toLowerCase().indexOf("www") == 0) return hostname.substring(4);
    else
    {
        //SLD = [co, ltd, net, org, plc, sch, ac, gov, mod, nhs, police] //Second level domains        
        return hostname.match(/\w+\.\w+$|\w+\.(co|ltd|org|gov|ac|nhs|ac)\.\w+$/i)[0];
    }
}


function makeStruct(names)
{
    var names = names.split(' ');
    var count = names.length;
    function constructor()
    {
        for (var i = 0; i < count; i++)
        {
            this[names[i]] = names[i];
        }
    }
    return constructor;
}


function IsNull(obj)
{
    return (obj === null);
}

function removeNode(node)
{
    if (typeof node == "string") node = document.getElementById(node);
    if (!IsNull(node) && node.parentNode) node.parentNode.removeChild(node);
}

function GetSearchType()
{
    SearchType = SearchTypes.unknown;

    var url = document.URL;
    if (!(url.match(/(&|\?)tbm=/)) && url.match(/(&|\?|#)q=/) && url != "http://www.google.com/blank.html") SearchType = SearchTypes.webSearch;
    else
    {
        //Use match statement as sometimes you have history in URL and thus contain
        //more than one tbm and we try to capture last one only.
        var m = url.match(/(&|\?)tbm=([a-z]+)/i);
        if (!m) return SearchTypes.unknown;
        m = m[m.length - 1].replace(/(&|\?)tbm=/i, "");
        switch (m)
        {
            case "vid":
                SearchType = SearchTypes.videoSearch;
                break;
            case "nws":
                SearchType = SearchTypes.newsSearch;
                break;
            case "blg":
                SearchType = SearchTypes.blogSearch;
                break;
            case "dsc":
                SearchType = SearchTypes.discussionSearch;
                break;
            case "plcs":
                SearchType = SearchTypes.placesSearch;
                break;
            case "bks":
                SearchType = SearchTypes.bookSearch;
                break;
            case "pts":
                SearchType = SearchTypes.patentSearch;
                break;
            case "app":
                SearchType = SearchTypes.appSearch;
                break;
            case "rcp":
                SearchType = SearchTypes.recipeSearch;
                break;
            case "isch": //Image Search
                SearchType = SearchTypes.imageSearch;
                break;
            case "shop": //Shopping                            
                break;
        }
    }

    return SearchType;
};


function AddHTMLElement(htmlCode)
{
    var temp = document.createElement("div");
    temp.innerHTML = htmlCode;
    return temp.firstElementChild;
}


function AddStyle(id, script)
{
    var style = document.createElement("style");
    style.type = "text/css";
    if (id)
    {
        style.id = id;
        removeNode(id);
    }
    style.innerHTML = script;

    document.head.appendChild(style);
}

//#endregion ----------------------------------------

var Settings =
{
    VersionCheck: function (current)
    {
        var saved = GM_getValue("Version", "0");

        if (saved != "0" && saved != current) alert("Some Schmoogle settings will be reset due to major changes in the update.");

        saved = saved.split(".");
        currentA = current.split(".");
        //Remove defunct settings        
        if (saved[0] != currentA[0])
        {
            var names = GM_listValues();
            for (var i = 0; name = names[i], i < names.length; i++)
            {
                var skipNames = ["[SKIN]", "USO-Updater", "BLH", "BLD"];
                var found = false;
                for (var j = 0; j < skipNames.length; j++) found = found || (name.indexOf(skipNames[j]) == 0);
                if (!found) GM_deleteValue(name);
            }
        }

        //Remove skins
        if (saved[1] != currentA[1])
        {
            var names = GM_listValues();
            for (var i = 0; name = names[i], i < names.length; i++)
            {
                var found = false;

                if (name.indexOf("[SKIN]") == 0) GM_deleteValue(name);
            }

            GM_setValue("[SKIN] 0", "Default|B8FF8F,5EFF79,D4ECFF,ADADAD,666666,E3E3E3|122,FFFFFF,21FF3F,1453FF,5E5C5C,FFFF85,FF0000|6|0,000000,BCBCBB,FFA500,FF4500|2,0000FF,800080,000000,008000");
            GM_setValue("[SKIN] 1", "Nature|703700,A85600,D9A773,ADADAD,666666,E3E3E3|126,FFFFFF,D5FFB0,74A7E0,49698C,545454,D1EAFF|2|2,000000,FFFFFF,FF8800,FFFF00|2,944200,45BF11,000000,6DFF24");
            GM_setValue("[SKIN] 2", "Forest|115421,0C9656,733300,ADADAD,666666,E3E3E3|2,FFFFFF,2B2B2B,474747,A6A6A6,545454,ABB3C9|2|2,522801,FFFFFF,FF8800,FFFF00|2,02FF14,361800,4A9400,FF8800");
            GM_setValue("[SKIN] 3", "Going Green|4E6E3F,0B854C,0B730B,ADADAD,666666,E3E3E3|62,FFFFFF,01541D,6EFFA3,000000,FFFF00,ABB3C9|206|2,0B9114,FFFFFF,FF8800,FFFF00|2,02FF14,652D00,000000,FF8800");
            GM_setValue("[SKIN] 4", "Black & Blue|454545,333333,FFFFFF,ADADAD,666666,E3E3E3|30,FFFFFF,000000,00063D,04022E,545454,ABB3C9|154|2,000000,FFFFFF,FF8800,FFFF00|2,12B8FF,382EBF,A3A3A3,FFFF00");
            GM_setValue("[SKIN] 5", "White Orange|FFE561,FFC48A,FFFFFF,ADADAD,666666,E3E3E3|126,FFFFFF,FFAA2B,1453FF,5E5C5C,FFFF85,FF0000|6|2,FFFFFF,8C8C8C,FFA500,FF4500|2,0000FF,800080,000000,008000");
        }


        GM_setValue("Version", current);
    },

    GetPostfix: function ()
    {
        return " " + FindStringInArray(SEARCHTYPES.split(" "), SearchType).toString().lPad("0", 2) + ": ";
    },


    Load: function ()
    {
        Settings.VersionCheck("125.125");

        // ------------ Loading General Settings (Cross all pages)
        var vals = GM_getValue("General", "500,1500|126,6,0,0,2|6").split("|"); //14



        vals[0] = vals[0].split(",");
        Settings.paging = new Object();
        Settings.paging.offset = parseInt(vals[0][0]);
        Settings.paging.interval = parseInt(vals[0][1]);

        vals = vals[1].split(",");
        Settings.result = new Object();
        Settings.result.number = vals[0];
        Settings.result.wholerow = vals[1];
        Settings.result.remove = vals[2];
        Settings.result.group = vals[3];
        Settings.result.groupSize = vals[4];

        var flag = parseInt(vals[2]);
        Settings.removeTracking = (flag & 2);
        Settings.cleanURLs = (flag & 4);
        Settings.cookieScramble = (flag & 8);
        Settings.replaceSearchBox = (flag & 16);

        // ------------ Blacklist Settings
        if (!Settings.blacklist) //Does not get reset on refresh
        {
            Settings.blacklist = new Object();
            Settings.blacklist.sessionH = new Array();
            Settings.blacklist.sessionD = new Array();
        }
        Settings.blacklist.permanentH = new Array();
        Settings.blacklist.permanentD = new Array();

        vals = GM_getValue("BLH", "");
        if (vals) Settings.blacklist.permanentH = vals.split(",");
        vals = GM_getValue("BLD", "");
        if (vals) Settings.blacklist.permanentD = vals.split(",");

        // ------------ Loading Search Type Specific Settings


        vals = GM_getValue("Generic" + Settings.GetPostfix(), "0,1,4").split(",");
        flag = parseInt(vals[2]);
        Settings.columns = parseInt(vals[1]);
        Settings.paging.enabled = (flag & 2);
        Settings.blacklist.enabled = (flag & 4);
        Settings.pacify = (flag & 8);
        Settings.skin = Settings.GetSkin(vals[0]);
    },

    GetSkin: function (id)
    {
        var vals = GM_getValue("[SKIN] " + id, null);

        if (vals) vals = vals.split("|");
        else
        {
            return Settings.GetSkin(0);
        }

        var skin = new Object();
        skin.id = id;
        skin.name = vals[0];
        skin.general = vals[1].split(",");
        skin.border = vals[2].split(",");
        skin.transparency = vals[3].split(",");
        skin.bgc = vals[4].split(",");
        skin.font = vals[5].split(",");

        return skin;
    },

    Save: function ()
    {
        var flag = (Settings.removeTracking ? 2 : 0) + (Settings.cleanURLs ? 4 : 0) +
                (Settings.cookieScramble ? 8 : 0) + (Settings.replaceSearchBox ? 16 : 0);

        GM_setValue("General", Settings.paging.offset + "," + Settings.paging.interval + "|" + [Settings.result.number, Settings.result.wholerow, Settings.result.remove, Settings.result.group, Settings.result.groupSize].toString() + "|" + flag); //14

        flag = ((Settings.paging.enabled) ? 2 : 0) + ((Settings.blacklist.enabled) ? 4 : 0) + ((Settings.pacify) ? 8 : 0);
        GM_setValue("Generic" + Settings.GetPostfix(), Settings.skin.id + "," + Settings.columns + "," + flag);

        GM_setValue("BLH", Settings.blacklist.permanentH.toString());
        GM_setValue("BLD", Settings.blacklist.permanentD.toString());

        Settings.SaveSkin();
    },

    BoolToString: function (val)
    {
        return (val) ? 1 : 0;
    },

    SaveSkin: function ()
    {
        var s = Settings.skin;
        GM_setValue("[SKIN] " + s.id, s.name + "|" + s.general.toString() + "|" + s.border.toString() + "|" + s.transparency + "|" + s.bgc.toString() + "|" + s.font.toString());
    },

    DeleteSkin: function ()
    {
        GM_deleteValue("[SKIN] " + Settings.skin.id);
        Settings.skin = Settings.GetSkin(0); //Loads default skin
    },

    CompareSkins: function (a, b)
    {
        if (a.name == "Default") return -1;
        if (b.name == "Default") return 1;

        if (a.name < b.name) return -1;
        if (b.name < a.name) return 1;
        return 0;
    },

    GetSkinNames: function ()
    {
        var names = GM_listValues();

        var skins = new Array();

        for (var i = 0; name = names[i], i < names.length; i++)
        {
            if (name.indexOf("[SKIN] ") == 0)
            {
                var s = new Object();
                s.id = name.substring(7);
                s.name = Settings.GetSkin(s.id).name;
                skins.push(s);
            }
        }

        skins.sort(Settings.CompareSkins);
        return skins
    }

};


var Observe =
{
    bodyChanges: function ()
    {
        var mo = window.MutationObserver || window.MozMutationObserver || window.WebKitMutationObserver;

        if (mo)
        {
            Observe.observer = new mo(Observe.callback);
            Observe.observer.observe(document.body, { childList: true, subtree: true });
        }
    },

    callback: function (mutations)
    {

        GetSearchType();
        if (SearchType == SearchTypes.unknown)
        {
            clearTimeout(Observe.intervalID);
            clearInterval(Pager.intervalID);
        }
        else if (SearchType == SearchTypes.imageSearch)
        {
            console.warn("Images Search not yet implemented");
        }
        else
        {
            var rso = document.getElementById("rso");
            if (rso && !rso.getAttribute("parsing"))
            {
                rso.setAttribute("parsing", true);
                Observe.URL = document.URL;
                Pager.newPage();
                Pager.paused = true;

                MenuHQ.highlight(); //Safe search can be swapped without reloading full page.
            }

            Privacy.removeTracking(document);


            if (rso && rso.outerHTML.length != Observe.rsoLength)
            {
                Observe.rsoLength = rso.outerHTML.length;

                clearTimeout(Observe.intervalID);
                clearInterval(Pager.intervalID);

                Beautifier.addDocumentContent(document, false);
                Beautifier.removeAdvertNodes();
                InfoTab.AddRHSTab();
                rso.style.display = "none";

                //TODO: No need to this interval deletion but leave it for now.
                Observe.intervalID = setTimeout(function ()
                {
                    Pager.paused = false;
                    removeNode("rso"); //Can't remove it as it is still being used in the UK version. Stores navcnt there
                    if (Settings.paging.enabled && document.getElementById("pnnext")) Pager.intervalID = setInterval(Pager.loadNextPage, 250);

                    InfoTab.AddRHSTab(); //capture RHS if not captures. Issue with instant search
                }, 2000); // 5 second wait

                //document.getElementById("center_col").style.display = "none"; //Used by UK version. navcnt is stored there
            }
        }
    }
};

var Pager =
{
    newPage: function ()
    {
        console.info("New Page");
        Settings.Load();
        Pager.paused = true;
        PageCount = 0;
        Counter = 0;
        ResultItemCounter = 0;

        ResultItems.innerHTML = "";
        removeNode("ResultTable");

        Beautifier.addFixedStyles();
        Beautifier.addDynamicStyles();
        MenuHQ.addQuickMenu();
        if (document.getElementById("navcnt")) Privacy.cleanLinks(document.getElementById("navcnt"));

        var cur = document.evaluate('//div[@id="navcnt"]//td[@class="cur"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        StartPage = (cur) ? parseInt(cur.textContent) : 1;
    },


    loadNextPage: function ()
    {
        var scrolledLow;
        if (typeof window.scrollMaxY !== "number")
            scrolledLow = (document.documentElement.scrollHeight - document.documentElement.clientHeight - window.scrollY) < Settings.paging.offset
        else scrolledLow = (window.scrollMaxY - window.scrollY) < Settings.paging.offset;

        if (!(Settings.paging.enabled && !Pager.paused && scrolledLow)) return;

        var url = document.URL;
        clearInterval(Pager.intervalID);
        console.log(url);
        Pager.nextPageURL = document.getElementById("pnnext").href;


        var xhr = new XMLHttpRequest();
        xhr.open("GET", Pager.nextPageURL, true);
        xhr.responseType = "document";
        xhr.onload = function (e)
        {
            if (url != document.URL) return; //New document has been loaded. Should avoid adding next page            
            /* Chrome does not like this method of getting document
            if (xhr.readyState == 4 && xhr.status == 200) 
            {
                var xdt = document.implementation.createDocumentType("html", "-//W3C//DTD HTML 4.01 Transitional//EN", "http://www.w3.org/TR/html4/loose.dtd");
                var doc = document.implementation.createDocument("", "", xdt);
                var elHtml = doc.createElement("html");

                elHtml.innerHTML = xhr.responseText;
                doc.appendChild(elHtml);

                Pager.parseDocument(xhr.responseText);
            }
            */
            if (xhr.readyState == 4 && xhr.status == 200) Pager.parseDocument(xhr.response);

            else console.error(xhr.statusText);
        };
        xhr.send();
        //console.log(navigator.userAgent.match(/chrome/i));
    },

    parseDocument: function (doc)
    {


        //Remove existing image ids just in case of duplicates
        var imgs = document.evaluate(".//img[contains(@id,'vidthumb')]|.//img[contains(@id,'apthumb')]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        for (i = 0; img = imgs.snapshotItem(i), i < imgs.snapshotLength; i++) img.removeAttribute('id');

        Privacy.removeTracking(doc);
        Beautifier.addDocumentContent(doc, false); //Add document content

        // ------- Handles Lazy Loading Images. Code is based on GoogleKingKongR script
        var scripts = doc.evaluate(".//div[@id='xfoot']/script", doc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        if (!scripts) scripts = doc.evaluate("./script", doc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

        for (i = 0; scripts && i < (scripts.snapshotLength) ; i++)
        {
            var scr = scripts.snapshotItem(i) && scripts.snapshotItem(i).innerHTML;
            if (scr.indexOf('thumb') != -1) eval(scr);
        }

        //Replace navigation panel
        var nav = doc.getElementById("navcnt");
        if (nav)
        {
            Privacy.cleanLinks(nav);
            document.getElementById("navcnt").outerHTML = nav.outerHTML;
            setTimeout(function () { if (Settings.paging.enabled) Pager.intervalID = setInterval(Pager.loadNextPage, 250); }, Settings.paging.interval);
        }
        else removeNode("navcnt");
    }
};


var Beautifier =
{
    addFixedStyles: function ()
    {
        AddStyle("SchmoogleContainer", "#schmoogleContainer {margin: 0px 25px 0px 25px;width: auto; }");
        AddStyle("AlterWidth", '.mw{ width:100%; max-width: 100% !important;}');
        AddStyle("SchmoogleFixed", '#QuickMenu{z-index: 1000;position: fixed;top: 150px;left: 2px;}#QuickMenu ul{margin: 0;padding: 0;list-style-type: none;text-align: center;word-wrap: break-word;}#QuickMenu input{font-size: x-small;padding: 0px;margin: 0px;background-color: lightgrey;min-width: 20px;}#QuickMenu input:single-button{font-size: x-small;border-radius: 4px;padding: 0px;margin: 0px;}#QuickMenu hr{margin: 2px 0;}.resultTable{max-width: 100% !important;}.resultTable > tbody > tr > td{border-radius: 3px;padding: 5px;vertical-align: top;}.CTShared *{word-break: break-all;white-space: normal;}.CTShared > li, .CTinfo > li{margin: 0 !important;list-style-type: none;padding: 10px;border-radius: 3px;}.CTinfo > li{background-color: white !important;}.milkyButton{text-decoration: none;color: #555 !important;background-color: #fcfcfc;font-family: sans-serif;font-size: 0.85em;margin: auto 2px;border: 1px solid #ccc;border-radius: 4px;padding: 2px 3px;background-position: center center;background-repeat: no-repeat;}.milkyButton:hover{color: #000;background: #ff8;background-position: center center;background-repeat: no-repeat;}#schmoogleInfoTab{z-index: 1000;position: absolute;top: 250px;right: 0px;border-style: ridge;padding: 5px 0 0 0;background-color: gray;background-color: lightgray;}#schmoogleInfoTab.itSelected{background-color: lime;border-color: yellow;}#schmoogleInfoTab:hover{background-color: yellow;border-color: lime;}.buttonsPanel{padding-top: 5px;}.buttonsPanel > span{text-align: center;vertical-align: middle;display: table-cell;margin: 0px;padding: 0px;}.contextMenu{position: fixed;list-style-type: none;border: solid lightgray;background-color: #F5F1F1;margin: 0;left: 30px;z-index: 500;color: black;}.contextMenu a, .contextMenu a:visited{padding: 8px 15px 8px 5px;display: inline-block;text-decoration: none;color: black;}.contextMenu li:hover{background-color: #D3D3D3;}.contextMenu hr{padding: 0;margin: 0;}');
        AddStyle("MissingImageStyles", ".birrg {font-size: 13px;overflow: hidden;}.rg_ul {white-space: normal;}.img-kc-m, .bi-io {}.bili {display: inline-block;margin: 0 6px 6px 0;overflow: hidden;position: relative;vertical-align: top;}.bicc {line-height: 0;overflow: hidden;position: relative;}.kno-cdta .kno-ibrg._Dl._Pj .img-brk {visibility: inherit;}.kno-cdta .kno-ibrg._Dl._Pj .img-brk {visibility: inherit;}.kno-cdta.xpdclose .kno-ibrg._Dl {max-height: inherit;}.kno-cdta ._pf {display: none;}.kno-mrg .kno-ibrg {float: left;}.kno-mrg-hnm .kno-ibrg {float: inherit;}.kno-mrg-hnm .kno-ibrg {display: block;}#iur .kno-ibrg {display: block;}.img-brk {display: block;overflow: hidden;}.bili .rg_meta {display: none;}");

        //Alteration of Google stlyes
        //TODO: Removed alteration of existing styles. Also removed margin:0 from vk_c as it breaks some items. 
        AddStyle("RHSSTyle", "#rhs {background-color:white;z-index: 20;}");
        AddStyle("AlterGoogle", ".CTinfo .vk_c{margin-left: 0 !important; margin-right: 0 !important;}");
        //AddStyle("AlterGoogle", ".vk_c{color:black;}.vk_c a{color:blue !important;}.vk_c a:visited{color:purple !important;}");                        
    },

    addDynamicStyles: function ()
    {
        removeNode("CSSMain");
        //CSSMain              
        var css = ".resultTable > tbody > tr:nth-child(odd) > td:nth-child(odd){background-color: F2;}.resultTable > tbody > tr:nth-child(odd) > td:nth-child(even){background-color: F4;}.resultTable > tbody > tr:nth-child(even) > td:nth-child(odd){background-color: F4;}.resultTable > tbody > tr:nth-child(even) > td:nth-child(even){background-color: F2;}.resultTable > tbody > tr > td > li{background-color: F8;}.permanentBan, .sessionBan{color: F64;padding: 5px 20px !important;}.permanentBan > div > h3, .permanentBan > div > h3{color: F64;}.sessionBan{background-color: F16;}.permanentBan{background-color: F32;}";
        for (var i = 0; i < Settings.skin.general.length; i++)
        {
            css = css.replace(new RegExp("F" + Math.pow(2, i + 1) + ";", "g"), "#" + Settings.skin.general[i] + ((i > 2) ? " !important;" : ";"));
        }
        AddStyle("CSSMain", css);

        removeNode("CSSBGC");
        removeNode("CSSFont");
        removeNode("CSSSpecific");

        //CSSBGC
        if (Settings.skin.bgc[0] > 0)
        {
            var css = "#main, #topbar, #hdtbSum, #appbar, #hdtbMenus{background-color: F2;}.hdtb_mitem a, #hdtb_more, #hdtb_tls, #appbar div, .hdtb-mn-cont div{color: F4;}.hdtb_mitem a:hover, #hdtb_more:hover, .hdtb_msel:hover, .hdtb-mn-cont div:hover{color: F8;border-color: F8;}#hdtb_tls:hover{color: #000 !important;}#hdtb_more_mn a{color: #808080 !important;}#hdtb_tls.hdtb-tl-sel{color: #000 !important;}.hdtb_msel{color: F16;border-color: F16;}";
            for (var i = 1; i < Settings.skin.bgc.length; i++)
            {
                css = css.replace(new RegExp("F" + Math.pow(2, i) + ";", "g"), "#" + Settings.skin.bgc[i] + " !important;");
            }
            AddStyle("CSSBGC", css);
        }

        //CSSFont
        if (Settings.skin.font[0] > 0)
        {
            var css = ".resultTable, .resultTable div{color: F8;}.resultTable a, .resultTable a.fl {color: F2;}.resultTable a:visited{color: F4;}.resultTable cite{color: F16;}";
            for (var i = 1; i < Settings.skin.font.length; i++)
            {
                css = css.replace(new RegExp("F" + Math.pow(2, i) + ";", "g"), "#" + Settings.skin.font[i] + ";");
            }
            AddStyle("CSSFont", css);
        }

        //CSSSpecific
        css = "";
        var ct = "unused info images videos news places unknown standard".split(" "); //Must imitate ContentTypes
        if (Settings.skin.border[0] > 0)
        {
            for (var i = 1; i < Settings.skin.border.length; i++)
            {
                if (Math.pow(2, i) & Settings.skin.border[0])
                {
                    css += ".CT" + ct[i] + " {background-color:#" + Settings.skin.border[i] + " !important;}";
                }
            }
        }

        if (Settings.skin.transparency > 0)
        {
            //document "skinBorderTran"
            for (var i = 1; i < ct.length; i++)
            {
                if (Math.pow(2, i) & Settings.skin.transparency)
                {
                    css += ".CT" + ct[i] + " > li{background-color:transparent !important;}";
                }
            }
        }
        if (css.length > 0) AddStyle("CSSSpecific", css);
    },

    addCell: function (el, type, clone, fixedSize)
    {
        if (el.clientWidth > 50 && (type == ContentTypes.info || fixedSize))
        {
            el.style.width = el.clientWidth + "px";
            el.style.height = el.clientHeight + "px";
        }

        var cell = document.createElement("td");
        cell.setAttribute("index", ResultItemCounter++);
        ResultItems.appendChild(cell);

        cell.setAttribute("contentType", type);
        cell.className = "CT" + type + ((type != ContentTypes.info) ? " CTShared" : "");

        cell.setAttribute("name", "resultItem");
        cell.setAttribute("PageNumber", PageCount);


        if (el.tagName != "LI")
        {
            li = document.createElement("li");
            cell.appendChild(li);
            if (clone) li.appendChild(el.cloneNode(true))
            else li.appendChild(el);
        }
        if (clone) cell.appendChild(el.cloneNode(true));
        else cell.appendChild(el);

        return cell;
    },


    addDocumentContent: function (doc, clone)
    {
        PageCount++;
        console.log("AddDocuments");

        var el = document.evaluate("//div[@id='res']//div[@id='topstuff']//div[contains(@class,'vk_c')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        if (el) Beautifier.addCell(document.getElementById("topstuff"), ContentTypes.info, clone, true);

        el = document.evaluate("//div[@class='med']/p[@class='sp_cnt']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        if (el) Beautifier.addCell(el, ContentTypes.info, clone, true, false);

        Beautifier.parseRSOListItems(doc.getElementById("rso"), clone);
        Beautifier.addCellsToTable();
    },

    parseRSOListItems: function (rso, clone)
    {
        var lis = rso.children;
        var i = 0;
        while (lis.length > 0 && i < lis.length)
        {
            var li;
            if (clone) li = lis[i++]
            else li = lis[0];

            var type = Beautifier.getContentType(li);
            if (li.tagName == "LI")
            {
                var unwantedClasses = ["mas-sc-row"];
                for (var j = 0; j < unwantedClasses.length; j++)
                {
                    var els = li.getElementsByClassName("mas-sc-row");
                    for (var n = 0; n < els.length; n++) els[n].className = els[n].className.replace("mas-sc-row", "");
                }

                var type = Beautifier.getContentType(li);
                if (!type) removeNode(li);
                else if (type == ContentTypes.moreLinks && ResultItems.lastElementChild)
                {
                    li.style.marginTop = "2px";
                    li.style.padding = "10px";
                    if (clone) ResultItems.lastElementChild.appendChild(li.cloneNode(true));
                    else ResultItems.lastElementChild.appendChild(li);
                }
                else
                {
                    var cell = Beautifier.addCell(li, type, clone, false);
                    if (type != ContentTypes.info) Beautifier.addButtons(cell);
                }
            }
            else if (li.tagName == "DIV") //Since April (2013) Google has included result in grouping inside a DIV
            {
                Beautifier.parseRSOListItems(li);
                if (!clone)
                {
                    console.warn("Removing grouping div");
                    console.log(li);
                    console.log(li.innerHTML);
                    removeNode(li); //remove it no matter what is left
                }
            }
            else if (!clone)
            {
                console.error("List items not captured! Removing it.");
                console.log(li);
                console.log(li.innerHTML);
                removeNode(li);
            }
            else console.error("Cloned item not captured!");
        }
    },


    typeFilter: function (type, flag, minus)
    {
        if (isNaN(minus)) minus = 0;

        var ct = "info images videos news places unknown standard".split(" ");
        var pos = FindStringInArray(ct, type) - minus + 1;

        return (pos > 0 && (Math.pow(2, pos) & flag));
    },

    addCellNumber: function (cell)
    {
        var type = Beautifier.getContentType(cell);

        if (type != ContentTypes.standard && !Beautifier.typeFilter(type, Settings.result.number)) return;

        var position = cell.getElementsByClassName("ItemPos")[0];
        if (!position)
        {
            var h3 = cell.getElementsByTagName("h3")[0];
            if (h3)
            {
                position = document.createElement("strong");
                position.className = "ItemPos";
                h3.insertBefore(position, h3.firstElementChild);
            }
        }

        if (position) position.textContent = ++Counter + " ";
    },

    createBlacklistCell: function (cell, row, isSessionBan)
    {
        var cellBL = document.createElement("td");

        var evaluator = new XPathEvaluator();
        if (cell.getAttribute("name") == "resultItem")
        {
            cellBL.innerHTML = "<div><h3>" + cell.getElementsByTagName("h3")[0].firstElementChild.innerHTML + "</h3></div>";
        }
        else
        {
            var nodesSnapshot = evaluator.evaluate(".//td[@name='resultItem']//h3/a", cell, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null)
            for (var i = 0; i < nodesSnapshot.snapshotLength; i++)
            {
                cellBL.innerHTML += "<div style='padding: 2px 0;'><h3>" + nodesSnapshot.snapshotItem(i).innerHTML + "</h3></div>";
            }
        }

        cellBL.className = (isSessionBan) ? "sessionBan" : "permanentBan";
        cellBL.colSpan = Settings.columns;

        var t = Beautifier.createResultTable();
        var row2 = t.insertRow(-1);
        row2.appendChild(cell);
        t.style.display = "none";
        cellBL.appendChild(t);

        cellBL.onclick = function (e)
        {
            clearTimeout(this.getAttribute("stID"));
            this.lastElementChild.style.display = (this.lastElementChild.style.display) ? null : "none";
        };

        /* Hide when mouse has left cell
        cellBL.onmouseover = function (e)
        {
            clearTimeout(this.getAttribute("stID"));
        };


        cellBL.onmouseout = function (e)
        {
            clearTimeout(this.getAttribute("stID"));
            var stID = setTimeout(function (el)
            {
                el.lastElementChild.style.display = "none";
            }, 1000, this);

            this.setAttribute("stID", stID);
        };
        */

        return cellBL;
    },

    addCellsToTable: function ()
    {
        var table = Beautifier.getResultTable();

        var row = null;

        //This statement deals with the consequence of having content that takes a whole row.
        if (table.rows.length == 0 || Settings.columns == 1) row = table.insertRow(-1);
        else if (table.rows[table.rows.length - 1].cells.length == 0 || !table.rows[table.rows.length - 1].cells[0].getAttribute("colspan")) row = table.rows[table.rows.length - 1];
        else for (var i = 0; i < table.rows.length; i++)
            {
            if (table.rows[i].cells.length < Settings.columns && !table.rows[i].cells[0].getAttribute("colspan"))
            {
                row = table.rows[i];
                break;
            }
        }
        if (row == null) row = table.insertRow(-1);


        if (Settings.columns == 1) removeNode("TDWidths");
        else if (Settings.columns == 2) AddStyle("TDWidths", "#ResultTable > tbody > tr > td { width: 50%; }");
        else if (Settings.columns == 3) AddStyle("TDWidths", "#ResultTable > tbody > tr > td { width: 33%; }");
        else if (Settings.columns == 4) AddStyle("TDWidths", "#ResultTable > tbody > tr > td { width: 25%; }");

        while (ResultItems.firstElementChild)
        {

            if (row.cells.length == Settings.columns) row = table.insertRow(-1);

            while (ResultItems.firstElementChild && row.cells.length < Settings.columns)
            {
                var cell = ResultItems.firstElementChild;
                var type = Beautifier.getContentType(cell);
                var isWebSearch = (SearchType == SearchTypes.webSearch);

                if (Beautifier.typeFilter(type, Settings.result.remove) && isWebSearch)
                {
                    document.getElementById("schmoogleContainer").appendChild(cell);
                    cell.style.display = "none";
                    continue;
                }

                var group = isWebSearch && Beautifier.typeFilter(type, Settings.result.group, 2) && cell.nextElementSibling && type == Beautifier.getContentType(cell.nextElementSibling);

                if (group)
                {
                    //We are trying to divide the grouping to even out the size.
                    //Example if grouping is 5 and you have 6 videos it will
                    //split them 3/4 instead of 5/1.
                    var countTotal = 0;
                    var BLItems = document.createElement("div");
                    var BLCount = 0;
                    var maxsize = Settings.result.groupSize;
                    do
                    {
                        var next = cell.nextElementSibling;

                        var filter = cell.getElementsByClassName("imgbtn")[0];
                        if (filter) filter = FilterSystem.isBlacklisted(filter.metadata);
                        if (filter > 0)
                        {
                            BLItems.appendChild(cell);
                            BLCount++;
                        }

                        countTotal++;
                        cell = next;
                    } while (cell && Beautifier.getContentType(cell) == type);


                    var onlyBLItems = (BLCount == countTotal);
                    while (BLItems.children.length > 0)
                    {
                        ResultItems.insertBefore(BLItems.firstElementChild, cell);
                    }

                    if (countTotal > maxsize)
                    {
                        d = Math.ceil(countTotal / maxsize);
                        maxsize = Math.ceil(countTotal / d); //Get the new maxsize
                    }


                    var count = 0;
                    var t = Beautifier.createResultTable();
                    while (count < countTotal && ((count < maxsize && (count + BLCount) < countTotal) || onlyBLItems))
                    {
                        if (!onlyBLItems) Beautifier.addCellNumber(ResultItems.firstElementChild);
                        t.insertRow(-1).appendChild(ResultItems.firstElementChild);
                        count++;
                    }

                    cell = document.createElement("td");
                    cell.className = "CT" + type;
                    t.setAttribute("style", "width: 100%;");
                    cell.appendChild(t);
                }

                var filter = cell.getElementsByClassName("imgbtn")[0];
                if (filter)
                {
                    filter = FilterSystem.isBlacklisted(filter.metadata);
                    if (filter > 0)
                    {
                        cell = Beautifier.createBlacklistCell(cell, row, filter == 2);

                        if (row.cells.length > 0)
                        {
                            row2 = table.insertRow(-1);
                            row2.appendChild(cell);
                        }
                        else
                        {
                            row.appendChild(cell);
                            row = table.insertRow(-1);
                        }

                        continue;
                    }
                }


                if (!group) Beautifier.addCellNumber(cell);

                if (isWebSearch && Settings.columns > 1 && Beautifier.typeFilter(type, Settings.result.wholerow))
                {
                    var d = document.createElement("div");
                    d.style.display = "inline-block";
                    var t = Beautifier.createResultTable();
                    var r = t.insertRow(-1);
                    r.appendChild(cell);
                    t.style.minWidth = "520px";
                    d.appendChild(t);

                    cell = document.createElement("td");
                    cell.appendChild(d);

                    cell.colSpan = Settings.columns;
                    cell.style.textAlign = "center";
                    cell.className = "CT" + type;

                    //cell.firstElementChild.style.textAlign = "left";
                    if (row.cells.length > 0)
                    {
                        var row2 = table.insertRow(-1);
                        row2.appendChild(cell);
                    }
                    else
                    {
                        row.appendChild(cell);
                        row = table.insertRow(-1);
                    }
                }
                else
                {
                    row.appendChild(cell);
                }
            }
        }
    },

    refreshTable: function ()
    {
        Pager.paused = true;
        Settings.Load();
        Beautifier.addDynamicStyles();
        var ritems = document.getElementsByName("resultItem");

        while (ritems.length > 0)
        {
            var cell = ritems[0];
            var position = cell.getElementsByClassName("ItemPos")[0]; //Removes numbering
            if (position) removeNode(position);
            cell.removeAttribute("colspan");
            cell.style.textAlign = null;
            cell.style.display = null;

            var inserted = false;

            //Sort the result items to get original position as it may be altered with removal of results
            for (var i = 0; i < ResultItems.children.length; i++)
            {
                if (parseInt(ResultItems.children[i].getAttribute("index")) > parseInt(cell.getAttribute("index")))
                {
                    inserted = true;
                    ResultItems.insertBefore(cell, ResultItems.children[i]);
                    break;
                }
            }

            if (!inserted) ResultItems.appendChild(cell);
        }

        Counter = 0;
        removeNode("ResultTable");
        Beautifier.addCellsToTable();

        Pager.paused = false;
    },

    getContentType: function (li)
    {
        var type = li.getAttribute("contentType");
        if (type) return type;

        type = ContentTypes.unknown;

        if (SearchType == SearchTypes.placesSearch) type = ContentTypes.standard;
        else if (li.className.indexOf("g tpo") != -1) type = ContentTypes.info;
        else if (SearchType == SearchTypes.videoSearch && li.className == "g videobox") type = ContentTypes.standard;
        else if (SearchType == SearchTypes.newsSearch && li.id.indexOf("esc-story") != -1) type = ContentTypes.standard;
        else

            switch (li.id)
            {
                case "newsbox":
                    type = ContentTypes.news;
                    break;
                case "imagebox_bigimages":
                    type = ContentTypes.images;
                    break;
                default:
                    if (li.childElementCount > 0)
                    {
                        //console.warn(li.firstElementChild.className);
                        switch (li.firstElementChild.className)
                        {
                            case "vsc": //Standard result item                            
                                type = ContentTypes.standard;
                                break;
                            case "vsc vslru": //Places result item
                                type = ContentTypes.places;
                                break;
                            case "s": //information                            
                                type = ContentTypes.info;
                                break;
                            case "fl": //Link to more videos. 
                                type = ContentTypes.moreLinks;
                                break;
                            case "dict vk_c vk_bk":
                            case "dict vk_c":
                                //case "sp_cnt": //Spell correction
                                type = ContentTypes.info;
                                break;
                            default: //Do not know what the heck it is                                
                                //More links most likely found in news search
                                if (li.childElementCount == 1 && li.firstElementChild.tagName == "A" && li.textContent.match(/ »$/gi))
                                {
                                    type = ContentTypes.moreLinks;
                                }
                                else if (li.firstElementChild && li.firstElementChild.tagName == "H3" && li.firstElementChild.childElementCount == 0)
                                {
                                    //Most likely text that say "Results for similar searches". Used by Google Grouping result                                    
                                    return null; //TODO: Need a better way of handling grouping
                                }
                                else
                                {
                                    type = (SearchType == SearchTypes.newsSearch || li.firstElementChild.className == "rc") ? ContentTypes.standard : ContentTypes.unknown;

                                    if (SearchType == SearchTypes.webSearch)
                                    {
                                        var imgs = li.getElementsByTagName("img");
                                        if (imgs.length == 1 && imgs[0].id.indexOf("vidthumb") == 0)
                                        {
                                            type = ContentTypes.videos;
                                        }
                                    }
                                    break;
                                }
                        }
                    }
                    break;
            }

        return type;
    },

    createResultTable: function ()
    {
        var table = document.createElement("table");
        table.className = "resultTable";
        return table;
    },

    getResultTable: function ()
    {
        var table = document.getElementById("ResultTable");

        if (IsNull(table))
        {
            var schmoogle = document.getElementById("schmoogleContainer");
            if (!schmoogle)
            {
                var schmoogle = document.createElement("div");
                schmoogle.id = "schmoogleContainer";
                var rcnt = document.getElementById("rcnt")
                rcnt.insertBefore(schmoogle, rcnt.firstElementChild);
            }

            table = Beautifier.createResultTable();
            table.id = "ResultTable";
            schmoogle.appendChild(table);
        }
        return table;
    },


    createButton: function (name, metadata, imgsrc)
    {
        var link = document.createElement("a");
        link.name = name;
        link.metadata = metadata;
        link.href = "#";
        link.className = "imgbtn";

        var img = document.createElement("img");
        img.setAttribute("src", imgsrc);
        link.appendChild(img);

        link.onclick = FilterSystem.buttonPressed;
        return link;
    },

    addButtons: function (cell)
    {
        var cashedLink = null;
        var similarLink = null;
        var div = document.createElement("div");
        div.className = "buttonsPanel";
        cell.lastElementChild.appendChild(div);

        AddStyle("liButtons", "text-align: center; vertical-align: middle; display: table-cell; margin: 0px; padding: 0px;");

        var evaluator = new XPathEvaluator();
        var dropmenu = evaluator.evaluate(".//a[@class='clickable-dropdown-arrow ab_button']", cell, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        var droppanel = evaluator.evaluate(".//div[@class='action-menu-panel ab_dropdown']", cell, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

        if (dropmenu && droppanel)
        {
            var links = droppanel.getElementsByTagName("a");

            for (var i = 0; i < links.length ; i++)
            {
                var span = document.createElement("span");
                var a = document.createElement("a");
                //a.setAttribute("role", "button");
                a.className = "milkyButton";
                a.textContent = links[i].textContent;
                a.href = links[i].href;
                span.appendChild(a);
                div.appendChild(span);
            }

            dropmenu.style.display = "none"; //Hide as if I remove it causes errors          
        }

        if (SearchType != SearchTypes.bookSearch && FindStringInArray(["info", "images", "videos"], cell.getAttribute("contenttype")) < 0)
        {
            var evaluator = new XPathEvaluator();
            var node = evaluator.evaluate(".//h3/a", cell, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

            if (node)
            {
                var hostname = node.hostname;
                var span = document.createElement("span");


                span.appendChild(
                 Beautifier.createButton("Filter", hostname, "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACZklEQVR42pWSbUhTURjH//dlbXPamygYGULQl/pQuEIi9EN+llggYUKgRZCNApkftGyWLXJoESmR+IZOqWigQfQlc98iIqlEJHrxBUlLV7b7enZ3b+feMaGhwQ7n4cA5z+93nvvcw4COsubRCqx8Lt9/qOToNpe9KMdhy9VhwNBpmAmMORkIMlldk8js9OTrCJu3LzJxvWKMHsF+NfxRmV6K4qesQ2N4MJwN2S4ncrKc4FgOgighJsvQNQLe0LDTwaIoJwsd1W6HKXC1PPsk7CjIB5FFQE+Ao7scx8PGczBoCQqJQyUEghKHrMYh0tVp6LhbXZxtCa6NzQhbdxXiD9Fh5xmwrAFFIVayrKg0TJBAVYm1xkQCd4ET7VVJgcNde2voTvOlkzzPY1VNQNOBKE0y47eoICooiEm0AlmBkwWKd2ejb2Dk6VTIX80kW4T84ppAl/ey17MomeUz0LQ4JJkkK6C3SrIK1khg73Y7HoWGw1PDLRco98OEkZK4qaSmzuuRDMb8BxZsSkQK6wkNuXZgdCQUfj/ot2AaRkqwLjlcG+g6db7Ow9LPMZsnUYlKe7HFiOP5yGD43UDzOpyCkC45QiWecxc9vI21qlBpvBjqDb/tu/IPvJFgXXLwzM3QDX/98eWVNXR29ryc7G88nQ5vJrD2C0urgvf7e+sXvq+irbGhfT4S8qXD/xNgT1lV2+3uXt+X+SV0tzYF5yZCDRvetKngWGVTw72e1rnFZTzp8AdnXw1lJqAjr+Rs4MGB8hOe8YeB4NfxzAVWM4tKK31rCzNvfn378DhTQeqcPh/Qxw2yUcJfKSsmRq7riLwAAAAASUVORK5CYII=")
                 );

                span.appendChild(
                Beautifier.createButton("SBan", hostname, "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABo0lEQVR42n2TTShEURzF341hsrTC0mJmI2YlZVaD8jFkyUKzEZGFLEQWb56NJAuE7WRlwZYNO5QNjRBJUoqGIk0NQz2/y32682bevDpz7v3/zzn3ozvC8PjiplkFBQwhfIZt3zO+jVuW7daJAsZuaAZjY07ftu/4XQarBH3lBWAshdbBIGZp8NrcMeghJOUOWING1DQJFog4gLOIQvAcaFD9ExAmJCOUOQLtq+YmxphlWVktvBPaBn5tJ7MEmE7ALtQObjDXY/7QzFFoC5S7jvKKtkaYpukn5U0KKIxjXipiTqGZRJ/4vVfDiMiAAIVrVWgm4MjD/Ey/Bb5En5bHYT4kA4IUrlRAmIBDalGRb26ld0avRAsYlgEV8jwUyyhMyHvwMssJ+hD9U7Vgm1DFPfG3vUdQqZlflDnp3AvaDbQD1N+ZVjsBHQx2XLdcyDyGbkWtPk9vSmjNBJPY/8tFIJ8t+FQPaJR+r+pdQE0EpPUAuW0Z0mcU+TDLu+jC/JDzlFWInPeDaQZ1LuOT2tEi5oxTF4VWUUG1IAh8QP6dzzF+u7U/Q72uYVFcvNkAAAAASUVORK5CYII=")
                );

                span.appendChild(
                Beautifier.createButton("PBan", hostname, "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB+UlEQVR42nWTSyhEURjH52Hc29Q0ZYWlhdkIKymz8iiPIUsWshGRhSxEFspGkgUatrKyGFs27FA2NEIkSSlCMbqNeZjh903nTNfg1Omc7/H/fec791yn45/h8/lKDcOodLvdnnQ6fZfJZG5isdhXYZ6z0GGaZifCaY/HU4c4Hwdym0gklrPZbJg1/QuAoIi55vV6B7SPZAeVHYAcLpcrZwM6YnYBefoBQLhK9WHZE4yStIBgHzOFuBb4HPEaFT8mHmR+OFX1RgB7Uikej28S6KdyytZWOzlbgEztSyaTs4BmnCphB0ArjmsC1YgTOtHv94dYIkxD3YUUlHZeKVYuABPxG07DsqwxxEt2MaeK4NPiJwpMcMnr6rSNAqgEcKUcDSQfqs8YAmoXPyNuwr7gxJYUxjcogACJlwKghSD2AfsQ0Ag958XAm9meMt3k5wC0MSQAL45X1mIc41S4FjGQvBiwFsuQL3KiYi25SyR5l2pNbB/Yl8h9yHfnyC9KHNX3QnyDeB+F3gGU6XfQRl/bshGhtEPwl5gxSt6KegvzLJP2p7xOsF8AMuh5nkphYEnMGoAj3H63egPnnKCerWUHGArSI99ZD/2EZcizRnzK2oF5/9fPJHYvVaeAVGmQCDnBIzOMucj8+PdvtPkrAAXkpQO4Yz1jfhYmfgN9kiOmnmWWuQAAAABJRU5ErkJggg==")
                );

                span.style.paddingTop = "5px";
                div.appendChild(span);
            }
        }
    },

    removeAdvertNodes: function ()
    {

        removeNode("tads"); //Top Adverts    
        removeNode("bottomads"); //Bottom Adverts
        removeNode("mbEnd"); //Side Adverts
        removeNode("extrares"); //Related Search Words
        removeNode("botstuff"); //Related Search Words#
        removeNode("tvcap");
        //removeNode("res"); Breaks google update using topstuff instead
        //removeNode("topstuff"); //Removes related word search that occurs at top
        //removeNode("taw"); //Removes search word correction
    }
};

var FilterSystem =
{
    buttonPressed: function (e)
    {
        var btn = e.target;

        while (btn.tagName != "A") btn = btn.parentElement;

        switch (btn.name)
        {
            case "SBan":
                FilterSystem.showBlackListWindow(e, btn.metadata, true);
                break;
            case "PBan":
                FilterSystem.showBlackListWindow(e, btn.metadata, false);
                break;
            default:
                var ids = ["gbqfq", "lst-ib", "sbhost"];
                for (var i = 0; el = document.getElementById(ids[i]), i < ids.length; i++)
                {
                    if (el)
                    {
                        //Does not remove spaces for some unknown reason
                        var newFilter = "-site:" + btn.metadata;
                        if (el.value.indexOf(newFilter) == -1) el.value = el.value.replace(/(\s+)?$/, " ") + newFilter;
                        else el.value = el.value.replace(new RegExp("\s*" + newFilter, "i"), "");
                        break;
                    }
                }
                break;
        }
        e.stopPropagation();
        return false;
    },

    showBlackListWindow: function (e, hostname, isSessionBan)
    {
        var blw = document.getElementById("BLWindow");
        if (!blw)
        {
            blw = AddHTMLElement('<div id="BLWindow" style="background-color: white; width: 250px; padding: 5px; border: ridge; border-radius: 5px; position: absolute; left: 100px; top: 100px; z-index: 999;"><p style="text-align: center"><strong id="BLTitle"></strong></p><p><div><input name="shoBL" type="checkbox" value="hostname" /><label>www.hostname.com</label></div><div><input name="shoBL" type="checkbox" value="domain" /><label>domain.com</label></div></p><div style="text-align: center;"><input id="BLBtn" type="submit" value="OK" style="width: 75px" /></div></div>');

            document.body.appendChild(blw);
            document.getElementById("BLBtn").onclick = FilterSystem.blacklistCallback;
        }

        var pos = FilterSystem.GetEventsPagePosition(e);
        blw.style.left = pos.x + "px";
        blw.style.top = pos.y + "px";

        var lbls = blw.getElementsByTagName("label");
        lbls[0].textContent = hostname;
        lbls[1].textContent = GetDomain(hostname);

        els = blw.getElementsByTagName("input"); //checkboxes

        var arr = (isSessionBan) ? Settings.blacklist.sessionH : Settings.blacklist.permanentH;
        var i = FindStringInArray(arr, hostname);
        if (i >= 0) els[0].checked = true;


        arr = (isSessionBan) ? Settings.blacklist.sessionD : Settings.blacklist.permanentD;
        var i = FindStringInArray(arr, lbls[1].textContent);
        if (i >= 0) els[1].checked = true;

        if (isSessionBan)
        {
            document.getElementById("BLTitle").textContent = "Session Blacklist";
            blw.setAttribute("session", "true");
        }
        else
        {
            document.getElementById("BLTitle").textContent = "Permanent Blacklist";
            blw.removeAttribute("session");
        }

    },

    blacklistCallback: function (e)
    {
        var blw = document.getElementById("BLWindow");

        var els = blw.getElementsByTagName("label");
        var hostname = els[0].textContent;
        var domain = els[1].textContent;

        els = blw.getElementsByTagName("input"); //checkboxes

        var isSessionBan = blw.getAttribute("session");

        var changed = false;
        if (els[0].checked) changed = changed || FilterSystem.blacklistAdd(hostname, true, isSessionBan);
        else changed = changed || FilterSystem.blacklistRemove(hostname, true, isSessionBan);

        if (els[1].checked) changed = changed || FilterSystem.blacklistAdd(domain, false, isSessionBan);
        else changed = changed || FilterSystem.blacklistRemove(domain, false, isSessionBan);

        if (!blw.getAttribute("session")) Settings.Save();
        if (changed) Beautifier.refreshTable();
        removeNode(blw);
    },

    blacklistAdd: function (name, isHostname, isSessionBan)
    {
        var arr;
        if (isHostname) arr = (isSessionBan) ? Settings.blacklist.sessionH : Settings.blacklist.permanentH;
        else arr = (isSessionBan) ? Settings.blacklist.sessionD : Settings.blacklist.permanentD;
        var l = arr.length;

        var i = FindStringInArray(arr, name);
        if (i < 0) arr.push(name);
        return (arr.length != l)
    },

    blacklistRemove: function (name, isHostname, isSessionBan)
    {
        var arr;

        if (isHostname) arr = (isSessionBan) ? Settings.blacklist.sessionH : Settings.blacklist.permanentH;
        else arr = (isSessionBan) ? Settings.blacklist.sessionD : Settings.blacklist.permanentD;
        var l = arr.length;

        var i = FindStringInArray(arr, name);
        if (i >= 0) arr.splice(i, 1);

        return (arr.length != l)
    },

    /* Checks if hostname is blackslisted
    --------------------------------------------- 
     0: Not blacklisted
     1: permanent blacklist
     2: session blacklist */
    isBlacklisted: function (name)
    {
        if (!Settings.blacklist.enabled) return 0;
        if (MatchArrayStringToString(Settings.blacklist.permanentH, name, 8) >= 0) return 1;
        if (MatchArrayStringToString(Settings.blacklist.permanentD, name, 8, ".") >= 0) return 1;

        if (MatchArrayStringToString(Settings.blacklist.sessionH, name, 8) >= 0) return 2;
        if (MatchArrayStringToString(Settings.blacklist.sessionD, name, 8, ".") >= 0) return 2;
        return 0;
    },

    GetEventsPagePosition: function (e)
    {
        var posx = 0;
        var posy = 0;
        if (!e) var e = window.event;
        if (e.pageX || e.pageY)
        {
            posx = e.pageX;
            posy = e.pageY;
        }
        else if (e.clientX || e.clientY)
        {
            posx = e.clientX + document.body.scrollLeft
                + document.documentElement.scrollLeft;
            posy = e.clientY + document.body.scrollTop
                + document.documentElement.scrollTop;
        }

        var pos = new Object();
        pos.x = posx;
        pos.y = posy;
        return pos;
    }
}

var InfoTab =
{
    AddRHSTab: function ()
    {
        removeNode("schmoogleInfoTab");

        var rhs = document.getElementById("rhs");
        if (rhs && rhs.innerHTML.length > 300)
        {
            //TODO: Try and fix RHS positioning            
            var w = rhs.clientWidth;

            var tab = AddHTMLElement('<a href="#" id="schmoogleInfoTab"><img alt="" src="data:image/png;base64,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" /></a>');
            tab.onclick = InfoTab.TabClick;
            document.body.appendChild(tab);

            rhs.setAttribute("style", "position: absolute; width: " + w + "px; right: 25px; top: 0px; z-index: 500");
            rhs.style.visibility = "hidden";
        }
        else if (rhs) rhs.style.visibility = "hidden";
    },

    TabClick: function (e)
    {
        rhs = document.getElementById("rhs");
        var alink = (e.target.tagName == "A") ? e.target : e.target.parentElement;

        if (rhs.style.visibility == "hidden")
        {
            rhs.style.visibility = null;
            alink.className = "itSelected";
        }
        else
        {
            rhs.style.visibility = "hidden";
            alink.className = null;
        }

        return false;
    }
};

var SettingsWindow =
{
    showWindow: function ()
    {
        if (document.getElementById("Settings") != null) return true;

        if (document.getElementById("schmoogleSW") == null)
            AddStyle("schmoogleSW", '#Settings{width: 450px;background-color: floralwhite;display: table-cell;vertical-align: middle;text-align: center;border: 3px double black;z-index: 1001;position: fixed;right: 10px;top: 10px;}#SettingsMain{background-color: #F2FBFF;font-size: small;}#SettingsMain th{margin: 0;padding: 0;width: 70px;text-align: center;}#SettingsMain td{margin: 0;padding: 0;text-align: center;vertical-align: middle;}#SettingsMain td a{display: inline-block;margin-top: 2px;}#SettingsMain tr:nth-child(odd){background-color: #C0EEFD;}#SettingsMain tr:nth-child(even ){background-color: #D5BBFD;}#SettingsMain th{background-color: lightcoral;}.bgiL, .cellOn, .btOn{background-color: rgb(0,255,0);background-image: linear-gradient(bottom,rgb(200,255,200) 0%, rgb(0,255,0) 50%, rgb(200,255,200) 100%);background-image: -o-linear-gradient(bottom, rgb(200,255,200) 0%, rgb(0,255,0) 50%, rgb(200,255,200) 100%);background-image: -moz-linear-gradient(bottom, rgb(200,255,200) 0%, rgb(0,255,0) 50%, rgb(200,255,200) 100%);background-image: -webkit-linear-gradient(bottom, rgb(200,255,200) 0%, rgb(0,255,0) 50%, rgb(200,255,200) 100%);background-image: -ms-linear-gradient(bottom, rgb(200,255,200) 0%, rgb(0,255,0) 50%, rgb(200,255,200) 100%);background-image: -webkit-gradient( linear, left bottom, left top, color-stop(0, rgb(200,255,200)), color-stop(0.5, rgb(0,255,0) ), color-stop(1, rgb(200,255,200)) );}.bgiG, .cellOff, .btOff{background-color: rgb(156,156,156);background-image: linear-gradient(bottom, rgb(238,238,238) 0%, rgb(156,156,156) 50%, rgb(238,238,238) 100%);background-image: -o-linear-gradient(bottom, rgb(238,238,238) 0%, rgb(156,156,156) 50%, rgb(238,238,238) 100%);background-image: -moz-linear-gradient(bottom, rgb(238,238,238) 0%, rgb(156,156,156) 50%, rgb(238,238,238) 100%);background-image: -webkit-linear-gradient(bottom, rgb(238,238,238) 0%, rgb(156,156,156) 50%, rgb(238,238,238) 100%);background-image: -ms-linear-gradient(bottom, rgb(238,238,238) 0%, rgb(156,156,156) 50%, rgb(238,238,238) 100%);background-image: -webkit-gradient( linear, left bottom, left top, color-stop(0, rgb(238,238,238)), color-stop(0.5, rgb(156,156,156)), color-stop(1, rgb(238,238,238)) );}.cellOn, .cellOff{border-radius: 10px;display: inline-block;height: 15px;width: 50px;}.IBL{display: inline-block;text-align: left;}.TabMenu{width: 100%;border-collapse: collapse;}.TabMenu td{width: 20%;padding: 0;}.TabMenu input{background-color: #EDF0F0;width: 100%;}.ColourTable{font-size: small;background-color: #74A7B8;display: inline-block;}.ColourTable td input{font-size: x-small;text-align: right;width: 45px;}.ColourTable th{text-align: center;background-color: lightblue;}.ColourRow{text-align: center;background-color: #3F89A2;}.ColourRowTD > td{text-align: center;background-color: #094D64;}.btOn, .btOff{display: inline-block;width: 30px;height: 12px;border-radius: 2px;margin: 2px 3px 0 3px;}#BLDiv{height: 300px;overflow-y: auto;padding: 0 5px;}#BLTable{width: 100%;height: 100%;background-color: #FFFFD6;}#BLTable th{background-color: #FFD3DA;height: 25px;}#BLTable td{font-size: small;width: 50%;text-align: left;padding-right: 5px;vertical-align: top;}#BLTable tr td:nth-child(2n){background-color: #D2FFB2;}#BLTable td:nth-child(2n+1){background-color: #CBE9F3;}#BLTable button{font-size: x-small;margin-right: 5px;}');

        var sw = AddHTMLElement('<section id="Settings"><div style="margin-bottom: 10px;"><table class="TabMenu"><tbody><tr><td><input name="MTab" type="button" value="Main" /></td><td><input name="MTab" type="button" value="Skins" /></td><td><input name="MTab" type="button" value="Blacklist" /></td><td><input name="MTab" type="button" value="Other" /></td><td><input name="MTab" type="button" value="About" /></td></tr></tbody></table></div><div id="MainMenu" name="MTabW" class="IBL"><div><input id="PInterval" type="text" value="1500" style="text-align: right; width: 40px; margin: 0 2px;" />Wait period between page fetching</div><table id="SettingsMain"><tbody><tr><th>Content</th><th>Number</th><th>Whole Row</th><th>Remove</th><th>Group</th></tr><tr><th>Info</th><td><a href="#"><div class="cellOn" name="cNumber"></div></a></td><td><a href="#"><div class="cellOff" name="cWholeRow"></div></a></td><td><a href="#"><div class="cellOff" name="cRemove"></div></a></td></tr><tr><th>Images</th><td><a href="#"><div class="cellOn" name="cNumber"></div></a></td><td><a href="#"><div class="cellOff" name="cWholeRow"></div></a></td><td><a href="#"><div class="cellOff" name="cRemove"></div></a></td></tr><tr><th>Videos</th><td><a href="#"><div class="cellOn" name="cNumber"></div></a></td><td><a href="#"><div class="cellOff" name="cWholeRow"></div></a></td><td><a href="#"><div class="cellOff" name="cRemove"></div></a></td><td><a href="#"><div class="cellOff" name="cGroup"></div></a></td></tr><tr><th>News</th><td><a href="#"><div class="cellOn" name="cNumber"></div></a></td><td><a href="#"><div class="cellOff" name="cWholeRow"></div></a></td><td><a href="#"><div class="cellOff" name="cRemove"></div></a></td><td><a href="#"><div class="cellOff" name="cGroup"></div></a></td></tr><tr><th>Places</th><td><a href="#"><div class="cellOn" name="cNumber"></div></a></td><td><a href="#"><div class="cellOff" name="cWholeRow"></div></a></td><td><a href="#"><div class="cellOff" name="cRemove"></div></a></td><td><a href="#"><div class="cellOff" name="cGroup"></div></a></td></tr><tr><th>Unknown</th><td><a href="#"><div class="cellOn" name="cNumber"></div></a></td><td><a href="#"><div class="cellOff" name="cWholeRow"></div></a></td><td><a href="#"><div class="cellOff" name="cRemove"></div></a></td><td><select id="GroupSel"><option selected="selected">2</option><option>3</option><option>4</option><option>5</option><option>6</option><option>7</option><option>8</option><option>9</option></select></td></tr></tbody></table></div><div id="SkinsMenu" name="MTabW" class="IBL" style="text-align: left; margin: 0 5px 0 5px;"><div style="text-align: right; margin-bottom: 5px;"><select id="skinSel" style="width: 100%"></select><input type="button" value="New" /><input type="button" value="Delete" id="deleteSkin" /></div><div class="IBL"><table class="ColourTable"><tbody><tr class="ColourRow"><td colspan="7">General Colours</td></tr><tr><th>Result 1</th><th>Result 2</th><th>Inner BGC</th><th>Session Ban</th><th>Perm Ban</th><th>Ban Font</th></tr><tr id="skinGeneral" class="ColourRowTD"><td><input class="jscolorGM" /></td><td><input class="jscolorGM" /></td><td><input class="jscolorGM" /></td><td><input class="jscolorGM" /></td><td><input class="jscolorGM" /></td><td><input class="jscolorGM" /></td></tr><tr class="ColourRow"><td colspan="7">Specific Border Colours</td></tr><tr><th>Info</th><th>Image</th><th>Videos</th><th>News</th><th>Places</th><th>Unknown</th></tr><tr id="skinBorderColor" class="ColourRowTD"><td><a href="#"><div class="btOn"></div></a><input class="jscolorGM" /></td><td><a href="#"><div class="btOn"></div></a><input class="jscolorGM" /></td><td><a href="#"><div class="btOn"></div></a><input class="jscolorGM" /></td><td><a href="#"><div class="btOn"></div></a><input class="jscolorGM" /></td><td><a href="#"><div class="btOn"></div></a><input class="jscolorGM" /></td><td><a href="#"><div class="btOn"></div></a><input class="jscolorGM" /></td><td style="visibility: collapse; width: 50px;"></td></tr><tr class="ColourRow"><td colspan="7">Transparent Inner Result</td></tr><tr><th>Info</th><th>Images</th><th>Videos</th><th>News</th><th>Places</th><th>Unknown</th><th>Result</th></tr><tr id="skinBorderTrans" class="ColourRowTD"><td><a href="#"><div class="btOn"></div></a></td><td><a href="#"><div class="btOn"></div></a></td><td><a href="#"><div class="btOn"></div></a></td><td><a href="#"><div class="btOn"></div></a></td><td><a href="#"><div class="btOn"></div></a></td><td><a href="#"><div class="btOn"></div></a></td><td><a href="#"><div class="btOn"></div></a></td></tr></tbody></table></div><div class="IBL"><table class="ColourTable"><tbody><tr class="ColourRow"><td colspan="4" style="text-align: left;"><a id="SkinBGCBtn" href="#"><div class="btOff"></div></a>Google Background Colours</td></tr><tr><th>BGC</th><th>Normal Font</th><th>Hover Font</th><th>Selected Font</th></tr><tr id="skinBGC" class="ColourRowTD"><td><input class="jscolorGM" /></td><td><input class="jscolorGM" /></td><td><input class="jscolorGM" /></td><td><input class="jscolorGM" /></td></tr></tbody></table></div><div class="IBL"><table class="ColourTable"><tbody><tr class="ColourRow"><td colspan="4" style="text-align: left;"><a id="SkinFontBtn" href="#"><div class="btOff"></div></a>Font Colours</td></tr><tr><th>Link</th><th>Visited</th><th>Text</th><th>Citation</th></tr><tr id="skinFont" class="ColourRowTD"><td><input class="jscolorGM" /></td><td><input class="jscolorGM" /></td><td><input class="jscolorGM" /></td><td><input class="jscolorGM" /></td></tr></tbody></table></div></div><div name="MTabW"><div id="BLDiv"><table id="BLTable"><tbody><tr><th>Hostname</th><th>Domain</th></tr><tr><td></td><td></td></tr></tbody></table></div></div><div name="MTabW">Unused at the moment</div><div name="MTabW" style="text-align: left; padding: 0 10px 0 10px;"><p style=""><i style="padding-left: 20px;">“We know where you are. We know where you’ve been. We can more or less know what you’re thinking about.”</i><br />- Eric Schmidt, ex-CEO for Google</p><p><img style="float: left; margin: 0 10px 0 0;" src="data:image/png;base64,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" />&nbsp;&nbsp;&nbsp;&nbsp;<a href="http://userscripts.org/scripts/show/159750">Schmoogle</a>&nbsp;was created to improve the usage of Google Search by&nbsp;<a href="http://userscripts.org/users/100610/scripts">TimidScript</a>. It is one of the most robust&nbsp;scripts for Google search, capturing most searches with little fault.</p><p>Google is one of the most invasive companies around, so please remember to protect your privacy.&nbsp;Install scripts that remove tracking and also consider using proxies. Currently Schmoogle&nbsp;removes tracking from links and unwanted metadata from URL.</p><p>Assistant required in translations of text to provide script in multiple languages. Please&nbsp;visit <a href="http://userscripts.org/topics/129406">here</a> for list of required&nbsp;translations.</p><p>Positive feedbacks are always welcome. If you enjoy this script, give a positive&nbsp;<a href="http://userscripts.org/scripts/reviews/159750">review</a>&nbsp;and become a<a href="http://userscripts.org/scripts/fans/159750">fan</a>.</p></div><div style="text-align: right; margin: 0 5px 5px 5px;"><input id="SettingsExit" type="button" value="Exit" /></div></section>');

        sw.style.position = "fixed";
        sw.style.top = "10px";
        sw.style.right = "10px";

        document.body.appendChild(sw);

        var btns = sw.getElementsByTagName("input");
        for (var i = 0; i < btns.length; i++)
        {
            if (btns[i].type == "button") btns[i].onclick = SettingsWindow.buttonPressed;
        }

        var btns = sw.getElementsByTagName("a");
        for (var i = 0; i < btns.length; i++)
        {
            if (btns[i].firstElementChild && btns[i].firstElementChild.tagName == "DIV") btns[i].onclick = SettingsWindow.switchPressed;
        }

        document.getElementById("PInterval").value = Settings.paging.interval;
        document.getElementById("GroupSel").selectedIndex = Settings.result.groupSize - 2;

        SettingsWindow.setSwitches(document.getElementsByName("cNumber"), Settings.result.number);
        SettingsWindow.setSwitches(document.getElementsByName("cWholeRow"), Settings.result.wholerow);
        SettingsWindow.setSwitches(document.getElementsByName("cRemove"), Settings.result.remove);
        SettingsWindow.setSwitches(document.getElementsByName("cGroup"), Settings.result.group);

        // -------------- Fill blacklist table
        var tds = document.getElementById("BLTable").getElementsByTagName("td");
        for (var i = 0; i < 2; i++)
        {
            if (i == 0) arr = Settings.blacklist.permanentH;
            else arr = Settings.blacklist.permanentD;
            for (var j = 0; j < arr.length; j++)
            {
                var d = document.createElement("div");
                d.innerHTML = "<button>X</button>" + arr[j];
                d.firstElementChild.onclick = function (e)
                {
                    var btn = e.target;
                    var isHostname = !(btn.parentElement.parentElement.nextElementSibling == null);
                    FilterSystem.blacklistRemove(btn.parentElement.textContent.substring(1), isHostname, false);
                    removeNode(btn.parentElement);
                };

                tds[i].appendChild(d);
            }
        }

        SettingsWindow.displaySkinSettings();

        var tabs = document.getElementsByName("MTab");
        for (var i = 0; i < tabs.length; i++) tabs[i].onclick = SettingsWindow.tabSelected;
        document.getElementsByName("MTab")[0].click();
        jscolor.fixed = true;
        jscolor.bind();
    },

    displaySkinSettings: function ()
    {
        SettingsWindow.monitorSkinChanges(false);

        SettingsWindow.setColours(document.getElementById("skinGeneral").getElementsByTagName("input"), Settings.skin.general);
        SettingsWindow.setColours(document.getElementById("skinBorderColor").getElementsByTagName("input"), Settings.skin.border);
        SettingsWindow.setColours(document.getElementById("skinBGC").getElementsByTagName("input"), Settings.skin.bgc);
        SettingsWindow.setColours(document.getElementById("skinFont").getElementsByTagName("input"), Settings.skin.font);

        SettingsWindow.setSwitches(document.getElementById("skinBorderColor").getElementsByTagName("div"), Settings.skin.border[0]);
        SettingsWindow.setSwitches(document.getElementById("skinBorderTrans").getElementsByTagName("div"), Settings.skin.transparency);
        SettingsWindow.setSwitches(document.getElementById("skinBorderColor").getElementsByTagName("div"), Settings.skin.border[0]);
        SettingsWindow.setSwitches(document.getElementById("SkinBGCBtn").getElementsByTagName("div"), Settings.skin.bgc[0]);
        SettingsWindow.setSwitches(document.getElementById("SkinFontBtn").getElementsByTagName("div"), Settings.skin.font[0]);


        var sel = document.getElementById("skinSel");
        sel.innerHTML = "";

        var skins = Settings.GetSkinNames();
        for (var i = 0; i < skins.length; i++)
        {
            var opt = document.createElement("option");
            opt.textContent = skins[i].name;
            opt.value = skins[i].id;
            sel.appendChild(opt);
            if (skins[i].id == Settings.skin.id) opt.selected = true;
        }

        document.getElementById("deleteSkin").disabled = (Settings.skin.id == 0);
        jscolor.refresh();

        SettingsWindow.monitorSkinChanges(true);
    },

    monitorSkinChanges: function (enable)
    {
        var sm = document.getElementById("SkinsMenu");

        var els = sm.getElementsByClassName("jscolorGM");
        for (var i = 0; i < els.length; i++) els[i].onchange = (enable) ? SettingsWindow.addSkinStyles : null;

        els = sm.getElementsByTagName("a");
        for (var i = 0; i < els.length; i++)
            if (enable) els[i].addEventListener("click", SettingsWindow.addSkinStyles, false);
            else els[i].removeEventListener("click", SettingsWindow.addSkinStyles, false);

        var sel = document.getElementById("skinSel");
        if (enable)
        {
            sel.onchange = function (e)
            {
                Settings.SaveSkin();
                Settings.skin = Settings.GetSkin(this.options[this.selectedIndex].value);
                document.getElementById("deleteSkin").disabled = (Settings.skin.id == 0);
                SettingsWindow.displaySkinSettings();
                Beautifier.addDynamicStyles();
                Settings.Save();
            }
        }
        else sel.onchange = null;
    },

    setColours: function (inpts, colours)
    {
        var n = (inpts.length < colours.length) ? 1 : 0;
        for (var i = 0; i < inpts.length; i++)
        {
            inpts[i].value = colours[i + n];
        }
    },

    getColours: function (inpts, colours)
    {
        var n = (inpts.length < colours.length) ? 1 : 0;
        for (var i = 0; i < inpts.length; i++)
        {
            colours[i + n] = inpts[i].value;
        }
    },

    setSwitches: function (btns, value)
    {
        for (var i = 0; i < btns.length; i++)
        {
            if (value & Math.pow(2, i + 1)) btns[i].className = btns[i].className.replace(/Off$/, "On");
            else btns[i].className = btns[i].className.replace(/On$/, "Off");
        }
    },

    getSwitches: function (btns)
    {
        var value = 0;

        for (var i = 0; i < btns.length; i++)
        {
            if (btns[i].className.match(/On$/)) value += Math.pow(2, i + 1);
        }

        return value;
    },

    tabSelected: function (e)
    {
        var name = e.target.value;

        var mtabws = document.getElementsByName("MTabW");
        var mtabs = document.getElementsByName("MTab");
        for (var i = 0; i < mtabs.length; i++)
        {
            if (mtabs[i].value == name)
            {
                mtabs[i].style.backgroundColor = "yellow";
                mtabws[i].style.display = null;
            }
            else
            {
                mtabs[i].style.backgroundColor = null;
                mtabws[i].style.display = "none";
            }
        }
    },

    switchPressed: function (e)
    {
        e.stopPropagation();
        var cn = e.target.className;
        e.target.className = (cn.match(/On$/)) ? cn.replace(/On$/, "Off") : cn.replace(/Off$/, "On");
        return false;
    },


    addSkinStyles: function ()
    {
        SettingsWindow.getSkinSettings();
        Beautifier.addDynamicStyles();
        Settings.SaveSkin();

    },

    getSkinSettings: function ()
    {
        SettingsWindow.getColours(document.getElementById("skinGeneral").getElementsByTagName("input"), Settings.skin.general);
        SettingsWindow.getColours(document.getElementById("skinBorderColor").getElementsByTagName("input"), Settings.skin.border);
        SettingsWindow.getColours(document.getElementById("skinBGC").getElementsByTagName("input"), Settings.skin.bgc);
        SettingsWindow.getColours(document.getElementById("skinFont").getElementsByTagName("input"), Settings.skin.font);

        Settings.skin.border[0] = SettingsWindow.getSwitches(document.getElementById("skinBorderColor").getElementsByTagName("div"));
        Settings.skin.transparency = SettingsWindow.getSwitches(document.getElementById("skinBorderTrans").getElementsByTagName("div"));
        Settings.skin.bgc[0] = SettingsWindow.getSwitches(document.getElementById("SkinBGCBtn").getElementsByTagName("div"));
        Settings.skin.font[0] = SettingsWindow.getSwitches(document.getElementById("SkinFontBtn").getElementsByTagName("div"));
    },

    buttonPressed: function (e)
    {
        switch (e.target.value.toLowerCase())
        {
            case "exit":
                Settings.result.number = SettingsWindow.getSwitches(document.getElementsByName("cNumber"));
                Settings.result.wholerow = SettingsWindow.getSwitches(document.getElementsByName("cWholeRow"));
                Settings.result.remove = SettingsWindow.getSwitches(document.getElementsByName("cRemove"));
                Settings.result.group = SettingsWindow.getSwitches(document.getElementsByName("cGroup"));

                SettingsWindow.getSkinSettings();

                Settings.paging.interval = parseInt(document.getElementById("PInterval").value);
                if (isNaN(Settings.paging.interval) || Settings.paging.interval < 1000) Settings.paging.interval = 1500;
                Settings.result.groupSize = document.getElementById("GroupSel").selectedIndex + 2;

                Settings.Save();
                Beautifier.refreshTable();
                removeNode("Settings");
                MenuHQ.highlight();
                break;
            case "new":
                var name = prompt("Please enter new skin name", "New Skin");
                if (name != null && name != "")
                {
                    Settings.SaveSkin();
                    Settings.skin.name = name;
                    Settings.skin.id = Date.now();
                    Settings.SaveSkin();
                    SettingsWindow.displaySkinSettings();
                }
                break;
            case "delete":
                if (confirm("Delete \"" + Settings.skin.name + "\" skin?"))
                {
                    Settings.DeleteSkin();
                    SettingsWindow.displaySkinSettings();
                    Beautifier.addDynamicStyles();
                }
                break;
        }
    }
}


var MenuHQ =
    {
        addQuickMenu: function ()
        {
            if (IsNull(document.getElementById("QuickMenu")))
            {
                var QM = AddHTMLElement('<div id="QuickMenu"><ul><li><input type="button" value="▶" title="Google Services" /></li><li><hr /></li><li><input type="button" value="S" title="Settings" /></li><li><input type="button" value="R" title="Refresh Table" /></li><li><input type="button" value="➤" title="Skins" /></li><li><hr /></li><li><input type="button" value="P" title="Auto-Pager" /></li><li><input type="button" value="B" title="Blacklist On" /></li><li><input type="button" value="M" title="SafeSearch Off" /></li><li><hr /></li><section id="mColoumns"><li><input type="button" value="1" title="Single Column" /></li><li><input type="button" value="2" title="Two Columns" /></li><li><input type="button" value="3" title="Three Columns" /></li><li><input type="button" value="4" title="Four Columns" /></li></section><li><hr /></li><li><input type="button" value="A" title="About" /></li></ul></div>');

                document.body.appendChild(QM);
                //document.body.insertBefore(QM, document.body.firstElementChild);
                var bts = QM.getElementsByTagName("input");
                for (var i = 0; i < bts.length; i++) bts[i].onclick = MenuHQ.menuSelected;

                MenuHQ.highlight();
            }
        },

        menuSelected: function (e)
        {
            switch (e.target.value)
            {
                case "▶":
                    var jumpMenu = document.getElementById("JumpMenu");
                    if (jumpMenu) removeNode("JumpMenu");
                    else
                    {
                        removeNode("SkinMenu");
                        jumpMenu = document.createElement("ul");
                        jumpMenu.id = "JumpMenu";
                        jumpMenu.className = "contextMenu";
                        jumpMenu.setAttribute("skin", Settings.skin.id);
                        var params = [["Web", null], ["News", "nws"], ["Videos", "vid"], ["Images", "isch"], [null, null], ["Books", "bks"], ["Places", "plcs"],
                            ["Recipes", "rcp"], [null, null], ["Blogs", "blg"], ["Discussions", "dsc"], [null, null], ["Apps", "app"], ["Patents", "pts"]];

                        for (var i = 0; i < params.length; i++)
                        {
                            var li = document.createElement("li");
                            var url = document.URL
                            if (params[i][0])
                            {
                                var a = document.createElement("a");
                                a.textContent = params[i][0];
                                li.appendChild(a);

                                var param = params[i][1];
                                if (url.match(/&tbm=/) == param || (url.match(new RegExp("&tbm=" + param)))) li.style.backgroundColor = "cyan";

                                a.href = Privacy.cleanURL(url).replace(/&tbm=[a-z]+/, "");                                         
                                a.onclick = function (e)
                                {         
                                    e.stopImmediatePropagation();
                                    return true;
                                }
                            }
                            else
                            {
                                var hr = document.createElement("hr");
                                li.appendChild(hr);
                            }

                            jumpMenu.appendChild(li);
                        }

                        jumpMenu.style.top = (e.clientY - 20) + "px";
                        document.body.appendChild(jumpMenu);

                    }
                    break;
                case "S":
                    if (document.getElementById("SettingsExit"))
                    {
                        document.getElementById("SettingsExit").click();
                    }
                    else
                    {
                        Settings.Load();
                        SettingsWindow.showWindow()
                    }
                    break;
                case "R":
                    Settings.Load();
                    Beautifier.refreshTable();
                    break;
                case "➤":
                    var skinMenu = document.getElementById("SkinMenu");
                    if (skinMenu) removeNode("SkinMenu");
                    else
                    {
                        removeNode("JumpMenu");
                        skinMenu = document.createElement("ul");
                        skinMenu.id = "SkinMenu";
                        skinMenu.className = "contextMenu";
                        skinMenu.setAttribute("skin", Settings.skin.id);

                        var skins = Settings.GetSkinNames();

                        for (var i = 0; i < skins.length; i++)
                        {
                            var li = document.createElement("li");
                            li.value = skins[i].id;
                            var a = document.createElement("a");
                            a.textContent = skins[i].name;
                            a.href = "#";
                            li.appendChild(a);

                            if (skins[i].id == Settings.skin.id) li.style.backgroundColor = "cyan";

                            li.onmouseover = function ()
                            {
                                Settings.skin = Settings.GetSkin(this.value);
                                Beautifier.addDynamicStyles();
                            };

                            li.onmouseout = function ()
                            {
                                Settings.skin = Settings.GetSkin(this.parentElement.getAttribute("skin"));
                                Beautifier.addDynamicStyles();
                            };

                            a.onclick = function ()
                            {
                                Settings.skin = Settings.GetSkin(this.parentElement.value);
                                Settings.Save();
                                Beautifier.addDynamicStyles();
                                removeNode("SkinMenu");
                                MenuHQ.highlight();
                                return false;
                            }
                            skinMenu.appendChild(li);
                        }

                        skinMenu.style.top = (e.clientY - 10) + "px";
                        document.body.appendChild(skinMenu);
                    }
                    break;
                case "B":
                    Settings.blacklist.enabled = !Settings.blacklist.enabled;
                    Settings.Save();
                    Beautifier.refreshTable();
                    break;
                case "P":
                    Settings.paging.enabled = !Settings.paging.enabled;
                    Settings.Save();
                    if (Settings.paging.enabled && document.getElementById("pnnext")) Pager.intervalID = setInterval(Pager.loadNextPage, 250);
                    else clearInterval(Pager.intervalID);
                    Pager.loadNextPage();
                    break;

                case "M":
                    var btn = document.getElementById("safeSearchToggler");
                    if (btn) btn.click();
                    break;
                case "1":
                case "2":
                case "3":
                case "4":
                    Settings.columns = parseInt(e.target.value);
                    Settings.Save();
                    Beautifier.refreshTable();
                    break;
                case "A":
                    SettingsWindow.showWindow();
                    document.getElementsByName("MTab")[4].click();
            }

            MenuHQ.highlight();
        },


        highlight: function ()
        {
            var btns = document.getElementById("QuickMenu").getElementsByTagName("input");
            for (var i = 0; i < btns.length; i++)
            {
                switch (btns[i].value)
                {
                    case "▶":
                        btns[i].style.backgroundColor = (document.getElementById("JumpMenu")) ? "lime" : null;
                        break
                    case "S":
                        btns[i].style.backgroundColor = (document.getElementById("Settings")) ? "lime" : null;
                        break;
                    case "➤":
                        btns[i].style.backgroundColor = (document.getElementById("SkinMenu")) ? "lime" : null;
                        break;
                    case "B":
                        btns[i].style.backgroundColor = (Settings.blacklist.enabled) ? "lime" : null;
                        break;
                    case "P":
                        btns[i].style.backgroundColor = (Settings.paging.enabled) ? "lime" : null;
                        break;
                    case "F":
                        btns[i].style.backgroundColor = (Settings.pacify) ? "lime" : null;
                        break;
                    case "M":
                        btns[i].style.backgroundColor = (document.URL.match(/&safe=on/gi)) ? "hotpink" : null;
                        break;

                }
            }

            var cls = document.getElementById("mColoumns").getElementsByTagName("input");
            for (var i = 0; i < cls.length; i++) cls[i].style.backgroundColor = (cls[i].value == Settings.columns) ? "lime" : null;
        }
    };


//num = Number of items to load
var Privacy =
{
    cleanURL: function (url)
    {
        var n = url.indexOf("?");

        var prefix = url.substring(0, n).replace("webhp", "search");

        var postfix = "&" + url.substring(n + 1);

        n = postfix.indexOf("#");
        if (n >= 0) postfix = "&" + postfix.substring(n + 1);

        console.log(postfix);
        //Remove unwanted tags
        for (var i = 0; i < deleteParams.length; i++)
        {
            postfix = postfix.replace(new RegExp("[\&#]" + deleteParams[i] + "=[^&#]+", "gi"), "");
        }


        //Remove duplicated parameters. Used for history
        var params = postfix.match(/[\&#][a-z]+=/gi);
        for (var i = 0; i < params.length; i++)
        {
            var m = postfix.match(new RegExp(params[i] + "[^&#]+", "gi"));
            for (var j = 0; j < m.length - 1; j++) postfix = postfix.replace(m[j], "");
        }

        //Make sure query parameter is at the start
        var q = postfix.match(/&(q=[^&#]+)/);
        if (q) url = prefix + "?" + q[q.length - 1] + postfix.replace(/&q=[^&#]+/ig, "");
        else url = prefix + "?" + postfix;

        return url;
    },

    removeTracking: function (item)
    {
        //var links = document.getElementById("ResultTable").getElementsByTagName("a");
        var links = item.getElementsByTagName("a");

        for (var i = 0; link = links[i], i < links.length; i++)
        {
            var val = link.getAttribute("onmousedown")
            if (val && val.indexOf("return rwt(this,") == 0) link.removeAttribute("onmousedown");
        }
    },


    cleanLinks: function (el)
    {
        var links = el.getElementsByTagName("a");

        for (var i = 0; link = links[i], i < links.length; i++)
        {
            link.href = Privacy.cleanURL(link.href);
        }
    }
}


/*
=============================================================================================
Do not touch. Main function that starts the whole shebang ^_^
=============================================================================================*/

var deleteParams =
[
    //Tags taken from script http://userscripts.org/scripts/show/155719       
    'client',         //Browser Name
    'sclient',        //Browser Name
    'sourceid',       //Source of the query
    'source',         //Source of the query
    'oq',             //What you typed before you made a selection
                        //from the suggestions
    'aq',             //Google Suggest Tracking (Shows which suggestion you choose)
    'pq',             //Previous Query
    'sa',             //Google SERPs navigation behavior tracking
    'swrnum',         //The number of results the initial query returned
    'as_q',           //When searching within results, the query is added as_q
    'oi',             //Universal search: Group name
    'resnum',         //Universal search: Number of a result within the group

    //--- Maybe Tracking Params, but details unknown ---
    'gs_l',           //Location?
    'bav',
    'bvm',
    'bpcl',
    'biw',            //Client display width?
    'bih',            //Client display height?
    'w',
    'h',
    'tbnh',
    'tbnw',
    'fp',
    'ei',
    'usg',
    'sig2',
    'tbs',
    'ved',

    //--- Appearance Setting Params (default: Disabled) ---
    // If you want to delete these params, please reveal the comment out.
    //'tbo',            //tbo=1: Display search toolbar
    //'prmdo',          //prmdo=1: Expand 'services' in toolbar
    //'sout',           //sout=1: Change UI of Google Image Search to old version
    //'esrch',          //esrch=instantpreviews: Enable instant preview
    //'filter',         //filter=1: Filter similar pages
    //'hl',             //Interface language
    //'lr',             //Search target language
    //'ie',             //Query encoding
    //'oe',             //Search result encoding
    'noj',            //noj=1: No JavaScript

    //--- Unknown Params ---
    'pdx',
    'ech',
    'psi',
    'emsg',
    'facrc',
    'imgdii',
    'iact',
    'ndsp',
    'tx',
    'ty',
    //Added by me
    'pbx',
];

//encodeURIComponent();
//decodeURIComponent();

//Privacy.HijackTracking();
Settings.Load(); //Used for auto-complete in IDE

/*
Observe Mutation has slow response so we force callback first. 
NB: calling callback breaks items like #topstuff which have lazy loading content. 
Have to handle such items in a special manner*/
//Observe.callback();
Observe.bodyChanges();
