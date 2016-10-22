// ==UserScript==
// @name            [TS] Youtube Filter
// @namespace       TimidScript
// @version         1.1.42.2
// @description     Filter out users and channels from search with GUI. Include Auto-Paging and ScreenShot Links.
// @author          TimidScript
// @homepageURL     https://github.com/TimidScript
// @copyright       © 2013+ TimidScript, Some Rights Reserved.
// @license         https://github.com/TimidScript/UserScripts/blob/master/license.txt
// @include         *//www.youtube.*
// @exclude         *//www.youtube.*/embed/*
// @require         https://greasyfork.org/scripts/19967/code/TSL - GM_update.js
// @require         https://greasyfork.org/scripts/19968/code/TSLibrary - Generic.js
// @homeURL         https://greasyfork.org/en/scripts/4687
// @updateURL       https://greasyfork.org/scripts/4687/code/4687.meta.js
// @grant           GM_xmlhttpRequest
// @grant           GM_info
// @grant           GM_getMetadata
// @grant           GM_getValue
// @grant           GM_setValue
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
********************************************************************************************
Known Issues:
 - Support for paged front page is not implemented as it seems to cause infinite loop
----------------------------------------------
    Version History
----------------------------------------------
1.1.42 (2016-06-19)
 - Fix auto-paging
1.1.41 (2016-05-27)
 - Altered license
1.1.40 (2016-05-25)
 - Moving to GreasyFork and preparing to remove OUJS files
1.1.39 (2016-04-10)
 - updateURL added
1.1.38 (2016-04-03)
 - Changed license to GPL-3
 - A delay on load more videos added
1.1.37  (2015-11-20)
 - Load more videos permanent fix
1.1.36  (2015-10-05)
 - Larger delay on Load More Videos on video page
1.1.35  (2015-10-05)
 - Replaced base64 bmp icon with png version
1.1.34 (2015-09-12)
 - Make filter compatible with "Youtube Center"
 - Bug Fix: Corrections to changes made in Youtube video page syntax
1.1.33 (2015-08-18)
 - Bug Fix: Corrections to changes made in Youtube page syntax
 - Added fullscreen link
 - Removal of tags occurs on mouseover and mouseout
1.1.32 (2015-06-20)
 - Remove link tag on mouse down
1.1.31 (2015-06-19)
 - Added tag "?timidscript_youtube" to screenshot links.
1.1.30 (2015-04-25)
 - Bug Fix: Make it compatible with "Youtube Center" as it changes some of the classes script queries.
1.1.29 (2015-04-06)
 - Bug Fix: Removed monitor of search result
 - Bug Fix: Search results checks item count before parsing.
1.1.28 (2015-04-04)
 - Bug Fix: Now able to pickup changes in main page and by extension search result page.
1.1.27 (2015-01-18)
 - Bug fixes to changes in youtube layout (front page and user channel)
 - Bug fix filter button added to the side of video panel
 - Added script setting to change the icon size. Search for "VYCS" to get to the Section
 - Changed the scroll functionality
 - Generic Library added
 - Show all video setting is now stored
1.0.26 (2015-01-04)
 - Bug fix to front page due to changes in youtube
1.0.25 (2014-12-11)
 - Delay to handle delayed video recommendations
1.0.24 (2014-08-29)
 - Added GM_update
1.0.23 (2014-08-19)
 - Cleaned up header for OUJS
1.0.22 (2014-07-16)
 - @exclude iframe embed videos
1.0.21 (2014-07-15)
 - Added image link to channel videos
 - Added necessary @grant header
 - Altered the CSS
 - Remove MutationObserver from most page types
1.0.20 (2014-07-03)
 - Bug Fix: Fixed issues caused by change in youtube layout
 - Added option to turn off auto-paging
 - Removed img.youtube include
1.0.19 (2014-06-14)
 - Scrollable FilterWindow
 - Use port 8080 for require on userscripts.org
1.0.18 (2014-06-07)
 - Bug fix on pager when spelling correction is applied
1.0.17 (2014-05-31)
 - Updated so main page includes "Recommended" in the filter
1.0.16 (2014-05-30)
 - Modified CSS and link text
