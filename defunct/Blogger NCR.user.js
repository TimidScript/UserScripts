// ==UserScript==
// @name                    [TS] Blogger NCR
// @namespace               TimidScript
// @description             **Depreciated** Redirects blogspot to COM TLD + Skips Content Warning. Depreciated: Use "Linx Amender" instead.
// @run-at                  document-start
// @author                  TimidScript
// @homepageURL             https://openuserjs.org/users/TimidScript
// @copyright               © 2014 TimidScript, All Rights Reserved.
// @license                 GNU GPLv3 + Please notify me if distributing
// @version                 1.0.8 DEFUNCT
// @icon                    http://i.imgur.com/aqb4avb.png
// @include                 http://*.blogspot.*/*
// @include                 *//www.blogger.com/*
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
1.0.8 (2014-08-19)
 - Cleaned up header for OUJS
Version 1.0.7
 - Blogger.com added
Version 1.0.6
 - Skips Content Warning
Version 1.0.5
 - Disabled the script from running in iframes.
Version 1.0.4
 - Bug Fixes provided by aaferrari. Supports com.ar and fix to do with 
 back history.
Version 1.0.3
 - runs at the document start.
 - picks up redirect http status 302 and acts accordingly
Version 1.0.2
 - Icon update
 - Altered update script
Version 1.0.1
 - Bug fix. Handle more blogspot urls.
********************************************************************************************/

(function ()
{
    SkipWarning(0);

    if (window.self === window.top)
    {
        var host = document.location.hostname;
        var parts = host.split(/\./);
        var i = parts.length - 1;


        if (parts[i].toLowerCase() != 'com')
        {
            var url = 'http://';
            for (var j = 0; j <= i - 1; j++)
            {

                if (parts[j] != "co" && parts[j] != "com") url += parts[j] + '.';
            }
            url += 'com/ncr' + document.location.pathname;
            document.location.replace(url);
        }
        else
        {
            xhr = XMLHttpRequest();
            xhr.open("head", document.URL, false);
            xhr.send(null);
            if (xhr.status == 302)
            {
                document.location.href.replace('/ncr' + document.location.pathname);
            }
        }        
    }
}());



function SkipWarning(i)
{    
    var a = document.getElementsByClassName("maia-button-primary")[0];    
    if (a)
    {
        window.open(a.href, "_parent");        
    }
    else if (i < 10)
    {
        setTimeout(function ()
        {
            SkipWarning(++i)
        }, 100);
    }
}
