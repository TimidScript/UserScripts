// ==UserScript==
// @name            [TS] Linx Amender
// @namespace       TimidScript
// @version         3.0.27b
// @description     Generic tracking/redirection/open-in-new-tab removal; Amend page title; URL redirector; and more power functionality. Has rules for Pixiv, deviantArt, twitter, youtube, blogger, Batota etc.
// @icon            https://i.imgur.com/WznrrlJ.png
// @author          TimidScript
// @homepageURL     https://openuserjs.org/users/TimidScript
// @copyright       © 2014 TimidScript, All Rights Reserved.
// @license         Creative Commons BY-NC-SA + Please notify me if distributing
// @include         *
// @require         https://openuserjs.org/src/libs/TimidScript/TSL_-_Generic.js
// @require         https://openuserjs.org/src/libs/TimidScript/TSL_-_Draggable_Table_Rows.js
// @require         https://openuserjs.org/src/libs/TimidScript/TSL_-_GM_Update.js
// @homeURL         https://openuserjs.org/scripts/TimidScript/[TS]_Linx_Amender
// @grant           GM_registerMenuCommand
// @grant           GM_getValue
// @grant           GM_setValue
// @grant           GM_deleteValue
// @grant           GM_listValues
// @grant           GM_xmlhttpRequest
// @grant           GM_setClipboard
// @run-at          document-start
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


Order of rule execution
 - URL Rules (Does not run in iframes)
 - Title Rules (Does not run in iframes)
 - CSS Rules
 - Script Rules
 - Attrib & Click in Order

Hotkey F9       - Brings up settings window
Hotkey Alt+F9   - Brings up settings window + ForceUpdate

Online Rules URL Default:
https://github.com/TimidScript/GreasyMonkey/raw/master/data/LinxAmenderRules.txt

Default Online Rules can be set using GM_setValue
GM_setValue("OnlineRulesURL", "https://newlocation/LinxAmenderRules.txt");

------------------------------------
 Version History
------------------------------------
3.0.27 (2015-05-22)
 - A fix for uBlock users. https://greasyfork.org/en/forum/discussion/4308/
 - Removed onload event (changes 3.0.26) and MO.reConnect timeout to fix the issue mentioned in previous 3.0.26.
3.0.26 (2015-04-22)
 - Bug Fix: MO does not always capture changes when document is loaded in background. Added onload event which parses
 all links.
3.0.25 (2014-01-16)
 - Temporary fix for FireFox 35 security increase until GreaseMonkey update.  https://github.com/greasemonkey/greasemonkey/issues/2033
3.0.24 (2014-11-29)
 - Slight changes to html styling
3.0.23 (2014-10-18)
 - Fix for "Error: Permission denied to access property 'handler'"
   http://stackoverflow.com/questions/24719256/error-permission-denied-to-access-property-handler
3.0.22 (2014-10-12)
 - Bug fix: amendNodes removal of attributes
 - Pixiv bookmark add exclude added
3.0.21 (2014-10-01)
 - Bug fix: was skipping one node for every 50 (max=n+50) nodes parsed in the amendNodes.parseNodes
 for loop.
3.0.20 (2014-09-23)
 - Last fix was a failure. MutationObserver still causes huge lagging. Might be better
 just to have an interval timer with a parsed tag. One more try at fixing it, by going
 back to disconnect.
 - If no rules are present at site the MO is disconnected. Can be reconnected if you
 refresh, create/enable title rules.
3.0.19 (2014-09-22)
 - Much more efficient than before with less hanging
 - Slight delay before parsing as it seems to cause issues with some sites utilising ajax.
 - amendNodes now runs asynchronous to stop hanging the browser when the webpage is large. This
 problem is mainly caused with auto-paging scripts like Schmoogle.
 - Changed the order of execution. CSS Rules now runs in iframes and they are executed after
 Title Rules.
 - Using busy flag to capture all changes now and no longer disconnecting the MutationObserver.
 This fixes a lot of issues caused by pages with lots of nodes to parse through.
3.0.18 (2014-09-18)
 - Bug fixes for G-Chrome
   - onkeydown replaced with onkeyup as it is not fired in G-Chrome
   - table not showing text and needs to be put in span
   - Settings are lost in g-chrome. Reaseon unknown
3.0.17 (2014-09-07)
 - Removed logging
 - Using TSL-Generic addScript functionality
 - Bug Fix: Script rules where running at the same time as Attrib and Click. Now they have their
 own function.
3.0.16 (2014-08-29)
 - Added GM_update
 - Check if update URL is valid
 - Bug Fix: Skip CSS rules in amendNodes
3.0.15 (2014-08-21) First public release
 - Replacement of the previous scripts "[TS] Direct Outgoing Links" and "[TS] Title Amender"
 - Starts with version 3.#.#
 - Ability to amend node attributes
 - Ability to amend page title
 - Ability to amend page URL (redirect)
 - Ability to imitate mouse clicks function
 - Ability to add simply javascripts
 - Ability to add CSS script
 - Import "[TS] Direct Outgoing Links" exports
 - Import "[TS] Title Amender" exports
Some of the script that I have that it replaces
    - [TS] Youtube Secure
    - [TS] Direct Outgoing Links
    - [TS] Title Amender
    - [TS] Blogger NCR
    - [TS] Voltaire Network Language Picker

********************************************************************************************/

if (window === window.top) console.info("[TS] Linx Amender: " + document.location.host);
else console.info("[TS] Linx Amender iframe: " + document.location.host);

/* Global Variables
==============================================================================================
  Global Variables
==============================================================================================*/
var iDocument = document;
var isOnline = false;
var log = {};

/*
==================================================================================
==================================================================================*/
var DialogPaste =
{
    show: function ()
    {
        DialogMain.hideControlBar(true);

        var dialog = TSL.createElementHTML('<div id="LinxPasteDialog"><div style="background-color: #FFFFBC; border-top: 1px black solid; padding: 5px 5px; margin: 0 2px;">Copy the Linx Rules you want from another profile and then you can paste them here (ctrl-v) and press accept totransfer them onto this profile.</div><div style="text-align: center;"><textarea id="LinxPasteText" rows="8" wrap="off" style="width: 99%; resize: vertical;"></textarea></div><div class="solidBar"><input id="LinxPImport" type="button" value="Import" /><input id="LinxPCancel" type="button" value="Cancel" /></div></div>', iDocument);
        iDocument.body.appendChild(dialog);

        iDocument.getElementById("LinxPImport").onclick = DialogPaste.cbPasteImport;
        iDocument.getElementById("LinxPCancel").onclick = DialogPaste.cbPasteCancel;
    },

    cbPasteCancel: function (e)
    {
        TSL.removeNode("LinxPasteDialog", iDocument);
        DialogMain.hideControlBar(false);
    },

    importRules: function (data)
    {
        var rules = data.split("\n");

        for (var i = 0; i < rules.length; i++)
        {
            if (!rules[i].trim() || rules[i][0] == "/") continue;
            var rule = JSON.parse(rules[i]);
            if (!rule.id) continue;
            var id = rule.id;
            delete rule.id;

            if (GM_getValue(id) && !confirm("Rule with same ID already exists; would you like to override it"))
                id = id[0] + new Date().getTime();

            DialogEdit.saveRuleCompact(id, rule, true);
        }
    },

    cbPasteImport: function (e)
    {
        DialogPaste.importRules(iDocument.getElementById("LinxPasteText").value);

        DialogMain.hideControlBar(false);
        DialogMain.populateTable();
        TSL.removeNode("LinxPasteDialog", iDocument)
    }
};


