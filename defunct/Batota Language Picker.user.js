// ==UserScript==
// @name                [TS] Batota Language Picker
// @namespace           TimidScript
// @version             1.0.2 DEFUNCT
// @description         **Depreciated** Only displays one language (Default English). Depreciated: Use "Linx Amender" instead.
// @icon                https://i.imgur.com/aqb4avb.png
// @author              TimidScript
// @homepageURL         https://openuserjs.org/users/TimidScript
// @copyright           © 2014 TimidScript, All Rights Reserved.
// @license             Creative Commons BY-NC-SA + Please notify me if distributing
// @include             http://www.batoto.net/comic/*
// @grant               GM_getValue
// @grant               GM_setValue
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

Initial release date: Dec 7, 2013 12:48

----------------------------------------------
 Guide
----------------------------------------------
You can set the language by setting the line:
    GM_setValue("Language", "Spanish") 

The line can be found commented out below.

To place the comic listing above the forum posts you need to 
uncomment the last two lines. 

----------------------------------------------
    Version History
----------------------------------------------
1.0.2 (2013/12/07)
 - Public release
 - Cleaned up the code and added updater
 - Made it case insensitive
 - Placed the comic listing above the forum posts
 - Uploaded the script
1.0.1 (2013/10/11)
 - Initial Release 
 - Add Missing download link 
**********************************************************************************************/

//GM_setValue("Language", "Spanish"); //Remove the comment and change it to the language you want
var LanguageToKeep = GM_getValue("Language", "English");

var tab = document.getElementsByClassName("chapters_list")[0];
for (var i = tab.rows.length - 1; i >= 0; i--)
{ 
    var row = tab.rows[i];
 
    var re = RegExp(LanguageToKeep, "i"); 
    if (!row.className.match(re)) row.parentNode.removeChild(row);
}

//var title = document.getElementsByClassName("maintitle")[0];
//title.parentElement.insertBefore(tab.parentElement, title);
