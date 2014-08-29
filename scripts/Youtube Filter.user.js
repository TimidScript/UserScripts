// ==UserScript==
// @name            [TS] Youtube Filter
// @namespace       TimidScript
// @version         1.0.24
// @description     Filter out users and channels from search with GUI. Include Auto-Paging and ScreenShot Links.
// @icon            https://i.imgur.com/E2wQ6Xm.gif
// @author          TimidScript
// @homepageURL     https://openuserjs.org/users/TimidScript
// @copyright       © 2014 TimidScript, All Rights Reserved.
// @license         Creative Commons BY-NC-SA + Please notify me if distributing
// @include         *//www.youtube.*
// @exclude         *//www.youtube.*/embed/*
// @require         https://openuserjs.org/src/libs/TimidScript/TSL_-_GM_Update.js
// @homeURL         https://openuserjs.org/scripts/TimidScript/[TS]_Youtube_Filter
// @grant           GM_xmlhttpRequest
// @grant           GM_info
// @grant           GM_getMetadata
// @grant           GM_getValue
// @grant           GM_setValue
// @grant           GM_deleteValue
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
                                http://userscripts-mirror.org/users/TimidScript


Future Updates:
 - Need to update code to use TimidScript Library.
----------------------------------------------
    Version History
----------------------------------------------
1.0.24 (2014-08-29)
 - Added GM_update
1.0.23 (2014-08-19)
 - Cleaned up header for OUJS
1.0.22 (2014-07-16)
 - @exclude iframe embed videos
1.0.21 (2014-07-15)
 - Added image link to channel videos
 - Added necessary @grant header
 - Altered the CSS
 - Remove MutationObserver from most page types
1.0.20 (2014-07-03)
 - Bug Fix: Fixed issues caused by change in youtube layout
 - Added option to turn off auto-paging
 - Removed img.youtube include 
1.0.19 (2014-06-14)
 - Scrollable FilterWindow
 - Use port 8080 for require on userscripts.org
1.0.18 (2014-06-07)
 - Bug fix on pager when spelling correction is applied
1.0.17 (2014-05-31)
 - Updated so main page includes "Recommended" in the filter
1.0.16 (2014-05-30)
 - Modified CSS and link text
1.0.15 (2014-05-25)
 - Moved options button beside upload button if it exists.
1.0.14 (2014-05-21)
 - Bug Fix: Not checking for maxresdefault.jpg.
1.0.13 (2014-05-20)
 - Video screenshot link now points to "hqdefault.jpg" by default. 
 Checks if "maxresdefault.jpg" and re-links if necessary
1.0.12 (2014-05-17)
 - Added link to max res screenshot
1.0.11 (2014-05-09)
 - Made options button invisible unless you hover over top, right corner. 
1.0.10 (2014-03-28)
 - Updated broken script due to changes in youtube
1.0.9 (2014-01-16)
 - Bug not getting page type when type changes. 
1.0.8 (2014-01-01)
 - Option button alternates filter window display
1.0.7b (2013-12-21)
 - Removed redundant code
 - Highlights blocked users and options buttonQ
 - Button now is an Icon
 - Bug fixes due to changes in Youtube
 - Captures changes in URL
1.0.6
 - Added block button on all thumbnails
 - Information stored now only contains the name of the user-channel and nothing else
1.0.5
 - Main X button now also removes filter
1.0.4
 - Colours added
1.0.3 (2013-10-16)
 - Extended the filter to work on main page
1.0.2 (2013-08-25)
 - Bug Fix: Filter observer added
1.0.1 (2013-08-24)
 - Initial Release
********************************************************************************************/


if (window.self !== window.top) return;
console.info("Youtube Filter");
var ShowAll = false;
var AutoPaging = GM_getValue("AutoPaging",true);
//0 Main Page; 1 Search Result; 2 Video Page; 3 Channel Video Page
var PageTYPE = null; //Video Page
var FilteredUsers = new Array();

