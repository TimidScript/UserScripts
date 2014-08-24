// ==UserScript==
// @name                    [TS] Direct Outgoing Links
// @namespace               TimidScript
// @version                 2.0.14 DEFUNCT
// @description             **Depreciated** Removes outgoing links tracking/redirection parts/open-in-new-tab. Depreciated: Use "Linx Amender" instead.
// @icon                    https://i.imgur.com/aqb4avb.png
// @author                  TimidScript
// @homepageURL             https://openuserjs.org/users/TimidScript
// @copyright               © 2014 TimidScript, All Rights Reserved.
// @license                 Creative Commons BY-NC-SA + Please notify me if distributing
// @include                 *
// @grant                   GM_setClipboard
// @grant                   GM_registerMenuCommand
// @grant                   GM_getValue
// @grant                   GM_setValue
// ==/UserScript==


/*
********************************************************************************************
Copyright © 2014 TimidScript, All Rights Reserved.
Script's Homepage:              Check homepages below

TimidScript's Homepage:         https://openuserjs.org/users/TimidScript
				https://greasyfork.org/users/1455-timidscript
                                https://monkeyguts.com/author.php?un=timidscript
                                

                                http://userscripts.org/users/TimidScript
                                http://userscripts-mirror.org/users/100610/scripts
                                
Initial release date: Feb 5, 2013 19:17
------------------------------------
 Version History
------------------------------------
2.0.14 DEFUNCT (2014-08-19)
 - Linked to new homepage
2.0.13 DEFUNCT (2014-08-03)
 - Added export functionality support for "Linx Amender"   
2.0.12 (2014-01-27)
 - deviantart URL changed to: ^http://.+\.deviantart\.com
 - deviantArt deviant button now opens direct. Recommend using 
 "deviantArt link Button" (http://userscripts.org/scripts/show/179414)
2.0.11a
 - Major bug fix in infinite loop. Not a perfect fix but good enough for now.
 - Check if href is not null and longer than 1 character long.
2.0.10a
 - dataRules array bug not being reset 
 - Went back to version 2.0.8 when checking for truncators
 - Major fixes
2.0.9
 - Major bug fixes and code optimisation
2.0.8
 - Cleaned up header and script comments
 - Loads saved data every time settings window is shown
 - Bug fix: Enable/Disable button not show correctly 
2.0.7
 - Removed debug console.log
2.0.6
 - Set Window Icon. I commented it in version 2.0.5 by accident
 - Bug Fix: OnClickLight Enable / Disable rule.
 - Changed the way attribute value is checked. If attribute value
  start matches it removes attribute.    
2.0.5 (23/02/2013)
 - Can only have one edit form at a time now
 - Bug Fix: Unable to edit due to drag and drop bug fixed
2.0.4 (23/02/2013)
 - Removed bug with Google rule. You need to remove old 
 Google rule.
 - Added event listener to monitor page changes.    
2.0.3 (22/02/2013)
 - Small update
2.0.2 (12/02/2013)
 - Removed arrows. Added row drag and drop functionality.
 - Still in development. Not everything is implemented and slightly flakey
 - Code is a mess
2.0.1 (10/02/2013)
 - Initial release of new version
 - Still in development. Not everything is implemented and slightly flakey
 - Ability to add your own rules through GM command menu
1.0.2
 - Global variable m_RefreshIntervalCount. 10 Seconds of link checking
 - Fixed function name bug. Renamed before uploading and forgot to make change.
1.0.1
 - Initial Release 
*************************************************************/

GM_registerMenuCommand("[TS] Direct Outgoing Links Settings", ShowSettings);

var iDoc = document;
var RowData = makeStruct("title url truncators attributes sampleURL override enabled");
var dataRules = new Array();

LoadSavedData();
//var m_RefreshIntervalCount = 6; //Countdown of link checking; 10 = 5 Second Countdown
//var m_RefreshIntervalID = setInterval(function () { ParseLinks(); }, 500);  //Dynamic HTML
ParseLinks();

document.addEventListener("DOMNodeInserted", ParseLinks, false)
tableDnD = new TableDnD();
function LoadSavedData()
{
    var d = GM_getValue("Data", null);

    dataRules = new Array();
    if (d) dataRules = JSON.parse(d);
}

function checkURL(expression)
{
    var re = RegExp(expression, "i");
    return (re.exec(document.URL) == null) ? false : true;
}


function CleanseOutgoingLinks(links, data)
{
    //console.info(data.title + " | " + links.length);        
    //console.log(data.title);
    //console.info("Filter found: " + data.title);
    data.attributes = data.attributes.trim();
    data.truncators = data.truncators.trim();
    //console.log("Attributes: " + data.attributes);
    //console.log("Truncators: " + data.truncators);

    for (i = 0; i < links.length; i++)
    {
        link = links[i];
        if (link.getAttribute("LinkParsed") == null)
        {
            if (data.override) link.setAttribute("LinkParsed", true);

            if (data.attributes.length > 0)
            {
                var attribs = data.attributes.split(";");
                //console.log(attribs.length);

                for (var j = 0; j < attribs.length; j++)
                {
                    if (attribs[j].trim().length > 0)
                    {
                        var attrib = attribs[j].split(":", 2);
                        var name = attrib[0].trim();
                        var val = (attrib.length == 2) ? attrib[1].trim() : null;

                        var value = link.getAttribute(name);
                        //console.log(value);
                        if (val == null || value == null || value.trim().indexOf(val) == 0)
                        {
                            link.removeAttribute(name);
                            //console.warn("Removed attribute: " + attribs[j]);
                        }
                    }
                }
            }

            //console.log(data.truncators);

            if (link.href && link.href.length > 1 && data.truncators.length > 0)
            {
                var truncs = data.truncators.split("\n");
                for (var j = 0; j < truncs.length; j++)
                {
                    if (truncs[j].length > 0)
                    {
                        if (truncs[j][0] == "?")
                        {
                            var re = RegExp(truncs[j].substring[1], "gi");
                            var m = link.href.match(re);
                            j++;
                            if (m != null)
                            {
                                re = RegExp(truncs[j], "gi");
                                link.href = link.href.replace(re, "");
                                //console.warn("Truncated: " + link.href);
                            }
                        }
                        else
                        {
                            //console.log(truncs[j]);
                            var re = RegExp(truncs[j], "gi")
                            link.href = link.href.replace(re, "");
                            //console.warn("Truncated: " + link.href);
                        }
                    }
                }
            }
        }
    }
}