/*
==================================================================================
==================================================================================*/
var DialogEdit =
{
    show: function (rule, id)
    {
        DialogMain.hideControlBar(true);

        var dialog = TSL.createElementHTML('<div id="LinxEditDialog"><div class="solidBar" style="text-align: center;"><b>Linx Rule Editor</b></div><table id="LinxEdit"><tbody><tr><td style="min-width: 140px;">Name</td><td style="width: 99%;"><input id="RuleName" type="text" /></td></tr><tr><td>URLs <sup>1</sup></td><td><textarea id="RuleURLs" title="Regular expression for website URLs these rules apply to" style="resize: vertical; height: 50px;"></textarea></td></tr><tr id="RowScr"><td>Javascript Code <sup>4</sup></td><td><textarea id="RuleScript" title="Javascript code" style="resize: vertical; height: 100px;"></textarea></td></tr><tr id="RowVar"><td>Script Variables <sup>5</sup></td><td><input id="RuleScriptValues" type="text" /></td></tr><tr id="RowSel"><td>Node Selectors <sup>2</sup></td><td><input id="RuleSelectors" type="text" value="a" title="Value used in querySelector to get nodes" /><div id="nthNode" style="background-color: #FBE6A8; padding: 2px 5px; margin: 0 -1px; border-bottom: 1px solid black;">(n =<input id="RuleNth" type="text" value="0" style="width: 25px; text-align: right;" />) Apply rule on the nth node. "0" implies all the nodes.</div></td></tr><tr id="RowReg"><td title="Uses regular expression to change node attribute value">Attribute Rules <sup>3</sup></td><td><table id="RegexesTable" class="class3Columns"><tbody><tr><td><input type="text" title="Attribute name whose content you wish to change" /></td><td><div><input type="text" title="Regular expression search value." style="width: 47%" /><input type="text" title="Regular expression replace value." style="width: 47%" /></div></td><td><button>-</button><button>+</button>↓ Drag ↑</td></tr></tbody></table></td></tr><tr><td title="Sample Website URL">Sample Website</td><td><input id="RuleSampleURL" type="text" /></td></tr><tr id="RowDes"><td title="Rule Description">Description</td><td><textarea id="RuleDescription" title="Description of what the rule does" style="resize: vertical; height: 50px;"></textarea></td></tr><tr><td colspan="2" style="border-top: 1px black solid; background-color: #FFFFCE; padding: 5px; font-size: small;"><div id="TGuide" style="text-align: center; margin: 0px; padding: 3px; background-color: yellow; color: red; cursor: pointer;"><b>Click to toggle the Guide</b></div><ol id="OL" style="padding: 0 20px; margin: 0; display: none;"><li>List of URLs, that the Linx Rule works on, separated by newlines. Takes&nbsp;<a href="http://www.w3schools.com/jsref/jsref_obj_regexp.asp">regular expression</a>.&nbsp;To perform a literal URL string search start the value with the escape character "@".To negate (exclude) a URL start it with the character "¬". A negate (exclude) URL should first have the "¬" character; example "¬@" and not "@¬".</li><li>Value used in "<a href="http://www.w3schools.com/jsref/met_element_queryselector.asp">querySelectorAll</a>" to get nodes.</li><li><ul style="padding: 0 10px;"><li>If the attribute name starts with "=" character it treats the text as object key. Example "=textContent" or "=innerHTML" to do search & replace on the elements content instead of attribute. Be careful when editing the node&quot;s "innerHTML" and especially the "outerHTML" properties, as bad edits can lead to infinite loop.</li><li>To remove an attribute start the name value with "-"; example: name="-target" & search="_blank" removes "target" attribute if the value is "_blank". Search="" implies remove the attribute without checking the attribute value.</li><li>To create an attribute start the name with the value "+". The search string will be ignored, while the replace string will be used to set the attribute value.</li><li>Search value takes regular expressions. Default search is case insensitive and global. To toggle them start search value with: "@1" = sensitive; "@2" = global off; "@3" = sensitive & global off.</li></ul></li><li>A JS script that is added to the document on load. NOT recommended except on rare occasions, for exceptionally short scripts that are not deserving, in their own right, a complete user script.</li><li>Defined <b>string</b> variables separated by semi-clone, that are accessed through the JS code using "LA_get". example <code>LA_get("lang");</code> in source code [4] and in Variable [5] it&quot;s <code>lang=en;</code>. Look at the "Online Rules" script rules for functioning examples.</li></ol></td></tr></tbody></table><div class="solidBar"><input id="LinxRuleA" type="button" value="Attribute Rule" ruletype="1" style="float: left;" /><input id="LinxRuleT" type="button" value="Title Rule" ruletype="2" style="float: left;" /><input id="LinxRuleU" type="button" value="URL Rule" ruletype="3" style="float: left;" /><input id="LinxRuleC" type="button" value="Click Rule" ruletype="4" style="float: left;" /><input id="LinxRuleS" type="button" value="Script Rule" ruletype="5" style="float: left;" /><input id="LinxRuleX" type="button" value="CSS Rule" ruletype="6" style="float: left;" /><input id="LinxEAccept" type="button" value="Accept" /><input id="LinxECancel" type="button" value="Cancel" /></div></div>', iDocument);
        iDocument.body.appendChild(dialog);
        var btn = iDocument.getElementById("TGuide");
        btn.onclick = function () { var OL = iDocument.getElementById("OL"); OL.style.display = (OL.style.display) ? null : "none"; };

        TSRegisterTable(iDocument.getElementById("RegexesTable"), function ()
        {
            DialogEdit.adjustRuleREButtons();
        });
        DialogEdit.adjustRuleREButtons();

        var ipts = iDocument.getElementsByClassName("solidBar")[1].getElementsByTagName("input");
        for (var i = 0; i < ipts.length; i++) ipts[i].onclick = DialogEdit.adjustEditButtons;
        ipts[0].click();

        iDocument.getElementById("LinxEAccept").onclick = DialogEdit.cbAccept;
        iDocument.getElementById("LinxECancel").onclick = DialogEdit.cbCancel;

        if (!rule) return;

        //------------ Fill edit form ------------ //
        if (id) iDocument.getElementById("LinxEdit").ruleID = id;

        setValue(iDocument.getElementById("RuleName"), rule.name);
        setValue(iDocument.getElementById("RuleDescription"), rule.description);
        setValue(iDocument.getElementById("RuleURLs"), rule.URLs);


        setValue(iDocument.getElementById("RuleSampleURL"), rule.sampleURL);
        setValue(iDocument.getElementById("RuleNth"), rule.nthNode, 0);
        setValue(iDocument.getElementById("RuleScript"), rule.script, "");
        setValue(iDocument.getElementById("RuleScriptValues"), rule.scriptVariables);

        //Save all settings even though rule type may note require it
        setValue(iDocument.getElementById("RuleSelectors"), rule.selectors);

        ipts[rule.type - 1].click();

        addRegexes(rule.regexes);
        DialogEdit.adjustRuleREButtons();

        function setValue(el, value, defaultValue)
        {
            if (defaultValue == undefined) defaultValue = "";
            el.value = (value) ? value : defaultValue;
        }

        function addRegexes(rules)
        {
            var tb = iDocument.getElementById("RegexesTable");

            for (var i = 0; i < rule.regexes.length; i++)
            {
                var row = tb.rows[i];
                if (i > 0)
                {
                    row = tb.insertRow(-1);
                    row.innerHTML = tb.rows[0].innerHTML;
                }

                var ipts = row.getElementsByTagName("input");

                setValue(ipts[0], rule.regexes[i].name);
                setValue(ipts[1], rule.regexes[i].search);
                setValue(ipts[2], rule.regexes[i].replace);
            }
        }
    },

    adjustEditButtons: function (e)
    {
        var ruleType = this.getAttribute("ruletype");

        iDocument.getElementById("RegexesTable").className = (ruleType == 1) ? "class3Columns" : "class2Columns";

        iDocument.getElementById("RowReg").cells[0].innerHTML = this.value + "s <sup>3</sup>";
        iDocument.getElementById("RowScr").cells[0].innerHTML = (ruleType == 5) ? "Javascript Code <sup>4</sup>" : "CSS Code";

        iDocument.getElementById("RowSel").style.display = (ruleType == 1 || ruleType == 4) ? null : "none";
        iDocument.getElementById("RowReg").style.display = (ruleType < 4) ? null : "none";
        iDocument.getElementById("RowDes").style.display = (ruleType == 2) ? "none" : null;
        iDocument.getElementById("RowScr").style.display = (ruleType >= 5) ? null : "none";
        iDocument.getElementById("RowVar").style.display = (ruleType == 5) ? null : "none";


        var ipts = this.parentElement.getElementsByTagName("input");
        for (var i = 0; i < 6; i++) ipts[i].style.color = null;
        this.style.color = "#FF04FF";
    },


    //Adjust the regex buttons in the rules table
    adjustRuleREButtons: function ()
    {
        var tb = iDocument.getElementById("RegexesTable");
        var btns = tb.getElementsByTagName("button");
        for (var i = 0; i < btns.length; i++)
        {
            if ((i + 1) % 2 == 1)
            {
                btns[i].onclick = DialogEdit.cbRuleRemove;
                btns[i].removeAttribute("disabled");
            }
            else
            {
                btns[i].onclick = DialogEdit.cbRuleAdd;
                btns[i].style.visibility = (i + 1 < btns.length) ? "hidden" : null;
            }
        }
        if (tb.rows.length == 1) btns[0].disabled = true;
    },

    //Compacts rule before saving
    saveRuleCompact: function (id, rule, keepTimeStamp)
    {
        //Remove duplicate URLs and empty lines
        if (rule.URLs)
        {
            var urls = rule.URLs.split("\n");
            for (var i = 0; i < urls.length; i++)
            {
                if (urls[i].trim().length == 0)
                {
                    urls.splice(i, 1);
                    --i;
                }
                else for (var j = i + 1; j < urls.length; j++)
                    {
                    if (urls[i] == urls[j])
                    {
                        urls.splice(j, 1);
                        --j;
                    }
                }
            }
            rule.URLs = urls.join("\n");
        }

        //Remove properties with empty string
        //for (var key in rule) if (!rule[key]) delete rule[key];


        var regexes = rule.regexes
        //Remove empty or unwanted regex values
        for (var i = 0; i < regexes.length; i++)
        {
            var regi = regexes[i];

            //Remove empty properties
            for (var key in regi)
            {
                if (!regi[key]) delete regi[key];
            }

            //Remove useless regexes
            if ((rule.type != 2 || rule.type != 3) //URL and Title
                && (!regi.name || regi.name.trim().length == 0)
                && (!regi.search || regi.search.trim().length == 0)
                && (!regi.replace || regi.replace.trim().length == 0))
            {
                regexes.splice(i, 1);
                --i;
            }
        }

        //Remove duplicate regexes
        for (var i = 0; i < regexes.length; i++)
        {
            var regi = regexes[i];

            for (var j = i + 1; j < regexes.length; j++)
            {
                var regj = regexes[j];
                if (regi.name == regj.name && regi.search == regj.search && regi.replace == regj.replace)
                {
                    regexes.splice(j, 1);
                    --j;
                }
            }
        }

        if (!keepTimeStamp || !rule.timestamp) rule.timestamp = new Date().getTime();
        GM_setValue(id, JSON.stringify(rule));
    },

    cbCancel: function (e)
    {
        TSL.removeNode("LinxEditDialog", iDocument);
        DialogMain.hideControlBar(false);
    },

    cbAccept: function (e)
    {
        var rule = new Object();

        AddDataItem("name", iDocument.getElementById("RuleName").value);
        AddDataItem("URLs", iDocument.getElementById("RuleURLs").value);
        if (rule.type != 4) AddDataItem("description", iDocument.getElementById("RuleDescription").value);
        AddDataItem("sampleURL", iDocument.getElementById("RuleSampleURL").value);
        AddDataItem("nthNode", iDocument.getElementById("RuleNth").value);
        AddDataItem("script", iDocument.getElementById("RuleScript").value);
        AddDataItem("scriptVariables", iDocument.getElementById("RuleScriptValues").value);

        var ipts = iDocument.getElementsByClassName("solidBar")[1].getElementsByTagName("input");

        for (var i = 0; i < 6; i++)
            if (ipts[i].style.color) rule.type = i + 1;

        //Only need for Attribute Rule
        AddDataItem("selectors", iDocument.getElementById("RuleSelectors").value);


        //Fill the RegexesTable
        rule.regexes = new Array(0);
        var rows = iDocument.getElementById("RegexesTable").rows;
        for (var i = 0; i < rows.length; i++)
        {
            var ipts = rows[i].getElementsByTagName("input");

            var regex = new Object();
            if (ipts[0].value) regex.name = ipts[0].value;
            if (ipts[1].value) regex.search = ipts[1].value;
            if (ipts[2].value) regex.replace = ipts[2].value;

            rule.regexes.push(regex);
        }

        var name = iDocument.getElementById("LinxEdit").ruleID;
        if (name)
        {
            var r = GM_getValue(name);
            if (r)
            {
                r = JSON.parse(r)
                rule.enabled = r.enabled
            }
        }
        else
        {
            name = "L" + new Date().getTime();
            rule.enabled = true;
        }

        DialogEdit.saveRuleCompact(name, rule);

        DialogMain.hideControlBar(false);
        DialogMain.populateTable();
        DialogMain.saveOrder();

        TSL.removeNode("LinxEditDialog", iDocument);
        if (rule.type == 2) ParseNodes(true);

        function AddDataItem(name, val)
        {
            if (val && val.trim()) rule[name] = val;
        }
    },

    cbRuleAdd: function (e)
    {
        var tb = this.parentElement.parentElement.parentElement.parentElement;
        var row = tb.insertRow(-1);
        row.innerHTML = tb.rows[0].innerHTML;
        var ipts = row.getElementsByTagName("input");
        for (var i = 0; i < ipts.length; i++) ipts[i].value = "";

        DialogEdit.adjustRuleREButtons();
    },

    cbRuleRemove: function (e)
    {
        TSL.removeNode(this.parentElement.parentElement);
        DialogEdit.adjustRuleREButtons();
    }
};