//*****************
///
function IsMouseEventInClientArea(event, element)
{
    var rect = element.getBoundingClientRect();
    var minX = rect.left + element.clientLeft;

    var x = event.clientX;
    if (x < minX || x >= minX + element.clientWidth) return false;
    var minY = rect.top + element.clientTop;
    var y = event.clientY;
    if (y < minY || y >= minY + element.clientHeight) return false;
    return true;
}

function GetPageType()
{
    PageTYPE  = null;
    if (document.URL.match(/\.youtube\.[^\/]+\/?$/i)) PageTYPE  = 0; //Main Page
    else if (document.URL.match(/youtube\.[^\/]+\/result/gi)) PageTYPE  = 1; //Search Result
    else if (document.URL.match(/youtube\.[^\/]+\/watch/gi)) PageTYPE  = 2; //Video
    else if (document.URL.match(/youtube\.[^\/]+\/(user|channel)\/.+\/videos/gi)) PageTYPE  = 3; //Video
}


function removeNode(node)
{
    if (typeof node == "string") node = document.getElementById(node);
    if (node && node.parentElement) node.parentElement.removeChild(node);
}

function GetUserData(link)
{
    var user = new Object();
    user.name = link.textContent;
    user.url = link.href.replace(/.+youtube\.[a-z]+/, "");

    return user;
}

function AddStyle(id, script)
{
    var style = document.createElement("style");
    style.type = "text/css";
    if (id)
    {
        style.id = id;
        removeNode(id);
    }
    style.innerHTML = script;
    document.head.appendChild(style);
}

function IsFilteredUser(user)
{           
    var userFilters = GetFilters();
    for (var i = 0; i < userFilters.length; i++)
    {
        if (userFilters[i] == user) return true;        
    }

    return false;
}

function BlockUser(e)
{
    e.stopImmediatePropagation();
    var user = this.title;

    if (!IsFilteredUser(user))    
    {
        var filters = GetFilters();
        filters.push(user);
        GM_setValue("Filters", JSON.stringify(filters));
    }

    HideUnwantedUsers();    
    if (document.getElementById("FilterWindow")) CreateFilterWindow();
    return false;
}


function CreateScreenshotLink(videoID)
{    
    var ss = document.createElement("a");    
    ss.textContent = "[SH]";
    ss.href = "https://img.youtube.com/vi/" + videoID + "/hqdefault.jpg";
    
    GM_xmlhttpRequest(
    {
        url: "https://img.youtube.com/vi/" + videoID + "/maxresdefault.jpg",
        method: "HEAD",        
        onload: function (response)
        {                                   
            if (response.status == 200) 
            {                                            
                //var contentLength = parseInt(response.responseHeaders.replace(/(Content-Length: (\d+)|.*\r?)/gi, "$2"));                                
                ss.href = "https://img.youtube.com/vi/" + videoID + "/maxresdefault.jpg";
                ss.textContent = "[SM]";                
            }
        }
    });

    return ss;
}

function AddBlockButton(li)
{
    var btn = document.createElement("span");
    btn.className = "blockBTN32";    

    if (PageTYPE == 1) btn.title = li.getElementsByClassName("g-hovercard")[0].textContent;
    else btn.title = li.getElementsByClassName("g-hovercard")[1].textContent;           

    var span = document.createElement("span");    
    span.setAttribute("style","float:right;");    
    li.firstElementChild.insertBefore(span, li.firstElementChild.firstElementChild);
    //li.insertBefore(span, li.firstElementChild);

    btn.onclick = BlockUser;
    span.appendChild(btn);

    var href = li.getElementsByTagName("a")[0].href;
    if (href.indexOf("/watch?v=") > 0)
    {        
        var ss = CreateScreenshotLink(href.replace(/.+watch\?v=(([a-z0-9]|_|-)+).*/gi,"$1"));
        ss.setAttribute("style","display:block;text-align:center;");        
        span.appendChild(ss);
    }
}