/* 
========================================================
    Removes redirection from DeviantArt
========================================================*/
var LinkCount = 0;
function ParseLinks()
{
    var links = document.getElementsByTagName("a");
    if (LinkCount == links.length) return;
    LinkCount = links.length;
    //console.info("DOL Parsing Links (" + links.length + ")", LinkCount);

    for (var i = 0; i < dataRules.length; i++)
    {
        if (dataRules[i].enabled)
        {
            var re = RegExp(dataRules[i].url, "i");
            var m = re.exec(document.URL);

            if (m) CleanseOutgoingLinks(links, dataRules[i]);
            if (m && dataRules.override) break;
        }
    }

    for (i = 0; i < links.length; i++)
    {
        links[i].setAttribute("LinkParsed", true);
    }
    //console.info("DONE");
    //if (--m_RefreshIntervalCount == 0) clearInterval(m_RefreshIntervalID);
}


function CopyToClipboard()
{
    var data = GM_getValue("Data");

    if (!data) return;

    var output = "";
    var rules = JSON.parse(data);

    for (var i = 0; i < rules.length; i++)
    {
        var rule = rules[i];
        var out = new Object();
                
        out.id = "L" + (new Date().getTime() + i);
        out.name = rule.title;
        out.URLs = rule.url;
        out.selectors = "a";
        out.sampleURL = rule.sampleURL;
        out.enabled = false;
        out.type = 1;
        out.regexes = new Array();

        if (rule.truncators.trim())
        {
            var t = rule.truncators.split("\n");
            for (var j = 0; j < t.length; j++)
            {
                var r = new Object();
                r.name = "href";
                r.search = t[j];
                out.regexes.push(r);
            }
        }

        if (rule.attributes.trim())
        {           
            var a = rule.attributes.split(";");            
            for (var j = 0; j < a.length; j++)
            {
                var d = a[j].split(":");

                var r = new Object();
                if (!d[0] || !d[0].trim) continue;
                r.name = d[0];
                r.search = (d[1]) ? "-" + d[1] : "-";
                out.regexes.push(r);
            }
        }
        
        output += JSON.stringify(out) + "\r\n";
    }
    
    GM_setClipboard(output);
    alert("Rules have been copied to clipboard. By default they are disabled.");    
}


/*
=====================================================================
 Shows settings dialog in an iframe.
=====================================================================*/
function ShowSettings()
{
    LoadSavedData();

    //iDoc.getElementById("btnSave").disabled = false;
    var iframe = CreateElement(
        "iframe",
            {
                "id": "DOLSettings",
                "style": "position: fixed; top: 0px; left: 0px; right: 0px; border: none; height: 100%; width: 100%; z-index: 10001; background-color: rgba(128, 128, 128,0.25);"
            },
        document);

    iframe.onload = function ()
    {

        iDoc = iframe.contentDocument || iframe.contentWindow.document;
        iDoc.body.innerHTML = content;
        head = iDoc.head;
        head.innerHTML += css;
        iDoc.getElementById("DOLIcon").setAttribute("src", icon);
        AddListner("btnAdd", OnClickAddRow);
        AddListner("btnSave", OnClickSave);
        AddListner("btnExit", OnClickExit);


        iDoc.getElementById("copyRulesToClip").onclick = CopyToClipboard;
        PopulateTable();

        iDoc.onmousemove = m;
        iDoc.onmouseup = a;

        //tableDnD = new TableDnD();
        tableDnD.init(iDoc.getElementById("dataTable"));
    }

    document.body.appendChild(iframe);
}


/*
=====================================================================
 Adds Listner
=====================================================================*/
function AddListner(id, func, parm)
{
    node = iDoc.getElementById(id);

    if (parm == undefined) node.addEventListener("click", function () { func() }, true);
    else node.addEventListener("click", function () { func(parm) }, true);
}


/*
=====================================================================
Sets the row color of the table
=====================================================================*/
function SetRowColor(row)
{
    if (row.rowIndex == 0 || row.rowIndex % 2 == 0)
    {
        StyleSetAttributes(row, "background-color: #E0F0FF;");
    }
    else
    {
        StyleSetAttributes(row, "background-color: #F0FFF0;");
    }
}

/*
=====================================================================
 Parses through all rows and uses SetRowColor to set the color
=====================================================================*/
function SetAllRowColors(table)
{
    var rows = table.rows;
    for (var i = 0; i < rows.length; i++)
    {
        SetRowColor(rows[i]);
    }
}

/*
=====================================================================
 Removes attributes from element style. attributes should a string 
 of attribute names seperated by semi-colon (;).
=====================================================================*/
function StyleRemoveAttributes(element, attributes)
{
    attribs = attributes.split(";");
    var style = element.getAttribute("style");
    if (style != null)
    {
        for (var i = 0; i < attribs.length; i++)
        {
            attrib = attribs[i].split(':')[0].trim();
            if (attrib.length > 0)
            {
                var replaced = style.split(';').filter(function (v)
                {
                    if (v.indexOf("base64,") == 0) return false;
                    return v.split(':')[0].trim() != attrib;
                }).join(';');
                style = replaced;
            }
        }
        element.setAttribute("style", style);
    }
    else element.setAttribute("style", "");
}


