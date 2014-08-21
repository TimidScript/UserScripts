// ==UserScript==
// @name                    [TS] Title Amender
// @namespace               TimidScript
// @version                 2.1.12 DEFUNCT
// @description             **Depreciated** Allows you to alter titles of websites by trimming, adding and replacing text. Depreciated: Use "Linx Amender" instead.
// @icon                    http://i.imgur.com/aqb4avb.png
// @author                  TimidScript
// @homepageURL             https://openuserjs.org/users/TimidScript
// @copyright               © 2014 TimidScript, All Rights Reserved.
// @license                 GNU GPLv3 + Please notify me if distributing
// @include                 *
// @grant                   GM_registerMenuCommand
// @grant                   GM_getValue
// @grant                   GM_setValue
// @grant                   GM_deleteValue
// @grant                   GM_listValues
// @grant                   GM_setClipboard
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

Initial release date: Sep 18, 2010 17:10
------------------------------------
 Version History
------------------------------------
2.1.12 DEFUNCT (2014-08-19)
 - Linked to new homepage
2.1.11 DEFUNCT (2014-08-03)
 - Added export functionality support for "Linx Amender"
2.1.10 (2014/07/18)
 - Minor Bug Fixes 
 - Alteration in the MutationObserver
 - Altered AmendPageTitle to decrease heavy usage of GM_listValues
2.1.9b (2014/07/18)
 - Ctrl-Clicking on highlighted row deselects it
2.1.9 (2014/07/18)
 - Optimised code and replaced huge sections
 - Replaced addEventListener with MutationObserver
 - @grant added to support GM v2
 - Changed save structure in the database to make it more eligible 
 - Fixed Bugs that can cause infinite loop
 - press ctrl to multi-select
 - Added filter
 - Better usage of CSS  
2.0.8 (2013/08/03)
 - Cleaned up header 
 - Fixed Default Values
2.0.7 (2013/07/05)
 - Bug Fix: DocTitle string is being replaced.
2.0.6 (2013/07/05)
 - Bug Fix: Check if item is enabled. 
 - Ignores empty document titles
2.0.5 (2013/03/23)
 - Bug fix: Removal of titles is fixed
2.0.4 (24/02/2013)
 - Bug fix: Capture title change in document
2.0.2 (11/02/2013)
 - Small fixed
2.0.1 (09/02/2013)
 - Initial release of new version
 - New Settings Window
 - Ability to add your own amendements through the settings window
 - Everything stored in prefs.js file (about:config)
 - Can now an regex search and replace.         
1.0.5
 - Did something really important
1.0.3
 - Added auto-update
1.0.2: Fixed Youtube
 - Fixed Youtube
1 (Title Trimmer)
 - Inital release
********************************************************************************************/

var iDoc = document; //Used to store iframe at creation

