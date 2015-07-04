// ==UserScript==
// @name            [TS] deviantArt Download Link
// @namespace       TimidScript
// @version         1.1.12b
// @description     Toggle ability to redirect to image file. Adds "Download" button on illustration page if missing. Show's if available download image is max-size. Adds copy button for fav.me and other meta-data. Removes open in new tab.
// @author          TimidScript
// @homepageURL     https://openuserjs.org/users/TimidScript
// @copyright       © 2014 TimidScript, All Rights Reserved.
// @license         Creative Commons BY-NC-SA + Read the License inside the script
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
// @grant           GM_addStyle
// @grant           GM_setClipboard
// @icon            data:image/png;base64,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
// ==/UserScript==

/* License + Copyright Notice
********************************************************************************************
Copyright © TimidScript, All Rights Reserved.
[Creative Commons BY-NC-SA](http://en.wikipedia.org/wiki/Creative_Commons_license)

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the
following conditions are met:

1) This copyright must be included
2) Due credits and link to original author's homepage (included in copyright).
3) Notify the original author of redistribution

TimidScript's Homepages:  [GitHub](https://github.com/TimidScript)
                          [OpenUserJS](https://openuserjs.org/users/TimidScript)
                          [GreasyFork](https://greasyfork.org/users/1455-timidscript)
*/
/* Information
**************************************************************************************************
 Version History
------------------------------------
1.1.12 (2015-06-21)
 - Redirect counter interval went back to 1000ms
1.1.11 (2015-06-19)
 - Bug Fix: Correct illustration data is collected. The site stores the content of the previous page which cause parsing problems.
 Fixed by checking if the main container display is set to none.
 - Bug Fix: Redirect check is also done before timer starts
 - Added few illustration page buttons that copy text to clipboard
    * Fav.me id
    * fav.me link
    * thumbnail
    * embed code
 - Removed legacy code
 - Script icon is base64 rather than imgur link
1.1.10 (2015-05-25)
 - Added timer to direct links.
1.1.9 (2015-03-21)
 - Bug fix due to changes in layout
 - Color of download button text becomes red if max download dimensions are not available or different
 - Added a button to allow direct open of full sized image
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
var DisplayImageOnly = GM_getValue("ReDirect");

function CreateDownloadButton(src, imgWidth, imgHeight)
{
    var holder = document.querySelector('body > div:not([style*="none"]) .dev-meta-actions');
    if (!holder) return;
    var btn = holder.querySelector("a.dev-page-button.dev-page-button-with-text.dev-page-download");
    MO.disconnect();
    if (btn && !btn.cleaned)
    {
        console.log("Remove onclick tracker");
        btn.removeAttribute("onclick");
        btn.removeAttribute("data-ga_click_event");
        btn.removeAttribute("data-download_type");
        btn.removeAttribute("data-dwait-deps");
        btn.removeAttribute("data-dwait-domready");
        btn.removeAttribute("data-download_url");
        btn.removeAttribute("rel");
        btn.cleaned = true;

        btn.addEventListener("click", function (e)
        {
            e.stopImmediatePropagation();
            return false;
        }, true);

        //btn.href += btn.href.replace(/\?token=.+/gi, "");
        //hb.button.href = hb.button.href.replace(/\?token.+/i, "");
        redirectToImage();
    }
    else if (!btn)
    {
        console.log("Adding missing Download Link");
        var btn = document.createElement("a");
        btn.className = "dev-page-button dev-page-button-with-text dev-page-download";
        btn.id = "dDLButton";

        if (imgWidth != undefined) btn.innerHTML = '<i></i><span class="label" style="color:hotpink;">Download</span><span class="text">' + imgWidth + " × " + imgHeight + '</span>';
        else btn.innerHTML = '<i></i><span class="label" style="color:hotpink;>Download</span><span class="text">Flash</span>';

        btn.href = src;
        holder.appendChild(btn);
        btn.cleaned = true;
        btn.added = true;
        redirectToImage();
    }

    if (btn && !btn.adjusted)
    {
        btn.adjusted = true;
        //console.log(imgHeight, imgWidth);
        if (imgWidth != undefined)
        {
            var size = document.evaluate('//body/div[not(contains(@style,"none"))]//div[contains(@class,"dev-metainfo-details")]//dt[contains(text(),"Resolution")]/following-sibling::dd[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
            if (size)
            {
                var notsame = true;
                var dimensions = btn.lastElementChild.textContent.match(/(\d+) × (\d+)/);
                if (dimensions)
                {
                    dimensionsO = size.textContent.match(/(\d+)×(\d+)/);

                    if (dimensionsO[1] == dimensions[1] && dimensionsO[2] == dimensions[2]) notsame = false;
                }

                if (notsame)
                {
                    btn.lastElementChild.innerHTML += " (<span style='color:red;'>" + size.textContent + "</span>)";
                }
                else
                {
                }
            }
        }

        GM_addStyle("#ExtraControls {text-align:center; background-color:rgba(255,255,255,0.5); padding: 0 0 5px 0; border-radius: 2px;}");
        GM_addStyle("#ExtraControls button {font-size: 12px;}");
        var el = document.createElement("div");
        el.id = "ExtraControls";
        el.innerHTML = '<div style="weight:600;font-size:16px;">Copy To Clipboard</div><button>fav.id</button><button>fav.me</button><button>thumbnail</button><button>embed</button>';
        holder.appendChild(el);
        var btns = document.querySelectorAll("#ExtraControls button");
        for (var i = 0; i < 4; i++) btns[i].onclick = copyToClipboard;

        el = document.querySelector('body > div:not([style*="none"]) .dev-metainfo-copy-control  input[data-ga_click_event*=favme]');
        if (el)
        {
            btns[0].value = el.value.match(/fav\.me\/(.+)/i)[1];
            btns[1].value = el.value;
        }
        else
        {
            btns[0].disabled = true;
            btns[1].disabled = true;
        }
        el = document.querySelector('body > div:not([style*="none"]) .dev-metainfo-copy-control  input[data-ga_click_event*=thumbcode]');
        if (el) btns[2].value = el.value;
        else btns[2].disabled = true;
        el = document.querySelector('body > div:not([style*="none"]) .dev-metainfo-copy-control  input[data-ga_click_event*=embed]');
        if (el) btns[3].value = el.value;
        else btns[3].disabled = true;
    }

    function copyToClipboard(e)
    {
        console.log("Copied to clipboard: " + this.value);
        GM_setClipboard(this.value);
    }

    function redirectToImage()
    {
        if (!DisplayImageOnly) return;
        var countdown = GM_getValue("ReDirect-Timer");
        if (countdown == 0) btn.click();
        else
        {
            var s = document.querySelector("#oh-menu-direct span span")
            s.setAttribute("style", "color: white;background-color:red;border-color:red;font-weight:900;");
            //console.log(countdown);
            var timer = 0,
                interval = setInterval(function ()
                {
                    timer++;
                    s.textContent = (countdown - timer);
                    if (s.textContent == 0)
                    {
                        clearInterval(interval);
                        btn.click();
                    }

                    if (!DisplayImageOnly)
                    {
                        clearInterval(interval);
                        s.removeAttribute("style");
                        s.textContent = GM_getValue("ReDirect-Timer");
                    }
                }, 1000);
        }
    }

    MO.observe();
}

function AddReDirectButton()
{
    if (document.getElementById("oh-menu-direct")) return;

    GM_addStyle(".mItem {background-image: none; display: block; height: 49px; line-height: 49px; padding: 0px 10px; text-transform: uppercase; cursor: pointer;}");
    GM_addStyle(".mItem > span {background-color:gray; padding: 8px 10px; border-radius: 3px; font-weight: 700;}");
    GM_addStyle(".mItem > span > span {padding: 2px 4px; background-color: lightgray; border-radius: 4px; border: 2px solid transparent;}");
    GM_addStyle(".mItem.directImage > span {background-color: #4A9E18 !important; color: white;} .mItem.directImage > span > span {background-color: #82DF4B;}");
    GM_addStyle(".mItem:hover {background-color: black !important; color: white !important;}");
    GM_addStyle(".mItem.directImage:hover {color: lime!important;}");
    GM_addStyle(".mItem span > span:first-child:hover {border-color: yellow; color: yellow;}");

    var md = document.createElement("td");
    md.innerHTML = '<a class="oh-l mItem"><span>ReDirect <span>0</span></span></a>';
    md.className = "oh-keep";
    md.id = "oh-menu-direct";
    var ms = document.getElementById("oh-menu-submit");
    ms.parentElement.insertBefore(md, ms);

    if (GM_getValue("ReDirect", 0) == 1) md.firstElementChild.className = "oh-l mItem directImage";
    md.querySelector("span span").textContent = GM_getValue("ReDirect-Timer", 0);

    md.onclick = function (e)
    {
        if (GM_getValue("ReDirect", 0) == 0)
        {
            GM_setValue("ReDirect", 1);
            DisplayImageOnly = 1;
            md.firstElementChild.className = "oh-l mItem directImage";
        }
        else
        {
            GM_setValue("ReDirect", 0);
            DisplayImageOnly = 0;
            md.firstElementChild.className = "oh-l mItem";
        }
    };

    md.querySelector("span span").onclick = function (e)
    {
        e.stopImmediatePropagation();
        switch (parseInt(this.textContent))
        {
            case 0:
                this.textContent = 2;
                break;
            case 2:
                this.textContent = 4;
                break;
            case 4:
                this.textContent = 8;
                break;
            default:
                this.textContent = 0;
                break;
        }

        GM_setValue("ReDirect-Timer", this.textContent);
    };
}

// MutationObserver Control
var MO =
{
    observer: null,

    disconnect: function ()
    {
        if (MO.observer)
        {
            MO.observer.disconnect();
            //console.log("deviantArt Download Link: Observer Disconnected");
        }
    },

    //Observes body changes
    observe: function ()
    {
        //MO.callback(); //Just in case it gets missed. Happens occasionally

        var mo = window.MutationObserver || window.MozMutationObserver || window.WebKitMutationObserver;
        if (mo)
        {
            MO.observer = null;
            MO.observer = new mo(MO.callback);
            MO.observer.observe(document.body, { characterData: true, attributes: true, childList: true, subtree: true });
            //console.warn("deviantArt Download Link: Observer Connected");
        }
    },

    callback: function (mutations)
    {
        AddReDirectButton();
        if (!document.URL.match(/\.deviantart\.com\/(#\/)?art/i)) return;

        if (document.querySelector('body > div:not([style*="none"]) .dev-view-deviation #flashed-in iframe')) //Illustration contains a frame with flash content
        {
            console.log("Illustration Type: flash");
            window.addEventListener('message', function (event)
            {
                //console.log(event.data);
                if (event.data.match(/^dDL_SWFurl:/i))
                    CreateDownloadButton(event.data.replace(/^dDL_SWFurl:/i, ""));
            }, false);
            return
        }

        var img = document.querySelector('body > div:not([style*="none"]) .dev-content-full');
        if (img)
        {
            CreateDownloadButton(img.src, img.naturalWidth, img.naturalHeight);
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