/*
=====================================================================
 Set style attributes without creating duplicates. Uses
 StyleRemoveAttributes() first. 
=====================================================================*/
function StyleSetAttributes(element, attributes)
{
    StyleRemoveAttributes(element, attributes);
    style = element.getAttribute("style") + attributes;
    element.setAttribute("style", style);
}

/*
=====================================================================
  Creates document element. Default doc value is set to iframe
  document
=====================================================================*/
function CreateElement(tag, attributes, doc)
{
    if (doc == undefined) doc = iDoc;
    var el = doc.createElement(tag);

    for (var x in attributes) el.setAttribute(x, attributes[x]);
    return el;
}

function AddRowIcons(row)
{
    row.innerHTML = "";
    var data = new RowData();
    data = dataRules[row.getAttribute("ruleIndex")];

    var cel = row.insertCell(-1);
    cel.setAttribute("style", "width: 100%; vertical-align:central; text-align:left;");


    var iHTML = '<div style="display: inline; background-color: lightgray;">';
    iHTML += '<input id="btnLight" type="button" title="Toggle Enablement" style = "height: 20px; width: 20px; background-image: url(' + ((data.enabled) ? iconLG : iconLR) + '); background-position: center center;" />';
    iHTML += '<input id="btnOverride" type="button" title="Toggle Override" style = "height: 20px; width: 20px; background-image: url(' + ((data.override) ? iconLG : iconLR) + '); background-position: center center;" />';
    iHTML += ' <input id="btnEdit" type="button" title="Edit" style = "height: 20px; width: 20px; background-image: url(' + iconEdit + '); background-position: center center;" />';
    iHTML += '<input id="btnDelete" type="button" title="Delete" style = "height: 20px; width: 20px; background-image: url(' + iconDel + '); background-position: center center;" />';
    iHTML += ' <input id="btnCopy" type="button" title="Copy" style = "height: 20px; width: 20px; background-image: url(' + iconCopy + '); background-position: center center;" />';
    iHTML += ' </div>&nbsp;';
    cel.innerHTML = iHTML + '<a href="' + data.sampleURL + '" target="_blank">' + data.title + "</a>";

    buttons = cel.getElementsByTagName("input");
    buttons[0].addEventListener("click", function () { OnClickLight(row) }, true);
    buttons[1].addEventListener("click", function () { OnClickOverride(row) }, true);
    buttons[2].addEventListener("click", function () { OnClickEdit(row) }, true);
    buttons[3].addEventListener("click", function () { OnClickDelete(row) }, true);
    buttons[4].addEventListener("click", function () { OnClickCopy(row) }, true);
}

//alert(1);

/*
=====================================================================
  Called to complete new filter form.
=====================================================================*/
function OnClickDone(row)
{
    var data = new RowData();
    var idx = dataRules.length;
    if (row.getAttribute("ruleIndex") == null)
    {
        dataRules.push(data);
        row.setAttribute("ruleIndex", idx);
        //console.log("New Row: ", dataRules.length - 1, row.getAttribute("ruleIndex"));
        StyleRemoveAttributes(iDoc.getElementById("divAdd"), "display");
    }
    else
    {
        idx = row.getAttribute("ruleIndex");
        data = dataRules[idx];
    }



    data.title = iDoc.getElementById("iTitle").value;
    data.url = iDoc.getElementById("iURL").value;
    data.attributes = iDoc.getElementById("iAttributes").value;
    data.truncators = iDoc.getElementById("iTruncations").value;
    data.sampleURL = iDoc.getElementById("iSampleURL").value;
    data.enabled = true;
    data.override = iDoc.getElementById("iOverride").checked;



    for (var i = 0; i < dataRules.length; i++)
    {
        if (i != idx && dataRules[i].title == data.title)
        {
            data.title += " (2)";
            i = -1;
        }
    }

    iDoc.getElementById("btnSave").disabled = false;
    AddRowIcons(row);

    SetAllRowColors(iDoc.getElementById("dataTable"));
    tableDnD.init(iDoc.getElementById("dataTable"))
}


function OnClickLight(row)
{
    iDoc.getElementById("btnSave").disabled = false;
    var i = row.getAttribute("ruleIndex");
    dataRules[i].enabled = !dataRules[i].enabled;

    var btn = row.getElementsByTagName("input")[0];

    if (dataRules[i].enabled) StyleSetAttributes(btn, "background-image: url(" + iconLG + ");");
    else StyleSetAttributes(btn, "background-image: url(" + iconLR + ");");
    //console.warn("STYLE",btn.getAttribute("style"));
}

function OnClickOverride(row)
{
    iDoc.getElementById("btnSave").disabled = false;
    var i = row.getAttribute("ruleIndex");
    dataRules[i].override = !dataRules[i].override;

    var btn = row.getElementsByTagName("input")[1];

    if (dataRules[i].override) StyleSetAttributes(btn, "background-image: url(" + iconLG + ");");
    else StyleSetAttributes(btn, "background-image: url(" + iconLR + ");");
    //console.warn("STYLE",btn.getAttribute("style"));
}


function OnClickCopy(row)
{
    if (iDoc.getElementById("editForm")) return;
    StyleSetAttributes(iDoc.getElementById("divAdd"), "display: none;");
    row.onmousedown = null;

    var table = iDoc.getElementById("dataTable");
    ShowEditDialog(table.insertRow(row.rowIndex + 1));
    var data = dataRules[row.getAttribute("ruleIndex")];
    iDoc.getElementById("iTitle").value = data.title + " Copy";
    iDoc.getElementById("iURL").value = data.url;
    iDoc.getElementById("iAttributes").value = data.attributes;
    iDoc.getElementById("iTruncations").value = data.truncators;
    iDoc.getElementById("iSampleURL").value = data.sampleURL;
    iDoc.getElementById("iOverride").checked = data.override;

}

