// ==UserScript==
// @name                [TS] Citrus GFork
// @namespace           TimidScript
// @version             1.1.45.1
// @date                2017-01-07
// @description         NOW with version number in Listing!! Advance table view for Greasy Fork. Fixes display bugs. 100 scripts display at a time, favoured user count, remembers last sort order used on Script Listing, "My" Profile Listing, and third Party Listing. Able to distinguish between, Library, Unlisted and Deleted scripts using text icons. Beside FireFox, it now supports Opera and Chrome.
// @author              TimidScript
// @homepageURL         https://github.com/TimidScript
// @copyright           © 2014+ TimidScript, Some Rights Reserved.
// @license             https://github.com/TimidScript/UserScripts/blob/master/license.txt
// @include             https://greasyfork.org/*
// @require             https://greasyfork.org/scripts/19967/code/TSL - GM_update.js
// @require             https://greasyfork.org/scripts/19968/code/TSLibrary - Generic.js
// @resource MonkeyIcon https://i.imgur.com/RqikjW1.jpg
// @resource FontAS     https://github.com/TimidScript/UserScripts/raw/master/resources/fonts/FontAwesome.css
// @homeURL             https://greasyfork.org/en/scripts/4336
// @updateURL           https://greasyfork.org/scripts/4336/code/4336.meta.js
// @grant               GM_getValue
// @grant               GM_setValue
// @grant               GM_deleteValue
// @grant               GM_xmlhttpRequest
// @grant               GM_info
// @grant               GM_getMetadata
// @grant               GM_registerMenuCommand
// @grant               GM_setClipboard
// @grant               GM_getResourceURL
// @grant               GM_getResourceText
// @icon                data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAZiS0dEAP8A/wD/oL2nkwAAFKZJREFUaEO9WgdUVVfaZcxKmX9Gxd6xgaDGLpZoLFFE2ns0ldh77xqEKIIUCxaU3pvSizTFEntvINKLSBUQxIJKfW/PvhecaGJmJvMnc9fa67737jnn2/tr51xF4d9dSI1SAKCAn7Z+gfj5bRD7fbs/FQmL/o4ruz9D4ooWBv/FhbglCji1VAGnV/4V8QvGc2FzxJqEIWbWNZw0vvenIcb4LmJmX6QtH8TNXU0xakhcSzGrW5j9BxfOb1bAVYvPOHkyF4rkotWINgCipECkXgt0/wS0rB0lIfSBk4YyOqyIQhxweqkKBG439zaT/K0Lp5Yr4MzavzNVzOiJCpF4pJ4cEdpyhGvJETaT0GzBjD8Y79elDcFWhI5cFBNtBDoyFQkL9XF5Tyuc29LC9hcXElcp4Oy6vyFu/iGcnF2HSH0upCvjgjKEzpAhRIOY/j+AYIcI1aRtLRki9GSIMgRi5lQgfuECPPT9C87/QgQubFPAbYdWVLmDnq9lCJvogUaEazYiTKMRodNbMO1/gPe2iLAZ5DCzERG6jYg2lDMSpTi1RANRegq46/aevJkCU0YoWub892UcKGNONk/8iPwfhDABGo31QTMaK3y1mnJdtZtq+fmTYwWIIrQamcqNLHQ54uZdY7Z0w+mWLoUzTJ1z675itwnDyVlyREoaOKGBaUNoENP/GIRpNNQFazaW+eo2PThqIIuzNJD7b9PHKWuprCFYsPWJOSIEDprkpN3AzGhAjEkDG8xm8mTKr6GABLbM08vHIXZuBXOtgTlXz7wnNIkZ/2/IQjXrXwTqNKQ7S5sSbYzkAdsN4bpBCue1EritlyDNUUjVT8/9GeQSrlWPCEk9oo2bWKc3cHZtB5xhe8VJI6bPYlPEzhEU1rHj1FEAofnfI1yzrjFkZt1Tb52GW4f0m6J3GsgDturDfYMEzuv04LJOuEsQZq4ne31cdNan1/kI5BShU8fOWM/W+pxOn8R6oICrlp8jYfEJFm8Te/0HAv4LhM+sawjRqity12m4vFcqC9uhjxPbDSCS3yiB03qSF0DybvxO7zM1ZtbJw7TqXgdq15X76dXLP7XuezQLqGOt1uP0sjXMGgo4vao1c+oCBTSwddYiXKeW7ev3IVyrVsZ7mbdO/WVbSVOoqUBcH6GmBuLdlZ4XyAtwFcjz+08c9zJQp67ES6f+xn69xpO7pLI8T31G4xPri9CmHV12SINaCmik0+0Q9z0FnFqmyP56nQLqGIG3bFmE9u/CmyDd2nuHpY0RZvryIHo8jMQjzQwR/IMBXEjWkWnzXoCQRkE/SOVX7KRN8bv1ZYHbpKLAawckjU3hOp9cvxnCM723FPCW7bQB8YsON0cgQRCwqEWAPgcJAoTB/x5yji31kdSettKXvfe4QFxAUAt5h7V6cCRxwet+W6QI4e8RfC6M9ed3QVDULklTzQndd5+y8TPIK5ICogUBTKH4xRQwnwISKSBh0TUWsRCeN1T5hmn0byHnuFx3w7oIc335CbbD8B3NxAVyQRTjuUkCj41S+G5pTqewHSRORJoR5hzHz8I4oZWmu7AwI3Sb1474AB/Z5PMIyRseLd6wiOvYeA41RyBxuSDgKvvrO0QZ1SBCSuj9S8gjpTV53nPqQs0M5cdZoOH0ZpS5UbMAEhPERLQIiiLEO58nHlqKa35bcSNgG845rkL0rlkIooConQayHE/jWnmEpKYmSPKmxFvyrjpQwgh/aFdSwxqtYRutQey8Wnag9wJWUsDSK/zC8Bi+RqSUkPxLlAfNfRexew7JSxFlMRuXPDbgXvhO3Akxw/ljK0nIGJEtAkTy/C4Qz712DMUPPEXk33LB/SgLRFt9jwCmUpC5sfzmYaP6YDNpk9N6idx3m0SW4qRfK4v4wHaU/mvuxq8Rt+Ada/cg4hZRQJShIg9vlxmBN9yJOcigebAwsXnyKxERzfd34UY1ifvnNgn5G7l7Du5FWqDgjhtKk73xNMUHhXfdcT9iF2KtTFpSxlAUKPxekRaIZ+knRJQ9CkBJsheSY/cgYtds+DDlnNihDq+R4sg6fdivEotenu0ieSfyERwrOPikMXmwVsO0DvA3CvAZ0Rbew36C74iXOD6xGqEzX5LsS0QaiHgRPKeGnqk7byupf3hU+i7pmHGt3zYDhNDDt0PMUXTfA+Wp/iQVhGcZwSIEoilx1oixnIOEvQuQd80RlZkheJ4djqrsMPFz87jjKEnywvWAH8S9woXd6rjNcpwNtIT/nqXYt0IX4T/qNdaHSF+JvAR+3kOew1PtJby+3gcPZQrwHU0BX5+HW9/ncOr2DM49K+ExoAr+6s/rgzVfxNrMbhS8Yb9SFw5rJPDcLJX7bZYi8cgKpoEzyQeQTJBISiD3PCcS1blR/C0E9yMt8SDKCpVZYXiRF4OXxPOcaI6LQFVWKOcEo5xisy8fQbjVfHYqPQSSeNoVN1yP3ge75TNhPWeUvPgACbv0qMSxLuTX/Rk8VKrhM3QvvFQowG8UBQw5B7f+VXxYgaOdKuDQnvcOFQV2favNtPrJzCSD4WlmBFcW3JGlU+G7QQs3T/zAFPBGBT3fTD5cJF6TH4eaJwl4lZ9AklEkHyl+fkmUZkahKjdGFFOVHSmKENKp8K4r4o8sw+GFE2BjMganPNfhepQZthsMxaLhbeTppu1f4FiHChzrXEEHV8B9wHP4DNsLDzVBgBCBoWfhrlwJ5x7lHFSOox1571h+17Tny2Vj2uPgim9wOWQz3DZNxvaJnXDQUBk3j69E8d1DKEt2QcUjL1RmBKL0USAS4vfhVPx+VGRG4DWFCKii132Dd8Jkqy7M9y1E1m13PM8IQEWKO54+OIYn1+1w+ogRzKd2wSr1tnDaNBWXgtbD3Hgo5g9rLU8z7VANx07lcOxSDpde5fBQraIAO6YSBfhzhs+wM3BXEdKnjIPKcKxTGZw6lV3a0uPlgjFd4LPHGLeiTbF/4UhsHqsI+1nK7DqrUXjTBqX3DqI86SiepbjC1WslRs4egu5TOmP3/nmoTA9ETW4orpyxxVxzKaTrdfD3kX/DDkt9VD1iUSc7oYROyL9mjfOeC/GjRg8sHdkGFibDkeCxEtsYgYUjWsuzzDsyvTuTU9cyuCiV0fOV8B1uB6+BFBAwhgKGJzLvqU6pFI7dShmFUk4ovbil14v5Y7rCz9oYF0+sg7lEFRsp4JCJKh5ErkPRLTuU3T+MyhRnZF4/BJPtGrD2skFfjX7oN6U7bpw9gIbiWLh5rsaSXSY45GuPNuqtMVJLBZlsqZUtESi8tRfXglZjl7aSkDLYxOfhDguxQlMNy8e0aSq1Zlo7diGn7qVw7V0Kz4EV8B1pC4/BgoBxbdmBTjMsgroSFnIJi6WEE0pu7OhXPXd0Zzht12JeLseWmf2wmgHbP3sA7kWsRdFNCnhwBNWp7rhxzg7j5g6DrY81BuoMwN8G/R+83bZCXpYIB+dlUNMbgKl86fvr4K+gNLwLbiXYoTrdC+XJznhKJ2Qk/gB7risIWD61LzzMJTAa3Q07vlOse3uw81M4di1hjZbAtU8JPAeVs3Zt4DWIAgLHU8DIUwzLU6orhlOPYhzrWkwBxRnWKpXzx3aVWSwYh/Aji7Bheh8sGdEGtkYquBe1keG3R1nSMQrwxJ0LB6CqoQSlKb3QZmhrfNX/Szg7boa8/CyCg03Rjqnx5YAv8Hnfz9FvWHfcP3sQLzJ8UPHQhU5wQMF1a8TaaWP7pI5Y9V1fbDMeAa2BbREwr8MrkienbsVM8WK49i2G1+Ay1q41hQgR+KYt1SQwLAxPnyIOKmKoRLxy6Fu6Xat3/YJJfeBtZYR1TI0Fw1rDzrA/UmI20XOH8CzZEVWpHii454ZpRiPRqncrfN7ncyj2aY1wv52QlZ9B7j0/TNQYglY9PsNnXT+DodE34m78PM0bzyigPMkBJXf2I/OsKTzWjMbGCZ2gP7wDFo9p2/h4N2vSuZkPnHsVwa1fEdv+U/ipW8PnayECEyhgNAUMYnj6FsKpVyEcuzfDqUdh3CblF3rDOsKcLW6DzkCsHqMIv83jkXPhR1FABQVUPvJAdYYvfJw2oIdaZ3zZ+Qtoao5Gzh0/1JeeQl1JAuKDraAxcyz0dMfhbOhOvMgMoPBmAc+Sj7EZ2DMKe3DexQSm7EbrxyvKzq/rVCV/z8WxRyGclQrhplzItl8K/zF74DPkvQD1eIalmOoKOIjo8U+8cuhdZCnp9lY6ogtWTlZip+iGS17zUXjDGk/vsY0mObEYPfA83QdlKd4Ict8Ka/O5uBG/F+8KY1BbnCDibUEMMm+4I/3KUVSm+aE6M5ACPOl9F1wON8OTG/vYFGzZHNbCWr8frKa3a3i2r3sxN7AWLj0L4NK7gO2+gG2/BP5jKWA4BRyf2IZqYrk1C+ry4dw7H049f4Zzz/yy/UpF+6RdapZzy9g/SwUPYzawgG3FGii8fYgC3EjGi1EIYH/3R2WqD17lhPyT/HvU5IXjRdYJIoiCfVkD3nhwyhqr5k1D2nkrFLOrPYrbhAPfq2HrhHayPAt2RNpv5tIrHy598rmJ5fPoU8TmY8XmQwEnJlHA2BiGpQBuKo856DGj8DFclR4nWalVbJrYUX5k0VB2jG0UYIP0n/bg2J553NCOih2lilGoFgkG42V2MN7kR4uef1NwEq9zw8XfBGEvc45TgDdux1hijs5YbF2hSe/vF6OaErsR+9mmN33TTpZr0aOEnfFnHi59H8Nd9TE9X4iA8ZbwFiJwYnIbqqGAYU+oLo91kMfBH8NFKe+Wudqz9eM7yg/OH4z001tFAXlX7bB41kTs4otLxgV77qwezG1/vMol0Q/wIicIVUyZCp5Wcy474ILvNlgv18SkYb0xXzIOd+N3iUVccM0Kt4NXYqd2H1FAjgU7Im038+hNbv3y2C3z4DOygM1nN++CgKkUMP4kBTA8qrlw6ZfLwR/DpXfuHXPV8rUUIGw2d0NX4QmNCUbPBGyGzuTBmDF2ADbPmQqXTXyR37MQcdZLcdp6GeJ+XIiwjcZwnTcdNhrqWDlyABYM6Y01msPhaj0Pj87uQfGdA9zVbfH48k5E2Wpj7fgOMJ3cvuGpnZj3LTz65MK1fy48BubCZ9QT1u5utn8KCJrSBoHfRPNY/Zjqcnioy2EUPoZb35wMyz7FGya0l234pgNiDkhFY0LIi2/vx4P4H+FpNx/mCzSwld1nw6RhMP12OPZMGA77qepw0vkWribT4c1IRdovxpWgLci4aIuiOwdFJwg7+pOru+n9FbCS9udxQhHHDDq9rncUSH/IQzmH3TKHXTOftWsBvzEtEQicEMVw5HEvyKbKbObax3Dtm122Vyn/hynt65ePUoTdLFXxLJR/1UI8Dwkkiu/YI//GAeRc2ct0siV4v3gAWVcO8n3gIJ7cOoIC1srT+wKOiLtv6d0DJL+X6+zG3bDVsF8wFMu4/qqxirLb25n/tPszj37ZrNFseA7OZtd8jMBvLdh8KCB4ehsc/zaC7wW5fJjFQVnMtV+h0blftpdJ5+rF9M7qMe1wdNmIZhFXdjESNozEPpGQsDeU3jvMM44DPezAOuEGRTGZF+yQe9mOnWYvx9mL44UIZp0zxTnn2bCdzXPP6HZYOlpRHjC/S1Wdo+C4Dzn0z2KNZsFrSBabTh5rdyfvFBBt9FcETfVlOLL5MIN1kAFX5V/DTTmjwKbP4x+ndahdyJe4lertYMNIxB0ywKOELWIKCIVdckcgSM8ytXIv70HORRtkX7JDziUbetoKhdysnly1RNqpreKm5bRKHZsmd8UirrlcXVHmP69r1Zujgrd/yUElgymewVrNYM1m0/Hrm1OoNPUv/GIt/ug9LJ1Fks4oEMq/hrtyeoZF73zLGR3eLB7ZFotpdPX4jrA1GYQQS01c9l7At7C17OXM8cTtyOLRIPOMKTJOb0dy9AZcD1yKeIfZ8N42CXuMBmAdjwwCca4lN5vW/t359T1K6pz6Zwp2fm1/QDrzP521ms78T+MrppRbgFADUxQQqjULxyelwndUGjy/TmMUCJVPw0Ml7dnB/tlhS7pVmE7tULtklKJcOEEKgtaS0PYZSrCQKsOGKbFv7iBYG6vCUl8FpjN7Y/2krlim3l48cS7ioXDd+HaNttqdXsev6vH0mT1r71P2RAygXbU0ZkgavZ7OjLmGcIkawnQpIEKiwLf8Pgiado77QTo3h1R4DEqFuxqh+ml4qKbKeS+3V866uKlXkZdJ10pb7Y6vTae2f7duvGLDyjFtmz7EmnFtGzdPbFfH9Hu7V6fTKw+TrlWn1/YsybTsm/fWkdH2UH0krPlJWyLIxXNwKhtNKhtOBkJmOCN2/lc4OYcC4hYo4IZdK4Rpb2dhpLLCH8FrKBccRKgJC/82PFVT4KWWIufnd04D0p4dUs4o2tc/K9+2X/aHKLDrl/30QP/M6iMqGXXOAwTxtKGWIs7/5Zq/wkDaGfyIjn0E/3GpCPruLsL1NOhwhZ//lybSgMU8SwkhmpFsT0wl9RTWAw0MpoFBxECCBn8bD0V4/gd4P/bT63wAwSZte31NLsNT2HFSRAeHatshfvFXiJnbTF64cG6zAk94TCf9KQzPRbbVFOZaMgsmmdFIZl0Qg/7HoE1v2vYdmUzPJ7NWH7FwTyBqVm+ES1uYf3AhdpECLu7+CyKk2ozEOU5I4XkjidFIYu4l0QtJ8BpGDP1z4U0bgi2fUUl0YhICJpD8dw/ZaI4jymggQqYz7Ze1sP7FhYQVCrhEEZFGYxGm44Ngjfs4PjmZhZNELzyA31hiTDN81f9YvF/XnzYCxj9A4MQknhIeMiNuMudtED1HiRzIz6KF7W9cwh9ZcBIj8n0Hdqe5FOLPiFzlXnGfBfSAi3LhKX8ChHUJwUbw9LtMl58QruuAKINpiF/0lfgv0b/nwsVdCuJfqcQvbIMoY3VEGi6hJ6wZyiPNmPkHg2uGaR9mCu+krVmI5kZyatmXiNRjje5oYfU7LsTMY64t/YLppIowPW2E6ixCyMy1CJ6x8U9FqNZq2prLjeo7Oq4nEte3wqmVLax+eSko/APJN4k2CyCZEgAAAABJRU5ErkJggg==

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