1.0.15 (2014-05-25)
 - Moved options button beside upload button if it exists.
1.0.14 (2014-05-21)
 - Bug Fix: Not checking for maxresdefault.jpg.
1.0.13 (2014-05-20)
 - Video screenshot link now points to "hqdefault.jpg" by default.
 Checks if "maxresdefault.jpg" and re-links if necessary
1.0.12 (2014-05-17)
 - Added link to max res screenshot
1.0.11 (2014-05-09)
 - Made options button invisible unless you hover over top, right corner.
1.0.10 (2014-03-28)
 - Updated broken script due to changes in youtube
1.0.9 (2014-01-16)
 - Bug not getting page type when type changes.
1.0.8 (2014-01-01)
 - Option button alternates filter window display
1.0.7b (2013-12-21)
 - Removed redundant code
 - Highlights blocked users and options buttonQ
 - Button now is an Icon
 - Bug fixes due to changes in Youtube
 - Captures changes in URL
1.0.6
 - Added block button on all thumbnails
 - Information stored now only contains the name of the user-channel and nothing else
1.0.5
 - Main X button now also removes filter
1.0.4
 - Colours added
1.0.3 (2013-10-16)
 - Extended the filter to work on main page
1.0.2 (2013-08-25)
 - Bug Fix: Filter observer added
1.0.1 (2013-08-24)
 - Initial Release
********************************************************************************************/


/************** [VYCS] Variable you can set **************/
//CSS Style for video page. It uses smaller text and icon for the block button and image link
//GM_setValue("PageType2",".blockBox .blockBTN32 {width: 24px; height: 24px;} .blockBox a {font-size: 10px;}"
//                + "body #watch7-sidebar-contents {padding: 15px 0px 15px 5px !important;}"
//                + "#watch7-sidebar-contents .video-list-item.related-list-item {padding-right: 24px;}");

//CSS Style that limites the size of the search list width, if increased by "Youtube Center"
//GM_setValue("PageType1",".ytcenter-site-search .yt-card.clearfix{width: 700px !important;}");
/**************************************************/

////if (window.self !== window.top) return;
console.info("Youtube Filter");
var intervalID;
var AutoPaging = GM_getValue("AutoPaging", true);
//0 Main Page; 1 Search Result; 2 Video Page; 3 Channel Video Page
var PageTYPE = null; //Video Page
var FilteredUsers = new Array();

//*****************
///
function IsMouseEventInClientArea(event, element)
{
    var rect = element.getBoundingClientRect();
    var minX = rect.left + element.clientLeft;

    var x = event.clientX;
    if (x < minX || x >= minX + element.clientWidth) return false;
    var minY = rect.top + element.clientTop;
    var y = event.clientY;
    if (y < minY || y >= minY + element.clientHeight) return false;
    return true;
}

function GetPageType()
{
    PageTYPE = null;
    if (document.URL.match(/\.youtube\.[^\/]+\/?$/i)) PageTYPE = 0; //Main Page
    else if (document.URL.match(/youtube\.[^\/]+\/result/gi)) PageTYPE = 1; //Search Result
    else if (document.URL.match(/youtube\.[^\/]+\/watch/gi)) PageTYPE = 2; //Video Page
    else if (document.URL.match(/youtube\.[^\/]+\/(user|channel)\/.+\/videos/gi)) PageTYPE = 3; //User Channel
}

function GetUserData(link)
{
    var user = new Object();
    user.name = link.textContent;
    user.url = link.href.replace(/.+youtube\.[a-z]+/, "");

    return user;
}

function IsFilteredUser(user)
{
    var userFilters = GetFilters();
    for (var i = 0; i < userFilters.length; i++)
    {
        if (userFilters[i] == user) return true;
    }

    return false;
}

function BlockUser(e)
{
    e.stopImmediatePropagation();
    e.preventDefault();
    var user = this.title;

    if (!IsFilteredUser(user))
    {
        var filters = GetFilters();
        filters.push(user);
        GM_setValue("Filters", JSON.stringify(filters));
    }

    HideUnwantedUsers();
    if (document.getElementById("FilterWindow")) CreateFilterWindow();
    return false;
}