function OnClickEdit(row)
{
    if (iDoc.getElementById("editForm")) return;
    StyleSetAttributes(iDoc.getElementById("divAdd"), "display: none;");
    row.onmousedown = null;

    ShowEditDialog(row);
    var data = dataRules[row.getAttribute("ruleIndex")];
    iDoc.getElementById("iTitle").value = data.title;
    iDoc.getElementById("iURL").value = data.url;
    iDoc.getElementById("iAttributes").value = data.attributes;
    iDoc.getElementById("iTruncations").value = data.truncators;
    iDoc.getElementById("iSampleURL").value = data.sampleURL;
    iDoc.getElementById("iOverride").checked = data.override;
}

//alert(2);

function OnClickDelete(row)
{
    iDoc.getElementById("btnSave").disabled = false;
    var i = row.getAttribute("ruleIndex");
    dataRules.splice(i, 1);

    table = iDoc.getElementById("dataTable");
    table.deleteRow(row.rowIndex);

    var rows = table.rows;
    for (var i = 0; i < rows.length; i++)
    {
        idx = rows[i].getAttribute("ruleIndex");
        if (idx > i) rows[i].setAttribute("ruleIndex", idx - 1);
    }
    SetAllRowColors(iDoc.getElementById("dataTable"));
}



/*
=====================================================================
 Called to cancel new filter creation.
=====================================================================*/
function OnClickCancel(row)
{
    StyleRemoveAttributes(iDoc.getElementById("divAdd"), "display");
    var table = iDoc.getElementById("dataTable");

    if (row.getAttribute("ruleIndex") == null)
    {
        table.deleteRow(row.rowIndex);
    }
    else
    {
        AddRowIcons(row);
        tableDnD.init(table)
    }
}



/*
=====================================================================
 Saves settings
=====================================================================*/
function ShowEditDialog(row)
{
    row.innerHTML = "";
    var cel = row.insertCell(-1);
    cel.setAttribute("style", "width: 100%;");
    cel.innerHTML = addForm;

    AddListner("btnDone", OnClickDone, row);
    AddListner("btnCancel", OnClickCancel, row);
}


/*
=====================================================================
 Saves settings
=====================================================================*/
function OnClickAddRow()
{
    if (iDoc.getElementById("editForm")) return;
    StyleSetAttributes(iDoc.getElementById("divAdd"), "display: none;");
    var table = iDoc.getElementById("dataTable");
    ShowEditDialog(table.insertRow(-1));
}


function GetElementRow(node)
{
    row = node;
    while (row.tagName.toLowerCase() != "tr") { row = row.parentNode; }
    return row;
}

/*
=====================================================================
 Saves settings
=====================================================================*/
function OnClickSave()
{

    var rules = new Array();
    var rows = iDoc.getElementById("dataTable").rows;


    for (var i = 0; i < rows.length; i++)
    {
        j = rows[i].getAttribute("ruleIndex");

        if (j != null) rules.push(dataRules[j]);
    }

    GM_setValue("Data", JSON.stringify(rules));
    dataRules = rules;
    rules = null;
    iDoc.getElementById("btnSave").disabled = true;
}

//alert(3);

/*
=====================================================================
 Exits and cancels any changes
=====================================================================*/
function OnClickExit()
{
    if (iDoc.getElementById("btnSave").disabled || confirm("Do you wish to exit and cancel changes?"))
        document.body.removeChild(document.getElementById("DOLSettings"));
}

function PopulateTable()
{
    var table = iDoc.getElementById("dataTable");
    for (var i = 0; i < dataRules.length; i++)
    {
        var row = table.insertRow(-1);
        row.setAttribute("ruleIndex", i);
        AddRowIcons(row);
    }
    SetAllRowColors(table);
}

var clone = (function ()
{
    return function (obj) { Clone.prototype = obj; return new Clone() };
    function Clone() { }
}());



var content =
'      <div style="width: 90%; height: 400px; border: 1px dotted #000000; margin: 50px auto; background-color: #FFFFFF;">' +
'            <div style="height: 100%; width: 100%">' +
'                <div class="gradient" style="width: 100%; font-weight: bold;">' +
'                    <img id="DOLIcon" />TS Direct Outgoing Links' +
'                </div>' +
'                <div style="width: 100%; height: 380px; overflow-y: auto; background-color: white;">' +
'                    <table id="dataTable" style="background-color: white; width: 100%;" border="0" cellspacing="0" cellpadding="0">' +
'                        <tbody>' +
'                        </tbody>' +
'                    </table>' +
'                    <div id="divAdd" style="text-align: center;">' +
'                        <input id="btnAdd" type="button" value="Add new rule" style="width: 60%" />' +
'                    </div>' +
'                </div>' +
'            </div>' +
'            <div class="gradient" style="width: 100%; text-align: right;">' +
'                <input id="btnSave" type="button" value="Save" disabled />' +
'                <input id="btnExit" type="button" value="Exit" style="margin-right: 10px;" />' +
'            </div>' +
'            <div style="text-align:center; padding: 5px; background-color: #E0F0FF;"><button id="copyRulesToClip" style="width:200px; font-size: 16px;">Copy Rules</button></div>' +
'            <div style="background-color: #9DF789; border: 1px black solid; padding: 5px;">' +
'                <b>This script is defunct, depreciated, dated, OSBSOLETE! Use the "Copy Rules"' +
'                 button to copy to clipboard the rules and then import them into "Linx Amender". Go to my' +
'                 <a href="https://openuserjs.org/scripts/TimidScript/%5BTS%5D_Linx_Amender">homepage</a> to get it.</b>' +
'            </div>' +
'        </div>';




