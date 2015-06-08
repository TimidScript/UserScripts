// ==UserScript==
// @name            [TS] Citrus GFork
// @namespace       TimidScript
// @version         1.1.30
// @description     NOW with version number in Listing!! Advance table view for Greasy Fork. Fixes display bugs. 100 scripts display at a time, favoured user count, remembers last sort order used on Script Listing, "My" Profile Listing, and third Party Listing. Able to distinguish between, Library, Unlisted and Deleted scripts using text icons. Beside FireFox, it now supports Opera and Chrome.
// @icon            https://i.imgur.com/YKtX7ph.png
// @author          TimidScript
// @homepageURL     https://openuserjs.org/users/TimidScript
// @copyright       © 2014 TimidScript, All Rights Reserved.
// @license         Creative Commons BY-NC-SA + Please notify me if distributing
// @include         https://greasyfork.org/*
// @require         https://openuserjs.org/src/libs/TimidScript/TSL_-_Generic.js
// @require         https://openuserjs.org/src/libs/TimidScript/TSL_-_GM_Update.js
// @homeURL         https://openuserjs.org/scripts/TimidScript/[TS]_Citrus_GFork
// @grant           GM_getValue
// @grant           GM_setValue
// @grant           GM_deleteValue
// @grant           GM_xmlhttpRequest
// @grant           GM_info
// @grant           GM_getMetadata
// @grant           GM_registerMenuCommand
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

----------------------------------------------
    Version History
----------------------------------------------
1.1.30 (2015-06-08)
 - Bug Fix: "Report Bug" and "Review" review button always visible even when there is no need.
1.1.29 (2015-06-08)
 - Using json to populate the table. This allows the extraction of version number.
 - Changed the feedback system rating interface. Review by default is hidden.
 - Supporting of versions "Obselete", "Depreciated", and "Defunct" similar to the script "OUJS-1"
1.0.28b (2015-04-04)
 - Bug fix to handle site searches
1.0.27 (2014-12-28)
 - Bug fix to changes made in 1.0.25
 - Changed the sets into a menu. CSS provided by decembre.
1.0.26 (2014-12-27)
 - pre tag bug fix
1.0.25 (2014-12-27)
 - decembre's request to show favourite sets to script listing
script-list-set
 - Bug Fix to support URL local syntax
1.0.24 (2014-12-06)
 - Bug Fix in script paging
 - Bug Fix due to changes in url flags. Change sort flag from "fans" to "ratings"
 - Add total rating and provided total score also
 - Added counter to the number of users that favoured the script, in feedback tab
1.0.23 (2014-11-29)
 - Add styling for forum blockquote tag
 - Changes to deal with new GF layout
1.0.22 (2014-11-07)
 - Fix to handle changes in forum URL (localization added)
 - Add more fonts colours to the forum to distinguish between different types of usernames/links.
1.0.21 (2014-10-31)
 - Support for Opera now added. Dozen of browsers open causes confusion.
1.0.20 (2014-10-31)
 - Change table header "Fans" to "Score"
 - Slight changes to forum CSS
 - Support for Opera and Chrome added.
1.0.19 (2014-10-23)
 - Removed sign-out button as it has been added with today's site update
1.0.18 (2014-10-23)
 - Bug fix to accommodate new site changes to the URL syntax (localization added)
1.0.17 (2014-10-18)
 - Changed the framing of images to suite smaller images better
 - Credit link now points to my GF profile rather than OUJS
 - Added sign-out near the name
 - Bug fix: add script table only when need
1.0.16 (2014-09-29)
 - Got rid of the flashing timer
1.0.15 (2014-09-29)
 - Fixed the issue that 1.0.14 supposedly had fixed
 - Appreciation notice added
1.0.14 (2014-09-22)
 - Re-fixed profile table sort :?
1.0.13 (2014-09-19)
 - Fix in profile table sort
1.0.12 (2014-09-19)
 - Bug fix in sorting of lists with search. Not using global flag when matching regex
1.0.11 (2014-09-16)
 - Bug fix in search listing introduced in version 1.0.10
1.0.10 (2014-09-16)
 - Bug Fix: Daily installs sort order
 - Click on separator to toggle deleted script display
1.0.9 (2014-09-07)
 - Added new CSS  for <code> and <pre> elements
1.0.8 (2014-08-03)
 - Author name next to title
