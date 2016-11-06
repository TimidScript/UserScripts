// ==UserScript==
// @name                    TSL - GM_update
// @namespace               TimidScript
// @version                 1.1.12
// @description             An advance user-script updater library that supports OpenUserJS, GreasyFork, MonkeyGuts and any other site that provides meta.js support. Should work with GreaseMonkey v2+ (FireFox), Scriptish v0.1.12+ (FireFox), TamperMonkey (Chrome) and ViolentMonkey (Opera).
// @author                  TimidScript
// @homepageURL             https://github.com/TimidScript
// @copyright               © 2014+ TimidScript, Some Rights Reserved.
// @license                 https://github.com/TimidScript/UserScripts/blob/master/license.txt
// @exclude                 *
// ==/UserScript==


/* License + Copyright Notice
********************************************************************************************
License can be found at: https://github.com/TimidScript/UserScripts/blob/master/license.txt
Below is a copy of the license the may not be up-to-date.

Copyright © TimidScript, Some Rights Reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the
following conditions are met:

1) GPL-3 License is met that does not conflict with the rest of the license (http://www.gnu.org/licenses/gpl-3.0.en.html)
2) This notice must be included
3) Due credits and link to original author's homepage (included in this notice).
4) Notify the original author of redistribution
5) Clear clarification of the License and Notice to the end user
6) Do not upload on OpenUserJS.org or any other site that infringes on this license

TimidScript's Homepages:  GitHub:      https://github.com/TimidScript
                          GreasyFork:  https://greasyfork.org/users/1455
*/
/* Information
********************************************************************************************
Periodically checks for updates, or when the GreaseMonkey command menu is selected.

If the version number do not match it brings the update script dialog box.

Should work with any GreaseMonkey alternative that supports GM_setValue, GM_getValue and
GM_info/GM_getMetadata.

----------------------------------------------
 How to use on your script
----------------------------------------------
You must add the following to the user script header:

##################################################
// @grant               GM_xmlhttpRequest
// @grant               GM_info
// @grant               GM_getMetadata
// @grant               GM_getValue
// @grant               GM_setValue
// @grant               GM_deleteValue
// @grant               GM_registerMenuCommand
// @homeURL             <url1>
// @metaURL             <url2>
##################################################


<url1> is the homepage of the user script. Example of "url" values:
        - https://greasyfork.org/scripts/4336-ts-citrus-gfork
        - https://openuserjs.org/scripts/TimidScript/%5BTS%5D_Citrus_GFork
        - https://monkeyguts.com/code.php?id=288

<url2> us the meta.js file


From version 1.1+ it no longer gets information from the scripts homepage. It requires
the meta.js file. For GreasyMonkey and OUJS, it can figure out the meta.js file location
from the homepage (if entered correctly).

@homeURL should not point to a user.js file. The reason for this is mainly for
security reasons. There currently no checks on this, but later release may disallow
direct linkage to user.js files.

It is highly recommended to use GF or OUJS site as they are maintained by the
community and have checks and balances.

#### Below are optional header properties.

// @metaURL             <url>
    <url> is the link to the meta.js file. For GFork and OUJS this can be extracted from
    the homepage, but it is still recommened to enter it. For personal sites, well it is
    a must.

// @changelog           <list of changes in html>
    Allows you to provide changelog in html format, that will be displayed on the
    update dialog. This can only be extracted from the meta.js file.
    Only allows the following tags: uo, ol, li, b, strong, i, div and br
    All node attributes, apart from "style", will be removed.

// @gm_update            manual
    This will allow you to disable auto-update and then functions need to be called
    from your script. This will give the author more control on updates

----------------------------------------------
 Version History
----------------------------------------------
1.1.12 (2016-11-06)
 - Set referer
1.1.11 (2016-05-27)
 - License altered
1.1.10 (2016-04-10)
 - Force using meta.js and no longer parsing home page
 - Removed support for MonkeyGuts
1.0.9 (2016-04-03)
 - Changed license to GPL-3
1.0.8 (2016/02/14)
 - Fix for TamperMonkey as it removes spaces
1.0.7 (2014/12/12)
 - @exclude added
1.0.6 (2014/10/31)
 - Major bug fix to do with inability of other browsers beside firefox to handle
 - Bug fix: removed TSL.removeNode reference
1.0.5 (2014/01/10)
 - Command menu option now shows window dialog then attempts to get new version information.
 Apart from console, there is no feeback if it fails.
1.0.4 (2014/09/28)
 - Update timestamp only when you get dismiss or go to the download page of the update dialog.
1.0.3 (2014/08/23)
 - Bug with GM2.1, FF31 and iframe. Temporary checking for window top is delayed.
 - Support for html changelog added
 - Small bug fix, dialog appears when CoolingPeriod is not set.

********************************************************************************************/