function NextPageURL()
{       
    var pager = document.getElementsByClassName('yt-uix-pager')[0];
    if (!pager) return null;    
   
    var nextpage = pager.getElementsByClassName("yt-uix-button-toggled")[0].nextElementSibling;
    if (!nextpage) return null;

    return nextpage.href;
}


function ScrollCheck()
{
    var pager = document.getElementsByClassName('yt-uix-pager')[0];    
    var loc = pager.offsetTop + pager.offsetHeight - document.documentElement.offsetHeight;    

    if (loc < document.documentElement.scrollTop)
    {
        window.onscroll = null;
        var url = NextPageURL();

        var xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.responseType = "document";
        xhr.onload = function (e)
        {
            var pager = document.getElementsByClassName('yt-uix-pager')[0];
            var doc = xhr.response;
            var pagerNew = doc.getElementsByClassName('yt-uix-pager')[0];
            pager.outerHTML = pagerNew.outerHTML;

            var result = document.getElementsByClassName("item-section")[0];
            var resultNew = doc.getElementsByClassName("item-section")[0];
                        
            //Removes spell correction from result
            if (resultNew.getElementsByClassName("spell-correction")[0])
            {
                resultNew.removeChild(resultNew.getElementsByClassName("spell-correction")[0].parentElement);
            }            
            var lis = resultNew.children;
            

            while (lis.length > 0)
            {
                var li = lis[0];
                result.appendChild(li);
                var imgs = li.getElementsByTagName("img");

                for (var i = 0; i < imgs.length; i++)
                {
                    var src = imgs[i].getAttribute("data-thumb");
                    if (src) imgs[i].src = src;
                }

                AddBlockButton(li);
            }

            HideUnwantedUsers();
            EnablePager();

        };
        xhr.send();
    }
}

function EnablePager()
{    
    if (AutoPaging && NextPageURL()) window.onscroll = ScrollCheck;
    else window.onscroll = null;
}

function HideUnwantedUsers()
{    
    var userFilters = GetFilters();
    FilteredUsers = new Array();

    if (PageTYPE == 0) //Main Page
    {    
        var bans = document.getElementsByClassName("banNotice");
        while(bans.length > 0) removeNode(bans[0]);        

        //var items = document.getElementsByClassName("channels-content-item");
        var items = document.getElementsByClassName("yt-lockup-video");

        for(var i = 0; i < items.length; i++)
        {
            var thumbdata = items[i];            
            var user =  thumbdata.getElementsByClassName("yt-user-name")[0].textContent;

            var filtered = IsFilteredUser(user)
            if (filtered) 
            {                    
                FilteredUsers.push(user);
                thumbdata.style.backgroundColor = "#FBE8E5";
            }
            else thumbdata.style.backgroundColor  = null;
            
            if (!ShowAll && filtered)
            {            
                var h = thumbdata.clientHeight;
                var w = thumbdata.clientHeight;

                var notice = document.createElement("div");
                notice.className = "banNotice";
                notice.style.left = thumbdata.offsetLeft + "px";                    

                notice.style.height = thumbdata.clientHeight + "px";
                notice.style.width = thumbdata.clientWidth + "px";
                notice.setAttribute("name","YTF");

                var  txt = document.createElement("span");
                txt.textContent = user; 
                txt.style.height = thumbdata.clientHeight + "px";
                txt.style.width = thumbdata.clientWidth + "px";
                notice.appendChild(txt);
                thumbdata.parentNode.insertBefore(notice, thumbdata);
            }            
        }        
    }
    else //Search Result & Video Page
    {
        var results;
        var user;
        if (PageTYPE == 1) results = document.getElementsByClassName("item-section")[0].children;
        else results = document.getElementsByClassName("video-list-item");
        
        for (var i = 0; i < results.length; i++)
        {            
            try
            {
                var vid = results[i];
                if (vid.getElementsByClassName("g-hovercard").length == 0) continue;
                if (PageTYPE == 1) user = vid.getElementsByClassName("g-hovercard")[0].textContent;
                else user = vid.getElementsByClassName("g-hovercard")[1].textContent; 

                var filtered = IsFilteredUser(user);
                if (filtered) 
                {
                    FilteredUsers.push(user);
                    vid.style.backgroundColor = "#FBE8E5";
                }
                else vid.style.backgroundColor = null;

                if (!ShowAll && filtered) vid.style.display = "none";                
                else vid.style.display = null;
            }
            catch (e) { console.warn(e); }
        }      
    }

    if (FilteredUsers.length > 0) AddStyle("OptSelect","#OptionsButton, #OptionsButton2{background-color: #FBE8E5;} #OptionsButton:hover{background-color: #FBD5CF}");
    else removeNode("OptSelect");
}