function CreateScreenshotLink(videoID)
{
    var ss = document.createElement("a");
    ss.textContent = "[SH]";
    ss.href = "https://img.youtube.com/vi/" + videoID + "/hqdefault.jpg?timidscript_youtube";

    GM_xmlhttpRequest(
    {
        url: "https://img.youtube.com/vi/" + videoID + "/maxresdefault.jpg",
        method: "HEAD",
        onload: function (response)
        {
            if (response.status == 200)
            {
                //var contentLength = parseInt(response.responseHeaders.replace(/(Content-Length: (\d+)|.*\r?)/gi, "$2"));
                ss.href = "https://img.youtube.com/vi/" + videoID + "/maxresdefault.jpg?timidscript_youtube";
                ss.textContent = "[SM]";
            }
        }
    });

    ss.addEventListener("mouseover", RemoveLinkTag, true);
    ss.addEventListener("mouseout", AddLinkTag, false);

    return ss;
}

function AddLinkTag(e)
{
    var link = e.target;
    link.href += link.postfix;
    //if (link.postfix)
    //    setTimeout(function () { link.href += link.postfix; }, 250);
}
function RemoveLinkTag(e)
{
    var s, m = this.href.match(/\?timidscript_[_a-z0-9]+/i);
    if (m)
    {
        this.postfix = m[0];
        this.href = this.href.replace(/\?timidscript_[_a-z0-9]+/i, "");
    }
}

function AddBlockButton(li)
{
    var btn = document.createElement("span");
    btn.className = "blockBTN32";

    //if (PageTYPE == 1) btn.title = li.getElementsByClassName("g-hovercard")[0].textContent;
    //else btn.title = li.getElementsByClassName("g-hovercard")[1].textContent;
    btn.title = li.getElementsByClassName("g-hovercard")[0].textContent;
    var span = document.createElement("span");

    if (PageTYPE == 2)
    {
        span.setAttribute("style", "position:absolute; right:0px;");
        li.insertBefore(span, li.firstElementChild);
    }
    else
    {
        span.setAttribute("style", "float:right;");
        li.firstElementChild.insertBefore(span, li.firstElementChild.firstElementChild);
    }

    btn.onclick = BlockUser;
    span.appendChild(btn);
    span.className = "blockBox";

    var href = li.getElementsByTagName("a")[0].href;
    if (href.indexOf("/watch?v=") > 0)
    {
        var ss = CreateScreenshotLink(href.replace(/.+watch\?v=(([a-z0-9]|_|-)+).*/gi, "$1"));
        ss.setAttribute("style", "display:block;text-align:center;");
        span.appendChild(ss);
    }
}

function NextPageURL()
{
    var nextpage = document.querySelector(".branded-page-box > [disabled=true]");

    if (nextpage) nextpage = nextpage.nextElementSibling;
    if (!nextpage) return null;

    return nextpage.href;
}


function ScrollCheck()
{
    var pager = document.querySelector(".branded-page-box");
    var loc = pager.offsetTop + pager.offsetHeight - document.documentElement.offsetHeight;

    if (loc < document.documentElement.scrollTop)
    {
        clearInterval(intervalID);
        var url = NextPageURL();

        var xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.responseType = "document";
        xhr.onload = function (e)
        {
            var pager = document.querySelector(".branded-page-box");
            var doc = xhr.response;
            var pagerNew = doc.querySelector(".branded-page-box");
            pager.outerHTML = pagerNew.outerHTML;

            var result = document.getElementsByClassName("item-section")[0];
            var resultNew = doc.getElementsByClassName("item-section")[0];

            //Removes spell correction from result
            if (resultNew.getElementsByClassName("spell-correction")[0])
            {
                resultNew.removeChild(resultNew.getElementsByClassName("spell-correction")[0].parentElement);
            }
            var lis = resultNew.children;


            while (lis.length > 0)
            {
                var li = lis[0];
                result.appendChild(li);
                var imgs = li.getElementsByTagName("img");

                for (var i = 0; i < imgs.length; i++)
                {
                    var src = imgs[i].getAttribute("data-thumb");
                    if (src) imgs[i].src = src;
                }

                AddBlockButton(li);
            }

            HideUnwantedUsers();
            setTimeout(EnablePager, 1500);
        };
        xhr.send();
    }
}