var addForm =
'                    <div id="editForm" style="width: 80%; margin-left: 10%; margin-right: 10%; background-color: lightcyan; left: 5%; display: block;">' +
'                        <table style="width:100%">' +
'                            <tbody>                                ' +
'                                <tr>' +
'                                    <td style="width: 100px;"><label for="iTitle">Title</label></td>' +
'                                    <td><input id="iTitle" type="sumbit" title="Unique title of rule." style="width: 50%" /></td>' +
'                                </tr>' +
'                                <tr>' +
'                                    <td><label for="iURL">URL</label></td>' +
'                                    <td><input id="iURL" title="Regular expression to determine what sites works on. Spaced string implies all sites (excuted last)." type="sumbit" style="width: 99%;" /></td>' +
'                                </tr>' +
'                                <tr>' +
'                                    <td><label for="iTruncations">Truncators</label></td>' +
'                                    <td><textarea id="iTruncations" wrap="off" rows="3" style="width: 99%; resize: vertical;" title="Each line contains a regular expressions executed in order. Used on page links to remove any tracking information. If it starts with "?" implies this line is for checking and if match found use next line for removing of unwanted parts."></textarea></td>' +
'                                </tr> ' +
'                                <tr>' +
'                                    <td><label for="v" >Attributes</label></td>' +
'                                    <td><input id="iAttributes" title="Link attributes to remove. Element attributes(:value) to remove separated by semi-colon. Example: class:yt-uix-redirect-link; onmousedown; onclick:Track();" type="sumbit" style="width: 99%" /></td>' +
'                                </tr>' +
'                                <tr>' +
'                                    <td><label for=""></label>Sample URL</td>' +
'                                    <td><input id="iSampleURL" type="url" title="URL of a page where this fitler works on." style="width: 99%" /></td>' +
'                                </tr>' +
'                                <tr>' +
'                                    <td><label for="iOverride"></label></td>' +
'                                    <td><input id="iOverride" title="If checked implies if link URL it will not run any other filters." type ="checkbox" />Override lower precedent expression</td>' +
'                                </tr>' +
'                            </tbody>' +
'                        </table>' +
'                        <div id="" style="text-align: right; width: 100%;">' +
'                            <input id="btnDone" type="button" value="Done" /><input id="btnCancel" type="button" value="Cancel" />' +
'                        </div>' +
'                    </div>';


var css = "<style> .gradient { " +
    "background-image: linear-gradient(bottom, rgb(72, 138, 199 ) 37%,  rgb( 92, 179, 255 ) 69%);" +
    "background-image: -o-linear-gradient(bottom, rgb(72, 138, 199 ) 37%,  rgb( 92, 179, 255 ) 69%);" +
    "background-image: -moz-linear-gradient(bottom, rgb(72, 138, 199 ) 37%,  rgb( 92, 179, 255 ) 69%);" +
    "background-image: -webkit-linear-gradient(bottom, rgb(72, 138, 199 ) 37%,  rgb( 92, 179, 255 ) 69%);" +
    "background-image: -ms-linear-gradient(bottom, rgb(72, 138, 199 ) 37%,  rgb( 92, 179, 255 ) 69%);" +
    "background-image: -webkit-gradient( linear, left bottom, left top, color-stop(0.37, rgb(82,106,179)), color-stop(0.69, rgb(157,117,217))); } </style>";

