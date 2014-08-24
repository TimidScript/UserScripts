// ==UserScript==
// @name            [TS] Youtube No Redirects
// @namespace       TimidScript
// @version         2.0.10 DEFUNCT
// @description     **Depreciated** Removes Tracker/Redirects from links. Depreciated: Use "Linx Amender" instead.
// @icon            https://i.imgur.com/aqb4avb.png
// @author          TimidScript
// @homepageURL     https://openuserjs.org/users/TimidScript
// @copyright       © 2014 TimidScript, All Rights Reserved.
// @license         Creative Commons BY-NC-SA + Please notify me if distributing
// @include         *//www.youtube.*
// ==/UserScript==


/* Information
********************************************************************************************
Copyright © 2014 TimidScript, All Rights Reserved.
Script's Homepage:              Check homepages below

TimidScript's Homepage:         https://openuserjs.org/users/TimidScript
                                https://greasyfork.org/users/1455-timidscript
                                https://monkeyguts.com/author.php?un=timidscript
                                
                                http://userscripts.org/users/TimidScript
                                http://userscripts-mirror.org/users/TimidScript
                                
Initial release date: Sep 16, 2010 12:58
********************************************************************************************/

removeLinkTracking();

function removeLinkTracking()
{
    // Thanks go to Avindra V.G. from userscripts.org
    var links = document.getElementsByClassName("yt-uix-redirect-link");
    for (var i = links.length - 1; i >= 0; --i) links[i].removeAttribute("class");
}

