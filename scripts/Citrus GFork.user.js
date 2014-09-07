// ==UserScript==
// @name            [TS] Citrus GFork 
// @namespace       TimidScript
// @version         1.0.9
// @description     Advance table view for Greasy Fork. Fixes display bugs. 100 scripts display at a time, remembers last sort order used on Script Listing, "My" Profile Listing, and third Party Listing. Able to distinguish between, Library, Unlisted and Deleted scripts using text icons.
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
1.0.8 (2014-09-07)
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
    OrangifyPage();

    var scripts = new Array();

    if (document.URL.match(/greasyfork\.org\/scripts\/\d+/)) //Script Page
    {
        TSL.addStyle("", "#script-content {background-color: #F9ECDB; margin: 0; padding-bottom: 5px;} #script-links > li:hover { background-color: yellow; } .current {background-color: #F9ECDB !important;}");
        TSL.addStyle("", ".install-link {background-color: #F7A207;} .install-help-link {background-color: #F9C565 !important;}");
        TSL.addStyle("", "#additional-info {border-radius: 5px;} #additional-info > div {background-color: white;");
        TSL.addStyle("", "header:first-child {background-color:white; padding: 5px 10px;}");
    }
    else if (document.URL.match(/greasyfork\.org\/scripts/)) //Script Listing
    {
        document.body.setAttribute("PageType", "ListingPage");
        getScripts();        
        createScriptTable();
        populateScriptTable();
        
        document.body.insertBefore(document.getElementById("script-table"), document.getElementById("main-header").nextElementSibling);

        selectSortOrder("ListingPage");

        TSL.removeNode("browse-script-list");
    }
    else if (document.URL.match(/\/users\/(\w|-)+/)) //Authors Profile Page
    {
        var pageType = (document.getElementById("control-panel")) ? "PersonalProfile" : "UserProfile";
        document.body.setAttribute("PageType", pageType);

        getScripts();
        OrangifyUserPage();
        createScriptTable();
        populateScriptTable();

        selectSortOrder(pageType);
    }



    /* Base CSS styling
    ---------------------------------------------------------------------------*/
    function OrangifyPage()
    {        
        if (document.URL.indexOf("greasyfork.org/forum/") > 0)
        {
            TSL.addStyle("CitrusGF_Forum", "body:not(.Settings) a:not(.Button) { color: #F19E06; }"
                    + "body:not(.Settings) #Head {background-color: orange;}"
                    + "body:not(.Settings) .SiteTitle, #Head .SiteTitle a {color: black; font-size: 50px;}"
                    + ".SiteTitle img {height: 60px; border-radius: 20px; margin-top: -10px;}"
                    + "#Head a {color: yellow;}"
                    + ".SiteMenu {margin-left: 220px !important;}"
                    + "#TS-Link {position: absolute; transform: rotate(-90deg); font-size:10px; top: 25px; color: yellow; font-weight: 700;}"
                    + "#Head .SiteSearch { float: right; margin-top: -25px !important; }"        
                );
            var img = document.querySelector(".SiteTitle img");
            img.src = "https://i.imgur.com/RqikjW1.jpg";
            var ts = document.createElement("a");
            ts.href = "https://openuserjs.org/users/TimidScript";
            ts.id = "TS-Link";
            ts.textContent = "TimidScript";
            document.body.appendChild(ts);
        }
        else
        {
            //#region Adding CSS Styles E3E2E2
            TSL.addStyle("CitrusGF_Main", "body {font-size: 14px;}"
                          + "#main-header {background-color: orange;} #site-nav a {color: yellow !important;}"
                          + "#title-image {height: 50px; border-radius: 20px; margin-left: 5px;}"
                          + "#title-text {font-size: 40px; color:black; font-family:'Open Sans',sans-serif; margin: 0 10px;}"
                          + "#title-subtext {color: yellow !important; font-size: 10px; text-decoration: none; position: absolute; left: 210px; top: 60px;}"
                          + "#nav-user-info {top: 3px;}"
                          + "pre {background-color: #E9E8E5; padding: 5px; margin-left: 30px; padding: 5px 10px;}"
                          + "code {padding: 2px 4px; font-size: 90%; color: #C7254E; background-color: #F9F2F4; white-space: nowrap; border-radius: 4px; font-family: Menlo,Monaco,Consolas,'Courier New',monospace;}"
                          );

            TSL.addStyle("CitrusGF_ScriptPage", "#additional-info img {max-width: 98%; border: 6px ridge #DF0404; box-shadow: 5px 5px 2px #888888; margin-bottom: 5px;}");
            //#endregion

            var sname = document.getElementById("site-name");
            sname.innerHTML = "";
            
            var link = document.createElement("a");
            link.href = "/";
            link.innerHTML = '<img id="title-image" src="https://i.imgur.com/RqikjW1.jpg" />'
                            + '<span id="title-text">Greasy Fork&nbsp;</span>'
                            + '<a id="title-subtext" href="https://openuserjs.org/users/TimidScript">100% Citrusy Goodness by <b>TimidScript</b></span>';
            sname.appendChild(link);

            TSL.removeNode("script-list-option-groups");            
        }
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
                script.fans = li.getAttribute("data-script-fan-score");
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

        var headers = ["Name", "Fans", "Daily", "Total", "Created", "Updated"];
        var tags = ["name", "fans", "", "total_installs", "created", "updated"];

        cell = row.insertCell();
        cell.textContent = "#";

        var cell;
        for (var i = 0; i < headers.length; i++)
        {
            cell = row.insertCell();
            cell.innerHTML = headers[i];
            cell.onclick = onTableHeaderClick;
            cell.setAttribute("tag", tags[i]);
        }

        cell = row.cells[1];
        switch (document.body.getAttribute("PageType"))
        {
            case "PersonalProfile":
                cell.innerHTML += '<span class="filterL" style="margin-left: 10px;">L</span>'
                                + '<span class="filterU">U</span>'
                                + '<span class="filterD">D</span>';
                break;
            case "UserProfile":
                cell.innerHTML += '<span class="filterL" style="margin-left: 10px;">L</span>';
                break;
            default:
                break;
        }

        var btns = cell.getElementsByTagName("span");
        for (var i = 0; i < btns.length; i++) btns[i].onclick = onFilterClick;

        scriptTable.createTBody();
        document.body.appendChild(scriptTable);

        TSL.addStyle("CitrusGS_Table", "#script-table {display: block; margin: 0 5px 5px 5px;} body {background-color: #EFEFB1; margin: 0;}"
            + "#script-table thead td {background-color: orange; border-radius: 0 0 5px 5px; box-shadow: 3px 3px 2px #888888;}"
            + "#script-table thead td:hover {cursor:pointer; background-color: yellow;}"
            + "#script-table thead td:first-child:hover {cursor:default; background-color: orange;}"
            + "#script-table td {width: auto; padding: 2px 5px; text-align:center;}"                        
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

        if (document.body.getAttribute("PageType") == "PersonalProfile")
        {
            var notice = document.createElement("div");
            notice.id = "notice";            
            notice.innerHTML = 'By default deleted scripts are hidden now. Click on <span class="filterD">D</span> to view them. Can be disabled by adding <code>GM_setValue("DisplayDeleted",true)</code> to the script.';
            document.body.insertBefore(notice, scriptTable);

            //GM_setValue("DisplayDeleted", false);            
            if (!GM_getValue("DisplayDeleted")) document.querySelector("#script-table thead .filterD").click();
        }        
    }

    /* Populate the table with scripts
    ---------------------------------------------------------------------------*/
    function populateScriptTable(clear)
    {
        var tbody = document.getElementById("script-table").getElementsByTagName("tbody")[0];
        if (clear) tbody.innerHTML = "";

        if (scripts.length == 0)
        {
            var row = tbody.insertRow(-1);
            cell = row.insertCell();
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
            var script = scripts[i];
            if (script.deleted && !separator)
            {
                separator = true;
                row = tbody.insertRow(-1);
                cell = row.insertCell();
                cell.setAttribute("colspan", 7);
                cell.setAttribute("style", "background-color: orangered; height: 10px;");
            }

            row = tbody.insertRow(-1);
            row.className = "";
            cell = row.insertCell();
                                   
            var num = i + offset;                                                            
            cell.textContent = (prefix + num).slice((-1 * prefix.length));
            
            
            cell = row.insertCell();
            var el = document.createElement("div");
            el.className = "thetitle"
            el.innerHTML = "<a href='https://greasyfork.org/scripts/"
                            + script.id + "' style='margin-right: 10px;'><b>" + script.name + "</b></a>";
            if (script.type == "library")
            {
                el.innerHTML += '<span class="type-library" />';
                row.className += "scriptL ";
            }
            else if (script.type == "unlisted")
            {
                el.innerHTML += '<span class="type-unlisted" />';
                row.className += "scriptU ";
            }
            if (script.deleted)
            {
                el.innerHTML += '<span class="type-deleted" />';
                row.className += "scriptD ";
            }
            if (document.body.getAttribute("PageType") == "ListingPage")
            {                 
                el.innerHTML += '<span class="theauthor"><span>by </span><a href="https://greasyfork.org/users/' + script.authorID + '">' + script.author + '</a></span>';
                
            }
            cell.appendChild(el);
            
            

            el = document.createElement("div");
            el.textContent = script.description;
            cell.appendChild(el);

            row.insertCell().textContent = script.fans;
            row.insertCell().textContent = script.installsDaily;
            row.insertCell().textContent = script.installsTotal;
            row.insertCell().textContent = script.dateCreated;
            row.insertCell().textContent = script.dateUpdated;
        }

        filterTable();
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
        else document.querySelector(("td[tag='" + tag + "']")).setAttribute("class", "currentSort");
    }



    /*  Table header is clicked, get the correct script sorting
    ---------------------------------------------------------------------------*/
    function onTableHeaderClick(e)
    {
        if (this.className || this.parentElement.getAttribute("busy")) return;
        this.parentElement.setAttribute("busy", true);
        this.className = "loadingSort";        

        getScriptListing(this.getAttribute("tag"), true);
    }



    /*   Get script page 
    ---------------------------------------------------------------------------*/
    function getScriptListing(tag, firstPage)
    {
        var isListingPage = (document.body.getAttribute("PageType") == "ListingPage")
          
        if (isListingPage) url = document.URL.match(/https:\/\/greasyfork.org\/scripts(\/search)?/)[0] + "?per_page=100";
        else url = document.URL;

        var m = document.URL.match("[^=\?&]+=[^&]+");
        if (m)
            for (var i = 0; i < m.length; i++)
            {
                if (!m[i].match(/^(per_page|sort)/) && !(firstPage && m[i].match(/^page/))) url += "&" + m[i];
            }


        if (tag) url += ((url.indexOf("?") > 0) ? "&" : "?") + "sort=" + tag;

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

                    var dt = document.implementation.createDocumentType("html", "-//W3C//DTD HTML 4.01 Transitional//EN", "http://www.w3.org/TR/html4/loose.dtd"),
                    doc = document.implementation.createDocument("", "", dt),
                    documentElement = doc.createElement("html");
                    documentElement.innerHTML = xhr.responseText;
                    doc.appendChild(documentElement);

                    TSL.removeNode(document.getElementsByClassName("pagination")[0]);

                    var pager = doc.getElementsByClassName("pagination")[0];

                    if (pager)
                    {
                        document.body.insertBefore(pager, document.getElementById("script-table").nextElementSibling);
                    }

                    getScripts(doc);
                    populateScriptTable(true);
                }

                header.parentElement.removeAttribute("busy");
                console.log("getScriptListing OUT: " + url)

            }
        })();
    }
})();