/*
==================================================================================
==================================================================================*/
var DialogMain =
{
    show: function (forceUpdate)
    {
        if (document.getElementById("LinxFrame")) return;

        var iframe = TSL.createElement(
            "iframe",
                {
                    "id": "LinxFrame",
                    "style": "position: fixed; top: 0px; left: 0px; right: 0px; border: none; height: 100%; width: 100%; z-index: 9999999999999999999999999; background-color: rgba(128, 128, 128,0.25);"
                });

        iframe.onload = function ()
        {
            iDocument = iframe.contentDocument || iframe.contentWindow.document;

            TSL.addStyle(null, '#LinxMain{position: fixed;min-width: 800px;border: 1px solid black;background-color: #488AC7;left: 10px;right: 10px;top: 10px;bottom: 10px;z-index: 1;}.gradientBar{background-image: linear-gradient(bottom, rgb(72, 138, 199 ) 37%, rgb( 92, 179, 255 ) 69%);background-image: -o-linear-gradient(bottom, rgb(72, 138, 199 ) 37%, rgb( 92, 179, 255 ) 69%);background-image: -moz-linear-gradient(bottom, rgb(72, 138, 199 ) 37%, rgb( 92, 179, 255 ) 69%);background-image: -webkit-linear-gradient(bottom, rgb(72, 138, 199 ) 37%, rgb( 92, 179, 255 ) 69%);background-image: -ms-linear-gradient(bottom, rgb(72, 138, 199 ) 37%, rgb( 92, 179, 255 ) 69%);background-image: -webkit-gradient( linear, left bottom, left top, color-stop(0.37, rgb(82,106,179)), color-stop(0.69, rgb(157,117,217)));font-weight: bold;padding: 1px 5px;}.gradientBar input[type="button"]{width: 120px;}.solidBar{background-color: #E0F0FF;border: 1px black solid;padding: 5px 5px;text-align: right;}.solidBar input[type="button"]{width: 100px;}#LinxTable{border-spacing: 1px;background-color: gray;width: 100%;user-select: none;-ms-user-select: none;-moz-user-select: none;-webkit-user-select: none;}#LinxTable td{padding: 0 5px;}#LinxTable td button:last-child{margin-right: 10px;}#LinxTable tr:hover{background-color: yellow !important;}#LinxTable.localRules tr:nth-child(odd){background-color: #E0F0FF;}#LinxTable.localRules tr:nth-child(even){background-color: #F0FFF0;}#LinxTable.onlineRules tr:nth-child(odd){background-color: #E9DBF7;}#LinxTable.onlineRules tr:nth-child(even){background-color: #F7DBF4;}.btnEnabled, .btnDisabled, .rowBtn, .btnCA, .btnCT, .btnCU, .btnCC, .btnCS, .btnCX{border-radius: 3px;font-size: 11px;margin: 2px 1px;display: inline-block;padding: 0 2px 0 2px;border: 1px groove;text-align: center;}.inputHolder{display: inline-block;width: 200px;}.inputHolder > button{display: inline-block;font-size: 12px;border-radius: 3px;padding: 0 2px 0 2px;border: 1px groove;text-align: center;width: 20px;margin: 0 0 0 2px;}.inputHolder > button:nth-child(1){margin-right: 6px;}.inputHolder > button:hover{color: black;}.inputHolder > input{margin-left: 35px;}.btnCA, .btnCT, .btnCU, .btnCC, .btnCS, .btnCX{width: 40px;margin: 2px 10px;}.btnCA{border-color: #895EB6;background-color: #D8C2EF;color: #895EB6;}.btnCT{border-color: #FF5572;background-color: #FDCFD7;color: #FF5572;}.btnCU{border-color: #3970CD;background-color: #96C5EF;color: #3970CD;}.btnCW{border-color: #A21C0F;background-color: #F51601;color: #A21C0F;}.btnCC{border-color: #C88517;background-color: #FBCD5A;color: #C88517;}.btnCS{border-color: #9C8F3F;background-color: #FDF797;color: #9C8F3F;}.btnCX{border-color: #0A9783;background-color: #10E7C9;color: #0A9783;}a .btnCA, a .btnCT, a .btnCU, a .btnCC, a .btnCS, a .btnCX{cursor: pointer;text-decoration: underline;}.btnEnabled, .btnCD{border-color: #015601;background-color: #BFFBBF;color: #015601;}.btnDisabled{border-color: #808080;background-color: #DBDADA;color: #808080;}.rowBtn{width: 40px;border-color: #08850A;background-color: #8EEB94;color: #08850A;}.rowBtn:hover, .btnEnabled:hover, .btnDisabled:hover{color: red;}td span.rowBtn:last-child{margin: 10px;}.rowSelected{background-color: yellow !important;}</style><style type="text/css">#LinxEditDialog, #LinxPasteDialog{position: fixed;width: 80%;min-width: 800px;border: 1px double #000000;left: 0;right: 0;margin: 50px auto;padding: 3px;background-color: #BABAB3;z-index: 100;}#LinxEdit{width: 100%;background-color: #FFFFBC;border: 1px solid black;padding: 5px 0 0 0;}#LinxEdit input, #LinxEdit textarea{width: 99%;}#LinxURLs{resize: vertical;}#RegexesTable{width: 100%;text-align: left;cursor: pointer;user-select: none;-ms-user-select: none;-moz-user-select: none;-webkit-user-select: none;background-color: #E5DEAE;}#RegexesTable tr td:last-child{width: 140px;}.class2Columns tr td:first-child{display: none;}.class3Columns td:nth-child(1){width: 100px;}.class3Columns input:nth-child(1){width: auto;}.class3Columns tr td:nth-child(2){text-align: center;}code{background-color: #CDC6C6;}', iDocument);
            TSL.addStyle(null, '#LinxEditDialog, #LinxPasteDialog{position: fixed;width: 80%;min-width: 800px;border: 1px double #000000;left: 0;right: 0;margin: 50px auto;padding: 3px;background-color: #BABAB3;z-index: 100;}#LinxEdit{width: 100%;background-color: #FFFFBC;border: 1px solid black;padding: 5px 0 0 0;}#LinxEdit input, #LinxEdit textarea{width: 99%;}#LinxURLs{resize: vertical;}#RegexesTable{width: 100%;text-align: left;cursor: pointer;user-select: none;-ms-user-select: none;-moz-user-select: none;-webkit-user-select: none;background-color: #E5DEAE;}#RegexesTable tr td:last-child{width: 140px;}.class2Columns tr td:first-child{display: none;}.class3Columns td:nth-child(1){width: 100px;}.class3Columns input:nth-child(1){width: auto;}.class3Columns tr td:nth-child(2){text-align: center;}code{background-color: #CDC6C6;}', iDocument);
            TSL.addStyle(null, '.descriptionBox {background-color:#EDF4FF; padding: 0 4px; margin: 0 0 2px 240px; }', iDocument);
            TSL.addStyle(null, '.descriptionBox {background-color:#EDF4FF; padding: 0 4px; margin: 0 0 2px 240px; }', iDocument);
            TSL.addStyle(null, '.gradientBar sub {color: cyan;} .gradientBar sub a {color: yellow !important;}', iDocument);

            var dialog = TSL.createElementHTML('<div id="LinxMain"><div class="gradientBar"><img src="http://i.imgur.com/WznrrlJ.png?1" style="height: 24px; vertical-align: middle;" /><span style="color: yellow;">TimidScript - Linx Amender</span><sub style="padding-left: 5px;">If you like the script, rate & favour in <a href="https://openuserjs.org/scripts/TimidScript/%5BTS%5D_Linx_Amender">OUJS</a> / <a href="https://greasyfork.org/scripts/4407">GF</a></sub></div><div style="width: 100%; min-height: 200px; overflow-y: auto; background-color: #FFFFE8;"><table id="LinxTable" class="localRules"><tbody></tbody></table></div><div style="background-color: #F7EFC1; border-top: 1px black solid; padding: 0 5px; font-size: small;"><div id="ToggleUL" style="text-align: center; padding: 2px 0 3px 0; margin: 0; background-color: yellow; border-bottom: 1px black solid; color: red; cursor: pointer;"><b>Click to toggle the Guide</b></div><ul style="padding: 2px 20px; margin: 0; display: none;"><li>Rules are parsed first according to type and then table order. First (URL), then (Title), then (Script) and finally (Attribute & Click)</li><li>You can sort the rows by dragging them.</li><li>If you have some useful new <b>Linx Rules</b> or updates, please consider sharing them and make the "<b>Online Rules</b>" more comprehensive.&nbsp;Ctrl-Select the rules you want to share and press the "Copy Rules" button below and then paste the rule at the end of the&nbsp;<b>"Linx Rules"</b> thread found on&nbsp;<a href="https://github.com/TimidScript/GreasyMonkey/issues/1" target="_blank">GitHub</a>. If you do not have or wish to create a GitHub account then raise them on <a href="https://greasyfork.org/forum/discussion/1209/linx-amender-rules-thread">Greasy Fork</a>.<ul style="padding: 0 20px; margin: 0;"><li>Use descriptive names and if necessary fill out the rule description.</li><li>Title rules are not included in the online resource and should not be shared.</li><li>Third-party Script rules are most likely not going to be included as I would need to vouch for them</li><li>ID&quot;s of defunct rules should also be submitted.</li></ul></li><li>The copy button and the filter rule type buttons have alternative functionality when you press them with ctrl.</li><li>ctrl+m merges selected rules of the same type without removing the originals. Works only on Attribute, Title and URL rules.</li><li>F9 to bring up the this dialog</li></ul></div><div class="gradientBar"><span class="inputHolder"><button class="btnCD" title="Display Rule Description"><b>D</b></button><button class="btnCW" title="Current Website filter"><b>W</b></button><button class="btnCA" title="Attribute rule filter"><b>A</b></button><button class="btnCC" title="Click rule filter"><b>C</b></button><button class="btnCS" title="Script rule filter"><b>S</b></button><button class="btnCT" title="Title rule filter"><b>T</b></button><button class="btnCU" title="URL rule filter"><b>U</b></button><button class="btnCX" title="CSS rule filter"><b>X</b></button></span><input id="LinxSort" type="button" value="Sort Rules" /><input id="LinxSelectAll" type="button" value="Select All" /><input id="LinxSelectInverse" type="button" value="Inverse Selection" /><br /><span class="inputHolder"><input id="LinxNewRule" type="button" value="New Rule" /></span><input id="LinxOnlineRules" type="button" value="Online Rules" /><input id="LinxCopy" type="button" value="Copy Rules" /><input id="LinxPaste" type="button" value="Paste Rules" /><input id="LinxExit" type="button" value="Exit" style="margin-right: 5px; float: right; width: 100px;" /></div></div>', iDocument);
            iDocument.body.appendChild(dialog);

            var btns = iDocument.getElementsByClassName("gradientBar")[1].getElementsByTagName("input");
            for (var i = 0; i < btns.length; i++)
                btns[i].onclick = DialogMain.cbButtonClick;

            var btns = iDocument.getElementsByClassName("inputHolder")[0].getElementsByTagName("button");
            for (var i = 0; i < btns.length; i++)
                btns[i].onclick = DialogMain.cbFilter;

            DialogMain.populateTable();
            btns[1].click(); //Disable Website filter

            TSRegisterTable(iDocument.getElementById("LinxTable"),
                function (complete)
                {
                    if (complete) DialogMain.saveOrder();
                });

            DialogMain.onlineRulesUpdate(forceUpdate);

            DialogMain.cbWindowResized();
            window.onresize = DialogMain.cbWindowResized;

            iDocument.getElementById("ToggleUL").onclick = function (e)
            {
                this.nextElementSibling.style.display = (this.nextElementSibling.style.display) ? null : "none";
                DialogMain.cbWindowResized();
            };

            iDocument.onkeydown = DialogMain.cbKeyDown;
        }


        document.body.appendChild(iframe);
    },

    populateTable: function (sort)
    {
        var table = iDocument.getElementById("LinxTable");
        table.firstElementChild.innerHTML = "";

        var rules = GetOrderedRules();
        for (var i = 0; i < rules.length; i++)
        {
            if ((isOnline && rules[i].id[0] == "O") || (!isOnline && rules[i].id[0] == "L"))
                DialogMain.addRuleRow(rules[i], isOnline);
        }

        if (sort)
        {
            var rows = table.rows;

            for (var i = 0; i < rows.length - 1; i++)
            {
                for (var j = i + 1; j < rows.length; j++)
                {
                    if (rows[i].getAttribute("name").toLowerCase() > rows[j].getAttribute("name").toLowerCase())
                        table.firstElementChild.insertBefore(rows[j], rows[i]);
                }
            }

            DialogMain.saveOrder();
        }

        DialogMain.descriptionBoxDisplay();
        DialogMain.cbFilter();
    },

    addRuleRow: function (rule, online)
    {
        var row = iDocument.getElementById(name);
        if (!row)
        {
            row = iDocument.getElementById("LinxTable").insertRow(-1);
            row.id = rule.id;
        }

        var name = (rule.name) ? rule.name : "";

        row.setAttribute("name", name);
        row.title = (rule.description) ? rule.description : name;

        var html = '<td>' + ((rule.timestamp) ? "<span style='float:right'>[" + rule.timestamp + "]</span>" : "") + '<button class="btnEnabled">Enabled</button>';

        //GM_setValue("AccessLevel", 2);
        if (online) html += '<button class="btnEnabled">Run First</button>' +
            ((GM_getValue("AccessLevel", 0) & 2)
            ? '<button class="rowBtn">Edit</button><button class="rowBtn">Copy</button><button class="rowBtn">Delete</button>'
            : '<button class="rowBtn">Copy</button>');
        else html += '<button class="rowBtn">Edit</button><button class="rowBtn">Copy</button><button class="rowBtn">Delete</button>';

        var url = (rule.sampleURL && rule.sampleURL.match(/^https?:\/\/[a-z0-9-\.]+\.[a-z]{2,4}\/?([^\s<>\#%"\,\{\}\\|\\\^\[\]`]+)?$/));

        var idC = ["btnCA", "btnCT", "btnCU", "btnCC", "btnCS", "btnCX"], idS = ["Attrib", "Title", "URL", "Click", "Script", "CSS"];

        html += ((url) ? '<a target="_blank" href="' + rule.sampleURL + '">' : '')
            + '<button class=' + idC[rule.type - 1] + ">" + idS[rule.type - 1];

        if (rule.description) rule.description = rule.description.replace("\n", "<br/>");

        html += '</button>' + ((url) ? "</a>" : "") + "<span>" + name + "</span>"
            + ((rule.description) ? '<div class="descriptionBox">' + rule.description + "<div>" : "")
            + '</td>';

        row.innerHTML = html;

        var btns = row.getElementsByTagName("button");
        btns[0].className = (rule.enabled) ? "btnEnabled" : "btnDisabled";
        if (online) btns[1].className = (rule.runFirst) ? "btnEnabled" : "btnDisabled";

        for (var i = 0; i < btns.length; i++)
            btns[i].onclick = DialogMain.cbRowButtonClick;

        row.onclick = DialogMain.cbRowClick;
    },

    hideControlBar: function (hide)
    {
        var btns = iDocument.getElementsByClassName("rowBtn");
        for (var i = 0; i < btns.length; i++) btns[i].disabled = (hide) ? "disabled" : null;

        var lm = iDocument.getElementById("LinxMain");
        var g = lm.getElementsByClassName("gradientBar")[1];

        g.style.visibility = (hide) ? "hidden" : null;
    },

    saveOrder: function ()
    {
        var rows = iDocument.getElementById("LinxTable").rows;

        var ids = new Array();
        for (var i = 0; i < rows.length; i++)
        {
            ids.push(rows[i].id);
        }

        GM_setValue(((isOnline) ? "RuleOrderO" : "RuleOrderL"), ids.join());
    },

    deselectRows: function (hiddenOnly)
    {
        var rows = iDocument.getElementById("LinxTable").rows;

        for (var i = 0; i < rows.length; i++)
        {
            if (!hiddenOnly || (hiddenOnly && rows[i].style.display == "none"))
                rows[i].className = rows[i].className.replace(/\s*rowSelected\s*/gi, "");
        }
    },

    descriptionBoxDisplay: function (hidden)
    {
        var name = (isOnline) ? "HideDescriptionO" : "HideDescriptionL";

        if (hidden === undefined)
        {
            hidden = GM_getValue(name, !isOnline);
            if (hidden) iDocument.getElementsByClassName("btnCD")[0].className = "btnCD btnDisabled";
            else iDocument.getElementsByClassName("btnCD")[0].className = "btnCD";
        }
        else GM_setValue(name, hidden);

        if (hidden) TSL.addStyle("dbHidden", ".descriptionBox { display: none; }", iDocument);
        else TSL.removeNode("dbHidden", iDocument);
    },

    cbWindowResized: function (e)
    {
        var lm = iDocument.getElementById("LinxMain");
        var total = lm.children[0].clientHeight + lm.children[3].clientHeight + lm.children[2].clientHeight;
        lm.children[1].style.height = (lm.clientHeight - total) + "px";
        lm.children[1].style.minHeight = lm.children[1].style.height + "px";
    },

    cbButtonClick: function (e)
    {
        switch (this.id)
        {
            case "LinxExit":
                TSL.removeNode("LinxFrame");
                //GetOrderedRules();
                break;
            case "LinxNewRule":
                DialogEdit.show();
                break;
            case "LinxSort":
                if (!confirm("Sorting will lose current order. Do you wish to continue?")) return;
                DialogMain.populateTable(true);
                break;
            case "LinxSelectAll":
                var rows = iDocument.getElementById("LinxTable").rows;

                for (var i = 0; i < rows.length; i++)
                {
                    if (rows[i].style.display != "none")
                        rows[i].className = rows[i].className.replace(/\s*rowSelected\s*/gi, "") + " rowSelected";
                }
                break;
            case "LinxSelectInverse":
                var rows = iDocument.getElementById("LinxTable").rows;

                for (var i = 0; i < rows.length; i++)
                {
                    if (rows[i].style.display != "none")
                        rows[i].className = (rows[i].className.match("rowSelected"))
                            ? rows[i].className.replace(/\s*rowSelected\s*/gi, "") : rows[i].className + " rowSelected";
                }
                break;
            case "LinxCopy":
                var rules = "";
                var rows = iDocument.getElementById("LinxTable").rows;
                var count = 0;
                for (var i = 0; i < rows.length; i++)
                {
                    if (!rows[i].className.match("rowSelected")) continue;

                    var rule = GM_getValue(rows[i].id, null);
                    if (!rule) continue;
                    rule = JSON.parse(rule);
                    delete rule.runFirst; //Remove the online attribute if it exists

                    //To place ID at the front.
                    var out = new Object();
                    out.id = rows[i].id;
                    if (e.ctrlKey && !isOnline)
                    {
                        rule.id = out.id.replace("L", "O");
                        delete rule.enabled;
                    }
                    else if (e.ctrlKey && isOnline) rule.id = out.id.replace("O", "L");

                    for (var key in rule) out[key] = rule[key];

                    rules += JSON.stringify(out) + "\r\n";
                    count++;
                }
                if (count == 0) return;
                rules = rules.replace(/\r\n$/, "");
                GM_setClipboard(rules);
                if (e.ctrlKey) alert("[" + count + "] Selected rules have been converted to online rules and copied into the clipboard.");
                else alert("[" + count + "] Selected rules have been copied into the clipboard.");

                break;
            case "LinxPaste":
                DialogPaste.show();
                break;
            case "LinxOnlineRules":
                var tb = iDocument.getElementById("LinxTable");

                if (this.style.color)
                {
                    isOnline = false;
                    this.style.color = null;

                    tb.className = "localRules";
                }
                else
                {
                    isOnline = true;
                    this.style.color = "#F0F";
                    tb.className = "onlineRules";
                }

                DialogMain.populateTable();
                break;
        }
    },

    cbFilter: function (e)
    {
        var btns = iDocument.getElementsByClassName("inputHolder")[0].getElementsByTagName("button");

        if (e && e.ctrlKey) for (var i = 2; i < btns.length; i++) btns[i].className = ((btns[i] == this) ? btns[i].className.replace(/\s*btnDisabled\s*/, "") : btns[i].className.replace(/(\s*btnDisabled\s*)?$/, " btnDisabled"));
        else if (e) this.className = (this.className.indexOf("btnDisabled") >= 0) ? this.className.replace(/\s*btnDisabled\s*/, "") : this.className + " btnDisabled";

        var flag = 0;
        for (var i = 0; i < btns.length; i++)
        {
            if (btns[i].className.indexOf("btnDisabled") < 0) flag += Math.pow(2, (i + 1));
        }

        var rules = GetSiteRules(true);
        var tb = iDocument.getElementById("LinxTable");

        DialogMain.descriptionBoxDisplay(!(flag & 2)); //Hide description box


        for (var i = 0; i < tb.rows.length; i++)
        {
            var row = tb.rows[i];

            var display = (flag & 4) ? "none" : null;

            if (flag & 4) //Website filter flag
            {
                for (var j = 0; j < rules.length; j++)
                    if (row.id == rules[j].id) display = null;
            }

            if (!(flag & 8) && row.getElementsByClassName("btnCA").length == 1) display = "none";
            if (!(flag & 16) && row.getElementsByClassName("btnCC").length == 1) display = "none";
            if (!(flag & 32) && row.getElementsByClassName("btnCS").length == 1) display = "none";
            if (!(flag & 64) && row.getElementsByClassName("btnCT").length == 1) display = "none";
            if (!(flag & 128) && row.getElementsByClassName("btnCU").length == 1) display = "none";
            if (!(flag & 256) && row.getElementsByClassName("btnCX").length == 1) display = "none";

            row.style.display = display;
        }

        DialogMain.deselectRows(true); //Deselect hidden rows
        DialogMain.cbWindowResized();
    },


    cbRowButtonClick: function (e)
    {
        e.stopPropagation();

        //Attrib, Title or URL button pressed
        if (this.className.indexOf("btnC") == 0) return true;

        var row = this.parentElement.parentElement;
        var rule = GM_getValue(row.id);

        if (!rule)
        {
            TSL.removeNode(row);
            return true;
        }

        rule = JSON.parse(rule);
        switch (this.textContent)
        {
            case "Edit":
                DialogEdit.show(rule, row.id);
                break;
            case "Copy":
                date = new Date();
                rule.name = ((rule.name) ? rule.name : "") + " [Copy-" + row.id + "]";
                if (isOnline)
                {
                    var id = row.id.replace("O", "L");

                    if (GM_getValue(id) && !confirm("Rule with same ID already exists; would you like to override it"))
                        id = id[0] + new Date().getTime();

                    DialogEdit.show(rule, id);
                }
                else DialogEdit.show(rule);
                break;
            case "Delete":
                //if (e.ctrlKey || confirm("Are you sure you wish to delete the rule \"" + rule.name + "\"   [" + row.id + "]"))
                if (confirm("Are you sure you wish to delete the rule \"" + rule.name + "\"   [" + row.id + "]"))
                {
                    TSL.removeNode(row, iDocument);
                    GM_deleteValue(row.id);
                }
                break;
            case "Run First":
                rule.runFirst = !(this.className == "btnEnabled");
                GM_setValue(row.id, JSON.stringify(rule));
                this.className = (rule.runFirst) ? "btnEnabled" : "btnDisabled";
                if (rule.type == 2) ParseNodes(true);
                break;
            default:
                rule.enabled = !(this.className == "btnEnabled");
                GM_setValue(row.id, JSON.stringify(rule));
                this.className = (rule.enabled) ? "btnEnabled" : "btnDisabled";
                if (rule.type == 2) ParseNodes(true);
                break;
        }

        return true;
    },

    /*
        Highlights row if clicked on.
    -------------------------------------------------------------------------*/
    cbRowClick: function (e)
    {
        if (!e.ctrlKey) DialogMain.deselectRows();

        if (e.ctrlKey && this.className.match(/\s*rowSelected\s*/)) this.className = this.className.replace(/\s*rowSelected\s*/, "");
        else this.className = this.className.replace(/rowSelected/, "") + " rowSelected";
    },

    cbKeyDown: function (e)
    {
        if (!e.ctrlKey || e.keyCode != 77 || iDocument.getElementById("LinxEditDialog") || iDocument.getElementById("LinxPasteDialog")) return;

        var rules = new Array();
        var rows = iDocument.getElementById("LinxTable").rows;

        for (var i = 0; i < rows.length; i++)
        {
            if (rows[i].className.indexOf("rowSelected") < 0) continue;

            var name = rows[i].id;
            var rule = GM_getValue(name);

            if (rule)
            {
                rule = JSON.parse(rule);
                if (rule.type > 3) continue;
                rule.id = name;
                rules.push(rule);
            }
        }

        if (rules.length == 0) return;
        var mergedRuleCount = 0;
        for (var i = 1; i < 4; i++)
        {
            var mergedRule = new Object();

            mergedRule.URLs = "";
            mergedRule.regexes = new Array();
            mergedRule.selectors = "";
            mergedRule.type = i;
            var count = 0;
            var ids = "";

            for (var j = 0; j < rules.length; j++)
            {
                var rule = rules[j];
                if (rule.type != mergedRule.type) continue;
                count++;
                ids += rule.id + " + ";

                if (!mergedRule.name) mergedRule.name = rule.name;
                if (!mergedRule.description) mergedRule.description = rule.description;
                if (rule.URLs) mergedRule.URLs += rule.URLs + "\n";
                if (rule.selectors) mergedRule.selectors += rule.selectors + " , ";
                if (!mergedRule.nthNode) mergedRule.nthNode = rule.nthNode;
                if (rule.regexes) mergedRule.regexes = mergedRule.regexes.concat(rule.regexes);
                if (!mergedRule.sampleURL) mergedRule.sampleURL = rule.sampleURL;
            }

            if (count > 1)
            {
                mergedRuleCount++;
                mergedRule.name = mergedRule.name.replace(/ \[Merged \d+ Rules\]$/i, "") + " [Merged " + count + " Rules]";
                mergedRule.selectors = mergedRule.selectors.replace(/" , "$/, "");

                DialogEdit.saveRuleCompact(("L" + new Date().getTime()), mergedRule);
                log.log("Merged rules ", ids.replace(/ \+ $/, ""));
            }
        }

        if (mergedRuleCount)
        {
            DialogMain.populateTable();
            alert(mergedRuleCount + " merged rule(s) created. Merging can cause unintended consequence, so check the created rules.");
        }
    },

    onlineRulesUpdate: function (forceUpdate)
    {
        //----------- Do Online Rules Update -----------//
        var date1 = GM_getValue("OnlineRulesTimestamp", 0);
        var date2 = new Date().getTime();

        var diff = (date2 - date1) / (1000 * 60 * 60 * 24);

        //Number of days before online checking again.
        if (!forceUpdate && diff < 7) return;
        var url = GM_getValue("OnlineRulesURL", "https://github.com/TimidScript/GreasyMonkey/raw/master/data/LinxAmenderRules.txt");

        if (!url.match(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/i))
        {
            if (url.toLowerCase() != "disabled" && url.length != 0) log.error("Invalid update URL: ", url);
            return
        }
        GM_xmlhttpRequest({
            url: url,
            method: "GET",
            timeout: 5000,
            headers: { "User-agent": navigator.userAgent, "Accept": "text/html" },
            onload: function (response)
            {
                if (response.status == 200)
                {
                    log.log("Rules downloaded");
                    var rules = GetOrderedRules();

                    for (var i = 0; i < rules.length; i++)
                    {
                        if (rules[i].id[0] == "O")
                            GM_deleteValue(rules[i].id);
                    }

                    var strRules = response.responseText.replace(/("id":")L(\d+")/gi, "$1O$2"); //Change the rule type to Online if not already the case
                    strRules = strRules.replace(/,"enabled":true,/gi, ',"enabled":false,'); //Disable all rules
                    DialogPaste.importRules(strRules);

                    //Set the stored rule values for enabled and runFirst.
                    for (var i = 0; i < rules.length; i++)
                    {
                        if (rules[i].id[0] == "O" && (rules[i].enabled || rules[i].runFirst))
                        {
                            var rule = GM_getValue(rules[i].id);

                            if (!rule) continue;
                            rule = JSON.parse(rule);

                            rule.enabled = rules[i].enabled;
                            rule.runFirst = rules[i].runFirst;

                            GM_setValue(rules[i].id, JSON.stringify(rule));
                        }
                    }


                    GM_setValue("OnlineRulesTimestamp", new Date().getTime());
                    log.info("Downloaded Online Rules");
                    iDocument.getElementsByClassName("gradientBar")[0].innerHTML += " <span style='color: yellow;'>(Online Rules Updated)<span>";
                    DialogMain.populateTable();
                }
                else
                { log.error("Unable to get online rules: ", url); log.warn(response); }
            },
            ontimeout: function (response) { log.error("Unable to get online rules due to timeout error. URL: " + url); log.warn(response); },
            onerror: function (response) { log.error("Error trying to get online rule. URL: " + url); log.warn(response); }
        });
    }
};

/*
==================================================================================
 runFirstEnabled is only set when parsing through nodes. For listing in table you
 want the online rules to proceed the local rules.
==================================================================================*/
function GetOrderedRules(runFirstEnabled)
{
    var rules = new Array();

    var ruleOrder = GM_getValue("RuleOrderL", "");
    ruleOrder += "," + GM_getValue("RuleOrderO", "");


    //var names = GM_listValues();
    var names = cloneInto(GM_listValues(), window);
    //log.log(names);
    for (var i = 0; i < names.length; i++)
    {
        var name = names[i];
        if (!name.match(/^[ol]\d+$/i)) continue;

        var rule = GM_getValue(name);
        if (!rule) continue;

        rule = JSON.parse(rule);
        rule.id = name;

        for (var j = 0; j < rules.length; j++) //Insert it in the correct place
        {
            if ((runFirstEnabled && rule.runFirst && !rules[j].runFirst) || //Online rule runs before offline rule
               (ruleOrder.indexOf(rule.id) >= 0 && ruleOrder.indexOf(rule.id) < ruleOrder.indexOf(rules[j].id)))
            {
                rules.splice(j, 0, rule);
                rule = null;
                break;
            }
        }
        if (rule) rules.push(rule); //Hasn't been added so insert at the end
    }

    return rules;
}



function createRE(str, rule, regex, checkFlags)
{
    if (regex && regex.raised) return null;

    var re;
    try
    {
        var flags = "gi";
        if (checkFlags)
        {
            if (str.indexOf("@1") == 0) flags = "g";
            if (str.indexOf("@2") == 0) flags = "i";
            if (str.indexOf("@3") == 0) flags = "";

            if (flags != "gi") str = str.substr(2);
        }

        re = new RegExp(str, flags);
    }
    catch (err)
    {
        log.error(err);
        log.warn(rule.name + " [" + rule.id + "] : " + str);

        if (regex) regex.raised = true;
        return null;
    }

    return re;
}


/*
==================================================================================
 Returns an ordered array containing all the enabled rules that are relevant to
 the current site. Use forceEnable to enable it by force.
==================================================================================*/
function GetSiteRules(forceEnable)
{
    var rules = GetOrderedRules(true);
    var filterdRules = new Array();


    for (var i = 0; i < rules.length; i++)
    {
        var rule = rules[i];
        if (!forceEnable && (!rule.enabled || !rule.URLs)) continue;
        var URLs = rule.URLs.split("\n");
        var addRule = false;

        for (var j = 0; j < URLs.length; j++)
        {
            if (URLs[j].trim().length == 0) continue; //Skip it invalid URL

            var str = URLs[j];

            var negate = (str[0] == "¬");
            var literal = (str.search(/^¬?\@/) >= 0);

            str = str.replace(/^¬?\@/, "");

            if (literal) str = TSL.escapeRegExp(str);


            var re = new createRE(str, rule);

            var found = (document.URL.search(re) >= 0);

            if (negate && found)
            {
                addRule = false;
                break; //Negate overrides all other positive search
            }
            else if (!negate && found)
            {
                addRule = true;
            }
        }

        if (addRule) filterdRules.push(rule);
    }

    return filterdRules;
}

/*
==================================================================================
   Parses through nodes and applies relevant rules.
==================================================================================*/
function ParseNodes(resetTitle)
{
    var time = new Date().getTime();
    log.log("Parsing Nodes -: " + time);

    /* Reparse title to take into account rule changes. For links you need to
    refresh the page */
    if (resetTitle)
    {
        var title = document.head.getElementsByTagName("title")[0];
        if (title.original) title.textContent = title.original;
    }

    var rules = GetSiteRules();
    log.log("Parsing Nodes A: " + time + " (" + (new Date().getTime() - time) + ") Rule Count: " + rules.length);
    if (rules.length == 0)
    {
        MO.reConnect(true);
        return;
    }

    if (window === window.top)
    {
        amendURL(rules);
        if (document.readyState != "loading") amendPageTitle(rules);
    }

    if (document.readyState == "loading")
    {
        MO.reConnect();
        return;
    }

    if (!document.parsed)
    {
        document.parsed = true;
        appendCSS(rules);
        appendScripts(rules);
    }
    log.warn("Parsing Nodes B: " + time + " (" + (new Date().getTime() - time) + ")");
    amendNodes(rules);
    //setTimeout(amendNodes, 250, rules);



    /* Gets the rules regular expression parameter values
    ---------------------------------------------------------------------*/
    function getREParams(ruleRE)
    {
        var name = ((ruleRE.name) ? ruleRE.name : "").trim();
        var search = (ruleRE.search) ? ruleRE.search : "";
        var replace = (ruleRE.replace) ? ruleRE.replace : "";

        return { "name": name, "search": search, "replace": replace };
    }


    /* Apply rules to the document URL
    ---------------------------------------------------------------------*/
    function amendURL(rules)
    {
        var url = document.URL;
        for (var i = 0; i < rules.length ; i++)
        {
            var rule = rules[i];
            if (rule.type != 3) continue;

            for (var j = 0; j < rule.regexes.length; j++)
            {
                var reParms = getREParams(rule.regexes[j]);

                var re = createRE(reParms.search, rule, rule.regexes[i], true);
                if (re) url = url.replace(re, reParms.replace);
            }
        }

        if (url != document.URL) document.location = url;
    }

    /* Append CSS scripts to header
    ---------------------------------------------------------------------*/
    function appendCSS(rules)
    {
        if (document.head.appendedCSS) return;
        document.head.appendedCSS = true;

        for (var i = 0; i < rules.length ; i++)
        {
            if (rules[i].type == 6) TSL.addStyle(null, rules[i].script);
        }
    }


    /* Append JS Scripts to header
    ---------------------------------------------------------------------*/
    function appendScripts(rules)
    {
        for (var i = 0; i < rules.length ; i++)
        {
            var rule = rules[i];
            if (rule.type != 5 || document.getElementById(rule.id)) continue;

            log.warn("Adding JS script: " + rule.name + " [" + rule.id + "]");

            //Apply script variables
            if (rule.scriptVariables)
            {
                var vars = rule.scriptVariables.split(";");
                for (var j = 0; j < vars.length; j++)
                {
                    var v = vars[j].split("=");
                    if (v.length != 2) continue;

                    var s = "LA_get\\(['\"]" + TSL.escapeRegExp(v[0]) + "['\"]\\)";
                    var re = new RegExp(s);
                    rule.script = rule.script.replace(re, '"' + v[1] + '"');
                }
            }


            //var script = TSL.createElement("script", { "type": "text/javascript" });
            //script.textContent = rule.script;
            //script.id = rule.id;
            //document.head.appendChild(script);
            log.log(rule.script);
            TSL.addScript(rule.id, rule.script);
        }
    }

    /* Apply rules to the document title
    ---------------------------------------------------------------------*/
    function amendPageTitle(rules)
    {
        var title = document.head.getElementsByTagName("title")[0];
        if (title && (title.original != title.textContent))
        {
            title.original = title.textContent;
            var newTitle = title.textContent;

            for (var i = 0; i < rules.length ; i++)
            {
                var rule = rules[i];
                if (rule.type != 2) continue;

                for (var j = 0; j < rule.regexes.length; j++)
                {
                    var reParms = getREParams(rule.regexes[j]);

                    var re = createRE(reParms.search, rule, rule.regexes[i], true);
                    if (re) newTitle = newTitle.replace(re, reParms.replace);
                }
            }

            title.textContent = newTitle;
        }
    }

    /* Apply rules to nodes (Attrib & Scripts)
    ---------------------------------------------------------------------*/
    function amendNodes(rules)
    {
        log.log("amendNodes");
        var r = n = -1;

        parseRules();
        function parseRules()
        {
            r++;
            if (r >= rules.length)
            {
                log.info("Parsing Nodes Z: " + time + " (" + (new Date().getTime() - time) + ")");
                MO.reConnect();
                return;
            }

            var rule = rules[r];
            if (rule.type != 1 && rule.type != 4) //If not attrib of click rule skip
            {
                parseRules();
                return;
            }

            var nodes = document.querySelectorAll(rule.selectors);
            log.log("Rule : ", rule);
            if (rule.nthNode != 0) nodes = [nodes[rule.nthNode - 1]]; //Shrink the array if only applying one node
            log.log("Number of nodes " + nodes.length);

            n = -1;
            parseNodes(rule, nodes);
        }

        function parseNodes(rule, nodes)
        {
            n++;
            if (n >= nodes.length)
            {
                parseRules();
                return;
            }

            /*
                To make the parsing quicker and not hang. we are parsing x number of nodes at a time through a
                for loop and then a setTimeout.
                max = n + x;
            */
            var max = n + 50;
            log.log("Parse nodes " + n + " - " + (max - 1));

            for (; n < nodes.length && n < max; n++)
            {
                var node = nodes[n];

                if (node.parsed && node.time != time) continue;
                node.time = time; //Store the time as you want to apply all rules in the first parse.
                node.parsed = true;

                if (rule.type == 4) node.click(); // ---- Click Rule
                else // ---- Attrib rule
                {
                    for (var j = 0; j < rule.regexes.length; j++)
                    {
                        var regex = rule.regexes[j];
                        var reParms = getREParams(regex);

                        if (regex.raised || reParms.name.length == 0 || (reParms.name[0] != "=" && reParms.name[0] != "+" && !node.hasAttribute(reParms.name.replace(/^-/, "")))) continue;

                        if (reParms.name[0] == "=")
                        {   //Operations done on node property
                            var name = reParms.name.substr(1);

                            //if (node.hasOwnProperty(name))
                            if (!(name in node))
                            {
                                regex.raised = true;
                                log.error("Node object property \"" + name + "\" does not exist. Rule: " + rule.name + "[" + rule.id + "]");
                                continue;
                            }

                            var re = createRE(reParms.search, rule, regex, true);
                            if (!re) continue;

                            var v1 = node[name];
                            var v2 = v1.replace(re, reParms.replace);

                            if (v1 != v2) node[name] = v2;
                        }
                        else if (reParms.name[0] == "+") node.setAttribute(reParms.name.substr(1), reParms.replace);
                        else if (reParms.name[0] == "-")
                        {
                            var name = reParms.name.substr(1);

                            if (reParms.search.length == 0) node.removeAttribute(name);
                            else
                            {
                                var v1 = node.getAttribute(name);
                                var re = createRE(reParms.search, rule, regex, true);
                                if (re && v1.match(re)) node.removeAttribute(name);
                            }
                        }
                        else //Standard search and replace on attribute value
                        {
                            var re = createRE(reParms.search, rule, regex, true);
                            if (!re) continue;

                            var v1 = node.getAttribute(reParms.name);
                            var v2 = v1.replace(re, reParms.replace);
                            if (v1 != v2) node.setAttribute(reParms.name, v2);
                        }
                    }
                }
            }
            n--; //We do this so as not to skip a node
            setTimeout(parseNodes, 0, rule, nodes);
        }
    }
}


/*
=====================================================================
    MutationObserver
=====================================================================*/
var MO =
{
    timeout: null,
    Observer: null,
    disconnected: true,

    monitorChanges: function ()
    {
        if (!MO.Observer)
        {
            var mo = window.MutationObserver || window.MozMutationObserver || window.WebKitMutationObserver;
            if (mo) MO.Observer = new mo(MO.callback);
        }

        if (MO.Observer && MO.disconnected)
        {
            MO.Observer.observe(document, { subtree: true, childList: true });
            MO.disconnected = false;
        }
    },

    callback: function ()
    {
        MO.Observer.disconnect();
        MO.disconnected = true;

        setTimeout(function ()
        {
            ParseNodes();
        }, 250);
    },

    reConnect: function (norules)
    {
        if (MO.disconnected && !norules)
        {
            setTimeout(MO.monitorChanges, 250);
        }
    }
};


var DEBUG = false;
DEBUG = (window === window.top && DEBUG);

if (!DEBUG)
{
    log.info = function () { };
    log.log = function () { };
    log.warn = function () { };
    log.error = function () { };
}
else
{
    log.info = console.info;
    log.log = console.log;
    log.warn = console.warn;
    log.error = console.error;
}

(function ()
{
    if (window === window.top)
    {
        if (window === window.top) GM_registerMenuCommand("[TS] Linx Amender", DialogMain.show);
        window.addEventListener("keyup", function (e) { if (e.keyCode == 120) DialogMain.show(e.altKey); }, true);
    }

    window.onload = function ()
    {
        try
        {
            MO.Observer.disconnect();
            MO.disconnected = true;
        }
        catch (err) { };
        ParseNodes();
    }
    setTimeout(ParseNodes, 250);
})();
