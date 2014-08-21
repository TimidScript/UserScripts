// ==UserScript==
// @name            [TS] TESNexus Redirect
// @namespace       TimidScript
// @version         1.0.1 DEFUNCT
// @description     **Depreciated** Redirects TESNexus to Oblivion nexusmods. Depreciated: Use "Linx Amender" instead.
// @icon            http://i.imgur.com/aqb4avb.png
// @author          TimidScript
// @homepageURL     https://openuserjs.org/users/TimidScript
// @copyright       © 2014 TimidScript, All Rights Reserved.
// @license         Creative Commons BY-NC-SA + Please notify me if distributing
// @include         http://www.tesnexus.com/*
// @include         http://tesnexus.com/*
// @run-at          document-start
// @grant           none
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

Initial release date: Jan 22, 2014 13:12

------------------------------------
 Version History
------------------------------------
1.0.1 (2013/01/22)
 - Initial Release
********************************************************************************************/

//http://wwww.tesnexus.com/mods/
//http://www.tesnexus.com/downloads/file.php?id=*
var id = document.URL.replace(/http:\/\/(www\.)?tesnexus\.com\/mods\/(\d+)($|\/.+)/, "$2");
if (isNaN(id))
    id = document.URL.replace(/http:\/\/(www\.)?tesnexus\.com\/downloads\/file\.php\?id=(\d+)[^\d]+/, "$2");

if (!isNaN(id)) document.location.assign( "http://www.nexusmods.com/oblivion/mods/" + id);
