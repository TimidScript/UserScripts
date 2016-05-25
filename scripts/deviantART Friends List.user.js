// ==UserScript==
// @name                [TS] deviantART Friends List
// @namespace           TimidScript
// @version             1.0.9
// @description         In your Watching list, links go to root Gallery instead of Profile Page
// @author              TimidScript
// @homepageURL         https://github.com/TimidScript
// @copyright           © 2016 TimidScript, Some Rights Reserved.
// @license             GNU General Public License v3 (GPL-3) + Read the License inside the script
// @include             *://www.deviantart.com/watching/*
// @require             https://greasyfork.org/scripts/19967/code/TSL - GM_update.js
// @homeURL             https://greasyfork.org/en/scripts/4680
// @updateURL           https://greasyfork.org/scripts/4680/code/4680.meta.js
// @grant               GM_xmlhttpRequest
// @grant               GM_info
// @grant               GM_getMetadata
// @grant               GM_getValue
// @grant               GM_setValue
// @grant               GM_deleteValue
// @grant               GM_registerMenuCommand
// @icon                data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABGdBTUEAALGOfPtRkwAAACBjSFJNAACHDwAAjA8AAP1SAACBQAAAfXkAAOmLAAA85QAAGcxzPIV3AAAKJ2lDQ1BpY20AAEjHnZZ3VFTXFofPvXd6oc0wAlKG3rvAANJ7k15FYZgZYCgDDjM0sSGiAhFFRJoiSFDEgNFQJFZEsRAUVLAHJAgoMRhFVCxvRtaLrqy89/Ly++Osb+2z97n77L3PWhcAkqcvl5cGSwGQyhPwgzyc6RGRUXTsAIABHmCAKQBMVka6X7B7CBDJy82FniFyAl8EAfB6WLwCcNPQM4BOB/+fpFnpfIHomAARm7M5GSwRF4g4JUuQLrbPipgalyxmGCVmvihBEcuJOWGRDT77LLKjmNmpPLaIxTmns1PZYu4V8bZMIUfEiK+ICzO5nCwR3xKxRoowlSviN+LYVA4zAwAUSWwXcFiJIjYRMYkfEuQi4uUA4EgJX3HcVyzgZAvEl3JJS8/hcxMSBXQdli7d1NqaQffkZKVwBALDACYrmcln013SUtOZvBwAFu/8WTLi2tJFRbY0tba0NDQzMv2qUP91829K3NtFehn4uWcQrf+L7a/80hoAYMyJarPziy2uCoDOLQDI3fti0zgAgKSobx3Xv7oPTTwviQJBuo2xcVZWlhGXwzISF/QP/U+Hv6GvvmckPu6P8tBdOfFMYYqALq4bKy0lTcinZ6QzWRy64Z+H+B8H/nUeBkGceA6fwxNFhImmjMtLELWbx+YKuGk8Opf3n5r4D8P+pMW5FonS+BFQY4yA1HUqQH7tBygKESDR+8Vd/6NvvvgwIH554SqTi3P/7zf9Z8Gl4iWDm/A5ziUohM4S8jMX98TPEqABAUgCKpAHykAd6ABDYAasgC1wBG7AG/iDEBAJVgMWSASpgA+yQB7YBApBMdgJ9oBqUAcaQTNoBcdBJzgFzoNL4Bq4AW6D+2AUTIBnYBa8BgsQBGEhMkSB5CEVSBPSh8wgBmQPuUG+UBAUCcVCCRAPEkJ50GaoGCqDqqF6qBn6HjoJnYeuQIPQXWgMmoZ+h97BCEyCqbASrAUbwwzYCfaBQ+BVcAK8Bs6FC+AdcCXcAB+FO+Dz8DX4NjwKP4PnEIAQERqiihgiDMQF8UeikHiEj6xHipAKpAFpRbqRPuQmMorMIG9RGBQFRUcZomxRnqhQFAu1BrUeVYKqRh1GdaB6UTdRY6hZ1Ec0Ga2I1kfboL3QEegEdBa6EF2BbkK3oy+ib6Mn0K8xGAwNo42xwnhiIjFJmLWYEsw+TBvmHGYQM46Zw2Kx8lh9rB3WH8vECrCF2CrsUexZ7BB2AvsGR8Sp4Mxw7rgoHA+Xj6vAHcGdwQ3hJnELeCm8Jt4G749n43PwpfhGfDf+On4Cv0CQJmgT7AghhCTCJkIloZVwkfCA8JJIJKoRrYmBRC5xI7GSeIx4mThGfEuSIemRXEjRJCFpB+kQ6RzpLuklmUzWIjuSo8gC8g5yM/kC+RH5jQRFwkjCS4ItsUGiRqJDYkjiuSReUlPSSXK1ZK5kheQJyeuSM1J4KS0pFymm1HqpGqmTUiNSc9IUaVNpf+lU6RLpI9JXpKdksDJaMm4ybJkCmYMyF2TGKQhFneJCYVE2UxopFykTVAxVm+pFTaIWU7+jDlBnZWVkl8mGyWbL1sielh2lITQtmhcthVZKO04bpr1borTEaQlnyfYlrUuGlszLLZVzlOPIFcm1yd2WeydPl3eTT5bfJd8p/1ABpaCnEKiQpbBf4aLCzFLqUtulrKVFS48vvacIK+opBimuVTyo2K84p6Ss5KGUrlSldEFpRpmm7KicpFyufEZ5WoWiYq/CVSlXOavylC5Ld6Kn0CvpvfRZVUVVT1Whar3qgOqCmrZaqFq+WpvaQ3WCOkM9Xr1cvUd9VkNFw08jT6NF454mXpOhmai5V7NPc15LWytca6tWp9aUtpy2l3audov2Ax2yjoPOGp0GnVu6GF2GbrLuPt0berCehV6iXo3edX1Y31Kfq79Pf9AAbWBtwDNoMBgxJBk6GWYathiOGdGMfI3yjTqNnhtrGEcZ7zLuM/5oYmGSYtJoct9UxtTbNN+02/R3Mz0zllmN2S1zsrm7+QbzLvMXy/SXcZbtX3bHgmLhZ7HVosfig6WVJd+y1XLaSsMq1qrWaoRBZQQwShiXrdHWztYbrE9Zv7WxtBHYHLf5zdbQNtn2iO3Ucu3lnOWNy8ft1OyYdvV2o/Z0+1j7A/ajDqoOTIcGh8eO6o5sxybHSSddpySno07PnU2c+c7tzvMuNi7rXM65Iq4erkWuA24ybqFu1W6P3NXcE9xb3Gc9LDzWepzzRHv6eO7yHPFS8mJ5NXvNelt5r/Pu9SH5BPtU+zz21fPl+3b7wX7efrv9HqzQXMFb0ekP/L38d/s/DNAOWBPwYyAmMCCwJvBJkGlQXlBfMCU4JvhI8OsQ55DSkPuhOqHC0J4wybDosOaw+XDX8LLw0QjjiHUR1yIVIrmRXVHYqLCopqi5lW4r96yciLaILoweXqW9KnvVldUKq1NWn46RjGHGnIhFx4bHHol9z/RnNjDn4rziauNmWS6svaxnbEd2OXuaY8cp40zG28WXxU8l2CXsTphOdEisSJzhunCruS+SPJPqkuaT/ZMPJX9KCU9pS8Wlxqae5Mnwknm9acpp2WmD6frphemja2zW7Fkzy/fhN2VAGasyugRU0c9Uv1BHuEU4lmmfWZP5Jiss60S2dDYvuz9HL2d7zmSue+63a1FrWWt78lTzNuWNrXNaV78eWh+3vmeD+oaCDRMbPTYe3kTYlLzpp3yT/LL8V5vDN3cXKBVsLBjf4rGlpVCikF84stV2a9021DbutoHt5turtn8sYhddLTYprih+X8IqufqN6TeV33zaEb9joNSydP9OzE7ezuFdDrsOl0mX5ZaN7/bb3VFOLy8qf7UnZs+VimUVdXsJe4V7Ryt9K7uqNKp2Vr2vTqy+XeNc01arWLu9dn4fe9/Qfsf9rXVKdcV17w5wD9yp96jvaNBqqDiIOZh58EljWGPft4xvm5sUmoqbPhziHRo9HHS4t9mqufmI4pHSFrhF2DJ9NProje9cv+tqNWytb6O1FR8Dx4THnn4f+/3wcZ/jPScYJ1p/0Pyhtp3SXtQBdeR0zHYmdo52RXYNnvQ+2dNt293+o9GPh06pnqo5LXu69AzhTMGZT2dzz86dSz83cz7h/HhPTM/9CxEXbvUG9g5c9Ll4+ZL7pQt9Tn1nL9tdPnXF5srJq4yrndcsr3X0W/S3/2TxU/uA5UDHdavrXTesb3QPLh88M+QwdP6m681Lt7xuXbu94vbgcOjwnZHokdE77DtTd1PuvriXeW/h/sYH6AdFD6UeVjxSfNTws+7PbaOWo6fHXMf6Hwc/vj/OGn/2S8Yv7ycKnpCfVEyqTDZPmU2dmnafvvF05dOJZ+nPFmYKf5X+tfa5zvMffnP8rX82YnbiBf/Fp99LXsq/PPRq2aueuYC5R69TXy/MF72Rf3P4LeNt37vwd5MLWe+x7ys/6H7o/ujz8cGn1E+f/gUDmPP8dCPLVAAAAAlwSFlzAAALEgAACxIB0t1+/AAAAAZiS0dEAP8A/wD/oL2nkwAACUBJREFUaEPNWfmTVNUVZhAEnBQwkfEXK5gFl3JLaqiZ7n6v92Wmp2d6Znr2HWaRJQQRRSECTkUEDUQRwQURFAHjsIiELRk2N3RAECFxCRiQxH/A/JBUUaUn5zvdd3jd/ZrpWZLOq/qq+91377nnu/ds790RKa4sxnWM0YzrMwzoAF3SuqD4DYxbGBojxAhnGEFGPuNmxlgGdDS9wPImRvmo68dszMm96cwtt06+9JPbJ1/OJH70s8kXx+fc2HvdqNGrWTcPYyIjiQQaoHxHTm7uWWcw77slq3TatFunzX/QMobX92q0YYdO87s0mmq/98oPJkw8xjqWMyYw4i6YTTmUr2i20RsHdFq7xU6zFnqoabY3o7h/qZs27rLTKzvt5Arlf589fsIh1lVnwD/kwur/eDSbjaMo77ttrPyiJ13kCAVIK2IEC0ln2IuLyB4CguQoKRY4gVIg1AcXEC5JA1fHQA7kQTbm0QGeE3PbCgPkLffTypcd9NKbdro7/85/ZWWN7GKdJ4n2fMH2Ndj8kpU6Pb/NzsICLCjAJAp5oiB5ykvIX1lGhTURCtZVUnFDNYUaa6ikqZZKm+sE4ZZ6CrcCDVQ2rYHKpzfG0JSAaDv6oD/GQg5kQnZhTQX5KsPkKQM5XizWQQ8GKFDpp237dWq730rjssfvY51vZ4gvIEyF4LCw+VkL3aQxa1GeBXgrSkUoFMaEUCLS3kyVHS1U2dkqqLpvmqB6xnRBzcw2qp3VHsVsoCMe3F4DcD/0x9gIy6toa5I5QCZQXS4L5yzBrvNusDV0rXbSyvU2ypmU28s6T2WMBAHYUvind0y+DMeB3aFzdPWLyRuJEWChWK0yXmGz1cXkAiYXaWdyMYJVBoJ96ASi5NEP/SvamnlXGqm0pc6UAEzpgS43rXmNCeTmnmSdC+IIIGQZCWAQBrt5K7ELMCEIBZnUiFBhbYSKADYHmESwvio1Yn3QF2Mgw19VJouGeTE/FhLmrAg8mzYBHgQSDhYCQTAn+AN25Sr4Hu0K8hyIPnf3gzhZMRmYy6i4wuAImAGCY8LhXEBSHyOMihjGDhTDQgDtAJR2l/kp3OSjYI2/fxLDgCET8FX4qbaTE8sSN0cCB4c0jQ6ftkrCc5Um9x9uDIkA7tvmeejoGSudvlRAn/79Ko5/YaHp/CxxjDIvtCdCB7BrgGHMtTAkApisqNpPu47aROlPvr4K3G/cpcsuYBwyOHaruM5PFS0+qunwUsNMLzXOiv7ivnKaj0obfZKcXOHoHH3kUpAasgmhbeEKl+yAkcCZywX04ZcWWrbWKUDxtfOwRgd7rXT0Uyu99xeL7BLwwecWuX/nnIV6Tlnp7XdttGWfJtm/6xkntT/goaKYTyUSGRYCwVo/7f0geRcUxKz+Ef0Fsf4g/WNjcN973kJ73rPRE2sdVDndF0dk0AQgAPdYmfldLllZTGZGAIhTjIG2UxcL6MQFiyiI34//Fm1XfYzy1P0hDhDLnnNSMS8a5h8UAfz62U4XPO6i3cdsMvG1lAcOf2KlNw5qEp0eX+OUsbO5vuqY7xETaeffmY946OEnXBLNYEIYo4KDkqPm2cHmiDGDItD6Kw9t5QmguFF4KmDSZzY5uIYJUHW7j+Y86qalv3PSKi6F122108vbdVrxAj/nHAKFsLtuduKKVh8tWObi9xCNTl5gOYa5MO+7f7ZIif8w93n21X4IIFo4OZL8+imXOFui4lASJqHMIPEZckNNu5eeetFBp2Nt4hcxnOKVhmyjkyozRfSa95hb/EztgJIL80N7SgJSje7Radpcr0STk19Z4oSIICaDyLJ4pYtWv+pIeq76YBeQ9GAaSTL4HvaN52qn+xAjgh2BLsZxwLlvCmjN5lQEeAde5x14ZacujmY28R9PWCWhYfur2nx0JIWCCJXNv+SFYCc0PlPArmIemJLaCbULilT9fV460Bu/E2d5B1MSgAl198QPUBCl2A47H4rPuKs2mO8CFFzfrctK7jtuHnZPflUgdg958APUVXD0x56O5hKYC8zGOKZfAtsPmU92hvEkO59SHMDEyKowqUQSuP+Ik1vngx56ZLlLfMb4XPXp+dhKT290SKA4xIntxPlou8oliWMGRQAC4cxQ1rj6CrB3s8nQtmWvLiu7vUczXxgoy+0A/ic+N/aBb+H/gAngHjWQL+JPUh6E6thWj501T24wk7lcvc5e5Ba/SnxuBiMp7Bx2GOEV/oTAcc0wmorAVi6djSVzn8OxM6P9xd/bk8apsTuPaBTmwm3TW7ppH0Apjf/vf2ahtzhpQlmQR+HnKQuQNRCgeUv7SWSpCHSzCbjDnNJZYVSbqIla5njp0d+6aD0nJ4RF4xgjkGFRBLbO9UgxB2WVwjALOOoBLk+Q5BZyskLFiipVhVQVpdLKxKl8AA4GM1jECQjRBZEFFSieq0LMOMYIyNv/oU0i0nOb7UII7xV4IUK+QZkQqvfLtyjZVYPSRgyaAIBJVUjDc7M+icDqoh/GohSAOZSxQ6O8iMTM4loKJ2JIBNJBnFn81SKrDt9ArEfWRZmgfCcdhRMx7ASUwsAprouOsFmgsvwNV6DI1iiD5fsqTwylzZQaCIaFQN8q8+9xdsjd7yBa2GnuYjYLtnFk1IGYxUAwKALGVUb1iddAhMPFq5xSdgeqornhv6FwItImgHStSLzPRRneb1HP46MvnNAZe3n/XyhtRHoEuJhDhYliCrG7fgY7H2fgoTjfcCEtAlv2ajRjgSfqfLFVNhOWCfRLAC80eB9oTPFVItMAgflMAJ/Xf5hAAAccQZwGwnTwSofOZkIyCSzqiuedtHydjSbeOOkj1jlPEcARUz6OMnEaiCiDM6lM2nsioDy+5HX36FTXYaEx47J3sc5ToLy6bsY5bJ5+75UNO+xyoIbPKRiI3cgkRPkGvxR7+Awz5a7bvmV9H2TkiOaxCyfgHpzDukP536/vxvcaXT73wXEyieXrnNT9J11CeZ728ytjxt3wJuv6C8YoKK4unPbhBLwc57D35N/57/Z5VjlQg9dnCnj7Wr5Oo/rOAppy923/HBtV3sXIZiRdIIETcD1r5Miusdnj9+E0ECErk4DDis1nZcFssPJQXo5XzS48QFjFITLOYXGUiXCVSSDawGFh84iYaV8ggzD1/4AUKz5ixH8A8p7wO3/rrQUAAAAASUVORK5CYII=
// ==/UserScript==


