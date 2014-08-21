// ==UserScript==
// @name          [TS] Youtube Secure
// @namespace     TimidScript
// @version       1.0.1 DEFUNCT
// @description   **Depreciated** Redirects to Secure (https) Youtube. Depreciated: Use "Linx Amender" instead.
// @icon          http://i.imgur.com/aqb4avb.png
// @author        TimidScript
// @homepageURL   https://openuserjs.org/users/TimidScript
// @copyright     © 2014 TimidScript, All Rights Reserved.
// @license       GNU GPLv3 + Please notify me if distributing
// @include       http://*.youtube.*
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

Initial release date: Jan 10, 2013 14:51
********************************************************************************************/

var url = document.location.toString();
document.location = url.replace('http://', 'https://');
