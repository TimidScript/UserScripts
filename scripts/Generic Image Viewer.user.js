// ==UserScript==
// @name            [TS] Generic Image Viewer
// @namespace       TimidScript
// @version         1.2.27
// @description     A more Powerful Image Viewer with info panel support for Pixiv, deviantArt, imgur, Seiga Nico and nijie.info. NEW: Image rotation and flip added.
// @icon            https://i.imgur.com/6yhR6jx.png
// @author          TimidScript
// @homepageURL     https://openuserjs.org/users/TimidScript
// @copyright       © 2014 TimidScript, All Rights Reserved.
// @license         Creative Commons BY-NC-SA + Please notify me if distributing
// @require         https://openuserjs.org/src/libs/TimidScript/TSL_-_Generic.js
// @include         *
// @require         https://openuserjs.org/src/libs/TimidScript/TSL_-_GM_Update.js
// @homeURL         https://openuserjs.org/scripts/TimidScript/[TS]_Generic_Image_Viewer
// @grant           GM_getValue
// @grant           GM_setValue
// @grant           GM_listValues
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


Hotkeys:
  1 = Num 1 => Auto-Height
  2 = Num 2 => Auto-Width
  3 = Num 3 => Auto-Stretch
  4 = Num 4 => Enlarge/Shrink to Client Area
  ` = Num 0 => Reset Size
  5 = Num 5 => Change Background Colours

------------------------------------
 Version History
------------------------------------
1.2.27 (2015-05-14)
 - As of 11/05/2015 the Phone API (SPAPI) is dead. Using TSL-Pixiv library to get information from HTML.
 - Avoided the usage of Public API to bypass multiple login and timeout
 - Changed the hotkeys to match Pixiv Manga Viewer
.
.
.
1.0.1 (2013-10-06)
 - Initial Release with Pixiv Support Only
**********************************************************************************************/

function makeStruct(names)
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
//#endregion ---------------------------------------------

//#region Global Variables
/*
==============================================================================================
 VYCC: Variables You Can Change
==============================================================================================*/
//GM_setValue("BGColors", '["#252525", "#EDE9E9", "#E7FDF7", "#F1E8D2"]')  //Image Background Colours


var ResizeMode = GM_getValue("ResizeMode", 0); //Bit operator for fitting and expanding images. (1 = FV, 2 = FH, 4 = Expand)
var BGColor = GM_getValue("BGColor", 0);
var BGCOLORS = JSON.parse(GM_getValue("BGColors", '["#0D0D0D", "#D3CFCF", "#E2FFF7", "#FBFBD6", "#FFF"]'));
var ScrollBarThickness = TSL.getScrollBarThickness();
//#endregion Global Variables

function DisplayMessage(msg)
{
    //text-align: center; display:inline-block; width: 100px; background-color: #D3D3D3; border: 1;
    var msgBox = document.getElementById("msgBox");
    if (!msgBox)
    {
        msgBox = document.createElement("span");
        msgBox.id = "msgBox";
        msgBox.setAttribute("style", "position: fixed; bottom: 30px; left: 10px; min-width: 200px; background-color: #D3D3D3; padding-left:10px; border-style: solid; border-color: #FF0000; text-align:left;");
        document.body.appendChild(msgBox);
    }
    msgBox.style.visibility = null;
    var div = document.createElement("div");
    div.textContent = msg;
    msgBox.appendChild(div);

    setTimeout(function (el) { if (el.parentElement.children.length == 1) el.parentElement.style.visibility = "hidden"; el.parentElement.removeChild(el); }, 2000, div);
}

function CreatePanelControl(text, href)
{
    var panel = document.createElement("span");
    panel.setAttribute("style", "text-align: center;vertical-align: middle;display: table-cell;margin: 0;padding: 0;");
    var link = document.createElement("a");

    if (text) link.textContent = text;
    if (href) link.href = href;

    panel.appendChild(link);
    return panel;
}

function CreatePanelControlImage(href, imgSrc)
{
    var panel = CreatePanelControl(null, href);
    var image = document.createElement("img");
    image.src = imgSrc;
    panel.firstElementChild.appendChild(image);
    return panel;
}

function CreatePanelControlIcon(text, classname, href)
{
    var panel = CreatePanelControl(null, href);
    panel.firstElementChild.setAttribute("src", href);
    panel.firstElementChild.href = "";
    var div = document.createElement("div");
    div.className = classname;
    panel.firstElementChild.appendChild(div);
    panel.firstElementChild.title = text;
    return panel;
}

var ControlHQ =
{
    data: new (makeStruct("imgTitle imgURL userIcon userHome userName userGallery"))(),
    flash: false,

    displayImage: function (imageSrc)
    {
        ControlHQ.data.imgSrc = imageSrc;
        for (var i = document.head.children.length - 1; i >= 0; i--)
        {
            var child = document.head.children[i];
            if (child.tagName != "title") document.head.removeChild(child);
        }

        for (var i = document.body.children.length - 1; i >= 0; i--)
        {
            var child = document.body.children[i];
            if (child.id != "USOUpdaterMenu") document.body.removeChild(child);
        }

        /* Add Image
        ********************/
        document.body.setAttribute("style", "padding:0;margin:0;color:black;background-color:#252525;");
        var div = document.createElement("div");
        var img = document.createElement("img");
        img.id = "theImage";
        img.onload = ControlHQ.readjustImageSize;
        img.src = imageSrc.replace(/(\?\d+$|\?[^\\\.\/]+$)/, "");
        //TODO: Remove irrelevant image source prefix
        img.src = imageSrc.replace(/\?\d+$/, "");
        setTimeout(ControlHQ.readjustImageSize, 500);

        div.setAttribute("style", "vertical-align: middle; text-align:center; display:table-cell;");
        div.appendChild(img);
        img.setAttribute("style", "top:0;bottom:0;margin:0");
        document.body.appendChild(div);

        var a = document.createElement("a");
        a.href = img.src;
        document.body.appendChild(a);

        ControlHQ.resizeButtonsAdd();
        ControlHQ.readjustImageSize();
        ControlHQ.setBGColor();

        window.addEventListener("keydown", ControlHQ.keyDownCallback, true);
        window.onresize = ControlHQ.readjustImageSize;

        document.createElement("div");

        /* Set favourite icon
        **********************/
        var link = document.createElement('link');
        link.type = 'image/x-icon';
        link.rel = 'shortcut icon';
        link.href = img.src;
        document.head.appendChild(link);
    },

    setBGColor: function (change)
    {
        if (change)
        {
            BGColor++;
            if (BGColor >= BGCOLORS.length) BGColor = 0;
            GM_setValue("BGColor", BGColor);
        }

        //document.getElementById("BGColorBtn").style.backgroundColor = BGCOLORS[BGColor];
        document.body.style.backgroundColor = BGCOLORS[BGColor];
    },

    registerLinkPanel: function ()
    {
        var linkPanel = document.getElementById("LinkPanel");
        linkPanel.setAttribute("style", "position: fixed; left: 10px; top: 10px; z-index:100; border: 1px ridge gray; padding: 5px; background-color:lightgray;");

        ControlHQ.infoID = setTimeout(function () { document.getElementById("LinkPanel").style.visibility = "hidden"; }, 1500);
    },

    createLinkPanel: function ()
    {
        TSL.removeNode("LinkPanel");
        var panel;
        var linkPanel = document.createElement("div");
        linkPanel.id = "LinkPanel";

        var data = ControlHQ.data;

        if (data.imgURL)
        {
            panel = CreatePanelControl(data.imgTitle, data.imgURL);
            linkPanel.appendChild(panel);
        }

        if (data.userHome)
        {
            if (!data.userIcon) data.userIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABW0lEQVR42mNkwAECAoNZGBkYVgKZCv8ZGFw2rF/7Hps6RmyCvn7+TIwMjIuAstFggf8MJ/4z/HfZvGnjV6IM8Pb2nQakMtGE9wBN8tm6dctPvAZ4eHh1AAXLsRkM9Mo6IBm+Y8f2P1gNcHN1rwBS7Qz4wYL///8n796z6x+KAc5OzkAnM05jIAr8n7h3394CuAEO9g7AwGJcjCtMcBjScODggUZGWxtbb6C+DUARFuI1ww3JZrSxslEEsuSB/nIH0hVE6lzAyMi4EEi/gTvZwsw8AUjNJ9KAxhOnTjagBKKpsQlJBpw+ewbVACMDQxQDGEHhwshwEeJVoBcZ/icgG3DuwnlUAwx09dBdkHjh8qUFUDkHILUf2QCgHKoBulraGAZcvnZ1AVQOwwCgHKoBWuoaGAZcu3ljAVQOwwCgHKoB6iqqIEW7gJgVZsDNO7cXIMnBDPgPlQNFIwMAOj56D6356V8AAAAASUVORK5CYII";
            panel = CreatePanelControlImage(data.userHome, data.userIcon);

            var image = panel.getElementsByTagName("IMG")[0];
            image.style.margin = "0 5px 0 10px";
            image.style.height = "20px";
            image.style.width = "20px";
            linkPanel.appendChild(panel);
        }

        if (data.userGallery)
        {
            panel = CreatePanelControl(data.userName, data.userGallery);
            linkPanel.appendChild(panel);
        }


        if (ControlHQ.flash)
        {
            document.getElementsByTagName("embed")[0].height = "96%";
            linkPanel.setAttribute("style", "background-color:#FBFBD6;");
            document.body.insertBefore(linkPanel, document.body.firstElementChild);

            var flash = document.getElementsByTagName("Embed")[0];
            panel = CreatePanelControl("[SWF]", flash.src);
            panel.firstElementChild.style.marginLeft = "10px";
            linkPanel.appendChild(panel);
        }
        else
        {
            if (linkPanel.lastElementChild) linkPanel.lastElementChild.style.paddingRight = "20px";

            TSL.addStyle(null, ".sourceGoogle, .sourceSauce, .sourceImgOps, .sourceIQDB, .sourceTinyEye {height:24px; width:24px; background-size: cover;  background-repeat:no-repeat; border: 2px solid black; margin-right: 5px;}");
            TSL.addStyle(null, ".sourceIQDB { background-image: url(data:image/x-icon;base64,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NP+Nnaz/zeT+/8zj/f/K4P7/xdv9/7/U/P+ow/r/haj4/3uh9v99o/f/nrz6/77T9f9iW7X/enDs/4yI8P+YmfP/lpfy/4OUzv/J4f3/oLPL/7zT8v+AmcH/eJ3e/4my+f+Ls/n/i7T6/463+v87RU//REtd/05Sav84Y4n/R6X4/0Wl+P88g8L/MjtI/zI7SP81PUz/TVFu/3R8sf9fZY7/T1h5/zM4SP85SF7/O0hd/5G5+v+Tu/r/e4ud/42drv/N4/3/zeP9/8zi/f/I3/3/xNr8/77S/P+cufn/f6T3/3yi9/9/pPf/sMn7/8PZ/P+CjLP/dmzh/21j0v9lYbb/g4y5/8bb9v/M4v7/kqS6/3qZzP+LtPn/irP6/32i4v+Mtfr/jrb6/422+P9ASVb/U1dw/zg/S/8/e7D/Sab5/0el+P89hMH/MzxJ/zM8Sv9KT2n/XmSK/2dtmf9KUGv/TVV1/zI+VP8tNUL/bou6/5G5+v9zjbX/KjI7/7rQ7P/O4/7/zeT+/8zi/v/I3v7/w9j8/77S/P+xyPv/lLP4/5e1+f+sxPr/n7nk/8HX/P/F3Pv/nrHH/7HH3v/J4vz/yuP9/8vi/v/L4v7/h5/B/4+4+f+KtPr/eaDf/2SBtP+Otvr/j7f6/4Kq3/9TWHH/REpa/0hPY/9Ch8P/Sqb5/0mm+f8/hsX/ND1K/0RLYP9RVXL/Vlx8/05Sbv9bYYb/OkRZ/zE4Rv9RXnn/kLj6/3GPvv8tNUP/UF94/7XO8P/O4/7/zeP+/8zi/v/I3f3/wtj8/77T/P+5zvz/tcv7/7XL+/+wxvT/pLzn/8DV/P/E2v3/x9/+/8ri/v/K4/3/yuP9/8rj/f/K4/3/hZq1/5S7+v92m9f/LDpP/4Ot8f+Nt/r/hq/r/5S67v9YXHb/Vlp1/0dOYP9Dicf/S6f4/0un+P9Dj9L/OkJQ/1JWc/9NUmz/REpf/1FVcv9QV3T/O0hb/z1EV/+HqeP/aISx/y43RP87QVb/f5zK/3N/jf/O4/7/zuP+/8zi/v/J3v7/xNr8/8DV/P+70Pz/uM37/7jM+/+5zfv/ssr7/7DK+/+70/z/xdv8/8ff/v/L4f7/yuL+/8rj/f/L5P3/ZV1b/3KFn/8kLT//YH6u/4i0+/95ntv/kbjr/1Numf9bX3v/U1hw/0tSZv9Dhr//S6j3/0un+P9Ppu3/SExh/09Ubv87Q1P/UFVw/09UcP9FUGf/REhe/2iHvP9VbJL/LjdD/0BGXf9VY4L/YnSL/3F8jv/P5P7/zuP+/83j/v/K4P3/xt39/8PZ/P+/1Pz/u9H8/7rQ+/+60Pv/kbP5/4Wr+P+Zufn/wtj8/8Xc/f/H3/3/yuD+/8zj/v+/0+n/Pzk6/ycvQv9LXYL/gqrr/0Zcfv95ndf/aYi6/yYuQv9aXnn/U1lw/0RMW/9DfrH/Tan4/0uo9/9eu/v/QlJr/zpDUf9LUGj/U1d0/0tQaf9NUWv/UWOH/0BQaP8yO0j/Q0lg/0tQaf9VYnP/OT9S/6W2yv/P5f7/z+X+/83k/v/M4v7/yd/9/8bd/f/D2fz/wtT0/4eVrv99jKf/tMz6/5+++v+zzPv/wtj8/8Ta/f/G3f3/yN/+/9nq/v+Uoa//MThR/zM7U/9HXX7/KTJG/2SDtP9zls//JjBE/0JQcf9aX3n/VVpz/z5HVP9Fcpz/Tan4/06q+P9vzP3/PWGC/0hPY/9VWXb/VFh1/05Sa/9DUGj/P05j/zU8Sf9TWXj/TlJu/zA2Qv84QFD/XmZ6/8/l/v/P5f7/z+X+/8/l/v/N5P7/zOL9/83h+v+IkqD/JFFw/xmEv/87kL3/Q2F8/7LG5//C2Pz/w9n9/8Xb/f/G3f3/0eT+/+71/v9eaXn/JS8//ygwQv82PVj/aoi7/3me2f8pNEj/MjdS/2mJvf9dYnz/TFNl/1BXbP9UbYv/T6n4/1Sw+f920/7/TYSw/1dceP9WWnf/S1Bm/zQ7Rf88RFP/WmSG/2xyn/9XXHz/NjtK/zhAUP9MUGn/ssTZ/8/l/v/P5f7/z+X+/8/l/v/F2vH/h4aK/0hKUv8UIzb/E0Rn/x9IXP81iKP/OrXh/yVJYv+ru9X/0Njj/8bc+//N4f3/5Ov2/9DZ5P8rMkL/MTlP/yUrO/8tO0//JzNF/xoiLv82O1b/Iic3/xUbJf9eYn3/VFpv/11hfP9UWnH/V6/x/2zI/P930/7/YbLg/1JWbv9PVWz/TVNp/1NYcv9XW3r/foa8/4GJwv9FTGH/PURV/05Tbv+Fkab/xt/9/6vJ9v+myPz/zeP+/8/l/v9icIH/LzAz/5eaoP86QEn/FBoi/xMYIf8SGSP/isjg/0qby/9WY2//5Ojy/+Lm6v/s8/7/s7i+/1Vc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c/9YdIj/es71/3bO/f9sw/v/c8Tq/1lxiP9dYXv/XWF8/1VZcf9LUGL/UVhu/213nv9/h7j/VFhy/0RKWv9XX3z/YWmM/1VZdv8+RFP/PURU/0xRa/9MUWr/TlFs/zY8Sv87QlT/P0JW/z9Scf86erX/OYnP/zqM0/84hMj/M2uf/ztNaf9UYIP/WGWL/1dojf9keqL/dImp/2+NqP9pbYb/aGyF/2drhP9na4T/ZmqD/2Vpgv9laYL/ZGiB/2Rogf9jZ4D/X3OK/3bE6P950f3/Z7/7/3HJ+v9jmLT/VWF3/1pfeP9cYHz/W197/1ldef9eY4H/hIu//3yEtP9hZoj/TVFm/0lOYf9SV3H/VFh1/1RYdP9KTmb/QEVY/0NJX/82U3L/PH+8/0Oi9v9Co/f/QaP3/0Gj+P8/nvL/NoDB/2CHt/+Pt/b/iK3p/2+WzP9ak8n/O4G+/5240/9kaH3/am6H/2lthv9maoL/Z2uE/2drhP9maoP/ZWmC/2Rogf9gZHv/WV5x/1Jaav9ZhJ7/VZPB/0yEtv9NfaT/RWiJ/0BIUv9RVGf/ZmyN/3h+qv+Di77/c3mi/2hukv9pbpP/bXOa/3F3of9fZIX/Vlp2/1VZdv9MUmv/PFBq/zZtm/87gb3/PYjJ/zyIy/89is//OoXH/zyS2/83gL//OIXI/z2Q1v86icz/OpDc/z6g9/8/l+H/nbXO/87j/v90cHz/am6H/2puh/9hZ3z/aGyF/2drhP9na4T/ZmqD/2Vpgv9laIL/Y2eA/15jef9YXnH/U1pr/1FYaf9PVmf/UFZo/1JYbP9VWnD/UlVp/1VZcP9dYn7/aG6R/3F3oP98hLP/fIOy/2Noiv9OU2v/SV9//0t/q/9QpOX/U7D6/1Ot8v9Jmdn/P4rL/0OPzf9Kls3/SZbO/zh8t/9IqPX/UJ/Q/2PE/P9fw/z/Urb7/2DD/f9yobv/zuP+/87j/v+Yion/a2+I/2puh/9hZnr/ZmqC/2hshf9obIX/Z2uE/2drhP9maoP/ZWmC/2Rogf9kaIH/Y2eA/2Jmf/9hZYH/YWV//2Bkfv9fY37/XmJ+/1tfeP9RVGj/SExb/0tRY/9DSVf/OEBL/0Ruiv9JeJP/R36l/1ykzP9rveT/dNH9/3HP/v9pyPz/bs79/3DR/f9w0f7/ZMT8/0Sk+P9Lk8H/ZrPV/2q+5f9ryvj/asz6/12r0P+lv97/uNX8/8Pc/P/Suq//aGyC/2tviP9nbIP/XGNz/2puh/9pbYb/aGyF/2drhP9na4T/ZmqD/2Vpgv9kaIH/Y2eA/1xfdP9XWm7/Vlls/1JWZ/9MUV//RkxY/0RLVv9MWGr/XmyI/11og/9QV2z/Vlt1/0Z2o/9Mn+f/PnGd/0SIxP9HmN7/R5DL/1Cazf9Xos//Yq7U/5TY9v+l4v3/a8f8/0CLzP8zRVX/MjpG/zpAUv8/Q1j/Qkhf/0ZVbP9uh6z/j6nO/56/8P/Pysf/h4eS/2xwiP9rb4j/V19t/2lthf9qbof/aW2G/2hshf9na4T/Z2uE/2Zqg/9laYL/ZWmC/2Rogf9kaIH/YWV9/2Jmf/9iZYD/YWV//2Bkff9fY37/YGSB/2twk/9tc5j/Vl52/0dTZf9HhLv/T6f3/0SJxP9AeKn/Q4jD/0mh7f9Lp/j/S6X1/0eR0/9bnM7/UZrJ/z5mjf9ES2P/P0Za/zc/T/8wOEX/LDM9/0NRZ/9WaYj/bomw/42kx/+TlqH/0NHT/2tvhv9tcYn/X2Z3/15ldv9qbof/am6H/2puh/9ma4P/aGyF/2drhP9na4T/ZmqD/2Vpgv9kaIH/ZGiA/1xfdP9TVmb/S1Bd/0lPW/9HTVn/Q0pV/0FHUf9KVGP/X2uH/2l1mP9fZoT/SHCa/1u09f9WpNz/S42+/0KCuf9Disb/S6f4/0un+P9Lp/j/Sqb5/0im+f8/h8f/OEBP/0ZMYv9LT2n/SE1n/0lRa/9SW3v/OD5P/0NKWv9nbH3/5OXm/42Qmv9tcYr/aW6E/1NcZ/9obYT/a2+H/2puh/9kaX//X2V4/2hshf9na4T/Z2uE/2Zqg/9kaIH/XWF2/2NngP9kaIH/Y2eA/19je/9gZX//b3WY/4GItv95gKr/aG2O/1lddP9LT2D/PUJM/0dldP91z/n/d9P+/2Wx1f9Kh7P/QH6z/0qk8/9Lp/j/R5jf/0OIwP8/dqP/R01k/ztDU/8uNT7/YnaZ/4mXtf+Ej6j/f4uh/4mXrP9kaXX/m56p/+Dg4f9tcYb/bnKK/1xjcv9cY3L/bHCI/2tviP9qbof/WmBx/1ZaaP9maoP/aGyF/2drhP9qbon/aW6K/1xjd/9VXW7/WWF0/2VtiP9vdpf/Z22K/1VZbf9JTVv/QUZP/z5ETP8/Rk//QUhT/0hQYP9WeZD/d9P9/3fT/v920/3/Y6rN/0h3lP9Disj/RI3N/125+/83VXD/QEVW/09Tbv9JUmv/RFJm/5Oy4//I4P3/z+X+/87j/v+ztbj/cHeN/9fS0v+jlpb/b3OL/2puhP9VXmj/Zmt//2xwiP9rb4j/am6H/11jdf9PVV//Wl5v/2drg/9obIb/cXaV/3uBpv+BiLL/fYeu/2Vvif9TWmv/UVho/1BXZ/9PV2f/UVhp/1NZbP9YXXT/XWF8/11ifP9VWG//WYmg/3jT/v951P7/ktz+/4rY/f9Ro+L/V7P5/1GWw/8+Z43/P0VV/3CJsf9VXnn/YWqQ/z5JWv9+msb/vNj8/87j/v8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=); }");
            TSL.addStyle(null, ".sourceSauce { background-image: url(data:image/bmp;base64,Qk02AwAAAAAAADYAAAAoAAAAEAAAABAAAAABABgAAAAAAAADAADEDgAAxA4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA////////////////////////////////////////////////////////AAAAAAAA////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA////AAAAAAAA////AAAA////////AAAAAAAAAAAAAAAAAAAAAAAA////////AAAA////AAAAAAAAAAAAAAAA////////////AAAAAAAAAAAAAAAA////////////AAAAAAAAAAAAAAAAAAAAAAAAAAAA////////////AAAAAAAA////////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA////////////////////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA////////////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA////////////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA////////////////////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA////////////AAAAAAAA////////////AAAAAAAAAAAAAAAAAAAAAAAAAAAA////////////AAAAAAAAAAAAAAAA////////////AAAAAAAAAAAAAAAA////AAAA////////AAAAAAAAAAAAAAAAAAAAAAAA////////AAAA////AAAAAAAA////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA////AAAAAAAA////////////////////////////////////////////////////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA);}");
            TSL.addStyle(null, ".sourceImgOps { background-image: url(data:image/x-icon;base64,AAABAAEAEBAAAAAAAABoBQAAFgAAACgAAAAQAAAAIAAAAAEACAAAAAAAAAEAAAAAAAAAAAAAAAEAAAAAAAAAAAAA/wAAAP///wAA7v8AAP8VAC8A/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFBQUFBQUAAAAAAAAAAAAABQUFBQUFAAAAAwMDAwAAAAUFBQUFBQAAAAMDAwMAAAAFBQUAAAAAAAAAAAMDAAAABQUFAAICAgICAgADAwAAAAUAAAAAAAACAgIAAwMAAAAFAAQEBAQAAgICAAMDAAAABQAEBAQEAAICAgADAwAAAAUABAQEBAACAgIAAAAAAAAAAAQEBAQAAgICAAEBAQAAAAAEBAQEAAICAgABAQEAAAAABAQEBAAAAAAAAQEBAAAAAAQEBAQAAQEBAQEBAQAAAAAAAAAAAAEBAQEBAQEAAAAAAAAAAAAAAAAAAAAAAAD/AAAAgQAAAIEAAACBAAAAAQAAAAEAAAABAAAAAQAAAAAAAAAAAAAAAAAAwAAAAMAAAADAAAAAwAAAAP4AAAA=); }");
            TSL.addStyle(null, ".sourceGoogle { background-image: url(data:image/x-icon;base64,AAABAAIAEBAAAAEAIABoBAAAJgAAACAgAAABACAAqBAAAI4EAAAoAAAAEAAAACAAAAABACAAAAAAAAAEAAASCwAAEgsAAAAAAAAAAAAA9IVCSvSFQuf0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hULk9IVCSvSFQub0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQuf0hUL/9IVC//SFQv/0hUL/9Y1O//rIq//+7+f//eXX//vUvf/7z7X/96Fu//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//vYwv/97OH/9ZRZ//SFQv/0hUL/9IhG//zbx//3om7/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/97uX/+buW//SFQv/0hUL/9IVC//SFQv/5upT/+9O6//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/+b6b//zezP/0iEf/9IVC//SFQv/1klf//ezh//vPtP/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/3qXr/+siq//m8lv/5wqD//vTu//3t4//1klb/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0h0b//vbx//zi0//1j1H/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/2nmn/+bmS/////v/4sIX/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/5uJH///v5//eoef/1jU//+82y//afav/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL//vXw//vOs//0hUL/9IVC//ekcf/96+D/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//728v/4sIX/9IVC//SFQv/4s4n///v4//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/6yKn/+byX//SFQv/0hkT//eTV//vWv//0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IZE//m6lP/5u5b//OHQ///+/f/6y6//96d3//SFQv/0hUL/9IVC//SFQv/0hULm9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hULm9IVCSfSFQub0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hULm9IVCSQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAoAAAAIAAAAEAAAAABACAAAAAAAAAQAAASCwAAEgsAAAAAAAAAAAAA9IVCAPSFQif0hUKt9IVC8vSFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQvL0hUKt9IVCJ/SFQgD0hUIo9IVC7/SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hULv9IVCKPSFQq30hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUKt9IVC8fSFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQvP0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9YtL//i2jv/828f//vLr///7+P///Pv//vTu//3n2v/6zbH/96Nw//SFQ//0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//ekcv/+8+z////////////+9fD/+9K5//m9mf/4to7/+buV//vSuf/++PT//OPT//aYYP/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/2l13///r3/////////fv/+b2Z//SIRv/0hUL/9IVC//SFQv/0hUL/9IVC//WNT//84M///vXv//aZYf/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//vPtP////////////i0i//0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//WQUv///Pr//OPU//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL//eTV///////+9O7/9IVD//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//3m2P//////9ppi//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/718H///////3s4f/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL//vDn///////4soj/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//erff////////38//WTWP/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//iziv////////////iwhf/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//rMsP///////eXW//WSVv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/4sYb///z7/////////Pv/9ZFV//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//ixhv/+8Of//vn1//rMsP/4rH//9plh//WQUv/1j1L/+s2x//////////////////m9mf/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SGQ//2nmn/+buW//vNsv/82sb//e3j/////////////////////v/5wZ//9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/83Mj////////////++fb/+K+C//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9ZRZ/////////////vTt//aaYv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/1lFr////////////6xqf/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//ehbf/70bj//end//3o2////v3///////3l1//0iEb/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/5wqD////////////96t7/96Z2//WOUP/2nWf//NvH//zcyP/1i0z/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/96l6/////////////vLr//WPUf/0hUL/9IVC//SFQv/0h0b//end//3k1f/0iUn/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/8387////////////4sYf/9IVC//SFQv/0hUL/9IVC//SFQv/6w6L///////nBn//0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC///69////////vj1//SIR//0hUL/9IVC//SFQv/0hUL/9IVC//m+mv///////e3j//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL///r3///////8387/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/+syw///////++fb/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/95NX///////vUvP/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/97OH///////7y6//0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//i2jv///////N/O//SFQv/0hUL/9IVC//SFQv/0hUL/96Nx////////////+s2x//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IdF//zh0P//+/j/9ZJW//SFQv/0hUL/9IVC//SKSv/96t7///////738v/1k1f/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9YxN//vUvf/96+D/96Z0//WNT//3om///ebY/////////Pv/+LKI//WVW//0h0X/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//agbP/7zbL//enc//749P////////////////////////////3r4P/3p3f/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hULx9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC8/SFQq30hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUKt9IVCJ/SFQu/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC7/SFQif0hUIA9IVCJfSFQq30hULx9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC8fSFQq30hUIl9IVCAIAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAB);}");
            TSL.addStyle(null, ".sourceTinyEye { background-image: url(data:image/x-icon;base64,AAABAAEAEBAAAAAAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAACxeDVItHk157iAO//WtW7/482G/+XOhv/lzYL/1L98/5mTcf8UKUP/CwsM/xwcG/8AAAD/AAAA/wAAAOcAAA5ItHo25LV7Nv+1ezb/tXs2/8GPSf/EoGj/s5hw/6KPdf93bWT/ZFdK/2daTP9hVEj/XU9C/zIpH/8EAgH/AAAA5LV7Nv+1ezb/tXs2/7V7Nv+1ezb/uIA+/8eea//Wtof/48eU/+PKkv/iyJP/4MeV/9u/kf/HqHz/rI1p/3tmT/+1ezb/tXs2/7V7Nv+1ezb/zKV0/+PKlP/hxXr/zbFk/8esYf/VuW7/3sFz/+LFdf/gw3P/48Z3/+nPjv/dwJD/tXs2/7V7Nv+1ezb/y6Nx/9/Gg/+NekT/V0wv/5uSfP95cmH/JiES/zAqGv86Mh3/W08v/3lpQP+Wg03/zLFn/7V7Nv+1ezb/uoVH/8myg/+VgUr/AAAA/2xpZf/i4+X/+fn5/0JAO/8AAAD/LCkl/768uf+/vr3/Mi8q/x0ZEP+2fDf/tXs2/6WGX/+pklP/JyES/0dFQP96eHX/W1tc//////9ua2X/DAoH/6Wim/+EhIX//////6ejnP8AAAD/wo1F/8GLQ//Conf/tZ1e/wYDAP9pZmH/6+vs/9/f3/////3/Pjoz/zo2Lf/Jycb/UlJT//////+xraX/AAAA/8OORv/Djkb/1bF+/821cf83MSD/MC4s//n49P//////l5OJ/wMCAP9IRDr/////////////////ZGBW/wAAAP/Djkb/w45G/8qkcP+sllr/wKtw/zw5Mf9MSUb/VlNM/wIBAP8AAAD/FxUP/9PQyv/8+/j/rKig/wkHA/8AAAD/w45G/8OORv+1jlj/l4hm/8etZv/QuHf/m4xk/21hSP9PRjX/Mi0j/xsYFf87NzD/VFBK/xUVFf8FBwz/CQsQ/8OORv/Djkb/g2I1/8Oea//Mt4z/uJxU/56hhv92nLj/l6ut/56poP+gpJL/mJeC/5aMbP+bjmv/m49t/52Qbv/Djkb/uItP/05PUP+zjlv/yptc/9C3jP9gYFP/ABVH/wAzc/8IP4T/FUuM/xhSmP99lZ3/5sRv/9S6cf/Lsmr/w45G/1B7rv8bbdT/LWy5/8OORv/Djkf/yqRw/zswIP8AAAD/AAAA/wAAAP8AAAD/Fyk8/5CKZ/+ahU3/modW/8GNReeEj5r/L37g/0Jxqf/Cjkf/w45G/8OORv/Fllb/clYw/zoqFf8hGQ3/IhwU/x4ZFf9HRUD/vaJ5/86pdee+ikU/woxEyZ6HZ/+8jEz/w45G/8OORv/Djkb/w45G/8OORv/Djkb/v4tF/8ORTf/GlFD/xJBJ/8KMRMm+ikU/gAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAE=); }");

            panel = CreatePanelControlIcon("IQDB", "sourceIQDB", "http://www.iqdb.org/?url=" + data.imgSrc);
            linkPanel.appendChild(panel);
            panel = CreatePanelControlIcon("SauceNAO", "sourceSauce", "http://saucenao.com/search.php?db=999&url=" + data.imgSrc);
            linkPanel.appendChild(panel);
            panel = CreatePanelControlIcon("ImgOps", "sourceImgOps", "http://imgops.com/" + data.imgSrc.replace("http://", ""));
            linkPanel.appendChild(panel);
            panel = CreatePanelControlIcon("Google", "sourceGoogle", " http://google.com/searchbyimage?hl=en&site=search&image_url=" + data.imgSrc);
            linkPanel.appendChild(panel);
            panel = CreatePanelControlIcon("TinyEye", "sourceTinyEye", "http://www.tineye.com/parse?url=" + data.imgSrc);
            linkPanel.appendChild(panel);

            //Add & sign to links to avoid them being picked up by download managers.
            linkPanel.onmouseover = function ()
            {
                var links = this.getElementsByTagName("a");
                for (var i = 0; i < links.length; i++) if (links[i].getAttribute("src")) links[i].href = links[i].getAttribute("src");
            }
            linkPanel.onmouseout = function ()
            {
                var links = this.getElementsByTagName("a");
                for (var i = 0; i < links.length; i++) if (links[i].getAttribute("src")) links[i].href = "";
            }

            linkPanel.appendChild(panel);
            document.body.appendChild(linkPanel);
            ControlHQ.registerLinkPanel();
        }
    },

    resizeButtonsAdd: function ()
    {
        var btn, panel = document.createElement("div");
        panel.id = "ButtonPanel";

        TSL.addStyle("MonkeyNot", "#ButtonPanel {position:fixed; top: 50px; left: 10px; display:inline-block; z-index: 450; padding: 2px; background-color: #E1DFDF; border: 1px solid black;}");

        TSL.addStyle("Banananananana", ".resizeBTN, .transformBTN {height:32px;width: 32px; background-color: #F9FAFA; border: 2px ridge #05F505; border-radius: 5px; background-position: center center; background-repeat: no-repeat; cursor:pointer;}"
            + ".resizeBTN + .transformBTN, .transformBTN + .colourBTN {margin-top: 8px;}"
            + ".resizeBTN:hover, .colourBTN:hover, .transformBTN:hover {border-color:red;}"
            + ".colourBTN {height:20px;width: 32px; border: 2px ridge #05F505; border-radius: 5px; cursor:pointer;}"
        );

        for (var i = 0; i < 4; i++)
        {
            btn = document.createElement("div");
            btn.className = "resizeBTN";
            btn.onclick = ControlHQ.resizeButtonClick;
            panel.appendChild(btn);
        }

        var btns = panel.getElementsByClassName("resizeBTN");
        btns[0].style.backgroundImage = "URL('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAgklEQVR42mNkGGDAOOoAcjWeOXPmPzLfxMSELLNGHTC0HIBuKS5AimNIdjUhR5AaEmQFGy5HkBMNQysN4HIEuZZT7ABqgKHrAGDwL0bmA6MhdiAcEAPlLhmxDoADujuAWmBoO2BAC6IBLYoHtDIa0Op4UDRIcDlmZLQJRx1ACzDqAABrqFohocSl/AAAAABJRU5ErkJggg==')";
        btns[0].title = "Auto-Fit Height (1, Num 1)";
        btns[1].style.backgroundImage = "URL('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAeElEQVR42u3UbQqAIAwG4HanHcdOV8fZnbLAQERzLnIE7/4I6l4e8IMW5yIAAAAAAACeFkXkYOZXyF5GF3CNVoSmXwWwILS91GqqVR507t2KtdWSMwTImxMgpOn9Boxk/A/w+RGUNf0StkJcn6HrRzSjAAAAAAAAiN9oYiGanAXaAAAAAElFTkSuQmCC')";
        btns[1].title = "Auto-Fit Width (2, Num 2)";
        btns[2].style.backgroundImage = "URL('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAs0lEQVR42u2XYQqAIAyF804ep05Xx/FOlZAgw7k5zSW5P4L43j5zyjKLcpgJUCN2zp1+tNaKfcTCkDyEFEIkgslrIIoFWHIpRNFiKrkEYswa+A+AT4IZcwFyHlmAFo8Mx4fcXSsAzMvkBKkIJve6HcxvJfokAOeeA4D1mT64ABDiWwAln/CVI0hBdC9CKFS5hrFY7SHi7owCoGICjNeQqLZkFESXphSD6F6EMYTKj0mrmAAX79KqIbEwc3wAAAAASUVORK5CYII=')";
        btns[2].title = "Stretch (3, Num 3)";
        btns[3].title = "Fill Client Area while keeping ratio (4, Num 4)";

        for (var i = 0; i < 4; i++)
        {
            btn = document.createElement("div");
            btn.className = "transformBTN";
            btn.value = 0;

            btn.onclick = transform;
            panel.appendChild(btn);
        }

        TSL.addStyle("SpinMeRightRound", ".rotate90 {-webkit-transform: rotate(90deg); -moz-transform: rotate(90deg); -o-transform: rotate(90deg); -ms-transform: rotate(90deg); transform: rotate(90deg);}"
            + ".reflectMe {-webkit-transform: scaleX(-1) ; -moz-transform: scaleX(-1) ; -o-transform: scaleX(-1) ; -ms-transform: scaleX(-1) ; transform: scaleX(-1);}"
            );

        var btns = panel.getElementsByClassName("transformBTN");
        btns[0].style.backgroundImage = "URL('data:image/png;base64,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')";

        btns[1].style.backgroundImage = "URL('data:image/png;base64,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')";
        TSL.addClass(btns[1], "reflectMe");


        btns[2].style.backgroundImage = "URL('data:image/png;base64,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')";
        TSL.addClass(btns[2], "rotate90");
        btns[3].style.backgroundImage = "URL('data:image/png;base64,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')";

        for (var i = 0; i < BGCOLORS.length; i++)
        {
            btn = document.createElement("div");
            btn.className = "colourBTN";
            btn.style.backgroundColor = BGCOLORS[i];
            btn.bgc = i;
            btn.onclick = bgc;
            panel.appendChild(btn);
        }

        function bgc()
        {
            document.body.style.backgroundColor = BGCOLORS[this.bgc];
        }

        function transform()
        {
            var img = document.getElementById("theImage");
            var css = "";

            var btns = panel.getElementsByClassName("transformBTN");
            if (btns[1] == this) btns[0].value--;
            else this.value++;

            if (btns[0].value == -1) btns[0].value = 3;

            if (btns[0].value == 1) css = "rotate(90deg)";
            else if (btns[0].value == 2) css = "rotate(180deg)";
            else if (btns[0].value == 3) css = "rotate(270deg)";
            else btns[0].value = 0;

            if (btns[2].value == 1) css += " scaleX(-1)";
            else btns[2].value = 0;

            if (btns[3].value == 1) css += " scaleY(-1)";
            else btns[3].value = 0;

            css = css.trim() + "; ";
            css = "transform: " + css + "-webkit-transform: " + css + "-moz-transform: " + css + "-o-transform: " + css + "-ms-transform: " + css;

            TSL.addStyle("RobotsinDisguise", "#theImage {" + css + "}");

            if (this.value == 0) this.style.backgroundColor = null;
            else this.style.backgroundColor = "yellow";

            btns[0].style.backgroundColor = (btns[0].value) ? "yellow" : null;
            btns[1].style.backgroundColor = btns[0].style.backgroundColor;

            ControlHQ.readjustImageSize();
        }

        document.body.appendChild(panel);
    },

    resizeButtonsShow: function ()
    {
        clearTimeout(ControlHQ.btnID);

        document.getElementById("ButtonPanel").style.visibility = null;

        var btns = document.getElementsByClassName("resizeBTN");
        btns[0].style.backgroundColor = (ResizeMode & 2) ? "yellow" : null;
        btns[1].style.backgroundColor = (ResizeMode & 4) ? "yellow" : null;
        btns[2].style.backgroundColor = (ResizeMode & 8) ? "yellow" : null;
        btns[3].style.backgroundColor = (ResizeMode & 16) ? "red" : null;

        ControlHQ.btnID = setTimeout(function () { document.getElementById("ButtonPanel").style.visibility = "hidden"; }, 1000);
    },

    resizeButtonClick: function ()
    {
        var btns = document.getElementsByClassName("resizeBTN");
        for (var i = 0; i < btns.length; i++)
        {
            if (btns[i] == this)
            {
                ControlHQ.adjustSizeMode(i + 1);
                return;
            }
        }
    },

    readjustImageSize: function ()
    {
        var img = document.getElementById("theImage");
        var div = img.parentElement;

        div.style.height = window.innerHeight + "px";
        div.style.width = window.innerWidth + "px";

        var reverse = (document.getElementsByClassName("transformBTN")[0].value % 2 == 1);
        // 2=Height, 4=Width, 8=Stretch, 16=Fit
        if (!reverse)
        {
            img.style.maxHeight = (ResizeMode & 2) ? window.innerHeight + "px" : null;
            img.style.maxWidth = (ResizeMode & 4) ? window.innerWidth + "px" : null;
        }
        else
        {
            img.style.maxWidth = (ResizeMode & 2) ? window.innerHeight + "px" : null;
            img.style.maxHeight = (ResizeMode & 4) ? window.innerWidth + "px" : null;
        }

        if (ResizeMode & 16)
        {
            var imageRatio = (reverse) ? (img.naturalHeight / img.naturalWidth) : (img.naturalWidth / img.naturalHeight);
            var clientRatio = window.innerWidth / window.innerHeight;
            if (!reverse)
            {
                img.style.width = (imageRatio >= clientRatio) ? window.innerWidth + "px" : null;
                img.style.height = (imageRatio < clientRatio) ? window.innerHeight + "px" : null;
            }
            else
            {
                img.style.height = (imageRatio >= clientRatio) ? window.innerWidth + "px" : null;
                img.style.width = (imageRatio < clientRatio) ? window.innerHeight + "px" : null;
            }
        }
        else if (ResizeMode & 8)
        {
            if (!reverse)
            {
                img.style.height = (ResizeMode & 2) ? window.innerHeight + "px" : null;
                img.style.width = (ResizeMode & 4) ? window.innerWidth + "px" : null;
                //Resize taking into account ScrollBars
                if (ResizeMode & 2 && document.body.scrollWidth > document.body.clientWidth) img.style.height = (window.innerHeight - ScrollBarThickness) + "px";
                if (ResizeMode & 4 && document.body.scrollHeight > document.body.clientHeight) img.style.width = (window.innerWidth - ScrollBarThickness) + "px";
            }
            else
            {
                img.style.width = (ResizeMode & 2) ? window.innerHeight + "px" : null;
                img.style.height = (ResizeMode & 4) ? window.innerWidth + "px" : null;
                //Resize taking into account ScrollBars
                if (ResizeMode & 2 && document.body.scrollWidth > document.body.clientWidth) img.style.width = (window.innerHeight - ScrollBarThickness) + "px";
                if (ResizeMode & 4 && document.body.scrollHeight > document.body.clientHeight) img.style.height = (window.innerWidth - ScrollBarThickness) + "px";
            }
        }
        else
        {
            img.style.height = null;
            img.style.width = null;

            if (ResizeMode & 2 && document.body.scrollWidth > document.body.clientWidth) img.style.maxHeight = (window.innerHeight - ScrollBarThickness) + "px";
            if (ResizeMode & 4 && document.body.scrollHeight > document.body.clientHeight) img.style.maxWidth = (window.innerWidth - ScrollBarThickness) + "px";
        }

        //console.log(ResizeMode);
        //console.log(document.body.scrollHeight, document.body.clientHeight);
        //console.log();
        ControlHQ.resizeButtonsShow();
    },

    adjustSizeMode: function (mode)
    {
        var n = Math.pow(2, mode);
        var enabled = (ResizeMode & n);
        if (enabled) ResizeMode -= n; else ResizeMode += n;

        var msg = "";
        switch (mode)
        {
            case 1:
                msg = "Auto-height";
                break;
            case 2:
                msg = "Auto-width";
                break;
            case 3:
                msg = "Stretch";
                break;
            case 4:
                msg = "Fill Area";
                break;
        }

        if (mode > 0) DisplayMessage(msg + ((!enabled) ? " ON" : " OFF"));
        else DisplayMessage("Resize Off");

        ControlHQ.readjustImageSize();
        GM_setValue("ResizeMode", ResizeMode);
    },

    keyDownCallback: function (e)
    {
        //Hotkeys Set 1     : `, 1, 2, 3 & 4
        //Hotkeys Num Keys  : 0, 1, 2, 3 & 5

        if (e.keyCode == 53 || e.keyCode == 101)
        {
            ControlHQ.setBGColor(true);
            return false;
        }

        var mode = e.keyCode - 48;
        if (e.keyCode == 100) mode = 4;
        else if (e.keyCode != 101 && mode > 10) mode = mode - 48;
        if (e.keyCode == 192 || e.keyCode == 96) mode = 0;

        //console.log(mode, e.keyCode);
        if (mode >= 0 && mode < 5)
        {
            e.stopImmediatePropagation();
            if (mode == 0) ResizeMode = 0;
            ControlHQ.adjustSizeMode(mode);
            return false;
        }
        //109 Minus
        //107 Plus
    },

    monitorMouse: function (e)
    {
        ControlHQ.isMouseOverPanel(e, "ButtonPanel");
        ControlHQ.isMouseOverPanel(e, "LinkPanel");
    },

    isMouseOverPanel: function (e, id)
    {
        var panel = document.getElementById(id);
        if (!panel) return;
        if (TSL.isMouseEventInClientArea(e, panel))
        {
            if (panel.style.visibility)
            {
                clearTimeout(ControlHQ.btnID);
                ControlHQ.btnID = null;
                panel.style.visibility = null;
            }
        }
        else if (!panel.style.visibility && !ControlHQ.btnID)
        {
            ControlHQ.btnID = setTimeout(function () { panel.style.visibility = "hidden"; ControlHQ.btnID = null; }, 500);
        }
    }
};