function EnablePager()
{
    if (AutoPaging && NextPageURL()) intervalID = setInterval(ScrollCheck, 500);
    else clearInterval(intervalID);
}

function HideUnwantedUsers()
{
    FilteredUsers = new Array();

    if (PageTYPE == 0) //Main Page
    {
        //var items = document.getElementsByClassName("channels-content-item");
        var items = document.getElementsByClassName("yt-lockup-video");

        for (var i = 0; i < items.length; i++)
        {
            var thumbdata = items[i],
            user = thumbdata.querySelector(".yt-uix-sessionlink.spf-link.g-hovercard, .yt-uix-sessionlink.g-hovercard").textContent,
            filtered = IsFilteredUser(user),
            notice = thumbdata.parentNode.querySelector(".banNotice");

            if (filtered && !notice)
            {
                FilteredUsers.push(user);
                TSL.addClass(thumbdata, "blockedVideoBG");

                notice = document.createElement("div");
                notice.className = "banNotice";
                notice.style.left = thumbdata.offsetLeft + "px";

                notice.style.height = thumbdata.clientHeight + "px";
                notice.style.width = thumbdata.clientWidth + "px";
                notice.setAttribute("name", "YTF");

                var txt = document.createElement("span");
                txt.textContent = user;
                txt.style.height = thumbdata.clientHeight + "px";
                txt.style.width = thumbdata.clientWidth + "px";
                notice.appendChild(txt);
                thumbdata.parentNode.insertBefore(notice, thumbdata);
            }
            else if (!filtered && notice)
            {
                TSL.removeClass(thumbdata, "blockedVideoBG");
                TSL.removeNode(notice);
            }
        }
    }
    else //Search Result & Video Page
    {
        var results, user;
        if (PageTYPE == 1) results = document.getElementsByClassName("item-section")[0].children;
        else results = document.getElementsByClassName("video-list-item");
        console.log(results.length);
        for (var i = 0; i < results.length; i++)
        {
            try
            {
                var vid = results[i];
                if (vid.getElementsByClassName("g-hovercard").length == 0) continue;
                var user = vid.getElementsByClassName("g-hovercard")[0].textContent;
                //if (PageTYPE == 1) user = vid.getElementsByClassName("g-hovercard")[0].textContent;
                //else user = vid.getElementsByClassName("g-hovercard")[1].textContent;

                var filtered = IsFilteredUser(user);
                if (filtered)
                {
                    FilteredUsers.push(user);
                    TSL.addClass(vid, "blockedVideo");
                }
                else
                {
                    TSL.removeClass(vid, "blockedVideo");
                }
            }
            catch (e) { console.warn(e); }
        }
    }

    if (FilteredUsers.length > 0) TSL.addStyle("OptSelect", "#OptionsButton, #OptionsButton2{background-color: #FBE8E5;} #OptionsButton:hover{background-color: #FBD5CF}");
    else TSL.removeNode("OptSelect");
}

function GetFilters()
{
    var filters = GM_getValue("Filters", null);
    if (!filters) return new Array();

    return JSON.parse(filters);
}


function ShowAllVideos()
{
    if (Boolean(GM_getValue("ShowAllVideos", false)))
    {
        TSL.removeNode("BlockVideos");
        TSL.addStyle("ShowAllVideos", ".banNotice {display: none;}");
    }
    else
    {
        TSL.addStyle("BlockVideos", ".blockedVideo {display:none;}");
        TSL.removeNode("ShowAllVideos");
    }
}

