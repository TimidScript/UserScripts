// ==UserScript==
// @name            [TS] deviantArt Download Link
// @namespace       TimidScript
// @version         1.0.8
// @description     Adds the Download Link on illustration page if missing and also removes open in new tab
// @icon            https://i.imgur.com/1KiUR7g.png
// @author          TimidScript
// @homepageURL     https://openuserjs.org/users/TimidScript
// @copyright       © 2014 TimidScript, All Rights Reserved.
// @license         Creative Commons BY-NC-SA + Please notify me if distributing
// @include         *//*.deviantart.com/*
// @require         https://openuserjs.org/src/libs/TimidScript/TSL_-_GM_Update.js
// @homeURL         https://openuserjs.org/scripts/TimidScript/[TS]_deviantART_Download_Link
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


------------------------------------
 Version History
------------------------------------
1.0.8 (2014-08-29)
 - Added GM_update
1.0.7 (2014-08-19)
 - Cleaned up header for OUJS
1.0.6 (2014-08-06)
 - Bug fix on direct link beside the title. It does not link to the largest format of the image. Removed
 it for now.
1.0.5 (2014-07-11)
 - Bug Fix on direct links 
 - Optimised code
1.0.4 (2014-07-03)
 - Added direct link without button next to the title
1.0.3 (2013-12-07)
 - Need MutationObserver on all the site. (*//*.deviantart.com/*)
1.0.2 (2013-12-07)
 - Support of flash download added
 - BugFix: the illustration page contains hidden elements that we need to check for, as we
 are trying to only change the visible one.
 - Not using TimidScript Library so remove requirement
1.0.1 (2013-10-07)
 - Initial Release 
 - Add Missing download link
 - Stopped download from opening in new tab
**************************************************************************************************/

function CreateDownloadButton(container, src, imgWidth, imgHeight)
{    
    var holder = container.getElementsByClassName("dev-meta-actions")[0];    
    if (!holder) return;
    var btn = document.evaluate(".//a[@class='dev-page-button dev-page-button-with-text dev-page-download']", holder, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
               
    MO.disconnect();
    if (btn)
    {        
        console.log("Remove onclick tracker");
        btn.removeAttribute("onclick");
        //btn.href += btn.href.replace(/\?token=.+/gi, "");        
        //hb.button.href = hb.button.href.replace(/\?token.+/i, "");        
    }
    else        
    {
        console.log("Adding missing Download Link");
        var a = document.createElement("a");
        a.className = "dev-page-button dev-page-button-with-text dev-page-download";
        a.id = "dDLButton";

        if (imgWidth != undefined) a.innerHTML = '<i></i><span class="label" >Download</span><span class="text" style="color:red;">' + imgWidth + " x " + imgHeight + '</span>';
        else a.innerHTML = '<i></i><span class="label" >Download</span><span class="text" style="color:red;">Flash</span>';

        a.href = src;
        holder.appendChild(a);        
    }
        
    //if (document.getElementById("downloadLink")) document.getElementById("downloadLink").parentElement.removeChild(document.getElementById("downloadLink"));       
    //var dtc = container.getElementsByClassName("dev-title-container")[0];    
    //if (dtc)
    //{        
    //    h1 = dtc.getElementsByTagName("h1")[0];
    //    var dl = document.createElement("a");
    //    dl.href = src;
    //    dl.id = "downloadLink";
    //    dl.textContent = "[❀]";
    //    dl.style.marginRight = "5px";
    //    h1.insertBefore(dl, h1.firstElementChild);        
    //}
    MO.observe();
}



// MutationObserver Control
var MO =
{
    observer: null,
    
    disconnect: function()
    {
        if (MO.observer)
        {
            MO.observer.disconnect();
            console.warn("deviantArt Download Link Script Observer Disconnected");
        }
    },
    
    //Observes body changes
    observe: function()
    {       
        //MO.callback(); //Just in case it gets missed. Happens occasionally

        var mo = window.MutationObserver || window.MozMutationObserver || window.WebKitMutationObserver;
        if (mo)
        {
            MO.observer = null;            
            MO.observer = new mo(MO.callback);
            MO.observer.observe(document.body, { characterData: true, attributes: true, childList: true, subtree: true });
            console.warn("deviantArt Download Link Script Observer Running");
        }
    },

    callback: function (mutations)
    {
        if (!document.URL.match(/\.deviantart\.com\/(#\/)?art/i)) return;              
                        
        //Get last container to avoid history        
        var container = document.getElementsByClassName("dev-page-container")[document.getElementsByClassName("dev-page-container").length - 1];
        var iframe = document.evaluate("//div[@class='dev-view-deviation']//div[@id='flashed-in']/iframe[@class='flashtime']", container, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        var img = container.getElementsByClassName("dev-content-full")[0];

        if (iframe) //Illustration contains a frame with flash content
        {
            console.log("Illustration: flash");
            window.addEventListener('message', function (event)
            {
                console.log(event.data);
                if (event.data.match(/^dDL_SWFurl:/i))
                    CreateDownloadButton(container, event.data.replace(/^dDL_SWFurl:/i, ""));
            }, false);
        }
        else if (img)
        {
            console.log("Illustration: Image");
            CreateDownloadButton(container, img.src, img.naturalWidth, img.naturalHeight);
        }
    }
}

console.info("[TS] deviantArt Download Link");
(function ()
{
    if (window === window.top)
    {
        MO.observe();
    }
    else if (document.URL.match(/sandbox\.deviantart\.com\/\?fileheight/i))
    {
        //Pass flash src information that is stored in the iframe        
        var flash = document.getElementsByTagName("embed")[0];
        
        //Do a delay to allow observe to hook in 
        if (flash)
            setTimeout(function () { window.top.postMessage('dDL_SWFurl:' + flash.src, '*'); }, 1000);           
    }    
})();