Suggestions
 - Install record similar to OUJS-1
 - Highlight your username in the forum
 - Highlight your scripts in the forum

Unnecessary, unused Code:
    getScriptHTML
    getScriptJSON
    makeStruct

********************************************************************************************
    Version History
----------------------------------------------
1.1.45.1 2017-01-07
 - Quickfix in CSS
1.1.45 2017-01-07
 - Change to the Header background-image
1.1.44 2016-12-16
 - Table view added to feedback listing
 - Sort to favourites added
1.1.43
 - BugFix: Relevance when searching was not being supported. Now it is always the default in a search
 - BugFix: Search bugs
 - BugFix: Image size to fit parent element (script preview)
 - BugFix: JSON structure has changed
 - Monkey icon is now resource. Should have been years ago
 - Changed the styling of the script preview
 - Stores version numbers, so no longer does a JSON version call if version is up-to-date.
 - Purge all stored script version details if older the 90 days
 - Relative date in the discussion
1.1.42.1 (2016-10-22)
 - Hotfix: Settings not being stored as I changed the stored name
1.1.42 (2016-10-22)
 - Depreciated, Obsolete, Defunct and now Unsupported are checked first in description and then version. If it
 is present the script is tagged with "No Longer Supported" orange tag to signify that it is no longer maintained.
 It is recommended to use the keywords in the script description tag rather than version
 - Removed filters and re-implemented the sorting algorithm
 - Settings button added again. Can be found near the monkey icon. It toggles between relative date format and standard date format. Default is relative.
 - Fixed the numbering of listing which must have gotten broken along the way
 - The behaviour of script column sorting is now similar to default
 - New script search button that automatically does partial word search to yield more results. Toggle through settings.
 - Toggle between standard and relative date format is done through settings.