var TableHandler =
{
    /*    
        Populates the settings table
    -------------------------------------------------------------------------*/
    PopulateTable: function ()
    {
        var amendList = Settings.getAmendList();
        for (var i = 0; i < amendList.length; i++)
        {
            TableHandler.AddRow(amendList[i].enabled, amendList[i].name, amendList[i].url, amendList[i].search, amendList[i].replace);
        }
    },

    /*    
        Resets input text boxes
    -------------------------------------------------------------------------*/
    ResetAddTextBox: function ()
    {
        var el = iDoc.getElementById("addRow");
        el.setAttribute("cleared", 0);

        var el = iDoc.getElementById("txtName");
        el.value = el.getAttribute("value");
        el.style.color = "#999999";

        el = iDoc.getElementById("txtURL");
        el.value = el.getAttribute("value");
        el.style.color = "#999999";

        el = iDoc.getElementById("txtSearch");
        el.value = el.getAttribute("value");
        el.style.color = "#999999";

        el = iDoc.getElementById("txtReplace");
        el.value = el.getAttribute("value");
        el.style.color = "#999999";
    },

    /*
        Copies row into input text boxes. Called when a row is double 
        clicked.
    -------------------------------------------------------------------------*/
    CopyRow: function (row)
    {
        //var addRow = iDoc.getElementById("addRow");
        //if (iDoc.getElementById("addRow").getAttribute("cleared") == 1)

        TableHandler.ClearContent(iDoc.getElementById("txtName"));
        TableHandler.ClearContent(iDoc.getElementById("txtURL"));
        TableHandler.ClearContent(iDoc.getElementById("txtSearch"));
        TableHandler.ClearContent(iDoc.getElementById("txtReplace"));

        iDoc.getElementById("txtName").value = row.cells[0].innerHTML;
        iDoc.getElementById("txtURL").value = row.cells[1].innerHTML;
        iDoc.getElementById("txtSearch").value = row.cells[2].innerHTML;
        iDoc.getElementById("txtReplace").value = row.cells[3].innerHTML;
        iDoc.getElementById("addRow").setAttribute("cleared", 1);

    },

    /*
        Adds row to the table
   -------------------------------------------------------------------------*/
    AddRow: function (enabled, name, url, search, replace)
    {
        var table = iDoc.getElementById("dataTable");

        var row = table.insertRow(-1);
        if (!enabled) row.className += " rowDisabled";

        row.onclick = TableHandler.OnClickRow;
        row.addEventListener("dblclick", function () { TableHandler.CopyRow(row) }, true);


        var cel = row.insertCell(-1);
        cel.innerHTML = name;

        cel = row.insertCell(-1);
        cel.innerHTML = url;

        cel = row.insertCell(-1);
        cel.innerHTML = search;

        cel = row.insertCell(-1);
        cel.innerHTML = replace;

        TableHandler.ResetAddTextBox();
    },

    /*
        Calls AddRow to add input boxes content to the table
    -------------------------------------------------------------------------*/
    OnClickAddRow: function ()
    {
        if (iDoc.getElementById("addRow").getAttribute("cleared") == 1)
        {
            cel0 = iDoc.getElementById("txtName").value;
            cel1 = iDoc.getElementById("txtURL").value;
            cel2 = iDoc.getElementById("txtSearch").value;
            cel3 = iDoc.getElementById("txtReplace").value;

            if (cel0.length > 0 && cel1.length > 0 && cel2.length > 0)
            {
                TableHandler.AddRow(1, cel0, cel1, cel2, cel3);
                iDoc.getElementById("btnSave").disabled = false;
            }
        }
    },

    /*
        Highlights row if clicked on.
    -------------------------------------------------------------------------*/
    OnClickRow: function (e)
    {
        if (!e.ctrlKey) TableHandler.OnClickDeselect();

        if (e.ctrlKey && this.className.match(/rowSelected/)) this.className = this.className.replace(/rowSelected/, "").trim();
        else this.className = this.className.replace(/rowSelected/, "").trim() + " rowSelected";
    },

    /*
        Parses to selected rows and enables/disables them
    -------------------------------------------------------------------------*/
    OnClickRowEnable: function ()
    {
        var enabled = (this.id == "btnEnable");
        var rows = iDoc.getElementById("dataTable").rows;

        for (var i = 1; i < rows.length; i++)
        {
            var row = rows[i];
            if (row.className.match("rowSelected"))
            {
                row.className = row.className.replace(/rowDisabled/, "").trim();
                if (!enabled) row.className += " rowDisabled";
                iDoc.getElementById("btnSave").disabled = false
            }
        }
    },

    /*
        Clears the content of the input boxes.
    -------------------------------------------------------------------------*/
    ClearContent: function (element)
    {
        element.style.color = null;
        element.value = "";
    },

    /*
        Called when any input box is selected. The content of the boxes
        are cleared and text color is set to black.
    -------------------------------------------------------------------------*/
    OnClickClearContent: function ()
    {
        row = iDoc.getElementById("addRow");
        if (row.getAttribute("cleared") == 0)
        {
            row.setAttribute("cleared", 1);

            TableHandler.ClearContent(iDoc.getElementById("txtName"));
            TableHandler.ClearContent(iDoc.getElementById("txtURL"));
            TableHandler.ClearContent(iDoc.getElementById("txtSearch"));
            TableHandler.ClearContent(iDoc.getElementById("txtReplace"));
        }
    },

    /*    
        Parses through rows and inverts selection
    -------------------------------------------------------------------------*/
    OnClickInvertSelection: function ()
    {
        var rows = iDoc.getElementById("dataTable").rows;
        for (var i = 1; i < rows.length; i++)
        {
            if (rows[i].className.match("rowSelected")) rows[i].className = rows[i].className.replace(/rowSelected/, "").trim();
            else rows[i].className += " rowSelected";
        }
    },

    /*    
        Parses through rows and deselects them
    -------------------------------------------------------------------------*/
    OnClickDeselect: function ()
    {
        var rows = iDoc.getElementById("dataTable").rows;
        for (var i = 1; i < rows.length; i++)
        {
            rows[i].className = rows[i].className.replace(/rowSelected/, "").trim();
        }
    },

    /*    
        Deletes selected rows
    -------------------------------------------------------------------------*/
    OnClickDelete: function ()
    {
        var table = iDoc.getElementById("dataTable");
        var rows = table.rows;
        var text = ""
        for (var i = rows.length - 1; i > 0; i--)
        {
            if (rows[i].className.match("rowSelected")) text += rows[i].cells[0].textContent + "    (" + rows[i].cells[1].textContent + ")\n";
        }

        if (confirm("Are you sure you wish to delete selections:\n" + text))
        {
            for (var i = rows.length - 1; i > 0; i--)
            {
                if (rows[i].className.match("rowSelected"))
                {
                    table.deleteRow(i);
                    iDoc.getElementById("btnSave").disabled = false;
                }
            }
        }
    },

    /*    
        Moves selected rows down one
    -------------------------------------------------------------------------*/
    OnClickMoveDown: function ()
    {
        var rows = iDoc.getElementById("dataTable").rows;

        for (var i = rows.length - 2; i > 0; i--)
        {

            row1 = rows[i].className.match("rowSelected");
            row2 = rows[i + 1].className.match("rowSelected");

            if (row1 && !row2)
            {
                rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                iDoc.getElementById("btnSave").disabled = false;
            }
        }
    },

    /* 
        Moves selected rows up on
    -------------------------------------------------------------------------*/
    OnClickMoveUp: function ()
    {
        var rows = iDoc.getElementById("dataTable").rows;

        for (var i = 2; i < rows.length; i++)
        {
            row1 = rows[i].className.match("rowSelected");
            row2 = rows[i - 1].className.match("rowSelected");

            if (row1 && !row2)
            {
                rows[i].parentNode.insertBefore(rows[i], rows[i - 1]);
                iDoc.getElementById("btnSave").disabled = false;
            }
        }
    },

    /*
        Sorts the rows
    -------------------------------------------------------------------------*/
    OnClickSort: function ()
    {
        var rows = iDoc.getElementById("dataTable").rows;

        for (var i = 1; i < rows.length - 1; i++)
        {
            var txti = rows[i].cells[0].textContent.toLowerCase();
            for (var j = i + 1; j < rows.length; j++)
            {
                var txtj = rows[j].cells[0].textContent.toLowerCase();

                if (txti > txtj)
                {
                    var rowi = rows[i].cloneNode(true);
                    rows[i].innerHTML = rows[j].innerHTML;
                    rows[i].className = rows[j].className;

                    rows[j].innerHTML = rowi.innerHTML;
                    rows[j].className = rowi.className;
                    txti = txtj;

                    iDoc.getElementById("btnSave").disabled = false;
                }
            }
        }
    },

    /*
        Saves settings
    -------------------------------------------------------------------------*/
    OnClickSave: function ()
    {
        var rows = iDoc.getElementById("dataTable").rows;
        var aList = new Array();

        for (var i = 1; i < rows.length; i++)
        {
            Settings.AddAmendListItem(aList, !rows[i].className.match("rowDisabled"), rows[i].cells[0].innerHTML, rows[i].cells[1].innerHTML, rows[i].cells[2].innerHTML, rows[i].cells[3].innerHTML);
        }
        Settings.saveAmendList(aList);

        var title = document.head.getElementsByTagName("Title")[0];
        if (title)
        {
            title.textContent = title.getAttribute("orgTitle");
            title.removeAttribute("orgTitle");
            title.removeAttribute("newTitle");            
            Main.AmendPageTitle();
        }

        iDoc.getElementById("btnSave").disabled = true;
        //document.body.removeChild(document.getElementById("TASettings"));
    },

    /*
        Filter listing according to document URL
    -------------------------------------------------------------------------*/
    OnClickFilter: function ()
    {
        var enabled = this.checked;

        var rows = iDoc.getElementById("dataTable").rows;

        if (enabled)
        {
            for (var i = 1; i < rows.length; i++)
            {
                var re = RegExp(rows[i].cells[1].textContent, "i");
                var m = re.exec(document.URL);

                if (!m)
                {
                    rows[i].style.display = "none";
                    rows[i].className = this.className.replace(/rowSelected/, "").trim();
                }
            }
        }
        else for (var i = 1; i < rows.length; i++) rows[i].style.display = null;

        iDoc.getElementById("btnSort").disabled = enabled;
        iDoc.getElementById("btnUp").disabled = enabled;
        iDoc.getElementById("btnDown").disabled = enabled;
    },

    /*
        Exits and cancels any changes
    -------------------------------------------------------------------------*/
    OnClickCancel: function ()
    {
        if (iDoc.getElementById("btnSave").disabled || confirm("Do you wish to exit and cancel changes?"))
            document.body.removeChild(document.getElementById("TASettings"));
    }
};