var icon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACMklEQVR42mNkwA/EbCyVosX4WG+u23lzGzYFjHg0y7s4qO1eMz9KlfnOrf8R1Qc9t556upNYA1Q8XDT2rJkbIc/95AHD31fvGFLmPs9ZsOX0VGIM0Ar01d29bGqwFMfDewwM778wdOz5sbly0rZAoNxfQgYYR4UYbp/f6yvKdv8OA8Onn0DjDBnu3H/wpaRtn/fG/fcO4TPAPDbQctfkRg8+/pdXGBi+/2Ng0DRgYPjzHsj+znDn4fsvpRNPem84cP8QVgO4ubn3Pj5R5vTw5WsGDRY2Bg5pAQaGX+8YGH78ADoc4vI7z79+KZxxyXvL9iuHMAxgZmZef3lPRYCU6C8GPm5uBsYvQM0/gV749w+igIWFgYGDg+HGD47PgRHzjG7cenkH3QsSyorSe3fNC9NSEvoNtP0XA8P//xAZVlYGBk5OBgZBQQYGdnaGmoatVa0TDrRjC0RxRTnJvbum+2uriAKdzcgI0czFxcAgIAA25O2jV/9CU1c67j8GCQts0SgmLyO+e9f0QD01ORZQ4EA0Aw358uItQ0nt1oKZS89OJJSQROTlpC7f2psvwSbOAnb2z3cfGIrKNzZNW3S6npiU6NcUZbuhVu8/I0NKOMNf1l8MNTUbp3RMPpQHlPtP0ABBQcHzL/ssDVhfPmP4r2HM0HXx5bKK+i2xQKl/xCRlYIyxrN7b7hdiLfKVYdqZv9vzpu4JAAr/wqYWlxfYmZiYnGRkpf8+evh4P5D/G4c6BgASi80RI6E2VAAAAABJRU5ErkJggg==";
var iconDel = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACUElEQVR42pWTXUhTYRiAn3N2tqkzmWKQ/YdpZUWU6cgkqDGIMmQ1W8sLmUpEVxH9eFfdxDCiq5ISugi7SFiBOiMmQeVutKsgWZgJ0k0/RHNnlOmy9xycrNKij/Nyzvm+733ef4W/L2XuPfuvC/MrT5590LQNvKuh3CJ3PsCbl9DzCO4kILkooBx2nID7a2C9Kv/anAgEm8h7mLgGjS9g8A+AWNvcBs8LNa3Q7nAwm0j8AshxOlGSSabSaf0suMWjoWyA5RzEtoLLFQ5TXFvLSGsrn3t7TcCyhgY2dHYyOTDAW5+PUeQYtqfhuwnYCHsF8MQq39Xd3Sx1uyGdJt7Sgma3s0mUVauVRCTCuN9vQi/A4afw0ATsh9BR2TMOcgoK2CleOCsrYWYGxWJB1TRSQ0OMeb0oum4C7sKtm3DSBATgngeOz8crkOpoFEdZGYqi8C0eJ+7xzCsb8hgiF+GQCTgi5TkIwQxghViq6OjAIm4bACOc8eZmknM5MaQHHlwRVRPggtNSvutGDpbX17NFlA239eFhLDYbS4xwBDIRDKL39ZmAq3A5DJdMQD6sFdqIE3J3x2I4SktJivLrQABNVamQnOQLZEpCGaupYRqmj0kVpC9eZcqoSPeFmuB8SV0dRVVVvGtvR0mlTGs2ycmqtja+Dg6S6u/ntiRQknhKjn5kd2JeI3QdkBbOxJndSJm3JC8q7vukByYXmoXcXXDGLzlZCcXWLOVP8KULbgggJJOlLzpMxp5sFq2DPSUyHjITqsQ6OgbPxOrH3ydzIcB/rZ98iqkSKDckqwAAAABJRU5ErkJggg==";
var iconEdit = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACCElEQVR42mNkoBAwEqPoWo2d4u/n9z34NbTWKJTufE2SAZfrAmR+3j9/gpvzpzQ7N+s9RkH5UMW6I+eIMuD7jXTO8/ec9rLvm2nJ9fkaAxsbA8O3b0xf/nFLuepPOnMCrwF/HjUx/n27ds4PDpukD8wxDL/2LGX4cmINw++fjAx/mHnSrZbdnoXXgJ/nTfIY2AUnMDJzMP778YHho0Abw+M9Rxi+7VxwSdTK1UazYMpnnAb8PG/sxMDMup2RW4nt34fTDEw8RgwMHOIMD9+bvHn3WtDK3NX3Ns4w+HXVX/H/78cnGPn0xP69P8rAxKnJwMAlzcDIIfmbkVXKh0U4ZRfOWPh1I4f7/7f9hxkFTAz/fzzDwMAqycDIKsTAwMbzn4lLq4RFvKQPbzr4fnWTLyPztU2MvzcyMPwHSjILMfz/+5aBkVt9EbNwUAKzgP9/vAb8uL6tBej3akbmpwyMv7Yw/Pt4mIGRXeoUs0igI4ts3Tds4YViwMalM/Y6mqg5cfCJAm3/yPDvWelToAFWbJprH+GKLbgBc6ZNYD19/vIrLXUVgQA3m2cfv/+bdvzsxdnpWXmv8CU2sAHMwGASFhLU09TUWPzt+4+Vt2/fWf/58+efSBaA/P4PiP8C8W9QcAHxeyDnD8wAIGLgBGJWIGYBYiYoZkAy4D/UABD+BTIEyPhHVG7EBwA++bgRncWELAAAAABJRU5ErkJggg==";
var iconLG = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAABIAAAASABGyWs+AAAACXZwQWcAAAAQAAAAEABcxq3DAAADOklEQVQ4y22TX0xbdRTHP797b9vbtcLKf9jWukm7sC1CpjDI5lDeREOivvmiPkmyJ01cSIwPS4zvS3wStiwTog8m4osBnxRRmZORbriNtmC7UgYtcKVl3F5u7/35MCHL9Juc5JyTb8735OR8BU9BVdWagYGB9/r7+1+NRqMxIYRIpVLJiYmJH8bHx6/Ytl14ki+eLLq6ut4eHh7+3ChuhGb/nCG9lkAiiTS0crqtm8a65uLg4OAH09PTV/cF95K+vr4LwyPDI19/f80/cfsrnj0W5qXOPtpiJ/nbXuPbn6+znMn5Prl4aWBpaclMpVK/7Cs3NTV1z83dsi9+dkG+NnRKzmdvyMLOslw3H0dhZ1neW5mVAx+3yw8/fV/G43EnHA6/sreBGBoaur69azw3lfuGcy/3cOJYO2VRpEwJUxYx3S2kalPRi9y4/yMBu0G80NF1fHJy8qqmqmq4t/d873e/juEc3ETU7pB3F1EcFeE8PpHExXVd3NA21BZJ5uO8cfadMz6f77gWiUQ684W8QsCiOhjA0DIs23fxu1UIlP0BplNiXUlR3RjAMXZ4uPZQtLa2dmvBYLDRLJuoHoGu+/F6/KzYSYJuLV7hB2BXmpQqBTweH7qug+JiWWUCgUCdYhiGYVkWjdWHwdbwaQG8IgAoVHCo4CABrxLApwXA9tBcE2bX2sUwjKKWy+XiTsV1G3wRxVoF1/WjKUG8ih9N+ACJLS1cBK60MTdcDkVimAUp0+n0nOK67l9TP03dtEuC9oY+th6U8Xla0JQqNPxo+FGVZ/BqLRSzFicOnqNSUpj5beaObdv3VMBOp9NG+/Ptb3a0nlHWV/MI3eF8y1vEDrxIWD9JvSdCIjOHtaBy9sjrJO8vuiMjVz4ql8uzKoBlWensg2ywvq6+u+Noj2g+cISFjVtsmKusbGVYyt0lYp/ikNLG7M05Ofrl2BfZbPYyYO+9cmVzc3NmYSHh6Lr/9Fb+kbdJPUqtcxj/dojKipf5Pxa4c3v+0ejo2OXFxcVLQOk/ZgJ0oDMajb4bi8V6QjWheoEQhmEUksnk74lE4pqUcgYw/9eNe4hEIjoQAqr+bZWAzUwmU36a+w+ZlHiP+g9BVwAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxMC0wMi0xMVQxNTowODoyNC0wNjowMPGsjtIAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMDMtMDUtMjdUMTk6MzU6MjYtMDU6MDAbQyJcAAAAAElFTkSuQmCC";
var iconLR = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAABIAAAASABGyWs+AAAACXZwQWcAAAAQAAAAEABcxq3DAAADPklEQVQ4y22TX0xbdRTHP797L7TllkIZ49+kBUshYQqGhD+TbMvIHhwPPCxZTExM1EVD4pOJJryqD0Z9WuKThU2mvPMIMz64dBkwGdZtgfUPa0XWVqC3lFRuufT+fBgsy/SbnOSck2/O9+TkfAUvQVXVurGxsfdHR0cvBYPBTiGEiMfjsbm5uVuzs7NTlmVtvcgXLxYDAwPvhEKh7/Z2drxrd8JsP15DSsmJzi66zgxzoqW5MD4+/kk4HL7+XPA4GRkZ+XgyFJq8NTXpik7fIOBrpW/kIh3dpyG9ydJUiOTTp45Pv/hyLLG+vh+Px+88V25qahpauX/f+nb8I/lVW6vMhMOylEpJ6yhKqZTcWlyQ3wTa5NdXP5B/RCJln8934XgDMTExcfMwlwvkf5zmwsAg/r4+tHwedTePks8jDIMKy0LP5Vj/5WeKLa+InsHBrvn5+euaqqq+8+fOnV+evkFDJkNzIU/F41UUVUEIBQDFttHKZRqNHM1b2+RWlhm4+uGgw+Ho0vx+f/92Nqt4ikVaXE70RAwlsoKorQX12QBRLqPsFqhae0SLy4lV2OXvdFp0dHQMaW63u9E0TSoFOKtcaLoL1h5CYyNUVT07UrEI2Syay4nD5USxbUr7++i6Xq8ZhmGYpRJ1Pj8lRyWqpxpqPEfqZZCAKsBTjVouU9orUtvWTsGyMAyjoG1ubkYObdtWAh1KVtWw6nWoqUa6dITDCUjkvgkVgrJmkU0r1HWfJielTCaTK4pt209+vX37Xl5R8bx1iXXzEPG6Hxq92NU6tluHhhrEaz6elGxcIxcxVI27CwsPLMtaVQErmUwaPb29l9vfHFbSmS30gwNq334XMXQW0duHCAT4a/E3IlKn/vIVVhPrdmhq6jPTNJdVgFKplPxzY8Ndf7JhqHX4rKg81c7evbscZDYpJhNkIg/Y7e7noOcNllZ+lzdnZr7f2Ni4BljHr3yYy+UW1qLRssPl6kv/Y1YevtqFeaqdHW8TyUo3i7EEkYePij/NzFxLJBKfA3v/MRPgBPqDweB7nZ2dZ+q83pMIIQzD2IrFYkvRaPQHKeUCsP+/bjyG3+93Al7Ac9TaA3KpVMp8mfsvb2RufLP99X4AAAAldEVYdGRhdGU6Y3JlYXRlADIwMTAtMDItMTFUMTU6MDg6MjQtMDY6MDDxrI7SAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDAzLTA1LTI3VDE5OjM0OjA0LTA1OjAwITtfNgAAAABJRU5ErkJggg==";
var iconCopy = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAB3RJTUUH1gIFCQUziNtYHAAAAAlwSFlzAAALEgAACxIB0t1+/AAAAARnQU1BAACxjwv8YQUAAAB1UExURfHv4nN7pXN7rXt7rcbW/87W/73W/73O/7XO/3uErcbn/6XW/5zO/73G/3uEtXuMta3W/4SUxs7n/9bv/4Sczt7v/4SUvef3//////f//+/3/87e/4Sl1nOEtYyl3oyt3oSt3tbn/4y174y15/f39+/395S955vnmCkAAAABdFJOUwBA5thmAAAAjElEQVR42k2M6xqCIBBEQaGUtQyBuCRpab3/I+bCJ3b+zdmZJWSZkUgKi3Pr+onfIibvnAsxls4Ythxe70NYa6f575E2AE+c+RBHFFIphTMfbH50HwC0xWwel2oTvRBCm0wSVwEgFSSSaDnncsgkUVNKe3HDQpcESbNMEa3Ae3c0asYZO52bZhd0pyI/IQgMa2EAg3cAAAAASUVORK5CYII=";

