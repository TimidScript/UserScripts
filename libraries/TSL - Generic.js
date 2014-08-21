// ==UserScript==
// @name                    TSLibrary - Generic
// @namespace               TimidScript
// @description             A resource JS library file providing common useful functions to be used by other scripts  

// @author                  TimidScript
// @homepageURL             https://openuserjs.org/users/TimidScript
// @copyright               © 2014 TimidScript, All Rights Reserved.
// @license                 Creative Commons BY-NC-SA + Please notify me if distributing

// @version                 1.0.4
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


Go to the TSL object for information for what functions are available. The TSL
object is commented out. 

----------------------------------------------
    Version History
----------------------------------------------
1.0.4
 - Added new functions createElement, createElementHTML function
 - Partial support for non-main document
1.0.3
 - Added NTFS illegal character replacer
 - escape regular expression function
1.0.2
 - Added scroll bar thickness
1.0.1
 - Initial Release
**********************************************************************************************/


var TimidScriptLibrary =
{
    ALTNTFSChars: [["<", "〉"], [">", "〈"], [":", "："], ['"', "‟"], ["/", "∕"], ["\\", ""], ["?", "？"], ["*", "✳"]],
    
    removeNode: function (node, doc)
    {
        if (!doc) doc = document;
        if (typeof node == "string") node = doc.getElementById(node);
        if (node && node.parentElement) node.parentElement.removeChild(node);
    },

    addSyle: function (id, CSS, doc)
    {
        if (!doc) doc = document;
        var style = doc.createElement("style");
        style.type = "text/css";
        if (id)
        {
            style.id = id;
            TimidScriptLibrary.removeNode(id, doc);
        }

        style.innerHTML = CSS;
        doc.head.appendChild(style);
    },

    createElement: function (tag, attributes, doc)
    {
        if (!doc) doc = document;
        var el = doc.createElement(tag);

        for (var x in attributes) el.setAttribute(x, attributes[x]);
        return el;
    },

    createElementHTML: function(html, doc)
    {
        if (!doc) doc = document;
        var el = doc.createElement("e");

        el.innerHTML = html;
        return el.firstElementChild;
    },

    paddingLeft: function (str, chr, length)
    {
        while (str.length < length)
            str = chr + str;

        return str;
    },

    paddingRight: function (str, chr, length)
    {
        while (str.length < length)
            str = str + chr;

        return str;
    },

    makeStruct: function (names)
    {
        var names = names.split(' ');
        var count = names.length;
        function constructor()
        {
            for (var i = 0; i < count; i++)
            {
                this[names[i]] = null;
            }
        }
        return constructor;
    },

    isMouseEventInClientArea: function (event, element)
    {
        var rect = element.getBoundingClientRect();
        var minX = rect.left + element.clientLeft;

        var x = event.clientX;
        if (x < minX || x >= minX + element.clientWidth) return false;
        var minY = rect.top + element.clientTop;
        var y = event.clientY;
        if (y < minY || y >= minY + element.clientHeight) return false;
        return true;
    },


    getScrollBarThickness: function ()
    {
        var outer = document.createElement("div");
        outer.style.visibility = "hidden";
        outer.style.width = "100px";
        document.body.appendChild(outer);

        var widthNoScroll = outer.offsetWidth;
        // force scrollbars
        outer.style.overflow = "scroll";

        // add innerdiv
        var inner = document.createElement("div");
        inner.style.width = "100%";
        outer.appendChild(inner);

        var widthWithScroll = inner.offsetWidth;

        // remove divs
        outer.parentNode.removeChild(outer);

        return widthNoScroll - widthWithScroll;
    },


    escapeRegExp: function (str)
    {
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
        return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
    },

    replaceNTFSIllegals: function (str)
    {
        for (var i = 0; i < TimidScriptLibrary.ALTNTFSChars.length; i++)
        {
            var rx = new RegExp(TimidScriptLibrary.escapeRegExp(TimidScriptLibrary.ALTNTFSChars[i][0]), "gi");
            str = str.replace(rx, TimidScriptLibrary.ALTNTFSChars[i][1]);
        }

        return str;
    }    
}

//#region TimidScript Library Functions
/* 
Copy and paste the commented out code underneath into your script for quick reference 
and auto-complete feature if available. 
*********************************************************************************/

//var TSL = new Object();

////Remove node from document. Accepts id or node object
//TSL.removeNode = function (node, doc) { TimidScriptLibrary.removeNode(node, doc); };

//// Creates document element. Default doc value is the document.
//TSL.createElement = function (tag, attributes, doc) { return TimidScriptLibrary.createElement(tag, attributes, doc) };

//// Creates document element using html code. Default doc value is the document.
//TSL.createElementHTML = function (html, doc) { return TimidScriptLibrary.createElementHTML(html, doc) };

////Add CSS styles to document header. Document can be left empty.
//TSL.addStyle = function (id, CSS, doc) { TimidScriptLibrary.addSyle(id, CSS, doc); };

////General Functions
//TSL.makeStruct = function (names) { return TimidScriptLibrary.makeStruct(names); };

//// Checks if mouse event is within an elements client area
//TSL.isMouseEventInClientArea = function (event, element) { return TimidScriptLibrary.isMouseEventInClientArea(event, element); };

////Returns the thickness of the scrollbar
//TSL.getScrollBarThickness = function () { return TimidScriptLibrary.getScrollBarThickness(); };

////Array containing NTFS illegal characters alternatives
//TSL.ALTNTFSChars = [["<", "〉"], [">", "〈"], [":", "："], ['"', "‟"], ["/", "∕"], ["\\", ""], ["?", ""], ["*", "✳"], ];
//TSL.replaceNTFSIllegals = function (str) { return TimidScriptLibrary.replaceNTFSIllegals(str); };

//TSL.escapeRegExp = function (str) { return TimidScriptLibrary.escapeRegExp(str);};

////String Padding
//String.prototype.lPad = function (chr, length) { return TimidScriptLibrary.paddingLeft(this, chr[0], length); };
//String.prototype.rPad = function (chr, length) { return TimidScriptLibrary.paddingRight(this, chr[0], length); };

/*
*********************************************************************************/
//#endregion



/* Functions you might want to copy completely for auto-complete on returns
*********************************************************************************
function makeStruct (names)
{
    var names = names.split(' ');
    var count = names.length;
    function constructor()
    {
        for (var i = 0; i < count; i++)
        {
            this[names[i]] = null;
        }
    }
    return constructor;
}
*********************************************************************************/
