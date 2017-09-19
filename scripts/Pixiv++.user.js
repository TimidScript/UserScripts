// ==UserScript==
// @name                [TS] Pixiv++ V3 alpha
// @namespace           TimidScript
// @version             3.4.101 alpha
// @description         Development has halted until I have more time. Pixiv uses async page loading, which broke some aspects of this script. Ultimate Pixiv Script: Direct Links, Auto-Paging, Preview, IQDB/Danbooru, Filter/Sort using Bookmark,views,rating,total score. | Safe Search | plus more. Works best with "Pixiv++ Manga Viewer" and "Generic Image Viewer". 自動ページング|ポケベル|ロード次ページ|フィルター|並べ替え|注文|ダイレクトリンク
// @author              TimidScript
// @homepageURL         https://github.com/TimidScript
// @copyright           © 2012+ TimidScript, Some Rights Reserved.
// @license             https://github.com/TimidScript/UserScripts/blob/master/license.txt
// @match               *://www.pixiv.net/*
// @exclude             https://www.pixiv.net/*mode=manga&illust_id*
// @exclude             https://www.pixiv.net/*mode=big&illust_id*
// @exclude             https://www.pixiv.net/*mode=manga_big*
// @require             https://greasyfork.org/scripts/19967/code/TSL - GM_update.js
// @require             https://greasyfork.org/scripts/19968/code/TSLibrary - Generic.js
// @homeURL             https://greasyfork.org/en/scripts/4685
// @grant               GM_info
// @grant               GM_getMetadata
// @grant               GM_registerMenuCommand
// @grant               GM_getValue
// @grant               GM_setValue
// @grant               GM_listValues
// @grant               GM_deleteValue
// @grant               GM_xmlhttpRequest
// @icon                data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAIAAACRXR/mAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAZdEVYdFNvZnR3YXJlAEFkb2JlIEltYWdlUmVhZHlxyWU8AAAB/ElEQVRYR+2XMUpEMRCGvY0n8AKewAt4Ai/gARYruy2txM7CwlLcQsFiG0ELRQsREREbRYstLNaPTHwMs75NJrx9rJCfv1jzJsn3MpPkubI6GC2hK5bHFcvjiuVxxfK4YnncDdbG3njz4FJ7bffMxLhcjgXK8Pxh/Pg+bdHzx2R//ESY6ZjjEqzt45vb1684eRAE8J3evWF+fE6+44MgWrxwPiyAIIizTafA0bI+vDBhmDyCGOOCdk7uTcwc52Ixt84XcExsYma9dXitV+7o6sUEtDkLiyUxeaGqTEybSZ/um7lmaSxeUUbUo+djYdYsdgv6M+nGCSzNxHvLb+TCwroAclI5D4sFl4GEiRb5E3mxzIIlT7V5WHSWxFFb0iKDIi8W1jXQDNjmRBJlwZpNJ4OiAiydx2T3dMlzUjdFGkctwmrKFIFonhqnsbTjqEVYvF7svFRYOokgmqfG/WHpWyt5qPaExaaJPYOSJ2pPWDqDycLCfWBxSsVuQTl3/MKxzFWdLHZxIVbmJ0pzfYkye+FCLCTfxGRk9oKjogHSWw+58l6OZcSXKrWMdcpENC72oznOE16dmVgtvcWMZDm9QOJuSp6skU3tXv8hi1DOQinw/8fSpyIlRaZMQIfOxQIiEv2KHWdiOrQvib25YnlcsTyuWB5XLI8rVr4Hox+cjUxd3KUvOgAAAABJRU5ErkJggg==
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
********************************************************************************************
Known Bugs:
 - Minor Issue: Duplicate thumbnail do not have a hotbox.

TODO: Enable the sorting of bookmark recommendations
TODO: Consider using mixed fetch methods as the api is a lot faster...
      Maybe different levels of metadata fetching. Level 1 - API, Level 2 HTML, Level 3 Response & Bookmark Count.
      Also stages of thumbnail update. Get all links using API, then use slower methods to get extra information.
      Also extract all information you can from thumbnails, such as response, bookmark and fullsize URL.
TODO: Add auto filter to remove private/blocked and deleted illustrations from bookmark

 Version History
------------------------------------
3.4.101 Alpha (2017-09-16)
 - Fixed paginator issue. The script has dropped to alpha as changes in Pixiv make the script useless in search. It uses asyn page loading, making it hard to have multiple pages.
 - Pre-release as I do not have the time to work on it at the moment.
3.3.100 (2017-06-11)
 - Does not relign if low resolution when opening up the menu
3.3.99 (2017-04-18)
 - Quickfix for changes to support HTTPS
3.3.98 (2017-04-11)
 - Bugfix for changes in Pixiv rating system
3.3.97 Beta (2017-02-10)
 - Account added
3.3.96 Beta (2017-01-07)
 - BugFix for changes in Pixiv
3.3.95 Beta (2016-11-11)
 - Added some testing code.
 - Link to Pixiv Whitecube alpha
3.3.94 Beta (2016-10-22)
 - Preview date format is now y-m-d
3.3.93 Beta (2016-07-24)
 - Date added to preview
3.3.92 Beta (2016-06-05)
 - Added link to Manga page in page info
3.3.91 (2016-05-27)
 - Altered license
3.3.90 Beta (2016-05-25)
 - Moving to GreasyFork and preparing to remove OUJS files
3.3.89 Beta (2016-04-03)
 - Bug Fix to support private (locked/blocked) illustrations
3.3.88 Beta (2016-04-03)
 - //@updateURL added
3.3.87 Beta (2016-04-03)
 - Bug Fix: Gets extension of single paged manga
 - Changed license to GPL-3
3.3.86 Beta (2016-03-23)
 - Commented out debug code
3.3.85 Beta (2016-03-23)
 - Removed legacy code
 - Corrected display on result info
3.3.84 Beta (2016-02-14)
 - Temporary fix for sidebar issue moving gallery to the right
 - Support for TamperMonkey window object separation
3.3.83 Beta (2016-02-14)
 - Compatibility issues with Google Chrome
3.3.82 Beta (2015-12-15)
 - Minor change to CSS styles
3.3.81 Beta (2015-09-30)
 - Bug Fix: Gallery indentation when you toggle sidebar
 - Bug Fix: IQDB link on update selection code fix
 - Replaced base64 bmp icon with png version
3.3.80 Beta (2015-09-30)
 - Bug Fix: Thumbnail Title URL Syntax Fix