1.1.41 (2016-10-14)
 - Relative date added
 - Removed date format settings
1.1.40 (2016-10-14)
 - Bugfix: When editting post the reply type is now stored
 - Added a settings link to change the date format
1.1.39 (2016-09-03)
 - Added Copy button to library page
1.1.38 (2016-05-27)
 - Altered the license
1.1.37 (2016-05-25)
 - Moving to GreasyFork and preparing to remove OUJS files
1.1.36 (2016-04-10)
 - updateURL added
1.1.35 (2016-04-03)
 - Changed license to GPL-3
1.1.34 (2016-02-27)
 - Bug Fix: Displays version number in third party profiles
 - Removed toggle For Deleted scripts
 - Added discussion even when not logged in
1.1.33 (2015-10-05)
 - Replaced base64 bmp icon with png version
1.1.32 (2015-07-04)
 - Added overflow style to code tag
1.1.31 (2015-06-27)
 - Using URI (base64) for script icon
1.1.30 (2015-06-08)
 - Bug Fix: "Report Bug" and "Review" review button always visible even when there is no need.
1.1.29 (2015-06-08)
 - Using json to populate the table. This allows the extraction of version number.
 - Changed the feedback system rating interface. Review by default is hidden.
 - Supporting of versions "Obselete", "Depreciated", and "Defunct" similar to the script "OUJS-1"
1.0.28b (2015-04-04)
 - Bug fix to handle site searches
1.0.27 (2014-12-28)
 - Bug fix to changes made in 1.0.25
 - Changed the sets into a menu. CSS provided by decembre.
1.0.26 (2014-12-27)
 - pre tag bug fix
1.0.25 (2014-12-27)
 - decembre's request to show favourite sets to script listing
script-list-set
 - Bug Fix to support URL local syntax
1.0.24 (2014-12-06)
 - Bug Fix in script paging
 - Bug Fix due to changes in url flags. Change sort flag from "fans" to "ratings"
 - Add total rating and provided total score also
 - Added counter to the number of users that favoured the script, in feedback tab
1.0.23 (2014-11-29)
 - Add styling for forum blockquote tag
 - Changes to deal with new GF layout
1.0.22 (2014-11-07)
 - Fix to handle changes in forum URL (localization added)
 - Add more fonts colours to the forum to distinguish between different types of usernames/links.
1.0.21 (2014-10-31)
 - Support for Opera now added. Dozen of browsers open causes confusion.
1.0.20 (2014-10-31)
 - Change table header "Fans" to "Score"
 - Slight changes to forum CSS
 - Support for Opera and Chrome added.
1.0.19 (2014-10-23)
 - Removed sign-out button as it has been added with today's site update
1.0.18 (2014-10-23)
 - Bug fix to accommodate new site changes to the URL syntax (localization added)
1.0.17 (2014-10-18)
 - Changed the framing of images to suite smaller images better
 - Credit link now points to my GF profile rather than OUJS
 - Added sign-out near the name
 - Bug fix: add script table only when need
1.0.16 (2014-09-29)
 - Got rid of the flashing timer
1.0.15 (2014-09-29)
 - Fixed the issue that 1.0.14 supposedly had fixed
 - Appreciation notice added
1.0.14 (2014-09-22)
 - Re-fixed profile table sort :?
1.0.13 (2014-09-19)
 - Fix in profile table sort
1.0.12 (2014-09-19)
 - Bug fix in sorting of lists with search. Not using global flag when matching regex
1.0.11 (2014-09-16)
 - Bug fix in search listing introduced in version 1.0.10
1.0.10 (2014-09-16)
 - Bug Fix: Daily installs sort order
 - Click on separator to toggle deleted script display
1.0.9 (2014-09-07)
 - Added new CSS  for <code> and <pre> elements
1.0.8 (2014-08-03)
 - Author name next to title
1.0.7 (2014-08-29)
 - Added GM_update
 - Added script numbers to table
1.0.6 (2014-08-21)
 - Bug Fix for sorting
