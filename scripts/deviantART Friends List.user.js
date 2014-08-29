// ==UserScript==
// @name                [TS] deviantART Friends List
// @namespace           TimidScript
// @version             1.0.3
// @description         Friends List - Direct Links to root Gallery instead of Profile Page
// @icon                https://i.imgur.com/1KiUR7g.png
// @author              TimidScript
// @homepageURL         https://openuserjs.org/users/TimidScript
// @copyright           © 2014 TimidScript, All Rights Reserved.
// @license             Creative Commons BY-NC-SA + Please notify me if distributing
// @include             http://www.deviantart.com/deviants/
// @require             https://openuserjs.org/src/libs/TimidScript/TSL_-_GM_Update.js
// @homeURL             https://openuserjs.org/scripts/TimidScript/[TS]_deviantART_Friends_List
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
1.0.3 (2014-08-29)
 - Added GM_update
1.0.2 (2014-08-19)
 - Cleaned up header for OUJS
1.0.1 (2013-09-30)
 - Initial Release
**************************************************************************************************/

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
        if (Observe.busy) return;
        var deviants = document.getElementById("deviantlist");

        Observe.busy = true;
        if (Observe.length != deviants.innerHTML.length)
        {
            var links = deviants.getElementsByTagName("a");
            
            //console.log(links.length);
            for (var i = 0;i < links.length; i++)
            {
                var link = links[i];
                if (link.href.match(/.+\.deviantart.com\/$/i))
                {
                    link.href = link.href + "gallery/?catpath=/";
                }
            }

            Observe.length = deviants.innerHTML.length;
        }        
        Observe.busy = false;        
    }
};


Observe.bodyChanges();