function GetFilters()
{
    var filters = GM_getValue("Filters", null);
    if (!filters) return new Array();
               
    return JSON.parse(filters);
}

function CreateFilterWindow()
{
    var fwin = document.getElementById("FilterWindow");
    if (fwin) removeNode(fwin);

    var userFilters = GetFilters();

    fwin = document.createElement("span");    
    var tbHolder = document.createElement("div");
    tbHolder.setAttribute("style","overflow-x:hidden; overflow-y:auto; max-height: 500px;");
    var table = document.createElement("table");
    table.style.maxHeight
    tbHolder.appendChild(table);
    fwin.appendChild(tbHolder);

   
    for (var i = 0; i < userFilters.length; i++)
    {
        var user = userFilters[i];
        var btn = document.createElement("a");
        btn.className = "unblockBTN";
        btn.title = user;

        btn.onclick = function (e)
        {
            e.stopImmediatePropagation();
            var user = this.title;            
            var filters = GetFilters();
            
            for(var i = 0;  i < filters.length; i++)
            {
                if (filters[i] == user)
                {
                    filters.splice(i,1);
                    GM_setValue("Filters", JSON.stringify(filters));
                    break;
                }
            }             
            
            removeNode(this.parentElement.parentElement);
            HideUnwantedUsers();                
        };

        var r = table.insertRow(-1);
        var td = document.createElement("td");
        r.appendChild(td);
        td.appendChild(btn);
                
        var a = document.createElement("a");
        a.href = "results?search_query=" + user + "&sm=3";           

        var d = document.createElement("div");
        d.textContent = user;        

        for(var j = 0; j < FilteredUsers.length; j++)
        {
            if (user == FilteredUsers[j]) 
            {
                r.style.backgroundColor = "#FBE8E5";
                //d.style.color = "red";
                break;
            }
        }     
        
        td = document.createElement("td");
        a.appendChild(d);
        td.appendChild(a);
        r.appendChild(td);
    }


    var d = document.createElement("div");
    d.style.textAlign = "center";        
    var b = document.createElement("input");

    if (PageTYPE == 1)
    {
        b.type = "button";        
        b.value = "Auto-Page";
        b.style.backgroundColor = (AutoPaging) ? "lime" : null;
        b.onclick = function () 
        { 
            AutoPaging = !AutoPaging;
            this.style.backgroundColor = (AutoPaging) ? "lime" : null;
            EnablePager();
            
            GM_setValue("AutoPaging",AutoPaging);
        };        
        d.appendChild(b);   
    }

    b = document.createElement("input");
    b.type = "button";
    b.value = "Show All";
    b.style.backgroundColor = (ShowAll) ? "lime" : null;
    b.onclick = function ()
    {
        ShowAll = !ShowAll;
        HideUnwantedUsers();
        this.style.backgroundColor = (ShowAll) ? "lime" : null;
    };
    d.appendChild(b);

    b = document.createElement("input");
    b.type = "button";
    b.value = "Close";
    b.onclick = function () { removeNode("FilterWindow");};        

    d.appendChild(b);   
    fwin.appendChild(d);
    


    fwin.id = "FilterWindow";
    document.body.appendChild(fwin);
    return fwin;
}


