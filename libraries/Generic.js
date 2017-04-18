// ==UserScript==
// @name                    TSLibrary - Generic
// @namespace               TimidScript
// @version                 1.0.23
// @description             A resource JS library file providing common useful functions to be used by other scripts
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
    Version History
----------------------------------------------
1.0.23 (2017-03-09)
 - Added randomNumber generator
1.0.22 (2017-02-25)
 - CRC32 added
1.0.21 (2017-02-12)
 - BugFix: TSL.padNumber
 - Added simple checksum
1.0.20 (2017-02-02)
 - Added GM_xmlhttpRequest Library
1.0.19 (2016-10-29)
 - CSS Styles are places in same position if they exists, to not break the page's style precedence. Did the same for javascript.
1.0.18 (2016-05-27)
 - License altered
1.0.17 (2016-04-03)
 - Changed license to GPL-3
1.0.16 (2015-07-20)
 - addScript and addStyle return created nodes
 - Change location of addScript to head instead of body incase of dynamic pages that alter the body
1.0.15 (2015-06-18)
- updateDocumentURL renamed to updateURL
1.0.14 (2015-06-18)
 - Using \b for regex in class functions
 - Better handling of spaces in the class functions
1.0.13 (2015-01-16)
 - updateDocumentURL added
1.0.12 (2014-12-12)
 - @exclude added
1.0.11 (2014-10-12)
 - innerHTML instead of textContent for scripts and CSS.
1.0.10 (2014-09-17)
 - Optimised - When adding or removing a class it now first checks
 it exists thus avoiding to make any extra changes.
 - Ability to add or remove more than one class. Separator is space.
 - hasClass also handles more than one class. Returns true only
 if all classes are present.
 - addClass, removeClass return true if class is added or removed
1.0.9 (2014-09-07)
 - Fixed bug in addScript and moved the script to the head instead of body.
 - CSS appended to textContent instead of innerHTML
1.0.8 (2014-09-05)
 - Improved removeClass
 - Added absolutePosition(element)
1.0.7 (2014-09-02)
 - Functions added: addClass removeClass hasClass
 - Removed makeStruct as it is useless
1.0.6 (2014-08-29)
 - Changed the NTFS chars http://unicode-search.net