function makeStruct(names)
{
    var names = names.split(' ');
    var count = names.length;
    function constructor()
    {
        for (var i = 0; i < count; i++)
        {
            this[names[i]] = arguments[i];
        }
    }
    return constructor;
}



//alert(4);

// ===================================================================
// Author: Denis Howlett <feedback@isocra.com>
// WWW: http://www.isocra.com/
//
// NOTICE: You may use this code for any purpose, commercial or
// private, without any further permission from the author. You may
// remove this notice from your final code if you wish, however we
// would appreciate it if at least the web site address is kept.
//
// You may *NOT* re-distribute this code in any way except through its
// use. That means, you can include it in your product, or your web
// site, or any other form where the code is actually being used. You
// may not put the plain javascript up on your site for download or
// include it in your javascript libraries for download.
// If you wish to share this code with others, please just point them
// to the URL instead.
//
// Please DO NOT link directly to this .js files from your site. Copy
// the files to your server and use them there. Thank you.
// ===================================================================

/** Keep hold of the current table being dragged */
var currenttable = null;

/*Code you need to add*/
//var table = document.getElementById('table-1');
//var tableDnD = new TableDnD();
//tableDnD.init(table);

/** Capture the onmousemove so that we can see if a row from the current
 *  table if any is being dragged.
 * @param ev the event (for Firefox and Safari, otherwise we use window.event for IE)
 */
function m(ev)
{
    if (currenttable && currenttable.dragObject)
    {
        ev = ev || window.event;
        var mousePos = currenttable.mouseCoords(ev);
        var y = mousePos.y - currenttable.mouseOffset.y;
        if (y != currenttable.oldY)
        {
            // work out if we're going up or down...
            var movingDown = y > currenttable.oldY;
            // update the old value
            currenttable.oldY = y;
            // update the style to show we're dragging
            currenttable.dragObject.style.backgroundColor = "#eee";
            // If we're over a row then move the dragged row to there so that the user sees the
            // effect dynamically
            var currentRow = currenttable.findDropTargetRow(y);
            if (currentRow)
            {
                if (movingDown && currenttable.dragObject != currentRow)
                {
                    currenttable.dragObject.parentNode.insertBefore(currenttable.dragObject, currentRow.nextSibling);
                } else if (!movingDown && currenttable.dragObject != currentRow)
                {
                    currenttable.dragObject.parentNode.insertBefore(currenttable.dragObject, currentRow);
                }
            }
        }

        return false;
    }
}