//if (window.self !== window.top) return;

var GM_update =
{
    installed: { name: "", homeURL: "", version: "", description: "", metaURL: "", enabled: "" },
    online: { name: "", version: "", description: "", changelog: "", date: "", userURL: "" },

    checkTimestamp: function ()
    {
        var days = GM_update.getDaysSinceLastCheck();
        var cp = GM_getValue("GMU-CoolingPeriod", 3);

        if (cp > 0 && (days < 0 || days >= cp))
        {
            var url = (GM_update.installed.metaURL) ? GM_update.installed.metaURL : GM_update.installed.homeURL
            GM_update.isThereANewVersion(url, checkCallback);
        }

        function checkCallback(success)
        {
            if (success && GM_update.installed.version != GM_update.online.version) GM_update.showUpdateDialog();
        }
    },

    /* Returns the number of days since last check. If it is the first check,
       it returns -1.
    =====================================================================================*/
    getDaysSinceLastCheck: function ()
    {
        var timestamp = GM_getValue("GMU-Timestamp", null);

        if (!timestamp) return -1;

        var now = new Date().getTime();
        var diff = now - timestamp;
        diff = diff / (1000 * 60 * 60 * 24); //Get number of days gone by;
        return diff;
    },

    /* url is url to the scripts OUJS/GF/MG homepage or to the meta.js file.
    checkCallback is function that takes in one parameter that returns true
    if version check is done successfully.
    checkCallback(success).
    =====================================================================================*/
    isThereANewVersion: function (url, checkCallback)
    {
        if (!url && GM_update.installed.metaURL) url = GM_update.installed.metaURL;
        else if (!url) url = GM_update.installed.homeURL;

        console.info("GM_update: " + url);
        GM_xmlhttpRequest({
            url: url,
            method: "GET",
            headers: {
                "User-agent": navigator.userAgent,
                "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
                "Accept-Language": "en-US,en;q=0.5",
                "Referer": "https://www.greasyfork.org"
            },
            onload: function (xhr)
            {
                //console.log("xhr.status: " + xhr.status, url);
                if (xhr.status == 200)
                {
                    var online;
                    online = GM_update.parseMeta(xhr.responseText);

                    if (checkCallback && online.version) checkCallback(true);
                    else if (checkCallback) checkCallback(false);
                    else if (!online.version || !online.name) console.error("GM_update xhr.status: " + xhr.status);
                    else if (online.version != GM_update.version) GM_update.showUpdateDialog();
                }
                else console.error("GM_update xhr.status: " + xhr.status);
            },
            ontimeout: function (response)
            {
                console.error("GM_Update: Unable to access script homepage due to timeout error. URL: " + url);
                console.warn(response);
                checkCallback(false);
            },
            onerror: function (response)
            {
                console.error("GM_Update: Error trying to access script homepage URL: " + url);
                console.warn(response);
                checkCallback(false);
            }
        });
    },

    /* Parses meta.js file
    =====================================================================================*/
    parseMeta: function (raw)
    {
        var online = GM_update.online;
        var lines = raw.split('\n');
        var metadata = {};
        for (var i = 0; i < lines.length; i++)
        {
            lines[i].replace(/\s*\/\/\s*@([^ ]+)\s+(.+)/, function (all, key, value)
            {
                key = key.toLowerCase();
                metadata[key] = value.trim();
            });
        }

        online.name = metadata["name"];
        online.version = metadata["version"];
        online.description = metadata["description"];
        online.changelog = metadata["changelog"];
        online.metaURL = metadata["metaurl"];

        return metadata
    },

    /* Shows update window
    =====================================================================================*/
    showUpdateDialog: function (installed, online)
    {
        if (!installed) installed = GM_update.installed;
        if (!online) online = GM_update.online;

        if (document.getElementsByName(installed.name)[0]) document.body.removeChild(document.getElementsByName(installed.name)[0]);

        var iframe = document.createElement("iframe");
        iframe.id = "GM_UpdateWindow";
        iframe.name = installed.name;
        iframe.setAttribute("style", "border: none; background-color: transparent; position:fixed; right: 15px; bottom: 15px; z-index: 9999999999999999999999999;");
        iframe.onload = function ()
        {
            var doc = iframe.contentDocument || iframe.contentWindow.document;
            var css = doc.createElement("style");
            css.type = "text/css";
            css.textContent = "#smain{width: 600px;max-width: 600px;background-color: #E9E9F9;border: 2px ridge blue;font-size: 15px;}header{text-align: center;padding: 2px 0;font-size: 17px;color: black;border-bottom: 1px solid;}header, footer{border-color: navy;background-color: #CFCFF5;}footer{padding: 4px 5px 2px 5px;height: 25px;border-top: 1px solid;}#sdetail{margin: 5px;}#sname, #sversion{font-weight: bolder;}#sname{color: blue;}#sversion{color: blue;}article{background-color: white;padding: 5px;border-radius: 3px;}#info{padding: 2px 5px;border-radius: 3px;margin-bottom: 3px;border: 1px ridge gray;}.matched msg{background-color: #EFF1F1;color: black;}.matched #newversion, .matched #logsection{display: none;}.unmatched #info{background-color: white;}.unmatched #msg{font-size: 12px;display: inline-block;padding: 2px 5px;background-color: #F7E1E5;border: 1px solid #CA3952;color: #CA3952;border-radius: 5px;}.unmatched #newversion{display: inline-block;}#newversion{font-weight: bolder;margin-left: 5px;}#snameL{color: #33AC4A;}#sversionL{color: red;}#gohome, #cancel{font-family: 'Times New Roman';float: right;padding: 2px 6px;border: 1px solid;border-radius: 5px;text-decoration: none;font-size: 14px;margin-left: 3px;background-color: lightgray;}.unmatched #gohome{text-decoration: underline;text-decoration-color: red;-moz-text-decoration-color: red;color: green;background-color: #BDF1BD;}#cancel:hover, #gohome:hover{cursor: pointer;background-color: lightblue;}";
            doc.head.appendChild(css);

            doc.body.innerHTML = '<div id="smain"><header><span>Update Check: </span><span id="sname"></span><sup>v.<span id="sversion"></span></sup></header><section id="sdetail"><div id="info"><div id="msg"></div><div id="newversion"><span id="snameL"></span><sup>v.<span id="sversionL"></span> [<time id="stimeL"></time>]</sup></div></div><article><div style="font-weight: bolder;">Summary:</div><div id="description"></div><div id="logsection"><hr /><div style="font-weight: bolder;">Changelog:</div><div id="changelog"></div></div></article></section><footer><label>Update check: </label><select id="intervalLength"><option>never</option><option>everyday</option><option>every 2 days</option><option>every 3 days</option><option>every 4 days</option><option>every 5 days</option><option>every 6 days</option><option>every 7 days</option></select><div id="cancel">Cancel</div><a id="gohome" target="_blank">Download Page</a></footer></div>';

            doc.getElementById("sname").textContent = installed.name;
            doc.getElementById("sversion").textContent = installed.version;
            doc.getElementById("description").textContent = installed.description;
            doc.getElementById("gohome").href = installed.homeURL;

            installed.version = installed.version.replace(/\s/g, "");
            online.version = online.version.replace(/\s/g, "");
            if (installed.version != online.version)
            {
                doc.getElementById("smain").className = "unmatched";
                doc.getElementById("msg").textContent = "New version released";

                doc.getElementById("snameL").textContent = (online.name) ? online.name : "getting online info...";
                doc.getElementById("sversionL").textContent = online.version;

                if (online.date) doc.getElementById("stimeL").textContent = online.date;
                else
                {
                    var sup = doc.getElementById("stimeL").parentElement;
                    sup.innerHTML = sup.innerHTML.replace(/\[(<time .+)\]$/i, "$1");
                }

                if (online.changelog)
                {
                    var log = doc.getElementById("changelog");
                    log.innerHTML = online.changelog;
                    var nodes = doc.querySelectorAll('div[id="changelog"] *');
                    for (var i = 0; i < nodes.length; i++)
                    {
                        var node = nodes[i];
                        if (!node.tagName.match(/uo|ol|li|b|strong|i|div|br/i))
                        {
                            node.parentElement.removeChild(node);
                        }
                        else if (node.attributes)
                        {
                            try
                            {
                                for (var j = 0; j < node.attributes.length; j++)
                                {
                                    var attrib = node.attributes[j];
                                    if (attrib.name.toLowerCase() != "style")
                                    {
                                        node.removeAttribute(attrib.name);
                                        j--;
                                    }
                                }
                            }
                            catch (e) { console.log(e); }
                        }
                    }
                }
                else doc.getElementById("logsection").style.display = "none";
            }
            else
            {
                doc.getElementById("smain").className = "matched";
                doc.getElementById("msg").textContent = "It appears you have the latest version"
            }

            var cp = GM_getValue("GMU-CoolingPeriod", 5);
            doc.getElementById("intervalLength").selectedIndex = cp;
            doc.getElementById("intervalLength").onchange = function ()
            {
                GM_setValue("GMU-CoolingPeriod", doc.getElementById("intervalLength").selectedIndex);
            }

            doc.getElementById("cancel").onclick = function ()
            {
                GM_setValue("GMU-Timestamp", new Date().getTime());
                document.body.removeChild(iframe);
            };

            doc.getElementById("gohome").onclick = function ()
            {
                GM_setValue("GMU-Timestamp", new Date().getTime());
            };


            //Resize iframe
            var intervalID = setInterval(function (iframe, doc)
            {
                iframe.style.width = (doc.body.firstElementChild.offsetWidth + 35) + "px";
                iframe.style.height = (doc.body.scrollHeight) + "px";
                Counter++;
                if (Counter == 20)
                {
                    clearInterval(intervalID);
                }
            }, 50, iframe, doc);
        }

        document.body.appendChild(iframe);
    }
};


