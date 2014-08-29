// ==UserScript==
// @name            [TS] Youtube Load More Channel Videos
// @namespace       TimidScript
// @version         1.0.4b
// @description     Auto loads more videos in channel
// @icon            https://i.imgur.com/E2wQ6Xm.gif
// @author          TimidScript
// @homepageURL     https://openuserjs.org/users/TimidScript
// @copyright       © 2014 TimidScript, All Rights Reserved.
// @license         Creative Commons BY-NC-SA + Please notify me if distributing
// @include         http://www.youtube.*/user/*
// @include         https://www.youtube.*/user/*
// @include         http://www.youtube.*/channel/*
// @include         https://www.youtube.*/channel/*
// @require         https://openuserjs.org/src/libs/TimidScript/TSL_-_GM_Update.js
// @homeURL         https://openuserjs.org/scripts/TimidScript/[TS]_Youtube_Load_More_Channel_Videos
// @grant           GM_xmlhttpRequest
// @grant           GM_info
// @grant           GM_getMetadata
// @grant           GM_getValue
// @grant           GM_setValue
// @grant           GM_deleteValue
// @grant           GM_registerMenuCommand
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

----------------------------------------------
    Version History
----------------------------------------------
1.0.4 (2014-08-29)
 - Added GM_update
1.0.3 (2014-08-19)
 - Cleaned up header for OUJS
1.0.2 (2013-12-14)
 - Included "/channel/"
1.0.1 (2013-07-08)
 - Initial Release

********************************************************************************************/


var scrollOffset = 1000;
var intervalID = setInterval(ScrollPosition, 250)

function ScrollPosition() {
    if ((window.scrollMaxY - window.scrollY) < scrollOffset)
    {        
        LoadMoreVideos();
    }
}

function LoadMoreVideos() {
    var loadMore = document.getElementsByClassName("yt-uix-load-more load-more-button yt-uix-button yt-uix-button-default");
    if (loadMore.length == 0) loadMore = document.getElementsByClassName("more-videos yt-uix-button yt-uix-button-default");

    if (loadMore.length > 0) {
        loadMore = loadMore[0]
        var evt = document.createEvent("MouseEvents");
        evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        loadMore.dispatchEvent(evt);
    }
    else clearInterval(intervalID);
}