/*
=====================================================================
    MutationObserver
=====================================================================*/
var MO =
{
    Observer: null,
    monitorChanges: function ()
    {
        if (!MO.Observer)
        {
            var mo = window.MutationObserver || window.MozMutationObserver || window.WebKitMutationObserver;
            if (mo) MO.Observer = new mo(MO.callback);
        }

        if (MO.Observer) MO.Observer.observe(document, { subtree: true, childList: true, characterData: true });
    },

    callback: function ()
    {
        MO.Observer.disconnect();
        Main.AmendPageTitle();        
        MO.monitorChanges();
    }
};


var Main =
{
    /*    
     Shows settings dialog in an iframe.
    -----------------------------------------------------------------*/
    showSettings: function ()
    {
        if (document.getElementById("TASettings")) return;

        var iframe = CreateElement(
            "iframe",
                {
                    "id": "TASettings",
                    "style": "position: fixed; top: 0px; left: 0px; right: 0px; border: none; height: 100%; width: 100%; z-index: 99999999999999; background-color: rgba(128, 128, 128,0.25);"
                },
            document);


        iframe.onload = function ()
        {

            iDoc = iframe.contentDocument || iframe.contentWindow.document;
            iDoc.body.innerHTML = content;
            iDoc.getElementById("icon").setAttribute("src", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACMklEQVR42mNkwA/EbCyVosX4WG+u23lzGzYFjHg0y7s4qO1eMz9KlfnOrf8R1Qc9t556upNYA1Q8XDT2rJkbIc/95AHD31fvGFLmPs9ZsOX0VGIM0Ar01d29bGqwFMfDewwM778wdOz5sbly0rZAoNxfQgYYR4UYbp/f6yvKdv8OA8Onn0DjDBnu3H/wpaRtn/fG/fcO4TPAPDbQctfkRg8+/pdXGBi+/2Ng0DRgYPjzHsj+znDn4fsvpRNPem84cP8QVgO4ubn3Pj5R5vTw5WsGDRY2Bg5pAQaGX+8YGH78ADoc4vI7z79+KZxxyXvL9iuHMAxgZmZef3lPRYCU6C8GPm5uBsYvQM0/gV749w+igIWFgYGDg+HGD47PgRHzjG7cenkH3QsSyorSe3fNC9NSEvoNtP0XA8P//xAZVlYGBk5OBgZBQQYGdnaGmoatVa0TDrRjC0RxRTnJvbum+2uriAKdzcgI0czFxcAgIAA25O2jV/9CU1c67j8GCQts0SgmLyO+e9f0QD01ORZQ4EA0Aw358uItQ0nt1oKZS89OJJSQROTlpC7f2psvwSbOAnb2z3cfGIrKNzZNW3S6npiU6NcUZbuhVu8/I0NKOMNf1l8MNTUbp3RMPpQHlPtP0ABBQcHzL/ssDVhfPmP4r2HM0HXx5bKK+i2xQKl/xCRlYIyxrN7b7hdiLfKVYdqZv9vzpu4JAAr/wqYWlxfYmZiYnGRkpf8+evh4P5D/G4c6BgASi80RI6E2VAAAAABJRU5ErkJggg==");

            iDoc.getElementById("btnAdd").onclick = TableHandler.OnClickAddRow;
            iDoc.getElementById("txtName").onclick = TableHandler.OnClickClearContent;
            iDoc.getElementById("txtURL").onclick = TableHandler.OnClickClearContent;
            iDoc.getElementById("txtSearch").onclick = TableHandler.OnClickClearContent;
            iDoc.getElementById("txtReplace").onclick = TableHandler.OnClickClearContent;

            iDoc.getElementById("btnInvert").onclick = TableHandler.OnClickInvertSelection;
            iDoc.getElementById("btnDeselect").onclick = TableHandler.OnClickDeselect;
            iDoc.getElementById("btnUp").onclick = TableHandler.OnClickMoveUp;
            iDoc.getElementById("btnDown").onclick = TableHandler.OnClickMoveDown;
            iDoc.getElementById("btnDisable").onclick = TableHandler.OnClickRowEnable;
            iDoc.getElementById("btnEnable").onclick = TableHandler.OnClickRowEnable;
            iDoc.getElementById("btnDelete").onclick = TableHandler.OnClickDelete;
            iDoc.getElementById("btnSave").onclick = TableHandler.OnClickSave;
            iDoc.getElementById("btnCancel").onclick = TableHandler.OnClickCancel;
            iDoc.getElementById("btnSort").onclick = TableHandler.OnClickSort;

            iDoc.getElementById("btnFilter").onclick = TableHandler.OnClickFilter;

            AddStyle(".gradient { background-image: linear-gradient(bottom, rgb(82,106,179) 37%, rgb(157,117,217) 69%); background-image: -o-linear-gradient(bottom, rgb(82,106,179) 37%, rgb(157,117,217) 69%); background-image: -moz-linear-gradient(bottom, rgb(82,106,179) 37%, rgb(157,117,217) 69%); background-image: -webkit-linear-gradient(bottom, rgb(82,106,179) 37%, rgb(157,117,217) 69%); background-image: -ms-linear-gradient(bottom, rgb(82,106,179) 37%, rgb(157,117,217) 69%); background-image: -webkit-gradient( linear, left bottom, left top, color-stop(0.37, rgb(82,106,179)), color-stop(0.69, rgb(157,117,217))); }");
            AddStyle("#dataTable tr {cursor: pointer;} #dataTable tr:nth-child(odd) {background-color: #F6CCC0; } #dataTable tr:nth-child(even){background-color: #FFF3C3;} #dataTablet tr:hover{background-color: red; lightsalmon;}");
            AddStyle(".rowSelected {background-color: yellow !important;} .rowDisabled {color: #626262;}");

            //Copies Rules to Clipboard for importation into "Linx Amender"
            iDoc.getElementById("copyRulesToClip").onclick = function (e)
            {
                var output = "";
                var rules = Settings.getAmendList();                

                for (var i = 0; i < rules.length; i++)
                {
                    var rule = rules[i];

                    var out = new Object();
                    out.id = "L" + (new Date().getTime() + i);
                    out.name = rule.name;
                    out.URLs = rule.url;                                        
                    out.enabled = rule.enabled;
                    out.type = 2; //Title                    

                    var r = new Object();
                    r.search = rule.search;
                    r.replace = rule.replace;
                    out.regexes = [r];                    
                    
                    output += JSON.stringify(out) + "\r\n";
                }

                GM_setClipboard(output);
                alert("Rules have been copied to clipboard.");
            };

            TableHandler.PopulateTable();
        }

        document.body.appendChild(iframe);

        function AddStyle(CSS, id)
        {
            var style = document.createElement("style");
            style.type = "text/css";
            if (id) style.id = id;
            style.innerHTML = CSS;
            iDoc.head.appendChild(style);
        }

        /*
            Creates document element. Default doc value is set to iframe
            document
        -------------------------------------------------------------------------*/
        function CreateElement(tag, attributes, doc)
        {
            if (doc == undefined) doc = iDoc;
            var el = doc.createElement(tag);

            for (var x in attributes) el.setAttribute(x, attributes[x]);
            return el;
        }

        var content = '<div style="position: fixed; top: 50px; left: 5%; min-width: 500px; width: 90%; min-height: 300px; max-height: 600px; border: 1px dotted #000000; margin: 0 auto; background-color: #FFFFFF;">' +
                '    <div class="gradient" style="width: 100%; font-weight: bold;"><img id="icon" /> Title Trimmer Settings</div>' +
                '    <table style="width: 100%;" border="1" cellspacing="1" cellpadding="1">' +
                '        <tbody>' +
                '            <tr id="addRow" cleared="0">' +
                '                <th style="width: 60px;">' +
                '                    <input id="btnAdd" type="submit" style="width: 100%" value="Add" /></th>' +
                '                <th style="width: 100px;">' +
                '                    <input id="txtName" type="text" style="width: 98%; color: #999999;" value="Name" /></th>' +
                '                <th style="width: 350px;">' +
                '                    <input id="txtURL" type="text" style="width: 98%; color: #999999;" value="Website" /></th>' +
                '                <th>' +
                '                    <input id="txtSearch" type="text" style="width: 95%; color: #999999;" value="Search Text" /></th>' +
                '                <th>' +
                '                    <input id="txtReplace" type="text" style="width: 95%; color: #999999;" value="Replacement Text" /></th>' +
                '            </tr>' +
                '        </tbody>' +
                '    </table>' +
                '    <div style="min-height: 200px; max-height: 500px; overflow-y: auto;">' +
                '        <table id="dataTable" style="width: 100%;" border="0" cellspacing="1" cellpadding="1" bgcolor="black">' +
                '            <tbody id="dataTBody">' +
                '                <tr style="background-color: lightsteelblue;">' +
                '                    <th style="width:auto">Name</th>' +
                '                    <th style="width:350px">Website</th>' +
                '                    <th style="width:auto">Search Text</th>' +
                '                    <th style="width:auto">Replacement Text</th>' +
                '                </tr>' +
                '            </tbody>' +
                '        </table>' +
                '    </div>' +
                '    <div style="width: 100%; text-align: left; background-color: lightsteelblue;">' +
                '        <span><input id="btnFilter" type="checkbox"/>Filter Current Site</>' +
                '        <div style="display: inline-block; width: 5px; margin-left: 100px;"></div>' +
                '        <input id="btnInvert" type="submit" style="width: auto;" value="Invert Selection" />' +
                '        <input id="btnDeselect" type="submit" style="width: auto;" value="Deselect All" />' +
                '        <div style="display: inline-block; width: 20px;"></div>' +
                '        <input id="btnUp" type="submit" style="width: 70px;" value="Up" />' +
                '        <input id="btnDown" type="submit" style="width: 70px;" value="Down" />' +
                '        <input id="btnSort" type="submit" style="width: 70px;" value="Sort" />' +
                '        <div style="display: inline-block; width: 20px;"></div>' +
                '        <input id="btnEnable" type="submit" style="width: 70px;" value="Enable" />' +
                '        <input id="btnDisable" type="submit" style="width: 70px;" value="Disable" />' +
                '        <div style="display: inline-block; width: 20px;"></div>' +
                '        <input id="btnDelete" type="submit" style="width: 70px;" value="Delete" />' +
                '    </div>' +
                '    <div class="gradient" style="width: 100%; text-align: right;">' +
                '        <input id="btnSave" disabled="true" type="submit" style="width: 70px; margin-right: 5px" value="Save" />' +
                '        <input id="btnCancel" type="submit" style="width: 70px; margin-right: 5px" value="Cancel" />' +
                '    </div>' +
                '    <div style="text-align:center; padding: 5px; background-color: #E0F0FF;"><button id="copyRulesToClip" style="width:200px; font-size: 16px;">Copy Rules</button></div>' +
                '    <div style="background-color: #9DF789; border: 1px black solid; padding: 5px;">' +
                '    <b>This script is defunct, depreciated, dated, OSBSOLETE! Use the "Copy Rules"' +
                '    button to copy to clipboard the rules and then import them into "Linx Amender". Go to my' +
                '    <a href="https://openuserjs.org/scripts/TimidScript/%5BTS%5D_Linx_Amender">homepage</a> to get it.</b>' +
                '    </div>';
    },

    /*

        Parses through amendlist, if URL match, it tries to amend the 
        document title
    -------------------------------------------------------------------------*/
    AmendPageTitle: function ()
    {
        var title = document.head.getElementsByTagName("Title")[0];
        if (title && (title.getAttribute("newTitle") != title.textContent))
        {
            var amendList = Settings.getAmendList();

            title.setAttribute("orgTitle", title.textContent);
            var newTitle = title.textContent;

            for (var i = 0; i < amendList.length; i++)
            {
                var item = amendList[i];

                if (item.enabled == 1)
                {
                    var re = RegExp(item.url, "i");
                    var m = re.exec(document.URL);

                    if (m != null)
                    {
                        re = RegExp(item.search, "gi");
                        newTitle = newTitle.replace(re, item.replace);
                    }
                }
            }

            title.setAttribute("newTitle", newTitle);
            title.textContent = newTitle;
        }
    }
};

var Settings =
{
    getAmendList: function ()
    {
        var aList = new Array();
        var names = GM_listValues();

        if (!names)
        {
            console.warn("GM_listValues returns an empty lists");
            return new Array();
        }
        for (var i = 0; i < names.length; i++)
        {
            if (names[i].match(/^AI\d{4}$/))
                aList.push(JSON.parse(GM_getValue(names[i])));
        }

        return aList;
    },

    saveAmendList: function (amendList)
    {
        //Remove old settings
        var names = GM_listValues();
        for (var i = amendList.length; i < names.length; i++)
        {
            if (names[i].match(/^AI\d{4}$/)) GM_deleteValue(names[i]);
        }

        for (var i = 0; i < amendList.length; i++)
        {
            var name = "AI" + ('0000' + i).slice(-4);
            GM_setValue(name, JSON.stringify(amendList[i]));
        }
    },

    /*
        Adds items to amendList
    -----------------------------------------------------------------*/
    AddAmendListItem: function (list, enabled, name, url, search, replace)
    {
        list.push({ "name": name, "url": url, "search": search, "replace": replace, "enabled": enabled });
    },


    /*
       Saved version number that gets changed when save content
       compatibility gets broken.
    -----------------------------------------------------------------*/
    versionCheck: function (version2)
    {
        var version1 = GM_getValue("Version", "0.0.0.0");

        if (version1 == version2) return;
        var v1 = version1.split("."); //Stored Version
        var v2 = version2.split(".");  //Current Script Version

        if (v1[0] != v2[0]) //Version for amendList
        {
            switch (v1[0])
            {
                default:
                    var aList = GM_getValue("AmendList", null);
                    if (aList != null)
                    {
                        alert("Upgrading saved data format");
                        aList = JSON.parse(aList); //Gets amendList data
                        Settings.saveAmendList(aList);
                        GM_deleteValue("AmendList");
                        //"[{\"name\":\"AniDB\",\"url\":\"^https?://anidb\\\\.net\",\"search\":\"::AniDB.net::\",\"replace\":\"\",\"enabled\":true},{\"name\":\"AniDB\",\"url\":\"^https?://anidb\\\\.net\",\"search\":\"::\",\"replace\":\"\",\"enabled\":true},{\"name\":\"AniDB\",\"url\":\"^https?://anidb\\\\.net\",\"search\":\"^Anime - \",\"replace\":\"\",\"enabled\":true},{\"name\":\"BTDigg\",\"url\":\"btdigg.org\",\"search\":\"Search Engine\",\"replace\":\"\",\"enabled\":true},{\"name\":\"CrunchyRoll\",\"url\":\"^https?://(\\\\w+\\\\.)?crunchyroll\\\\.com\",\"search\":\"Crunchyroll - Watch \",\"replace\":\"\",\"enabled\":true},{\"name\":\"CrunchyRoll\",\"url\":\"^https?://(\\\\w+\\\\.)?crunchyroll\\\\.com\",\"search\":\"Crunchyroll - \",\"replace\":\"\",\"enabled\":true},{\"name\":\"DeviantArt\",\"url\":\"^https?://(\\\\w+\\\\.)?deviantart\\\\.com\",\"search\":\" on deviantart\",\"replace\":\"\",\"enabled\":true},{\"name\":\"Doujin-Moe\",\"url\":\"www\\\\.doujin-moe\\\\.us\",\"search\":\"Doujin-moe - \",\"replace\":\"\",\"enabled\":true},{\"name\":\"ElderScrolls\",\"url\":\"^https?://cs\\\\.elderscrolls\\\\.com\",\"search\":\"^Portal:\",\"replace\":\"\",\"enabled\":true},{\"name\":\"FurAffinity\",\"url\":\"^https?://www\\\\.furaffinity\\\\.net\",\"search\":\"Artwork Gallery for \",\"replace\":\"\",\"enabled\":true},{\"name\":\"Google\",\"url\":\"^https?://(\\\\w+)\\\\.google\\\\.\",\"search\":\"- Google Search\",\"replace\":\"\",\"enabled\":true},{\"name\":\"MangaUpdates\",\"url\":\"^https?://www\\\\.mangatraders\\\\.com\",\"search\":\"Manga Traders - \",\"replace\":\"\",\"enabled\":true},{\"name\":\"MangaUpdates\",\"url\":\"^https?://www\\\\.mangaupdates\\\\.com\",\"search\":\"Baka-Updates Manga - \",\"replace\":\"\",\"enabled\":true},{\"name\":\"Nexus Skyrim\",\"url\":\"http://skyrim.nexusmods.com\",\"search\":\" - Skyrim mods and community\",\"replace\":\"\",\"enabled\":true},{\"name\":\"Nexus Skyrim\",\"url\":\"http://skyrim.nexusmods.com\",\"search\":\" at skyrim nexus\",\"replace\":\"\",\"enabled\":true},{\"name\":\"Youtube\",\"url\":\"^https?://www\\\\.youtube\\\\.com\",\"search\":\" - YoUtUbE$\",\"replace\":\"\",\"enabled\":true},{\"name\":\"Youtube\",\"url\":\"^https?://www\\\\.youtube\\\\.com\",\"search\":\"▶ \",\"replace\":\"\",\"enabled\":true}]"
                    }
                    else //Fill with default values
                    {
                        alert("Creating new example data");
                        aList = new Array();
                        Settings.AddAmendListItem(aList, 1, "Youtube", "^https?://www\\.youtube\\.com", " - YoUtUbE$", "");
                        Settings.AddAmendListItem(aList, 1, "deviantArt", "^https?://(\\w+\\.)?deviantart\\.com", " on deviantart", "");
                        Settings.AddAmendListItem(aList, 1, "CrunchyRoll", "^https?://(\\w+\\.)?crunchyroll\\.com", "Crunchyroll - Watch ", "");
                        Settings.AddAmendListItem(aList, 1, "Google", "^https?://(\\w+)\\.google\\.com", "- Google Search", "");
                        Settings.AddAmendListItem(aList, 1, "Emacswiki", "^http://www\\.emacswiki\\.org", "^(EmacsWiki)(:\\s)(.+)$", "$3$2$1");
                        Settings.saveAmendList(aList);
                    }
                    break;
            }
        }

        GM_setValue("Version", version2);
        Main.showSettings();
    }
};

(function ()
{
    if (window === window.top)
    {
        console.info("[TS] Title Amender Settings")
        GM_registerMenuCommand("[TS] Title Amender Settings", Main.showSettings);

        Settings.versionCheck("1.0.0.0");
        Main.AmendPageTitle();
        MO.monitorChanges();        
    }
    else
    {
        Settings = null;
        TableHandler = null;
        MO = null;
        Main = null;
    }
})();