function CreateFilterWindow()
{
    var fwin = document.getElementById("FilterWindow");
    if (fwin) TSL.removeNode(fwin);

    var userFilters = GetFilters();

    fwin = document.createElement("span");
    var tbHolder = document.createElement("div");
    tbHolder.setAttribute("style", "overflow-x:hidden; overflow-y:auto; max-height: 500px;");
    var table = document.createElement("table");
    table.style.maxHeight
    tbHolder.appendChild(table);
    fwin.appendChild(tbHolder);


    for (var i = 0; i < userFilters.length; i++)
    {
        var user = userFilters[i];
        var btn = document.createElement("a");
        btn.className = "unblockBTN";
        btn.title = user;

        btn.onclick = function (e)
        {
            e.stopImmediatePropagation();
            var user = this.title;
            var filters = GetFilters();

            for (var i = 0; i < filters.length; i++)
            {
                if (filters[i] == user)
                {
                    filters.splice(i, 1);
                    GM_setValue("Filters", JSON.stringify(filters));
                    break;
                }
            }

            TSL.removeNode(this.parentElement.parentElement);
            HideUnwantedUsers();
        };

        var r = table.insertRow(-1);
        var td = document.createElement("td");
        r.appendChild(td);
        td.appendChild(btn);

        var a = document.createElement("a");
        a.href = "results?search_query=" + user + "&sm=3";

        var d = document.createElement("div");
        d.textContent = user;

        for (var j = 0; j < FilteredUsers.length; j++)
        {
            if (user == FilteredUsers[j])
            {
                r.style.backgroundColor = "#FBE8E5";
                //d.style.color = "red";
                break;
            }
        }

        td = document.createElement("td");
        a.appendChild(d);
        td.appendChild(a);
        r.appendChild(td);
    }


    var d = document.createElement("div");
    d.style.textAlign = "center";
    var b = document.createElement("input");

    if (PageTYPE == 1)
    {
        b.type = "button";
        b.value = "Auto-Page";
        b.style.backgroundColor = (AutoPaging) ? "lime" : "gray";
        b.onclick = function ()
        {
            AutoPaging = !AutoPaging;
            this.style.backgroundColor = (AutoPaging) ? "lime" : "gray";
            EnablePager();

            GM_setValue("AutoPaging", AutoPaging);
        };
        d.appendChild(b);
    }

    b = document.createElement("input");
    b.type = "button";
    b.value = "Show All";
    b.style.backgroundColor = Boolean(GM_getValue("ShowAllVideos", false)) ? "lime" : "gray";
    b.onclick = function ()
    {
        var show = !Boolean(GM_getValue("ShowAllVideos", false));
        this.style.backgroundColor = show ? "lime" : "gray";
        GM_setValue("ShowAllVideos", show);
        ShowAllVideos(show);
    };
    d.appendChild(b);

    b = document.createElement("input");
    b.type = "button";
    b.value = "Close";
    b.onclick = function () { TSL.removeNode("FilterWindow"); };

    d.appendChild(b);
    fwin.appendChild(d);



    fwin.id = "FilterWindow";
    document.body.appendChild(fwin);
    return fwin;
}


var SearchCount = 0;
function AdjustSearchResult()
{
    var results;
    if (PageTYPE == 1) results = document.getElementsByClassName("item-section")[0].children;
    else results = document.getElementsByClassName("video-list-item");

    if (SearchCount == results.length) return;
    SearchCount = results.length;

    for (var i = 0; i < results.length; i++)
    {
        if (results[i].getElementsByClassName("blockBTN32").length == 0)
        {
            try
            {
                AddBlockButton(results[i]);
            }
            catch (e) { };
        }
    }

    HideUnwantedUsers();
    if (PageTYPE == 1) EnablePager();
}

function AddOptions()
{
    if (document.getElementById("OptionsButton")) return;
    var masthead = document.getElementById("yt-masthead-signin");

    if (masthead)
    {
        var options = document.createElement("button");
        options.id = "OptionsButton";
        options.className = "yt-uix-button yt-uix-button-default";
        //options.textContent = "Options";
        options.onclick = function ()
        {
            var fwin = document.getElementById("FilterWindow");
            if (fwin) TSL.removeNode(fwin);
            else CreateFilterWindow();
        };
        masthead.insertBefore(options, masthead.firstElementChild);

        //var el = document.createElement("button");
        //el.id = "ViewAllButton";
        //el.className = "yt-uix-button yt-uix-button-default";
        //masthead.insertBefore(el, options);
    }
    else
    {
        var placer = document.createElement("div");
        placer.id = "FloatArea";
        document.body.appendChild(placer);


        var options = document.createElement("div");
        options.id = "OptionsButton";
        //options.textContent = "Options";
        options.onclick = function ()
        {
            var fwin = document.getElementById("FilterWindow");
            if (fwin) TSL.removeNode(fwin);
            else CreateFilterWindow();
        };

        document.onmousemove = function (e)
        {
            options.style.display = (IsMouseEventInClientArea(e, placer)) ? null : "none";
        }

        document.body.appendChild(options);
    }
}