/* License + Copyright Notice
********************************************************************************************
Copyright © TimidScript, Some Rights Reserved.
GNU General Public License v3 (GPL-3) - http://www.gnu.org/licenses/gpl-3.0.en.html

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the
following conditions are met:

1) GPL-3 License is met
2) This copyright must be included
3) Due credits and link to original author's homepage (included in copyright).
4) Notify the original author of redistribution
5) Clear clarification to end user of the GPL-3 license

TimidScript's Homepages:  [GitHub](https://github.com/TimidScript)
                          [OpenUserJS](https://openuserjs.org/users/TimidScript)
                          [GreasyFork](https://greasyfork.org/users/1455-timidscript
*/
/* Information
**************************************************************************************************
 Version History
------------------------------------
1.0.09 (2016-05-25)
 - Moving to GreasyFork and preparing the removal of files from OUJS
1.0.8 (2016-04-10)
 - updateURL added
1.0.7 (2016-04-03)
 - Changed license to GPL-3
1.0.6 (2015-02-07)
 - Bug Fix: URL has changed from "deviants" to "watching"
1.0.5 (2015-02-07)
 - Support https
1.0.4 (2015-06-27)
 - Using URI (base64) for script icon
1.0.3 (2014-08-29)
 - Added GM_update
1.0.2 (2014-08-19)
 - Cleaned up header for OUJS
1.0.1 (2013-09-30)
 - Initial Release
**************************************************************************************************/

var Observe =
{
    bodyChanges: function ()
    {
        Observe.callback(); //Just in case it gets missed. Happens occasionally

        var mo = window.MutationObserver || window.MozMutationObserver || window.WebKitMutationObserver;
        if (mo)
        {
            Observe.observer = new mo(Observe.callback);
            Observe.observer.observe(document.body, { childList: true, subtree: true });
        }
    },

    callback: function (mutations)
    {
        if (Observe.busy) return;
        var deviants = document.getElementById("deviantlist");

        Observe.busy = true;
        if (Observe.length != deviants.innerHTML.length)
        {
            var links = deviants.getElementsByTagName("a");

            //console.log(links.length);
            for (var i = 0; i < links.length; i++)
            {
                var link = links[i];
                if (link.href.match(/.+\.deviantart.com\/$/i))
                {
                    link.href = link.href + "gallery/?catpath=/";
                }
            }

            Observe.length = deviants.innerHTML.length;
        }
        Observe.busy = false;
    }
};


Observe.bodyChanges();