1.0.5 (2014-08-21)
 - Small CSS fix provided by decembre (https://greasyfork.org/forum/discussion/comment/4182)
1.0.4 (2014-08-20)
 - Bug Fix: Author not being displayed
 - Bug Fix: Handle missing elements in user profile
1.0.3 (2014-08-20)
 - Link to my homepage
 - By default deleted scripts are hidden now
 - Stole some CSS from OUJS ^_^
 - Added a frame around images and max-width
 - Few small bug fixes
1.0.2 (2014-08-19)
 - Changes to CSS, including smaller font
 - Changed the interface
 - Added filter on user profile
 - Changed the behaviour of column click. If clicked it goes to first page as oppose to remaining on the same page
 - Increased number of scripts returned to 100
 - Citrified, orangified and crucified the forum. （￣﻿ _ゝ￣）
 - Small bug fixes
1.0.1 (2014-08-18)
 - Initial release. Released as good enough. May contain bugs but good for general usage.

**********************************************************************************************/

(function ()
{
    var scripts = new Array(),
        pathname = decodeURIComponent(document.location.pathname);

    TSL.addStyle("OverFlowCode", ".Comment .Message p {overflow-x:auto;}");
    TSL.addStyle("FontAwesomeCSS", GM_getResourceText("FontAS"));


    OrangifyPage();
    if (pathname.match(/(\w|-)+\/forum\/(post|discussion)\//) && document.getElementById("Form_Rating"))
    {
        TSL.addStyle("", ".choiceButtons {text-align:center; width: 80px;}");

        var po = document.querySelector(".PostOptions, .CommentOptions"),
            lbl = po.querySelector("label"),
            options = po.querySelectorAll(".RadioLabel"),
            hld = document.createElement("div"),
            btn1 = document.createElement("input"),
            btn2 = document.createElement("input");

        btn1.className = btn2.className = "choiceButtons  Button";
        btn1.value = "Report bug"; btn1.style.marginRight = "4px";
        btn2.value = "Review";

        btn1.onclick = function (e)
        {
            btn1.style.color = "#2DCD05";
            btn2.style.color = "";

            options[0].setAttribute("style", "margin-top: 5px !important;");
            options[4].removeAttribute("style");

            options[1].setAttribute("style", "display: none !important;"); //options[1].style.display = "none !important";
            options[2].setAttribute("style", "display: none !important;");
            options[3].setAttribute("style", "display: none !important;");
            lbl.setAttribute("style", "display: none !important;");

            if (e) options[0].click();
        }

        btn2.onclick = function (e)
        {
            btn1.style.color = "";
            btn2.style.color = "#2DCD05";

            options[0].setAttribute("style", "display: none !important;");
            options[4].setAttribute("style", "display: none !important;");

            options[1].removeAttribute("style");
            options[2].removeAttribute("style");
            options[3].removeAttribute("style");
            lbl.removeAttribute("style");

            if (e) options[3].click();
        }

        hld.appendChild(btn1);
        hld.appendChild(btn2);
        po.insertBefore(hld, po.firstElementChild);

        //for (var i = 0; i < options.length; i++) console.log(options[i].firstElementChild.checked);
        if (options[0].firstElementChild.checked || options[4].firstElementChild.checked) btn1.click(false);
        else btn2.click(false);
    }
    else if (pathname.match(/\/[\w-]+\/scripts\/\d+/)) //Script Page
    {
        TSL.addStyle("", "#script-content {background-color: #F9ECDB; margin: 0; padding-bottom: 5px;} #script-links > li:hover { background-color: yellow; } .current {background-color: #F9ECDB !important;}");
        TSL.addStyle("", ".install-link {background-color: #F7A207;} .install-help-link {background-color: #F9C565 !important;}");
        TSL.addStyle("", "#additional-info {border-radius: 5px; background-color: #F9DACD;} #additional-info > div {background-color: white;}");
        TSL.addStyle("", "header:first-child {background-color:white; padding: 5px 10px;}");
        TSL.addStyle("", ".fa-sort-alpha-asc[on] {color:blue; background-color: yellow;} .fa-sort-alpha-asc {margin-left: 5px;cursor:pointer; padding: 0 3px;} .fa-sort-alpha-asc:hover {background-color: brown; color: yellow;}");

        var notice = document.createElement("div");
        notice.textContent = "Show your appreciation to the author by favouring the script and giving positive feedback";
        notice.setAttribute("style", "padding: 3px 10px; border-radius: 4px; background-color: yellow; text-align: center;");

        if (pathname.match(/\/scripts\/[^\/]+\/feedback/i))
        {
            el = document.querySelector("#script-content");
            if (el) el.insertBefore(notice, el.firstElementChild);

            el = document.querySelector(".inline-list");

            var count = el.querySelectorAll("li").length;

            var users = [];
            var els = document.querySelectorAll(".inline-list li");
            for (var i = 0; i < els.length; i++)
            {
                els[i].setAttribute("position", i)
                users.push(els[i]);
            }

            el = document.getElementById("feedback-favoriters");
            el.innerHTML += " (<span style='color: #F00;'>" + count + "</span>";
            el.innerHTML += '<i class="fa fa-sort-alpha-asc"></i>)';
            el.lastElementChild.onclick = function (e)
            {
                this.enabled = (this.enabled !== true);
                GM_setValue("Feedback Sorted", this.enabled);
                var il = document.querySelector(".inline-list");
                if (this.enabled)
                {

                    this.setAttribute("on", "");
                    users.sort(function (a, b)
                    {
                        if (a.firstElementChild.textContent.toLowerCase() > b.firstElementChild.textContent.toLowerCase()) return 1;
                        else return -1;
                    });
                    for (var i = 0; i < users.length; i++) il.appendChild(users[i]);
                }
                else
                {
                    this.removeAttribute("on");
                    users.sort(function (a, b)
                    {
                        if (parseInt(a.getAttribute("position")) > parseInt(b.getAttribute("position"))) return 1;
                        else return -1;
                    });
                    for (var i = 0; i < users.length; i++) il.appendChild(users[i]);
                }
            };
            if (GM_getValue("Feedback Sorted", false)) document.querySelector(".fa-sort-alpha-asc").click();

            var els = document.querySelectorAll("#discussions > li");
            if (GM_getValue("Feedback Table View", false) && els.length > 0)
            {
                el = document.getElementById("discussions");
                var tab = document.createElement("table");
                tab.id = "DiscussionsTab";
                el.parentElement.insertBefore(tab, el);

                TSL.addStyle("FeedbackTable", '#DiscussionsTab {width:100%; border-spacing: 0; border-collapse: collapse;}' //border:1px solid black;
                    + '#DiscussionsTab tr {border-bottom: 1px solid gray;}'
                    + '#DiscussionsTab div[class^=discussion] {height: 16px; width: 16px; margin: 0 5px; background-size: height: 16px; width: 16px;}'
                    + '#DiscussionsTab .discussion-question {background-image: url(/images/circle-blue.png);}'
                    + '#DiscussionsTab .discussion-alien {background-image: url(/images/circle-alien.png);}'
                    + '#DiscussionsTab .discussion-good {background-image: url(/images/circle-green.png);}'
                    + '#DiscussionsTab .discussion-ok {background-image: url(/images/circle-yellow.png);}'
                    + '#DiscussionsTab .discussion-bad {background-image: url(/images/circle-red.png);}'
                    + '#discussions {display:none;}'
                    );

                for (var i = 0, l, t, m, r, c, d; i < els.length; i++)
                {
                    l = els[i].querySelectorAll("a"),
                    t = els[i].querySelectorAll("time"),
                    m = els[i].innerHTML.match(/<\/a>\s+([^<]+)\s+/g); //Too hard to extract the information for different languages one cannot speak

                    r = tab.insertRow(-1);

                    c = r.insertCell(-1);
                    d = document.createElement("div");
                    d.className = els[i].className;
                    c.appendChild(d);

                    c = r.insertCell(-1);
                    d = document.createElement("div");
                    d.appendChild(l[0].cloneNode(true));
                    c.appendChild(d);
                    d = document.createElement("div");
                    d.appendChild(l[1].cloneNode(true));
                    d.innerHTML += "<span> >> </span>"
                    d.appendChild(t[0]);
                    c.appendChild(d);

                    if (l.length == 3)
                    {
                        c = r.insertCell(-1);

                        d = document.createElement("div");
                        d.appendChild(l[2].cloneNode(true));
                        c.appendChild(d);

                        d = document.createElement("div");
                        d.appendChild(t[1]);
                        c.appendChild(d);
                    }
                }
            }
        }
        else
        {
            var el = document.querySelector("#install-area");
            if (el) el.appendChild(notice);
        }
    }
    else if (pathname.match(/\/[\w-]+\/scripts/)) //Script Listing
    {
        document.body.setAttribute("PageType", "ListingPage");
        getScripts();

        if (scripts.length > 0)
        {
            var isRelativeSearch = pathname.match(/scripts\/search/i) != null;
            createScriptTable(pathname.match(/scripts\/search/i) != null);
            populateScriptTable();


            if (document.getElementById("script-table"))
            {
                document.body.insertBefore(document.getElementById("script-table"), document.getElementById("main-header").nextElementSibling);
                //document.querySelector("#script-table tr td:nth-child(2)").appendChild(document.getElementById("UserSets"));

                if (isRelativeSearch)
                {
                    el = document.createElement("div");
                    el.setAttribute("style", "text-align: right; padding: 1px 50px");
                    el.appendChild(document.createElement("span"));
                    document.body.insertBefore(el, document.getElementById("script-table"));

                    el = el.firstElementChild;
                    el.id = "RelativeSearch";
                    el.setAttribute("tag", "");
                    el.textContent = "Relative Search";
                    el.onclick = onTableHeaderClick;

                    TSL.addStyle("RelativeSearchCSS", '#RelativeSearch {display: inline-block; background-color:orange; border-radius: 3px; padding: 3px 20px; text-align: center; width: 300px;cursor:pointer;}');
                }

                TSL.addStyle("TheBlackLagoon", "#UserSets {position: absolute !important;display: inline-table !important;float: none !important;left: 30px !important;top: 68px!important;padding: 2px 5px;background-color: yellow;border-radius: 5px;z-index: 200!important;visibility: hidden!important;opacity: 1!important;}"
                           + "#UserSets:hover {visibility: visible!important;opacity: 1!important;}"
                           + '#UserSets:before {content: "Sets ▼" !important; position: absolute !important;display: inline-block !important;left: 40px !important;top: -20px!important;margin: 2px 10px;padding: 1px 10px!important;background-color: yellow;border-radius: 5px;z-index: 200!important;visibility:visible!important;opacity: 1!important;}'
                           + "#UserSets li {position: relative !important;display: inline !important;float: left!important;clear: both!important;min-width: 200px!important;margin-bottom: 2px!important;padding: 2px 8px;background-color: white;border-radius: 2px; text-align:left;}"
                           );

                //TODO: Need to fix the Sets filter in listing search
                //var header = document.querySelectorAll("#script-table thead td")[1],
                //    sets = document.getElementById("UserSets");

                //header.appendChild(sets);
            }

            selectSortOrder("ListingPage", isRelativeSearch);

            TSL.removeNode("browse-script-list");
        }
    }
    else if (document.URL.match(/\/users\/(\w|-)+/)) //Authors Profile Page
    {
        var pageType = (document.getElementById("control-panel")) ? "PersonalProfile" : "UserProfile";
        document.body.setAttribute("PageType", pageType);

        getScripts();
        OrangifyUserPage();

        if (scripts.length > 0)
        {
            createScriptTable();
            populateScriptTable();

            selectSortOrder(pageType);
        }
    }


    //Purge script details older than 90 days
    var now = Date.now(), names = GM_listValues();
    for (var i = 0; i < names.length; i++)
    {
        if (! /^Script:\d+/.test(names[i])) continue;

        //If greater than 30 days remove    1000*60*60*24=86400000
        if ((now - JSON.parse(GM_getValue(names[i])).timestamp) / 86400000 > 90) GM_deleteValue(names[i]);
    }

    /* Base CSS styling
    ---------------------------------------------------------------------------*/
    function OrangifyPage()
    {
        //#region Adding CSS Styles E3E2E2
        TSL.addStyle("CitrusGF_Main", "body {font-size: 14px;}"
                      + "#main-header, #Head {background-color: orange !important; background-image: none !important;} #Head a, #site-nav a {color: yellow !important;}"
                      + ".current, .HomepageTitle, .Active a {border-color: orange !important;}"
                      + "#site-name {text-decoration: underline; color: white;}"
                      + "#title-image {height: 50px; border-radius: 20px; margin-left: 5px;}"
                      + "#title-text {font-size: 40px; color:black; font-family:'Open Sans',sans-serif; font-weight: 400; margin: 0 10px; line-height: 48px;}"
                      + "#title-subtext {color: yellow !important; font-size: 10px; text-decoration: none; position: absolute; left: 210px; top: 43px; font-weight: 400 !important;}"
                      + "#settings-subtext {color: yellow !important; font-size: 10px; text-decoration: none; position: absolute; left: 70px; top: 43px; font-weight: 400 !important;}"
                      + "#nav-user-info {top: 3px;}"
                      + "pre {background-color: #FFFF99; padding: 5px; margin-left: 30px; padding: 5px 10px;}"
                      + "code {padding: 2px 4px; font-size: 90%; color: #C7254E; background-color: #F9F2F4; white-space: nowrap; border-radius: 4px; font-family: Menlo,Monaco,Consolas,'Courier New',monospace;}"
                      + "pre > code {white-space: pre; background-color: transparent;}"
                      + "#CForkSettings {position: fixed; top: 150px; background:white; border: 5px groove orangered; width: 400px;}"
                      + "#CForkSettings > div {margin: 5px 10px}"
                      + "#CForkSettings > footer {background-color:orange; padding: 1px 5px;text-align:right;}"
                      + "#CForkSettings label {cursor: default;}"
                      + ".preview-result {background-color: white; border-top: 10px ridge black;}"
                      + ".preview-result img {max-width: 98%;}"
                      );

        TSL.addStyle("CitrusGF_ScriptPage", "#additional-info img {max-width: 98%; border: 1px solid orange; box-shadow: 5px 5px 2px #888888; margin: 5px 0; padding: 2px; color: yellow; }");

        if (document.location.pathname.match(/[\w-]+\/forum\//i))
        {
            TSL.addStyle("CitrusGF_Forum", "body:not(.Settings) a:not(.Button) { color: #F19E06; }"
                + "body a.Username { color: #E17205 !important; }"
                + ".QuoteAuthor a[href*='forum/profile/'] { color: #FB4507 !important;}"
                + "a[href*='forum/profile/'] { color: #25C614 !important; font-weight: 600;}"
                + "code {padding: 1px 3px; border-radius: 3px; border: 1px solid; background-color: #F9EBD2; color: #EB5100; margin: 0;}"
                + "#title-subtext {top: 45px;}"
                + "blockquote {background-color: #FFFFA4; margin: 5px 0px 5px 30px; padding: 5px;}"
                );
        }
        //#endregion

        var sname = document.getElementById("site-name");
        sname.innerHTML = "";

        var link = document.createElement("a");
        link.href = "/";
        link.innerHTML = '<img id="title-image" src="' + GM_getResourceURL("MonkeyIcon") + '" />'
                        + '<span id="title-text">Greasy Fork&nbsp;</span>'
                        + '<span id="settings-subtext">Settings</span>'
                        + '<a id="title-subtext" href="/users/1455-timidscript">100% Citrusy Goodness by <b>TimidScript</b></span>';
        sname.appendChild(link);

        var scriptsearch = document.getElementById("script-search");
        if (scriptsearch)
        {
            var el = document.createElement("input");
            el.type = "submit";
            el.value = "✱";
            el.title = "Partial Search";
            el.onclick = function ()
            {
                var search = document.querySelector("#script-search [type=search]");
                search.value = search.value.replace(/\b([^ ]+)\b/g, "*$1*");
                search.value = search.value.replace(/\*+/g, "*");
            }

            if (GM_getValue("Use Original Search")) scriptsearch.appendChild(el);
            else scriptsearch.insertBefore(el, scriptsearch.lastElementChild);
        }

        document.getElementById("settings-subtext").onclick = function (e)
        {
            e.stopImmediatePropagation();
            if (document.getElementById("CForkSettings")) return false;

            var settings = document.createElement("settings");
            settings.id = "CForkSettings";
            settings.innerHTML = '<div><input type="checkbox"><label> Use standard date format (e.g. 2016-01-30) rather than relative (e.g. 5 days ago)</label></div>'
                        + '<div><input type="checkbox"><label> Disable partial search set as default search option</label></div>'
                        + '<div><input type="checkbox"><label> Enable feedback table view</label></div>'
                        + '<footer><button>Accept</button></footer>';


            settings.style.left = ((document.body.clientWidth / 2) - 200) + "px";
            document.body.appendChild(settings);
            var lbls = settings.querySelectorAll("label");

            lbls[0].onclick = lbls[1].onclick =  lbls[2].onclick  = function (e) { this.previousElementSibling.click(); };

            var ipts = settings.querySelectorAll("input"), btn = settings.querySelector("button");

            if (GM_getValue("Use Standard Date Format", false)) ipts[0].checked = "checked";
            if (GM_getValue("Use Original Search", false)) ipts[1].checked = "checked";
            if (GM_getValue("Feedback Table View", false)) ipts[2].checked = "checked";

            btn.onclick = function (e)
            {
                if (ipts[0].checked) GM_setValue("Use Standard Date Format", true); else GM_deleteValue("Use Standard Date Format");
                if (ipts[1].checked) GM_setValue("Use Original Search", true); else GM_deleteValue("Use Original Search");
                if (ipts[2].checked) GM_setValue("Feedback Table View", true); else GM_deleteValue("Feedback Table View");

                TSL.removeNode(settings);
            }

            return false;
        };

        var require = document.querySelector("#script-content > p > code");
        if (require && require.textContent.match("@require"))
        {
            var copyBar = document.createElement("div");
            var copyBtn = document.createElement("button");
            copyBtn.textContent = "Copy To Clipboard";
            require.parentElement.insertBefore(copyBar, require.nextElementSibling);
            require.setAttribute("style", "display:block;");
            copyBtn.setAttribute("style", "margin-right:10px");

            copyBar.appendChild(copyBtn);
            copyBar.appendChild(createRadio("Short URL"));
            copyBar.appendChild(createRadio("Long URL"));
            copyBar.appendChild(createRadio("Current Ver."));

            var scriptID = require.textContent.match(/\/scripts\/(\d+)/)[1];
            var radios = copyBar.querySelectorAll("input");

            radios[0].setAttribute("requireURL", "// @require https://greasyfork.org/scripts/" + scriptID + "/code/" + scriptID + ".js");
            radios[1].setAttribute("requireURL", require.textContent.replace(/\?\w+=\d+/, ""));
            radios[2].setAttribute("requireURL", require.textContent);

            radios[0].onclick = radios[1].onclick = radios[2].onclick = function (e)
            {
                for (var i = 0; i < radios.length; i++)
                {
                    if (this != radios[i]) radios[i].checked = false;
                }

                require.textContent = this.getAttribute("requireURL");
            }

            copyBtn.onclick = function ()
            {
                GM_setClipboard(require.textContent);
            }

            radios[1].click();
        }


        if (pathname.match(/\/[\w-]+\/scripts/) && document.querySelector("#script-list-set ul")) //Script Listing
        {
            TSL.addStyle("TheBlackLagoon", "#UserSets {display: block; background-color: yellow; margin: 2px 10px; border-radius: 5px; padding: 2px 10px;}"
                + "#UserSets li {display: inline-block; padding: 2px 8px; background-color: white; border-radius: 2px;}"
                + "#UserSets li + li {margin-left: 1px}"
                );

            var sets = document.querySelector("#script-list-set ul");
            var mh = document.getElementById("main-header");
            sets.id = "UserSets";

            //document.body.insertBefore(sets, document.getElementById("main-header").nextElementSibling);
            document.body.appendChild(sets);
        }

        TSL.removeNode("script-list-option-groups");

        function createRadio(text)
        {
            var option = document.createElement("div");
            option.setAttribute("style", "display:inline-block; margin-right:10px;width:140px;")
            var radio = document.createElement("input");
            radio.type = "radio";
            var lbl = document.createElement("label");
            lbl.textContent = text;

            option.appendChild(radio);
            option.appendChild(lbl);
            return option;
        }
    }

    function disco(i)
    {
        notice.style.backgroundColor = (i % 2) ? "transparent" : "yellow";
        if (i < 18) setTimeout(disco, 500, ++i);
    }

    /* Styling for user page
    ---------------------------------------------------------------------------*/
    function OrangifyUserPage()
    {
        TSL.addStyle("CitrusGF_Shared", ".white-panel, #control-panel, #user-profile, #user-discussions-on-scripts-written {margin: 5px; border-radius: 8px; padding: 10px; }");
        TSL.addStyle("CitrusGF_Profile", ".white-panel, #user-discussions-on-scripts-written, #control-panel, #user-profile {background-color: white; }");
        TSL.addStyle("", "#user-control-panel, #control-panel h3 {margin: 0; padding: 0;}  #user-control-panel > li { display: inline-block; margin: 0 5px; padding: 2px 5px; border-radius: 5px; background-color: #F5F2F2; border: 1px solid #404040; box-shadow: 3px 3px 2px #888888;} #user-control-panel a {text-decoration: none;} #user-control-panel li:hover {background-color: #FBEACA;}");
        TSL.addStyle("", ".white-panel *, #user-discussions-on-scripts-written * {margin: 0;}");
        TSL.addStyle("CitrusGF_OUJS", 'code {padding: 2px 4px;font-size: 90%;color: #C7254E;background-color: #F9F2F4;white-space: nowrap;border-radius: 4px;font-family: Menlo,Monaco,Consolas,"Courier New",monospace; }');

        var author = document.createElement("h1");
        var name = document.getElementsByTagName("h2")[0];

        var up = document.getElementById("user-profile");
        if (!up)
        {
            up = document.createElement("section");
            up.id = "user-profile";
            up.textContent = "...";
            name.parentElement.insertBefore(up, name);
        }

        up.innerHTML = "<h1 style='margin: 0 0 5px 0; color: orange;'>" + name.textContent + "'s Profile</h1>" + up.innerHTML;
        TSL.removeNode(name);

        var el = document.getElementById("user-script-sets");
        if (el) el.parentElement.className = "white-panel";

        el = document.getElementById("user-script-list");
        if (el) TSL.removeNode(el.parentElement);

        el = document.getElementById("user-deleted-script-list");
        if (el) TSL.removeNode(el.parentElement);

        //Get discussions
        el = document.querySelector("#user-discussions-on-scripts-written");
        if (el) return;
        //https://greasyfork.org/en/forum/discussions.json?script_author=1455
        var userId = document.URL.match(/\/users\/(\d+)/)[1],
            localURL = document.URL.replace(/\/users\/.+/, ""),
            disURL = localURL + "/forum/discussions.json?script_author=" + userId;

        GM_xmlhttpRequest({
            url: disURL,
            method: "GET",
            headers: { "User-agent": navigator.userAgent, "Accept": "text/xml" },
            onload: function (xhr)
            {
                if (xhr.status == 200)
                {
                    var data = JSON.parse(xhr.responseText);
                    if (typeof data !== "object" || data.CountDiscussions == 0) return;
                    console.log(data);

                    var discussions = document.createElement("section");
                    discussions.id = "user-discussions-on-scripts-written";
                    discussions.innerHTML = '<h3>Discussions on scripts <a href="/en/forum/discussions/feed.rss?script_author="' + userId + '"><img src="/assets/feed-icon-14x14-ea341336588040dc7046d3423511d63d.png" alt="RSS Feed" rel="nofollow"></a></h3><ul class="discussion-list"></ul>';
                    document.body.insertBefore(discussions, document.querySelector("#script-table"));

                    var list = discussions.querySelector("ul");

                    for (var i = 0, post, item; i < data.Discussions.length && i < 10; i++)
                    {
                        post = data.Discussions[i];

                        item = document.createElement("li");
                        item.class = "discussion-question";
                        item.innerHTML = '<a href="' + localURL + '/scripts/' + post.ScriptID + '">' + post.DiscussionAboutName + '</a> : '
                            + '<a href="' + post.Url + '">' + post.Name + '</a> by '
                            + '<a href="' + localURL + "/forum/profile/" + post.FirstUserID + "/" + post.FirstName + '">' + post.FirstName + '</a> '
                            + '<time datetime="' + post.FirstDate + '">(' + getRelativeDate(post.FirstDate) + ')</time>, last comment by '
                            + '<a href="' + localURL + "/forum/profile/" + post.LastUserID + "/" + post.LastName + '">' + post.LastName + '</a> '
                            + '<time datetime="' + post.LastDate + '">(' + getRelativeDate(post.LastDate) + ')</time>';


                        list.appendChild(item);
                    }
                }
                else callback(xhr, null);

                function getRelativeDate(date)
                {
                    var ms = Date.now() - parseInt(new Date(date).getTime()),
                        secs = Math.floor(ms / (1000)) % 60,
                        mins = Math.floor(ms / (60 * 1000)) % 60,
                        hrs = Math.floor(ms / (60 * 60 * 1000)) % 24,
                        days = Math.floor(ms / (60 * 60 * 1000 * 24) % 7),
                        weeks = Math.floor(ms / (60 * 60 * 1000 * 24) / 7);

                    if (weeks) return date.replace(/\s+.+/, "");
                    if (days) return days + "day" + isPlural(days) + " and " + hrs + "hr" + isPlural(hrs);
                    if (hrs) return hrs + "hr" + isPlural(hrs) + " and " + mins + "min" + isPlural(mins);
                    if (mins) return mins + "min" + isPlural(mins) + " and " + secs + "sec" + isPlural(secs);
                    return secs + "sec" + isPlural(secs);

                    function isPlural(val)
                    {
                        if (val == 1) return "";

                        return "s";
                    }
                }
            }
        });
    }


    /* Gets the scripts from document
    ---------------------------------------------------------------------------*/
    function getScripts(doc)
    {
        if (!doc) doc = document;
        var ids = ["user-script-list", "user-deleted-script-list", "browse-script-list"];
        scripts = new Array();

        for (var i = 0, el, deleted, list; i < ids.length; i++)
        {
            el = doc.getElementById(ids[i]);
            if (!el) continue;

            deleted = ids[i].indexOf("deleted") > 0;
            list = el.children;
            for (var j = 0, stamp; j < list.length; j++)
            {
                var li = list[j];
                var script = new Object();
                script.name = li.getAttribute("data-script-name");
                script.id = li.getAttribute("data-script-id");
                script.author = li.getAttribute("data-script-author-name");
                script.authorID = li.getAttribute("data-script-author-id");
                script.description = li.getElementsByClassName("description")[0].textContent.trim();
                script.rating = li.getAttribute("data-script-rating-score");
                script.ratings = li.querySelector("dd.script-list-ratings").innerHTML;
                script.installsDaily = li.getAttribute("data-script-daily-installs");
                script.installsTotal = li.getAttribute("data-script-total-installs");
                script.dateCreated = li.getAttribute("data-script-created-date") + "|" + li.querySelector(".script-list-created-date time").textContent;
                script.dateUpdated = li.getAttribute("data-script-updated-date") + "|" + li.querySelector(".script-list-updated-date time").textContent;
                script.type = li.getAttribute("data-script-type");
                script.defunct = /defunct|depreciated|obselete|unsupported/i.test(script.description);
                script.deleted = deleted;
                scripts.push(script);

                stamp = GM_getValue("Script:" + script.id, false);

                if (stamp)
                {
                    stamp = JSON.parse(stamp);
                    if (li.querySelector(".script-list-updated-date time").getAttribute("datetime") != stamp.datetime) stamp.version = "";
                    else script.version = stamp.version;
                }
                else stamp = { datetime: li.querySelector(".script-list-updated-date time").getAttribute("datetime"), version: "", timestamp: "" };

                stamp.timestamp = Date.now();
                GM_setValue("Script:" + script.id, JSON.stringify(stamp));
            }
        }
    }


    /* Creates scripts table (relative search)
    ---------------------------------------------------------------------------*/
    function createScriptTable(isRelativeSearch)
    {
        var scriptTable = document.createElement("table");
        scriptTable.id = "script-table";
        var thead = scriptTable.createTHead();
        var row = thead.insertRow(-1);

        var headers = ["Name", "Ratings", "Daily", "Total", "Created", "Updated"];
        var tags = ["name", "ratings", (isRelativeSearch ? "daily_installs" : ""), "total_installs", "created", "updated"];

        cell = row.insertCell(-1);
        cell.textContent = "#";

        var cell;
        for (var i = 0; i < headers.length; i++)
        {
            cell = row.insertCell(-1);
            cell.innerHTML = headers[i];
            cell.onclick = onTableHeaderClick;
            cell.setAttribute("tag", tags[i]);
        }

        cell = row.cells[1];

        //scriptTable.createTBody();
        scriptTable.appendChild(document.createElement("tbody"));
        document.body.appendChild(scriptTable);

        TSL.addStyle("CitrusGS_Table", "#script-table {display: block; margin: 0 5px 5px 5px;} body {background-color: #EFEFB1; margin: 0;}"
            + "#script-table thead td {background-color: orange; border-radius: 0 0 5px 5px; box-shadow: 3px 3px 2px #888888;}"
            + "#script-table thead td:hover {cursor:pointer; background-color: yellow;}"
            + "#script-table thead td:first-child:hover {cursor:default; background-color: orange;}"
            + "#script-table td {width: auto; padding: 2px 5px; text-align:center;}"
            + "#script-table thead tr td:nth-child(3) {width: 120px; display: block;}"
            //+ ".total-rating-count {display: inline-block; min-width: 1em; text-align: center; padding: 0px 0.25em; border-radius: 10px;}"
            + ".total-rating-count, .good-rating-count, .ok-rating-count, .bad-rating-count {display: inline-block; min-width: 1em; padding: 1px 3px; border-radius: 3px;}"
            + ".total-rating-count {background-color: rgba(0, 0, 255, 0.1);}"
            + "#script-table tbody td {background-color: #FFFBDB;}"
            + "#script-table tbody td:first-child{background-color: #F9D5A6;}"
            + "#script-table tbody td:nth-child(2){width: 99%; background-color: white;text-align:left;}"
            + "#script-table tbody tr:hover td {background-color: yellow;}"
            + ".loadingSort {background-color: #FDFDC3 !important;}"
            + ".type-library, .type-unlisted, .type-deleted, .type-defunct {font-size:smaller; display: inline-block; border-radius: 3px; padding: 0 5px; border: 1px solid black;}"
            + ".type-library, .type-unlisted, .type-deleted, .type-defunct {box-shadow: 2px 2px 1px #888888; margin: 2px 5px 3px 0;}"
            + ".type-library {background-color: #CEFD8A;}"
            + ".type-deleted {background-color: #F77A7A;}"
            + ".type-defunct {background-color: #FF8600;}"
            + ".type-unlisted, .filterU {background-color: #CEE7F3;}"
            + ".type-library:before {content: 'Library';}"
            + ".type-deleted:before {content: 'Deleted';}"
            + ".type-unlisted:before {content: 'Unlisted';}"
            + ".type-defunct:before {content: 'No Longer Supported';}"
            + "#notice {margin:5px 5px 0 5px; background-color: #FDBB45;padding: 3px 5px; color: blue;}"
            + "thetitle {margin-bottom: 3px;} .theauthor{font-size:small;}"
        );

        TSL.addStyle("Al28dj21", ".thetitle a {margin-right: 2px !important;}");
        TSL.addStyle("Al28dj23", ".theversion {font-size: xsmall; margin-right: 4px;}");
        TSL.addStyle("Al28dj24", "tr[library] td:nth-child(2) {background-color: #DFF9C6 !important;}");
        TSL.addStyle("Al28dj25", "tr[unlisted] td:nth-child(2) {background-color: #E8F7FF !important;}");
        TSL.addStyle("Al28dj27", "tr[deleted] td:nth-child(2) {background-color: #F9E8E8 !important;}");
    }

    /* Populate the table with scripts
    ---------------------------------------------------------------------------*/
    function populateScriptTable(clear)
    {
        //populateScriptTable0(true); return;

        var tbody = document.getElementById("script-table").getElementsByTagName("tbody")[0];
        if (clear) tbody.innerHTML = "";
        if (scripts.length == 0) return;

        for (var i = 0; i < scripts.length; i++)
        {
            var script = getScriptHTML(i);

            row = tbody.insertRow(-1);
            row.id = "s" + script.id;
            cell = row.insertCell(-1);

            cell.textContent = "##";

            cell = row.insertCell(-1);
            var el = document.createElement("div");
            el.className = "thetitle";
            el.innerHTML = "<a href='https://greasyfork.org/scripts/"
                            + script.id + "' style='margin-right: 10px;'><b>" + script.name + "</b></a><span class='theversion'></span>";

            if (script.type == "library") AddScriptTag("library");
            else if (script.type == "unlisted") AddScriptTag("unlisted");
            else row.setAttribute("public", 0);

            if (script.deleted) AddScriptTag("deleted");
            if (script.defunct) AddScriptTag("defunct");


            // If page listing add author detail
            if (document.body.getAttribute("PageType") == "ListingPage")
            {
                el.innerHTML += '<span class="theauthor"><span>by </span><a href="https://greasyfork.org/users/' + script.authorID + '">' + script.author + '</a></span>';
            }
            cell.appendChild(el);

            el = document.createElement("div");
            el.textContent = script.description;
            cell.appendChild(el);
            cell = row.insertCell(-1);
            cell.innerHTML = script.ratings + '<span class="total-rating-count">' + script.rating + '</span>';
            cell.title = "Favoured plus Good Feedback, OK Feedback, Bad Feedback, Total Score (" + script.rating + ")";
            row.insertCell(-1).textContent = script.installsDaily;
            row.insertCell(-1).textContent = script.installsTotal;
            row.insertCell(-1).textContent = GM_getValue("Use Standard Date Format", false) ? script.dateCreated.split("|")[0] : script.dateCreated.split("|")[1];
            row.insertCell(-1).textContent = GM_getValue("Use Standard Date Format", false) ? script.dateUpdated.split("|")[0] : script.dateUpdated.split("|")[1];

            function AddScriptTag(tag)
            {
                el.innerHTML += '<span class="type-' + tag + '" />';
                row.setAttribute(tag, "");
            }

            if (script.version) addScriptVersion(script);
        }

        OrganizeTableByCategory();

        function getScriptHTML(idx)
        {
            var properties = "name id author authorID description rating ratings installsDaily installsTotal dateCreated dateUpdated type deleted";
            return makeStruct(properties, scripts[idx]);
        }
    }

    function addScriptVersion(script)
    {
        var el = document.querySelector("#s" + script.id + " .thetitle .theversion");

        if (!el) return;
        el.innerHTML = "(<b>" + script.version + "</b>)";

        if (/defunct|depreciated|obselete|unsupported/i.test(script.version))
        {
            el.innerHTML += '<span class="type-defunct" />';
            el.parentElement.parentElement.setAttribute("defunct", "");
        }

        stamp = JSON.parse(GM_getValue("Script:" + script.id));
        stamp.version = script.version;
        GM_setValue("Script:" + script.id, JSON.stringify(stamp));
    }

    function numberScriptListing()
    {
        var rows = document.querySelectorAll("#script-table > tbody > tr");

        if (!rows) return;

        var offset = 1, len = rows.length.toString().length;

        if (document.body.getAttribute("PageType") == "ListingPage")
        {
            var page = 1, limit = 100, m = document.location.search.match(/(?:\?|&)page=(\d+)/);
            if (m) page = parseInt(m[1]);

            m = document.location.search.match(/per_page=(\d+)/);
            if (m) limit = parseInt(m[1]);

            console.log(page, limit);
            offset += limit * (page - 1);
        }

        for (var i = 0; i < rows.length; i++)
        {
            rows[i].firstElementChild.textContent = (i + offset).toString().lPad("0", len);
        }
    }

    function OrganizeTableByCategory()
    {
        if (document.body.getAttribute("PageType") == "ListingPage")
        {
            numberScriptListing();
            return;
        }

        var tbody = document.getElementById("script-table").getElementsByTagName("tbody")[0];

        var rows = tbody.children;
        for (var i = 0, n; i < rows.length - 1; i++)
        {
            n = i;
            for (var j = i + 1; j < rows.length; j++)
            {
                if (getPosValue(rows[n]) > getPosValue(rows[j])) n = j;
            }
            if (n != i) tbody.insertBefore(rows[n], rows[i]);
        }


        numberScriptListing();

        function getPosValue(el)
        {
            var v = 0;
            if (el.hasAttribute("unlisted")) v += 4;
            if (el.hasAttribute("defunct")) v += 1;
            if (el.hasAttribute("library")) v += 2;

            if (el.hasAttribute("deleted")) v += 6;

            return v;
        }
    }

    /*
    ---------------------------------------------------------------------------*/
    function selectSortOrder(pageType, isRelativeSearch)
    {
        var tag = (isRelativeSearch) ? "" : GM_getValue(pageType, "updated");

        var m = document.URL.match(/[\?&]sort=(\w+)/);
        var tagURL = (m) ? m[1] : "";

        var page = document.URL.match(/[\?&]page=(\d+)/);

        TSL.addStyle("SelectedSortColumn", "[tag='" + tagURL + "'] {background-color: yellow !important;}");

        if (!isRelativeSearch && !page && (tagURL != tag || (document.URL.indexOf("per_page=100") < 0)))
        {
            document.querySelector(("[tag='" + tag + "']")).click();
            return;
        }
        getScriptVersionNumbers();
    }

    /*  Table header is clicked, get the correct script sorting
    ---------------------------------------------------------------------------*/
    function onTableHeaderClick(e)
    {
        if (document.querySelector("loadingSort")) return;
        this.className = "loadingSort";

        getScriptListing(this.getAttribute("tag"), true);
    }

    /*   Get script page
    ---------------------------------------------------------------------------*/
    function getScriptListing(tag, removePage)
    {
        var isListingPage = (document.body.getAttribute("PageType") == "ListingPage");

        if (isListingPage) url = document.URL.match(/https:\/\/greasyfork.org\/[\w-]+\/scripts(\/by-site\/[\w\.\-_]+|\/search)?/)[0] + "?per_page=100";
        else url = document.URL.replace(/\?.+/, "?");

        var m = document.URL.match(/[^=\?&]+=[^&]+/g);
        if (m)
            for (var i = 0; i < m.length; i++)
            {
                //if (!m[i].match(/^(per_page|sort)/) && !(firstPage && m[i].match(/^page/))) url += "&" + m[i];
                if (!m[i].match(/^(per_page|sort)/)) url += "&" + m[i];
            }

        if (tag) url += "&sort=" + tag;
        if (removePage) url = url.replace(/[\?&]page=\d+/, "");

        url = url.replace(/\?&/, "?");
        url = url.replace(/\?$/, "");

        if (url.indexOf("?") < 0) url = url.replace("&", "?");

        console.warn("getScriptListing IN: " + url)
        GM_xmlhttpRequest({
            url: url,
            method: "GET",
            timeout: 15000,
            headers: {
                "User-agent": navigator.userAgent,
                "Host": "greasyfork.org",
                "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
                "Accept-Language": "en-US,en;q=0.5"
            },
            onload: function (xhr)
            {
                if (xhr.status == 200)
                {
                    GM_setValue(document.body.getAttribute("PageType"), tag);

                    TSL.addStyle("SelectedSortColumn", "[tag='" + tag + "'] {background-color: yellow !important;}");

                    //stackoverflow.com/questions/19193335/change-the-url-in-browser-bar-without-reloading-page
                    window.history.pushState(null, "", xhr.finalUrl); //Change document URL

                    scripts = new Array();
                    //var doc = new DOMParser().parseFromString(xhr.responseText, 'text/xml');

                    var doc = document.implementation.createHTMLDocument('MPIV');
                    doc.documentElement.innerHTML = xhr.responseText;

                    TSL.removeNode(document.getElementsByClassName("pagination")[0]);

                    var pager = doc.getElementsByClassName("pagination")[0];

                    if (pager)
                    {
                        document.body.insertBefore(pager, document.getElementById("script-table").nextElementSibling);
                    }

                    getScripts(doc);
                    populateScriptTable(true);
                    getScriptVersionNumbers();
                }

                TSL.removeClass(document.querySelector(".loadingSort"), "loadingSort")
                console.warn("getScriptListing OUT: " + url);
            }
        });
    }

    function getScriptVersionNumbers()
    {
        //No need to do a JSON call as the stored information is already up-to-date
        if (document.querySelectorAll(".theversion").length == document.querySelectorAll(".theversion b").length) return;

        var jsonURL = document.URL.replace(/(\?|$)/, ".json$1");
        console.log("JSON: " + jsonURL);

        //Get version number
        GM_xmlhttpRequest({
            url: jsonURL,
            method: "GET",
            timeout: 15000,
            headers: {
                "User-agent": navigator.userAgent,
                "Host": "greasyfork.org",
                "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
                "Accept-Language": "en-US,en;q=0.5"
            },
            onload: function (xhr)
            {
                if (xhr.status == 200)
                {
                    var data = JSON.parse(xhr.responseText), scripts;
                    //console.log(data);
                    if (typeof data !== "object") return;
                    scripts = data.all_listable_scripts || data;

                    for (var i = 0, script; i < scripts.length; i++)
                    {
                        script = scripts[i];
                        addScriptVersion(script);
                    }

                    OrganizeTableByCategory();
                }
            }
        });
    }

    function getScriptJSON(obj)
    {
        var properties = "bad_ratings code_updated_at code_url contribution_amount contribution_url created_at daily_installs description fan_score good_ratings id license locale name namespace ok_ratings redistributable support_url total_installs url version";
        return makeStruct(properties, obj);
    }

    function makeStruct(keys, obj)
    {
        if (!obj) obj = {};

        var names = keys.split(" ").sort();
        for (var i = 0; i < names.length; i++)
        {
            obj[names[i]] = obj[names[i]];
        }

        return obj;
    }
})();