(function ()
{
    if (window.self !== window.top) return;

    var installed = GM_update.installed;

    if (typeof GM_info !== "undefined")
    {
        installed.name = TrimValue(GM_info.script.name);
        installed.version = TrimValue(GM_info.script.version);
        installed.description = TrimValue(GM_info.script.description);

        var str = GM_info.scriptMetaStr;

        m = GM_info.scriptMetaStr.match(/\/\/ @homeurl\s+(.+)/i);
        if (m) installed.homeURL = TrimValue(m[1]);

        m = GM_info.scriptMetaStr.match(/\/\/ @metaurl\s+(.+)/i);
        if (m) installed.metaURL = TrimValue(m[1]);

        m = GM_info.scriptMetaStr.match(/\/\/ @gm_update\s+(.+)/i);
        if (m) installed.enabled = TrimValue(m[1]) != "manual";
        else installed.enabled = true;
    }
    else if (typeof GM_getMetadata !== "undefined")
    {
        installed.name = TrimValue(GM_getMetadata("name"));
        installed.version = TrimValue(GM_getMetadata("version"));
        installed.description = TrimValue(GM_getMetadata("description"));

        installed.homeURL = TrimValue(GM_getMetadata("homeurl"));
        installed.metaURL = TrimValue(GM_getMetadata("metaurl"));
        installed.enabled = (TrimValue(GM_getMetadata("gm_update")) != "manual");
    }

    if (installed.enabled && installed.version && installed.homeURL && installed.name)
    {
        console.info("Register GM_update menu for: " + installed.name);

        if (!installed.metaURL)
        {
            /*
                https://openuserjs.org/scripts/TimidScript/[TS]_Pixiv++
                https://openuserjs.org/install/TimidScript/[TS]_Pixiv++.user.js
                https://openuserjs.org/meta/TimidScript/[TS]_Pixiv++.meta.js
            */
            /*
                https://greasyfork.org/en/scripts/4685-ts-pixiv
                https://greasyfork.org/scripts/4685-ts-pixiv/code/[TS]%20Pixiv++.meta.js
                https://greasyfork.org/scripts/4685-ts-pixiv/code/[TS]%20Pixiv++.user.js
                https://greasyfork.org/scripts/4685/code/4685.user.js
                https://greasyfork.org/scripts/4685/code/4685.meta.js
            */

            if (installed.homeURL.match("//greasyfork.org"))
            {
                var id = installed.homeURL.match(/\/scripts\/(\d+)/)[1];
                installed.metaURL = "https://greasyfork.org/scripts/" + id + "/code/" + id + ".meta.js";
            }
            else if (installed.homeURL.match(/\/\/(oujs\.org|openuserjs\.org)/))
            {
                installed.metaURL = installed.homeURL.replace(/\/scripts\/(.+)\/(.+)/, "/meta/$1/$2.meta.js");
            }
            console.warn(installed.metaURL);
        }

        GM_registerMenuCommand("Update Check: " + installed.name, function ()
        {
            GM_update.showUpdateDialog();
            GM_update.isThereANewVersion();
        });

        GM_update.checkTimestamp();
    }
    else if (installed.enabled)
    {
        console.error("GM_update: unable to get user script meta-data");
        console.log(GM_update.installed);
    }

    function TrimValue(value)
    {
        if (value) return value.trim();
        else "";
    }
})();