//Mutation Observer
var MO =
{
    monitorBody: function ()
    {
        var mo = window.MutationObserver || window.MozMutationObserver || window.WebKitMutationObserver;
        if (mo)
        {
            MO.Observer = new mo(
                function ()
                {
                    setTimeout(MainFunc, 500);
                });

            MO.Observer.observe(document.body, { characterData: true, attributes: true, childList: true, subtree: true });
        }
    },

    disconnect: function ()
    {
        if (MO.Observer) MO.Observer.disconnect();
        MO.Observer = null;
    }
};

var MainItemPageCount = 0;
function MainFunc()
{
    GetPageType();
    switch (PageTYPE)
    {
        case 0: //Main Page
            console.info("YTF: Main Page");
            MO.disconnect();
            AddOptions();

            var items = document.getElementsByClassName("yt-lockup");
            if (MainItemPageCount != items.length)
            {
                MainItemPageCount = items.length;
                for (var i = 0; i < items.length; i++)
                {
                    var thumbdata = items[i];
                    if (thumbdata.parsed) continue;
                    thumbdata.parsed = true;

                    var user = thumbdata.querySelector(".yt-uix-sessionlink.g-hovercard").textContent;
                    var filters = GetFilters();

                    var block = document.createElement("span");
                    block.className = "blockLINKS";

                    var blockBtn = document.createElement("a");
                    blockBtn.className = "blockBTN16";
                    blockBtn.title = user;
                    blockBtn.onclick = BlockUser;
                    block.appendChild(blockBtn);

                    var link = thumbdata.getElementsByTagName("a")[0];
                    link.appendChild(block);
                    link.className += " aaTT";

                    var ss = CreateScreenshotLink(link.href.replace(/.+watch\?v=(([a-z0-9]|_|-)+).*/gi, "$1"));
                    block.appendChild(ss);
                }

                HideUnwantedUsers();
            }
            //setTimeout(MO.monitorBody, 1000);
            MO.monitorBody();
            break;
        case 1: //Search Result
            console.info("YTF: Search Result");
            //MO.disconnect();
            AddOptions();
            AdjustSearchResult();
            //MO.monitorBody();
            break;
        case 2: // Video Page
            //TSL.addStyle("YT_RELATED",".related-list-item .content-link {width:170px; background-color:red;}");
            console.info("YTF: Video Page");
            AddOptions();
            AdjustSearchResult();

            //Adds sceenshot
            var player = document.getElementById("watch7-headline");
            if (!player.getAttribute("screenshot"))
            {
                player.setAttribute("screenshot", "added");
                var ss = CreateScreenshotLink(document.URL.replace(/.+watch\?v=(([a-z0-9]|_|-)+).*/gi, "$1"));
                player.insertBefore(ss, player.firstElementChild);
                var fs = document.createElement("a");
                fs.textContent = "[FT]";
                fs.href = "https://www.youtube.com/v/" + document.location.search.match(/v=([-_\w]+)/)[1];
                fs.style.marginLeft = "10px";
                player.insertBefore(fs, ss.nextElementSibling);
            }

            setTimeout(LoadMoreVideos, 5000);
            break;
        case 3: //User Channel
            console.info("YTF: User Channel");
            MO.disconnect();
            var vthumbs = document.getElementsByClassName("ux-thumb-wrap");

            for (var i = 0, thumb; i < vthumbs.length, thumb = vthumbs[i]; i++)
            {
                if (!thumb.className.match("aaTT"))
                {
                    thumb.className += " aaTT";

                    var block = document.createElement("span");
                    block.className = "blockLINKS";
                    block.style.visibility = "visible";
                    block.style.top = "10px";
                    thumb.appendChild(block);

                    var ss = CreateScreenshotLink(thumb.querySelector("a").href.replace(/.+watch\?v=(([a-z0-9]|_|-)+).*/gi, "$1"));
                    ss.style.backgroundColor = "yellow";
                    ss.style.border = "1px solid black";
                    block.appendChild(ss);
                }
            }

            MO.monitorBody();
            break;
    }

    //Loads more side videos and filters them
    function LoadMoreVideos()
    {
        var wmv = document.getElementById("watch-more-related-button");
        AdjustSearchResult();

        if (!wmv || wmv.style.display == "none") return;

        document.getElementById("watch-more-related-button").click();
        setTimeout(LoadMoreVideos, 2500);
    }
}