// Similarly for the mouseup
function a(ev)
{
    if (currenttable && currenttable.dragObject)
    {
        var droppedRow = currenttable.dragObject;
        // If we have a dragObject, then we need to release it,
        // The row will already have been moved to the right place so we just reset stuff
        droppedRow.style.backgroundColor = 'transparent';
        currenttable.dragObject = null;
        // And then call the onDrop method in case anyone wants to do any post processing
        currenttable.onDrop(currenttable.table, droppedRow);
        currenttable = null; // let go of the table too
    }
}


/** get the source element from an event in a way that works for IE and Firefox and Safari
 * @param evt the source event for Firefox (but not IE--IE uses window.event) */
function getEventSource(evt)
{
    if (window.event)
    {
        evt = window.event; // For IE
        return evt.srcElement;
    } else
    {
        return evt.target; // For Firefox
    }
}

/**
 * Encapsulate table Drag and Drop in a class. We'll have this as a Singleton
 * so we don't get scoping problems.
 */
function TableDnD()
{
    /** Keep hold of the current drag object if any */
    this.dragObject = null;
    /** The current mouse offset */
    this.mouseOffset = null;
    /** The current table */
    this.table = null;
    /** Remember the old value of Y so that we don't do too much processing */
    this.oldY = 0;

    /** Initialise the drag and drop by capturing mouse move events */
    this.init = function (table)
    {
        this.table = table;
        var rows = table.tBodies[0].rows; //getElementsByTagName("tr")
        for (var i = 0; i < rows.length; i++)
        {
            // John Tarr: added to ignore rows that I've added the NoDnD attribute to (Category and Header rows)
            var nodrag = rows[i].getAttribute("NoDrag")
            if (nodrag == null || nodrag == "undefined")
            { //There is no NoDnD attribute on rows I want to drag
                this.makeDraggable(rows[i]);
            }
        }
    }

    /** This function is called when you drop a row, so redefine it in your code
        to do whatever you want, for example use Ajax to update the server */
    this.onDrop = function (table, droppedRow)
    {
        SetAllRowColors(table);
        // Do nothing for now
    }

    /** Get the position of an element by going up the DOM tree and adding up all the offsets */
    this.getPosition = function (e)
    {
        var left = 0;
        var top = 0;
        /** Safari fix -- thanks to Luis Chato for this! */
        if (e.offsetHeight == 0)
        {
            /** Safari 2 doesn't correctly grab the offsetTop of a table row
			    this is detailed here:
			    http://jacob.peargrove.com/blog/2006/technical/table-row-offsettop-bug-in-safari/
			    the solution is likewise noted there, grab the offset of a table cell in the row - the firstChild.
			    note that firefox will return a text node as a first child, so designing a more thorough
			    solution may need to take that into account, for now this seems to work in firefox, safari, ie */
            e = e.firstChild; // a table cell
        }

        while (e.offsetParent)
        {
            left += e.offsetLeft;
            top += e.offsetTop;
            e = e.offsetParent;
        }

        left += e.offsetLeft;
        top += e.offsetTop;

        return { x: left, y: top };
    }

    /** Get the mouse coordinates from the event (allowing for browser differences) */
    this.mouseCoords = function (ev)
    {
        if (ev.pageX || ev.pageY)
        {
            return { x: ev.pageX, y: ev.pageY };
        }
        return {
            x: ev.clientX + iDoc.body.scrollLeft - iDoc.body.clientLeft,
            y: ev.clientY + iDoc.body.scrollTop - iDoc.body.clientTop
        };
    }

    /** Given a target element and a mouse event, get the mouse offset from that element.
		To do this we need the element's position and the mouse position */
    this.getMouseOffset = function (target, ev)
    {
        ev = ev || window.event;

        var docPos = this.getPosition(target);
        var mousePos = this.mouseCoords(ev);
        return { x: mousePos.x - docPos.x, y: mousePos.y - docPos.y };
    }

    /** Take an item and add an onmousedown method so that we can make it draggable */
    this.makeDraggable = function (item)
    {
        if (!item) return;
        var self = this; // Keep the context of the TableDnd inside the function
        item.onmousedown = function (ev)
        {
            // Need to check to see if we are an input or not, if we are an input, then
            // return true to allow normal processing
            var target = getEventSource(ev);
            if (target.tagName == 'INPUT' || target.tagName == 'SELECT') return true;
            currenttable = self;
            self.dragObject = this;
            self.mouseOffset = self.getMouseOffset(this, ev);
            return false;
        }
        item.style.cursor = "move";
    }

    /** We're only worried about the y position really, because we can only move rows up and down */
    this.findDropTargetRow = function (y)
    {
        var rows = this.table.tBodies[0].rows;
        for (var i = 0; i < rows.length; i++)
        {
            var row = rows[i];
            // John Tarr added to ignore rows that I've added the NoDnD attribute to (Header rows)
            var nodrop = row.getAttribute("NoDrop");
            if (nodrop == null || nodrop == "undefined")
            {  //There is no NoDnD attribute on rows I want to drag
                var rowY = this.getPosition(row).y;
                var rowHeight = parseInt(row.offsetHeight) / 2;
                if (row.offsetHeight == 0)
                {
                    rowY = this.getPosition(row.firstChild).y;
                    rowHeight = parseInt(row.firstChild.offsetHeight) / 2;
                }
                // Because we always have to insert before, we need to offset the height a bit
                if ((y > rowY - rowHeight) && (y < (rowY + rowHeight)))
                {
                    // that's the row we're over
                    return row;
                }
            }
        }
        return null;
    }
}
