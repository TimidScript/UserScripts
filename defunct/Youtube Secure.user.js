// ==UserScript==
// @name          [TS] Youtube Secure
// @namespace     TimidScript
// @description   **Depreciated** Redirects to Secure (https) Youtube. Depreciated: Use "Linx Amender" instead.
// @author        TimidScript
// @homepageURL   https://openuserjs.org/users/TimidScript
// @copyright     © 2014 TimidScript, All Rights Reserved.
// @license       GNU GPLv3 + Please notify me if distributing
// @version       1.0.1 DEFUNCT
// @icon          http://i.imgur.com/aqb4avb.png
// @include       http://*.youtube.*
// ==/UserScript==

var url = document.location.toString();
document.location = url.replace('http://', 'https://');