var URL = document.URL;
(function ()
{
    GetPageType();
    if (PageTYPE == null) return;
    //Replace old saved syntax
    CURRENTVERSION = 1;
    if (GM_getValue("Version", 0) != CURRENTVERSION)
    {
        var filters = GM_getValue("Filters", null);

        if (filters)
        {
            filters = filters.split("|");
            for (var i = 0; i < filters.length; i++)
            {
                filters[i] = filters[i];
            }

            GM_setValue("Filters", JSON.stringify(filters));
        }

        GM_setValue("Version", CURRENTVERSION);
    }

    TSL.addStyle(null, "#OptionsButton {background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAADPUlEQVR42u3XX0xSURwH8N/lzwUVxED+mpW5HtQ0ptJspBPkKmVzTtfafKunntqa9d67bD219dZLPrVmc22mglhSul2FnEtfMjf/C4oCCpfLvw7XbGXxT5q98HuBO845389+nMs9YPCfC0t3oF6vl6DBpWwMk0Si0TMxDMtD17z4ZzGAIBaLBdhs9m4kEtkBFmvFYrHsnBig1WpxHo4TGIYRMplMU1Z2sVqpVAilUhkUigpBKBQCzsWBw+Ew48PhMNAhGnw+H3g9XnC6nLC5seH7trQ053I6yVgsNoKQZqvVSqcEXGtoIK6o1S86OjpK6uvrQSyWZNVit3sHpslpGBwcXJ2d/Xx3cmrKnBTQ3dX15WV/fyWO41kFHy+apqGnp2d+YGCgKingenv3fOmliorbTbWg0WhApSrJKnh9fQ1IkoRXY3ZYWVxYsA29rkwKaGzvtpKdz5r53g0Qr87AudAmVIsAzhfxQCaXg0gkOtwD+LE9QB/uAY/HA1tbW7C8G4S5bYBlUIC7uA5oXAJ1kw+GJ4bfGJMCDHq9/KBQZXHcNFVRBXJmi0MUgBUKAH/fBVzKC5zgPrDCNLAiYWZOFDgQZeEQ5gogxBUBxZeiaz4zLz4/b38VaqcekXzK1WoZG9tLCogXuuVkAaHSjBDVVIHi50JHmN9eU7xnwif/Hp4Q8AMhpYRKi93YhxDKEwHyfCj8U+LwpADm62hulvoLVWZ7m6mGEigzAjDhH3tJ3O9stY6P7yXKSPlLiPZEsb9APupo61MHBCVpAZhwW+rwtADx0ul0ElogN9sJ0yEiWdu9KHyidwaFG1KFpw1gOmEwSAJ8yYjdYKoNCM8mbvt7JpxA4bvprJs2IF4ter2YypeOOFr66vyC0j/bHg8/SD88Y8ARIpAvs5DG5+oQLmIAXMoDmtH7jgJq2zBqNrszWS9jQLwIg8E4d/Xx0OaFVgagWBqGsvEnN9CD5l2ma50IgLrQuKB5+GG9/BYDUH19CxUzT5vQvT6RA+QAOUAOkAOcFkC7Vt5uW6y5ByG86PQB6GzA5vF4LYFg6M5u8eVOdBoWy9Zspwf4tQiC4EbCYR3GYpHoD2na54B/Bsi2vgPc5hg/VHiJIwAAAABJRU5ErkJggg==); background-size:24px 24px; background-repeat:no-repeat; background-position:center;}");
    TSL.addStyle(null, "#ViewAllButton {background-image: url(data:image/png;base64,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); background-size:24px 24px; background-repeat:no-repeat; background-position:center;}");
    //TSL.addStyle(null, "#OptionsButton {background-image: url(); background-size:24px 24px; background-repeat:no-repeat; background-position:center;}");

    if (document.getElementById("yt-masthead-signin"))
    {
        TSL.addStyle("YTF_FW", "#FilterWindow{position: fixed;z-index: 9999999999999; right: 50px;top: 50px;background-color: #E9EAEA;border: 1px solid black;}#FilterWindow div{color: gray;text-decoration-style: none;padding: 3px 5px;}#FilterWindow tr:hover{text-decoration-style: none;background-color: lightgray;color: black;}");
        TSL.addStyle(null, "#ViewAllButton, #OptionsButton {margin-right: 10px; height: 28px; width: 32px; background-size:15px 15px; background-repeat:no-repeat; background-position:center;}");
    }
    else
    {
        TSL.addStyle("YTF_FW", "#FilterWindow{position: fixed;z-index: 9999999999999; right: 10px;top: 95px;background-color: #E9EAEA;border: 1px solid black;}#FilterWindow div{color: gray;text-decoration-style: none;padding: 3px 5px;}#FilterWindow tr:hover{text-decoration-style: none;background-color: lightgray;color: black;}");
        TSL.addStyle(null, "#OptionsButton{height: 32px; width: 32px; margin: 0; padding: 0; position: fixed;color: #777979; right: 10px;top: 60px;border-radius: 3px;background-color: lightgray;border: 1px solid darkgray;cursor: pointer; z-index:99999999999999999;}#OptionsButton:hover{background-color: darkgray;color: black;}");
    }
    TSL.addStyle(null, ".blockBTN32, .blockBTN16, .unblockBTN{background-repeat:no-repeat; cursor:pointer; background-image: url(data:image/png;base64,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);background-size: contain;z-index: 100;}");
    TSL.addStyle("YTF_BT", ".unblockBTN{display: inline-block;width: 16px;height: 16px; padding-right: 3px;} .blockBTN32{display: block;width: 32px;height: 32px;}a.aaTT:hover .blockLINKS{visibility: visible;} .blockBTN16 {display:block; background-color: black;border: 1px solid red;height: 24px;width: 24px;}");
    TSL.addStyle("YTF_BL", ".blockLINKS{position: absolute;top: 2px;visibility: hidden; z-index: 100; right: 2px;} .blockLINKS a:nth-child(2){line-height:normal; background-color:yellow; border: 1px solid blue; display:block;text-align:center;}");
    TSL.addStyle("YTF_NB", ".banNotice {position:absolute; z-index: 1000; font-size:medium;} .banNotice > span { display:table-cell; background-color:yellow; text-align: center; vertical-align: middle; }");
    TSL.addStyle("YTF_PC", "#FloatArea{position: fixed; right: 0px; top:10px; border: none; visibility:hidden; height: 200px; width:140px;}");
    TSL.addStyle("YTF_BX", ".blockBox {text-align:center;}");


    ShowAllVideos();
    TSL.addStyle("BlockVideoBG", ".blockedVideo, .blockedVideoBG {background-color:#FBE8E5;}");


    if (PageTYPE == 2)
    {
        if (GM_getValue("PageType2", false))
            TSL.addStyle("", GM_getValue("PageType2"));
        else TSL.addStyle("", "body #watch7-sidebar-contents {padding: 15px 0px 15px 5px !important;}"
                + "#watch7-sidebar-contents .video-list-item.related-list-item {padding-right: 35px;}");
    }
    else if (PageTYPE == 1 && GM_getValue("PageType1", false))
    {
        TSL.addStyle("", GM_getValue("PageType1"));
    }

    MainFunc();
})();

/*
1-3, Default is same as HQdefault but thumbnail size
http://img.youtube.com/vi/<insert-youtube-video-id-here>/<1-3>.jpg
http://img.youtube.com/vi/<insert-youtube-video-id-here>/default.jpg

0 & HQ default are the same
http://img.youtube.com/vi/<insert-youtube-video-id-here>/0.jpg
http://img.youtube.com/vi/<insert-youtube-video-id-here>/hqdefault.jpg

http://img.youtube.com/vi/<insert-youtube-video-id-here>/maxresdefault.jpg
https://developers.google.com/youtube/2.0/developers_guide_php?csw=1
*/