3.3.79 Beta (2015-08-01) Pixiv++ Minor Release that brings in a lot of new changes to the interface and inner workings.
Close to being a major release due to the amount of changes done.
 - Bug Fix: Manga and Illustration filter fixed. Before I wasn't getting the tags but some japanese keywords
 - Bug Fix: Artist meta data is now correctly stored in artist name, used by Pixiv for artist's preview box
 - Bug Fix: Manga Preview window now includes artists information (don't know when it got broken)
 - Bug Fix: onload for image stopped being supported a long time ago. Fixed it.
 - Bug Fix: Exclude mode=big
 - Partial settings reset needs to be done. By default auto-fetching is off.
 - Changes in CSS styling to match closer to Pixiv
    - Removed the awful Yellow, Green and Pink colour scheme
 - Change the thumbnail information layout, spacing.
 - No wrapping of metadata text. Overflow now is hidden
 - Optimised code to do with IQDB and now using image size 240 as larger sizes fail
 - Optimised filtering code using Styles
 - Removed visited styling and thumbnail frame as not everyone likes it. A Linx Amender rule for it already exists.
 - Exclude manga viewing pages from script
 - Used TSL-Generic library and removed duplicate codes
 - Used CSS selector instead of xpath in many cases
 - Preview code overhall
    - Preview thumbnails are bigger for manga
    - Preview hight and time are in general settings now
    - Preview support for most thumbnails, including bookmark/user recommendations, feeds and ranking
 - Image size is now mentioned as part of metadata
 - Improved sorting
 3.2.78 (2015-08-23)
 - Filter fixed. Neat code provided by HoldMyPizza from OUJS
3.2.77 (2015-07-26)
 - Bug Fix: Corrected latest fix
3.2.76 (2015-07-25)
 - Bug Fix: Capture new homepage url
3.2.75 (2015-06-27)
 - Bug Fix: Default preview time and height were switched
 - Bug Fix: Removal of extra title from thumbnail
 - Support for other 3rd party of login by adding full support of xhr to be default rather than GM_xhr. Default request method is now is xhr
 - Removed iframe support
3.2.74 (2015-06-06)
 - Bug fixes to support own illustrations both public and hidden
3.2.73 (2015-05-30)
 - Outgoing links are direct now
 - Bug Fix: getIllustID extracts id from unique urls now
        http://www.pixiv.net/member_illust.php?illust_id=1111111&mode=medium
        http://www.pixiv.net/member_illust.php?mode=medium&illust_id=1111111
 - Bug Fix: Bookmark count was not being attained in "Works" page (3)
3.2.72 (2015-05-25)
 - Bug fix: Removes the token information from image link (illustURL)
3.2.71 (2015-05-16)
 - As of 11/05/2015 the Phone API (SPAPI) is dead. Using public API and HTML instead.
 - Single paged mangas will be marked as illustrations rather than manga as in most cases that is the case
 - Changed much of the metadata and information used
 - Created a separate library for the illustration data getter
 - Manga hotbox preview images dimensions unfixed
 - Removed a lot of redundant code. including linker methods, Cache and rated paging
    - GM_setValue("LinkerMethod", 2);  //[2]
    - GM_setValue("EnableCache", true); //[3]
    - GM_setValue("APIAgeRating", true); //[4]
 - RequestBoomarkCount setting added
 - Huge amount of optimisation and removal of redundant code
 - IQDB now uses size 240 (240x480)
 - Need to remove AgeRating searches. Should only be a filter.
3.1.70 (2015-05-08)
 - Page count added in information box
3.1.69 (2015-04-14)
 - Hidden comix ads from the illustration page
 - Changed the illustration page interface. Illustration information is always shown and thumbnails for
 pages are bellow the illustration.
.
.
.
*************************************************************************************************/
(function ()
{
    if (window.self !== window.top) return;

    if (/^\/whitecube/i.test(location.pathname))
    {
        if (GM_getValue("NONONONONO", false)) return;

        setTimeout(function ()
        {
            if (document.getElementById("SideMenuBar")) return;
            var h = document.createElement("div");
            h.setAttribute("style", "z-index: 5000; position: fixed; top: 10px; left: 40px; display:inline-block;");

            var el = document.createElement("a");
            el.href = "https://greasyfork.org/scripts/24502";
            el.textContent = "Pixiv++: Install Pixiv Whitecube";
            el.setAttribute("style", "display:inline-block;padding: 3px 6px; background-color:white; border: 1px solid red;color:black;font-weight:900;");
            h.appendChild(el);

            el = document.createElement("button");
            el.textContent = "Do not show this again";
            el.setAttribute("style", "display:inline-block;padding: 3px 6px; background-color:white;border: 1px black solid; margin-left: 5px;color: red;font-weight:900;cursor:pointer;");
            el.onclick = function ()
            {
                GM_setValue("NONONONONO", true);
                TSL.removeNode(this);
            };
            h.appendChild(el);

            document.body.appendChild(h);


            if (GM_getValue("MessageNotSeen", true))
            {
                if (confirm("Please install Pixiv Whitecube (Alpha). In time it will be integrated with Pixiv++."))
                {
                    GM_setValue("MessageNotSeen", false);
                }
            }
        }, 1000);

        return;
    }

    var IsIllustrationPage = (document.URL.indexOf("https://www.pixiv.net/member_illust.php?") != -1 && document.URL.match(/mode=medium/i) != null);
    var Illustrations = {};

    /*
        00 Illustration page
        01 Front page
        03 Artist work page
        04 Personal Work page
        05 Personal Bookmarks page
        06 Artist Bookmark
        07 Works from favourite artists
        07 New illustrations
        09 Search
        10 Bookmark recommendations */
    var PAGETYPE = (function ()
    {
        var pathname = document.location.pathname;
        if (IsIllustrationPage) return 0;
        else if (document.URL.match(/https:\/\/www\.pixiv\.net\/((cate_r18|mypage|member)\.php|$)/i)) return 1;
        else if (document.URL.match(/https:\/\/www\.pixiv\.net\/member_illust\.php\?id/i)) return 3; //Artist Work Page
        else if (document.URL.match(/https:\/\/www\.pixiv\.net\/member_illust\.php/i)) return 4; //Personal Work Page
        else if (document.URL.match(/https:\/\/www\.pixiv\.net\/bookmark\.php/i)) return 5;  //Personal Bookmarks, Added new bookmarks
        else if (document.URL.match(/https:\/\/www\.pixiv\.net\/bookmark\.php\?id=/i)) return 6; //Artist Bookmark
        else if (document.URL.match(/https:\/\/www\.pixiv\.net\/bookmark_new_illust(_r18)?\.php/i)) return 7; //Works from favourite artists
        else if (document.URL.match(/https:\/\/www\.pixiv\.net\/new_illust(_r18)?\.php/i)) return 8; //New illustrations
        else if (pathname == "/bookmark_detail.php") return 10;
        else if (document.URL.match(/https:\/\/www\.pixiv\.net\/search\.php\?/i)) return 9; //Search
        console.log("PAGETYPE: ", PAGETYPE);
        return -1;
    })();


    console.info("Pixiv++ (" + PAGETYPE + ")");

    if (!(typeof GM_getValue === "function" && GM_getValue("", "?") === "?"))
    {
        GM_setValue = function (key, val) { localStorage.setItem(key, val); };
        GM_getValue = function (key, def) { return (localStorage.getItem(key) ? localStorage.getItem(key) : def); }
    }

    /*
    ===================================================================================================================================
     Handles all functions to do with getting and adding all Illustration links and metadata. This includes: Image Links,
     IQDB, Bookmark Count, Views, Rating and score.
    ===================================================================================================================================*/
    var IllustrationLinker =
       {
           //Contains all thumbnail links that need to be parsed
           processList: new Array(),
           //Max of simultaneous link calls. The higher the count the more stress on server and ISP
           simultaneousCallsMAX: 6,
           simultaneousCalls: 0,
           intervalID: null,
           msgHandle: null,
           thumbcounter: 0,
           //Used by the pager when running in "SafeMode" as it temporarily removes session cookie
           shortPause: false,
           //If false the thumbnail interval parser stops running
           enabled: false, //First time it gets turned on is when the SideBar is loaded
           TIMESTART: 0,
           TIMEEND: 0,
           requestBookmarkCount: GM_getValue("RequestBookmarkCount", 0),


           getIllustID: function (url)
           {
               var id = url.replace(/.+www\.pixiv\.net\/member_illust\.php(\?.+&|\?)illust_id=(\d+)(&.+)?/, "$2");
               id = id.replace(/.+i\d+\.pixiv\.net\/(img|c\/).+\/(\d+)(_.+)?\.\w+(\?.+)?/, "$2");
               return id;
           },

           getIllust: function (id)
           {
               var properties = "getExtension userID userName userProfileImageURL illustType illustID illustTitle illust128URL illust150URL illust240URL illust480URL illust600URL illust1200URL illustURL illustSize pageCount description time tags tools ratings totalRatings viewCount bookmarkCount responseCount R18 date";
               var illust = Illustrations["i" + id];

               if (!illust)
               {
                   illust = {};
                   Illustrations["i" + id] = illust;
               }

               return makeStruct(properties, illust);
           },

           addToProcessList: function (id)
           {
               for (var i = 0; i < IllustrationLinker.processList.length; i++) if (IllustrationLinker.processList[i] == id) return;
               IllustrationLinker.processList.push(id);
           },

           /*
           -------------------------------------------------------------------------------------------
            Parses through all the image links and add full image link
           -------------------------------------------------------------------------------------------*/
           getContainerLinks: function (containers, pageNumber)
           {
               if (!containers) return;

               if (IsIllustrationPage) ////Illustration Page that excludes Novels
               {
                   IllustrationLinker.getDataHTML(IllustrationLinker.getIllustID(document.URL))
                   return;
               }

               for (var i = 0, i; container = containers[i], i < containers.length; i++)
               {
                   var link, id, thumbnail, thumbnails = container.querySelectorAll(".image-item");
                   for (var j = 0; thumbnail = thumbnails[j], j < thumbnails.length; j++)
                   {
                       link = thumbnail.querySelector("a");

                       if (!link) continue;
                       id = IllustrationLinker.getIllustID(link.href);
                       thumbnail.id = "i" + id;
                       thumbnail.setAttribute("illustration-id", id);
                       thumbnail.setAttribute("pppThumb", ++IllustrationLinker.thumbcounter);

                       if (pageNumber > 0)
                       {
                           TSL.addClass(thumbnail, "pppPage" + (pageNumber % 4));
                           thumbnail.setAttribute("page", pageNumber);
                       }

                       if (IllustrationLinker.getIllust(id).illustID)
                       {
                           PaginatorHQ.tidyThumbnail(id);
                           IllustrationLinker.createLinksBox(id);
                       }
                       else if (thumbnail.querySelector('[src*="limit_mypixiv"]')) //Private Images
                       {
                           TSL.addClass(thumbnail, "private");
                       }
                       else IllustrationLinker.addToProcessList(id);
                   }
               }

               PaginatorHQ.displayResultInfo();
               if (this.enabled) this.runIntevalThumbnailParser();
           },

           /*
           -------------------------------------------------------------------------------------------
            Contains the interval that requests image information
           -------------------------------------------------------------------------------------------*/
           runIntevalThumbnailParser: function ()
           {
               IllustrationLinker.TIMESTART = new Date();

               if (!IllustrationLinker.msgHandle) IllustrationLinker.msgHandle = DisplayMessage("Getting metadata for [" + IllustrationLinker.processList.length + "] illustrations...");
               if (IllustrationLinker.intervalID == null && IllustrationLinker.enabled) IllustrationLinker.intervalID = setInterval(processNextID, 100);

               function processNextID()
               {
                   //shortPause used when removing session cookie for safe page search
                   if (IllustrationLinker.shortPause || IllustrationLinker.simultaneousCalls >= IllustrationLinker.simultaneousCallsMAX) return;

                   if (IllustrationLinker.processList.length == 0 && IllustrationLinker.simultaneousCalls == 0)
                   {
                       IllustrationLinker.TIMEEND = new Date();
                       //console.log(IllustrationLinker.TIMEEND - IllustrationLinker.TIMESTART);
                       clearInterval(IllustrationLinker.intervalID);
                       IllustrationLinker.intervalID = null;
                       RemoveMessage(IllustrationLinker.msgHandle);
                       IllustrationLinker.msgHandle = null;
                       DisplayMessage("Illustration metadata acquired", 1000);
                   }
                   else if (IllustrationLinker.processList.length % 5 == 0)
                   {
                       IllustrationLinker.msgHandle.textContent = "Getting metadata for [" + (IllustrationLinker.simultaneousCalls + IllustrationLinker.processList.length) + "] illustrations...";
                       PaginatorHQ.displayResultInfo();
                   }

                   //Last check
                   if (IllustrationLinker.enabled && IllustrationLinker.processList.length > 0)
                   {
                       IllustrationLinker.simultaneousCalls++;
                       IllustrationLinker.getDataHTML(IllustrationLinker.processList.shift());
                   }
               }
           },

           /*
           -------------------------------------------------------------------------------------------
            If "value" is set to true the linker is temporarily paused. This is used only for short
            term pausing. switchOff is used for longer pausing method.
           -------------------------------------------------------------------------------------------*/
           pause: function (value)
           {
               IllustrationLinker.shortPause = value;
               if (value && msgHandle) msgHandle.textContent = "";
           },

           /*
           -------------------------------------------------------------------------------------------
            Thumbnail parser interval is cleared and the link generation halts until it switchOn
            is called.
           -------------------------------------------------------------------------------------------*/
           switchOff: function ()
           {
               IllustrationLinker.enabled = false;
               clearInterval(IllustrationLinker.intervalID);
               IllustrationLinker.intervalID = null;
               if (IllustrationLinker.msgHandle) RemoveMessage(IllustrationLinker.msgHandle);
               IllustrationLinker.msgHandle = null;
           },

           switchOn: function ()
           {
               IllustrationLinker.enabled = true;
               IllustrationLinker.runIntevalThumbnailParser();
           },

           /*
           -------------------------------------------------------------------------------------------
            Extracts data from illustration page
           -------------------------------------------------------------------------------------------*/
           setMetadata: function (id, doc)
           {
               var el, m, context
               metadata = IllustrationLinker.getIllust(id),
               script = doc.evaluate("//div[@id='wrapper']//script[contains(text(),'pixiv.context.illustId')]", doc, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

               unsafeWindow.eval("pixiv" + id + "= {}; pixiv" + id + ".context= {};");
               script.innerHTML = script.innerHTML.replace(/pixiv\.context/g, "pixiv" + id + ".context");
               unsafeWindow.eval(script.innerHTML);
               context = unsafeWindow["pixiv" + id].context;

               metadata.userID = context.userId; //el.parentElement.href.match(/member\.php\?id=(\d+)/i)[1];
               metadata.userName = context.userName; //el.nextElementSibling.textContent;
               metadata.account = doc.querySelector(".tab-feed").href.replace(/.+\/stacc\//, "");
               el = doc.querySelector(".user-image");
               if (el)
               {
                   metadata.userProfileImageURL = el.src;
                   if (el.src.match("/profile/")) metadata.userLoginName = el.src.match(/\/profile\/([^\/])+\//i)[1];
               }

               metadata.illustID = id;
               metadata.illustTitle = context.illustTitle; //doc.querySelector('meta[property="og:title"]'); //Translation scripts mess with the title
               metadata.R18 = 0;
               if (doc.querySelector(".r-18")) metadata.R18 = 1;
               if (doc.querySelector(".r-18g")) metadata.R18 = 2;
               metadata.pageCount = 1;
               metadata.illustSize = context.illustSize;
               metadata.date = doc.querySelector(".work-info .meta li").textContent;


               if (doc.querySelector(".tools")) metadata.tools = doc.querySelector(".tools").textContent;

               //metadata.tags = doc.querySelector('meta[name="keywords"]').getAttribute("content");
               //metadata.tags = "";
               //els = doc.querySelectorAll(".tags-container .tags .tag .icon-pixpedia");
               //for (var i = 0; i < els.length; i++) metadata.tags += " " + els[i].getAttribute("data-tooltip").match(/「(.+)」/)[1];

               metadata.tags = [].map.call(doc.querySelectorAll('li.tag a.text'), function (v, i)
               {
                   return v.childNodes[0].textContent;
               }).join(' ');

               metadata.tags = metadata.tags.trim();


               var baseURL = doc.querySelector('meta[property="og:image"]');
               if (baseURL) baseURL = baseURL.getAttribute("content").replace(/\/img-inf\/(.+)_s/, "/c/DIMENSIONS/img-master/$1_master1200");
               baseURL = baseURL.replace(/128x128|150x150/, "DIMENSIONS");

               metadata.illust128URL = baseURL.replace("DIMENSIONS", "128x128");
               metadata.illust150URL = baseURL.replace("DIMENSIONS", "150x150");
               metadata.illust240URL = baseURL.replace("DIMENSIONS", "240x480");
               metadata.illust480URL = baseURL.replace("DIMENSIONS", "480x960");
               metadata.illust600URL = baseURL.replace("DIMENSIONS", "600x600");
               metadata.illust1200URL = baseURL.replace("DIMENSIONS", "1200x1200");
               metadata.illustURL = baseURL.replace(/c\/DIMENSIONS\/img-master(.+)\/.+/, "img-original$1/" + metadata.illustID + "_p0.jpg");

               metadata.description = doc.querySelector('meta[property="og:description"]');
               metadata.description = (metadata.description) ? metadata.description.getAttribute("content") : doc.querySelector("._unit .caption").innerHTML;

               metadata.bookmarkCount = "?";

               metadata.viewCount = parseInt(doc.querySelector(".view-count").textContent);
               metadata.ratings = parseInt(doc.querySelector(".rated-count").textContent);
               //metadata.totalRatings = parseInt(doc.querySelector(".score-count").textContent);

               el = doc.querySelector(".response-in-work-more");
               metadata.responseCount = (el) ? parseInt(el.textContent.match(/\d+/)[0]) : 0;
               if (context.ugokuIllustFullscreenData)
               {
                   metadata.illustType = 3;
                   metadata.illustURL = context.ugokuIllustFullscreenData.src;
               }
               else
               {
                   el = doc.querySelector(".works_display ._layout-thumbnail img");

                   el = doc.querySelector(".original-image");
                   if (el) //Single Image
                   {
                       metadata.illustType = 1;
                       metadata.illustURL = el.getAttribute("data-src").replace(/\?.+/, "");
                   }
                   else //Manga
                   {
                       metadata.getExtension = true;
                       metadata.illustType = 2;

                       el = doc.querySelectorAll(".work-info .meta li")[1];
                       m = el.textContent.match(/(\d+)P$/i);
                       if (m)
                       {
                           metadata.pageCount = parseInt(m[1]);
                       }
                       else //Single paged manga
                       {
                           metadata.pageCount = 1;
                           metadata.illustType = 1;
                       }
                   }
               }
               metadata.bookmarkCount = IllustrationLinker.getBookmarkCount(id);
               //if (IsIllustrationPage) console.log(metadata);
               return metadata;
           },

           /*
           -------------------------------------------------------------------------------------------
            Gets bookmark count from thumbnail if one exists
           -------------------------------------------------------------------------------------------*/
           getBookmarkCount: function (id)
           {
               var thumbnail = document.getElementById("i" + id);

               if (thumbnail)
               {
                   var bm = thumbnail.querySelector(".bookmark-count");
                   if (bm) return parseInt(bm.textContent);
                   if (PAGETYPE <= 1 || PAGETYPE == 3 || PAGETYPE == 7 || PAGETYPE == 8 || PAGETYPE == 10) return "?"; //Pages that do not contain bookmark information
                   else return 0;
               }

               return "?";
           },

           /*
           -------------------------------------------------------------------------------------------
            Creates main links that are used by Downloaders. These links can be hidden. It also
            creates calls the creation of the hotbox.
           -------------------------------------------------------------------------------------------*/
           createLinksBox: function (id)
           {
               var thumbnails = document.querySelectorAll('[illustration-id="' + id + '"], #i' + id);
               metadata = IllustrationLinker.getIllust(id);



               //TODO: Need to clean up this code.
               clb(thumbnails[0])
               for (var t = 1; t < thumbnails.length, thumbnails[t]; t++) clb(thumbnails[t]);



               function clb(thumbnail)
               {
                   var linksBox = document.createElement("div");
                   linksBox.className = "pppLinksBox";

                   linksBox.setAttribute("data-json", JSON.stringify(metadata));
                   linksBox.setAttribute("data-base", metadata.illustURL.replace(/.+img-(master|original|zip-ugoira)\/img\/(.+)\/\d+(_p\d+)?_.+/, "$2"));

                   if (IsIllustrationPage && IllustrationLinker.getIllustID(document.URL) == id)
                   {
                       TSL.addStyle("LINXBOX", ".pppLinksBox {margin: 0 50px; text-align: center;}");
                       var el = document.querySelector(".works_display");
                       el.parentNode.insertBefore(linksBox, el.nextSibling);
                   }
                   else
                   {
                       PaginatorHQ.tidyThumbnail(id);
                       if (!thumbnail.hasAttribute("pppThumb")) return;
                       thumbnail.querySelector(".illustmeta").insertBefore(linksBox, thumbnail.querySelector(".count-list"));
                   }

                   if (PAGETYPE > 1)
                   {
                       var evaluator = new XPathEvaluator(); //document.evaluate
                       var sortButton = evaluator.evaluate("//a[@name='Sort']", SideBar.iDoc.body, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
                       if (sortButton.firstElementChild.style.borderColor == "rgb(0, 255, 0)") sortButton.firstElementChild.style.borderColor = "#F00";
                   }

                   if (metadata.illustType != 2) //Single Illustration
                   {
                       var directLink = document.createElement("a");
                       directLink.textContent = "[" + ((metadata.illustType == 3) ? "🎥" : "❀") + "]"; //S❂❀

                       directLink.href = metadata.illustURL;
                       linksBox.appendChild(directLink);
                   }
                   else //Manga Illustration
                   {
                       linksBox.setAttribute("pages", metadata.pageCount);
                       var mangaLinks = '[ ';

                       for (var i = 0, href; i < metadata.pageCount; i++)
                       {
                           href = metadata.illustURL.replace(/_p\d+/, "_p" + i);

                           if (IsIllustrationPage) mangaLinks += '<a title ="Page #' + i + '" href="' + href + '">' + i + '</a> | ';
                           else mangaLinks += '<a title ="Page #' + i + '" href="' + href + '">' + (((i + 1) % 5 == 0) ? "◆" : "◇") + '</a>'
                       }

                       mangaLinks = mangaLinks.replace(/ | $/, "") + "]";
                       linksBox.innerHTML = mangaLinks;
                   }




                   if (IsIllustrationPage)
                   {
                       TSL.addStyle("AddBorder", ".work-tags, .works_display  {margin-bottom: 0px;}");
                       //TSL.addStyle("VLB", "#VisibleLinkBox {background-color: red; height: 40px; margin: 5px 20px 10px 20px;}");
                       TSL.addStyle("VLB", "#VisibleLinkBox {margin: 1px 20px 0px 20px; background-color: gray;}");
                       var linkbox = document.createElement("section");
                       linkbox.id = "VisibleLinkBox";
                       linkbox.className = "work-tags";

                       var metascore = [metadata.bookmarkCount, metadata.viewCount, metadata.ratings, metadata.totalRatings, metadata.responseCount];
                       var metaname = ["★", "Views", "Rating", "Total", "Response"];

                       if (metadata.illustSize) linkbox.innerHTML = "<a class='meta-box'>" + metadata.illustSize[0] + "x" + metadata.illustSize[1] + "</a>";
                       linkbox.innerHTML += "<a class='meta-box iqdb-link' href='https://" + Settings.IQDBType + ".IQDB.org/?url=" + ((metadata.illustType == 3) ? metadata.illust480URL : metadata.illust150URL) + "&NULL'>IQDB<a>"
                       + '<a href="/response.php?type=illust&amp;id=' + metadata.illustID + '" class="image-response-count ui-tooltip" data-tooltip="Received ' + metascore[4] + ' image responses"><i class="_icon sprites-image-response-badge"></i>' + metascore[4] + '</a>'
                       + '<a href="/bookmark_detail.php?illust_id=' + metadata.illustID + '" class="bookmark-count ui-tooltip" data-tooltip="Received ' + metascore[0] + ' bookmarks"><i class="_icon sprites-bookmark-badge"></i>' + metascore[0] + '</a>';

                       if (metadata.pageCount > 1) linkbox.innerHTML = "<a class='meta-box page-count' href='https://www.pixiv.net/member_illust.php?mode=manga&illust_id=" + metadata.illustID + "'>P" + metadata.pageCount + "</a>" + linkbox.innerHTML;

                       for (var i = 1; i < 4; i++) linkbox.innerHTML += "<span class='meta-box'>" + metaname[i] + " " + metascore[i] + "</span>";

                       var el = document.querySelector(".work-tags");
                       el.parentNode.insertBefore(linkbox, el.nextElementSibling);

                       if (metadata.illustType == 2 && metadata.pageCount > 1) //Manga
                       {
                           var previewThumbs = document.createElement("section");
                           previewThumbs.setAttribute("style", "text-align: center;");
                           linksBox.parentElement.insertBefore(previewThumbs, linksBox.nextElementSibling);

                           var ShowThumbs = document.createElement("button");
                           ShowThumbs.textContent = "Show Thumbnails";
                           ShowThumbs.setAttribute("style", "display: inline-block; width: 300px; height: margin: 10px 0 20px 0; padding: 5px;");
                           previewThumbs.appendChild(ShowThumbs);

                           TSL.addStyle("MangaT1", "#MangaThumbnails {margin: 10px 3px; box-shadow: 0px 0px 1px 2px black; padding:2px;}");
                           TSL.addStyle("MangaT2", "#MangaThumbnails img {margin: 3px 3px; box-shadow: 3px 3px #9292E7}");

                           ShowThumbs.onclick = function ()
                           {
                               if (this.shown)
                               {
                                   ShowThumbs.textContent = "Show Thumbnails";
                                   document.getElementById("MangaThumbnails").style.display = "none";
                                   this.shown = false;
                               }
                               else
                               {
                                   metadata = IllustrationLinker.getIllust(IllustrationLinker.getIllustID(document.URL));
                                   ShowThumbs.textContent = "Hide Thumbnails";
                                   this.shown = true;
                                   if (document.getElementById("MangaThumbnails")) document.getElementById("MangaThumbnails").style.display = "block";
                                   else
                                   {
                                       var thumbs = document.createElement("section");
                                       thumbs.id = "MangaThumbnails";
                                       linksBox.parentElement.insertBefore(thumbs, previewThumbs.nextElementSibling);
                                       for (var i = 0; i < metadata.pageCount; i++)
                                       {
                                           el = document.createElement("a");
                                           el.href = metadata.illustURL.replace(/(_p)0/i, "$1" + i);
                                           el.innerHTML = "<img src='" + metadata.illust240URL.replace(/_p\d+/i, "_p" + i) + "'/>";
                                           //el.innerHTML = "<img src='" + metadata.illust150URL.replace(/_p\d+/i, "_p" + i) + "'/>";
                                           thumbs.appendChild(el);
                                       }
                                   }
                               }
                           }
                       }
                   }
                   else
                   {
                       var IQDBLink = document.createElement("a");
                       IQDBLink.textContent = "IQDB";
                       IQDBLink.className = "meta-box iqdb-link";
                       thumbnail.querySelector(".count-list").appendChild(IQDBLink);
                       PaginatorHQ.updateIQDBLink(thumbnail);
                   }

                   if (PAGETYPE > 1) PaginatorHQ.filterThumbnail(thumbnail);
               }



               if (!IsIllustrationPage || !GM_getValue("TimidScript", false) || document.getElementById("PreviewTester")) return;
               //#region TESTING
               //INFO: View all different sized images
               TSL.addStyle("PreviewTesterCCC", "#PreviewTester hr {background-color: black; height: 4px; margin: 3px 0; box-shadow: 0 0 2px 2px yellow;}");
               var previews = document.createElement("section");
               previews.id = "PreviewTester";
               var el = document.querySelector("._work-detail-unit");
               el.insertBefore(previews, el.lastElementChild);

               el = document.createElement("input");
               el.setAttribute("style", "width:100%;")
               el.value = el.value = metadata.illust128URL;
               previews.appendChild(el);
               el = document.createElement("button");
               el.setAttribute("style", "width:100%;")
               el.textContent = "Add above images";
               el.onclick = function (e)
               {
                   var els = document.querySelectorAll(".test_image");
                   for (var i = 0; i < els.length; i++) TSL.removeNode(els[i]);
                   displayAllSizes(this.previousElementSibling.value);
               }
               previews.appendChild(el);

               function displayAllSizes(base)
               {
                   console.info(base);
                   base = base.replace(/.+img-(master|original|zip-ugoira)\/img(\/.+\/\d+)(_p\d+)?_.+/, "$2");
                   console.log(base);
                   var cu = [], wc = []; //current, whitecube

                   var urls = {
                       cu: [],
                       wc: []
                   };


                   addImage("https://i3.pixiv.net/c/128x128/img-master/img" + base + ((metadata.illustType == 3) ? "" : "_p0") + "_square1200.jpg");
                   addImage("https://i.pximg.net/c/250x250_80_a2/img-master/img" + base + ((metadata.illustType == 3) ? "" : "_p0") + "_square1200.jpg");

                   previews.appendChild(document.createElement("hr"));

                   base = "/img-master/img" + base;
                   var ar = ["128x128", "150x150", "240x480", "480x960", "600x600", "1200x1200"];
                   for (var i = 0; i < ar.length; i++) addImage("https://i4.pixiv.net/c/" + ar[i] + base + ((metadata.illustType == 3) ? "" : "_p0") + "_master1200.jpg");

                   previews.appendChild(document.createElement("hr"));

                   ar = ["c/400x250_80", "c/960x400_80", ""];
                   for (var i = 0; i < ar.length; i++) addImage("https://i.pximg.net/" + ar[i] + base + ((metadata.illustType == 3) ? "" : "_p0") + "_master1200.jpg");
               }

               function addImage(source)
               {
                   console.log(source);
                   var con = document.createElement("div");
                   con.className = "test_image"
                   var img = document.createElement("img");
                   con.appendChild(img);
                   previews.appendChild(con);
                   img.src = source;
                   img.title = source;
               }
               //#endregion
           },

           /*
           -------------------------------------------------------------------------------------------
            Gets illustration information using Illustration page
            noincrement is used when mouse hover. It does not increment simultaneousCalls
           -------------------------------------------------------------------------------------------*/
           getDataHTML: function (id, noincrement)
           {
               var illust = IllustrationLinker.getIllust(id), START = new Date();

               var marks = document.querySelectorAll('.marked4linker[illustration-id="' + id + '"]');
               for (var i = 0; i < marks.length; i++) TSL.addClass(marks[i], "linking");


               if (IsIllustrationPage && IllustrationLinker.getIllustID(document.URL) == id) ////Illustration Page that excludes Novels
               {
                   IllustrationLinker.setMetadata(id, document);
                   console.log("HTML", metadata);
                   finalise();
               }
               else if (IllustrationLinker.getIllust(id).illustID) finalise();
               else if (Settings.requestMethod & 4)
               {
                   //BUG: Potential loop as the get can fail
                   GM_xmlhttpRequest({
                       url: "https://www.pixiv.net/member_illust.php?mode=medium&illust_id=" + id,
                       method: "GET",
                       timeout: 15000,
                       headers: { "User-agent": navigator.userAgent, "Accept": "text/html", Referer: "https://www.pixiv.net" },
                       onload: function (response)
                       {
                           if (response.status == 200) //Response 200 implies that link exist and then most likely a Manga (or an Error XD)
                           {
                               var END = new Date();
                               //console.info(END - START);
                               var doc = new DOMParser().parseFromString(response.responseText, "text/html");
                               IllustrationLinker.setMetadata(id, doc);
                           }

                           finalise();
                       }
                   });
               }
               else
               {
                   var oReq = new XMLHttpRequest();
                   oReq.open("GET", "https://www.pixiv.net/member_illust.php?mode=medium&illust_id=" + id, true);
                   oReq.responseType = "text";
                   oReq.timeout = 15000;
                   oReq.onload = function (e)
                   {
                       if (oReq.status == 200) //Response 200 implies that link exist and then most likely a Manga (or an Error XD)
                       {
                           var END = new Date();
                           //console.info(END - START);
                           var doc = new DOMParser().parseFromString(oReq.response, "text/html");
                           IllustrationLinker.setMetadata(id, doc);
                       }

                       finalise();
                   };
                   oReq.send();
               }
               function finalise()
               {
                   if (illust.bookmarkCount == "?" &&
                       (IllustrationLinker.requestBookmarkCount == 2 || (IllustrationLinker.requestBookmarkCount == 1 && !IsIllustrationPage)))
                   {
                       getBookmarkCount();
                   }
                   else if (illust.getExtension)
                   {
                       illust.getExtension = false;
                       getMangaExtension();
                   }
                   else
                   {
                       IllustrationLinker.createLinksBox(id);
                       if (!noincrement && IllustrationLinker.simultaneousCalls > 0) IllustrationLinker.simultaneousCalls--;
                       if (IllustrationLinker.processList.length < 5) PaginatorHQ.displayResultInfo();
                   }
               }

               function getBookmarkCount()
               {
                   if ((IsIllustrationPage && (Settings.requestMethod & 8)) ||
                       (!IsIllustrationPage && (Settings.requestMethod & 4)))
                   {
                       GM_xmlhttpRequest({
                           url: "https://www.pixiv.net/bookmark_detail.php?illust_id=" + id,
                           method: "GET",
                           timeout: 15000,
                           headers: { "User-agent": navigator.userAgent, "Accept": "text/html", Referer: "https://www.pixiv.net" },
                           onload: function (response)
                           {
                               if (response.status == 200) //Response 200 implies that link exist and then most likely a Manga (or an Error XD)
                               {
                                   var doc = new DOMParser().parseFromString(response.responseText, "text/html");
                                   var bm = doc.querySelector(".bookmark-count");
                                   if (bm) illust.bookmarkCount = parseInt(bm.textContent);
                                   else illust.bookmarkCount = 0;
                               }
                               finalise();
                           }
                       });
                   }
                   else
                   {
                       var oReq = new XMLHttpRequest();
                       oReq.open("GET", "https://www.pixiv.net/bookmark_detail.php?illust_id=" + id, true);
                       oReq.responseType = "text";
                       oReq.timeout = 15000;
                       oReq.onload = function (e)
                       {
                           if (oReq.status == 200) //Response 200 implies that link exist and then most likely a Manga (or an Error XD)
                           {
                               var doc = new DOMParser().parseFromString(oReq.response, "text/html");
                               var bm = doc.querySelector(".bookmark-count");
                               if (bm) illust.bookmarkCount = parseInt(bm.textContent);
                               else illust.bookmarkCount = 0;
                           }

                           finalise();
                       };
                       oReq.send();
                   }
               }
               /*
                There is no way of finding out the extension of manga files in the new naming method using
                the illustration page. We need to make another http request.
                -------------------------------------------------------------------------------------------*/
               function getMangaExtension()
               {
                   var url = (illust.pageCount > 1) ? "https://www.pixiv.net/member_illust.php?mode=manga_big&illust_id=" + id + "&page=0" : "https://www.pixiv.net/member_illust.php?mode=big&illust_id=" + id;

                   if (illust.pageCount == 1 || (IsIllustrationPage && (Settings.requestMethod & 8)) ||
                    (!IsIllustrationPage && (Settings.requestMethod & 4)))
                   {
                       GM_xmlhttpRequest({
                           url: url,
                           method: "GET",
                           timeout: 15000,
                           headers: { "User-agent": navigator.userAgent, "Accept": "text/html", Referer: "https://www.pixiv.net/member_illust.php?mode=medium&illust_id=" + id },
                           onload: function (response)
                           {
                               console.log(response.responseText);
                               if (response.status == 200)
                               {
                                   var doc = new DOMParser().parseFromString(response.responseText, "text/html");
                                   try
                                   {
                                       illust.illustURL = doc.getElementsByTagName("img")[0].src;
                                   }
                                   catch (err) { }
                               }
                               finalise();
                           }
                       });
                   }
                   else
                   {
                       var oReq = new XMLHttpRequest();
                       oReq.open("GET", url, true);
                       oReq.responseType = "text";
                       oReq.timeout = 15000;
                       oReq.onload = function (e)
                       {
                           if (oReq.status == 200)
                           {
                               var doc = new DOMParser().parseFromString(oReq.response, "text/html");
                               try
                               {
                                   illust.illustURL = doc.getElementsByTagName("img")[0].src;
                               }
                               catch (err) { }
                           }

                           finalise();
                       };
                       oReq.send();
                   }
               }
           }
       };

    /*
    ===================================================================================================================================
     Handles getting the next page
    ===================================================================================================================================*/
    var Pager =
        {
            nextPageURL: null,
            intervalID: null,
            //Time to wait out before attempting to get the next page
            timeOutLength: 2000,
            pause: false,
            //Event that fires off passing the loaded document
            onPageLoad: null,
            //If true it scraps any currently loading pages
            ageRatingChanged: false,
            requestingPage: false,
            scrollOffset: null,

            nextPageURLf: function(callback){
              if(this.nextPageURL!=null)
                return callback();
              var interval = setInterval(function(){ 
                  this.getNextPageURL(document.body);
                  if(this.nextPageURL!=null)
                {
                  callback();
                  clearInterval(interval);
                }
              }.bind(this), 1000);
            },
            /*
            ------------------------------------------------------------------------------
             Initialises the pager.
             - pageLoadEventHandler must be set as it gets called when a new page is
             loaded. It takes (document,nextURL) parameters.
             - scrollOffset function that return the bottom position of the main
             container. Used to calculate when to load next page.
            ------------------------------------------------------------------------------*/
            initalise: function (pageLoadEventHandler, funcScrollOffset)
            {
                this.scrollOffset = funcScrollOffset;
                this.onPageLoad = pageLoadEventHandler;
                this.getNextPageURL(document.body);
                if (this.intervalID) clearInterval(this.intervalID);
                if (this.nextPageURL) this.intervalID = setInterval(this.checkScrollPosition, 500);
                return (this.nextPageURL != null);
            },

            checkScrollPosition: function ()
            {
                if (Pager.ageRatingChanged || !Settings.fetch.nextPage) return;
                if ((Pager.scrollOffset() - window.scrollY - window.innerHeight) < Settings.pagingOffset)
                {
                    Pager.getNextPage();
                }
            },

            /*
            ------------------------------------------------------------------------------
             Gets the next page url from an element or full document. Returns null
             if there isn't a next page other the url.
            ------------------------------------------------------------------------------*/
            getNextPageURL: function (xml)
            {
                this.nextPageURL = null;
                var btnNext = false;
                var evaluator = new XPathEvaluator(); //document.evaluate
                var spanNext = evaluator.evaluate(".//span[@class='next']", document.body, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
                var spanNext = spanNext.snapshotItem(spanNext.snapshotLength-1);
                if(spanNext.hasChildNodes())
                    btnNext = spanNext.children[0];
                if (btnNext) this.nextPageURL = btnNext.href;
                //else btnNext = evaluator.evaluate(".//a[@rel='next' and @class='button']", xml, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
                //if (btnNext) this.nextPageURL = btnNext.href;

                return this.nextPageURL;
            },

            NextPageReceived: function (doc, pageNumber)
            {
                DisplayMessage("Page [" + pageNumber + "] received", 1500);

                if (Pager.onPageLoad) Pager.onPageLoad(doc, Pager.nextPageURL);

                Pager.getNextPageURL(doc.body);
                Pager.nextPageURLf(function(){
                  if (Pager.nextPageURL)
                  {
                      setTimeout(
                          function ()
                          {
                              Pager.intervalID = setInterval(Pager.checkScrollPosition, 500);
                          }
                          , Pager.timeOutLength);
                  }
                });
                
            },

            /*
            ------------------------------------------------------------------------------
             Gets the next page asynchronously.
            ------------------------------------------------------------------------------*/
            getNextPage: function (callback)
            {
                if (Pager.requestingPage || !Pager.nextPageURL) return;
                Pager.requestingPage = true;

                clearInterval(Pager.intervalID);
                var pageNumber = PaginatorHQ.getPageNumber(Pager.nextPageURL);
                console.info("Next Page: ", Pager.nextPageURL);
                var msg = DisplayMessage("Requesting page [" + pageNumber + "] ...");

                if (Settings.requestMethod & 2)
                {
                    GM_xmlhttpRequest({
                        url: Pager.nextPageURL,
                        method: "GET",
                        headers: { "User-agent": navigator.userAgent, "Accept": "document" }, //"Accept": "text/html"
                        timeout: 20000,
                        onload: function (response)
                        {
                            Pager.requestingPage = false;
                            //Change age rate, so no need to process return result as new content will be loaded
                            if (Pager.ageRatingChanged) return;
                            if (response.status == 200)
                            {
                                RemoveMessage(msg);
                                var doc = document.implementation.createHTMLDocument("P++");
                                doc.documentElement.innerHTML = response.responseText;

                                //Not supported by Opera
                                //var doc = new DOMParser().parseFromString(response.responseText, "text/html")
                                Pager.NextPageReceived(doc, pageNumber);
                            }
                            else Pager.pageErrorTimeout("ERROR: Page [" + pageNumber + "] failed request", response);
                            if (typeof callback == "function") callback(pageNumber);
                        },
                        ontimeout: function (response) { RemoveMessage(msg); Pager.pageErrorTimeout("ERROR: Timeout on Page [" + pageNumber + "].", response) },
                        onerror: function (response) { RemoveMessage(msg); Pager.pageErrorTimeout("ERROR: Page [" + pageNumber + "] failed request", response) }
                    });
                }
                else
                {
                    var oReq = new XMLHttpRequest();
                    oReq.open("GET", Pager.nextPageURL, true);
                    oReq.responseType = "document";
                    oReq.timeout = 20000;
                    oReq.onload = function (e)
                    {
                        {
                            Pager.requestingPage = false;
                            //Change age rate, so no need to process return result as new content will be loaded
                            if (Pager.ageRatingChanged) return;
                            if (oReq.status == 200)
                            {
                                RemoveMessage(msg);
                                Pager.NextPageReceived(oReq.response, pageNumber);
                            }
                            else Pager.pageErrorTimeout("ERROR: Page [" + pageNumber + "] failed request", oReq);
                            if (typeof callback == "function") callback(pageNumber);
                        }
                    };
                    oReq.ontimeout = function (response) { RemoveMessage(msg); Pager.pageErrorTimeout("ERROR: Timeout on Page [" + pageNumber + "].", response) };
                    oReq.onerror = function (response) { RemoveMessage(msg); Pager.pageErrorTimeout("ERROR: Page [" + pageNumber + "] failed request", response) };
                    oReq.send();
                }
            },

            pageErrorTimeout: function (msg, response)
            {
                console.error("Failed to get next page: (" + response.status + ") : " + response.statusText);
                DisplayMessage(msg, 5000);
                setTimeout(
                            function ()
                            {
                                Pager.intervalID = setInterval(Pager.checkScrollPosition, 500);
                            }
                            , Pager.timeOutLength);
                Pager.requestingPage = false;
            }
        }

    /*
    ===================================================================================================================================
     PaginatorHQ handles all functions to do with formatting the layout of the results
    ===================================================================================================================================*/
    var PaginatorHQ =
        {
            pageTable: null,
            status: 0,
            styled: false,

            /*
            -------------------------------------------------------------------------------------------
              Prepares current page for pagination
            -------------------------------------------------------------------------------------------*/
            intialise: function ()
            {
                PaginatorHQ.removeUnwantedElements(document);

                var paged = (Pager.getNextPageURL(document) != null);
                if (PAGETYPE > 9) paged = false;
                var pageNumber = (paged) ? PaginatorHQ.getPageNumber(document.URL) : 0;

                var containers = PaginatorHQ.getContainers(document);
                console.log("Containers: ", containers)
                if (!paged) //Either has no pages or it is the last page
                {
                    if (PAGETYPE > 1 && containers)
                    {
                        PaginatorHQ.pageTable = containers[0].parentElement;
                        containers[0].setAttribute("name", "pageContainer"); //Done for age rating issues.
                    }
                    IllustrationLinker.getContainerLinks(containers, pageNumber);
                }
                else
                {
                    var paginator = document.getElementsByClassName("column-order-menu");

                    while (paginator.length > 1) paginator[0].parentNode.removeChild(paginator[0]);
                    paginator = paginator[0];
                    paginator.className += " paginator";


                    var pageContainer = containers[0];
                    if (pageContainer.className == "display_works linkStyleWorks") //display_works linkStyleWorks breaks sets UL style
                    {
                        //You need to add this otherwise "DIV._unit action-unit" element does not expand and will end up with transparent background.
                        var divider = document.createElement("div");
                        divider.className = "clear";
                        pageContainer.appendChild(divider);

                        pageContainer = pageContainer.firstElementChild;
                    }
                    else
                    {
                        pageContainer.parentElement.insertBefore(paginator, pageContainer);
                    }
                    
                    pageContainer.style.marginBottom = "0";
                    pageContainer.style.marginTop = "0";
                    pageContainer.setAttribute("name", "pageContainer");
                    pageContainer.setAttribute("page", pageNumber);
                    PaginatorHQ.pageTable = pageContainer.parentElement;
                    
                    IllustrationLinker.getContainerLinks([pageContainer], pageNumber);
                    pageContainer.className += " pppPage" + (pageNumber % 2);
                    Pager.initalise(PaginatorHQ.addNewPage, PaginatorHQ.getMainTableBottom);
                }

                PaginatorHQ.updateVisibilityOfAllElements(document);
            },

            /*
           -------------------------------------------------------------------------------------------
             Gets bottom of page table, used to calculate when the next page is going to be loaded
           -------------------------------------------------------------------------------------------*/
            getMainTableBottom: function ()
            {
                var pos = TSL.getAbsolutePosition(PaginatorHQ.pageTable);
                return pos.top + PaginatorHQ.pageTable.offsetHeight;
            },

            addStyles: function ()
            {
                if (PaginatorHQ.styled) return;
                PaginatorHQ.styled = true;

                TSL.addStyle("AlterDefaultThumbnails", "li.image-item {box-shadow: 1px 1px 1px 1px lightgray;}"
                    + ".image-item, .no-response .image-item, .manage-unit .image-item {height:250px;}"
                    );
                TSL.addStyle("RelativePositioning", '.cool-work .works .work, .stacc_unify_status_content .stacc_ref_thumb_left, .user-recommendation-item .images .action-open-thumbnail {position:relative;}');

                if (PAGETYPE > 1) TSL.addStyle("", "li.image-item {margin:3px 5px !important;}");

                TSL.addStyle(null, "#pppMsgBox{position: fixed;z-index: 500;bottom: 30px;left: 10px;padding: 0 20px 0 10px;color: #FF0;background-color: #0000D5;padding-left: 10px;border-style: solid;border-color: #FFF;border: solid;}");
                TSL.addStyle("pppPaginator", ".paginator{background-color: white; margin:0; border: ridge;}");
                TSL.addStyle("pppPaginator2", ".paginator{background-color: #F2F4F6;}");

                //Used to fix broken artist and bookmarks pages
                TSL.addStyle("linkColours", ".image-item a:link{color:#339BDB;} .image-item a:visited{color:#BCBBB9;}")

                //Have an invisible large border to avoid accidental exit of preview window that occurs when you are trying to scroll
                TSL.addStyle("PreviewWindowCSS", '#PreviewWindow {position: absolute; z-index: 1000;max-width: 95%;background-color:black; padding: 1px 1px 10px 1px; box-shadow: 0 0 5px 5px #2D9ACE; }'
                    + '#PreviewWindow > summary {padding: 2px 5px;} '
                    + '#PreviewWindow > summary a:not([class*="meta-box"]):not([class*="count"]) {font-size:12px; color:lime;}'
                    + '#PreviewWindow > summary  a.pppType {border-radius:3px; background-color:#696969; padding:0 3px;margin-right:2px;color:white;display:inline-block;}'
                    );

                TSL.addStyle("", ".illustmeta .title, .illustmeta .user {display:block;}");
                TSL.addStyle("MiniBoxes", '.meta-box {border-radius: 3px;display: inline-block; font: bold 10px/18px "lucida grande",sans-serif; margin: 0 1px; padding: 0 6px}'
                    + '.meta-box, .meta-box:hover {text-decoration: none;}'
                    + '.meta-box {background-color:white; color:black;}'
                    + 'body a.iqdb-link:link, body a.iqdb-link:visited {background-color:#FFFFA3; color:#969628;}'
                    + 'body .page-count {background-color:#9DFB9D; color:#198419;}'
                    );
                TSL.addStyle("", '.pppLinksBox[pages] {' + (IsIllustrationPage ? 'font-size:small' : 'font-size:xx-small') + '}');

                // Left Side
                TSL.addStyle("Marker", ".sibling-items.with-thumbnail li {position:relative;}"
                    + ".marked4linker .pppMarker {position:absolute;left:2px;top:1px;z-index:100;display:inline-block;height:6px;width:6px;background-color:red;border:1px groove #B41515; border-radius:5px;}"
                    + ".marked4linker.before .pppMarker {right: 60px;left:auto;}"
                    + ".marked4linker.linking img, .linking > a:first-child > div {cursor:wait;} .marked4linker.linking .pppMarker {background-color:yellow;border:1px groove #969628;}"
                    + ".marked4linker.linked .pppMarker {background-color:lime;border:1px groove green; }"
                    + ".marked4linker.private .pppMarker {background-color:gray;border:1px groove black; }"
                    );

                /* Right Side
                 TSL.addStyle("Marker", ".sibling-items.with-thumbnail li {position:relative;}"
                     + ".marked4linker {position:absolute;right:1px;top:1px;z-index:100;display:inline-block;height:6px;width:6px;background-color:red;border:1px groove #B41515; border-radius:5px;}"
                     + ".after .marked4linker {left: 60px;} .before .marked4linker {right: 0px;}"
                     + ".marked4linker.linking {background-color:yellow;border:1px groove #BABA14; }"
                     + ".marked4linker.linked {background-color:lime;border:1px groove green; }"
                     );
                     */

                TSL.addStyle("", '.illustmeta .title, .illustmeta .user, .illustmeta .pppLinksBox {overflow: hidden; text-overflow: ellipsis; white-space: nowrap;} .illustmeta .pppLinksBox {text-overflow:"...]"; min-height:10px;}');

                TSL.addStyle("MangaPreview", "#ThumbContainer{top: 0; left: 0; overflow: auto; white-space: nowrap; max-width: 100%; width: 100%;}"
                    + "#ThumbContainer > a > img {border: 2px ridge #FFF; max-width: 260px; max-height: 360px;}");
            },

            getPageNumber: function (url)
            {
                var pageNumber = url.replace(/.+(&|\?)p=(\d+)$/gi, "$2");
                if (isNaN(pageNumber)) pageNumber = 1;
                return parseInt(pageNumber);
            },

            /*
           -------------------------------------------------------------------------------------------
             Adds new content.
           -------------------------------------------------------------------------------------------*/
            addNewPage: function (doc, url)
            {
                PaginatorHQ.removeUnwantedElements(doc);

                var pageNumber = PaginatorHQ.getPageNumber(url);

                //PageContainer
                var pageContainer = PaginatorHQ.getContainers(doc)[0];
                pageContainer.setAttribute("name", "pageContainer");
                pageContainer.setAttribute("page", pageNumber);
                pageContainer.style.marginBottom = "0";
                pageContainer.style.marginTop = "0";

                //Navigation Bar
                var paginator = doc.getElementsByClassName("column-order-menu")[1];
                if(paginator==null)
                    paginator = doc.getElementsByClassName("column-order-menu")[0];
                paginator.className += " paginator pppPagedChild";
                for (var i = paginator.children.length - 1; child = paginator.children[i], i >= 0; i--)
                    if (child.className != "pager-container") paginator.removeChild(child);
                paginator.getElementsByTagName("ul")[0].className = "clear " + paginator.getElementsByTagName("ul")[0].className;
                pageContainer.className += " pppPagedChild pppPage" + (pageNumber % 2);

                //pageContainer.insertBefore(paginator, pageContainer.firstElementChild);
                PaginatorHQ.pageTable.appendChild(paginator);
                PaginatorHQ.pageTable.appendChild(pageContainer);


                //IllustrationLinker.getContainerLinks should always after page is added.
                IllustrationLinker.getContainerLinks([pageContainer], pageNumber);
                PaginatorHQ.updateVisibilityOfAllElements(pageContainer);
                if (Settings.filterSwitchFlag > 0)
                {
                    pageContainer.style.display = "none";
                    paginator.style.display = "none";
                    PaginatorHQ.filterContainer(pageContainer);
                }
            },

            /*
            -----------------------------------------------------------------------------------------
             Returns containers that contain thumbnails. If doc is left out it uses current
             document. This does not return dynamic containers, i.e. containers like recommended
             illustrations whose content are auto-updated by Pixiv.
            -----------------------------------------------------------------------------------------*/
            getContainers: function (doc)
            {                                                
                if (!doc) doc = document;
                //if (PAGETYPE == 10) nodes = doc.querySelectorAll("#illust-recommend ._image-items");
                var nodes = doc.querySelectorAll('#item-container, .worksListOthers'); //None paged

                if (PAGETYPE == 10) return doc.querySelectorAll(".layout-body #illust-recommend ._image-items");
                if (PAGETYPE == 9) return doc.querySelectorAll(".column-search-result")                
                    
                if (nodes.length == 0) nodes = doc.querySelectorAll("._image-items, .display_editable_works"); //Paged                
                return nodes;
            },

            filterThumbnail: function (thumbnail)
            {
                if (Settings.filterSwitchFlag == 0) return;

                var metadata = IllustrationLinker.getIllust(thumbnail.getAttribute("illustration-id"));
                var filterOut = false;

                if (metadata.pageCount == null) return;

                //Filter using age rating
                filterOut = ((Settings.filterSwitchFlag & 16) == 16 && metadata.R18 == 0) ||
                            ((Settings.filterSwitchFlag & 32) == 32 && metadata.R18 == 1) ||
                            ((Settings.filterSwitchFlag & 64) == 64 && metadata.R18 == 2);


                if (!filterOut && (Settings.filterSwitchFlag & 2) == 2)
                {
                    var flag = Settings.filter.flag;
                    var values = Settings.filters[Settings.filter.set];
                    try
                    {
                        if ((flag & 2) == 2 && metadata.illustType == 1) filterOut = true; //Filtering out Illustrations
                        else if ((flag & 4) == 4 && metadata.illustType == 2) filterOut = true; //Filtering out Manga
                        else if ((flag & 8) == 8 && metadata.bookmarkCount < values[0]) filterOut = true; //Bookmarks
                        else if ((flag & 16) == 16 && metadata.viewCount < values[1]) filterOut = true; //Views
                        else if ((flag & 32) == 32 && metadata.ratings < values[2]) filterOut = true; //Ratings
                        else if ((flag & 64) == 64 && metadata.totalRatings < values[3]) filterOut = true; //Total
                    } catch (e) { };
                }

                if (!filterOut)
                {
                    var found;
                    var tags = metadata.tags;

                    while (tags.indexOf("  ") >= 0) tags = tags.replace("  ", " ");
                    tags = tags.split(" ");

                    if ((Settings.filterSwitchFlag & 4) == 4)
                    {
                        var tagsF = Settings.filter.tagsInclude;
                        while (tagsF.indexOf("  ") >= 0) tagsF = tagsF.replace("  ", " ");
                        tagsF = tagsF.split(" ");

                        tagsF = Settings.filter.tagsInclude.split(" ");

                        found = true;
                        for (var i = 0; i < tagsF.length; i++)
                        {
                            found = false
                            for (var j = 0; j < tags.length; j++)
                            {
                                if (tagsF[i].trim().toLowerCase() == tags[j].trim().toLowerCase())
                                {
                                    found = true;
                                    break;
                                }
                            }

                            if (!found) break;
                        }

                        filterOut = !found;
                    }

                    if (!filterOut && (Settings.filterSwitchFlag & 8) == 8)
                    {
                        var tagsF = Settings.filter.tagsExclude;
                        while (tagsF.indexOf("  ") >= 0) tagsF = tagsF.replace("  ", " ");
                        tagsF = tagsF.split(" ");

                        found = false;
                        for (var i = 0; i < tagsF.length; i++)
                        {
                            for (var j = 0; j < tags.length; j++)
                            {
                                if (tagsF[i].trim().toLowerCase() == tags[j].trim().toLowerCase())
                                {
                                    found = true;
                                    break;
                                }
                            }
                            if (found) break;
                        }

                        //console.log(found);
                        filterOut = found;
                    }
                }

                //Illustration metadata has yet to be retrieved
                if (filterOut)
                {
                    PaginatorHQ.filterThumbnailLinks(thumbnail, true);
                    thumbnail.style.display = "none";
                }
                else
                {
                    PaginatorHQ.filterThumbnailLinks(thumbnail, false);
                    thumbnail.style.display = null;
                }
            },

            filterThumbnailLinks: function (thumbnail, remove)
            {
                var links = thumbnail.querySelectorAll(".pppLinksBox > a");
                //var links = thumbnail.querySelectorAll("a");
                if (!links) return;

                for (var i = 0; i < links.length; i++)
                {
                    if (remove)
                    {
                        if (!links[i].getAttribute("data-href")) links[i].setAttribute("data-href", links[i].href);
                        links[i].removeAttribute("href");
                    }
                    else if (!links[i].href && links[i].getAttribute("data-href"))
                    {
                        links[i].href = links[i].getAttribute("data-href");
                    }
                }
            },


            filterContainer: function (container)
            {
                if (Settings.filterSwitchFlag == 0) return;

                var mainContainer = document.getElementsByName("pageContainer")[0],
                    thumbnails = container.querySelectorAll("[pppThumb]");

                for (var i = 0, thumb; i < thumbnails.length, thumb = thumbnails[i]; i++)
                {
                    PaginatorHQ.filterThumbnail(thumb);
                    if (thumb.parentElement != mainContainer) mainContainer.appendChild(thumb);
                }

                return thumbnails.length;
            },


            /*
           -------------------------------------------------------------------------------------------
            Goes through all thumbnail containers and filters the result accordingly
           -------------------------------------------------------------------------------------------*/
            filterResult: function ()
            {
                if (PaginatorHQ.status == 0)
                {
                    PaginatorHQ.status = 1;
                    setTimeout(PaginatorHQ.filterResult, 0);
                    return true;
                }
                if (PaginatorHQ.status == 2)
                {
                    return false;
                }
                PaginatorHQ.status = 2;
                var msg = DisplayMessage("Filtering content (" + Settings.filterSwitchFlag + ")");

                var filtering = (Settings.filterSwitchFlag > 0);

                var containers = document.getElementsByName("pageContainer");
                var paginators = document.getElementsByClassName(" paginator");
                var mainContainer = containers[0];
                var mainContainerPage = mainContainer.getAttribute("page");
                //Parse through page containers and paginators and set visibility according to filter
                for (var i = 1; container = containers[i], i < containers.length; i++)
                {
                    containers[i].style.display = (filtering) ? "none" : null;
                    paginators[i].style.display = (filtering) ? "none" : null;
                }

                if (filtering) //Displaying all items
                {
                    mainContainer.style.backgroundColor = "transparent";
                    for (var i = 0; i < containers.length; i++)
                    {
                        msg.textContent = ("Filtering Page " + (i + 2) + "/" + containers.length);
                        PaginatorHQ.filterContainer(containers[i]);
                    }
                }
                else //Filtering out
                {
                    mainContainer.style.backgroundColor = null;
                    var thumbnails = mainContainer.querySelectorAll("[pppThumb]");

                    for (var i = 0, thumb; i < thumbnails.length, thumb = thumbnails[i]; i++)
                    {
                        //msg.textContent = ("Filtering thumbnail " + (i + 1) + "/" + nodesSnapshot.snapshotLength);
                        thumbPage = thumb.getAttribute("page");
                        if (thumbPage > mainContainerPage) containers[thumbPage - mainContainerPage].appendChild(thumb);
                        PaginatorHQ.filterThumbnailLinks(thumb, false);
                        thumb.style.display = null;
                    }
                }

                if (filtering)
                {
                    DisplayMessage("Filtering completed", 2000);
                    // (totalCount - PaginatorHQ.filteredCount) + " (" + totalCount + ")";
                }
                else
                {
                    DisplayMessage("Filter disabled", 2000);
                }

                RemoveMessage(msg);
                PaginatorHQ.status = 0;
                PaginatorHQ.displayResultInfo();
            },

            getResultCount: function (doc)
            {
                if (!doc) doc = document;

                var evaluator = new XPathEvaluator(); //document.evaluate
                //var result = evaluator.evaluate("//div[@class='column-label' or '_unit manage-unit']/span[@class='count-badge']", doc, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
                var result = evaluator.evaluate("//div[@class='column-label' or @class='_unit manage-unit']/span[@class='count-badge']", doc, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

                if (result) return parseInt(result.textContent);
                else return -1;
            },


            /*
           -------------------------------------------------------------------------------------------
            Displays the amount of thumbnails listed
           -------------------------------------------------------------------------------------------*/
            displayResultInfo: function ()
            {
                if (SideBar.iDoc == null)
                {
                    setTimeout(function () { PaginatorHQ.displayResultInfo(); }, 250); //Sidebar has yet to load
                    return;
                }

                var thumbs = document.querySelectorAll("[pppThumb]");
                var it = SideBar.iDoc.getElementById("InfoTable");
                var resultCount = PaginatorHQ.getResultCount(); //Number of items returned by search

                var linked = document.querySelectorAll(".marked4linker.linked[pppThumb],.marked4linker.private[pppThumb]").length;


                if (resultCount < 0) //We do not know how many pages can be displayed. Might not be paged
                {
                    it.rows[0].style.display = "none";
                    it.rows[1].style.display = null;

                    it.rows[1].cells[1].textContent = linked + " / " + thumbs.length; //Number of images

                    if (PAGETYPE > 2) //It is paged. Go figure.
                    {
                        var startPage = PaginatorHQ.getPageNumber(document.URL);
                        var pagesLoaded = Math.ceil(thumbs.length / 20);
                        it.rows[0].style.display = null;
                        it.rows[0].cells[1].textContent = pagesLoaded + " (" + startPage + "-" + (startPage + pagesLoaded - 1) + ")";
                    }
                }
                else if (thumbs.length == 0 || resultCount == 0)
                {
                    it.rows[0].cells[1].textContent = 0;
                    it.rows[1].cells[1].textContent = 0;
                }
                else
                {
                    var visibleCount = thumbs.length;
                    if (Settings.filterSwitchFlag > 0)
                    {
                        visibleCount = 0;
                        for (var i = 0; i < thumbs.length; i++)
                        {
                            if (!thumbs[i].style.display) visibleCount++;
                        }
                    }

                    var pagesLoaded = Math.ceil(thumbs.length / 20);
                    var pageS = PaginatorHQ.getPageNumber(document.URL);
                    var pageE = pageS + pagesLoaded - 1;
                    var pageCount = Math.ceil(resultCount / 20);

                    it.rows[0].cells[1].textContent = pagesLoaded + " (" + pageS + "-" + pageE + " | " + pageCount + ")";

                    var leftCount = resultCount - ((pageS - 1) * 20)
                    if (Settings.filterSwitchFlag > 0) it.rows[1].cells[1].innerHTML = visibleCount + " / " + linked + " | " + thumbs.length + "<br /> (" + leftCount + " | " + resultCount + ")";
                    else it.rows[1].cells[1].textContent = linked + " / " + thumbs.length + " (" + leftCount + " | " + resultCount + ")";
                }

                //Adjust frame size to fit info text
                if (SideBar.iDoc.body.clientHeight < SideBar.iDoc.body.scrollHeight) SideBar.adjustFrameSize();
            },

            /*
           -------------------------------------------------------------------------------------------
            Sorts the thumbnails according to filter type
           -------------------------------------------------------------------------------------------*/
            sortByScore: function (sort)
            {
                if (PaginatorHQ.status == 0)
                {
                    PaginatorHQ.status = 1;
                    setTimeout(PaginatorHQ.sortByScore, 0, sort);
                    return true;
                }
                if (PaginatorHQ.status == 2)
                {
                    return false;
                }
                PaginatorHQ.status = 2;

                var msg = DisplayMessage("Sorting content");

                var containers = document.getElementsByName("pageContainer");
                var sortType = Settings.sortType;

                //A very bad way of doing sort but it seems efficient. Problem is having items spread over containers
                var thumbnails = PaginatorHQ.pageTable.querySelectorAll("[pppThumb]"),
                    arr = new Array();
                for (var i = 0, thumb; i < thumbnails.length, thumb = thumbnails[i]; i++)
                {
                    //console.log(getMetaScore(thumb)[sortType], thumb.getAttribute("pppThumb"));
                    var value = (sort) ? parseInt(getMetaScore(thumb)[sortType]) : parseInt(thumb.getAttribute("pppThumb"));
                    arr.push({ "index": i, "value": value });
                }

                //The value is either original position or score value
                arr.sort(function (a, b)
                {
                    if (sort) return b.value - a.value;
                    else return a.value - b.value;
                    //if ((sort && a.value < b.value) || (!sort && a.value > b.value)) return 1;
                });

                //Apply sorted array to thumbnails
                for (var i = 0 ; i < arr.length; i++)
                {
                    if (Settings.filterSwitchFlag > 0 || containers.length == 1) container = containers[0]; //Items are all in one container as filter is enabled
                    else container = containers[Math.floor(i / 20)];

                    container.appendChild(thumbnails[arr[i].index]);
                }


                var evaluator = new XPathEvaluator(); //document.evaluate
                var sortButton = evaluator.evaluate("//a[@name='Sort']", SideBar.iDoc.body, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
                if (sort)
                {
                    DisplayMessage("Sorted by " + FilterTypeToString(sortType), 3000);
                    sortButton.firstElementChild.style.borderColor = "#0F0";
                }
                else
                {
                    DisplayMessage("Removed sorting", 3000);
                    sortButton.firstElementChild.style.borderColor = "#000";
                }

                RemoveMessage(msg);
                PaginatorHQ.status = 0;

                function getMetaScore(thumbnail)
                {
                    var illust = IllustrationLinker.getIllust(thumbnail.getAttribute("illustration-id"))
                    return [illust.bookmarkCount, illust.viewCount, illust.ratings, illust.totalRatings];
                }
            },


            updateIQDBLink: function (thumbnail)
            {
                var IQDBLink = thumbnail.querySelector(".iqdb-link"),
                    metadata = IllustrationLinker.getIllust(thumbnail.getAttribute("illustration-id"));

                if (IQDBLink) IQDBLink.href = "https://" + Settings.IQDBType + ".IQDB.org/?url=" + metadata.illust240URL + "&";
            },

            updateAllIQDBLinks: function ()
            {
                var thumbs = document.querySelectorAll('[pppThumb]');
                for (var i = 0; i < thumbs.length; i++) PaginatorHQ.updateIQDBLink(thumbs[i]);
            },

            /*
            ----------------------------------------------------------------------------------------
             Clean's up the thumbnail and adds any missing information. It gets called by the
             IllustrationLinker.createLinkBox function when the metadata has been recieved.
            ----------------------------------------------------------------------------------------*/
            tidyThumbnail: function (id)
            {
                //Do this as paging can cause duplicate images
                var thumbnails = document.querySelectorAll('[illustration-id="' + id + '"]'),
                    metadata = IllustrationLinker.getIllust(id);

                for (var i = 0, thumbnail; i < thumbnails.length; i++)
                {
                    thumbnail = thumbnails[i];
                    TSL.removeClass(thumbnail, "linking");
                    TSL.addClass(thumbnail, "linked");

                    if (!thumbnail.hasAttribute("pppThumb")) continue;
                    var link = thumbnail.getElementsByTagName("a")[0];

                    //We clean up here. Removing anything we do not desire or wanting to recreate
                    TSL.removeNode(thumbnail.querySelector(".count-list"));
                    TSL.removeNode(thumbnail.querySelector(".f10"));
                    TSL.removeNode(thumbnail.querySelector(".bookmark_artist"));
                    TSL.removeNode(thumbnail.querySelector("h1.title"));
                    TSL.removeNode(thumbnail.querySelector("a.user.ui-profile-popup"));
                    var brs = thumbnail.getElementsByTagName("br");
                    while (brs.length > 0) brs[0].parentElement.removeChild(brs[0]);

                    TSL.removeNode(thumbnail.querySelector(".illustmeta"));

                    var el, meta = document.createElement("section");
                    meta.className = "illustmeta";
                    meta.title = "Title: " + metadata.illustTitle + "\nArtist: " + metadata.userName;
                    thumbnail.insertBefore(meta, thumbnail.querySelector(".edit-work")); //Edit work is only one's own pages

                    //Title
                    el = document.createElement("a");
                    el.className = "title";
                    el.href = "member_illust.php?mode=medium&illust_id=" + metadata.illustID;
                    el.textContent = metadata.illustTitle;
                    meta.appendChild(el);

                    //Username
                    el = document.createElement("a");

                    el.className = (PAGETYPE == 3) ? "user" : "user ui-profile-popup";
                    el.setAttribute("data-user_name", metadata.userName);
                    el.setAttribute("data-user_id", metadata.userID);
                    el.setAttribute("title", metadata.illustTitle);
                    el.href = "/member_illust.php?id=" + metadata.userID;
                    el.innerHTML = '<span style="color:gray;">by: </span>' + metadata.userName;
                    meta.appendChild(el);


                    //Counters
                    el = document.createElement("ul");
                    el.className = "count-list";
                    el.innerHTML = (metadata.pageCount > 1 ? '<a class="meta-box page-count" href="https://www.pixiv.net/member_illust.php?mode=manga&illust_id=' + metadata.illustID + '">P' + metadata.pageCount + '</a>' : '')
                            + '<a href="/bookmark_detail.php?illust_id=' + metadata.illustID + '" class="bookmark-count ui-tooltip" data-tooltip="Received ' + metadata.bookmarkCount + ' bookmarks"><i class="_icon sprites-bookmark-badge"></i>' + metadata.bookmarkCount + '</a>'
                            + '<a href="/response.php?type=illust&amp;id=' + metadata.illustID + '" class="image-response-count ui-tooltip" data-tooltip="Received ' + metadata.responseCount + ' image responses"><i class="_icon sprites-image-response-badge"></i>' + metadata.responseCount + '</a>';
                    meta.appendChild(el);
                }
            },

            /*
            ----------------------------------------------------------------------------------------
             Sets the visibility of the elements according to sidebar settings.
            ----------------------------------------------------------------------------------------*/
            updateVisibilityOfAllElements: function (container)
            {
                if (Settings.display.illustTitle) TSL.removeNode("VisTitle");
                else TSL.addStyle("VisTitle", ".illustmeta .title {display:none;}");

                if (Settings.display.artistName) TSL.removeNode("VisUser");
                else TSL.addStyle("VisUser", ".illustmeta .user {display:none;}");

                if (Settings.display.artistName) TSL.removeNode("VisUser");
                else TSL.addStyle("VisUser", ".illustmeta .user {display:none;}");

                if (Settings.display.IQDBLink) TSL.removeNode("VisIQDB");
                else TSL.addStyle("VisIQDB", ".illustmeta .iqdb-link {display:none;}");

                if (Settings.display.countList) TSL.removeNode("VisCount");
                else TSL.addStyle("VisCount", ".image-response-count, .bookmark-count, .page-count {display:none !important;}");

                if (Settings.display.mangaLinks) TSL.removeNode("VisPaged");
                else TSL.addStyle("VisPaged", ".pppLinksBox[pages] {display:none;}");

                if (Settings.display.illustLink) TSL.removeNode("VisSingle");
                else TSL.addStyle("VisSingle", ".pppLinksBox:not([pages]) {display:none;}");
            },

            removeUnwantedElements: function (doc)
            {
                TSL.removeNode(doc.querySelector("._popular-introduction"))

                var classes = ["popular-introduction", "user-ad-container"];
                var ids = ["header-banner"];

                for (var i = 0; i < classes.length; i++)
                {
                    var els = doc.getElementsByClassName(classes[i]);
                    while (els.length > 0) els[0].parentNode.removeChild(els[0]);
                }

                for (var i = 0; i < ids.length; i++)
                {
                    var el = doc.getElementById(ids[i]);
                    if (el) el.parentNode.removeChild(el);
                }
            }
        };

    /*
    ===================================================================================================================================
     Handles the preview dialog window
    ===================================================================================================================================*/
    var PreviewHQ =
    {
        registerForPreviewWindow: function ()
        {
            if (PAGETYPE > 9)
            {
                var items = document.querySelectorAll(".image-item");
                if (document.itemscount != items.length)
                {
                    document.itemscount = items.length;
                    var containers = PaginatorHQ.getContainers();
                    console.log(containers);
                    if (containers) IllustrationLinker.getContainerLinks(containers);
                }
            }

            var imgs = document.querySelectorAll('[src$="transparent.gif"]');
            for (var i = 0; i < imgs.length; i++) imgs[i].src = imgs[i].getAttribute("data-src");

            //TODO: Change the code here
            //var thumbs = document.querySelectorAll(".image-item, li ._work,  .with-thumbnail li.after a, .with-thumbnail li.before a, .work_wrapper ._work, .ranking-image-item ._work, .image-item .work, .stacc_ref_illust_img, .response .linkStyleWorks a, .thumbnail-container > a._work, .cool-work .works .work");
            var thumbs = document.querySelectorAll(".image-item, .rank-image-container, .ranking-item > .work_wrapper, .ranking-items-container .ranking-image-item, .with-thumbnail li.after, .with-thumbnail li.before, .hotimages .hotimage, .stacc_ref_illust_img, .thumbnail-container, .cool-work .works .work");

            if (thumbs.length == document.thecount) return;
            document.thecount = thumbs.length;

            for (var i = 0, thumbnail, id, link, marked; i < thumbs.length; i++)
            {
                thumbnail = thumbs[i];

                if (!TSL.hasClass(thumbnail, "marked4linker"))
                {
                    TSL.addClass(thumbnail, "marked4linker");
                    link = thumbnail.querySelector("a");
                    if (!link) continue;
                    id = IllustrationLinker.getIllustID(link.href);
                    thumbnail.id = "i" + id;
                    thumbnail.setAttribute("illustration-id", id);
                    marked = document.createElement("span");
                    marked.className = "pppMarker";
                    thumbnail.appendChild(marked);
                    link.onmousemove = link.onmouseleave = link.onmouseenter = PreviewHQ.mouseEvents;
                }
            }
        },

        mouseEvents: function (e)
        {
            var me = this,
                thumbnail = me.parentElement;
            //while (!thumbnail.hasAttribute("illustration-id")) thumbnail = thumbnail.parentElement;
            if (TSL.hasClass(thumbnail, "linked"))
            {
                if (e.type == "mousemove")
                {
                    if (document.pwiid) return;
                    document.pwiid = setTimeout(function ()
                    {
                        PreviewHQ.showPreviewWindow(me);
                        document.pwiid = null;
                    }, 750);
                }
                else //Enter and Leave we reset
                {
                    clearTimeout(document.pwiid);
                    document.pwiid = null;
                }
            }
            else if (!TSL.hasClass(thumbnail, "linked"))
            {
                if (e.type == "mouseleave")
                {
                    clearTimeout(me.timeout);
                    clearInterval(me.interval);
                    delete me.timeout;
                    delete me.interval
                }
                else if (!TSL.hasClass(thumbnail, "linking"))
                {
                    if (me.timeout) return;
                    me.timeout = setTimeout(function ()
                    {
                        me.interval = setInterval(function ()
                        {
                            if (TSL.hasClass(thumbnail, "linked"))
                            {
                                clearInterval(me.interval);
                                delete me.interval
                                PreviewHQ.showPreviewWindow(me);
                            }
                        }, 100);

                        IllustrationLinker.getDataHTML(thumbnail.getAttribute("illustration-id"), true);
                        delete me.timeout;
                    }, 1000);
                }
            }
        },

        showPreviewWindow: function (thumbnail)
        {
            //return;
            while (!thumbnail.hasAttribute("illustration-id")) thumbnail = thumbnail.parentElement;
            var id = thumbnail.getAttribute("illustration-id"),
                metadata = IllustrationLinker.getIllust(id);

            var previewWindow = document.getElementById("PreviewWindow");
            if (previewWindow && previewWindow.getAttribute("illustration-id") == id) return;
            else if (previewWindow) document.body.removeChild(previewWindow);

            previewWindow = document.createElement("section");
            previewWindow.id = "PreviewWindow";
            document.body.appendChild(previewWindow);
            previewWindow.setAttribute("illustration-id", id);

            previewWindow.onmouseenter = previewWindow.onmouseleave = function (e)
            {
                var me = this;
                if (e.type == "mouseenter")
                {
                    clearInterval(me.iid);
                }
                else
                {
                    me.iid = setTimeout(function ()
                    {
                        TSL.removeNode(me);
                    }, 500);
                }
            }

            var metascore = [metadata.bookmarkCount, metadata.viewCount, metadata.ratings, metadata.totalRatings, metadata.responseCount];

            var metaname = ["★", "Views", "Rating", "Total", "Response"];
            var data = document.createElement("summary");
            previewWindow.appendChild(data);

            //Illustration Title
            var el = document.createElement("div"),
                a = document.createElement("a");
            if (metadata.illustType == 1)
            {
                a.href = metadata.illustURL;
                a.textContent = "IMAGE";
            }
            else if (metadata.illustType == 2)
            {
                a.href = "https://www.pixiv.net/member_illust.php?mode=manga&illust_id=" + metadata.illustID;
                a.textContent = "MANGA";
            }
            else
            {
                a.href = "https://www.pixiv.net/member_illust.php?mode=medium&illust_id=" + metadata.illustID;
                a.textContent = "Ugoira";
            }
            a.className = "pppType";
            el.appendChild(a);
            a = document.createElement("a");
            a.textContent = metadata.illustTitle;
            a.setAttribute("style", "display:inline-block;min-width:50px;");
            a.href = "https://www.pixiv.net/member_illust.php?mode=medium&illust_id=" + metadata.illustID;
            el.appendChild(a);
            el.innerHTML += '<span style="color:orange;"> (' + metadata.date.replace(/(\d+)\/(\d+)\/(\d+)/, "$3-$1-$2") + ')</span>';
            data.appendChild(el);

            //Artist Details
            var homeWhite = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAEYSURBVDhPlc6/ToNQGAVw0jRxcPIR3PsQd/cRHLyrPoGb3XR0cmVxbXwAH8DJVdOmpg0F/xcslrZeCp8H+kEJ16bXk/wSwuE7wdoUImpCB+5hj1+bBQcNuIYid7DL9fYkCV0B1dwmSbrDn2yOUsuLWC3pL+g6SsVN/lTPYv5zCrSFPZ8tGnyyTjSNjqPpjMxEl3y2SjgJD8PJdwpkLjzLjwM/OAj8rxjo/4ITy//090GMP8bnQIbs7AZa+V9keX99k0CG2ny2zov3LIEM6QOuM5JABc9xb7yR2845rl3tQB9wBkMJVCG5yjpR6/SBQf9JAlWUA3gWtU4f6Hd7EqiiHMCzqHX6QPfhUYACYuUAd8X7FI5WjWX9AvSXYf8QDbppAAAAAElFTkSuQmCC',
                homeBlack = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABW0lEQVR42mNkwAECAoNZGBkYVgKZCv8ZGFw2rF/7Hps6RmyCvn7+TIwMjIuAstFggf8MJ/4z/HfZvGnjV6IM8Pb2nQakMtGE9wBN8tm6dctPvAZ4eHh1AAXLsRkM9Mo6IBm+Y8f2P1gNcHN1rwBS7Qz4wYL///8n796z6x+KAc5OzkAnM05jIAr8n7h3394CuAEO9g7AwGJcjCtMcBjScODggUZGWxtbb6C+DUARFuI1ww3JZrSxslEEsuSB/nIH0hVE6lzAyMi4EEi/gTvZwsw8AUjNJ9KAxhOnTjagBKKpsQlJBpw+ewbVACMDQxQDGEHhwshwEeJVoBcZ/icgG3DuwnlUAwx09dBdkHjh8qUFUDkHILUf2QCgHKoBulraGAZcvnZ1AVQOwwCgHKoBWuoaGAZcu3ljAVQOwwCgHKoB6iqqIEW7gJgVZsDNO7cXIMnBDPgPlQNFIwMAOj56D6356V8AAAAASUVORK5CYII=';
            el = document.createElement("div");
            a = document.createElement("span");
            a.textContent = "by:"
            a.setAttribute("style", "color:#DDDCDC;margin-right:4px;");
            el.appendChild(a);
            a = document.createElement("a");
            a.href = "https://www.pixiv.net/member.php?id=" + metadata.userID
            a.innerHTML = '<img alt="" src="' + homeWhite + '"/>';
            a.style.marginRight = "4px";
            el.appendChild(a);
            a = document.createElement("a");
            a.href = "https://www.pixiv.net/member_illust.php?id=" + metadata.userID;
            a.textContent = metadata.userName;
            el.appendChild(a);
            data.appendChild(el);

            //Scores
            var IQDBPrefix = "https://" + Settings.IQDBType + ".IQDB.org/?url=";
            el = document.createElement("div");
            console.log(metadata.illustSize);
            if (metadata.illustSize) el.innerHTML = "<a class='meta-box'>" + metadata.illustSize[0] + "x" + metadata.illustSize[1] + "</a>";
            if (metadata.pageCount > 1) el.innerHTML += "<a class='meta-box page-count'>P" + metadata.pageCount + "</a>";
            el.innerHTML += "<a class='meta-box iqdb-link' href='https://" + Settings.IQDBType + ".IQDB.org/?url=" + ((metadata.illustType == 3) ? metadata.illust480URL : metadata.illust150URL) + "&NULL'>IQDB<a>";
            //el.setAttribute("style", "padding: 2px 5px 2px 5px; text-decoration: none; color: #FFF; font-weight:bold;");
            el.innerHTML += '<a href="/response.php?type=illust&amp;id=' + id + '" class="image-response-count ui-tooltip" data-tooltip="Received ' + metascore[4] + ' image responses"><i class="_icon sprites-image-response-badge"></i>' + metascore[4] + '</a>';
            el.innerHTML += '<a href="/bookmark_detail.php?illust_id=' + id + '" class="bookmark-count ui-tooltip" data-tooltip="Received ' + metascore[0] + ' bookmarks"><i class="_icon sprites-bookmark-badge"></i>' + metascore[0] + '</a>';
            for (var i = 1; i < 4; i++) el.innerHTML += "<span class='meta-box'>" + metaname[i] + " " + metascore[i] + "</span>";
            data.appendChild(el);

            if (metadata.illustType == 2 && metadata.pageCount > 1) //Manga
            {
                var thumbContainer = document.createElement("div");
                thumbContainer.id = "ThumbContainer";
                for (var i = 0, thumb; i < metadata.pageCount; i++)
                {
                    thumb = document.createElement("img");
                    var link = document.createElement("a");
                    //thumb.src = metadata.illust150URL.replace(/_p\d+/, "_p" + i);
                    thumb.src = metadata.illust240URL.replace(/_p\d+/, "_p" + i);


                    thumb.alt = "Page #" + i;
                    link.href = metadata.illustURL.replace(/_p\d+/, "_p" + i);
                    link.appendChild(thumb);
                    thumbContainer.appendChild(link);

                    adjustPreviewWindow(thumb);
                }
                previewWindow.appendChild(thumbContainer);
            }
            else if (Settings.display.autoPreview)
            {
                //TODO: Adjust dimension and not height. Landscapes sometimes are too big
                var preview = document.createElement("div"),
                    link = document.createElement("a"),
                    img = document.createElement("img");

                preview.id = "PreviewImage";
                preview.setAttribute("style", "text-align:center;");
                link.href = "https://www.pixiv.net/member_illust.php?mode=medium&illust_id=" + metadata.illustID;
                link.setAttribute("data-fullsize", metadata.illustURL);
                img.setAttribute("style", "margin: auto auto; height: " + Settings.previewDimensions + "px;text-align:center;");
                if (Settings.previewDimensions > 600) img.src = metadata.illust1200URL;
                else if (Settings.previewDimensions > 400) img.src = metadata.illust600URL;
                else img.src = metadata.illust480URL;
                img.alt = "Loading image...";
                link.appendChild(img);
                preview.appendChild(link)
                previewWindow.appendChild(preview);
                adjustPreviewWindow(img);
            }

            function adjustPreviewWindow(image)
            {
                var thumb = thumbnail.querySelector("a"),
                    position = TSL.getAbsolutePosition(thumb),
                    iiid;

                readjust();
                if (image) iiid = setInterval(readjust, 50);

                function readjust()
                {
                    if (image && (image.complete || image.naturalWidth > 0)) clearInterval(iiid);
                    previewWindow.style.top = ((position.top + thumb.clientHeight / 2) - (previewWindow.clientHeight / 2)) + "px";
                    previewWindow.style.left = ((position.left + thumb.clientWidth / 2) - (previewWindow.clientWidth / 2)) + "px";

                    //In perfect world either innerHeight/innerWidth won't include scrollbars or I would figure out if scrollbar is present or
                    if (previewWindow.getClientRects()[0].top < 0) previewWindow.style.top = (parseInt(previewWindow.style.top) + 5 - previewWindow.getClientRects()[0].top) + "px";
                    else if (previewWindow.getClientRects()[0].bottom > window.innerHeight) previewWindow.style.top = (parseInt(previewWindow.style.top) - SideBar.scrollWidth - previewWindow.getClientRects()[0].bottom + window.innerHeight) + "px";

                    if (previewWindow.getClientRects()[0].left < 20) previewWindow.style.left = "20px"; //(parseInt(previewWindow.style.left) + 5 - previewWindow.getClientRects()[0].left) + "px";
                    else if (previewWindow.getClientRects()[0].right > window.innerWidth - 20) previewWindow.style.left = (parseInt(previewWindow.style.left) - 25 - SideBar.scrollWidth - previewWindow.getClientRects()[0].right + window.innerWidth) + "px";
                }
            }
        }
    }


    /*
    ===================================================================================================================================
     Handles all events and functions to do with the sidebar
    ===================================================================================================================================*/
    var SideBar =
{
    iframe: null,
    sidebar: null,
    iDoc: null,
    interval: null,
    scrollWidth: (function getScrollBarWidth()
    {
        var inner = document.createElement('p');
        inner.style.width = "100%";
        inner.style.height = "200px";

        var outer = document.createElement('div');
        outer.style.position = "absolute";
        outer.style.top = "0px";
        outer.style.left = "0px";
        outer.style.visibility = "hidden";
        outer.style.width = "200px";
        outer.style.height = "150px";
        outer.style.overflow = "hidden";
        outer.appendChild(inner);

        document.body.appendChild(outer);
        var w1 = inner.offsetWidth;
        outer.style.overflow = 'scroll';
        var w2 = inner.offsetWidth;
        if (w1 == w2) w2 = outer.clientWidth;

        document.body.removeChild(outer);

        return (w1 - w2);
    })(),

    initalise: function ()
    {
        if (PAGETYPE < 1) return;
        var img = document.createElement("img");
        img.setAttribute("style", "position:fixed; z-index: 100; top: 15px; left: 10px;");
        img.src = "data:image/png;base64,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"
        document.body.appendChild(img);
        img.style.cursor = "pointer";
        img.onmousedown = function ()
        {
            SideBar.iframe.style.visibility = null;
            Settings.display.sidebar = true;
            SideBar.adjustFrameSize();
            Settings.saveSettings();
        };

        var iframe = document.createElement("iframe");
        iframe.onload = function ()
        {
            var iDoc = iframe.contentDocument || iframe.contentWindow.document;

            iDoc.head.innerHTML = '<meta charset="utf-8" />';

            iDoc.body.innerHTML = '<section id="PSideBar" style="min-width: 130px;"><div style="text-align: right; margin: 2px 5px 0 0; padding: 0;"><a href="#" id="SidebarClose"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAADpklEQVR42m2U2UuUURjG329Gx3XcNXcll3EZ9UK9rQgsy5soo5v8C9wSR4zIGyHoJosR6b4uCokiiMirwi4S1EhxwxFRxwUV3JfR2XqeU98wmQdeZr7zfed3nvd9zns0OWe0tLSYIyIi0n0+X7nJZKo0Go0ZmPZ7vV7n6enpsMFgmDw+Pl612+2HZ9dqwQ+NjY1GfFyckJDQkJmZeTsrK+tiSkqKwWw2q/f7+/uysbHhdTqds8vLy/1bW1tvsKmjr6/P9x+wqanJFBIScj03N7etoqLiSlpamoZn0bR/9hS/3y8ej0fW1tZ8Y2NjXxYWFp673e5vgHoCQCoLDQ29WVRU1F1eXl4WFxdHpQp2HpABZbKzs+MZHx8fnpmZ6QL0K5Wqr5ubm605OTn2qqqqS7GxsSiZUYEIZQQPgnQgle7u7npGR0c/Ly4u2np7ex0aYOaYmJjHlZWVHXqaMEJQR7Vob28vAONGUC9HR0dqnkAYxfS9IyMjXajxC629vd0C0CfULT88PFwtglpJTU0VpMGPZXt7W7gR5xITE+Xk5ESgSM0T6nK5BKn/XF1dvaO1tbXdLSkpeQtHDVRGYGlpqVLIwcWERkVFKRhLQVXz8/Oyvr6ugNx4aWnpdHp6uk6z2WxPYUQnUyGQSqKjoyUvL08BOLiA8xwE4NgI1Kh5BjeFQVRpI/A1gPcjIyMlLCxM4LYygooKCgokKSkpUEPCmCqBev104OHhoUxMTPRora2trzIyMhqSk5OFUKoklPUsLCwUvAscHdbK4XDIysqKMowwdI6CbW5uUvUzDQf6CdrsEVNmUFl8fLxYrVZljl4z1pYDLSeolaohNzg4OFDmMGU8P9BwqG8h1XcAGQmjutraWrFYLApGBZOTk8IM0I4KSkWDg4MyOzsbSBfhwrc3CCxAwT8i3WKmTGBNTY3gGKmU0F4yNTWljKqurpbs7GylamBgQNB2SiXPJWIImdwjMApKOqCyC0AD0lep46CrVKmOvxxoACkrK1Ogubk5BWIJ8OuGuk500Eu9ly1wtgfQawCG0BA6TbU0STeFYJZAvyD+qiPsPUx6iF5e0IFs2KsofDcA1YTqZ5Jm6P1MZ/WjQjDUEfYd8114/QNAf+AqAZQn9zIWt0BZHYC8gUS/KIKvLgZA4LqpzI5XQ/qdePaCpZQ8AOoBrgfMijAFA6HQhfgFUD+eP2B6kcrOvbGDwBGAXMDffEQFIv0Pz+/E7xhiHrEBkOvs2t9OIDX6eVLvRgAAAABJRU5ErkJggg==" /></a></div><div id="hiddenCtrl" style="font-size: x-small; text-align: center; margin: 2px; display: none;"><input id="pagingOffset" type="text" style="width: 40px; margin: 0px 3px;" title="Page Offset" /><select id="pageFetchMethod" title="Page Fetch Method"><option title="GM_xmlHttpRequest">1G</option><option title="xmlHttpRequest">2X</option><option title="iframe">3F</option></select></div><hr style="margin-top: 2px;" /><div><table id="InfoTable"><tbody><tr><td>Pages</td><td></td></tr><tr><td>Images</td><td></td></tr></tbody></table></div><hr /><section><div style="text-align: center;"><a name="displayOptions" href="#"><div class="bgiY blockButtonOn" style="border-color: yellow;">Display Options</div></a></div><div id="DisplayOptions" class="aY" style="border: 2px solid yellow; padding-bottom: 5px;"><table class="switchTable"><tbody><tr class="switchCellOn"><td><a name="artistName" href="#"><div></div></a></td><td><a name="artistName" href="#">Artist Name</a></td></tr><tr class="switchCellOn"><td><a name="illustTitle" href="#"><div></div></a></td><td><a name="illustTitle" href="#">Illustration Title</a></td></tr><tr class="switchCellOff"><td><a name="illustLink" href="#"><div></div></a></td><td><a name="illustLink" href="#">Illustration Link</a></td></tr><tr class="switchCellOff"><td><a name="mangaLinks" href="#"><div></div></a></td><td><a name="mangaLinks" href="#">Manga Links</a></td></tr><tr class="switchCellOn"><td><a name="countList" href="#"><div></div></a></td><td><a name="countList" href="#">Count-List</a></td></tr></tbody></table><hr /><table class="switchTable"><tbody><tr class="switchCellOff"><td><a name="IQDBLink" href="#"><div></div></a></td><td><a name="IQDBLink" href="#">IQDB Link</a></td></tr></tbody></table><div class="selectHolder"><select id="IQDBOptions"><option>danbooru</option></select></div><hr /><table class="switchTable"><tbody><tr class="switchCellOn"><td><a name="autoPreview" href="#"><div></div></a></td><td><a name="autoPreview" href="#">Preview Image</a></td></tr></tbody></table><div class="selectHolder"><select id="previewDimensions"><option>250px</option></select></div></div></section><section><div style="text-align: center;"><a name="filterOptions" href="#"><div class="bgiC blockButtonOn" style="border-color: cyan;">Filter Options</div></a></div><div id="FilterOptions" class="aC" style="border: 2px solid cyan;"><ul><li><input type="checkbox" name="ageRating" />Safe</li><li><input type="checkbox" name="ageRating" />R18</li><li><input type="checkbox" name="ageRating" />R18G</li></ul><table class="filterTable"><tbody><tr><td><input id="tagsInclude" type="text" /></td><td><a name="tagsInclude" href="#"><div class="bgiG"></div></a></td></tr><tr><td><input id="tagsExclude" type="text" /></td><td><a name="tagsExclude" href="#"><div class="bgiG"></div></a></td></tr></tbody></table><hr /><div style="text-align: center;"><a name="filterSwitch" href="#"><div class="miniButtonOff" style="width: 80%;">Filter Options</div></a></div><table><tbody><tr><td style="width: 16px;"><input type="checkbox" name="filterType" value="2" checked="checked" /></td><td colspan="3">Illustrations</td></tr><tr><td><input type="checkbox" name="filterType" value="4" checked="checked" /></td><td colspan="3">Mangas</td></tr><tr><td><input type="checkbox" name="filterType" value="8" checked="checked" /></td><td>Bookmarks</td><td><input class="filterValue" type="text" /></td><td style="width: 10px;"><input type="radio" name="sortType" value="0" /></td></tr><tr><td><input type="checkbox" name="filterType" value="16" checked="checked" /></td><td>Views</td><td><input class="filterValue" type="text" /></td><td><input type="radio" name="sortType" value="1" /></td></tr><tr><td><input type="checkbox" name="filterType" value="32" checked="checked" /></td><td>Ratings</td><td><input class="filterValue" type="text" /></td><td><input type="radio" name="sortType" value="2" /></td></tr><tr><td><input type="checkbox" name="filterType" value="32" checked="checked" /></td><td>Total</td><td><input class="filterValue" type="text" /></td><td><input type="radio" name="sortType" value="3" /></td></tr></tbody></table><div style="text-align: center; margin-bottom: 3px;"><a name="Sort" href="#"><div class="blockButtonOn bgiC" style="width: 50px;">Sort</div></a><a name="Unsort" href="#"><div class="blockButtonOn bgiC" style="width: 50px;">Unsort</div></a></div><ul class="filterSet"><li><span style="background-color: yellow;"><input type="radio" name="filterSet" value="0" /></span></li><li><span style="background-color: pink;"><input type="radio" name="filterSet" value="1" /></span></li><li><span style="background-color: red;"><input type="radio" name="filterSet" value="2" /></span></li><li><span style="background-color: darkgreen;"><input type="radio" name="filterSet" value="3" /></span></li><li><span style="background-color: blue;"><input type="radio" name="filterSet" value="4" /></span></li></ul></div></section></section>';
            var sidebar = iDoc.body.firstElementChild;
            iDoc.body.appendChild(sidebar);

            SideBar.sidebar = sidebar;
            SideBar.iDoc = iDoc;
            SideBar.iframe = iframe;


            TSL.addStyle(null, ".bgiY{background-color: yellow;background-image: linear-gradient(bottom, rgb(255,255,250) 0%, rgb(255,255,0) 50%, rgb(255,255,250) 100%);background-image: -o-linear-gradient(bottom, rgb(255,255,250) 0%, rgb(255,255,0) 50%, rgb(255,255,250) 100%);background-image: -moz-linear-gradient(bottom, rgb(255,255,250) 0%, rgb(255,255,0) 50%, rgb(255,255,250) 100%);background-image: -webkit-linear-gradient(bottom, rgb(255,255,250) 0%, rgb(255,255,0) 50%, rgb(255,255,250) 100%);background-image: -ms-linear-gradient(bottom, rgb(255,255,250) 0%, rgb(255,255,0) 50%, rgb(255,255,250) 100%);background-image: -webkit-gradient( linear, left bottom, left top, color-stop(0, rgb(255,255,250)), color-stop(0.5, rgb(255,255,0)), color-stop(1, rgb(255,255,250)) );}.bgiC{background-color: cyan;background-image: linear-gradient(bottom, rgb(200,255,255) 0%, rgb(0,255,255) 50%, rgb(200,255,255) 100%);background-image: -o-linear-gradient(bottom, rgb(200,255,255) 0%, rgb(0,255,255) 50%, rgb(200,255,255) 100%);background-image: -moz-linear-gradient(bottom, rgb(200,255,255) 0%, rgb(0,255,255) 50%, rgb(200,255,255) 100%);background-image: -webkit-linear-gradient(bottom, rgb(200,255,255) 0%, rgb(0,255,255) 50%, rgb(200,255,255) 100%);background-image: -ms-linear-gradient(bottom, rgb(200,255,255) 0%, rgb(0,255,255) 50%, rgb(200,255,255) 100%);background-image: -webkit-gradient( linear, left bottom, left top, color-stop(0, rgb(200,255,255)), color-stop(0.5, rgb(0,255,255)), color-stop(1, rgb(200,255,255)) );}.bgiL, .switchCellOn > td:first-child, .miniButtonOn{background-color: rgb(0,255,0);background-image: linear-gradient(bottom,rgb(200,255,200) 0%, rgb(0,255,0) 50%, rgb(200,255,200) 100%);background-image: -o-linear-gradient(bottom, rgb(200,255,200) 0%, rgb(0,255,0) 50%, rgb(200,255,200) 100%);background-image: -moz-linear-gradient(bottom, rgb(200,255,200) 0%, rgb(0,255,0) 50%, rgb(200,255,200) 100%);background-image: -webkit-linear-gradient(bottom, rgb(200,255,200) 0%, rgb(0,255,0) 50%, rgb(200,255,200) 100%);background-image: -ms-linear-gradient(bottom, rgb(200,255,200) 0%, rgb(0,255,0) 50%, rgb(200,255,200) 100%);background-image: -webkit-gradient( linear, left bottom, left top, color-stop(0, rgb(200,255,200)), color-stop(0.5, rgb(0,255,0) ), color-stop(1, rgb(200,255,200)) );}.bgiG, .switchCellOff > td:first-child, .miniButtonOff{background-color: rgb(156,156,156);background-image: linear-gradient(bottom, rgb(238,238,238) 0%, rgb(156,156,156) 50%, rgb(238,238,238) 100%);background-image: -o-linear-gradient(bottom, rgb(238,238,238) 0%, rgb(156,156,156) 50%, rgb(238,238,238) 100%);background-image: -moz-linear-gradient(bottom, rgb(238,238,238) 0%, rgb(156,156,156) 50%, rgb(238,238,238) 100%);background-image: -webkit-linear-gradient(bottom, rgb(238,238,238) 0%, rgb(156,156,156) 50%, rgb(238,238,238) 100%);background-image: -ms-linear-gradient(bottom, rgb(238,238,238) 0%, rgb(156,156,156) 50%, rgb(238,238,238) 100%);background-image: -webkit-gradient( linear, left bottom, left top, color-stop(0, rgb(238,238,238)), color-stop(0.5, rgb(156,156,156)), color-stop(1, rgb(238,238,238)) );}.bgiB, #PSideBar, .blockButtonOff{background-color: black;background-image: linear-gradient(bottom, rgb(80,80,80) 0%, rgb(0,0,0) 50%, rgb(80,80,80) 100%);background-image: -o-linear-gradient(bottom, rgb(80,80,80) 0%, rgb(0,0,0) 50%, rgb(80,80,80) 100%);background-image: -moz-linear-gradient(bottom, rgb(80,80,80) 0%, rgb(0,0,0) 50%, rgb(80,80,80) 100%);background-image: -webkit-linear-gradient(bottom, rgb(80,80,80) 0%, rgb(0,0,0) 50%, rgb(80,80,80) 100%);background-image: -ms-linear-gradient(bottom, rgb(80,80,80) 0%, rgb(0,0,0) 50%, rgb(80,80,80) 100%);background-image: -webkit-gradient( linear, left bottom, left top, color-stop(0, rgb(80,80,80)), color-stop(0.5, rgb(0,0,0)), color-stop(1, rgb(80,80,80)) );}.aY a:link, .aY a:visited{color: yellow;}.aC a:link, .aC a:visited{color: cyan;}a, td, input, select, option, ul, span{text-decoration: none;font-size: small;}a, td, ul{color: white;}input, select, option, span{text-align: right;font-size: smaller;}hr{margin: 5px;}", iDoc);
            TSL.addStyle(null, "#PSideBar{top: 0px;left: 0px;border: 2px ridge black;display: inline-block;color: white;}#PSideBar > div, #PSideBar > section > div{margin: 2px 5px 2px 5px;}.blockButtonOff, .blockButtonOn, .miniButtonOn, .miniButtonOff{width: 90%;display: inline-block;text-align: center;border-radius: 20px;border: 2px solid;}.blockButtonOn{color: black;}.blockButtonOff{color: rgb(156,156,156);}.miniButtonOff, .miniButtonOn{color: black;}.switchTable, .filterTable{padding: 2px 5px 0px 5px;text-decoration: none;}.switchTable * tr > td:first-child > a > div{width: 100%;height: 100%;}.switchTable * tr > td:first-child{width: 12px;height: 12px;border-radius: 10px;display: inline-block;}.switchCellOff > td:last-child > a:link, .switchCellOff a:visited{color: white;}#InfoTable tr > td:first-child{padding-right: 5px;border-right: 1px solid gray;}#InfoTable tr > td:last-child{padding-left: 5px;}.selectHolder{padding: 0 8px 0 8px;}.selectHolder > select{font-size: small;width: 100%;}ul{margin: 0;padding: 0;list-style-type: none;text-align: center;}ul > li{display: inline;border-right: 1px solid gray;padding-right: 5px;}ul > li:last-child{border-right: none;}ul > li > span{display: inline-block;}.filterSet{margin-bottom: 5px;}.filterSet > li{border: none;padding-right: 1px;}.filterSet input{margin: 4px;}.filterValue{color: black;width: 38px;}.buttonG > span{background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAEPUlEQVR42m2VW0wcZRiG35md8+7sLLjsdgsL8YoKF5JUNJoYb4y9NKWJ1KaNBuXQQ1ITm0avbGJSIzRpMKWcCmKLpMV0MRhIbKgXSFFCGr3oRcFShG13wT1x2uPs7vjPdFm2hZm8meP/zPt93/9/Q2GPrb+/X3I4HHWyLB9mWbaWyJXJZBCPx/1Es9FodGRtbc3T2NgYe3EsVXjR2dlJlZWV1ZeWlrYqiuLe2NjA4pNH+C/sJ29qcBS7sL+kHCbahGAw6A2Hw+c3NzdvtbS0aLuAAwMDTEVFRXt5eflJ/4qPuj7SgweL9wE2DU5koDEZqIiDYRnUvPwm3q/9GFTWpK2urnYS6NmmpqZ0HtjR0UFVVVVdIcBTd3//FX2e71Bkt4EVaGh0GllTGlqBVCqOLNlPvPYFKpRX4Pf7r25tbZ3RnRrA0dHRo9XV1UO/3btDXfNchmu/C1l6B5A1qTtAZlsqVC2Bj6q/hp2u0AKBwLGGhoabVF9fn1RTU/Mwnoy5P2/7lMCcOUg6505FLLOORHYTGVMKNKeBESji3mQcGZrHZ1XfY9Ub9CYSiQPU2NjY8crKyhtt1y5gKTwHXs9XDriZCiMU95NzAuIBky4hdyRidBHwW9Z6vMHXg+TzBDU5OXnbIlvqTrd+AMe+kmcwWkUw+hRrqYAxMA8rVAFYZl9Ci3UQy0vLHmpqamo5sO53f/vTOThKngHDiRWE4ys7MGEP4Av3P2F/QOhxwkvNzMyofy/MMD/euwxFsSKpRfF0fYGAtN3uhO1QSe7IDNBzqF9TXBZHtDakHlnT1PT0tPpgeZYZ/PMSrIqMQOwJ4tpGHlII1AG8yBJx4ATWAOvPKTaDQ7GvkJyT09TExMTyhhpyX7p7GjbFBt/WglFJA1YQkj4nRUmEKIoQckATRxvvaqyKQysXEZwnIY+Pj98uKi6q+/KXI2DMGiIp/y5nOkwySzBLZgKUIAgCOJ445Mg0JuFCNeHdfy+Song91PDw8HGyQm4M/9WOmbWfodKx58MkEiUJFrNMgBaYBXMOyMHE6sAM7L6DcC2+g1AodILq7e2VXC7XQ1Hm3N/c/xAxNvRc9TiBgWy2wiLJsIhWSKIFEm8Gx/EECGRTFF79pxlL8z4vWXQHjKU3ODh41Ol0DvmSc9T11XPI8ol8VSWSM9msGDBDAoHyMgROAkiPKZ17D7FFTiNr+Vhzc/NNA9jV1UVZrdYrdrv91EpmDp7oBSTEkFFVPUxZzAEFxQCaOQVCqgjOx28j4eUQiUSuEswZAtTy7aunp4fheb6dgE+KCkv9kRzCvHQHJiWVh5l1mGqHM3wQ+0KvI+iL6M46yfCzBJbe1WB1pwzD1NM03Wqz2dyiJCDGB5HkIkZTFdRicDEbolsxvQB6zs4T3dKd7dmxt7fu7m6SINQRHSaqJR9w6fez2Sxp3ZglGiHyENCuX8D/3p++AfxYDl8AAAAASUVORK5CYII=);}.buttonR > span{background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAD+UlEQVR42nWVS0xTWRjHv9PeR1t6+4AC00BpMhsQNiRGExfGnXsxETWaGCIUH4kbY9xpYuJCTQxGBEpAjIQAiWBIIJGwmBBkwjDsJpGO4IwUW5i+0JbS0sed/7lOGRC4yT9fz+k9v37PU0YHPL29vaaysrIGRVHOiKJ4DHLmcjna2toKQvObm5ujGxsbI83Nzckfz7Ldi46ODlZZWdlYUVHxyGq1uuLfvtHa0hLFg0FiqkqK00m2qirS6fUUDof90Wj0TjweH2ptbVX3Afv6+gS3291WVVV1LRQIsF+8XgotLJCUzZIsCKSHh3CRdPhceuIE1Vy5Qlm9Xl1fX+8A9FZLS0t2B9je3s5qa2ufA3j993fv6P2zZ1Ris5Gk05EOQC79LssAzuXz9PPdu2Q8coSCweCLRCJxk3uqAcfGxs7X1dUNLExOsl+fPqUyhLYHlMnsAWrCnppKkfPBA8q53WooFLrY1NQ0yHp6ekz19fWLmWTSNXT1KpWXl+8c1v0Hy339Smo8TvrtbRKRS4kxkpBHbkmW6aeXL2kFOU2lUjVsfHz8UnV19evR+/cp7fORATkqwLLRKKVQEA2ESKRdKqxlgPWNjZSHkM/LbHp6+o1iNjcMnjtHZaWlO16lvnyh7VBoz+EfYQWxkhJi/f3098rKCJuZmVlJBoOu97dvkx1AHm56bU3TYYCD1ulXr2gplfKzubm5TGBuTvChGGaLhWhzkxLLy99zdRgMuZPRAdzytYiKJx8/Jp/FkmWzs7OZf+bnheUnT6hIUSi1ukoqGvogmAYSRZIlSbMiLw72BfRo9N49+qAoWTY1NbWiRiKuP27cIAW9lzzMO3hkMBo1caDEgdjj7wrI+eeHD8nHQ56YmHhTbLc3/Hb2LJnxZQZVPQhmNJnIUFREMqxkMHwHwkMB4W6j0h8B/Oz3j7Dh4eFLmJDXH9vaKPP2LemSyX1AAyBGpEM2m0kGVAPCS4EDEe7q0aO0fOoURSKRy6y7u9vkdDoXrZLk+uvCBZIjkT0wPscGFMsAILcSoBKgIhpa4NUFdNHjoT8DAT+WNdro9ff3n8eEDOR9PpZE+8gYqR0gcma0WkkGrCARcBFe8yvmw+nT9EmSVMzyRY/HM6gBOzs7mcViee5wOK4zTIuKqTHBU15VAw8TQM07WIkDYdN2Oy2dPEl+hB6LxV4AcxNAdef68nq9gizLbQBfs4kiUwcGSJmcJAvGbjds2+GgMHIWPn6cArEY96wDx28B9v/1VXi4p4IgNOp0ukc2m81lQvIN4TDJsZh2qaaLiymJ1kqgcCgAz9kdaIh7duCNXXi6urpMMA3QGegYfsDJ9/P5fBBmHhqFRgDa9xfwL7RWxwHoNf0IAAAAAElFTkSuQmCC);}.buttonOff > span, .buttonOn > span{height: 20px;width: 20px;display: inline-block;}.buttonOff > span{background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAADWElEQVR42nWVyy9rURTG16Ze9Y5nw2EkhEiQmPkTJKIGaJgQj4rE7A7NTAwkotQ7koogUSFhgIGISMSAgYGJiDZR77d6tJy7vp2c3nPb2snK7mn3/u1vfWvtU0FhxvT0tDEzM9OcmJhYGxUVVclh+v7+pvf3dw/Hwdvb2/Lj46Ozra3NG7xX6B/sdrvIzc2tz8nJ6U9OTlaen5/p9PSUrq6uSAhBWVlZxL9RZGQk3d7euu/v7/+8vLwsdHZ2qiHAmZkZQ35+/mBeXp714uJCTE5O0tHRkQTFxsbK2e/3U0xMDFVUVFBNTQ2+U/kwO0N72tvb/QHg8PCwKC4utjGwa2Njg2w2G6WlpcnNgZOFCMxIH7PFYiFFUcjj8Yy8vr52Q6lctbq62lBSUjK3ubkphoaGZFoaIBimD4AbGxspNTVVvbm5sbS0tMyLqakpY1lZ2YnX61WsVmsIDOPj44O+vr5IVVUyGAwUHR0t1WNGtLa20uXlpZvXFYm1tbWmwsJCR19fH52dnQX8wuBq0sPDg/zMlQ4JDVxeXk6lpaUoXrPY2dlZSkhIMOOU7OzsAOzu7o7Y7LAgPRAztxfV1dXR+fm5U+zu7rqur68VKERbAMg9JkO/6TeYFtXV1VDoFvv7+77Dw0ODw+GAueTz+VA16dVvQL2HeMbaqqoq4r71i729Pd/x8bFhdnaWUlJSZKqfn59hYXiOi4uTPiPwDBiCC4us/GJra8vFXikDAwNSIW5FOHVQZDQaKT4+XkI1hbg1ERERxG2HzNxifX19iUHm3t5euejp6SnEJ8xcOBmAakD8BiBGQUEBuVwup1hcXGziG+JwOp3yqqFZg4FQhUoCqFeITKAOnxFsV7OYmJgwmkymE16k4JagKHogvALsNyAEZGRkoIfdLLRINh0XpIFbZo7bR6ysrMjWCVanByJtHISBddz8Kt9lS0dHx7wEjo6OiqSkJFt6enoXv5Zoe3ubfn5+/vMOQMC00AoHzxk4wphuBqqBSzs+Pm7gNAYZbOUNglsJ91OmpkEBwiFatTkjKLPz9h6G/Xt9aQNK+eR6Nrqfe1KBV/AUPqGaUAU7cMe5APDsD8cClIV9Y2tjbGzMyJOZo5ajkg8w4Xu2wcPTAccyh5NBIX8BfwGUUXYBm4oiewAAAABJRU5ErkJggg==);}.filterTable div{width: 15px;height: 15px;border-radius: 2px;border: 2px solid black;}.filterTable input{text-align: left;}", iDoc);
            TSL.addStyle(null, "body {margin: 0; padding:0;}", iDoc);


            // Settings to hide according to the page type.


            var TimidScript = GM_getValue("TimidScript", false) === true;
            if (PAGETYPE > 1 && TimidScript)
            {
                var hc = iDoc.getElementById("hiddenCtrl");
                hc.style.display = null;
                hc.style.textAlign = "left";

                hc.removeChild(iDoc.getElementById("pageFetchMethod"));
                hc.title = "If checked implies usage of GM_xmlhttpRequest rather than XMLHttpRequest.\nP > Next page fetching.\nA > All pages apart from illustration page. \nI > Illustration page"
                hc.innerHTML += '<select id="gbm" title="Get Bookmark on:\nNone\nThumbnails\n\Thumbnails + Illustration Page"><option>None</option><option>All-I</option><option>All+I</option></select>'
                hc.innerHTML += 'P<input type="checkbox" />A<input type="checkbox" />I<input type="checkbox" />';


                var els = iDoc.getElementById("gbm");
                els.selectedIndex = GM_getValue("RequestBookmarkCount", 0);
                els.onchange = function ()
                {
                    GM_setValue("RequestBookmarkCount", this.selectedIndex);
                };

                var els = hc.querySelectorAll("input[type=checkbox]");
                for (var i = 0; i < els.length; i++)
                {
                    els[i].checked = (Settings.requestMethod & Math.pow(2, i + 1));
                    els[i].onclick = function ()
                    {
                        Settings.requestMethod = 0;
                        var chk = iDoc.querySelectorAll("#hiddenCtrl input[type=checkbox]");
                        for (var j = 0; j < chk.length; j++)
                        {
                            Settings.requestMethod += (chk[j].checked) ? Math.pow(2, j + 1) : 0;
                        }
                        console.log("New Request Method: " + Settings.requestMethod);
                        GM_setValue("RequestMethod", Settings.requestMethod)
                    };
                }

                var offset = iDoc.getElementById("pagingOffset");
                offset.value = Settings.pagingOffset;
                offset.onfocus = function (e) { e.target.select(); }
                offset.oninput = function (e)
                {
                    var el = e.target;
                    if (el.value.length > 5 || isNaN(el.value[el.value.length - 1])) el.value = el.value.substring(0, el.value.length - 1);
                    if (isNaN(el.value) || el.value < 100) Settings.pagingOffset = 100;
                    else Settings.pagingOffset = el.value;
                    Settings.saveSettings();
                };
            }
            else
            {
                iDoc.getElementById("pagingOffset").style.display = "none";
                iDoc.getElementById("pageFetchMethod").style.display = "none";
            }

            if (PAGETYPE < 2)
            {
                iDoc.getElementById("FilterOptions").parentElement.style.display = "none";
            }
            else
            {
                iDoc.getElementById("FilterOptions").style.display = (Settings.display.filterOptions) ? null : "none";
                //How to handle AgeRating functions
                if (PAGETYPE != 8)
                {
                    var ars = iDoc.getElementsByName("ageRating");
                    for (var i = 0; i < ars.length; i++)
                    {
                        ars[i].onclick = SideBar.onAgeRatingFilter;
                    }
                }
                else iDoc.getElementsByName("ageRating")[0].parentElement.parentElement.style.display = "none";
            }

            iDoc.getElementById("DisplayOptions").style.display = (Settings.display.displayOptions) ? null : "none";

            var switchLinks = sidebar.getElementsByTagName("a");
            for (var i = 0; s = switchLinks[i], i < switchLinks.length; i++)
            {
                if (s.id == "SidebarClose") //No toggling here
                {
                    s.onclick = function ()
                    {
                        SideBar.iframe.style.visibility = "hidden";
                        document.getElementById("wrapper").style.margin = null;
                        Settings.display.sidebar = false;
                        Settings.saveSettings();
                    }
                }
                else if (s.name)
                {
                    switch (s.name)
                    {
                        case "filterSwitch":
                            SideBar.switchSet(s, false);
                            break;
                        case "Sort":
                        case "Unsort":
                            break;
                        case "tagsInclude":
                        case "tagsExclude":
                            //Filter search text
                            var txt = iDoc.getElementById(s.name);
                            txt.value = Settings.filter[s.name];
                            txt.oninput = SideBar.onInputTagFilter;
                            break;
                        default:
                            SideBar.switchSet(s, Settings.display[s.name]);
                            break;
                    }

                    s.onclick = SideBar.onSwitchPressed;
                }
            }


            //-------------------------------------------//
            //Checking filters
            var filters = iDoc.getElementsByName("filterType");
            for (var i = 0; i < filters.length; i++)
            {
                var bitValue = Math.pow(2, i + 1);
                filters[i].checked = (bitValue & Settings.filter.flag) ? true : false;
                filters[i].onclick = SideBar.onToggledFilter;
            }


            //-------------------------------------------//
            //Loading filter values
            var filterSets = iDoc.getElementsByName("filterSet");
            for (var i = 0; i < filterSets.length; i++) { filterSets[i].onclick = SideBar.onRadioClick; }
            iDoc.getElementsByName("filterSet")[Settings.filter.set].checked = true;
            SideBar.loadFilterSet();

            var els = sidebar.getElementsByClassName("filterValue");
            for (var i = 0; i < els.length; i++)
            {
                els[i].oninput = SideBar.onInputFilterValue;
                els[i].onfocus = function (e) { e.target.select(); };
            }


            //-------------------------------------------//
            //Sort type
            var sortTypes = iDoc.getElementsByName("sortType");
            for (var i = 0; i < sortTypes.length; i++) sortTypes[i].onclick = SideBar.onRadioClick;
            SideBar.iDoc.getElementsByName("sortType")[Settings.sortType].checked = true;

            //-------------------------------------------//
            //Load IQDB options and set them
            var IQDBTypes = ["All", "anime-pictures", "danbooru", "e-shuushuu", "haruhidoujins", "gelbooru", "konachan", "mangadrawing", "sankaku", "theanimegallery", "yandere", "zerochan"];
            var sel = iDoc.getElementById("IQDBOptions");
            sel.innerHTML = "";
            for (i = 0; i < IQDBTypes.length; i++)
            {
                var opt = iDoc.createElement("option");
                opt.textContent = IQDBTypes[i];
                sel.add(opt);
                if (IQDBTypes[i] == Settings.IQDBType) opt.selected = true;
            }
            if (Settings.IQDBType == "www") sel.selectedIndex = 0;
            sel.onchange = function (e)
            {
                var sel = e.target;
                if (sel.selectedIndex == 0) Settings.IQDBType = "www";
                else Settings.IQDBType = sel.options[sel.selectedIndex].textContent;
                if (Settings.display.IQDBLink) PaginatorHQ.updateAllIQDBLinks();
                Settings.saveSettings();
            };


            //-------------------------------------------//
            //Preview height settings
            sel = iDoc.getElementById("previewDimensions");
            sel.innerHTML = "";
            for (i = 0; i <= 10; i++)
            {
                var size = i * 50 + 200;
                var opt = iDoc.createElement("option");
                opt.textContent = size + "px";
                opt.value = size;
                sel.add(opt);
                if (size == Settings.previewDimensions) opt.selected = true;
            }
            sel.onchange = function (e) { var sel = e.target; Settings.previewDimensions = sel.options[sel.selectedIndex].value; Settings.saveSettings(); };

            iDoc.body.setAttribute("style", "width: auto; height: auto;");
            iframe.setAttribute("style", "z-index: 1000; position:fixed; top: 0px; left:0px;");

            window.addEventListener("resize", SideBar.adjustFrameSize);
            SideBar.iframe.style.visibility = "hidden";
            if (Settings.display.sidebar) img.click();

            if (Settings.fetch.metadata) IllustrationLinker.switchOn();
            else IllustrationLinker.switchOff();
        }
        document.body.appendChild(iframe);
    },


    switchMain: function (s)
    {
        if (s.className) return s;
        if (s.firstElementChild && s.firstElementChild.className) return s.firstElementChild;

        var depth = 0;
        while (!s.className)
        {
            s = s.parentElement;
            if (s.className) return s;
            if (++depth == 2) return s;
        }
    },

    switchSet: function (s, enable)
    {
        var m = SideBar.switchMain(s);
        m.className = (enable) ? m.className.replace("Off", "On") : m.className.replace("On", "Off");
    },

    switchToggle: function (s)
    {
        var m = SideBar.switchMain(s);
        var enabled = !(SideBar.switchMain(m).className.indexOf("On") >= 0);
        SideBar.switchSet(m, enabled);
        return enabled;
    },

    adjustFrameSize: function (e)
    {
        if (SideBar.sidebar.offsetHeight > window.innerHeight)
        {
            SideBar.iframe.style.height = (window.innerHeight + 5) + "px";
            SideBar.iframe.style.width = (SideBar.sidebar.offsetWidth + SideBar.scrollWidth + 2) + "px";
        }
        else
        {
            SideBar.iframe.style.height = (SideBar.sidebar.offsetHeight + 5) + "px";
            SideBar.iframe.style.width = (SideBar.sidebar.offsetWidth + 2) + "px";
        }

        console.log(window.innerWidth);
        if (window.innerWidth < 1200 || !Settings.display.sidebar || (document.getElementById("wrapper").offsetLeft >= parseInt(SideBar.iframe.style.width) + 5)) return;
        document.getElementById("wrapper").style.marginLeft = (parseInt(SideBar.iframe.style.width) + 5) + "px";
    },


    /*
    ------------------------------------------------------
     Handles all link elements that behave like a button
    ------------------------------------------------------*/
    onSwitchPressed: function (e)
    {
        e.stopPropagation();
        //e.preventDefault(); //Stops propagating to parent
        var s = e.target;
        while (s.tagName != "A") s = s.parentElement;

        var enabled;
        if (s.name != "Sort" && s.name != "Unsort") enabled = SideBar.switchToggle(s);
        if (Settings.display[s.name] != undefined) Settings.display[s.name] = enabled;
        if (Settings.fetch[s.name] != undefined)
        {
            Settings.fetch[s.name] = enabled;
        }

        switch (s.name)
        {
            case "Sort":
            case "Unsort":
            case "tagsInclude":
            case "tagsExclude":
            case "filterSwitch":
                if (PaginatorHQ.status != 0)
                {
                    alert("Sort/Filter is already in progress.");
                }
                else if (s.name == "filterSwitch")
                {
                    if (enabled) Settings.filterSwitchFlag = (Settings.filterSwitchFlag | 2);
                    else Settings.filterSwitchFlag -= (Settings.filterSwitchFlag & 2);
                    PaginatorHQ.filterResult();
                }
                else if (s.name == "tagsInclude" || s.name == "tagsExclude")
                {
                    var btn = e.target;
                    if (btn.className == "bgiL" && btn.style.borderColor == "rgb(0, 0, 0)")
                    {
                        btn.className = "bgiG";
                        enabled = false;
                    }
                    else
                    {
                        btn.style.borderColor = "rgb(0, 0, 0)";
                        btn.className = "bgiL";
                        enabled = true;
                    }

                    if (s.name == "tagsInclude")
                    {
                        if (enabled) Settings.filterSwitchFlag = (Settings.filterSwitchFlag | 4);
                        else Settings.filterSwitchFlag -= (Settings.filterSwitchFlag & 4);
                    }

                    if (s.name == "tagsExclude")
                    {
                        if (enabled) Settings.filterSwitchFlag = (Settings.filterSwitchFlag | 8);
                        else Settings.filterSwitchFlag -= (Settings.filterSwitchFlag & 8);
                    }

                    PaginatorHQ.filterResult();
                }
                else
                {
                    PaginatorHQ.sortingMethod = (PaginatorHQ.sortingMethod != 0) ? 0 : 1;
                    PaginatorHQ.sortByScore((s.name == "Sort"));
                }
                break;
            case "displayOptions":
                SideBar.iDoc.getElementById("DisplayOptions").style.display = (enabled) ? null : "none";
                break;
            case "filterOptions":
                SideBar.iDoc.getElementById("FilterOptions").style.display = (enabled) ? null : "none";
                break;
            default:
                PaginatorHQ.updateVisibilityOfAllElements();
                break;
        }

        Settings.saveSettings();
        SideBar.adjustFrameSize();
        return false;
    },

    onToggledFilter: function (e)
    {
        Settings.filter.flag = 0;
        var filters = SideBar.iDoc.getElementsByName("filterType");
        for (var i = 0; i < filters.length; i++)
        {
            var bitValue = Math.pow(2, i + 1);
            Settings.filter.flag += (filters[i].checked) ? bitValue : 0;
        }

        Settings.saveSettings();
        PaginatorHQ.filterResult();
    },

    onAgeRatingFilter: function (e)
    {
        var ars = SideBar.iDoc.getElementsByName("ageRating");
        for (var i = 0; i < ars.length; i++)
        {
            var val = Math.pow(2, i + 4);
            Settings.filterSwitchFlag -= (Settings.filterSwitchFlag & val); //Remove the bit switch
            if (ars[i].checked) Settings.filterSwitchFlag += val;
        }
        PaginatorHQ.filterResult();
    },

    onRadioClick: function (e)
    {
        switch (e.target.name)
        {
            case "filterSet":
                Settings.filter.set = e.target.value;
                SideBar.loadFilterSet();
                Settings.saveSettings();
                if ((Settings.filterSwitchFlag & 2) == 2) PaginatorHQ.filterResult();
                break;
            case "sortType":
                Settings.sortType = e.target.value;
                Settings.saveSettings();
                break;
        }
    },

    onInputFilterValue: function (e)
    {
        e.target.value = parseInt(e.target.value);
        if (e.target.value.length > 6) e.target.value = e.target.value.substring(0, 6);

        var values = SideBar.sidebar.getElementsByClassName("filterValue");
        for (var i = 0; i < values.length; i++) Settings.filters[Settings.filter.set][i] = parseInt(values[i].value);
        Settings.saveSettings();
        if ((Settings.filterSwitchFlag & 2) == 2 && Settings.filter.flag == e.target.nextElementSibling.value) PaginatorHQ.filterResult();
    },

    onInputTagFilter: function (e)
    {
        var name = e.target.id;
        var btn = SideBar.iDoc.getElementsByName(name)[0].firstElementChild;

        if (btn.className == "bgiL" && btn.style.borderColor == "rgb(0, 0, 0)")
        {
            btn.style.borderColor = "rgb(255, 0, 0)";
        }

        Settings.filter[name] = e.target.value;
        Settings.saveSettings();
    },

    loadFilterSet: function ()
    {
        var values = Settings.filters[Settings.filter.set];
        var filters = SideBar.sidebar.getElementsByClassName("filterValue");
        for (var i = 0; i < filters.length; i++) filters[i].value = values[i];
    }
}


    var Observe =
    {
        bodyChanges: function ()
        {
            Observe.callback(); //Just in case it gets missed. Happens occasionally

            var mo = window.MutationObserver || window.MozMutationObserver || window.WebKitMutationObserver;
            if (mo)
            {
                Observe.observer = new mo(Observe.callback);
                Observe.observer.observe(document.body, { childList: true, subtree: true });
            }
        },

        callback: function (mutations)
        {
            PreviewHQ.registerForPreviewWindow();
        }
    };

    /*
    ===================================================================================================================================

    ===================================================================================================================================*/
    var Settings =
    {
        filterSwitchFlag: 0,
        sortType: 0,

        versionCheck: function (current)
        {
            var saved = GM_getValue("Version", "0.0").toString();

            var v1 = saved.split(".");
            var v2 = current.split(".");

            if (saved != current) alert("(Some) Pixiv++ settings will be reset due to major changes in the update.");

            if (v1[0] != v2[0])
            {
                var names = GM_listValues();

                for (var i = 0; name = names[i], i < names.length; i++)
                {
                    var skipNames = ["Filters", "TimidScript", "RequestBookmarkCount", "RequestMethod"];
                    var found = false;
                    for (var j = 0; j < skipNames.length; j++) found = found || (name.indexOf(skipNames[j]) == 0);
                    if (!found) GM_deleteValue(name);
                }
            }

            if (v1[1] != v2[1])
            {
                var names = GM_listValues();

                for (var i = 0; name = names[i], i < names.length; i++)
                {
                    var deleteNames = ["Filters"];
                    if ("Filters" == name) GM_deleteValue(name);
                }
            }

            GM_setValue("Version", current);
        },

        loadSettings: function ()
        {
            Settings.versionCheck("129.125");
            Settings.requestMethod = GM_getValue("RequestMethod", 0);

            var vals = GM_getValue(Settings.valueName("Generic"), "4094|0|500|0|0|0").split("|");

            // ----------- Sidebar Display Settings Options (PAGETYPE > 0)
            Settings.display = makeStruct("artistName illustTitle countList illustLink mangaLinks IQDBLink autoPreview sidebar displayOptions filterOptions");
            Settings.setObjectPropertiesByFlag(Settings.display, vals[0]);

            // ----------- Sidebar Fetch Settings (PAGETYPE > 0)
            Settings.fetch = makeStruct("nextPage metadata");
            Settings.setObjectPropertiesByFlag(Settings.fetch, vals[1]);

            // ----------- Preview Settings
            Settings.previewDimensions = GM_getValue("PreviewDimensions", 450);

            // ----------- Other Values
            Settings.pagingOffset = parseInt(vals[2]);
            Settings.sortType = parseInt(vals[3]);
            Settings.filter = new Object();
            Settings.filter.flag = parseInt(vals[4]);
            Settings.filter.set = parseInt(vals[5]);

            // -----------  Fixed Settings
            vals = GM_getValue("General", "danbooru|R-18|R-18").split("|");
            Settings.IQDBType = vals[0];
            Settings.filter.tagsInclude = vals[1];
            Settings.filter.tagsExclude = vals[2];

            // ----------- Filters
            vals = GM_getValue("Filters", "5, 10, 5, 10|10, 50, 10, 20|30, 400, 30, 100|50, 1000, 50, 200|80, 2000, 60, 400").split("|");
            Settings.filters = new Array();
            for (var i = 0; i < 5; i++) Settings.filters[i] = vals[i].split(",");

            if (Settings.pagingOffset > 3000) Settings.pagingOffset = 3000;
        },



        setObjectPropertiesByFlag: function (obj, flag)
        {
            var i = 0;
            for (var key in obj)
            {
                if (obj.hasOwnProperty(key))
                {
                    i++;
                    obj[key] = (flag & Math.pow(2, i)) > 0;
                }
            }

            return obj;
        },

        getObjectPropertiesFlag: function (obj)
        {
            var i = 0;
            var flag = 0;
            for (var key in obj)
            {
                if (obj.hasOwnProperty(key))
                {
                    i++;
                    if (obj[key]) flag += Math.pow(2, i);
                }
            }

            return flag;
        },

        setObjectPropertiesValues: function (obj, arr)
        {
            var i = 0;
            for (var key in obj)
            {
                if (obj.hasOwnProperty(key))
                {
                    obj[key] = arr[i];
                    i++;
                }
            }

            return obj;
        },


        getObjectPropertiesValues: function (obj)
        {
            var arr = new Array();

            for (var key in obj) if (obj.hasOwnProperty(key)) arr.push(obj[key]);

            return arr;
        },


        saveSettings: function ()
        {
            GM_setValue(Settings.valueName("Generic"), Settings.getObjectPropertiesFlag(Settings.display) + "|"
                    + Settings.getObjectPropertiesFlag(Settings.fetch) + "|"
                    + Settings.pagingOffset + "|"
                    + Settings.sortType + "|"
                    + Settings.filter.flag + "|"
                    + Settings.filter.set);

            GM_setValue("General", Settings.IQDBType + "|" + Settings.filter.tagsInclude + "|" + Settings.filter.tagsExclude);

            GM_setValue("PreviewDimensions", Settings.previewDimensions);

            GM_setValue("Filters",
                (function ()
                {
                    var val = "";
                    for (var i = 0; i < 5; i++) val += Settings.filters[i].toString() + ((i < 4) ? "|" : "");
                    return val;
                })());
        },


        valueName: function (name, saveset)
        {
            if (!saveset) saveset = PAGETYPE;
            return "[" + saveset + "] " + name;
        }
    }

    function FilterTypeToString(type)
    {
        var names = ["Bookmarks", "Views", "Ratings", "Total"];
        return names[type];
    }

    function RemoveMessage(msg)
    {
        if (msg)
        {
            var msgBox = msg.parentElement;
            msgBox.removeChild(msg);
            if (msgBox.children.length == 0) msgBox.style.visibility = "hidden";
        }
    }

    function DisplayMessage(msgTxt, timeout)
    {
        //text-align: center; display:inline-block; width: 100px; background-color: #D3D3D3; border: 1;
        var msgBox = document.getElementById("pppMsgBox");
        if (!msgBox)
        {
            msgBox = document.createElement("span");
            msgBox.id = "pppMsgBox";
            document.body.appendChild(msgBox);
        }

        //AdjustDisplayMessage();

        msgBox.style.visibility = null;
        var msg = document.createElement("div");
        msg.textContent = msgTxt;
        msgBox.appendChild(msg);

        if (!isNaN(timeout))
            setTimeout(RemoveMessage, timeout, msg);
        return msg
    }



    function makeStruct(keys, obj)
    {
        if (!obj) obj = {};

        var names = keys.split(" ").sort();
        for (var i = 0; i < names.length; i++)
        {
            obj[names[i]] = obj[names[i]];
        }

        return obj;
    }

    /*
    =================================================================================================
     [VYCS] VARIABLE YOU CAN SET
    =================================================================================================*/
    //GM_setValue("RequestMethod", 0); // [1]
    //GM_setValue("RequestBookmarkCount", 2); //[4]

    /*
    [1] Default: 0
    Default gets all meta-data using XmlHttpRequest otherwise uses the flags below:
    2: Get next pages using GM_XmlHttpRequest
    4: Get illustration data using GM_XmlHttpRequest on every page apart from illustration page
    8: Get data using GM_XmlHttpRequest on illustration page
    If you want to use GM_XmlHttpRequest on everything then the value set the value to 14 (2+4+8)

    [2] Does an extra call to get bookmark if it is missing. Default value is 0.
    0: Do not make any extra http request to get bookmark
    1: Get bookmark count on every page except illustration page
    2: Get bookmark for every page
    */


    /*
    =================================================================================================
     Do not touch
    =================================================================================================*/
    //Removes pop dialog that appears when there isn't a cookie
    (function ()
    {
        console.info("Pixiv Main");
        var counter = 0;
        var id = setInterval(function ()
        {
            var pop = document.getElementById("register-introduction-modal");
            if (pop) pop.getElementsByClassName("close")[0].click();

            pop = document.getElementsByClassName("signup-notice");
            for (var i = 0; i < pop.length; i++) pop[i].style.display = "none";
            counter++;
            if (counter = 10) clearInterval(id);
        }, 100);

        Settings.loadSettings();
        PaginatorHQ.addStyles();
        PreviewHQ.registerForPreviewWindow();
        Observe.bodyChanges();

        if (PAGETYPE >= 0)
        {
            console.info("Pixiv++ Initalising");
            var els = document.querySelectorAll("a[href^='/jump']");
            for (var i = 0; i < els.length; i++)
            {
                els[i].href = decodeURIComponent(els[i].href.replace(/.+\/jump\.php\?/, ""));
                console.log("Direct URL: " + els[i].href);
            }

            SideBar.initalise();
            PaginatorHQ.intialise();
        }

        TSL.addStyle("QuickControlCSS", "#quickcontrol {position:fixed;width:20px;right:5px;top:30px;background-color:rgba(100,100,100,0.3);} #quickcontrol * {width:20px;height:20px;cursor:pointer;} #quickcontrol > * + * {margin-top: 3px;}"
            + "#XPageLoader {z-index:200; position:fixed; right:0px; top:30px; padding: 20px 8px 20px 20px;} #XPageLoader > div {border:1px groove lightblue;background-color:white;} #XPageLoader li {padding:2px 5px;cursor:pointer;text-align:left;} #XPageLoader li:hover{background-color:#F9F9A2;}"
            + "#XLinker[enabled] {background-color: yellow;}"
            );




        TSL.addStyle("OutSideButtons", '.switch {background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAADWElEQVR42nWVyy9rURTG16Ze9Y5nw2EkhEiQmPkTJKIGaJgQj4rE7A7NTAwkotQ7koogUSFhgIGISMSAgYGJiDZR77d6tJy7vp2c3nPb2snK7mn3/u1vfWvtU0FhxvT0tDEzM9OcmJhYGxUVVclh+v7+pvf3dw/Hwdvb2/Lj46Ozra3NG7xX6B/sdrvIzc2tz8nJ6U9OTlaen5/p9PSUrq6uSAhBWVlZxL9RZGQk3d7euu/v7/+8vLwsdHZ2qiHAmZkZQ35+/mBeXp714uJCTE5O0tHRkQTFxsbK2e/3U0xMDFVUVFBNTQ2+U/kwO0N72tvb/QHg8PCwKC4utjGwa2Njg2w2G6WlpcnNgZOFCMxIH7PFYiFFUcjj8Yy8vr52Q6lctbq62lBSUjK3ubkphoaGZFoaIBimD4AbGxspNTVVvbm5sbS0tMyLqakpY1lZ2YnX61WsVmsIDOPj44O+vr5IVVUyGAwUHR0t1WNGtLa20uXlpZvXFYm1tbWmwsJCR19fH52dnQX8wuBq0sPDg/zMlQ4JDVxeXk6lpaUoXrPY2dlZSkhIMOOU7OzsAOzu7o7Y7LAgPRAztxfV1dXR+fm5U+zu7rqur68VKERbAMg9JkO/6TeYFtXV1VDoFvv7+77Dw0ODw+GAueTz+VA16dVvQL2HeMbaqqoq4r71i729Pd/x8bFhdnaWUlJSZKqfn59hYXiOi4uTPiPwDBiCC4us/GJra8vFXikDAwNSIW5FOHVQZDQaKT4+XkI1hbg1ERERxG2HzNxifX19iUHm3t5euejp6SnEJ8xcOBmAakD8BiBGQUEBuVwup1hcXGziG+JwOp3yqqFZg4FQhUoCqFeITKAOnxFsV7OYmJgwmkymE16k4JagKHogvALsNyAEZGRkoIfdLLRINh0XpIFbZo7bR6ysrMjWCVanByJtHISBddz8Kt9lS0dHx7wEjo6OiqSkJFt6enoXv5Zoe3ubfn5+/vMOQMC00AoHzxk4wphuBqqBSzs+Pm7gNAYZbOUNglsJ91OmpkEBwiFatTkjKLPz9h6G/Xt9aQNK+eR6Nrqfe1KBV/AUPqGaUAU7cMe5APDsD8cClIV9Y2tjbGzMyJOZo5ajkg8w4Xu2wcPTAccyh5NBIX8BfwGUUXYBm4oiewAAAABJRU5ErkJggg==");}'
                + '.switch.sgreen[enabled=true] {background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAEPUlEQVR42m2VW0wcZRiG35md8+7sLLjsdgsL8YoKF5JUNJoYb4y9NKWJ1KaNBuXQQ1ITm0avbGJSIzRpMKWcCmKLpMV0MRhIbKgXSFFCGr3oRcFShG13wT1x2uPs7vjPdFm2hZm8meP/zPt93/9/Q2GPrb+/X3I4HHWyLB9mWbaWyJXJZBCPx/1Es9FodGRtbc3T2NgYe3EsVXjR2dlJlZWV1ZeWlrYqiuLe2NjA4pNH+C/sJ29qcBS7sL+kHCbahGAw6A2Hw+c3NzdvtbS0aLuAAwMDTEVFRXt5eflJ/4qPuj7SgweL9wE2DU5koDEZqIiDYRnUvPwm3q/9GFTWpK2urnYS6NmmpqZ0HtjR0UFVVVVdIcBTd3//FX2e71Bkt4EVaGh0GllTGlqBVCqOLNlPvPYFKpRX4Pf7r25tbZ3RnRrA0dHRo9XV1UO/3btDXfNchmu/C1l6B5A1qTtAZlsqVC2Bj6q/hp2u0AKBwLGGhoabVF9fn1RTU/Mwnoy5P2/7lMCcOUg6505FLLOORHYTGVMKNKeBESji3mQcGZrHZ1XfY9Ub9CYSiQPU2NjY8crKyhtt1y5gKTwHXs9XDriZCiMU95NzAuIBky4hdyRidBHwW9Z6vMHXg+TzBDU5OXnbIlvqTrd+AMe+kmcwWkUw+hRrqYAxMA8rVAFYZl9Ci3UQy0vLHmpqamo5sO53f/vTOThKngHDiRWE4ys7MGEP4Av3P2F/QOhxwkvNzMyofy/MMD/euwxFsSKpRfF0fYGAtN3uhO1QSe7IDNBzqF9TXBZHtDakHlnT1PT0tPpgeZYZ/PMSrIqMQOwJ4tpGHlII1AG8yBJx4ATWAOvPKTaDQ7GvkJyT09TExMTyhhpyX7p7GjbFBt/WglFJA1YQkj4nRUmEKIoQckATRxvvaqyKQysXEZwnIY+Pj98uKi6q+/KXI2DMGiIp/y5nOkwySzBLZgKUIAgCOJ445Mg0JuFCNeHdfy+Song91PDw8HGyQm4M/9WOmbWfodKx58MkEiUJFrNMgBaYBXMOyMHE6sAM7L6DcC2+g1AodILq7e2VXC7XQ1Hm3N/c/xAxNvRc9TiBgWy2wiLJsIhWSKIFEm8Gx/EECGRTFF79pxlL8z4vWXQHjKU3ODh41Ol0DvmSc9T11XPI8ol8VSWSM9msGDBDAoHyMgROAkiPKZ17D7FFTiNr+Vhzc/NNA9jV1UVZrdYrdrv91EpmDp7oBSTEkFFVPUxZzAEFxQCaOQVCqgjOx28j4eUQiUSuEswZAtTy7aunp4fheb6dgE+KCkv9kRzCvHQHJiWVh5l1mGqHM3wQ+0KvI+iL6M46yfCzBJbe1WB1pwzD1NM03Wqz2dyiJCDGB5HkIkZTFdRicDEbolsxvQB6zs4T3dKd7dmxt7fu7m6SINQRHSaqJR9w6fez2Sxp3ZglGiHyENCuX8D/3p++AfxYDl8AAAAASUVORK5CYII=");}'
                + '.switch.sred[enabled=true] {background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAD+UlEQVR42nWVS0xTWRjHv9PeR1t6+4AC00BpMhsQNiRGExfGnXsxETWaGCIUH4kbY9xpYuJCTQxGBEpAjIQAiWBIIJGwmBBkwjDsJpGO4IwUW5i+0JbS0sed/7lOGRC4yT9fz+k9v37PU0YHPL29vaaysrIGRVHOiKJ4DHLmcjna2toKQvObm5ujGxsbI83Nzckfz7Ldi46ODlZZWdlYUVHxyGq1uuLfvtHa0hLFg0FiqkqK00m2qirS6fUUDof90Wj0TjweH2ptbVX3Afv6+gS3291WVVV1LRQIsF+8XgotLJCUzZIsCKSHh3CRdPhceuIE1Vy5Qlm9Xl1fX+8A9FZLS0t2B9je3s5qa2ufA3j993fv6P2zZ1Ris5Gk05EOQC79LssAzuXz9PPdu2Q8coSCweCLRCJxk3uqAcfGxs7X1dUNLExOsl+fPqUyhLYHlMnsAWrCnppKkfPBA8q53WooFLrY1NQ0yHp6ekz19fWLmWTSNXT1KpWXl+8c1v0Hy339Smo8TvrtbRKRS4kxkpBHbkmW6aeXL2kFOU2lUjVsfHz8UnV19evR+/cp7fORATkqwLLRKKVQEA2ESKRdKqxlgPWNjZSHkM/LbHp6+o1iNjcMnjtHZaWlO16lvnyh7VBoz+EfYQWxkhJi/f3098rKCJuZmVlJBoOu97dvkx1AHm56bU3TYYCD1ulXr2gplfKzubm5TGBuTvChGGaLhWhzkxLLy99zdRgMuZPRAdzytYiKJx8/Jp/FkmWzs7OZf+bnheUnT6hIUSi1ukoqGvogmAYSRZIlSbMiLw72BfRo9N49+qAoWTY1NbWiRiKuP27cIAW9lzzMO3hkMBo1caDEgdjj7wrI+eeHD8nHQ56YmHhTbLc3/Hb2LJnxZQZVPQhmNJnIUFREMqxkMHwHwkMB4W6j0h8B/Oz3j7Dh4eFLmJDXH9vaKPP2LemSyX1AAyBGpEM2m0kGVAPCS4EDEe7q0aO0fOoURSKRy6y7u9vkdDoXrZLk+uvCBZIjkT0wPscGFMsAILcSoBKgIhpa4NUFdNHjoT8DAT+WNdro9ff3n8eEDOR9PpZE+8gYqR0gcma0WkkGrCARcBFe8yvmw+nT9EmSVMzyRY/HM6gBOzs7mcViee5wOK4zTIuKqTHBU15VAw8TQM07WIkDYdN2Oy2dPEl+hB6LxV4AcxNAdef68nq9gizLbQBfs4kiUwcGSJmcJAvGbjds2+GgMHIWPn6cArEY96wDx28B9v/1VXi4p4IgNOp0ukc2m81lQvIN4TDJsZh2qaaLiymJ1kqgcCgAz9kdaIh7duCNXXi6urpMMA3QGegYfsDJ9/P5fBBmHhqFRgDa9xfwL7RWxwHoNf0IAAAAAElFTkSuQmCC");}'
                );

        var download_file = 'data:image/png;base64,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';
        var download_arrow = 'data:image/png;base64,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';

        var el, quickcontrol = document.createElement("section");
        quickcontrol.id = "quickcontrol";


        if (PAGETYPE > 0)
        {
            if (PAGETYPE > 1 && PAGETYPE < 10)
            {
                el = document.createElement("div");
                el.id = "AutoPager";
                el.className = "switch sred";
                el.title = "Auto Pager";
                if (Settings.fetch.nextPage) el.setAttribute("enabled", true);
                else el.setAttribute("enabled", false);
                quickcontrol.appendChild(el);
                el.onclick = function ()
                {
                    Settings.fetch.nextPage = !Settings.fetch.nextPage;
                    Settings.saveSettings();
                    if (Settings.fetch.nextPage) this.setAttribute("enabled", true);
                    else this.setAttribute("enabled", false);
                }

                //TSL.addStyle("", "#X-Pager {height:120px;} #X-Pager li{text-align:center;height:20px;width:20px;background-size: 20px 20px;background-repeat: no-repeat;font-size:12px;cursor:pointer;background-color:white;}")
                //el = document.createElement("section");
                //el.setAttribute("style", "")
                //el.id = "X-Pager";
                //el.innerHTML = '<ul><li id="JBGLpager" timeout="1500"><img src="' + download_file + '"></img></li><li>05</li><li>10</li><li>20</li><li>50</li></ul>';
                //quickcontrol.appendChild(el);

                TSL.addStyle("pppXPager", "#XPager {margin-bottom: 10px;} #XPager[enabled] {background-color:hotpink;}");
                el = document.createElement("img");
                el.src = download_file;
                el.id = "XPager";
                el.title = "Fetch the next # pages";
                el.onclick = function ()
                {
                    if (this.hasAttribute("enabled")) this.removeAttribute("enabled");
                    else if (Pager.nextPageURL)
                    {
                        var sec = document.getElementById("XPageLoader");
                        sec.style.display = (sec.style.display) ? null : "none";
                    }
                }
                quickcontrol.appendChild(el);

                el = document.createElement("section");
                el.id = "XPageLoader";
                el.innerHTML = '<div><ul><li id="JBGLpager" timeout="1500">01 Page</li><li>05 Pages</li><li>10 Pages</li><li>20 Pages</li><li>50 Million</li></ul></div>';
                el.style.display = "none";
                el.onmouseleave = function () { this.style.display = "none"; };
                document.body.appendChild(el);
                el = document.querySelectorAll("#XPageLoader li");
                for (var i = 0; i < el.length; i++)
                {
                    el[i].onclick = loadPages;
                }
            }

            el = document.createElement("div");
            el.id = "AutoLinker";
            el.className = "switch sgreen";
            el.title = "Auto Linker";
            if (Settings.fetch.metadata) el.setAttribute("enabled", true);
            else el.setAttribute("enabled", false);
            el.onclick = function ()
            {
                Settings.fetch.metadata = !Settings.fetch.metadata;
                Settings.saveSettings();
                if (Settings.fetch.metadata)
                {
                    this.setAttribute("enabled", true);
                    IllustrationLinker.switchOn();
                }
                else
                {
                    this.setAttribute("enabled", false);
                    IllustrationLinker.switchOff();
                }
            }
            quickcontrol.appendChild(el);
        }

        el = document.createElement("img");
        el.id = "XLinker";
        el.title = "Fetch all image metadata";
        el.src = download_arrow;
        el.onclick = function ()
        {
            var me = this;

            if (me.isbusy)
            {
                if (document.querySelector(".switch.sgreen[enabled=true]")) document.querySelector(".switch.sgreen[enabled=true]").click();
                else IllustrationLinker.switchOff();
                me.removeAttribute("enabled");
                me.isbusy = false;
                return;
            }
            me.isbusy = true;
            var thumbs = document.querySelectorAll("[illustration-id]:not([pppThumb])");
            for (var i = 0; i < thumbs.length; i++) IllustrationLinker.addToProcessList(thumbs[i].getAttribute("illustration-id"));
            IllustrationLinker.switchOn();
            me.setAttribute("enabled", "");

            var iid = setInterval(function ()
            {
                if (IllustrationLinker.processList.length == 0 || !IllustrationLinker.enabled)
                {
                    IllustrationLinker.switchOff();
                    me.removeAttribute("enabled");
                    clearInterval(iid);
                    me.isbusy = false;
                }
            }, 250);
        }
        quickcontrol.appendChild(el);
        document.body.appendChild(quickcontrol);

        function loadPages(e)
        {
            var xpager = document.getElementById("XPager")
            xpager.setAttribute("enabled", true);

            var startpage = PaginatorHQ.getPageNumber(Pager.nextPageURL),
                count = parseInt(this.textContent);
            if (isNaN(count)) count = 50;
            loadNextPage();
            function loadNextPage()
            {
                if (!xpager.hasAttribute("enabled")) return;
                if (!Pager.nextPageURL) document.getElementById("XPager").click();
                Pager.getNextPage(function (n)
                {
                    if (--count > 0)
                    {
                        setTimeout(loadNextPage, 1500);
                        console.log("Pixiv++: " + count + " left to load");
                    }
                    else document.getElementById("XPager").removeAttribute("enabled");
                });
            }
        }
    })();
}());