function AdjustSearchResult()
{
    var results;
    if (PageTYPE == 1) results = document.getElementsByClassName("item-section")[0].children;
    else results = document.getElementsByClassName("video-list-item");
              
    for (var i = 0; i < results.length; i++)
    {
        if (results[i].getElementsByClassName("blockBTN32").length == 0)
        {
            try
            {
                AddBlockButton(results[i]);
            }
            catch(e){};
        }
    }

    HideUnwantedUsers();
    if (PageTYPE == 1) EnablePager();
}

function AddOptions()
{
    var masthead = document.getElementById("yt-masthead-signin");    
    
    if (masthead)
    {        
        var options = document.createElement("button");
        options.id = "OptionsButton";
        options.className = "yt-uix-button yt-uix-button-default";
        //options.textContent = "Options";
        options.onclick = function ()
        {
            var fwin = document.getElementById("FilterWindow");
            if (fwin) removeNode(fwin);
            else CreateFilterWindow();
        };
        masthead.insertBefore(options, masthead.firstElementChild);
    }
    else
    {
        var placer = document.createElement("div");    
        placer.id = "FloatArea";
        document.body.appendChild(placer);
  

        var options = document.createElement("div");
        options.id = "OptionsButton";
        //options.textContent = "Options";
        options.onclick = function ()
        {
            var fwin = document.getElementById("FilterWindow");
            if (fwin) removeNode(fwin);
            else CreateFilterWindow();
        };

        document.onmousemove = function(e)
        {        
            options.style.display = (IsMouseEventInClientArea(e,placer)) ? null : "none";        
        }

        document.body.appendChild(options);
    }
}

//Mutation Observer
var MO = 
{
    monitorBody: function()
    {
        var mo = window.MutationObserver || window.MozMutationObserver || window.WebKitMutationObserver;
        if (mo)
        {            
            MO.Observer = new mo(
                function() {                  
                    setTimeout(MainFunc, 500);                                       
                });

            MO.Observer.observe(document.body, { characterData:true, attributes: true, childList: true, subtree: true });
        }        
    },

    disconnect: function()
    {
        if (MO.Observer) MO.Observer.disconnect();
        MO.Observer = null;
    }
};

function MainFunc()
{    
    GetPageType();    
    if (PageTYPE == 0)
    {
        console.info("YTF: Main Page");
        AddOptions();                
                
        var items = document.getElementsByClassName("channels-content-item");
        var items = document.getElementsByClassName("yt-lockup");
        for(var i = 0; i < items.length; i++)
        {
            var thumbdata = items[i];
            var user = thumbdata.getElementsByClassName("yt-user-name")[0].textContent;
            var filters = GetFilters();
            
            var block = document.createElement("span");
            block.className = "blockLINKS";
                                               
            var blockBtn = document.createElement("a");
            blockBtn.className = "blockBTN16";                              
            blockBtn.title = user;
            blockBtn.onclick = BlockUser;            
            block.appendChild(blockBtn);

            var link = thumbdata.getElementsByTagName("a")[0];
            link.appendChild(block);            
            link.className += " aaTT";
            
            var ss = CreateScreenshotLink(link.href.replace(/.+watch\?v=(([a-z0-9]|_|-)+).*/gi,"$1"));
            block.appendChild(ss);                        
        }

        HideUnwantedUsers();    
    }
    else if (PageTYPE == 3)
    {
        MO.disconnect();
        var vthumbs = document.getElementsByClassName("ux-thumb-wrap");

        for(var i = 0; i < vthumbs.length; i++)
        {
            var  link = vthumbs[i]; 
            
            
            if (!link.className.match("aaTT"))
            {
                link.className += " aaTT";

                var block = document.createElement("span");
                block.className = "blockLINKS";                                
                block.style.top = "10px";                
                link.appendChild(block);
                

                var ss = CreateScreenshotLink(link.href.replace(/.+watch\?v=(([a-z0-9]|_|-)+).*/gi,"$1"));                                
                ss.style.backgroundColor = "yellow";
                ss.style.border = "1px solid black";
                block.appendChild(ss);
            }
        }

        MO.monitorBody();
    }
    else    
    {                
        console.info("YTF: Search Result");
        AddOptions();        
        AdjustSearchResult();

        
        if (PageTYPE == 2) //Video Page
        {
            //Adds sceenshot
            var player = document.getElementById("watch7-headline");            
            if (!player.getAttribute("screenshot"))
            {
                player.setAttribute("screenshot","added");
                var ss = CreateScreenshotLink(document.URL.replace(/.+watch\?v=(([a-z0-9]|_|-)+).*/gi,"$1"));
                player.insertBefore(ss, player.firstElementChild);
            }

            //Loads more side videos and filters them
            setTimeout(function()
            {
                document.getElementById("watch-more-related-button").click();

                setTimeout(function()
                {
                    AdjustSearchResult();
                }, 1000);
                                
                //var player = document.getElementById("player");                
            }, 2500);            
        }
    }
}



