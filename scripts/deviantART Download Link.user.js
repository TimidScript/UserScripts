// ==UserScript==
// @name            [TS] deviantArt Download Link
// @namespace       TimidScript
// @version         1.1.10
// @description     Adds the Download Link on illustration page if missing, option to redirect to image file, removes open in new tab.
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
// @grant           GM_addStyle
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
var Timeout, CurrentURL, DisplayImageOnly = GM_getValue("Open Full Size Image");

function CreateDownloadButton(container, src, imgWidth, imgHeight)
{
    //var container = document.getElementById("output");
    //if (container.style.display == "none") container = document.querySelector("body > .dev-page-container");
    var holder = container.getElementsByClassName("dev-meta-actions")[0];
    if (!holder) return;
    //var btn = document.evaluate(".//a[@class='dev-page-button dev-page-button-with-text dev-page-download']", holder, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
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
            e.stopPropagation();

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

        if (imgWidth != undefined) btn.innerHTML = '<i></i><span class="label" style="color:green;">Download</span><span class="text">' + imgWidth + " × " + imgHeight + '</span>';
        else btn.innerHTML = '<i></i><span class="label" style="color:green;>Download</span><span class="text">Flash</span>';

        btn.href = src;
        holder.appendChild(btn);
        btn.cleaned = true;
        redirectToImage();
    }

    if (btn && !btn.sized)
    {
        var size = document.evaluate('//div[contains(@class,"dev-metainfo-details")]//dt[contains(text(),"Resolution")]/following-sibling::dd[1]', container, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        if (size)
        {
            var notsame = true;
            var dimensions = btn.lastElementChild.textContent.match(/(\d+) × (\d+)/);
            if (dimensions)
            {
                dimensionsM = size.textContent.match(/(\d+)×(\d+)/);
                if (dimensionsM[1] == dimensions[1] && dimensionsM[2] == dimensions[2]) notsame = false;
            }

            btn.sized = true;
            if (notsame) btn.lastElementChild.style.color = "red";
            btn.lastElementChild.textContent += " (" + size.textContent + ")"
        }
    }

    function redirectToImage()
    {
        var countdown = GM_getValue("Open Full Size Timer") * 1000;
        if (DisplayImageOnly == 1 && countdown == 0) btn.click();
        else Timeout = setTimeout(function ()
        {
            if (DisplayImageOnly == 1) btn.click();
        }, countdown);
    }

    MO.observe();
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
            console.warn("deviantArt Download Link Script Observer Disconnected");
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
            console.warn("deviantArt Download Link Script Observer Running");
        }
    },

    callback: function (mutations)
    {
        if (document.URL == CurrentURL)
        {
            CurrentURL = document.URL;
            clearTimeout(Timeout);
        }

        if (!document.getElementById("oh-menu-direct"))
        {
            GM_addStyle(".mItem {background-image: none; display: block; height: 49px; line-height: 49px; padding: 0px 10px; text-transform: uppercase; cursor: pointer;}");
            GM_addStyle(".mItem > span {background-color:gray; padding: 8px 10px; border-radius: 3px; font-weight: 700;}");
            GM_addStyle(".mItem > span > span {padding:4px 6px; background-color: lightgray; border-radius: 2px;}");
            GM_addStyle(".mItem.directImage > span {background-color: #4A9E18 !important; color: white;} .mItem.directImage > span > span {background-color: #82DF4B;}");
            GM_addStyle(".mItem:hover {background-color: black !important; color: white !important;}");
            GM_addStyle(".mItem.directImage:hover {color: lime!important;}");

            var md = document.createElement("td");
            md.innerHTML = '<a class="oh-l mItem"><span>Direct <span>0</span></a>';
            md.className = "oh-keep";
            md.id = "oh-menu-direct";
            var ms = document.getElementById("oh-menu-submit");
            ms.parentElement.insertBefore(md, ms);

            if (GM_getValue("Open Full Size Image", 0) == 1) md.firstElementChild.className = "oh-l mItem directImage";
            md.querySelector("span span").textContent = GM_getValue("Open Full Size Timer", 0);

            md.onclick = function (e)
            {
                if (GM_getValue("Open Full Size Image", 0) == 0)
                {
                    GM_setValue("Open Full Size Image", 1);
                    DisplayImageOnly = 1;
                    md.firstElementChild.className = "oh-l mItem directImage";
                }
                else
                {
                    GM_setValue("Open Full Size Image", 0);
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

                GM_setValue("Open Full Size Timer", this.textContent);
            };
        }


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
                //console.log(event.data);
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