(function ()
{
    if (window !== window.top) return;
    console.info("Generic Image Viewer");

    //Removes old settings
    var Version = 1002;
    if (GM_getValue("Version", 0) != Version)
    {
        var names = cloneInto(GM_listValues(), window);
        for (var i = 0; name = names[i], i < names.length; i++)
        {
            var skipNames = ["USO-Updater"];
            var found = false;
            for (var j = 0; j < skipNames.length; j++) found = found || (name.indexOf(skipNames[j]) == 0);
            if (!found) GM_deleteValue(name);
            GM_setValue("Version", Version)
        }

        ResizeMode = 0;
        GM_setValue("ResizeMode", 0)
    }

    if (document.URL.match(/.+\.swf(\?\d+)?$/) && document.body.children[0].tagName == "EMBED")
    {
        ControlHQ.flash = !(document.getElementsByTagName("embed")[0] == null);
        if (!ControlHQ.flash) return;
    }
    else if (document.URL.indexOf("http://lohas.nicoseiga.jp/o/") == 0)
    {
        var imgs = document.getElementsByTagName("img");
        ControlHQ.displayImage(imgs[1].src);
    }
    else if ((document.URL.match(/.+\.(jpg|gif|jpeg|png|bmp)(\?\d+|:large|\?[^\\\.\/]+)?$/i)
                || document.URL.match(/\/[a-zA-Z0-9]+$/)
                || document.URL.match(/^http:\/\/www\.pixiv\.net\/member_illust\.php\?mode=big&illust_id/))
            && document.body.children[0].tagName == "IMG")
    {
        var imgs = document.getElementsByTagName("img");
        if (!document.URL.match("img.youtube") && (imgs.length == 0 || imgs.length > 1 || document.body.children.length > 2)) return;
        ControlHQ.displayImage(imgs[0].src);
    }
    else return;


    if (document.URL.match(/http:\/\/[^\.]+\.pixiv\.net/gi))  //Pixiv Site
    {
        console.info("GIViewer: Pixiv");
        var id = document.URL.replace(/.+i\d+\.pixiv\.net\/(img|c\/).+\/(\d+)(_.+)?\.\w+(\?.+)?/, "$2");
        if (isNaN(id)) return;

        if (document.URL.match("/profile/"))
        {
            ControlHQ.data.userName = id;
            ControlHQ.data.userHome = "http://www.pixiv.net/member.php?id=" + id;
            ControlHQ.data.userGallery = "http://www.pixiv.net/member_illust.php?id=" + id;
            ControlHQ.data.userIcon = document.URL;
            ControlHQ.createLinkPanel();
        }
        else
        {
            ControlHQ.data.imgTitle = id;
            ControlHQ.data.imgURL = "http://www.pixiv.net/member_illust.php?mode=medium&illust_id=" + id;
            ControlHQ.createLinkPanel();

            GM_xmlhttpRequest({
                url: "http://www.pixiv.net/member_illust.php?mode=medium&illust_id=" + id,
                method: "GET",
                timeout: 15000,
                headers: { "User-agent": navigator.userAgent, "Accept": "text/html", Referer: "http://www.pixiv.net" },
                onload: function (response)
                {
                    if (response.status == 200)
                    {
                        var doc = new DOMParser().parseFromString(response.responseText, "text/html");
                        var script = doc.evaluate("//div[@id='wrapper']//script[contains(text(),'pixiv.context.illustId')]", doc, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
                        if (script)
                        {
                            unsafeWindow.eval("pixiv = {}; pixiv.context= {};");
                            unsafeWindow.eval(script.innerHTML);
                            ControlHQ.data.imgTitle = unsafeWindow.pixiv.context.illustTitle;
                            ControlHQ.data.userIcon = doc.querySelector(".user-image").src.replace(".jpg", "_s.jpg");
                            ControlHQ.data.userHome = "http://www.pixiv.net/member.php?id=" + unsafeWindow.pixiv.context.userId;
                            ControlHQ.data.userName = unsafeWindow.pixiv.context.userName;
                            ControlHQ.data.userGallery = "http://www.pixiv.net/member_illust.php?id=" + unsafeWindow.pixiv.context.userId;
                            ControlHQ.createLinkPanel();
                        }
                    }
                }
            });
        }
    }
    else if (document.URL.match(/http:\/\/[^\.]+\.deviantart\.net/gi)) //deviantart
    {
        console.info("GIViewer: deviantArt");

        var id = document.URL.replace(/\.(jpg|bmp|png|gif|swf)$/gi, "");
        id = id.substr(id.length - 7).toLowerCase();
        if (id[0] != "d") return;

        ControlHQ.data.imgTitle = "Illustration Page";
        ControlHQ.data.imgURL = "http://www.deviantart.com/gallery/#/" + id;

        var user = document.URL.replace(/.+_by_(.+)-d.+$/i, "$1");
        user = user.replace(/_/g, "-");

        if (user != document.URL)
        {
            ControlHQ.data.userName = user;
            ControlHQ.data.userHome = "http://" + user + ".deviantart.com";
            ControlHQ.data.userGallery = "http://" + user + ".deviantart.com/gallery/?catpath=/";
        }

        ControlHQ.createLinkPanel();
    }
    else if (document.URL.match(/http:\/\/[^\.]+\.imgur\.com/gi)) //imgur
    {
        console.info("GIViewer: imgur");
        var id = document.URL.replace(/.+\/(.+)\.(jpg|bmp|png|gif)$/gi, "$1");

        ControlHQ.data.imgTitle = "Image Page";
        ControlHQ.data.imgURL = "http://imgur.com/gallery/" + id;

        ControlHQ.createLinkPanel();
    }
    else if (document.URL.match(/http:\/\/[^\.]+\.nijie\.info/gi)) //nijie.info
    {
        console.info("GIViewer: nijie.info");
        /* Image filenames:
                count_num_userID_num
                userID_num_count
                count_userID_num */
        var user = document.URL.replace(/.+\/\d+_\d+_(\d+)_\d+\.(jpg|bmp|png|gif)(\?[^\/\\]+)?$/gi, "$1");
        if (user == document.URL) user = document.URL.replace(/.+\/(\d+)_\d+_\d+\.(jpg|bmp|png|gif)(\?[^\/\\]+)?$/gi, "$1");
        if (user == document.URL) user = document.URL.replace(/.+\/(\d+)_\d+\.(jpg|bmp|png|gif)(\?[^\/\\]+)?$/gi, "$1");

        ControlHQ.data.userName = user;
        ControlHQ.data.userGallery = "http://nijie.info/members_illust.php?id=" + user;
        ControlHQ.data.userHome = "http://nijie.info/members.php?id=" + user;

        ControlHQ.createLinkPanel();
    }
    else if (document.URL.match(/http:\/\/[^\.]+\.nicoseiga\.jp/i)) //Nico Nico Seiga
    {
        console.info("GIViewer: Nico Nico Seiga");

        var id = document.URL.replace(/.+\/(\d+)(\?[^\/\\]+)?$/i, "$1");
        ControlHQ.data.imgTitle = id;
        ControlHQ.data.imgURL = "http://seiga.nicovideo.jp/seiga/im" + id;

        ControlHQ.createLinkPanel();
    }
    else if (document.URL.match(/https?:\/\/img\.youtube\..+\/vi\//i)) //Nico Nico Seiga
    {
        console.info("GIViewer: Youtube");

        var id = document.URL.match(/\/vi\/([^\/]+)/i)[1];
        ControlHQ.data.imgTitle = "Video Page";
        ControlHQ.data.imgURL = "https://www.youtube.com/watch?v=" + id;

        ControlHQ.createLinkPanel();
    }
    else if (ControlHQ.flash) ControlHQ.createLinkPanel();
    else ControlHQ.createLinkPanel();

    window.onmousemove = ControlHQ.monitorMouse;
})();


/* Helpful information (Reverse image search)
********************************************************************************************
http://saucenao.com/search.php?db=999&url=
http://www.tineye.com/parse?url=
http://google.com/searchbyimage?hl=en&site=search&image_url=
http://imgops.com/<url-without-http>
http://www.iqdb.org/?url=


999 	All Databases
0	H-Magazines
1	H-Anime
2	H-Game CG
3	DoujinshiDB
4	pixiv Images
5	Anime
6	Nico Nico Seiga
7	Danbooru
8	drawr Images
9	Nijie Images
10	yande.re
TBA...
********************************************************************************************/