1.0.7 (2014-08-29)
 - Added GM_update
 - Added script numbers to table
1.0.6 (2014-08-21)
 - Bug Fix for sorting
1.0.5 (2014-08-21)
 - Small CSS fix provided by decembre (https://greasyfork.org/forum/discussion/comment/4182)
1.0.4 (2014-08-20)
 - Bug Fix: Author not being displayed
 - Bug Fix: Handle missing elements in user profile
1.0.3 (2014-08-20)
 - Link to my homepage
 - By default deleted scripts are hidden now
 - Stole some CSS from OUJS ^_^
 - Added a frame around images and max-width
 - Few small bug fixes
1.0.2 (2014-08-19)
 - Changes to CSS, including smaller font
 - Changed the interface
 - Added filter on user profile
 - Changed the behaviour of column click. If clicked it goes to first page as oppose to remaining on the same page
 - Increased number of scripts returned to 100
 - Citrified, orangified and crucified the forum. （￣﻿ _ゝ￣）
 - Small bug fixes
1.0.1 (2014-08-18)
 - Initial release. Released as good enough. May contain bugs but good for general usage.

**********************************************************************************************/

(function ()
{
    var scripts = new Array(),
        pathname = decodeURIComponent(document.location.pathname);

    OrangifyPage();
    if (pathname.match(/(\w|-)+\/forum\/(post|discussion)\//) && document.getElementById("Form_Rating"))
    {
        TSL.addStyle("", ".choiceButtons {text-align:center; width: 80px;}");

        var po = document.querySelector(".PostOptions, .CommentOptions"),
            lbl = po.querySelector("label"),
            options = po.querySelectorAll(".RadioLabel"),
            hld = document.createElement("div"),
            btn1 = document.createElement("input"),
            btn2 = document.createElement("input");

        btn1.className = btn2.className = "choiceButtons  Button";
        btn1.value = "Report bug"; btn1.style.marginRight = "4px";
        btn2.value = "Review";

        btn1.onclick = function ()
        {
            btn1.style.color = "#2DCD05";
            btn2.style.color = "";

            options[0].setAttribute("style", "margin-top: 5px !important;");
            options[4].removeAttribute("style");

            options[1].setAttribute("style", "display: none !important;"); //options[1].style.display = "none !important";
            options[2].setAttribute("style", "display: none !important;");
            options[3].setAttribute("style", "display: none !important;");
            lbl.setAttribute("style", "display: none !important;");

            options[0].click();
        }

        btn2.onclick = function ()
        {
            btn1.style.color = "";
            btn2.style.color = "#2DCD05";

            options[0].setAttribute("style", "display: none !important;");
            options[4].setAttribute("style", "display: none !important;");

            options[1].removeAttribute("style");
            options[2].removeAttribute("style");
            options[3].removeAttribute("style");
            lbl.removeAttribute("style");

            options[3].click();
        }

        hld.appendChild(btn1);
        hld.appendChild(btn2);
        po.insertBefore(hld, po.firstElementChild);
        btn1.click();
    }
    else if (pathname.match(/\/[\w-]+\/scripts\/\d+/)) //Script Page
    {
        TSL.addStyle("", "#script-content {background-color: #F9ECDB; margin: 0; padding-bottom: 5px;} #script-links > li:hover { background-color: yellow; } .current {background-color: #F9ECDB !important;}");
        TSL.addStyle("", ".install-link {background-color: #F7A207;} .install-help-link {background-color: #F9C565 !important;}");
        TSL.addStyle("", "#additional-info {border-radius: 5px; background-color: #F9DACD;} #additional-info > div {background-color: white;}");
        TSL.addStyle("", "header:first-child {background-color:white; padding: 5px 10px;}");

        var notice = document.createElement("div");
        notice.textContent = "Show your appreciation to the author by favouring the script and giving positive feedback";
        notice.setAttribute("style", "padding: 3px 10px; border-radius: 4px; background-color: yellow; text-align: center;");

        if (pathname.match(/\/scripts\/[^\/]+\/feedback/i))
        {
            el = document.querySelector("#script-content");
            if (el) el.insertBefore(notice, el.firstElementChild);

            el = document.querySelector(".inline-list");

            var count = el.querySelectorAll("li").length;

            el = document.getElementById("feedback-favoriters");
            el.innerHTML += " (<span style='color: #F00;'>" + count + "</span>)";
        }
        else
        {
            var el = document.querySelector("#install-area");
            if (el) el.appendChild(notice);
        }
    }
    else if (pathname.match(/\/[\w-]+\/scripts/)) //Script Listing
    {
        document.body.setAttribute("PageType", "ListingPage");
        getScripts();

        if (scripts.length > 0)
        {
            createScriptTable();
            populateScriptTable();


            if (document.getElementById("script-table"))
            {
                document.body.insertBefore(document.getElementById("script-table"), document.getElementById("main-header").nextElementSibling);

                //document.querySelector("#script-table tr td:nth-child(2)").appendChild(document.getElementById("UserSets"));

                TSL.addStyle("TheBlackLagoon", "#UserSets {position: fixed !important;display: inline-table !important;float: none !important;left: 30px !important;top: 68px!important;padding: 2px 5px;background-color: yellow;border-radius: 5px;z-index: 200!important;visibility: hidden!important;opacity: 1!important;}"
                           + "#UserSets:hover {visibility: visible!important;opacity: 1!important;}"
                           + '#UserSets:before {content: "Sets ▼ " !important;position: fixed !important;display: inline-block !important;left: 40px !important;top: 62px!important;margin: 2px 10px;padding: 1px 10px!important;background-color: yellow;border-radius: 5px;z-index: 200!important;visibility:visible!important;opacity: 1!important;}'
                           + "#UserSets li {position: relative !important;display: inline !important;float: left!important;clear: both!important;min-width: 200px!important;margin-bottom: 2px!important;padding: 2px 8px;background-color: white;border-radius: 2px; text-align:left;}"
                           );
            }

            selectSortOrder("ListingPage");

            TSL.removeNode("browse-script-list");
        }
    }
    else if (document.URL.match(/\/users\/(\w|-)+/)) //Authors Profile Page
    {
        var pageType = (document.getElementById("control-panel")) ? "PersonalProfile" : "UserProfile";
        document.body.setAttribute("PageType", pageType);

        getScripts();
        OrangifyUserPage();

        if (scripts.length > 0)
        {
            createScriptTable();
            populateScriptTable();

            selectSortOrder(pageType);
        }
    }

    /* Base CSS styling
    ---------------------------------------------------------------------------*/
    function OrangifyPage()
    {
        //#region Adding CSS Styles E3E2E2
        TSL.addStyle("CitrusGF_Main", "body {font-size: 14px;}"
                      + "#main-header, #Head {background-color: orange !important;} #Head a, #site-nav a {color: yellow !important;}"
                      + "#site-name {text-decoration: underline; color: white;}"
                      + "#title-image {height: 50px; border-radius: 20px; margin-left: 5px;}"
                      + "#title-text {font-size: 40px; color:black; font-family:'Open Sans',sans-serif; font-weight: 400; margin: 0 10px; line-height: 48px;}"
                      + "#title-subtext {color: yellow !important; font-size: 10px; text-decoration: none; position: absolute; left: 210px; top: 43px; font-weight: 400 !important;}"
                      + "#nav-user-info {top: 3px;}"
                      + "pre {background-color: #FFFF99; padding: 5px; margin-left: 30px; padding: 5px 10px;}"
                      + "code {padding: 2px 4px; font-size: 90%; color: #C7254E; background-color: #F9F2F4; white-space: nowrap; border-radius: 4px; font-family: Menlo,Monaco,Consolas,'Courier New',monospace;}"
                      + "pre > code {white-space: pre; background-color: transparent;}"
                      );

        TSL.addStyle("CitrusGF_ScriptPage", "#additional-info img {max-width: 98%; border: 1px solid orange; box-shadow: 5px 5px 2px #888888; margin: 5px 0; padding: 2px; color: yellow; }");

        if (document.location.pathname.match(/[\w-]+\/forum\//i))
        {
            TSL.addStyle("CitrusGF_Forum", "body:not(.Settings) a:not(.Button) { color: #F19E06; }"
                + "body a.Username { color: #E17205 !important; }"
                + ".QuoteAuthor a[href*='forum/profile/'] { color: #FB4507 !important;}"
                + "a[href*='forum/profile/'] { color: #25C614 !important; font-weight: 600;}"
                + "code {padding: 1px 3px; border-radius: 3px; border: 1px solid; background-color: #F9EBD2; color: #EB5100; margin: 0;}"
                + "#title-subtext {top: 45px;}"
                + "blockquote {background-color: #FFFFA4; margin: 5px 0px 5px 30px; padding: 5px;}"
                );
        }
        //#endregion

        var sname = document.getElementById("site-name");
        sname.innerHTML = "";

        var link = document.createElement("a");
        link.href = "/";
        link.innerHTML = '<img id="title-image" src="https://i.imgur.com/RqikjW1.jpg" />'
                        + '<span id="title-text">Greasy Fork&nbsp;</span>'
                        + '<a id="title-subtext" href="/users/1455-timidscript">100% Citrusy Goodness by <b>TimidScript</b></span>';
        sname.appendChild(link);


        if (pathname.match(/\/[\w-]+\/scripts/) && document.querySelector("#script-list-set ul")) //Script Listing
        {
            TSL.addStyle("TheBlackLagoon", "#UserSets {display: block; background-color: yellow; margin: 2px 10px; border-radius: 5px; padding: 2px 10px;}"
                + "#UserSets li {display: inline-block; padding: 2px 8px; background-color: white; border-radius: 2px;}"
                + "#UserSets li + li {margin-left: 1px}"
                );

            var sets = document.querySelector("#script-list-set ul");
            var mh = document.getElementById("main-header");
            sets.id = "UserSets";
            document.body.insertBefore(sets, document.getElementById("main-header").nextElementSibling);
        }

        TSL.removeNode("script-list-option-groups");
    }

    function disco(i)
    {
        notice.style.backgroundColor = (i % 2) ? "transparent" : "yellow";
        if (i < 18) setTimeout(disco, 500, ++i);
    }

    /* Styling for user page
    ---------------------------------------------------------------------------*/
    function OrangifyUserPage()
    {
        TSL.addStyle("CitrusGF_Shared", ".white-panel, #control-panel, #user-profile, #user-discussions-on-scripts-written {margin: 5px; border-radius: 8px; padding: 10px; }");
        TSL.addStyle("CitrusGF_Profile", ".white-panel, #user-discussions-on-scripts-written, #control-panel, #user-profile {background-color: white; }");
        TSL.addStyle("", "#user-control-panel, #control-panel h3 {margin: 0; padding: 0;}  #user-control-panel > li { display: inline-block; margin: 0 5px; padding: 2px 5px; border-radius: 5px; background-color: #F5F2F2; border: 1px solid #404040; box-shadow: 3px 3px 2px #888888;} #user-control-panel a {text-decoration: none;} #user-control-panel li:hover {background-color: #FBEACA;}");
        TSL.addStyle("", ".white-panel *, #user-discussions-on-scripts-written * {margin: 0;}");
        TSL.addStyle("CitrusGF_OUJS", 'code {padding: 2px 4px;font-size: 90%;color: #C7254E;background-color: #F9F2F4;white-space: nowrap;border-radius: 4px;font-family: Menlo,Monaco,Consolas,"Courier New",monospace; }');


        var author = document.createElement("h1");
        var name = document.getElementsByTagName("h2")[0];

        var up = document.getElementById("user-profile");
        if (!up)
        {
            up = document.createElement("section");
            up.id = "user-profile";
            up.textContent = "...";
            name.parentElement.insertBefore(up, name);
        }

        up.innerHTML = "<h1 style='margin: 0 0 5px 0; color: orange;'>" + name.textContent + "'s Profile</h1>" + up.innerHTML;
        TSL.removeNode(name);

        var el = document.getElementById("user-script-sets");
        if (el) el.parentElement.className = "white-panel";

        el = document.getElementById("user-script-list");
        if (el) TSL.removeNode(el.parentElement);

        el = document.getElementById("user-deleted-script-list");
        if (el) TSL.removeNode(el.parentElement);
    }


    /* Gets the scripts from document
    ---------------------------------------------------------------------------*/
    function getScripts(doc)
    {
        if (!doc) doc = document;
        var ids = ["user-script-list", "user-deleted-script-list", "browse-script-list"];
        scripts = new Array();

        for (var i = 0; i < ids.length; i++)
        {
            var el = doc.getElementById(ids[i]);
            if (!el) continue;

            var deleted = ids[i].indexOf("deleted") > 0;
            var list = el.children;
            for (var j = 0; j < list.length; j++)
            {
                var li = list[j];
                var script = new Object();
                script.name = li.getAttribute("data-script-name");
                script.id = li.getAttribute("data-script-id");
                script.author = li.getAttribute("data-script-author-name");
                script.authorID = li.getAttribute("data-script-author-id");
                script.description = li.getElementsByClassName("description")[0].textContent.trim();
                script.rating = li.getAttribute("data-script-rating-score");
                script.ratings = li.querySelector("dd.script-list-ratings").innerHTML;
                script.installsDaily = li.getAttribute("data-script-daily-installs");
                script.installsTotal = li.getAttribute("data-script-total-installs");
                script.dateCreated = li.getAttribute("data-script-created-date");
                script.dateUpdated = li.getAttribute("data-script-updated-date");
                script.type = li.getAttribute("data-script-type");
                script.deleted = deleted;
                scripts.push(script);
            }
        }
    }


    /* Creates scripts table
    ---------------------------------------------------------------------------*/
    function createScriptTable()
    {
        var scriptTable = document.createElement("table");
        scriptTable.id = "script-table";
        var thead = scriptTable.createTHead();
        var row = thead.insertRow(-1);

        var headers = ["Name", "Ratings", "Daily", "Total", "Created", "Updated"];
        var tags = ["name", "ratings", "", "total_installs", "created", "updated"];

        cell = row.insertCell(-1);
        cell.textContent = "#";

        var cell;
        for (var i = 0; i < headers.length; i++)
        {
            cell = row.insertCell(-1);
            cell.innerHTML = headers[i];
            cell.onclick = onTableHeaderClick;
            cell.setAttribute("tag", tags[i]);
        }

        cell = row.cells[1];
        switch (document.body.getAttribute("PageType"))
        {
            case "PersonalProfile":
                cell.innerHTML += '<span class="filterL" style="margin-left: 10px;" title="Library Filter">L</span>'
                                + '<span class="filterU" title="Unlisted Filter">U</span>'
                                + '<span class="filterD" title="Deleted Filter">D</span>';
                break;
            case "UserProfile":
                cell.innerHTML += '<span class="filterL" style="margin-left: 10px;">L</span>';
                break;
            default:
                break;
        }

        var btns = cell.getElementsByTagName("span");
        for (var i = 0; i < btns.length; i++) btns[i].onclick = onFilterClick;

        //scriptTable.createTBody();
        scriptTable.appendChild(document.createElement("tbody"));
        document.body.appendChild(scriptTable);

        TSL.addStyle("CitrusGS_Table", "#script-table {display: block; margin: 0 5px 5px 5px;} body {background-color: #EFEFB1; margin: 0;}"
            + "#script-table thead td {background-color: orange; border-radius: 0 0 5px 5px; box-shadow: 3px 3px 2px #888888;}"
            + "#script-table thead td:hover {cursor:pointer; background-color: yellow;}"
            + "#script-table thead td:first-child:hover {cursor:default; background-color: orange;}"
            + "#script-table td {width: auto; padding: 2px 5px; text-align:center;}"
            + "#script-table thead tr td:nth-child(3) {width: 120px; display: block;}"
            //+ ".total-rating-count {display: inline-block; min-width: 1em; text-align: center; padding: 0px 0.25em; border-radius: 10px;}"
            + ".total-rating-count, .good-rating-count, .ok-rating-count, .bad-rating-count {display: inline-block; min-width: 1em; padding: 1px 3px; border-radius: 3px;}"
            + ".total-rating-count {background-color: rgba(0, 0, 255, 0.1);}"
            + "#script-table tbody td {background-color: #FFFBDB;}"
            + "#script-table tbody td:first-child{background-color: #F9D5A6;}"
            + "#script-table tbody td:nth-child(2){width: 99%; background-color: white;text-align:left;}"
            + "#script-table tbody tr:hover td {background-color: yellow;}"
            + ".currentSort {background-color: yellow !important;}"
            + ".loadingSort {background-color: #FDFDC3 !important;}"
            + ".type-library, .type-unlisted, .type-deleted, .filterL, .filterD, .filterU {font-size:smaller; display: inline-block; border-radius: 3px; padding: 0 5px; border: 1px solid black;}"
            + ".type-library, .type-unlisted, .type-deleted {box-shadow: 2px 2px 1px #888888; margin: 2px 5px 3px 0;}"
            + ".type-library, .filterL {background-color: #CEFD8A;}"
            + ".type-deleted, .filterD {background-color: #F77A7A;}"
            + ".type-unlisted, .filterU {background-color: #CEE7F3;}"
            + ".type-library:before {content: 'Library';}"
            + ".type-deleted:before {content: 'Deleted';}"
            + ".type-unlisted:before {content: 'Unlisted';}"
            + ".filterL, .filterD, .filterU {float: left; margin: 2px 3px 0 0; padding: 0 15px;}"
            + ".filterL:hover, .filterD:hover, .filterU:hover {cursor: default;}"
            + "#notice {margin:5px 5px 0 5px; background-color: #FDBB45;padding: 3px 5px; color: blue;}"
            + "#notice .filterD { background-color: #C0BEBE; float: none; color: black;}"
            + "thetitle {margin-bottom: 3px;} .theauthor{font-size:small;}"
        );
    }

    /* Populate the table with scripts
    ---------------------------------------------------------------------------*/
    function populateScriptTable(clear)
    {
        TSL.addStyle("Al28dj21", ".thetitle a {margin-right: 2px !important;}");
        TSL.addStyle("Al28dj23", ".theversion {font-size: xsmall; margin-right: 4px;}");
        TSL.addStyle("Al28dj24", ".scriptL td:nth-child(2) {background-color: #DFF9C6 !important;}");
        TSL.addStyle("Al28dj26", "tr[depreciated='true'] td:nth-child(2) {background-color: #FBEDE1 !important;}");
        TSL.addStyle("Al28dj27", ".scriptD td:nth-child(2) {background-color: #F9E8E8 !important;}");

        var tbody = document.getElementById("script-table").getElementsByTagName("tbody")[0];
        if (clear) tbody.innerHTML = "";

        if (scripts.length == 0)
        {
            var row = tbody.insertRow(-1);
            cell = row.insertCell(-1);
            cell.setAttribute("style", "text-align:center; font-weight: bold; font-style: oblique;");
            cell.textContent = "No Scripts"
            cell.setAttribute("colspan", 7);
        }

        var separator = false;

        var offset = 1;
        var prefix = "";
        if (scripts.length > 0)
        {
            var page = document.URL.match(/[&\?]page=(\d+)/);
            if (page) page = page[1]; else page = 1;
            offset = 1 + +((page - 1) * 100);
            var maxnum = scripts.length + offset;
            prefix = prefix.lPad("0", maxnum.toString().length);
        }


        for (var i = 0; i < scripts.length; i++)
        {
            var script = getScriptHTML(i);
            if (script.deleted && !separator)
            {
                TSL.addStyle("", "#ToggleDisplayClick {border: 1px solid; background-color: #FBDDD2 !important; color: orangered; cursor: pointer; height: 15px; font-weight: 600;}");
                separator = true;
                row = tbody.insertRow(-1);
                cell = row.insertCell(-1);
                cell.id = "ToggleDisplayClick";
                cell.setAttribute("colspan", 7);
                cell.textContent = "Click to toggle deleted scripts display";
                cell.onclick = function (e) { document.querySelector("#script-table span.filterD").click(); };
            }

            row = tbody.insertRow(-1);
            row.id = "s" + script.id;
            cell = row.insertCell(-1);

            var num = i + offset;
            cell.textContent = (prefix + num).slice((-1 * prefix.length));

            cell = row.insertCell(-1);
            var el = document.createElement("div");
            el.className = "thetitle";
            el.innerHTML = "<a href='https://greasyfork.org/scripts/"
                            + script.id + "' style='margin-right: 10px;'><b>" + script.name + "</b></a>";
            if (script.type == "library")
            {
                el.innerHTML += '<span class="type-library" />';
                row.className += "scriptL ";
                row.setAttribute("library", "true");
            }
            else if (script.type == "unlisted")
            {
                el.innerHTML += '<span class="type-unlisted" />';
                row.className += "scriptU ";
                row.setAttribute("unlisted", "true");
            }
            if (script.deleted)
            {
                el.innerHTML += '<span class="type-deleted" />';
                row.className += "scriptD ";
                row.setAttribute("deleted", "true");
            }
            if (document.body.getAttribute("PageType") == "ListingPage")
            {
                el.innerHTML += '<span class="theauthor"><span>by </span><a href="https://greasyfork.org/users/' + script.authorID + '">' + script.author + '</a></span>';
            }
            cell.appendChild(el);



            el = document.createElement("div");
            el.textContent = script.description;
            cell.appendChild(el);
            cell = row.insertCell(-1);
            cell.innerHTML = script.ratings + '<span class="total-rating-count">' + script.rating + '</span>';
            cell.title = "Favoured plus Good Feedback, OK Feedback, Bad Feedback, Total Score (" + script.rating + ")";
            row.insertCell(-1).textContent = script.installsDaily;
            row.insertCell(-1).textContent = script.installsTotal;
            row.insertCell(-1).textContent = script.dateCreated;
            row.insertCell(-1).textContent = script.dateUpdated;
        }

        filterTable();

        function getScriptHTML(idx)
        {
            var properties = "name id author authorID description rating ratings installsDaily installsTotal dateCreated dateUpdated type deleted";
            return makeStruct(properties, scripts[idx]);
        }
    }


    /* Apply Table filter
    ---------------------------------------------------------------------------*/
    function filterTable()
    {
        var css = "";
        var btns = document.querySelectorAll("#script-table thead td span");
        for (var i = 0; i < btns.length; i++)
            if (btns[i].style.backgroundColor) css += btns[i].className.replace("filter", ".script") + ", ";

        if (css) TSL.addStyle("ScriptFilter", css.replace(/,\s$/, "") + "{display: none;}");
    }

    /*  Filter the script table
    ---------------------------------------------------------------------------*/
    function onFilterClick(e)
    {
        TSL.removeNode("ScriptFilter");
        e.stopImmediatePropagation();
        this.style.backgroundColor = (this.style.backgroundColor) ? null : "#C0BEBE";
        filterTable();
    }



    /*  Filter the script table
    ---------------------------------------------------------------------------*/
    function selectSortOrder(pageType)
    {
        var tag = GM_getValue(pageType, "updated");
        var m = document.URL.match(/[\?&]sort=(\w+)/);
        m = (m) ? m[1] : "";

        if (m != tag || (document.URL.indexOf("per_page=100") < 0)) document.querySelector(("td[tag='" + tag + "']")).click();
        else
        {
            document.querySelector(("td[tag='" + tag + "']")).setAttribute("class", "currentSort");
            getScriptVersionNumbers();
        }
    }

    /*  Table header is clicked, get the correct script sorting
    ---------------------------------------------------------------------------*/
    function onTableHeaderClick(e)
    {
        if (this.className || this.parentElement.getAttribute("busy")) return;
        this.parentElement.setAttribute("busy", true);
        this.className = "loadingSort";

        getScriptListing(this.getAttribute("tag"));
    }



    /*   Get script page
    ---------------------------------------------------------------------------*/
    function getScriptListing(tag)
    {
        var isListingPage = (document.body.getAttribute("PageType") == "ListingPage");

        if (isListingPage) url = document.URL.match(/https:\/\/greasyfork.org\/[\w-]+\/scripts(\/by-site\/[\w\.\-_]+|\/search)?/)[0] + "?per_page=100";
        else url = document.URL.replace(/\?.+/, "?");

        var m = document.URL.match(/[^=\?&]+=[^&]+/g);
        if (m)
            for (var i = 0; i < m.length; i++)
            {
                //if (!m[i].match(/^(per_page|sort)/) && !(firstPage && m[i].match(/^page/))) url += "&" + m[i];
                if (!m[i].match(/^(per_page|sort)/)) url += "&" + m[i];
            }

        if (tag) url += "&sort=" + tag;

        url = url.replace(/\?&/, "?");
        url = url.replace(/\?$/, "");
        if (url.indexOf("?") < 0) url = url.replace("&", "?");

        console.warn("getScriptListing IN: " + url)
        GM_xmlhttpRequest({
            url: url,
            method: "GET",
            timeout: 15000,
            headers: {
                "User-agent": navigator.userAgent,
                "Host": "greasyfork.org",
                "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
                "Accept-Language": "en-US,en;q=0.5"
            },
            onload: function (xhr)
            {
                if (xhr.status == 200)
                {
                    var header = document.querySelector(("td[tag='" + tag + "']"));
                    GM_setValue(document.body.getAttribute("PageType"), tag);

                    //Highlight right column header
                    var els = document.querySelectorAll("#script-table thead td");
                    for (var i = 0; i < els.length; i++) els[i].removeAttribute("class");

                    header.className = "currentSort";

                    //stackoverflow.com/questions/19193335/change-the-url-in-browser-bar-without-reloading-page
                    window.history.pushState(null, "", xhr.finalUrl); //Change document URL

                    scripts = new Array();
                    //var doc = new DOMParser().parseFromString(xhr.responseText, 'text/xml');

                    var doc = document.implementation.createHTMLDocument('MPIV');
                    doc.documentElement.innerHTML = xhr.responseText;

                    TSL.removeNode(document.getElementsByClassName("pagination")[0]);

                    var pager = doc.getElementsByClassName("pagination")[0];

                    if (pager)
                    {
                        document.body.insertBefore(pager, document.getElementById("script-table").nextElementSibling);
                    }

                    getScripts(doc);
                    populateScriptTable(true);
                    getScriptVersionNumbers();
                }

                header.parentElement.removeAttribute("busy");
                console.warn("getScriptListing OUT: " + url);
            }
        });
    }

    function getScriptVersionNumbers()
    {
        var jsonURL = document.URL.replace(/(\?|$)/, ".json$1");
        console.log("JSON: " + jsonURL);

        //Get version number
        GM_xmlhttpRequest({
            url: jsonURL,
            method: "GET",
            timeout: 15000,
            headers: {
                "User-agent": navigator.userAgent,
                "Host": "greasyfork.org",
                "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
                "Accept-Language": "en-US,en;q=0.5"
            },
            onload: function (xhr)
            {
                if (xhr.status == 200)
                {
                    var scripts = JSON.parse(xhr.responseText);
                    if (!Array.isArray(scripts)) scripts = scripts.scripts;
                    for (var i = 0; i < scripts.length; i++)
                    {
                        var script = scripts[i];
                        var el = document.querySelector("#s" + script.id + " .thetitle");
                        if (el)
                        {
                            var s = document.createElement("span");
                            s.className = "theversion";
                            s.innerHTML = "(<strong>" + script.version + "</strong>)";
                            if (script.version.match(/defunct|depreciated|obselete/i))
                                el.parentElement.parentElement.setAttribute("depreciated", "true");
                            el.insertBefore(s, el.firstElementChild.nextElementSibling);
                        }
                    }

                    sortScripts();
                }
            }
        });

        function sortScripts()
        {
            if (document.body.getAttribute("PageType") == "ListingPage") return;

            var els = document.querySelectorAll('tr[depreciated = "true"]');
            if (!els) return;

            var before = document.getElementById("ToggleDisplayClick");
            if (before) before = before.parentElement;

            var tbody = document.getElementById("script-table").getElementsByTagName("tbody")[0];

            document.createAttribute

            TSL.addStyle("", "#Depreciated{border: 1px solid; background-color: #FBC783 !important; color: orangered; height: 15px; font-weight: 600;}");
            var row = tbody.insertRow(-1),
                cell = row.insertCell(-1);

            cell.id = "Depreciated";
            cell.setAttribute("colspan", 7);
            cell.textContent = "Depreciated Scripts: No longer supported but on last update they were functioning";
            tbody.insertBefore(row, before);

            for (var i = 0; i < els.length; i++)
            {
                if (!TSL.hasClass(els[i], "scriptD")) tbody.insertBefore(els[i], before);
            }

            //Renumber the scripts
            els = tbody.querySelectorAll('tr[id^="s"] td:first-child');
            for (var i = 0; i < els.length; i++)
            {
                els[i].textContent = (i + 1).toString().lPad("0", els.length.toString().length);
            }
        }
    }

    function getScriptJSON(obj)
    {
        var properties = "bad_ratings code_updated_at code_url contribution_amount contribution_url created_at daily_installs description fan_score good_ratings id license locale name namespace ok_ratings redistributable support_url total_installs url version";
        return makeStruct(properties, obj);
    }

    function makeStruct(keys, obj)
    {
        if (!obj) obj = {};

        var names = keys.split(" ").sort();
        for (var i = 0; i < names.length; i++)
        {
            obj[names[i]] = obj[names[i]];
        }

        return obj;
    }
})();