1.0.5 (2014-08-24)
 - TSL part no longer commented out
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
    //http://unicode-search.net
    altNTFSChars: [[">", "＞"],
                   ["<", "＜"],
                   [":", "："],
                   ['"', "＂"],
                   ["/", "／"],
                   ["\\", "＼"],
                   ["?", "？"],
                   ["*", "＊"]],

    removeNode: function (node, doc)
    {
        if (!doc) doc = document;
        if (typeof node == "string") node = doc.getElementById(node);
        if (node && node.parentElement) node.parentElement.removeChild(node);
    },

    addStyle: function (id, CSS, doc)
    {
        if (!doc) doc = document;
        var el = doc.createElement("style");

        if (id && doc.getElementById(id)) el = doc.getElementById(id);
        else doc.head.appendChild(el);

        if (id) el.id = id;
        el.type = "text/css";
        el.innerHTML = CSS;

        return el;
    },

    addScript: function (id, text, doc)
    {
        if (!doc) doc = document;
        var el = doc.createElement("script");

        if (id && doc.getElementById(id)) el = doc.getElementById(id);
        else doc.head.appendChild(el);

        if (id) el.id = id;
        el.innerHTML = text;
        return el;
    },

    createElement: function (tag, attributes, doc)
    {
        if (!doc) doc = document;
        var el = doc.createElement(tag);

        for (var x in attributes) el.setAttribute(x, attributes[x]);
        return el;
    },

    createElementHTML: function (html, doc)
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

    padNumber: function (number, length)
    {
        //return TimidScriptLibrary.paddingLeft(number, "0", length);
        var padding = Array(length + 1).join("0");
        return (padding + number).slice(0 - length);
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
        for (var i = 0; i < TimidScriptLibrary.altNTFSChars.length; i++)
        {
            var rx = new RegExp(TimidScriptLibrary.escapeRegExp(TimidScriptLibrary.altNTFSChars[i][0]), "gi");
            str = str.replace(rx, TimidScriptLibrary.altNTFSChars[i][1]);
        }

        return str;
    },

    addClass: function (node, names)
    {
        var altered = false;
        var newclass = node.className;
        var classes = names.replace(/\s+/g, " ").trim().split(" ");

        for (var i = 0; i < classes.length; i++)
        {
            //var re = new RegExp("(^|\\s+)" + classes[i] + "(\\s+|$)");
            var re = new RegExp("\\b" + classes[i] + "\\b");
            if (!newclass.match(re))
            {
                newclass += " " + classes[i];
                altered = true;
            }
        }

        if (altered) node.className = newclass.replace(/\s+/g, " ").trim();
        return altered;
    },

    removeClass: function (node, names)
    {
        var altered = false;
        var newclass = node.className;
        var classes = names.replace(/(\s)\s+/g, " ").trim().split(" ");

        for (var i = 0; i < classes.length; i++)
        {
            //var re = new RegExp("(^|\\s+)" + classes[i] + "(\\s+|$)");
            var re = new RegExp("\\b" + classes[i] + "\\b");
            if (newclass.match(re))
            {
                newclass = newclass.replace(re, " ");
                altered = true;
            }
        }

        if (altered) node.className = newclass.replace(/\s+/g, " ").trim();
        return altered;
    },

    hasClass: function (node, names)
    {
        var classes = names.replace(/(\s)\s+/g, " ").trim().split(" ");
        for (var i = 0; i < classes.length; i++)
        {
            //var re = new RegExp("(^|\\s+)" + classes[i] + "(\\s+|$)");
            var re = new RegExp("\\b" + classes[i] + "\\b");
            if (!node.className.match(re)) return false;
        }

        return true;
    },

    getAbsolutePosition: function (element)
    {
        var x = 0;
        var y = 0;

        while (element && !isNaN(element.offsetLeft) && !isNaN(element.offsetTop))
        {
            x += element.offsetLeft;
            y += element.offsetTop;
            element = element.offsetParent;
        }
        return { top: y, left: x };
    },

    updateURL: function (url)
    {
        window.history.pushState(null, "", url);
    },

    makeCRCTable: function ()
    {
        //Code from http://stackoverflow.com/questions/18638900/javascript-crc32
        var c;
        var crcTable = [];
        for (var n = 0; n < 256; n++)
        {
            c = n;
            for (var k = 0; k < 8; k++)
            {
                c = ((c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1));
            }
            crcTable[n] = c;
        }
        return crcTable;
    },

    crc32: function (str)
    {
        //Code from http://stackoverflow.com/questions/18638900/javascript-crc32
        var crcTable = unsafeWindow.crcTable || (unsafeWindow.crcTable = TimidScriptLibrary.makeCRCTable());
        var crc = 0 ^ (-1);

        for (var i = 0; i < str.length; i++)
        {
            crc = (crc >>> 8) ^ crcTable[(crc ^ str.charCodeAt(i)) & 0xFF];
        }

        return ((crc ^ (-1)) >>> 0).toString(16);
    },

    randomNumber: function(min, max)
    {
        min = parseInt(min);
        max = parseInt(max);
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
};


var tsXHR =
{
    timeout: 15000,

    /* callback(state, response)
        state = 0 ---> success
        state = 1 ---> Fail most likely a 404
        state = 2 ---> Timeout
        state = 3 ---> Error
     -------------------------------------------------------------------*/
    send: function (method, callback, url, headers, data, timeout)
    {
        //console.log(method, "\r\n", url, "\r\n", headers, "\r\n", data);

        if (!headers) headers = {};

        var obj = {
            url: url,
            method: method,
            timeout: timeout,
            headers: headers,
            onload: function (response)
            {
                if (response.status == 200)
                {
                    //console.log("tsXHR: Success " + response.status + " (" + url + ")");
                    callback(0, response);
                }
                else
                {
                    console.error("tsXHR: Fail " + response.status + " (" + url + ")");
                    console.info(response);
                    callback(1, response);
                }
            },
            ontimeout: function (response)
            {
                console.error("tsXHR: Timeout" + response.status + " (" + url + ")");
                console.info(response);
                callback(2, response);
            },
            onerror: function (response)
            {
                console.error("tsXHR: ERROR " + response.status + " (" + url + ")");
                console.info(response);
                callback(3, response);
            }
        };

        if (data) obj.data = data;

        GM_xmlhttpRequest(obj);
    },

    /* callback(success, response) success true / false
    -------------------------------------------------------------------*/
    sendX: function (method, callback, url, headers, data, timeout)
    {
        tsXHR.send(method, cb, url, headers, data, timeout);

        function cb(state, response)
        {
            callback(state == 0, response);
        }
    },

    createHeaders: function (referer, accept, userAgent, contentType, authorization)
    {
        var headers = {};
        setHeader("User-Agent", userAgent);
        setHeader("Accept", accept);
        setHeader("Referer", referer);
        setHeader("Content-Type", contentType);
        setHeader("Authorization", authorization);

        return headers;
        function setHeader(name, val)
        {
            if (val != null && val != undefined) headers[name] = referer;
        }
    },

    /* callback(success, response)
    -------------------------------------------------------------------*/
    get: function (callback, url, headers, timeout)
    {
        tsXHR.sendX("GET", callback, url, headers, null, timeout);
    },

    /* callback(success, response)
    -------------------------------------------------------------------*/
    head: function (callback, url, headers, timeout)
    {
        tsXHR.sendX("GET", callback, url, headers, null, timeout);
    },

    /* callback(success, response)
    -------------------------------------------------------------------*/
    post: function (callback, url, headers, data, timeout)
    {
        tsXHR.sendX("POST", callback, url, headers, data, timeout);
    }
};


