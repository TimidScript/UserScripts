// ==UserScript==
// @name                    [TS] Voltaire Network Language Picker
// @namespace               TimidScript
// @description             **Depreciated** Check Language(s) to display in "this weeks articles" box (Default English only). Depreciated: Use "Linx Amender" instead.
// @author                  TimidScript
// @homepageURL             https://openuserjs.org/users/TimidScript
// @copyright               © 2014 TimidScript, All Rights Reserved.
// @license                 GNU GPLv3 + Please notify me if distributing
// @version                 1.0.2
// @icon                    http://i.imgur.com/aqb4avb.png?1
// @include                 http://www.voltairenet.org/*
// @grant                   GM_getValue
// @grant                   GM_setValue
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

----------------------------------------------
    Version History
----------------------------------------------
1.0.2 (2014-08-19)
 - Cleaned up header for OUJS
1.0.1 (2014-04-24)
 - Initial release

**********************************************************************************************/
/* [VYCS] VARIABLE YOU CAN SET
**********************************************************************************************/
//GM_setValue("Languages", JSON.stringify(["en","es"])); //Languages English and Spanish
/* Language IDs
ar      عربي
en      English
es      Español
it      Italiano
fr      Français
pt      Português
ru      Pусский
de      Deutsch
fa      فارسى
el      ελληνικά
tr      Türkçe
hy      Armenian
*/
/*********************************************************************************************/

(function ()
{

    var langs = GM_getValue("Languages", JSON.stringify(["en"]));
    langs = JSON.parse(langs);

    var articles = document.querySelectorAll("div[class='marge'] > div[id^='art']");    
    for (var i = 0; i < articles.length; i++)
    {
        articles[i].style.display = "none";        
        for (var j = 0; j < langs.length; j++)
        {            
            var re = new RegExp(" " + langs[j],"gi");
            if (articles[i].className.match(re))
            {                
                articles[i].style.display = null;
                break;
            }
        }
    }
})();
