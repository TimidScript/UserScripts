// ==UserScript==
// @name                    [TS] Youtube Translate
// @namespace               TimidScript
// @description             Adds translate button for video's title  and "About" description. Works in most cases

// @author                  TimidScript
// @homepageURL             https://openuserjs.org/users/TimidScript
// @copyright               © 2014 TimidScript, All Rights Reserved.
// @license                 GNU GPLv3 + Please notify me if distributing

// @version                 1.0.3
// @icon                    http://i.imgur.com/E2wQ6Xm.gif

// @include                 http*://*.youtube.*/watch?*

// @grant                   GM_xmlhttpRequest
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

----------------------------------------------
    Version History
----------------------------------------------
1.0.4 (2014-08-19)
 - Cleaned up header for OUJS
1.0.3 (2014/08/14)
 - Bug Fix in handling lines that only contain url or email
1.0.2 (2014/08/05)
 - Removed Google's span hover title translation. Less errors
1.0.1 (2014/07/27)
 - Split the translation into parts to achieve higher success rate
1.0.0 (2014/07/21)
 - Initial release (Does not work in all cases)
********************************************************************************************/


(function ()
{
    console.info("[TS] Youtube Translate");

    // Translation of Title
    var title = document.getElementById("eow-title");
    title.parentElement.appendChild(document.createElement("br"));
    var btn = document.createElement("input");
    btn.type = "button";
    btn.value = "Translate";
    title.parentElement.appendChild(btn);

    btn.onclick = function ()
    {
        var title = document.getElementById("eow-title");

        if (this.style.color)
        {
            title.textContent = title.title;
            this.style.color = null;
        }
        else
        {
            if (title.hasAttribute("translated_text")) title.textContent = title.getAttribute("translated_text");
            else Translate(title, [title.title], true);

            this.style.color = "lime";
        }
    };


    // Translation of Video Description 
    var description = document.getElementById("eow-description");

    description.parentElement.insertBefore(document.createElement("br"), description);
    btn = document.createElement("input");
    btn.type = "button";
    btn.value = "Translate";
    description.parentElement.insertBefore(btn, description);

    var descriptionTranslated = description.cloneNode();
    descriptionTranslated.id = "eow-description2"
    descriptionTranslated.style.display = "none";
    description.parentElement.insertBefore(descriptionTranslated, description);

    btn.onclick = function ()
    {
        var description = document.getElementById("eow-description");
        if (this.style.color)
        {
            description.previousElementSibling.style.display = "none";
            description.style.display = null;
            this.style.color = null;
        }
        else
        {
            if (!description.hasAttribute("translated"))
            {
                description.setAttribute("translated", true);
                var text = description.innerHTML.replace(/(<br \/>|<br>)/gi, "\u200B"); //\u200B Zero width space


                //Need to remove urls as they cause errors when passing them through google URL
                var i = 0;
                while (text.match(/<a [^>]+>[^<]+<\/a>/i))
                {
                    /*linkID is an href so correct translation can occur, as using a non-href id
                    causing the translation to differ.*/
                    text = text.replace(/<a [^>]+>[^<]+<\/a>/i, "http://www.yt." + ('00' + i).slice(-2));
                    i++;
                }

                var array = text.split("\u200B");
                Translate(description.previousElementSibling, array, false);
            }

            description.previousElementSibling.style.display = null;
            description.style.display = "none";
            this.style.color = "lime";
        }
    }

    function Translate(node, arr, isTitle, idx)
    {

        if (idx == undefined) idx = 0;
        else if (!isTitle && idx < arr.length) node.innerHTML += "<br />";
        else if (!isTitle)
        {
            var children = node.children;
            for (var i = 0; i < children.length; i++)
            {
                children[i].removeAttribute("title");
                children[i].removeAttribute("onmouseover");
                children[i].removeAttribute("onmouseout");
            }
            var links = node.nextElementSibling.getElementsByTagName("a");
            
            for (var i = 0; i < links.length; i++)
            {                
                var linkID = "http://www.yt." + ('00' + i).slice(-2);                
                node.innerHTML = node.innerHTML.replace(linkID, links[i].outerHTML);
            }
            return;
        }

        var txt = encodeURI(arr[idx]);
        txt = "♥❤❥ " + txt; //Added this to handle lines that contain only URL or email

        if (!isTitle && txt.trim().length == 0)
        {
            Translate(node, arr, isTitle, ++idx);
            return;
        }

        //var URL = "http://www.google.com/translate_t&langpair=auto|auto?text=" + txt + "&langpair=auto|auto";
        var URL = "https://translate.google.com/?langpair=auto|auto&text=" + txt;

        GM_xmlhttpRequest({
            method: 'GET',
            url: URL,
            headers: { "User-agent": navigator.userAgent, "Accept": "text/html" }, //"Accept": "text/html"
            onload: function (response)
            {
                if (response.status == 200)
                {
                    var doc = new DOMParser().parseFromString(response.responseText, "text/html");
                    var rb = doc.getElementById("result_box");                    

                    if (isTitle) node.textContent = rb.textContent.replace(/♥ ?❤ ?❥ ?/g, "");
                    else
                    {
                        node.innerHTML += rb.innerHTML.replace(/♥ ?❤ ?❥ ?/g, "");                        
                        Translate(node, arr, isTitle, ++idx);
                    }
                }
                else console.error("status: ", response.status);
            }
        });
    }
})();