/*
Copy and paste the code underneath into your script for quick reference
and auto-complete feature if available.*/
//*********************************************************************************
//#region //---------------- TimidScript Library Functions

var TSL = new Object();

//Remove node from document. Accepts id or node object
TSL.removeNode = function (node, doc) { TimidScriptLibrary.removeNode(node, doc); };
// Creates document element. Default doc value is the document.
TSL.createElement = function (tag, attributes, doc) { return TimidScriptLibrary.createElement(tag, attributes, doc) };
// Creates document element using html code. Default doc value is the document.
TSL.createElementHTML = function (html, doc) { return TimidScriptLibrary.createElementHTML(html, doc) };
//Returns the thickness of the scrollbar
TSL.getScrollBarThickness = function () { return TimidScriptLibrary.getScrollBarThickness(); };

//Add CSS styles to document header. Document can be left empty.
TSL.addStyle = function (id, CSS, doc) { return TimidScriptLibrary.addStyle(id, CSS, doc); };
//Add JS script to document header. Document can be left empty.
TSL.addScript = function (id, script, doc) { return TimidScriptLibrary.addScript(id, script, doc); };

// Checks if mouse event is within an elements client area
TSL.isMouseEventInClientArea = function (event, element) { return TimidScriptLibrary.isMouseEventInClientArea(event, element); };
// Gets the position of the element within the document
TSL.getAbsolutePosition = function (element) { return TimidScriptLibrary.getAbsolutePosition(element); };

//Array containing NTFS illegal characters alternatives
TSL.altNTFSChars = TimidScriptLibrary.altNTFSChars;
TSL.replaceNTFSIllegals = function (str) { return TimidScriptLibrary.replaceNTFSIllegals(str); };
//Escape Regular expression string
TSL.escapeRegExp = function (str) { return TimidScriptLibrary.escapeRegExp(str); };

//Node className functions. All three functions can handle multiple classes separated by spaces
TSL.addClass = function (node, names) { return TimidScriptLibrary.addClass(node, names); };
TSL.removeClass = function (node, names) { return TimidScriptLibrary.removeClass(node, names); };
TSL.hasClass = function (node, names) { return TimidScriptLibrary.hasClass(node, names); };

//Allows you to change the document URL, which is reflected in the URL bar.
TSL.updateURL = function (url) { TimidScriptLibrary.updateURL(url); };

//Pad a number with zeros
TSL.padNumber = function (number, length) { return TimidScriptLibrary.padNumber(number, length); };
//Random Whole Number Generator
TSL.randomNumber = function (min, max) { min = parseInt(min); max = parseInt(max); return Math.floor(Math.random() * (max - min + 1) + min); };

//Simple string hashing crc32
TSL.crc32 = function (str) { return TimidScriptLibrary.crc32(str);}

//String Padding
String.prototype.lPad = function (chr, length) { return TimidScriptLibrary.paddingLeft(this, chr[0], length); };
String.prototype.rPad = function (chr, length) { return TimidScriptLibrary.paddingRight(this, chr[0], length); };


var XHR = new Object();
// Default value is 10000ms
XHR.timeout = tsXHR.timeout;
// callback(state, response) --- state: 0 = success | 1 = Fail | 2 = Timeout | 3 = Error
XHR.send = function (method, callback, url, headers, data, timeout) { tsXHR.send(method, callback, url, headers, data, timeout); };
// callback(success, response) --- state: 0 = success | 1 = Fail | 2 = Timeout | 3 = Error
XHR.sendX = function (method, callback, url, headers, data, timeout) { tsXHR.sendX(method, callback, url, headers, data, timeout); };
// callback(success, response)
XHR.createHeaders = function (referer, accept, userAgent, contentType, authorization) { tsXHR.createHeaders(referer, accept, userAgent, contentType, authorization) };
// callback(success, response)
XHR.get = function (callback, url, headers, timeout) { tsXHR.get(callback, url, headers, timeout) };
// callback(success, response)
XHR.head = function (callback, url, headers, timeout) { tsXHR.head(callback, url, headers, timeout) };
// callback(success, response)
XHR.post = function (callback, url, headers, data, timeout) { tsXHR.post(callback, url, headers, data, timeout) };
//#endregion
//*********************************************************************************