var URL = document.URL;
(function ()
{           
    GetPageType();
    if (PageTYPE == null) return;
    //Replace old saved syntax 
    CURRENTVERSION = 1;    
    if (GM_getValue("Version", 0) != CURRENTVERSION)
    {
        var filters = GM_getValue("Filters", null);

        if (filters)
        {
            filters = filters.split("|");
            for(var i = 0; i < filters.length; i++)
            {
                filters[i] = filters[i];
            }

            GM_setValue("Filters", JSON.stringify(filters));
        }

        GM_setValue("Version", CURRENTVERSION);
    }
        
    AddStyle(null, "#OptionsButton {background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAADPUlEQVR42u3XX0xSURwH8N/lzwUVxED+mpW5HtQ0ptJspBPkKmVzTtfafKunntqa9d67bD219dZLPrVmc22mglhSul2FnEtfMjf/C4oCCpfLvw7XbGXxT5q98HuBO845389+nMs9YPCfC0t3oF6vl6DBpWwMk0Si0TMxDMtD17z4ZzGAIBaLBdhs9m4kEtkBFmvFYrHsnBig1WpxHo4TGIYRMplMU1Z2sVqpVAilUhkUigpBKBQCzsWBw+Ew48PhMNAhGnw+H3g9XnC6nLC5seH7trQ053I6yVgsNoKQZqvVSqcEXGtoIK6o1S86OjpK6uvrQSyWZNVit3sHpslpGBwcXJ2d/Xx3cmrKnBTQ3dX15WV/fyWO41kFHy+apqGnp2d+YGCgKingenv3fOmliorbTbWg0WhApSrJKnh9fQ1IkoRXY3ZYWVxYsA29rkwKaGzvtpKdz5r53g0Qr87AudAmVIsAzhfxQCaXg0gkOtwD+LE9QB/uAY/HA1tbW7C8G4S5bYBlUIC7uA5oXAJ1kw+GJ4bfGJMCDHq9/KBQZXHcNFVRBXJmi0MUgBUKAH/fBVzKC5zgPrDCNLAiYWZOFDgQZeEQ5gogxBUBxZeiaz4zLz4/b38VaqcekXzK1WoZG9tLCogXuuVkAaHSjBDVVIHi50JHmN9eU7xnwif/Hp4Q8AMhpYRKi93YhxDKEwHyfCj8U+LwpADm62hulvoLVWZ7m6mGEigzAjDhH3tJ3O9stY6P7yXKSPlLiPZEsb9APupo61MHBCVpAZhwW+rwtADx0ul0ElogN9sJ0yEiWdu9KHyidwaFG1KFpw1gOmEwSAJ8yYjdYKoNCM8mbvt7JpxA4bvprJs2IF4ter2YypeOOFr66vyC0j/bHg8/SD88Y8ARIpAvs5DG5+oQLmIAXMoDmtH7jgJq2zBqNrszWS9jQLwIg8E4d/Xx0OaFVgagWBqGsvEnN9CD5l2ma50IgLrQuKB5+GG9/BYDUH19CxUzT5vQvT6RA+QAOUAOkAOcFkC7Vt5uW6y5ByG86PQB6GzA5vF4LYFg6M5u8eVOdBoWy9Zspwf4tQiC4EbCYR3GYpHoD2na54B/Bsi2vgPc5hg/VHiJIwAAAABJRU5ErkJggg==); background-size:24px 24px; background-repeat:no-repeat; background-position:center;}");
    if (document.getElementById("yt-masthead-signin")) 
    {
        AddStyle("YTF_FW", "#FilterWindow{position: fixed;z-index: 9999999999999; right: 50px;top: 50px;background-color: #E9EAEA;border: 1px solid black;}#FilterWindow div{color: gray;text-decoration-style: none;padding: 3px 5px;}#FilterWindow tr:hover{text-decoration-style: none;background-color: lightgray;color: black;}");
        AddStyle(null, "#OptionsButton {margin-right: 10px; height: 28px; width: 32px; background-size:15px 15px; background-repeat:no-repeat; background-position:center;}");
    }
    else
    {
        AddStyle("YTF_FW", "#FilterWindow{position: fixed;z-index: 9999999999999; right: 10px;top: 95px;background-color: #E9EAEA;border: 1px solid black;}#FilterWindow div{color: gray;text-decoration-style: none;padding: 3px 5px;}#FilterWindow tr:hover{text-decoration-style: none;background-color: lightgray;color: black;}");
        AddStyle(null, "#OptionsButton{height: 32px; width: 32px; margin: 0; padding: 0; position: fixed;color: #777979; right: 10px;top: 60px;border-radius: 3px;background-color: lightgray;border: 1px solid darkgray;cursor: pointer; z-index:99999999999999999;}#OptionsButton:hover{background-color: darkgray;color: black;}");    
    }        
    AddStyle(null, ".blockBTN32, .blockBTN16, .unblockBTN{cursor:pointer; background-image: url(data:image/png;base64,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);background-size: contain;z-index: 100;}");
    AddStyle("YTF_BT",".unblockBTN{display: inline-block;width: 16px;height: 16px;} .blockBTN32{display: block;width: 32px;height: 32px;}a.aaTT:hover .blockLINKS{visibility: visible;} .blockBTN16 {display:block; background-color: black;border: 1px solid red;height: 24px;width: 24px;}");
    AddStyle("YTF_BL", ".blockLINKS{position: absolute;top: 2px;visibility: hidden; z-index: 100; right: 2px;} .blockLINKS a:nth-child(2){line-height:normal; background-color:yellow; border: 1px solid blue; display:block;text-align:center;}");
    AddStyle("YTF_NB", ".banNotice {position:absolute; z-index: 1000; font-size:medium;} .banNotice > span { display:table-cell; background-color:yellow; text-align: center; vertical-align: middle; }");
    AddStyle("YTF_PC", "#FloatArea{position: fixed; right: 0px; top:10px; border: none; visibility:hidden; height: 200px; width:140px;}");    

    MainFunc();    
})();



/*
1-3, Default is same as HQdefault but thumbnail size
http://img.youtube.com/vi/<insert-youtube-video-id-here>/<1-3>.jpg
http://img.youtube.com/vi/<insert-youtube-video-id-here>/default.jpg

0 & HQ default are the same
http://img.youtube.com/vi/<insert-youtube-video-id-here>/0.jpg
http://img.youtube.com/vi/<insert-youtube-video-id-here>/hqdefault.jpg

http://img.youtube.com/vi/<insert-youtube-video-id-here>/maxresdefault.jpg
https://developers.google.com/youtube/2.0/developers_guide_php?csw=1
*/
