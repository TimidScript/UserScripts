// ==UserScript==
// @name                [TS] Pixiv++
// @namespace           TimidScript
// @version             3.2.78a
// @description         Ultimate Pixiv Script: Direct Links, Auto-Paging, Preview, IQDB/Danbooru, Filter/Sort using Bookmark,views,rating,total score. | Safe Search | plus more. Works best with "Pixiv++ Manga Viewer" and "Generic Image Viewer". 自動ページング|ポケベル|ロード次ページ|フィルター|並べ替え|注文|ダイレクトリンク
// @author              TimidScript
// @homepageURL         https://openuserjs.org/users/TimidScript
// @copyright           © 2014 TimidScript, All Rights Reserved.
// @license             Creative Commons BY-NC-SA + Read the License inside the script
// @include             http://www.pixiv.net/*
// @exclude             http://www.pixiv.net/member_illust.php?mode=manga&illust_id*
// @exclude             http://www.pixiv.net/member_illust.php?mode=big&illust_id*
// @require		        https://openuserjs.org/src/libs/TimidScript/TSL_-_Generic.js
// @require             https://openuserjs.org/src/libs/TimidScript/TSL_-_GM_Update.js
// @homeURL             https://openuserjs.org/scripts/TimidScript/[TS]_Pixiv++
// @grant               GM_info
// @grant               GM_getMetadata
// @grant               GM_registerMenuCommand
// @grant               GM_getValue
// @grant               GM_setValue
// @grant               GM_listValues
// @grant               GM_deleteValue
// @grant               GM_xmlhttpRequest
// @icon                data:image/bmp;base64,Qk1GJwAAAAAAADYAAAAoAAAAMgAAADIAAAABACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAvYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ//Oo13////////////////////////////79/L/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ//Wsnj/////////////////7+DJ/86jXf+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ//////////////////ewpP/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/////////////////97Ck/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/////////////////3sKT/72EJ/+9hCf/vYQn/72EJ//Fk0L/zqNd/86jXf/Oo13/zqNd/86jXf/BjDX/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ//////////////////ewpP/yZtQ/+LJof/v4Mn////////////////////////////////////////////38OT/4smh/8mbUP+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn//////////////////////////////////////////////////Po1//v4Mn/7+DJ//v38v///////////////////////////+/gyf/Jm1D/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf///////////////////////fw5P/iyaH/zqNd/8GMNf+9hCf/vYQn/72EJ/+9hCf/vYQn/8WTQv/auob/9/Dk///////////////////////ewpP/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ//////////////////m0a7/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/2rqG///////////////////////m0a7/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/////////////////97Ck/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/yZtQ//v38v/////////////////iyaH/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/////////////////3sKT/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/1rJ4///////////////////////Oo13/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ//////////////////ewpP/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/7+DJ/////////////////+/gyf+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/////////////////97Ck/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ//Oo13//////////////////////8WTQv+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/////////////////3sKT/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ//38OT/////////////////2rqG/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ//////////////////ewpP/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/+/gyf/////////////////iyaH/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/////////////////97Ck/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/4smh/////////////////+/gyf+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ//iyaH/xZNC/72EJ/+9hCf/////////////////3sKT/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ//m0a7/////////////////7+DJ/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/2rqG///////Oo13/vYQn/72EJ//////////////////ewpP/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/+/gyf/////////////////ewpP/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/8GMNf/79/L//////9ayeP+9hCf/vYQn/////////////////97Ck/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/+/fy/////////////////9ayeP+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/2rqG////////////+/fy/8mbUP+9hCf/////////////////3sKT/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/9Kqa///////////////////////wYw1/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/5tGu////////////+/fy/8mbUP/////////////////ewpP/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/7+DJ/////////////////+bRrv+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/5tGu////////////+/fy/////////////////97Ck/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/9Kqa///////////////////////xZNC/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/1rJ4//v38v//////////////////////3sKT/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ//Jm1D/+/fy/////////////////9q6hv+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/xZNC/+/gyf/////////////////38OT/zqNd/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/0qpr//v38v/////////////////m0a7/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/9ayeP/38OT/////////////////8+jX/9ayeP/Fk0L/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/zqNd/+rZvP//////////////////////2rqG/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ//Wsnj/8+jX///////////////////////38OT/7+DJ/+rZvP/q2bz/7+DJ//v38v//////////////////////7+DJ/8mbUP+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/yZtQ/97Ck//v4Mn////////////////////////////////////////////38OT/4smh/8mbUP+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/yZtQ/86jXf/Oo13/zqNd/86jXf/Oo13/wYw1/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/w==
// ==/UserScript==

/* License + Copyright Notice
********************************************************************************************
Copyright © TimidScript, All Rights Reserved.
[Creative Commons BY-NC-SA](http://en.wikipedia.org/wiki/Creative_Commons_license)

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the
following conditions are met:

1) This copyright must be included
2) Due credits and link to original author's homepage (included in copyright).
3) Notify the original author of redistribution

TimidScript's Homepages:  [GitHub](https://github.com/TimidScript)
                          [OpenUserJS](https://openuserjs.org/users/TimidScript)
                          [GreasyFork](https://greasyfork.org/users/1455-timidscript)
*/
/* Information
********************************************************************************************
    Version History
------------------------------------
3.2.78 (2015-08-23)
 - Filter fixed. Neat code provided by HoldMyPizza from OUJS
3.2.77 (2015-07-26)
 - Bug Fix: Corrected latest fix
3.2.76 (2015-07-25)
 - Bug Fix: Capture new homepage url
3.2.75 (2015-06-27)
 - Bug Fix: Default preview time and height were switched
 - Bug Fix: Removal of extra title from thumbnail
 - Support for other 3rd party of login by adding full support of xhr to be default rather than GM_xhr. Default request method is now is xhr
 - Removed iframe support
3.2.74 (2015-06-06)
 - Bug fixes to support own illustrations both public and hidden
3.2.73 (2015-05-30)
 - Outgoing links are direct now
 - Bug Fix: getIllustID extracts id from unique urls now
        http://www.pixiv.net/member_illust.php?illust_id=1111111&mode=medium
        http://www.pixiv.net/member_illust.php?mode=medium&illust_id=1111111
 - Bug Fix: Bookmark count was not being attained in "Works" page (3)
3.2.72 (2015-05-25)
 - Bug fix: Removes the token information from image link (illustURL)
3.2.71 (2015-05-16)
 - As of 11/05/2015 the Phone API (SPAPI) is dead. Using public API and HTML instead.
 - Single paged mangas will be marked as illustrations rather than manga as in most cases that is the case
 - Changed much of the metadata and information used
 - Created a separate library for the illustration data getter
 - Manga hotbox preview images dimensions unfixed
 - Removed a lot of redundant code. including linker methods, Cache and rated paging
    - GM_setValue("LinkerMethod", 2);  //[2]
    - GM_setValue("EnableCache", true); //[3]
    - GM_setValue("APIAgeRating", true); //[4]
 - RequestBoomarkCount setting added
 - Huge amount of optimisation and removal of redundant code
 - IQDB now uses size 240 (240x480)
 - Need to remove AgeRating searches. Should only be a filter.
3.1.70 (2015-05-08)
 - Page count added in information box
3.1.69 (2015-04-14)
 - Hidden comix ads from the illustration page
 - Changed the illustration page interface. Illustration information is always shown and thumbnails for
 pages are bellow the illustration.
.
.
.
*************************************************************************************************/

//if (window.self !== window.top) return;

var IsIllustrationPage = (document.URL.indexOf("http://www.pixiv.net/member_illust.php?") != -1 && document.URL.match(/mode=medium/i) != null);
var Illustrations = {};

var PAGETYPE = (function ()
{
    if (IsIllustrationPage) return 0;
    else if (document.URL.match(/http:\/\/www\.pixiv\.net\/((cate_r18|mypage|member)\.php|$)/i)) return 1;
    else if (document.URL.match(/http:\/\/www\.pixiv\.net\/member_illust\.php\?id/i)) return 3; //Artist Work Page
    else if (document.URL.match(/http:\/\/www\.pixiv\.net\/member_illust\.php/i)) return 4; //Personal Work Page
    else if (document.URL.match(/http:\/\/www\.pixiv\.net\/bookmark(_add)?\.php/i)) return 5;  //Personal Bookmarks, Added new bookmarks
    else if (document.URL.match(/http:\/\/www\.pixiv\.net\/bookmark\.php\?id=/i)) return 6; //Artist Bookmark
    else if (document.URL.match(/http:\/\/www\.pixiv\.net\/bookmark_new_illust(_r18)?\.php/i)) return 7; //Works from favourite artists
    else if (document.URL.match(/http:\/\/www\.pixiv\.net\/new_illust(_r18)?\.php/i)) return 8; //New illustrations
    else if (document.URL.match(/http:\/\/www\.pixiv\.net\/search\.php\?/i)) return 9; //Search

    return -1;
})();


console.info("Pixiv++ (" + PAGETYPE + ")");

if (!(typeof GM_getValue === "function" && GM_getValue("", "?") === "?"))
{
    GM_setValue = function (key, val) { localStorage.setItem(key, val); };
    GM_getValue = function (key, def) { return (localStorage.getItem(key) ? localStorage.getItem(key) : def); }
}

var containerClasses =
    {
        UnPaged:
        [
            "works_display", // Illustration Page (http://www.pixiv.net/member_illust.php?mode)
            "content", //Personal Home Page (http://www.pixiv.net/mypage.php)
            "top_display_works linkStyleWorks", //Personal Home Page Adult Content
            "worksListOthers", //Artist's Profile Page (http://www.pixiv.net/member.php?)
            "search_a2_result linkStyleWorks", //Response Page
        ],
        Paged:
            [
                "_image-items",
                "display_works linkStyleWorks", //Artist's & Personal Work and Bookmark Page (http://www.pixiv.net/member_illust.php)(http://www.pixiv.net/bookmark.php)
                "_image-items autopagerize_page_element", // Illustrations Search; New Illustrations; Your Favourite Artist's New Illustrations; (http://www.pixiv.net/search.php?)(http://www.pixiv.net/new_illust.php)(http://www.pixiv.net/new_illust_r18.php)(http://www.pixiv.net/bookmark_new_illust.php)

            ]
    };


/*
===================================================================================================================================
 Handles all functions to do with getting and adding all Illustration links and metadata. This includes: Image Links,
 IQDB, Bookmark Count, Views, Rating and score.
===================================================================================================================================*/
var IllustrationLinker =
   {
       //Contains all thumbnail links that need to be parsed
       processList: new Array(),
       //Max of simultaneous link calls. The higher the count the more stress on server and ISP
       simultaneousCallsMAX: 6,
       simultaneousCalls: 0,
       intervalID: null,
       msgHandle: null,
       thumbcounter: 0,
       //Used by the pager when running in "SafeMode" as it temporarily removes session cookie
       shortPause: false,
       //If false the thumbnail interval parser stops running
       enabled: false, //First time it gets turned on is when the SideBar is loaded
       TIMESTART: 0,
       TIMEEND: 0,
       requestBookmarkCount: GM_getValue("RequestBookmarkCount", 0),

       getIllustID: function (url)
       {
           var id = url.replace(/.+www\.pixiv\.net\/member_illust\.php(\?.+&|\?)illust_id=(\d+)(&.+)?/, "$2");
           id = id.replace(/.+i\d+\.pixiv\.net\/(img|c\/).+\/(\d+)(_.+)?\.\w+(\?.+)?/, "$2");
           return id;
       },

       getIllust: function (id)
       {
           var properties = "userID userName userProfileImageURL illustType illustID illustTitle illust128URL illust150URL illust240URL illust480URL illust600URL illustURL pageCount description time tags tools ratings totalRatings viewCount bookmarkCount responseCount R18";
           var illust = Illustrations["i" + id];

           if (!illust)
           {
               illust = {};
               Illustrations["i" + id] = illust;
           }

           return makeStruct(properties, illust);
       },

       /*
       -------------------------------------------------------------------------------------------
        Parses through all the image links and add full image link
       -------------------------------------------------------------------------------------------*/
       getContainerLinks: function (containers, pageNumber)
       {
           if (!containers) return;

           var id, thumbnail;
           if (IsIllustrationPage) ////Illustration Page that excludes Novels
           {
               IllustrationLinker.getDataHTML(IllustrationLinker.getIllustID(document.URL))
               return;
           }

           for (var i = 0, i; container = containers[i], i < containers.length; i++)
           {
               links = container.getElementsByTagName("a");
               for (var j = 0; link = links[j], j < links.length; j++)
               {
                   if (link.href.indexOf("http://www.pixiv.net/member_illust.php?mode=") != -1 && link.getElementsByTagName('IMG').length == 1)
                   {
                       id = IllustrationLinker.getIllustID(link.href);
                       thumbnail = link.parentNode;
                       thumbnail.id = "i" + id;
                       thumbnail.setAttribute("illustration-id", id);
                       thumbnail.setAttribute("name", "pppThumb");

                       if (pageNumber > 0)
                       {
                           TSL.addClass(thumbnail, "pppThumb" + (pageNumber % 3));
                           thumbnail.setAttribute("page", pageNumber);
                           thumbnail.setAttribute("position", ++IllustrationLinker.thumbcounter);
                       }

                       if (IllustrationLinker.getIllust(id).illustID) IllustrationLinker.createLinksBox(id);
                       else IllustrationLinker.processList.push(id);
                   }
               }
           }

           PaginatorHQ.displayResultInfo();
           if (this.enabled) this.runIntevalThumbnailParser();
       },

       /*
       -------------------------------------------------------------------------------------------
        Get links again. Called when using ARS
       -------------------------------------------------------------------------------------------*/
       resetSettings: function ()
       {
           clearInterval(IllustrationLinker.intervalID);
           IllustrationLinker.intervalID = null;
           IllustrationLinker.processList = new Array();
           if (IllustrationLinker.msgHandle) IllustrationLinker.msgHandle.textContent = "";
       },

       /*
       -------------------------------------------------------------------------------------------
        Contains the interval that requests image information
       -------------------------------------------------------------------------------------------*/
       runIntevalThumbnailParser: function ()
       {
           IllustrationLinker.TIMESTART = new Date();

           if (!IllustrationLinker.msgHandle) IllustrationLinker.msgHandle = DisplayMessage("Getting metadata for [" + IllustrationLinker.processList.length + "] illustrations...");
           if (IllustrationLinker.intervalID == null && IllustrationLinker.enabled) IllustrationLinker.intervalID = setInterval(processNextID, 100);

           function processNextID()
           {
               //shortPause used when removing session cookie for safe page search
               if (IllustrationLinker.shortPause || IllustrationLinker.simultaneousCalls >= IllustrationLinker.simultaneousCallsMAX) return;

               if (IllustrationLinker.processList.length == 0 && IllustrationLinker.simultaneousCalls == 0)
               {
                   IllustrationLinker.TIMEEND = new Date();
                   //console.log(IllustrationLinker.TIMEEND - IllustrationLinker.TIMESTART);
                   clearInterval(IllustrationLinker.intervalID);
                   IllustrationLinker.intervalID = null;
                   RemoveMessage(IllustrationLinker.msgHandle);
                   IllustrationLinker.msgHandle = null;
                   PreviewHQ.adjustAllHotboxPositions();
                   PaginatorHQ.displayResultInfo();
                   DisplayMessage("Illustration metadata acquired", 1000);
               }
               else if (IllustrationLinker.processList.length % 5 == 0)
               {
                   IllustrationLinker.msgHandle.textContent = "Getting metadata for [" + (IllustrationLinker.simultaneousCalls + IllustrationLinker.processList.length) + "] illustrations...";
                   PaginatorHQ.displayResultInfo();
                   PreviewHQ.adjustAllHotboxPositions();
               }

               //Last check
               if (IllustrationLinker.enabled && IllustrationLinker.processList.length > 0)
               {
                   IllustrationLinker.simultaneousCalls++;
                   IllustrationLinker.getDataHTML(IllustrationLinker.processList.shift());
               }
           }
       },

       /*
       -------------------------------------------------------------------------------------------
        If "value" is set to true the linker is temporarily paused. This is used only for short
        term pausing. switchOff is used for longer pausing method.
       -------------------------------------------------------------------------------------------*/
       pause: function (value)
       {
           IllustrationLinker.shortPause = value;
           if (value && msgHandle) msgHandle.textContent = "";
       },

       /*
       -------------------------------------------------------------------------------------------
        Thumbnail parser interval is cleared and the link generation halts until it switchOn
        is called.
       -------------------------------------------------------------------------------------------*/
       switchOff: function ()
       {
           PreviewHQ.adjustAllHotboxPositions();
           IllustrationLinker.enabled = false;
           clearInterval(IllustrationLinker.intervalID);
           IllustrationLinker.intervalID = null;
           if (IllustrationLinker.msgHandle) RemoveMessage(IllustrationLinker.msgHandle);
           IllustrationLinker.msgHandle = null;
       },

       switchOn: function ()
       {
           PreviewHQ.adjustAllHotboxPositions();
           IllustrationLinker.enabled = true;
           IllustrationLinker.runIntevalThumbnailParser();
       },

       /*
       -------------------------------------------------------------------------------------------
        Extracts data from illustration page
       -------------------------------------------------------------------------------------------*/
       setMetadata: function (id, doc)
       {
           if (IsIllustrationPage) console.warn("Illustration page debugging: ", id);
           var el, m, context
           metadata = IllustrationLinker.getIllust(id),
           script = doc.evaluate("//div[@id='wrapper']//script[contains(text(),'pixiv.context.illustId')]", doc, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

           unsafeWindow.eval("pixiv" + id + "= {}; pixiv" + id + ".context= {};");
           script.innerHTML = script.innerHTML.replace(/pixiv\.context/g, "pixiv" + id + ".context");
           unsafeWindow.eval(script.innerHTML);
           context = unsafeWindow["pixiv" + id].context;

           metadata.userID = context.userId; //el.parentElement.href.match(/member\.php\?id=(\d+)/i)[1];
           metadata.userName = context.userName; //el.nextElementSibling.textContent;
           el = doc.querySelector(".user-image");
           if (el)
           {
               metadata.userProfileImageURL = el.src;
               if (el.src.match("/profile/")) metadata.userLoginName = el.src.match(/\/profile\/([^\/])+\//i)[1];
           }

           metadata.illustID = id;
           metadata.illustTitle = context.illustTitle; //doc.querySelector('meta[property="og:title"]'); //Translation scripts mess with the title
           metadata.R18 = 0;
           if (doc.querySelector(".r-18")) metadata.R18 = 1;
           if (doc.querySelector(".r-18g")) metadata.R18 = 2;
           metadata.pageCount = 1;

           if (doc.querySelector(".tools")) metadata.tools = doc.querySelector(".tools").textContent;

           metadata.tags = [].map.call(doc.querySelectorAll('li.tag a.text'), function (v, i)
           {
               return v.childNodes[0].textContent;
           }).join(' ');

           metadata.illust128URL = doc.querySelector('meta[property="og:image"]');
           metadata.illust128URL = (metadata.illust128URL) ? metadata.illust128URL.getAttribute("content") : doc.querySelector('img[class="original-image"]').getAttribute("data-src");

           metadata.description = doc.querySelector('meta[property="og:description"]');
           metadata.description = (metadata.description) ? metadata.description.getAttribute("content") : doc.querySelector("._unit .caption").innerHTML;

           metadata.bookmarkCount = "?";

           metadata.viewCount = parseInt(doc.querySelector(".view-count").textContent);
           metadata.ratings = parseInt(doc.querySelector(".rated-count").textContent);
           metadata.totalRatings = parseInt(doc.querySelector(".score-count").textContent);

           el = doc.querySelector(".response-in-work-more");
           metadata.responseCount = (el) ? parseInt(el.textContent.match(/\d+/)[0]) : 0;
           if (context.ugokuIllustFullscreenData)
           {
               metadata.illustType = 3;
               metadata.illustURL = context.ugokuIllustFullscreenData.src;

               metadata.illust128URL = metadata.illust128URL.replace(/\/img-inf\/(.+)_s/, "/c/128x128/img-master/$1_master1200");
               metadata.illust128URL = metadata.illust128URL.replace(".png", ".jpg");
               metadata.illust150URL = metadata.illust128URL.replace("/128x128/", "/150x150/");
               metadata.illust240URL = metadata.illust128URL.replace("/128x128/", "/240x480/");
               metadata.illust480URL = metadata.illust128URL.replace("/128x128/", "/480x960/");
               metadata.illust600URL = metadata.illust128URL.replace("/128x128/", "/600x600/");
               metadata.illust1200URL = metadata.illust128URL.replace("/128x128/", "/1200x1200/");
           }
           else
           {
               el = doc.querySelector(".works_display ._layout-thumbnail img");
               metadata.illustURL = metadata.illust600URL = el.src;

               el = doc.querySelector(".original-image");
               if (el) //Single Image
               {
                   metadata.illustType = 1;
                   metadata.illustURL = el.getAttribute("data-src").replace(/\?.+/, "");
               }
               else //Manga
               {
                   metadata.illustType = 2;

                   el = doc.querySelectorAll(".work-info .meta li")[1];
                   m = el.textContent.match(/(\d+)P$/i);
                   if (m)
                   {
                       metadata.pageCount = parseInt(m[1]);
                   }
                   else //Single paged manga
                   {
                       metadata.pageCount = 1;
                       metadata.illustType = 1;
                   }


                   metadata.illustURL = metadata.illustURL.replace(/(\d+)_m\.\w+/, "$1_big_p0" + metadata.illust128URL.match(/(.\w+)$/)[1]);
                   metadata.illustURL = metadata.illustURL.replace(/c\/600x600\/img-master(.+)\/.+/, "img-original$1/" + metadata.illustID + "_p0" + metadata.illust128URL.match(/(\.\w+)$/)[1]);
                   if (metadata.illustID < 11319936) metadata.illustURL = metadata.illustURL.replace("_big", "");
               }

               if (metadata.illust128URL.indexOf("/img-master/") > 0)
               {
                   metadata.illust150URL = metadata.illust128URL.replace("/128x128/", "/150x150/");
                   metadata.illust128URL = metadata.illust150URL.replace("/150x150/", "/128x128/");
                   metadata.illust240URL = metadata.illust128URL.replace("/128x128/", "/240x480/");
                   metadata.illust480URL = metadata.illust128URL.replace("/128x128/", "/480x960/");
                   metadata.illust480URL = metadata.illust128URL.replace("/128x128/", "/600x600/");
                   metadata.illust1200URL = metadata.illust128URL.replace("/128x128/", "/1200x1200/");
               }
               else
               {
                   metadata.illust240URL = metadata.illust600URL.replace(/([^\/]+)\/(\d+)_m.+/, "$1/mobile/$2_240mw.jpg");
                   metadata.illust480URL = metadata.illust600URL;
                   metadata.illust1200URL = metadata.illust600URL;
                   if (metadata.illustType == 2) metadata.illust240URL = metadata.illust240URL.replace("_240mw", "_240mw_p0");
                   if (metadata.pageCount > 1 && metadata.illustID >= 11319936) metadata.illust1200URL = metadata.illustURL.replace("_big", "")
                   metadata.illust150URL = metadata.illust240URL;
               }
           }

           metadata.bookmarkCount = IllustrationLinker.getBookmarkCount(id);

           if (IsIllustrationPage) console.log("HTML", metadata);
           //if (IsIllustrationPage)
           //{
           //    var arr = ["illust128URL", "illust150URL", "illust240URL", "illust480URL", "illust600URL", "illust1200URL"];
           //    var wd = document.querySelector(".works_display");
           //    wd.innerHTML = "";
           //    for (var i = 0; i < arr.length; i++)
           //    {
           //        var img = document.createElement("img");
           //        img.src = metadata[arr[i]];
           //        img.title = arr[i] + ": " + metadata[arr[i]];
           //        wd.appendChild(img);
           //        wd.appendChild(document.createElement("br"));
           //    }
           //}
           return metadata;
       },

       /*
       -------------------------------------------------------------------------------------------
        Gets bookmark count from thumbnail if one exists
       -------------------------------------------------------------------------------------------*/
       getBookmarkCount: function (id)
       {
           var thumbnail = document.getElementById("i" + id);

           if (thumbnail)
           {
               var bm = thumbnail.querySelector(".bookmark-count");
               if (bm) return parseInt(bm.textContent);
               if (PAGETYPE == 1 || PAGETYPE == 3 || PAGETYPE == 7 || PAGETYPE == 8) return "?"; //Pages that do not contain bookmark information
               else return 0;
           }

           return "?";
       },

       /*
       -------------------------------------------------------------------------------------------
        Creates main links that are used by Downloaders. These links can be hidden. It also
        creates calls the creation of the hotbox.
       -------------------------------------------------------------------------------------------*/
       createLinksBox: function (id)
       {
           var thumbnail = document.getElementById("i" + id),
           metadata = IllustrationLinker.getIllust(id);

           var linksBox = document.createElement("div");
           linksBox.className = "pppLinksBox";
           var directLinks = document.createElement("span");

           if (IsIllustrationPage)
           {
               TSL.addStyle("LINXBOX", ".pppLinksBox {margin: 0 50px; text-align: center;}");
               var el = document.querySelector(".works_display");
               el.parentNode.insertBefore(linksBox, el.nextSibling);
           }
           else
           {
               PaginatorHQ.tidyThumbnail(id);
               thumbnail.insertBefore(linksBox, thumbnail.querySelector("a").nextSibling);
           }

           linksBox.appendChild(directLinks);
           directLinks.className = "pppDirectLinks";

           if (PAGETYPE > 1)
           {
               var evaluator = new XPathEvaluator(); //document.evaluate
               var sortButton = evaluator.evaluate("//a[@name='Sort']", SideBar.iDoc.body, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
               if (sortButton.firstElementChild.style.borderColor == "rgb(0, 255, 0)") sortButton.firstElementChild.style.borderColor = "#F00";
           }


           if (metadata.pageCount <= 1) //Single Illustration
           {
               var directLink = document.createElement("a");
               directLink.textContent = "[" + ((metadata.illustType == 3) ? "🎥" : "❀") + "]"; //S❂❀

               directLink.href = metadata.illustURL;

               if (!Settings.display.illustLink) directLinks.style.display = "none";
               directLinks.appendChild(directLink);
           }
           else //Manga Illustration
           {
               directLinks.setAttribute("style", "font-size:xx-small");
               var mangaLinks = '[ ';

               for (var i = 0, href; i < metadata.pageCount; i++)
               {
                   href = metadata.illustURL.replace(/_p\d+/, "_p" + i);

                   if (IsIllustrationPage) mangaLinks += '<a title ="Page #' + i + '" href="' + href + '">' + i + '</a> | ';
                   else mangaLinks += '<a title ="Page #' + i + '" href="' + href + '">' + (((i + 1) % 5 == 0) ? "◆" : "◇") + '</a>'
               }

               mangaLinks = mangaLinks.replace(/ | $/, "") + "]";

               if (IsIllustrationPage)
               {
                   directLinks.innerHTML = mangaLinks;
                   directLinks.setAttribute("style", "font-size:small");
               }
               else directLinks.innerHTML = mangaLinks;


               if (!Settings.display.mangaLinks) directLinks.style.display = "none";
           }

           if (IsIllustrationPage)
           {
               TSL.addStyle("RemoveAds", ".ads_anchor {display:none;}");
               TSL.addStyle("AddBorder", ".work-tags, .works_display  {margin-bottom: 0px;}");
               //TSL.addStyle("VLB", "#VisibleLinkBox {background-color: red; height: 40px; margin: 5px 20px 10px 20px;}");
               TSL.addStyle("VLB", "#VisibleLinkBox {margin: 1px 20px 10px 20px; background-color: gray;}");
               var linkbox = document.createElement("section");
               linkbox.id = "VisibleLinkBox";
               linkbox.className = "work-tags";

               var metascore = [metadata.bookmarkCount, metadata.viewCount, metadata.ratings, metadata.totalRatings, metadata.responseCount];
               var metaname = ["★", "Views", "Rating", "Total", "Response"];

               linkbox.innerHTML = "<a class='bookmark-count' style='background-color:#FFFD00;' href='http://" + Settings.IQDBType + ".IQDB.org/?url=" + ((metadata.illustType == 3) ? metadata.illust480URL : metadata.illust150URL) + "&NULL'>IQDB<a>"
               + '<a href="/response.php?type=illust&amp;id=' + metadata.illustID + '" class="image-response-count ui-tooltip" data-tooltip="Received ' + metascore[4] + ' image responses"><i class="_icon sprites-image-response-badge"></i>' + metascore[4] + '</a>'
               + '<a href="/bookmark_detail.php?illust_id=' + metadata.illustID + '" class="bookmark-count ui-tooltip" data-tooltip="Received ' + metascore[0] + ' bookmarks"><i class="_icon sprites-bookmark-badge"></i>' + metascore[0] + '</a>';

               if (metadata.pageCount > 1)
                   linkbox.innerHTML = "<a class='bookmark-count' style='background-color:#81FF00;'>P" + metadata.pageCount + "</a>" + linkbox.innerHTML;


               for (var i = 1; i < 4; i++) linkbox.innerHTML += "<span class='bookmark-count' style='background-color:#FDFDFB;'>" + metaname[i] + " " + metascore[i] + "</span>";

               var el = document.querySelector(".work-tags");
               el.parentNode.insertBefore(linkbox, el.nextElementSibling);

               if (metadata.illustType == 2 && metadata.pageCount > 1) //Manga
               {
                   var previewThumbs = document.createElement("section");
                   previewThumbs.setAttribute("style", "text-align: center;");
                   linksBox.parentElement.insertBefore(previewThumbs, linksBox.nextElementSibling);

                   var ShowThumbs = document.createElement("button");
                   ShowThumbs.textContent = "Show Thumbnails";
                   ShowThumbs.setAttribute("style", "display: inline-block; width: 300px; height: margin: 10px 0 20px 0; padding: 5px;");
                   previewThumbs.appendChild(ShowThumbs);

                   ShowThumbs.onclick = function ()
                   {
                       if (this.shown)
                       {
                           ShowThumbs.textContent = "Show Thumbnails";
                           document.getElementById("MangaThumbnails").style.display = "none";
                           this.shown = false;
                       }
                       else
                       {
                           ShowThumbs.textContent = "Hide Thumbnails";
                           this.shown = true;
                           if (document.getElementById("MangaThumbnails")) document.getElementById("MangaThumbnails").style.display = "block";
                           else
                           {
                               TSL.addStyle("MangaT", "#MangaThumbnails img {max-width: 150px; min-width: 150px; margin: 2px; box-shadow: 5px 5px 3px #888888;}");
                               var thumbs = document.createElement("section");
                               thumbs.id = "MangaThumbnails";
                               thumbs.setAttribute("style", "margin: 10px 30px;");
                               linksBox.parentElement.insertBefore(thumbs, previewThumbs.nextElementSibling);
                               for (var i = 0; i < metadata.pageCount; i++)
                               {
                                   el = document.createElement("a");

                                   el.href = metadata.illustURL.replace(/\/(\d+|\d+_big)_p\d+/i, "/$1_p" + i);
                                   el.innerHTML = "<img src='" + metadata.illust240URL.replace(/_p\d+/i, "_p" + i) + "'/>";
                                   //el.innerHTML = "<img src='" + metadata.illust150URL.replace(/_p\d+/i, "_p" + i) + "'/>";
                                   thumbs.appendChild(el);
                               }
                           }
                       }
                   }
               }
           }
           else
           {
               var IQDBLink = document.createElement("a");
               IQDBLink.textContent = "IQDB";
               IQDBLink.className = "IQDBLink";
               linksBox.appendChild(IQDBLink);
               PaginatorHQ.updateIQDBLink(linksBox);
               PreviewHQ.createHotBox(id);
           }

           if (PAGETYPE > 1) PaginatorHQ.filterThumbnail(thumbnail);
       },

       /*
       -------------------------------------------------------------------------------------------
        Gets illustration information using Illustration page
       -------------------------------------------------------------------------------------------*/
       getDataHTML: function (id)
       {
           var extensionKnown = false, illust = IllustrationLinker.getIllust(id), START = new Date();


           if (IsIllustrationPage) ////Illustration Page that excludes Novels
           {
               IllustrationLinker.setMetadata(id, document);
               finalise();
               return;
           }

           if (Settings.requestMethod & 4)
           {
               GM_xmlhttpRequest({
                   url: "http://www.pixiv.net/member_illust.php?mode=medium&illust_id=" + id,
                   method: "GET",
                   timeout: 15000,
                   //headers: { "User-agent": navigator.userAgent, "Accept": "text/html", Referer: "http://www.pixiv.net" },
                   headers: { "User-agent": navigator.userAgent, "Accept": "text/html" },
                   onload: function (response)
                   {
                       if (response.status == 200) //Response 200 implies that link exist and then most likely a Manga (or an Error XD)
                       {
                           var END = new Date();
                           //console.info(END - START);
                           var doc = new DOMParser().parseFromString(response.responseText, "text/html");
                           IllustrationLinker.setMetadata(id, doc);
                       }

                       finalise();
                   }
               });
           }
           else
           {
               var oReq = new XMLHttpRequest();
               oReq.open("GET", "http://www.pixiv.net/member_illust.php?mode=medium&illust_id=" + id, true);
               oReq.responseType = "text";
               oReq.timeout = 15000;
               oReq.onload = function (e)
               {
                   if (oReq.status == 200) //Response 200 implies that link exist and then most likely a Manga (or an Error XD)
                   {
                       var END = new Date();
                       //console.info(END - START);
                       var doc = new DOMParser().parseFromString(oReq.response, "text/html");
                       IllustrationLinker.setMetadata(id, doc);
                   }

                   finalise();
               };
               oReq.send();
           }

           function finalise()
           {
               if (illust.bookmarkCount == "?" &&
                   (IllustrationLinker.requestBookmarkCount == 2 || (IllustrationLinker.requestBookmarkCount == 1 && !IsIllustrationPage)))
               {
                   getBookmarkCount();
               }
               else if (!extensionKnown && illust.pageCount > 1)
               {
                   extensionKnown = true;
                   getMangaExtension();
               }
               else
               {
                   IllustrationLinker.createLinksBox(id);
                   if (IllustrationLinker.simultaneousCalls > 0) IllustrationLinker.simultaneousCalls--;
               }
           }

           function getBookmarkCount()
           {
               if ((IsIllustrationPage && (Settings.requestMethod & 8)) ||
                   (!IsIllustrationPage && (Settings.requestMethod & 4)))
               {
                   GM_xmlhttpRequest({
                       url: "http://www.pixiv.net/bookmark_detail.php?illust_id=" + id,
                       method: "GET",
                       timeout: 15000,
                       //headers: { "User-agent": navigator.userAgent, "Accept": "text/html", Referer: "http://www.pixiv.net" },
                       headers: { "User-agent": navigator.userAgent, "Accept": "text/html" },
                       onload: function (response)
                       {
                           if (response.status == 200) //Response 200 implies that link exist and then most likely a Manga (or an Error XD)
                           {
                               var doc = new DOMParser().parseFromString(response.responseText, "text/html");
                               var bm = doc.querySelector(".bookmark-count");
                               if (bm) illust.bookmarkCount = parseInt(bm.textContent);
                               else illust.bookmarkCount = 0;
                           }
                           finalise();
                       }
                   });
               }
               else
               {
                   var oReq = new XMLHttpRequest();
                   oReq.open("GET", "http://www.pixiv.net/bookmark_detail.php?illust_id=" + id, true);
                   oReq.responseType = "text";
                   oReq.timeout = 15000;
                   oReq.onload = function (e)
                   {
                       if (oReq.status == 200) //Response 200 implies that link exist and then most likely a Manga (or an Error XD)
                       {
                           var doc = new DOMParser().parseFromString(oReq.response, "text/html");
                           var bm = doc.querySelector(".bookmark-count");
                           if (bm) illust.bookmarkCount = parseInt(bm.textContent);
                           else illust.bookmarkCount = 0;
                       }

                       finalise();
                   };
                   oReq.send();
               }
           }
           /*
            There is no way of finding out the extension of manga files in the new naming method using
            the illustration page. We need to make another http request.
            -------------------------------------------------------------------------------------------*/
           function getMangaExtension()
           {
               if (illust.illust128URL.indexOf("/img-master/") > 0) //New naming format
               {
                   if ((IsIllustrationPage && (Settings.requestMethod & 8)) ||
                    (!IsIllustrationPage && (Settings.requestMethod & 4)))
                   {
                       GM_xmlhttpRequest({
                           url: "http://www.pixiv.net/member_illust.php?mode=manga_big&illust_id=" + id + "&page=0",
                           method: "GET",
                           timeout: 15000,
                           //headers: { "User-agent": navigator.userAgent, "Accept": "text/html", Referer: "http://www.pixiv.net" },
                           headers: { "User-agent": navigator.userAgent, "Accept": "text/html" },
                           onload: function (response)
                           {
                               if (response.status == 200)
                               {
                                   var doc = new DOMParser().parseFromString(response.responseText, "text/html");
                                   try
                                   {
                                       illust.illustURL = doc.getElementsByTagName("img")[0].src;
                                   }
                                   catch (err) { }
                               }
                               finalise();
                           }
                       });
                   }
                   else
                   {
                       var oReq = new XMLHttpRequest();
                       oReq.open("GET", "http://www.pixiv.net/member_illust.php?mode=manga_big&illust_id=" + id + "&page=0", true);
                       oReq.responseType = "text";
                       oReq.timeout = 15000;
                       oReq.onload = function (e)
                       {
                           if (oReq.status == 200)
                           {
                               var doc = new DOMParser().parseFromString(oReq.response, "text/html");
                               try
                               {
                                   illust.illustURL = doc.getElementsByTagName("img")[0].src;
                               }
                               catch (err) { }
                           }

                           finalise();
                       };
                       oReq.send();
                   }
               }
               else finalise(); //Old naming format
           }
       }
   };

/*
===================================================================================================================================
 Handles getting the next page
===================================================================================================================================*/
var Pager =
    {
        nextPageURL: null,
        intervalID: null,
        //Time to wait out before attempting to get the next page
        timeOutLength: 2000,
        pause: false,
        //Event that fires off passing the loaded document
        onPageLoad: null,
        //If true it scraps any currently loading pages
        ageRatingChanged: false,
        requestingPage: false,
        scrollOffset: null,

        /*
        ------------------------------------------------------------------------------
         Initialises the pager.
         - pageLoadEventHandler must be set as it gets called when a new page is
         loaded. It takes (document,nextURL) parameters.
         - scrollOffset function that return the bottom position of the main
         container. Used to calculate when to load next page.
        ------------------------------------------------------------------------------*/
        initalise: function (pageLoadEventHandler, funcScrollOffset)
        {
            this.scrollOffset = funcScrollOffset;
            this.onPageLoad = pageLoadEventHandler;
            this.getNextPageURL(document.body);
            if (this.intervalID) clearInterval(this.intervalID);
            if (this.nextPageURL) this.intervalID = setInterval(this.checkScrollPosition, 500);
            return (this.nextPageURL != null);
        },

        checkScrollPosition: function ()
        {
            if (Pager.ageRatingChanged || !Settings.fetch.nextPage) return;
            if ((Pager.scrollOffset() - window.scrollY - window.innerHeight) < Settings.pagingOffset)
            {
                Pager.getNextPage();
            }
        },

        /*
        ------------------------------------------------------------------------------
         Gets the next page url from an element or full document. Returns null
         if there isn't a next page other the url.
        ------------------------------------------------------------------------------*/
        getNextPageURL: function (xml)
        {
            this.nextPageURL = null;
            var evaluator = new XPathEvaluator(); //document.evaluate
            var btnNext = evaluator.evaluate(".//a[@rel='next' and @class='_button']", xml, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
            if (btnNext) this.nextPageURL = btnNext.href;
            //else btnNext = evaluator.evaluate(".//a[@rel='next' and @class='button']", xml, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
            //if (btnNext) this.nextPageURL = btnNext.href;

            return this.nextPageURL;
        },

        NextPageReceived: function (doc, pageNumber)
        {
            DisplayMessage("Page [" + pageNumber + "] received", 1500);

            if (Pager.onPageLoad) Pager.onPageLoad(doc, Pager.nextPageURL);

            Pager.getNextPageURL(doc.body);
            if (Pager.nextPageURL)
            {
                setTimeout(
                    function ()
                    {
                        Pager.intervalID = setInterval(Pager.checkScrollPosition, 500);
                    }
                    , Pager.timeOutLength);
            }
        },

        /*
        ------------------------------------------------------------------------------
         Gets the next page asynchronously.
        ------------------------------------------------------------------------------*/
        getNextPage: function ()
        {
            Pager.requestingPage = true;

            clearInterval(Pager.intervalID);
            var pageNumber = PaginatorHQ.getPageNumber(this.nextPageURL);
            var msg = DisplayMessage("Requesting page [" + pageNumber + "] ...");

            if (Settings.requestMethod & 2)
            {
                GM_xmlhttpRequest({
                    url: this.nextPageURL,
                    method: "GET",
                    headers: { "User-agent": navigator.userAgent, "Accept": "document" }, //"Accept": "text/html"
                    timeout: 20000,
                    onload: function (response)
                    {
                        Pager.requestingPage = false;
                        //Change age rate, so no need to process return result as new content will be loaded
                        if (Pager.ageRatingChanged) return;
                        if (response.status == 200)
                        {
                            RemoveMessage(msg);
                            var doc = document.implementation.createHTMLDocument("P++");
                            doc.documentElement.innerHTML = response.responseText;

                            //Not supported by Opera
                            //var doc = new DOMParser().parseFromString(response.responseText, "text/html")
                            Pager.NextPageReceived(doc, pageNumber);
                        }
                        else Pager.pageErrorTimeout("ERROR: Page [" + pageNumber + "] failed request", response);
                    },
                    ontimeout: function (response) { RemoveMessage(msg); Pager.pageErrorTimeout("ERROR: Timeout on Page [" + pageNumber + "].", response) },
                    onerror: function (response) { RemoveMessage(msg); Pager.pageErrorTimeout("ERROR: Page [" + pageNumber + "] failed request", response) }
                });
            }
            else
            {
                var oReq = new XMLHttpRequest();
                oReq.open("GET", this.nextPageURL, true);
                oReq.responseType = "document";
                oReq.timeout = 20000;
                oReq.onload = function (e)
                {
                    {
                        Pager.requestingPage = false;
                        //Change age rate, so no need to process return result as new content will be loaded
                        if (Pager.ageRatingChanged) return;
                        if (oReq.status == 200)
                        {
                            RemoveMessage(msg);
                            Pager.NextPageReceived(oReq.response, pageNumber);
                        }
                        else Pager.pageErrorTimeout("ERROR: Page [" + pageNumber + "] failed request", oReq);
                    }
                };
                oReq.ontimeout = function (response) { RemoveMessage(msg); Pager.pageErrorTimeout("ERROR: Timeout on Page [" + pageNumber + "].", response) };
                oReq.onerror = function (response) { RemoveMessage(msg); Pager.pageErrorTimeout("ERROR: Page [" + pageNumber + "] failed request", response) };
                oReq.send();
            }
        },

        pageErrorTimeout: function (msg, response)
        {
            console.error("Failed to get next page: (" + response.status + ") : " + response.statusText);
            DisplayMessage(msg, 5000);
            setTimeout(
                        function ()
                        {
                            Pager.intervalID = setInterval(Pager.checkScrollPosition, 500);
                        }
                        , Pager.timeOutLength);
            Pager.requestingPage = false;
        }
    }

/*
===================================================================================================================================
 PaginatorHQ handles all functions to do with formatting the layout of the results
===================================================================================================================================*/
var PaginatorHQ =
    {
        pageTable: null,
        status: 0,
        styled: false,

        /*
        -------------------------------------------------------------------------------------------
          Prepares current page for pagination
        -------------------------------------------------------------------------------------------*/
        intialise: function ()
        {
            PaginatorHQ.setStyles();
            PaginatorHQ.removeUnwantedElements(document);

            var paged = (Pager.getNextPageURL(document) != null);
            var pageNumber = (paged) ? PaginatorHQ.getPageNumber(document.URL) : 0;
            console.log("Paged Content: ", paged);

            if (!paged) //Either has no pages or it is the last page
            {
                var containers = PaginatorHQ.getContainers(document);
                if (PAGETYPE > 1 && containers) containers[0].setAttribute("name", "pageContainer"); //Done for age rating issues.
                IllustrationLinker.getContainerLinks(containers, pageNumber);
            }
            else
            {
                var paginator = document.getElementsByClassName("column-order-menu");
                while (paginator.length > 1) paginator[1].parentNode.removeChild(paginator[1]);
                paginator = paginator[0];
                paginator.className += " paginator";


                var pageContainer = PaginatorHQ.getContainers(document)[0];
                if (pageContainer.className == "display_works linkStyleWorks") //display_works linkStyleWorks breaks sets UL style
                {
                    //You need to add this otherwise "DIV._unit action-unit" element does not expand and will end up with transparent background.
                    var divider = document.createElement("div");
                    divider.className = "clear";
                    pageContainer.appendChild(divider);

                    pageContainer = pageContainer.firstElementChild;
                }
                else
                {
                    pageContainer.parentElement.insertBefore(paginator, pageContainer);
                    //pageContainer.insertBefore(paginator, pageContainer.firstElementChild);
                }
                pageContainer.style.marginBottom = "0";
                pageContainer.style.marginTop = "0";
                pageContainer.setAttribute("name", "pageContainer");
                pageContainer.setAttribute("page", pageNumber);
                PaginatorHQ.pageTable = pageContainer.parentElement;


                IllustrationLinker.getContainerLinks([pageContainer], pageNumber);
                pageContainer.className += " pppPage" + (pageNumber % 3);
                Pager.initalise(PaginatorHQ.addNewPage, PaginatorHQ.getMainTableBottom);
            }

            PaginatorHQ.updateVisibilityOfAllElements(document);
        },

        /*
       -------------------------------------------------------------------------------------------
         Gets bottom of page table, used to calculate when the next page is going to be loaded
       -------------------------------------------------------------------------------------------*/
        getMainTableBottom: function ()
        {
            var pos = GetAbsolutePosition(PaginatorHQ.pageTable);
            return pos.top + PaginatorHQ.pageTable.offsetHeight;
        },

        addStyle: function (id, textContent)
        {
            var style = document.createElement("style");
            style.type = "text/css";
            style.innerHTML = textContent;
            if (id) style.id = id;
            document.head.appendChild(style);
        },

        setStyles: function ()
        {
            if (PaginatorHQ.styled) return;
            PaginatorHQ.styled = true;
            PaginatorHQ.addStyle(null, '.IQDBLink{font-family:"Times New Roman";background-color: #000000;border-radius: 3px;padding: 2px 3px 1px 3px;color: #66CCFF !important;font-size: x-small;text-decoration: none;}');
            PaginatorHQ.addStyle(null, "#pppMsgBox{position: fixed;z-index: 500;bottom: 30px;left: 10px;padding: 0 20px 0 10px;color: #FF0;background-color: #0000D5;padding-left: 10px;border-style: solid;border-color: #FFF;border: solid;}.pppHotBoxTi, .pppHotBoxTm{position: absolute;top: 0px;left: 0px;z-index: 20;border: 2px solid;}.pppHotBoxTi{background-color: rgba(255,255,0,0.6);border-color: red;width: 16px;height: 16px;}.pppHotBoxTm{background-color: rgba(0,255,255,0.2);border-color: red;width: 30px;height: 30px;}.pppHotBoxI{background-color: rgba(255,255,0,0.6);border: 2px solid rgba(255,0,0,0.6);width: 200px;height: 12px;display: inline-block;}.pppHotBoxTi:visited, .pppHotBoxTm:visited, .pppHotBoxI:visited{border-color: purple;/*background-color: rgba(128,0,128,0.4);*/}.pppPreviewWindow{position: absolute;background-color: #000;}");
            PaginatorHQ.addStyle("pppPaged", ".pppPage1{background-color: yellow;}.pppPage2{background-color: #63FF00;}.pppPage0{background-color: #FF00FC;}.pppThumb1{background-color: #FCFCA8 !important;}.pppThumb2{background-color: #D9FFD9 !important;}.pppThumb0{background-color: #EAD3EF !important;}");
            PaginatorHQ.addStyle("pppPaginator", ".paginator{background-color: white; margin:0; border: ridge;}");
            PaginatorHQ.addStyle("pppVisitedIllusPage", ".image-item > a.work:visited > img { border: 22px solid red; !important}");



            //Used to fix broken artist and bookmarks pages
            PaginatorHQ.addStyle(null, ".pppPage1 > li, .pppPage2 > li, .pppPage0 > li { clear: none; float: none !important; display:inline-block;}");
            PaginatorHQ.addStyle(null, ".paginator li {clear:none;float:none;display:inline:block; width:auto;}");
            PaginatorHQ.addStyle("linkColours", ".pppThumb0 a:link, .pppThumb1 a:link, .pppThumb2 a:link{color:#0507FF;} .pppThumb0 a:visited, .pppThumb1 a:visited, .pppThumb2 a:visited{color:#BCBBB9;}")
        },

        getPageNumber: function (url)
        {
            var pageNumber = url.replace(/.+(&|\?)p=(\d+)$/gi, "$2");
            if (isNaN(pageNumber)) pageNumber = 1;
            return parseInt(pageNumber);
        },

        /*
       -------------------------------------------------------------------------------------------
         Adds new content.
       -------------------------------------------------------------------------------------------*/
        addNewPage: function (doc, url)
        {
            PaginatorHQ.removeUnwantedElements(doc);

            var pageNumber = PaginatorHQ.getPageNumber(url);

            //PageContainer
            var pageContainer = PaginatorHQ.getContainers(doc)[0];
            pageContainer.setAttribute("name", "pageContainer");
            pageContainer.setAttribute("page", pageNumber);
            pageContainer.style.marginBottom = "0";
            pageContainer.style.marginTop = "0";

            //Navigation Bar
            var paginator = doc.getElementsByClassName("column-order-menu")[0];
            paginator.className += " paginator pppPagedChild";
            for (var i = paginator.children.length - 1; child = paginator.children[i], i >= 0; i--)
                if (child.className != "pager-container") paginator.removeChild(child);
            paginator.getElementsByTagName("ul")[0].className = "clear " + paginator.getElementsByTagName("ul")[0].className;
            pageContainer.className += " pppPagedChild pppPage" + (pageNumber % 3);

            //TODO: Readjust painator bars
            //pageContainer.insertBefore(paginator, pageContainer.firstElementChild);
            PaginatorHQ.pageTable.appendChild(paginator);
            PaginatorHQ.pageTable.appendChild(pageContainer);


            //IllustrationLinker.getContainerLinks should always after page is added.
            IllustrationLinker.getContainerLinks([pageContainer], pageNumber);
            PaginatorHQ.updateVisibilityOfAllElements(pageContainer);
            if (Settings.filterSwitchFlag > 0)
            {
                pageContainer.style.display = "none";
                paginator.style.display = "none";
                PaginatorHQ.filterContainer(pageContainer);
            }
        },

        /*
        -----------------------------------------------------------------------------------------
         Returns containers that contain thumbnails. If doc is left out it uses current
         document. This does not return dynamic containers, i.e. containers like recommended
         illustrations whose content are auto-updated by Pixiv.
        -----------------------------------------------------------------------------------------*/
        getContainers: function (doc)
        {
            //console.info("Getting Containers");
            if (!doc) doc = document;
            for (var i = 0; i < containerClasses.Paged.length; i++)
            {
                var nodes = doc.getElementsByClassName(containerClasses.Paged[i]);
                if (nodes.length > 0) return nodes;
            }

            for (var i = 0; i < containerClasses.UnPaged.length; i++)
            {
                var nodes = doc.getElementsByClassName(containerClasses.UnPaged[i]);
                if (nodes.length > 0) return nodes;
            }

            //console.warn("No thumbnail containers");
            return null;
        },

        filterThumbnail: function (thumbnail)
        {
            if (Settings.filterSwitchFlag == 0) return;

            var metadata = IllustrationLinker.getIllust(thumbnail.getAttribute("illustration-id"));
            var filterOut = false;

            if (metadata.pageCount == null) return;

            //Filter using age rating
            filterOut = ((Settings.filterSwitchFlag & 16) == 16 && metadata.R18 == 0) ||
                        ((Settings.filterSwitchFlag & 32) == 32 && metadata.R18 == 1) ||
                        ((Settings.filterSwitchFlag & 64) == 64 && metadata.R18 == 2);


            if (!filterOut && (Settings.filterSwitchFlag & 2) == 2)
            {
                var flag = Settings.filter.flag;
                var values = Settings.filters[Settings.filter.set];
                try
                {
                    if ((flag & 2) == 2 && metadata.pageCount == 0) filterOut = true; //Filtering out Illustrations
                    else if ((flag & 4) == 4 && metadata.pageCount > 0) filterOut = true; //Filtering out Manga
                    else if ((flag & 8) == 8 && metadata.bookmarkCount < values[0]) filterOut = true; //Bookmarks
                    else if ((flag & 16) == 16 && metadata.viewCount < values[1]) filterOut = true; //Views
                    else if ((flag & 32) == 32 && metadata.ratings < values[2]) filterOut = true; //Ratings
                    else if ((flag & 64) == 64 && metadata.totalRatings < values[3]) filterOut = true; //Total
                } catch (e) { };
            }

            if (!filterOut)
            {
                var found;
                var tags = metadata.tags;

                while (tags.indexOf("  ") >= 0) tags = tags.replace("  ", " ");
                tags = tags.split(" ");

                if ((Settings.filterSwitchFlag & 4) == 4)
                {
                    var tagsF = Settings.filter.tagsInclude;
                    while (tagsF.indexOf("  ") >= 0) tagsF = tagsF.replace("  ", " ");
                    tagsF = tagsF.split(" ");

                    tagsF = Settings.filter.tagsInclude.split(" ");

                    found = true;
                    for (var i = 0; i < tagsF.length; i++)
                    {
                        found = false
                        for (var j = 0; j < tags.length; j++)
                        {
                            if (tagsF[i].trim().toLowerCase() == tags[j].trim().toLowerCase())
                            {
                                found = true;
                                break;
                            }
                        }

                        if (!found) break;
                    }

                    filterOut = !found;
                }

                if (!filterOut && (Settings.filterSwitchFlag & 8) == 8)
                {
                    var tagsF = Settings.filter.tagsExclude;
                    while (tagsF.indexOf("  ") >= 0) tagsF = tagsF.replace("  ", " ");
                    tagsF = tagsF.split(" ");

                    found = false;
                    for (var i = 0; i < tagsF.length; i++)
                    {
                        for (var j = 0; j < tags.length; j++)
                        {
                            if (tagsF[i].trim().toLowerCase() == tags[j].trim().toLowerCase())
                            {
                                found = true;
                                break;
                            }
                        }
                        if (found) break;
                    }

                    filterOut = found;
                }
            }

            //Illustration metadata has yet to be retrieved
            if (filterOut)
            {
                PaginatorHQ.filterThumbnailLinks(thumbnail, true);
                thumbnail.style.display = "none";
            }
            else
            {
                PaginatorHQ.filterThumbnailLinks(thumbnail, false);
                thumbnail.style.display = null;
            }
        },

        filterThumbnailLinks: function (thumbnail, remove)
        {
            var links = thumbnail.querySelectorAll(".pppHotBoxTi, .pppDirectLinks > a");
            //var links = thumbnail.querySelectorAll("a");
            if (!links) return;

            for (var i = 0; i < links.length; i++)
            {
                if (remove)
                {
                    if (!links[i].getAttribute("hrefOriginal")) links[i].setAttribute("hrefOriginal", links[i].href);
                    links[i].removeAttribute("href");
                }
                else if (!links[i].href && links[i].getAttribute("hrefOriginal"))
                {
                    links[i].href = links[i].getAttribute("hrefOriginal");
                }
            }
        },


        filterContainer: function (container)
        {
            if (Settings.filterSwitchFlag == 0) return;

            var mainContainer = document.getElementsByName("pageContainer")[0];
            var evaluator = new XPathEvaluator();
            var nodesSnapshot = evaluator.evaluate(".//li[@name='pppThumb']", container, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
            for (var j = 0 ; thumb = nodesSnapshot.snapshotItem(j), j < nodesSnapshot.snapshotLength; j++)
            {
                PaginatorHQ.filterThumbnail(thumb);
                if (thumb.parentElement != mainContainer) mainContainer.appendChild(thumb);
            }

            return nodesSnapshot.snapshotLength;
        },


        /*
       -------------------------------------------------------------------------------------------
        Goes through all thumbnail containers and filters the result accordingly
       -------------------------------------------------------------------------------------------*/
        filterResult: function ()
        {
            if (PaginatorHQ.status == 0)
            {
                PaginatorHQ.status = 1;
                setTimeout(PaginatorHQ.filterResult, 0);
                return true;
            }
            if (PaginatorHQ.status == 2)
            {
                return false;
            }
            PaginatorHQ.status = 2;
            var msg = DisplayMessage("Filtering content (" + Settings.filterSwitchFlag + ")");

            var filtering = (Settings.filterSwitchFlag > 0);

            var containers = document.getElementsByName("pageContainer");
            var paginators = document.getElementsByClassName(" paginator");
            var mainContainer = containers[0];
            var mainContainerPage = mainContainer.getAttribute("page");
            //Parse through page containers and paginators and set visibility according to filter
            for (var i = 1; container = containers[i], i < containers.length; i++)
            {
                containers[i].style.display = (filtering) ? "none" : null;
                paginators[i].style.display = (filtering) ? "none" : null;
            }

            if (filtering) //Displaying all items
            {
                mainContainer.style.backgroundColor = "transparent";
                for (var i = 0; i < containers.length; i++)
                {
                    msg.textContent = ("Filtering Page " + (i + 2) + "/" + containers.length);
                    PaginatorHQ.filterContainer(containers[i]);
                }
            }
            else //Filtering out
            {
                mainContainer.style.backgroundColor = null;
                var evaluator = new XPathEvaluator();
                var nodesSnapshot = evaluator.evaluate(".//li[@name='pppThumb']", mainContainer, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
                for (var i = 0 ; thumb = nodesSnapshot.snapshotItem(i), i < nodesSnapshot.snapshotLength; i++)
                {
                    //msg.textContent = ("Filtering thumbnail " + (i + 1) + "/" + nodesSnapshot.snapshotLength);
                    thumbPage = thumb.getAttribute("page");
                    if (thumbPage > mainContainerPage) containers[thumbPage - mainContainerPage].appendChild(thumb);
                    PaginatorHQ.filterThumbnailLinks(thumb, false);
                    thumb.style.display = null;
                }
            }

            if (filtering)
            {
                DisplayMessage("Filtering completed", 2000);
                // (totalCount - PaginatorHQ.filteredCount) + " (" + totalCount + ")";
            }
            else
            {
                DisplayMessage("Filter disabled", 2000);
            }

            RemoveMessage(msg);
            PaginatorHQ.status = 0;
            PaginatorHQ.displayResultInfo();
            PreviewHQ.adjustAllHotboxPositions();
        },

        getResultCount: function (doc)
        {
            if (!doc) doc = document;

            var evaluator = new XPathEvaluator(); //document.evaluate
            //var result = evaluator.evaluate("//div[@class='column-label' or '_unit manage-unit']/span[@class='count-badge']", doc, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
            var result = evaluator.evaluate("//div[@class='column-label' or @class='_unit manage-unit']/span[@class='count-badge']", doc, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

            if (result) return parseInt(result.textContent);
            else return -1;
        },


        /*
       -------------------------------------------------------------------------------------------
        Displays the amount of thumbnails listed
       -------------------------------------------------------------------------------------------*/
        displayResultInfo: function ()
        {
            if (SideBar.iDoc == null)
            {
                setTimeout(function () { PaginatorHQ.displayResultInfo(); }, 250); //Sidebar has yet to load
                return;
            }

            var thumbs = document.getElementsByName("pppThumb");
            var it = SideBar.iDoc.getElementById("InfoTable");
            var resultCount = PaginatorHQ.getResultCount(); //Number of items returned by search

            var linked = (thumbs.length - IllustrationLinker.processList.length - IllustrationLinker.simultaneousCalls);

            if (resultCount < 0) //We do not know how many pages can be displayed. Might not be paged
            {
                it.rows[0].style.display = "none";
                it.rows[1].style.display = null;

                it.rows[1].cells[1].textContent = linked + " / " + thumbs.length; //Number of images

                if (PAGETYPE > 2) //It is paged. Go figure.
                {
                    var startPage = PaginatorHQ.getPageNumber(document.URL);
                    var pagesLoaded = Math.ceil(thumbs.length / 20);
                    it.rows[0].style.display = null;
                    it.rows[0].cells[1].textContent = pagesLoaded + " (" + startPage + "-" + (startPage + pagesLoaded - 1) + ")";
                }
            }
            else if (thumbs.length == 0 || resultCount == 0)
            {
                it.rows[0].cells[1].textContent = 0;
                it.rows[1].cells[1].textContent = 0;
            }
            else
            {
                var visibleCount = thumbs.length;
                if (Settings.filterSwitchFlag > 0)
                {
                    visibleCount = 0;
                    for (var i = 0; i < thumbs.length; i++)
                    {
                        if (!thumbs[i].style.display) visibleCount++;
                    }
                }

                var pagesLoaded = Math.ceil(thumbs.length / 20);
                var pageS = PaginatorHQ.getPageNumber(document.URL);
                var pageE = pageS + pagesLoaded - 1;
                var pageCount = Math.ceil(resultCount / 20);

                it.rows[0].cells[1].textContent = pagesLoaded + " (" + pageS + "-" + pageE + " | " + pageCount + ")";

                var leftCount = resultCount - ((pageS - 1) * 20)
                if (Settings.filterSwitchFlag > 0) it.rows[1].cells[1].innerHTML = visibleCount + " / " + linked + " | " + thumbs.length + "<br /> (" + leftCount + " | " + resultCount + ")";
                else it.rows[1].cells[1].textContent = linked + " / " + thumbs.length + " (" + leftCount + " | " + resultCount + ")";
            }

            //Adjust frame size to fit info text
            if (SideBar.iDoc.body.clientHeight < SideBar.iDoc.body.scrollHeight) SideBar.adjustFrameSize();
        },

        /*
       -------------------------------------------------------------------------------------------
        Sorts the thumbnails according to filter type
       -------------------------------------------------------------------------------------------*/
        sortByScore: function (sort)
        {
            if (PaginatorHQ.status == 0)
            {
                PaginatorHQ.status = 1;
                setTimeout(PaginatorHQ.sortByScore, 0, sort);
                return true;
            }
            if (PaginatorHQ.status == 2)
            {
                return false;
            }
            PaginatorHQ.status = 2;

            var msg = DisplayMessage("Sorting content");

            var containers = document.getElementsByName("pageContainer");
            var sortType = Settings.sortType;

            //A very bad way of doing sort but it seems efficient. Problem is having items spread over containers
            var evaluator = new XPathEvaluator();
            var nodesSnapshot = evaluator.evaluate(".//li[@name='pppThumb']", PaginatorHQ.pageTable, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
            var arr = new Array();
            for (var i = 0; thumb = nodesSnapshot.snapshotItem(i), i < nodesSnapshot.snapshotLength; i++)
            {
                var value = (sort) ? parseInt(getMetaScore(thumb)[sortType]) : parseInt(thumb.getAttribute("position"));
                arr.push({ "index": i, "value": value });
            }


            //Stores thumbnail metascore and position in an array and then sorts the array and then proceeds to
            //to apply sorted result to the thumbnails
            for (var i = 0 ; i < arr.length; i++)
            {
                for (var j = i + 1 ; j < arr.length; j++)
                {
                    if ((sort && arr[i].value < arr[j].value) || (!sort && arr[i].value > arr[j].value))
                    {
                        var temp = arr[i].value;
                        arr[i].value = arr[j].value;
                        arr[j].value = temp;

                        temp = arr[i].index;
                        arr[i].index = arr[j].index;
                        arr[j].index = temp;
                    }
                }
            }

            //Apply sorted array to thumbnails
            for (var i = 0 ; i < arr.length; i++)
            {
                if (Settings.filterSwitchFlag > 0) container = containers[0]; //Items are all in one container as filter is enabled
                else container = containers[Math.floor(i / 20)];

                container.appendChild(nodesSnapshot.snapshotItem(arr[i].index));
            }

            var evaluator = new XPathEvaluator(); //document.evaluate
            var sortButton = evaluator.evaluate("//a[@name='Sort']", SideBar.iDoc.body, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
            if (sort)
            {
                DisplayMessage("Sorted by " + FilterTypeToString(sortType), 3000);
                sortButton.firstElementChild.style.borderColor = "#0F0";
            }
            else
            {
                DisplayMessage("Removed sorting", 3000);
                sortButton.firstElementChild.style.borderColor = "#000";
            }

            RemoveMessage(msg);
            PaginatorHQ.status = 0;
            PreviewHQ.adjustAllHotboxPositions();

            function getMetaScore(thumbnail)
            {
                var illust = IllustrationLinker.getIllust(thumbnail.getAttribute("illustration-id"))
                return [illust.bookmarkCount, illust.viewCount, illust.ratings, illust.totalRatings];
            }
        },


        updateIQDBLink: function (linksBox)
        {
            var IQDBLink = linksBox.getElementsByClassName("IQDBLink")[0];
            if (Settings.display.IQDBLink)
            {
                var directLinks = linksBox.getElementsByClassName("pppDirectLinks")[0].getElementsByTagName("a");
                IQDBLink.href = "http://" + Settings.IQDBType + ".IQDB.org/?url=" + linksBox.parentElement.getElementsByTagName('IMG')[0].src + "&fullimage=" + directLinks[0].href + "&";
                IQDBLink.style.display = null;
            }
            else
            {
                IQDBLink.removeAttribute("href");
                IQDBLink.style.display = "none";
            }
        },

        updateAllIQDBLinks: function ()
        {
            var linksBoxes = document.getElementsByClassName("pppLinksBox");

            for (var i = 0; i < linksBoxes.length; i++) PaginatorHQ.updateIQDBLink(linksBoxes[i]);
        },

        /*
            Set display information for thumbnails
        ----------------------------------------------------------------------------------------*/
        updateVisibilityOfElement: function (thumbnail)
        {
            var el = thumbnail.getElementsByClassName("title2")[0];
            if (el) el.style.display = (Settings.display.illustTitle) ? null : "none";
            else if (PAGETYPE == 1 || PAGETYPE == 3 || PAGETYPE == 4 || PAGETYPE == 5) //Bookmark page
            {
                var el = thumbnail.getElementsByTagName("H1")[0];
                if (el) el.style.display = (Settings.display.illustTitle) ? null : "none";
            }

            el = thumbnail.getElementsByClassName("user")[0];
            if (el) el.style.display = (Settings.display.artistName) ? "block" : "none";

            el = thumbnail.getElementsByClassName("count-list")[0];
            if (el) el.style.display = (Settings.display.countList) ? null : "none";


            var links = thumbnail.getElementsByClassName("pppDirectLinks")[0];
            if (links)
            {
                if (links.getElementsByTagName("a").length == 1) links.style.display = (Settings.display.illustLink) ? null : "none";
                else links.style.display = (Settings.display.mangaLinks) ? null : "none";
            }
        },

        /*
        ----------------------------------------------------------------------------------------
         Clean's up the thumbnail and adds any missing information. It gets called by the
         IllustrationLinker.createLinkBox function when the metadata has been recieved.
        ----------------------------------------------------------------------------------------*/
        tidyThumbnail: function (id)
        {
            var thumbnail = document.getElementById("i" + id),
                link = thumbnail.getElementsByTagName("a")[0],
                metadata = IllustrationLinker.getIllust(id);
            //We clean up here. Removing anything we do not desire or wanting to recreate
            //var el = thumbnail.getElementsByClassName("count-list");
            //if (el.length == 1) thumbnail.removeChild(el[0]);
            //var el = thumbnail.getElementsByClassName("f10");
            //if (el.length == 1) thumbnail.removeChild(el[0]);
            //el = thumbnail.getElementsByClassName("bookmark_artist");
            //if (el.length == 1) thumbnail.removeChild(el[0]);
            TSL.removeNode(thumbnail.querySelector(".count-list"));
            TSL.removeNode(thumbnail.querySelector(".f10"));
            TSL.removeNode(thumbnail.querySelector(".bookmark_artist"));
            TSL.removeNode(thumbnail.querySelector("h1.title"));

            //Cleans image link by first removing any unwanted text. This is the case in Bookmarks.
            var brs = thumbnail.getElementsByTagName("br");
            while (brs.length > 0) brs[0].parentElement.removeChild(brs[0]);


            if (link.getElementsByClassName("title2").length == 0)
            {
                link.innerHTML = link.innerHTML.replace(/(<img[^>]*>).*/gi, "$1");
                link.style.display = "block";
                var h1 = document.createElement("h1");
                h1.className = "title2";
                h1.textContent = metadata.illustTitle;
                link.appendChild(h1);
            }

            if (thumbnail.getElementsByClassName("user").length == 0)
            {
                var el = thumbnail.getElementsByClassName("f10");
                if (el.length == 1) thumbnail.removeChild(el[0]);
                el = thumbnail.getElementsByClassName("bookmark_artist");
                if (el.length == 1) thumbnail.removeChild(el[0]);

                var a = document.createElement("a");
                a.className = "user";
                a.textContent = metadata.userName;
                a.href = "http://www.pixiv.net/member.php?id=" + metadata.userID;
                thumbnail.insertBefore(a, link.nextElementSibling);
            }

            var ul = document.createElement("ul");
            ul.className = "count-list";
            ul.innerHTML = '<a href="/bookmark_detail.php?illust_id=' + metadata.illustID + '" class="bookmark-count ui-tooltip" data-tooltip="Received ' + metadata.bookmarkCount + ' bookmarks"><i class="_icon sprites-bookmark-badge"></i>' + metadata.bookmarkCount + '</a>'
                    + '<a href="/response.php?type=illust&amp;id=' + metadata.illustID + '" class="image-response-count ui-tooltip" data-tooltip="Received ' + metadata.responseCount + ' image responses"><i class="_icon sprites-image-response-badge"></i>' + metadata.responseCount + '</a>';
            thumbnail.appendChild(ul);

            //<ul class="count-list"><li><a href="/bookmark_detail.php?illust_id=33473196" class="bookmark-count ui-tooltip" data-tooltip="Received 31 bookmarks"><i class="_icon sprites-bookmark-badge"></i>31</a></li><li><a href="/response.php?type=illust&amp;id=33473196" class="image-response-count ui-tooltip" data-tooltip="Received 1 image responses"><i class="_icon sprites-image-response-badge"></i>1</a></li></ul>
            PaginatorHQ.updateVisibilityOfElement(thumbnail);
        },

        /*
        ----------------------------------------------------------------------------------------
         Sets the visibility of the elements according to sidebar settings.
        ----------------------------------------------------------------------------------------*/
        updateVisibilityOfAllElements: function (container)
        {
            if (!container) container = document;

            var evaluator = new XPathEvaluator();
            var nodesSnapshot = evaluator.evaluate(".//li[@name='pppThumb']", container, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
            for (var i = 0 ; thumb = nodesSnapshot.snapshotItem(i), i < nodesSnapshot.snapshotLength; i++)
            {
                PaginatorHQ.updateVisibilityOfElement(nodesSnapshot.snapshotItem(i));
            }
            PreviewHQ.adjustAllHotboxPositions(document);
        },

        removeUnwantedElements: function (doc)
        {
            var classes = ["popular-introduction", "user-ad-container"];
            var ids = ["header-banner"];

            for (var i = 0; i < classes.length; i++)
            {
                var els = doc.getElementsByClassName(classes[i]);
                while (els.length > 0) els[0].parentNode.removeChild(els[0]);
            }

            for (var i = 0; i < ids.length; i++)
            {
                var el = doc.getElementById(ids[i]);
                if (el) el.parentNode.removeChild(el);
            }
        }
    };

/*
===================================================================================================================================
 Handles the preview dialog window
===================================================================================================================================*/
var PreviewHQ =
{
    interval: null,
    intervalImageLoadCheck: null,
    delay: new Object(),

    /*
    -------------------------------------------------------------------------------------------
     Creates hotbox and it's event handlers
    -------------------------------------------------------------------------------------------*/
    createHotBox: function (id)
    {
        var metadata = IllustrationLinker.getIllust(id);

        var hotbox = document.createElement("a");
        hotbox.name = "HotBox";

        document.getElementById("i" + id).querySelector("a").appendChild(hotbox);
        if (metadata.illustType != 2)
        {
            hotbox.className = "pppHotBoxTi";
            hotbox.href = metadata.illustURL;
        }
        else
        {
            hotbox.className += "pppHotBoxTm";
            hotbox.href = "http://www.pixiv.net/member_illust.php?mode=manga&illust_id=" + metadata.illustID; //DirectLink to Manga Page Viewer
        }
        PreviewHQ.adjustHotboxPosition(hotbox);

        hotbox.onmouseenter = function ()
        {
            if (PreviewHQ.delay.iID != metadata.illustID)
            {
                PreviewHQ.delay.tID = setTimeout(function ()
                {
                    //PreviewHQ.delay = new object();
                    PreviewHQ.onMouseOverHBShowPreview(hotbox);
                }, 250);
            }

            if (PreviewHQ.interval)
            {
                clearTimeout(PreviewHQ.interval);
                PreviewHQ.interval = null;
            }
        }
        hotbox.onmouseout = PreviewHQ.onMouseOut;
    },

    /*
    -------------------------------------------------------------------------------------------
     Adjust hotbox position. Called often because images sometimes not loaded, or when elements
     are removed the hotbox position goes out of whack.
    -------------------------------------------------------------------------------------------*/
    adjustHotboxPosition: function (hotbox)
    {
        //If image is not loaded you might need to readjust position.
        //var img = hotbox.parentElement.getElementsByTagName("img")[0];
        var img = hotbox.parentElement.getElementsByClassName("_layout-thumbnail")[0];
        //hotbox.style.left = (img.offsetLeft + 2) + "px";
        //hotbox.style.top = (img.offsetTop + 2) + "px";
        hotbox.style.left = img.offsetLeft + "px";
        hotbox.style.top = img.offsetTop + "px";
    },

    /*
    -------------------------------------------------------------------------------------------
     Parses through all hotboxes and adjusts them
    ------------------------------------------------------------------------------------------*/
    adjustAllHotboxPositions: function (container)
    {
        clearInterval(PreviewHQ.cid);
        var hotboxes = document.getElementsByName("HotBox");
        var i = 0;
        PreviewHQ.cid = setInterval(AP, 0);

        function AP()
        {
            if (i > hotboxes.length) clearInterval(PreviewHQ.cid);
            PreviewHQ.adjustHotboxPosition(hotboxes[i]);
            i++
        }
    },

    /*
    -------------------------------------------------------------------------------------------
     Loads preview window when mouse hovers over hotbox
    ------------------------------------------------------------------------------------------*/
    onMouseOverHBShowPreview: function (hotbox)
    {
        //var hotbox = e.target;
        var pThumb = hotbox.parentElement.parentElement;
        var imageID = pThumb.getAttribute("illustration-id");
        var metadata = IllustrationLinker.getIllust(imageID);

        var previewWindow = document.getElementById("previewWindow");
        if (previewWindow && previewWindow.getAttribute("illustration-id") == imageID) return;
        else if (previewWindow) document.body.removeChild(previewWindow);

        if (PreviewHQ.intervalImageLoadCheck) clearInterval(PreviewHQ.intervalImageLoadCheck);
        PreviewHQ.intervalImageLoadCheck = null;

        previewWindow = document.createElement("div");
        previewWindow.id = "previewWindow";
        document.body.appendChild(previewWindow);
        previewWindow.setAttribute("illustration-id", imageID);


        previewWindow.onmouseout = PreviewHQ.onMouseOut;
        previewWindow.onmouseover = function ()
        {
            if (PreviewHQ.interval)
            {
                clearTimeout(PreviewHQ.interval);
                PreviewHQ.interval = null;
            }
        };

        var metascore = [metadata.bookmarkCount, metadata.viewCount, metadata.ratings, metadata.totalRatings, metadata.responseCount];

        var metaname = ["★", "Views", "Rating", "Total", "Response"];
        var data = document.createElement("div");
        data.className = "pwMetadata";

        var info = document.createElement("div");
        var a = document.createElement("a");
        a.href = "http://www.pixiv.net/member.php?id=" + metadata.userID
        //if (metadata.userProfileImageURL.indexOf("http://") == 0) a.innerHTML = "<img src='" + metadata.userProfileImageURL + "' / >";
        a.innerHTML = '<img alt="" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABW0lEQVR42mNkwAECAoNZGBkYVgKZCv8ZGFw2rF/7Hps6RmyCvn7+TIwMjIuAstFggf8MJ/4z/HfZvGnjV6IM8Pb2nQakMtGE9wBN8tm6dctPvAZ4eHh1AAXLsRkM9Mo6IBm+Y8f2P1gNcHN1rwBS7Qz4wYL///8n796z6x+KAc5OzkAnM05jIAr8n7h3394CuAEO9g7AwGJcjCtMcBjScODggUZGWxtbb6C+DUARFuI1ww3JZrSxslEEsuSB/nIH0hVE6lzAyMi4EEi/gTvZwsw8AUjNJ9KAxhOnTjagBKKpsQlJBpw+ewbVACMDQxQDGEHhwshwEeJVoBcZ/icgG3DuwnlUAwx09dBdkHjh8qUFUDkHILUf2QCgHKoBulraGAZcvnZ1AVQOwwCgHKoBWuoaGAZcu3ljAVQOwwCgHKoB6iqqIEW7gJgVZsDNO7cXIMnBDPgPlQNFIwMAOj56D6356V8AAAAASUVORK5CYII=" />';
        info.appendChild(a);

        a = document.createElement("a");
        a.style.color = "#00FD00";
        a.href = "http://www.pixiv.net/member_illust.php?id=" + metadata.userID;
        a.textContent = metadata.userName;
        info.appendChild(a);

        a = document.createElement("a");
        a.style.marginRight = "10px";
        a.style.color = "#00FD00";
        a.textContent = metadata.illustTitle;
        if (metadata.pageCount > 1) a.href = "http://www.pixiv.net/member_illust.php?mode=manga&illust_id=" + metadata.illustID;
        else a.href = "http://www.pixiv.net/member_illust.php?mode=medium&illust_id=" + metadata.illustID + "#SKIP";
        info.innerHTML = a.outerHTML + "(" + info.innerHTML + ")";
        data.appendChild(info);

        var IQDBPrefix = "http://" + Settings.IQDBType + ".IQDB.org/?url=";
        //Different informational links
        //http://www.pixiv.net/bookmark_detail.php?illust_id=34470652
        //http://www.pixiv.net/response.php?type=illust&id=34470652
        //http://www.pixiv.net/member_illust.php?id=68447

        var links;
        links = pThumb.getElementsByClassName("pppDirectLinks")[0].getElementsByTagName("a");


        if (metadata.pageCount > 1) data.innerHTML = "<a class='bookmark-count' style='background-color:#81FF00;'>P" + metadata.pageCount + "</a>";

        data.innerHTML += "<a class='bookmark-count' style='background-color:#FFFD00;' href='http://" + Settings.IQDBType + ".IQDB.org/?url=" + ((metadata.illustType == 3) ? metadata.illust480URL : metadata.illust150URL) + "&NULL'>IQDB<a>";

        data.setAttribute("style", "padding: 2px 5px 2px 5px; text-decoration: none; color: #FFF; font-weight:bold;");

        data.innerHTML += '<a href="/response.php?type=illust&amp;id=' + imageID + '" class="image-response-count ui-tooltip" data-tooltip="Received ' + metascore[4] + ' image responses"><i class="_icon sprites-image-response-badge"></i>' + metascore[4] + '</a>';
        data.innerHTML += '<a href="/bookmark_detail.php?illust_id=' + imageID + '" class="bookmark-count ui-tooltip" data-tooltip="Received ' + metascore[0] + ' bookmarks"><i class="_icon sprites-bookmark-badge"></i>' + metascore[0] + '</a>';

        for (var i = 1; i < 4; i++) data.innerHTML += "<span class='bookmark-count' style='background-color:#FDFDFB;'>" + metaname[i] + " " + metascore[i] + "</span>";

        previewWindow.setAttribute("style", "position: absolute; z-index: 1000; background-color:#000;border: 5px ridge #565757; max-width: 95%;");

        if (metadata.illustType == 2 && metadata.pageCount > 1) //Manga
        {
            TSL.addStyle("MangaPreview", "#ThumbContainer{top: 0; left: 0; overflow: auto; white-space: nowrap; max-width: 100%; width: 100%;}"
                + "#ThumbContainer > a > img {border: 2px ridge #FFF; max-width: 128px;}");

            var thumbContainer = document.createElement("div");
            thumbContainer.id = "ThumbContainer";

            thumbContainer.setAttribute("style", "");
            for (var i = 0; i < links.length; i++)
            {
                var link = document.createElement("a");
                var thumbnail = document.createElement("img");

                thumbnail.setAttribute("style", "border: 2px ridge #FFF;");
                thumbnail.setAttribute("style", "border: 2px ridge #FFF; max-width: 128px;");
                thumbnail.src = metadata.illust150URL.replace(/_p\d+/, "_p" + i);

                thumbnail.alt = "Page #" + i;
                link.href = links[i].href;
                link.appendChild(thumbnail);
                thumbContainer.appendChild(link);
                thumbnail.onload = (function ()
                {
                    setTimeout(function ()
                    {
                        PreviewHQ.adjustPreviewWindow(previewWindow, hotbox);
                    }, 1000);
                })();
            }
            previewWindow.appendChild(thumbContainer);
        }
        else
        {
            var prethumb = document.createElement("div");
            var link = document.createElement("a");
            link.href = links[0].href;

            var preImg = document.createElement("img");
            preImg.setAttribute("style", "margin: auto auto; height: " + Settings.preview.height + "px;text-align:center;");

            var imgsrc = (Settings.preview.height > 450) ? metadata.illust600URL : metadata.illust480URL;
            var topOffSet = 0;
            if (Settings.display.autoPreview)
            {
                preImg.src = imgsrc;
                prethumb.setAttribute("style", "height: " + Settings.preview.height + "px;text-align:center;");
                preImg.alt = "Loading image";
            }
            else
            {
                preImg.alt = "Click to load image";
                prethumb.setAttribute("style", "text-align:center;");
                topOffSet = 100;
                preImg.onclick = function ()
                {
                    preImg.onclick = null;
                    preImg.onmouseover = null;
                    preImg.alt = "Loading image";
                    preImg.src = imgsrc;
                    prethumb.setAttribute("style", "height: " + Settings.preview.height + "px;text-align:center;");
                    PreviewHQ.adjustPreviewWindow(previewWindow, hotbox, topOffSet);
                    return false;
                };
            }

            PreviewHQ.intervalImageLoadCheck = setInterval(function ()
            {
                if (preImg.naturalWidth > 0)
                {
                    clearInterval(PreviewHQ.intervalImageLoadCheck); PreviewHQ.intervalImageLoadCheck = null;
                    PreviewHQ.adjustPreviewWindow(previewWindow, hotbox, topOffSet);
                    //console.log(preImg.width, 'x', preImg.height);
                }
            }, 0);

            //if (preImg.offsetWidth == 0) preImg.onload = function () { preImg.onload = null; };
            //PreviewHQ.adjustPreviewWindow(previewWindow, hotbox, 65);

            link.appendChild(preImg);
            prethumb.appendChild(link)
            previewWindow.appendChild(prethumb);
        }

        previewWindow.appendChild(data);
        PreviewHQ.adjustPreviewWindow(previewWindow, hotbox);
    },

    onMouseOut: function (e)
    {
        //Clear preview timeout so it does not display if hover is too short
        clearTimeout(PreviewHQ.delay.tID);
        PreviewHQ.delay = new Object();

        PreviewHQ.interval = setTimeout(function ()
        {
            if (PreviewHQ.intervalImageLoadCheck) clearInterval(PreviewHQ.intervalImageLoadCheck); PreviewHQ.intervalImageLoadCheck = null;
            var previewWindow = document.getElementById("previewWindow");
            //if (previewWindow.getElementsByTagName("img")[0]) previewWindow.getElementsByTagName("img")[0].onload = null;
            if (previewWindow) document.body.removeChild(previewWindow);
            PreviewHQ.interval = null;
        }, Settings.preview.timeLength);
    },

    adjustPreviewWindow: function (previewWindow, hotbox, topOffset)
    {
        if (previewWindow.offsetWidth == 0) return; //PreviewWindow unloaded. Setting onload to null in onMouseOut does not work.
        if (!topOffset) topOffset = 0;
        var offset = GetAbsolutePosition(hotbox);

        //TODO: adjustPreviewWindow: Change it to take into account top scroll-space, so it should not always choose bottom preview by default.
        //console.log(hotbox.getClientRects()[0].top, offset.top, previewWindow.offsetHeight, offset.top - previewWindow.offsetHeight)
        previewWindow.style.top = (offset.top - previewWindow.offsetHeight + 2) + "px";
        if ((previewWindow.getClientRects()[0].top) < 0)
        {
            previewWindow.style.top = (offset.top + hotbox.offsetHeight - topOffset + 4) + "px";
            var data = previewWindow.getElementsByClassName("pwMetadata")[0];
            if (data != previewWindow.firstElementChild) previewWindow.insertBefore(data, previewWindow.firstElementChild);
        }

        previewWindow.style.left = 0 + "px"; //You do this to stop the wrapping that occurs with the metadata on the right most thumbnails
        previewWindow.style.left = (offset.left - (previewWindow.offsetWidth / 2) + Math.round(hotbox.offsetWidth / 2)) + "px";
        var right = previewWindow.getClientRects()[0].right;
        if (right > document.body.clientWidth) previewWindow.style.left = (document.body.clientWidth - previewWindow.offsetWidth - 10) + "px";
        var left = previewWindow.getClientRects()[0].left;
        if (left < 0) previewWindow.style.left = "0px";
    }
}


/*
===================================================================================================================================
 Handles all events and functions to do with the sidebar
===================================================================================================================================*/
var SideBar =
{
    iframe: null,
    sidebar: null,
    iDoc: null,
    interval: null,
    scrollWidth: (function getScrollBarWidth()
    {
        var inner = document.createElement('p');
        inner.style.width = "100%";
        inner.style.height = "200px";

        var outer = document.createElement('div');
        outer.style.position = "absolute";
        outer.style.top = "0px";
        outer.style.left = "0px";
        outer.style.visibility = "hidden";
        outer.style.width = "200px";
        outer.style.height = "150px";
        outer.style.overflow = "hidden";
        outer.appendChild(inner);

        document.body.appendChild(outer);
        var w1 = inner.offsetWidth;
        outer.style.overflow = 'scroll';
        var w2 = inner.offsetWidth;
        if (w1 == w2) w2 = outer.clientWidth;

        document.body.removeChild(outer);

        return (w1 - w2);
    })(),

    addStyle: function (id, styleScript)
    {
        var style = SideBar.iDoc.createElement("style");
        style.type = "text/css";
        style.innerHTML = styleScript;
        if (id) style.id = id;

        SideBar.iDoc.head.appendChild(style);
    },

    initalise: function ()
    {
        if (PAGETYPE < 1) return;
        var img = document.createElement("img");
        img.setAttribute("style", "position:fixed; z-index: 100; top: 15px; left: 10px;");
        img.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAANi0lEQVR42tWaC5AU1RWG/9s9753ZnVnYZZdFWJ4FimKp4SGIIRISFDUCxqAU8VEqWj4SY0oEFF8golFLg6iUxsgqiaEkqwYTFUtiaUQloKjIIggIuMuy78e8++bcvn27e2Z2EVOVMt6tmZ7pme4+3zn/OffcnmXIGz948mA0VqXPjQXY+UFdO9XDEGO0X6MnJh6wHvRGbp19Ymiw3nC5Vfu5+cTt19z6hIs/rvbBfm1Y24yBlqTBt9BTbZORrdl8TlWr217mfnPmy1/PqfR5HiwOoKI9ZSCe5coOCWCDMBeI3Ce+aMMoAAtU2s7tK9oG92C4AlIA4vigzlDsZWg3UF/fmb1p44yKtQUAZ7zccOvQInZPYyKrdWa4ZSyzDOfmVrP2uQ11w8kTOp/bRuddLcdw9T7P8+JYw37PzG2Y5FAW1Iy6Dix++9zye+1TTqw9OGdQyFNzoDujGVwYwE1DdZd0FAAhmZ+7Dc+RlqUbJZD8oQxW8jFsIJYTGUN85oIyH/SagoGqkG7s78rM3XRe1Vo2bl1DtDzEd7SmshXkeGEeGcYtTwsILgHc+6H0zwsBmAVxNABXdPINNw1WEeCwAbPc2a+T56Jerb6hm41iY2vqrouWRB4lAFsyuqU9RzZWFOz9LM9gBwQozINCAGmpaTzQO4CKhmW8jAQ3YWI+DS1tHdezSS8dej2RMqZq1kV1ZmlfvXclqtS3FQklaxMmD4A5EegpFraEOLcgmPXa8biSUT6A+F7WOqHfp7/Bxr5woDkDHtM0R/OaBaF0riDsBLUABUg+BFwguXXCFj5UbZNeZzml1A3AwXONhxMB8d7LWAsbs3Y/13RmJ63ytu4CcMuIQUoLcCSWazTPc3cPLHmxUXlh5Eipd++rpOZEwo6v2ce9Ho0SQyWqEwXd9ngPUVCe5zKZwfO0zHmOt3MYlDOsksxdrCrB7erjzgNXaRWPNM1ybOSafdzn1SztF0JolsG5UYAqmLah4uTckKCDIjqGFuuoLNIQ82vw04Hiwp1pjsPxLPa0Z/F5Swbd5E5NOE6T13DPE0ZeRFRZVY8s7UylCWDEH/dyP2W0KaG8ySpn8oKr7qvwGuIhE3psuQ9Tqnw4pdyLiDfX49y1VSNJx245nEbtnji2NmXgoZNruoxKTi5Yuneiwe2SmqRugQ17RgFIyeR73ymhzNa3GWI6Cx2GcwcHMXtYCH0DspK0JzLY/FU7th7qxO6mBBq60kjSd4Mk0wHFXoypDGPqsBgGRv2WhBi2Nqbx0LYOHOo2oOtyH5iT1ArAmdQkRDJFOTDk6b084NcK5QN3K2F5Uxxo4U8b6MfVJ4ZR6peGH2hL4JktDXhzbxfSHj88/gB0r4+8qtm6yGYNZJIJZONdOGtgEDdOrEIs6DENjmcZln7QjnfrUxJCl1c1CuYDbkmIACiMrPopioBfy5GPu/KoRo3TUQYdVR7QsWhsCUnFQ+/NiowumgR/uqYOWlExfIGAaYCayZW2VWIL2WXpKRVPIprtwMPTB6E6JqPBmY7F/2rDO18TBPU9TENOhcpPYhPguNV7eICMKgBQJdJKToP6jMn9/bhjQhQBjTxJ3tRlPUU7nWh6bROC5AiPMF5T0mM5eWC3B/SUIWekCTySbMOzM6vtSKS4hstea8YBynDNqix2Y+cyXsAkklmw/o/v4cGg7pROd+Laxhu47PgI5o8Jk/Yz2HawE+/u68C1p1faAGfXNiMYIAAPs9vtozVzIpoCIklGTIwmsXzaAHtS3NZk4No3m0iCJGqNFeaCkBDtTSQoAv1W7TYBdHt2lRDMupow/jenRHHxiABpOIN/HyDDNxzEjNGVWHx6iQPwUosJoOSDXgBsCFNKohTSozuOP0yLYWR5SEJQbZ2/sRUfNaehUfJzltteK5C4AOizcjcPhXSrjWCu+UDqXicvrT87hsqwjkPtKfz8hb3o8pVg9vAgFk0otgF+QhEI+XXIWR29dnNOKy2NElFI0fEzB3DcfHqZ3aVu2JfBHe+3ySgwd1fqgHTTnMKivyeAoCYjYLUQKhLiW1maLMYWdePxGQOx7O16rNtPFYs8NGuoHwvHRWyAH9e2EICMgAi7WqEVGu9aVlr5kKZrDPBksPb8fnbFO5KkSvfiEXioVouKxF0TmWonuilPWNEju3g45LGbNt1VhUQOmFqlirF8fBA7u3x4bmfcNGzm4AAWjXcAzlrfLAE8Wk5bnS+d/CiYACRTLZXBxgvL4LPKp3DSxBeOIC7Oo7vzwIoCbbsEgO/hOh4p8pjSsWWEXBmJSSuQaIehUen0F5kWXFDtx2IXwJQXRRLrZhWyPc96sB65vY9ZkajCZSiZN87qg2K/Zh8qZNmQ5BKAwa7/Yi4Q204BoD1Yx8ME4LGSV3dPaGYUpMuYYa3MRL2mo2cSwG0THIDJ65wqBMYKvK9M5i4KCQAzDzjJ6K3ZpQh5rAjQOaasO4LGjIiATGQRAeV9IaOOrgxd54GdPBAmANrhsdYEKpHN1sK6nmZ5Rclq1iAfbncBTFp3bBHI77QFgJBQlC78+gWlVqsubqdwnFzTCMOnOxEA7LWAWP52mgArdnItLMuo1zLeY1Uje1EPZ5VmJh55a3a1jya1sAXAMf4vlAMBOZExrWf/uz0PqyHMCgBqyn7Y34dHfhi282N7Qxw/e7UTnoBu50DWAhBREADxTgGwfCdHRDcPEhAigh4oOUmjnclNZpKoTBcO9uEuBUBN1Wl/bkGRPZHhqEMVI9OTGVlGH50SxdQBlv7pBPe+cwRPfkHXFh2jzmz5CMMz1utsJ+UAlu7goC5RhZsxx3gbBE53qkrrRQSwdKKUUBsZcMqfqIwGRQS0YwIwrNlYlNARtHaoPa+U5Cl7q/YEzc7PH0KbNwTNK3MqY0dAQpgn6UiTRfd8JgGU9QUgMhdsOYmqQbPnJQSwbKIjoZPWNpk5IMqopjnGFszJqpcxq48BL7n2lZn9MDiUto9Z+MYhPLXfSx2tlI/BpNdVG2GfsF0A3PkpR0kegCsJ1RpYyYgJCZFm5w3xYfkkB2DUmib4SUJerwRw3+DKNZ6juv4gyhsPY/vw0Vh9bn+M62tQm5I1pbP+k2ZcvakTRriInAGM/3IHzfwBbD1uSOHa0wRY8gkB+PIMd9/gyYURETAoAlcQwH1nSACKOM5Z34ZP2tJmDoguVbTCzFVODUgXiqRdvepOjN21Hf5/rkH0pEEUiYz53b+S8ddsbEYqTD0WOSKSjuODW+ahpbQME5asKpwJWwXA4u0cUZ9rte02POemp2MJReCKYQQwOWInXVE4jB1NWbz2ZTc2H4rj8+YU6mmiSWRktSF7cFzEgzMGBHHZ7QsQ3bIV0U2roZ8wjNYTBpa9eRBP7kiCR6LyyxTySKIbHy6Yi9ZYGcYteSJ3CjcBUmTWQheAOwJuw5mLwLwdwHE5Aaw4UwIkyci3drVh8vAookV+6od080G9Ii0nZanUGw7D29pqervpyruR/rgORSsX4LNQOR55rxH/6Dsc6XAEjJJ2dOMB+I0MIt1deHzlEnTTQunK+beZ1+rwUUvTp8IFsIAAYt5eDM9rapgTgcuH+bFiilWFqK0den8dIp40Tu0fwLiBYYyuCGJwqR/9Ij4EyaOJ6dcgu21nL3WJ4arLF2HTqJMxuKMJf79rPnprxTNeP05Y9pyMhimh337MUeorNDQfRsnJXMvRAmeEH/f/qNgC4Bi6sh7mKl80+hlqJdNUVTL0EMtOutjC9zZg1OGvzPOe+PUeBJNx1FVWozVYBIOidfcFV+KL8v6I0v7f1TwEXyoBP0VrzL6d1IPp2FI90kRqLS7F9b+4QdrVIgBu/ogi0EMO5Buu9ompMCUAArh/qgtgVQNAZRR63o8ARp4LiXHNU5TEX36Ki29cgS1VQ3Kj7bqzF6HF/4e3/xKtUcqBWx8rrEItQkI3bbMAetG9e585nxtmBC4dGcAD06JSiiShYY8RAE1kZgKqVkJdCK5z0FjzxB0Yu4cAfmUB2IPnGGkC3HEpAfTFuFtWOZ+r7zQn6ZS/3ioBesqBfO8Lb9LMOanSj7sml+CkMmYFheGxrUnc934rEjlr0p7Hwlefx6RdH2P+vJuxn4yzewvXxrz7TBJ8/umlaIrEcNVFNxQ6xQS4kQD6+Jyd7oqTX5kMKZ9bTgthZImcfOTXqBH0+3Dn5jh2d3OYDdU3tBMFOdrTDWFeCJXzoinVA4B75MOICIhGpLtT3BaTQCpKwmgqgwh4c380+6bR0w8HvRmdL0cT4IYtHH0DvVWtwuFuyt1DYxLCfc/9WEePt+P50W0SAEcStLlmczP6hWPfymO2Dq0rOD/N5MruWI0+Zu/lHdLQ2UIzyDuvo1/JVLv8fV+GUEFD2xsMF794HaqGPgpaVv43jvhOhvA1rcZwcPf1DPNejiJQvAMVfSu+tXa/qyHysP5IPRLto6Ru5m2Yg0hJDcqi3w+ExlYDHW1z8ezZax3hX/K3W1EcuQdlpfIHM/5/pidRIEQX0NhsoL1jMZ47x/lXA3vMfWUONN+DiIUrEA5RW+DFNy5w/9dDOFI0hp3d1Pt01sNI3YSaGYX/7GGPWRuiCGXngrPzKRKnEkDsOwZoIc9voRV/LeKeGqybnvPvNv8BnlQbx8ePPhYAAAAASUVORK5CYII="
        document.body.appendChild(img);
        img.onmouseover = function () { img.style.cursor = "pointer"; };
        img.onmousedown = function ()
        {
            SideBar.iframe.style.visibility = null;
            SideBar.adjustFrameSize();
            document.getElementById("wrapper").style.margin = "10px 20px 0px auto";
            Settings.display.sidebar = true;
            Settings.saveSettings();
        };

        var iframe = document.createElement("iframe");
        iframe.onload = function ()
        {
            var iDoc = iframe.contentDocument || iframe.contentWindow.document;

            iDoc.head.innerHTML = '<meta charset="utf-8" />';

            iDoc.body.innerHTML = '<section id="PSideBar" style="min-width: 130px;"><div style="text-align: right; margin: 2px 5px 0 0; padding: 0;"><span style="float: left; display: inline-block; margin-left: 5px;"><a name="nextPage" href="#" title="Paging" class="buttonR buttonOn"><span></span></a><a name="metadata" href="#" title="Illustartion Linker" class="buttonG buttonOn"><span></span></a></span><a href="#" id="SidebarClose"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAADpklEQVR42m2U2UuUURjG329Gx3XcNXcll3EZ9UK9rQgsy5soo5v8C9wSR4zIGyHoJosR6b4uCokiiMirwi4S1EhxwxFRxwUV3JfR2XqeU98wmQdeZr7zfed3nvd9zns0OWe0tLSYIyIi0n0+X7nJZKo0Go0ZmPZ7vV7n6enpsMFgmDw+Pl612+2HZ9dqwQ+NjY1GfFyckJDQkJmZeTsrK+tiSkqKwWw2q/f7+/uysbHhdTqds8vLy/1bW1tvsKmjr6/P9x+wqanJFBIScj03N7etoqLiSlpamoZn0bR/9hS/3y8ej0fW1tZ8Y2NjXxYWFp673e5vgHoCQCoLDQ29WVRU1F1eXl4WFxdHpQp2HpABZbKzs+MZHx8fnpmZ6QL0K5Wqr5ubm605OTn2qqqqS7GxsSiZUYEIZQQPgnQgle7u7npGR0c/Ly4u2np7ex0aYOaYmJjHlZWVHXqaMEJQR7Vob28vAONGUC9HR0dqnkAYxfS9IyMjXajxC629vd0C0CfULT88PFwtglpJTU0VpMGPZXt7W7gR5xITE+Xk5ESgSM0T6nK5BKn/XF1dvaO1tbXdLSkpeQtHDVRGYGlpqVLIwcWERkVFKRhLQVXz8/Oyvr6ugNx4aWnpdHp6uk6z2WxPYUQnUyGQSqKjoyUvL08BOLiA8xwE4NgI1Kh5BjeFQVRpI/A1gPcjIyMlLCxM4LYygooKCgokKSkpUEPCmCqBev104OHhoUxMTPRora2trzIyMhqSk5OFUKoklPUsLCwUvAscHdbK4XDIysqKMowwdI6CbW5uUvUzDQf6CdrsEVNmUFl8fLxYrVZljl4z1pYDLSeolaohNzg4OFDmMGU8P9BwqG8h1XcAGQmjutraWrFYLApGBZOTk8IM0I4KSkWDg4MyOzsbSBfhwrc3CCxAwT8i3WKmTGBNTY3gGKmU0F4yNTWljKqurpbs7GylamBgQNB2SiXPJWIImdwjMApKOqCyC0AD0lep46CrVKmOvxxoACkrK1Ogubk5BWIJ8OuGuk500Eu9ly1wtgfQawCG0BA6TbU0STeFYJZAvyD+qiPsPUx6iF5e0IFs2KsofDcA1YTqZ5Jm6P1MZ/WjQjDUEfYd8114/QNAf+AqAZQn9zIWt0BZHYC8gUS/KIKvLgZA4LqpzI5XQ/qdePaCpZQ8AOoBrgfMijAFA6HQhfgFUD+eP2B6kcrOvbGDwBGAXMDffEQFIv0Pz+/E7xhiHrEBkOvs2t9OIDX6eVLvRgAAAABJRU5ErkJggg==" /></a></div><div id="hiddenCtrl" style="font-size: x-small; text-align: center; margin: 2px; display: none;"><input id="pagingOffset" type="text" style="width: 40px; margin: 0px 3px;" title="Page Offset" /><select id="pageFetchMethod" title="Page Fetch Method"><option title="GM_xmlHttpRequest">1G</option><option title="xmlHttpRequest">2X</option><option title="iframe">3F</option></select></div><hr style="margin-top: 2px;" /><div><table id="InfoTable"><tbody><tr><td>Pages</td><td></td></tr><tr><td>Images</td><td></td></tr></tbody></table></div><hr /><section><div style="text-align: center;"><a name="displayOptions" href="#"><div class="bgiY blockButtonOn" style="border-color: yellow;">Display Options</div></a></div><div id="DisplayOptions" class="aY" style="border: 2px solid yellow; padding-bottom: 5px;"><table class="switchTable"><tbody><tr class="switchCellOn"><td><a name="artistName" href="#"><div></div></a></td><td><a name="artistName" href="#">Artist Name</a></td></tr><tr class="switchCellOn"><td><a name="illustTitle" href="#"><div></div></a></td><td><a name="illustTitle" href="#">Illustration Title</a></td></tr><tr class="switchCellOff"><td><a name="illustLink" href="#"><div></div></a></td><td><a name="illustLink" href="#">Illustration Link</a></td></tr><tr class="switchCellOff"><td><a name="mangaLinks" href="#"><div></div></a></td><td><a name="mangaLinks" href="#">Manga Links</a></td></tr><tr class="switchCellOn"><td><a name="countList" href="#"><div></div></a></td><td><a name="countList" href="#">Count-List</a></td></tr></tbody></table><hr /><table class="switchTable"><tbody><tr class="switchCellOff"><td><a name="IQDBLink" href="#"><div></div></a></td><td><a name="IQDBLink" href="#">IQDB Link</a></td></tr></tbody></table><div class="selectHolder"><select id="IQDBOptions"><option>danbooru</option></select></div><hr /><table class="switchTable"><tbody><tr class="switchCellOn"><td><a name="autoPreview" href="#"><div></div></a></td><td><a name="autoPreview" href="#">Preview Image</a></td></tr></tbody></table><div class="selectHolder"><select id="previewHeight"><option>250px</option></select><select id="previewLength"><option>10ms</option></select></div></div></section><section><div style="text-align: center;"><a name="filterOptions" href="#"><div class="bgiC blockButtonOn" style="border-color: cyan;">Filter Options</div></a></div><div id="FilterOptions" class="aC" style="border: 2px solid cyan;"><ul><li><input type="checkbox" name="ageRating" />Safe</li><li><input type="checkbox" name="ageRating" />R18</li><li><input type="checkbox" name="ageRating" />R18G</li></ul><table class="filterTable"><tbody><tr><td><input id="tagsInclude" type="text" /></td><td><a name="tagsInclude" href="#"><div class="bgiG"></div></a></td></tr><tr><td><input id="tagsExclude" type="text" /></td><td><a name="tagsExclude" href="#"><div class="bgiG"></div></a></td></tr></tbody></table><hr /><div style="text-align: center;"><a name="filterSwitch" href="#"><div class="miniButtonOff" style="width: 80%;">Filter Options</div></a></div><table><tbody><tr><td style="width: 16px;"><input type="checkbox" name="filterType" value="2" checked="checked" /></td><td colspan="3">Illustrations</td></tr><tr><td><input type="checkbox" name="filterType" value="4" checked="checked" /></td><td colspan="3">Mangas</td></tr><tr><td><input type="checkbox" name="filterType" value="8" checked="checked" /></td><td>Bookmarks</td><td><input class="filterValue" type="text" /></td><td style="width: 10px;"><input type="radio" name="sortType" value="0" /></td></tr><tr><td><input type="checkbox" name="filterType" value="16" checked="checked" /></td><td>Views</td><td><input class="filterValue" type="text" /></td><td><input type="radio" name="sortType" value="1" /></td></tr><tr><td><input type="checkbox" name="filterType" value="32" checked="checked" /></td><td>Ratings</td><td><input class="filterValue" type="text" /></td><td><input type="radio" name="sortType" value="2" /></td></tr><tr><td><input type="checkbox" name="filterType" value="32" checked="checked" /></td><td>Total</td><td><input class="filterValue" type="text" /></td><td><input type="radio" name="sortType" value="3" /></td></tr></tbody></table><div style="text-align: center; margin-bottom: 3px;"><a name="Sort" href="#"><div class="blockButtonOn bgiC" style="width: 50px;">Sort</div></a><a name="Unsort" href="#"><div class="blockButtonOn bgiC" style="width: 50px;">Unsort</div></a></div><ul class="filterSet"><li><span style="background-color: yellow;"><input type="radio" name="filterSet" value="0" /></span></li><li><span style="background-color: pink;"><input type="radio" name="filterSet" value="1" /></span></li><li><span style="background-color: red;"><input type="radio" name="filterSet" value="2" /></span></li><li><span style="background-color: darkgreen;"><input type="radio" name="filterSet" value="3" /></span></li><li><span style="background-color: blue;"><input type="radio" name="filterSet" value="4" /></span></li></ul></div></section></section>';
            var sidebar = iDoc.body.firstElementChild;
            iDoc.body.appendChild(sidebar);

            SideBar.sidebar = sidebar;
            SideBar.iDoc = iDoc;
            SideBar.iframe = iframe;

            SideBar.addStyle(null, ".bgiY{background-color: yellow;background-image: linear-gradient(bottom, rgb(255,255,250) 0%, rgb(255,255,0) 50%, rgb(255,255,250) 100%);background-image: -o-linear-gradient(bottom, rgb(255,255,250) 0%, rgb(255,255,0) 50%, rgb(255,255,250) 100%);background-image: -moz-linear-gradient(bottom, rgb(255,255,250) 0%, rgb(255,255,0) 50%, rgb(255,255,250) 100%);background-image: -webkit-linear-gradient(bottom, rgb(255,255,250) 0%, rgb(255,255,0) 50%, rgb(255,255,250) 100%);background-image: -ms-linear-gradient(bottom, rgb(255,255,250) 0%, rgb(255,255,0) 50%, rgb(255,255,250) 100%);background-image: -webkit-gradient( linear, left bottom, left top, color-stop(0, rgb(255,255,250)), color-stop(0.5, rgb(255,255,0)), color-stop(1, rgb(255,255,250)) );}.bgiC{background-color: cyan;background-image: linear-gradient(bottom, rgb(200,255,255) 0%, rgb(0,255,255) 50%, rgb(200,255,255) 100%);background-image: -o-linear-gradient(bottom, rgb(200,255,255) 0%, rgb(0,255,255) 50%, rgb(200,255,255) 100%);background-image: -moz-linear-gradient(bottom, rgb(200,255,255) 0%, rgb(0,255,255) 50%, rgb(200,255,255) 100%);background-image: -webkit-linear-gradient(bottom, rgb(200,255,255) 0%, rgb(0,255,255) 50%, rgb(200,255,255) 100%);background-image: -ms-linear-gradient(bottom, rgb(200,255,255) 0%, rgb(0,255,255) 50%, rgb(200,255,255) 100%);background-image: -webkit-gradient( linear, left bottom, left top, color-stop(0, rgb(200,255,255)), color-stop(0.5, rgb(0,255,255)), color-stop(1, rgb(200,255,255)) );}.bgiL, .switchCellOn > td:first-child, .miniButtonOn{background-color: rgb(0,255,0);background-image: linear-gradient(bottom,rgb(200,255,200) 0%, rgb(0,255,0) 50%, rgb(200,255,200) 100%);background-image: -o-linear-gradient(bottom, rgb(200,255,200) 0%, rgb(0,255,0) 50%, rgb(200,255,200) 100%);background-image: -moz-linear-gradient(bottom, rgb(200,255,200) 0%, rgb(0,255,0) 50%, rgb(200,255,200) 100%);background-image: -webkit-linear-gradient(bottom, rgb(200,255,200) 0%, rgb(0,255,0) 50%, rgb(200,255,200) 100%);background-image: -ms-linear-gradient(bottom, rgb(200,255,200) 0%, rgb(0,255,0) 50%, rgb(200,255,200) 100%);background-image: -webkit-gradient( linear, left bottom, left top, color-stop(0, rgb(200,255,200)), color-stop(0.5, rgb(0,255,0) ), color-stop(1, rgb(200,255,200)) );}.bgiG, .switchCellOff > td:first-child, .miniButtonOff{background-color: rgb(156,156,156);background-image: linear-gradient(bottom, rgb(238,238,238) 0%, rgb(156,156,156) 50%, rgb(238,238,238) 100%);background-image: -o-linear-gradient(bottom, rgb(238,238,238) 0%, rgb(156,156,156) 50%, rgb(238,238,238) 100%);background-image: -moz-linear-gradient(bottom, rgb(238,238,238) 0%, rgb(156,156,156) 50%, rgb(238,238,238) 100%);background-image: -webkit-linear-gradient(bottom, rgb(238,238,238) 0%, rgb(156,156,156) 50%, rgb(238,238,238) 100%);background-image: -ms-linear-gradient(bottom, rgb(238,238,238) 0%, rgb(156,156,156) 50%, rgb(238,238,238) 100%);background-image: -webkit-gradient( linear, left bottom, left top, color-stop(0, rgb(238,238,238)), color-stop(0.5, rgb(156,156,156)), color-stop(1, rgb(238,238,238)) );}.bgiB, #PSideBar, .blockButtonOff{background-color: black;background-image: linear-gradient(bottom, rgb(80,80,80) 0%, rgb(0,0,0) 50%, rgb(80,80,80) 100%);background-image: -o-linear-gradient(bottom, rgb(80,80,80) 0%, rgb(0,0,0) 50%, rgb(80,80,80) 100%);background-image: -moz-linear-gradient(bottom, rgb(80,80,80) 0%, rgb(0,0,0) 50%, rgb(80,80,80) 100%);background-image: -webkit-linear-gradient(bottom, rgb(80,80,80) 0%, rgb(0,0,0) 50%, rgb(80,80,80) 100%);background-image: -ms-linear-gradient(bottom, rgb(80,80,80) 0%, rgb(0,0,0) 50%, rgb(80,80,80) 100%);background-image: -webkit-gradient( linear, left bottom, left top, color-stop(0, rgb(80,80,80)), color-stop(0.5, rgb(0,0,0)), color-stop(1, rgb(80,80,80)) );}.aY a:link, .aY a:visited{color: yellow;}.aC a:link, .aC a:visited{color: cyan;}a, td, input, select, option, ul, span{text-decoration: none;font-size: small;}a, td, ul{color: white;}input, select, option, span{text-align: right;font-size: smaller;}hr{margin: 5px;}");
            SideBar.addStyle(null, "#PSideBar{top: 0px;left: 0px;border: 5px ridge black;display: inline-block;color: white;}#PSideBar > div, #PSideBar > section > div{margin: 2px 5px 2px 5px;}.blockButtonOff, .blockButtonOn, .miniButtonOn, .miniButtonOff{width: 90%;display: inline-block;text-align: center;border-radius: 20px;border: 2px solid;}.blockButtonOn{color: black;}.blockButtonOff{color: rgb(156,156,156);}.miniButtonOff, .miniButtonOn{color: black;}.switchTable, .filterTable{padding: 2px 5px 0px 5px;text-decoration: none;}.switchTable * tr > td:first-child > a > div{width: 100%;height: 100%;}.switchTable * tr > td:first-child{width: 12px;height: 12px;border-radius: 10px;display: inline-block;}.switchCellOff > td:last-child > a:link, .switchCellOff a:visited{color: white;}#InfoTable tr > td:first-child{padding-right: 5px;border-right: 1px solid gray;}#InfoTable tr > td:last-child{padding-left: 5px;}.selectHolder{padding: 0 8px 0 8px;}.selectHolder > select{font-size: small;width: 100%;}ul{margin: 0;padding: 0;list-style-type: none;text-align: center;}ul > li{display: inline;border-right: 1px solid gray;padding-right: 5px;}ul > li:last-child{border-right: none;}ul > li > span{display: inline-block;}.filterSet{margin-bottom: 5px;}.filterSet > li{border: none;padding-right: 1px;}.filterSet input{margin: 4px;}.filterValue{color: black;width: 38px;}.buttonG > span{background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAEPUlEQVR42m2VW0wcZRiG35md8+7sLLjsdgsL8YoKF5JUNJoYb4y9NKWJ1KaNBuXQQ1ITm0avbGJSIzRpMKWcCmKLpMV0MRhIbKgXSFFCGr3oRcFShG13wT1x2uPs7vjPdFm2hZm8meP/zPt93/9/Q2GPrb+/X3I4HHWyLB9mWbaWyJXJZBCPx/1Es9FodGRtbc3T2NgYe3EsVXjR2dlJlZWV1ZeWlrYqiuLe2NjA4pNH+C/sJ29qcBS7sL+kHCbahGAw6A2Hw+c3NzdvtbS0aLuAAwMDTEVFRXt5eflJ/4qPuj7SgweL9wE2DU5koDEZqIiDYRnUvPwm3q/9GFTWpK2urnYS6NmmpqZ0HtjR0UFVVVVdIcBTd3//FX2e71Bkt4EVaGh0GllTGlqBVCqOLNlPvPYFKpRX4Pf7r25tbZ3RnRrA0dHRo9XV1UO/3btDXfNchmu/C1l6B5A1qTtAZlsqVC2Bj6q/hp2u0AKBwLGGhoabVF9fn1RTU/Mwnoy5P2/7lMCcOUg6505FLLOORHYTGVMKNKeBESji3mQcGZrHZ1XfY9Ub9CYSiQPU2NjY8crKyhtt1y5gKTwHXs9XDriZCiMU95NzAuIBky4hdyRidBHwW9Z6vMHXg+TzBDU5OXnbIlvqTrd+AMe+kmcwWkUw+hRrqYAxMA8rVAFYZl9Ci3UQy0vLHmpqamo5sO53f/vTOThKngHDiRWE4ys7MGEP4Av3P2F/QOhxwkvNzMyofy/MMD/euwxFsSKpRfF0fYGAtN3uhO1QSe7IDNBzqF9TXBZHtDakHlnT1PT0tPpgeZYZ/PMSrIqMQOwJ4tpGHlII1AG8yBJx4ATWAOvPKTaDQ7GvkJyT09TExMTyhhpyX7p7GjbFBt/WglFJA1YQkj4nRUmEKIoQckATRxvvaqyKQysXEZwnIY+Pj98uKi6q+/KXI2DMGiIp/y5nOkwySzBLZgKUIAgCOJ445Mg0JuFCNeHdfy+Song91PDw8HGyQm4M/9WOmbWfodKx58MkEiUJFrNMgBaYBXMOyMHE6sAM7L6DcC2+g1AodILq7e2VXC7XQ1Hm3N/c/xAxNvRc9TiBgWy2wiLJsIhWSKIFEm8Gx/EECGRTFF79pxlL8z4vWXQHjKU3ODh41Ol0DvmSc9T11XPI8ol8VSWSM9msGDBDAoHyMgROAkiPKZ17D7FFTiNr+Vhzc/NNA9jV1UVZrdYrdrv91EpmDp7oBSTEkFFVPUxZzAEFxQCaOQVCqgjOx28j4eUQiUSuEswZAtTy7aunp4fheb6dgE+KCkv9kRzCvHQHJiWVh5l1mGqHM3wQ+0KvI+iL6M46yfCzBJbe1WB1pwzD1NM03Wqz2dyiJCDGB5HkIkZTFdRicDEbolsxvQB6zs4T3dKd7dmxt7fu7m6SINQRHSaqJR9w6fez2Sxp3ZglGiHyENCuX8D/3p++AfxYDl8AAAAASUVORK5CYII=);}.buttonR > span{background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAD+UlEQVR42nWVS0xTWRjHv9PeR1t6+4AC00BpMhsQNiRGExfGnXsxETWaGCIUH4kbY9xpYuJCTQxGBEpAjIQAiWBIIJGwmBBkwjDsJpGO4IwUW5i+0JbS0sed/7lOGRC4yT9fz+k9v37PU0YHPL29vaaysrIGRVHOiKJ4DHLmcjna2toKQvObm5ujGxsbI83Nzckfz7Ldi46ODlZZWdlYUVHxyGq1uuLfvtHa0hLFg0FiqkqK00m2qirS6fUUDof90Wj0TjweH2ptbVX3Afv6+gS3291WVVV1LRQIsF+8XgotLJCUzZIsCKSHh3CRdPhceuIE1Vy5Qlm9Xl1fX+8A9FZLS0t2B9je3s5qa2ufA3j993fv6P2zZ1Ris5Gk05EOQC79LssAzuXz9PPdu2Q8coSCweCLRCJxk3uqAcfGxs7X1dUNLExOsl+fPqUyhLYHlMnsAWrCnppKkfPBA8q53WooFLrY1NQ0yHp6ekz19fWLmWTSNXT1KpWXl+8c1v0Hy339Smo8TvrtbRKRS4kxkpBHbkmW6aeXL2kFOU2lUjVsfHz8UnV19evR+/cp7fORATkqwLLRKKVQEA2ESKRdKqxlgPWNjZSHkM/LbHp6+o1iNjcMnjtHZaWlO16lvnyh7VBoz+EfYQWxkhJi/f3098rKCJuZmVlJBoOu97dvkx1AHm56bU3TYYCD1ulXr2gplfKzubm5TGBuTvChGGaLhWhzkxLLy99zdRgMuZPRAdzytYiKJx8/Jp/FkmWzs7OZf+bnheUnT6hIUSi1ukoqGvogmAYSRZIlSbMiLw72BfRo9N49+qAoWTY1NbWiRiKuP27cIAW9lzzMO3hkMBo1caDEgdjj7wrI+eeHD8nHQ56YmHhTbLc3/Hb2LJnxZQZVPQhmNJnIUFREMqxkMHwHwkMB4W6j0h8B/Oz3j7Dh4eFLmJDXH9vaKPP2LemSyX1AAyBGpEM2m0kGVAPCS4EDEe7q0aO0fOoURSKRy6y7u9vkdDoXrZLk+uvCBZIjkT0wPscGFMsAILcSoBKgIhpa4NUFdNHjoT8DAT+WNdro9ff3n8eEDOR9PpZE+8gYqR0gcma0WkkGrCARcBFe8yvmw+nT9EmSVMzyRY/HM6gBOzs7mcViee5wOK4zTIuKqTHBU15VAw8TQM07WIkDYdN2Oy2dPEl+hB6LxV4AcxNAdef68nq9gizLbQBfs4kiUwcGSJmcJAvGbjds2+GgMHIWPn6cArEY96wDx28B9v/1VXi4p4IgNOp0ukc2m81lQvIN4TDJsZh2qaaLiymJ1kqgcCgAz9kdaIh7duCNXXi6urpMMA3QGegYfsDJ9/P5fBBmHhqFRgDa9xfwL7RWxwHoNf0IAAAAAElFTkSuQmCC);}.buttonOff > span, .buttonOn > span{height: 20px;width: 20px;display: inline-block;}.buttonOff > span{background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAADWElEQVR42nWVyy9rURTG16Ze9Y5nw2EkhEiQmPkTJKIGaJgQj4rE7A7NTAwkotQ7koogUSFhgIGISMSAgYGJiDZR77d6tJy7vp2c3nPb2snK7mn3/u1vfWvtU0FhxvT0tDEzM9OcmJhYGxUVVclh+v7+pvf3dw/Hwdvb2/Lj46Ozra3NG7xX6B/sdrvIzc2tz8nJ6U9OTlaen5/p9PSUrq6uSAhBWVlZxL9RZGQk3d7euu/v7/+8vLwsdHZ2qiHAmZkZQ35+/mBeXp714uJCTE5O0tHRkQTFxsbK2e/3U0xMDFVUVFBNTQ2+U/kwO0N72tvb/QHg8PCwKC4utjGwa2Njg2w2G6WlpcnNgZOFCMxIH7PFYiFFUcjj8Yy8vr52Q6lctbq62lBSUjK3ubkphoaGZFoaIBimD4AbGxspNTVVvbm5sbS0tMyLqakpY1lZ2YnX61WsVmsIDOPj44O+vr5IVVUyGAwUHR0t1WNGtLa20uXlpZvXFYm1tbWmwsJCR19fH52dnQX8wuBq0sPDg/zMlQ4JDVxeXk6lpaUoXrPY2dlZSkhIMOOU7OzsAOzu7o7Y7LAgPRAztxfV1dXR+fm5U+zu7rqur68VKERbAMg9JkO/6TeYFtXV1VDoFvv7+77Dw0ODw+GAueTz+VA16dVvQL2HeMbaqqoq4r71i729Pd/x8bFhdnaWUlJSZKqfn59hYXiOi4uTPiPwDBiCC4us/GJra8vFXikDAwNSIW5FOHVQZDQaKT4+XkI1hbg1ERERxG2HzNxifX19iUHm3t5euejp6SnEJ8xcOBmAakD8BiBGQUEBuVwup1hcXGziG+JwOp3yqqFZg4FQhUoCqFeITKAOnxFsV7OYmJgwmkymE16k4JagKHogvALsNyAEZGRkoIfdLLRINh0XpIFbZo7bR6ysrMjWCVanByJtHISBddz8Kt9lS0dHx7wEjo6OiqSkJFt6enoXv5Zoe3ubfn5+/vMOQMC00AoHzxk4wphuBqqBSzs+Pm7gNAYZbOUNglsJ91OmpkEBwiFatTkjKLPz9h6G/Xt9aQNK+eR6Nrqfe1KBV/AUPqGaUAU7cMe5APDsD8cClIV9Y2tjbGzMyJOZo5ajkg8w4Xu2wcPTAccyh5NBIX8BfwGUUXYBm4oiewAAAABJRU5ErkJggg==);}.filterTable div{width: 15px;height: 15px;border-radius: 2px;border: 2px solid black;}.filterTable input{text-align: left;}");


            // Settings to hide according to the page type.

            if (Settings.displayHidden & 2)

                if (PAGETYPE > 1 && Settings.displayHidden & 2)
                {
                    var hc = iDoc.getElementById("hiddenCtrl");
                    hc.style.display = null;
                    hc.style.textAlign = "left";
                    var offset = iDoc.getElementById("pagingOffset");
                    offset.value = Settings.pagingOffset;
                    offset.onfocus = function (e) { e.target.select(); }
                    offset.oninput = function ()
                    {
                        if (offset.value.length > 5 || isNaN(offset.value[offset.value.length - 1])) offset.value = offset.value.substring(0, offset.value.length - 1);
                        if (isNaN(offset.value) || offset.value < 100) Settings.pagingOffset = 100;
                        else Settings.pagingOffset = offset.value;
                        Settings.saveSettings();
                    };

                    hc.removeChild(iDoc.getElementById("pageFetchMethod"));
                    hc.title = "If checked implies usage of GM_xmlhttpRequest rather than XMLHttpRequest.\nP > Next page fetching.\nA > All pages apart from illustration page. \nI > Illustration page"
                    hc.innerHTML += '<select id="gbm" title="Get Bookmark on..."><option>None</option><option>All-I</option><option>All+I</option></select>'
                    hc.innerHTML += 'P<input type="checkbox" />A<input type="checkbox" />I<input type="checkbox" />';


                    var els = iDoc.getElementById("gbm");
                    els.selectedIndex = GM_getValue("RequestBookmarkCount", 0);
                    els.onchange = function ()
                    {
                        GM_setValue("RequestBookmarkCount", this.selectedIndex);
                    };

                    var els = hc.querySelectorAll("input[type=checkbox]");
                    for (var i = 0; i < els.length; i++)
                    {
                        els[i].checked = (Settings.requestMethod & Math.pow(2, i + 1));
                        els[i].onclick = function ()
                        {
                            Settings.requestMethod = 0;
                            var chk = iDoc.querySelectorAll("#hiddenCtrl input[type=checkbox]");
                            for (var j = 0; j < chk.length; j++)
                            {
                                Settings.requestMethod += (chk[j].checked) ? Math.pow(2, j + 1) : 0;
                            }
                            console.log("New Request Method: " + Settings.requestMethod);
                            GM_setValue("RequestMethod", Settings.requestMethod)
                        };
                    }
                }
                else
                {
                    iDoc.getElementById("pagingOffset").style.display = "none";
                    iDoc.getElementById("pageFetchMethod").style.display = "none";
                }

            if (PAGETYPE < 2)
            {
                iDoc.getElementById("FilterOptions").parentElement.style.display = "none";
                iDoc.getElementsByName("nextPage")[0].style.display = "none";
            }
            else
            {
                iDoc.getElementById("FilterOptions").style.display = (Settings.display.filterOptions) ? null : "none";
                //How to handle AgeRating functions
                if (PAGETYPE != 8)
                {
                    var ars = iDoc.getElementsByName("ageRating");
                    for (var i = 0; i < ars.length; i++)
                    {
                        ars[i].onclick = SideBar.onAgeRatingFilter;
                    }
                }
                else iDoc.getElementsByName("ageRating")[0].parentElement.parentElement.style.display = "none";
            }

            iDoc.getElementById("DisplayOptions").style.display = (Settings.display.displayOptions) ? null : "none";

            var switchLinks = sidebar.getElementsByTagName("a");
            for (var i = 0; s = switchLinks[i], i < switchLinks.length; i++)
            {
                if (s.id == "SidebarClose") //No toggling here
                {
                    s.onclick = function ()
                    {
                        SideBar.iframe.style.visibility = "hidden";
                        document.getElementById("wrapper").style.margin = null;
                        Settings.display.sidebar = false;
                        Settings.saveSettings();
                    }
                }
                else if (s.name)
                {
                    switch (s.name)
                    {
                        case "filterSwitch":
                            SideBar.switchSet(s, false);
                            break;
                        case "Sort":
                        case "Unsort":
                            break;
                        case "tagsInclude":
                        case "tagsExclude":
                            //Filter search text
                            var txt = iDoc.getElementById(s.name);
                            txt.value = Settings.filter[s.name];
                            txt.oninput = SideBar.onInputTagFilter;
                            break;
                        case "nextPage":
                        case "metadata":
                            SideBar.switchSet(s, Settings.fetch[s.name]);
                            break;
                        default:
                            SideBar.switchSet(s, Settings.display[s.name]);
                            break;
                    }

                    s.onclick = SideBar.onSwitchPressed;
                }
            }


            //-------------------------------------------//
            //Checking filters
            var filters = iDoc.getElementsByName("filterType");
            for (var i = 0; i < filters.length; i++)
            {
                var bitValue = Math.pow(2, i + 1);
                filters[i].checked = (bitValue & Settings.filter.flag) ? true : false;
                filters[i].onclick = SideBar.onToggledFilter;
            }


            //-------------------------------------------//
            //Loading filter values
            var filterSets = iDoc.getElementsByName("filterSet");
            for (var i = 0; i < filterSets.length; i++) { filterSets[i].onclick = SideBar.onRadioClick; }
            iDoc.getElementsByName("filterSet")[Settings.filter.set].checked = true;
            SideBar.loadFilterSet();

            var els = sidebar.getElementsByClassName("filterValue");
            for (var i = 0; i < els.length; i++)
            {
                els[i].oninput = SideBar.onInputFilterValue;
                els[i].onfocus = function (e) { e.target.select(); };
            }


            //-------------------------------------------//
            //Sort type
            var sortTypes = iDoc.getElementsByName("sortType");
            for (var i = 0; i < sortTypes.length; i++) sortTypes[i].onclick = SideBar.onRadioClick;
            SideBar.iDoc.getElementsByName("sortType")[Settings.sortType].checked = true;

            //-------------------------------------------//
            //Load IQDB options and set them
            var IQDBTypes = ["All", "anime-pictures", "danbooru", "e-shuushuu", "haruhidoujins", "gelbooru", "konachan", "mangadrawing", "sankaku", "theanimegallery", "yandere", "zerochan"];
            var sel = iDoc.getElementById("IQDBOptions");
            sel.innerHTML = "";
            for (i = 0; i < IQDBTypes.length; i++)
            {
                var opt = iDoc.createElement("option");
                opt.textContent = IQDBTypes[i];
                sel.add(opt);
                if (IQDBTypes[i] == Settings.IQDBType) opt.selected = true;
            }
            if (Settings.IQDBType == "www") sel.selectedIndex = 0;
            sel.onchange = function (e)
            {
                var sel = e.target;
                if (sel.selectedIndex == 0) Settings.IQDBType = "www";
                else Settings.IQDBType = sel.options[sel.selectedIndex].textContent;
                if (Settings.display.IQDBLink) PaginatorHQ.updateAllIQDBLinks();
                Settings.saveSettings();
            };


            //-------------------------------------------//
            //Preview height settings
            sel = iDoc.getElementById("previewHeight");
            sel.innerHTML = "";
            for (i = 0; i <= 10; i++)
            {
                var size = i * 50 + 200;
                var opt = iDoc.createElement("option");
                opt.textContent = size + "px";
                opt.value = size;
                sel.add(opt);
                if (size == Settings.preview.height) opt.selected = true;
            }
            sel.onchange = function (e) { var sel = e.target; Settings.preview.height = sel.options[sel.selectedIndex].value; Settings.saveSettings(); };


            //-------------------------------------------//
            //Preview length settings
            sel = iDoc.getElementById("previewLength");
            sel.innerHTML = "";
            for (i = 1; i < 9; i++)
            {
                var period = (i < 7) ? (i * 500) : 3000 + ((i - 6) * 1000);
                var opt = iDoc.createElement("option");
                opt.textContent = period + "ms";
                opt.value = period;
                sel.add(opt);
                if (period == Settings.preview.timeLength) opt.selected = true;
            }
            sel.onchange = function (e) { var sel = e.target; Settings.preview.timeLength = sel.options[sel.selectedIndex].value; Settings.saveSettings(); };

            iDoc.body.setAttribute("style", "width: auto; height: auto;");
            iframe.setAttribute("style", "z-index: 1000; position:fixed; top: 0px; left:0px;");

            SideBar.adjustFrameSize();
            SideBar.iframe.style.visibility = (Settings.display.sidebar) ? null : "hidden";
            document.getElementById("wrapper").style.margin = (Settings.display.sidebar) ? "10px 20px 0px auto" : null;
            window.onresize = SideBar.adjustFrameSize;

            if (Settings.fetch.metadata) IllustrationLinker.switchOn();
            else IllustrationLinker.switchOff();
        }
        document.body.appendChild(iframe);
    },


    switchMain: function (s)
    {
        if (s.className) return s;
        if (s.firstElementChild && s.firstElementChild.className) return s.firstElementChild;

        var depth = 0;
        while (!s.className)
        {
            s = s.parentElement;
            if (s.className) return s;
            if (++depth == 2) return s;
        }
    },

    switchCheck: function (s)
    {
        return (SideBar.switchMain(s).className.indexOf("On") >= 0);
    },

    switchSet: function (s, enable)
    {
        var m = SideBar.switchMain(s);
        m.className = (enable) ? m.className.replace("Off", "On") : m.className.replace("On", "Off");
    },

    switchToggle: function (s)
    {
        var m = SideBar.switchMain(s);
        var enabled = !SideBar.switchCheck(m);
        SideBar.switchSet(m, enabled);
        return enabled;
    },

    adjustFrameSize: function (e)
    {
        if (SideBar.sidebar.offsetHeight > window.innerHeight)
        {
            SideBar.iframe.style.height = (window.innerHeight) + "px";
            SideBar.iframe.style.width = (SideBar.sidebar.offsetWidth + 20 + SideBar.scrollWidth) + "px";
        }
        else
        {
            SideBar.iframe.style.height = (SideBar.sidebar.offsetHeight + 30) + "px";
            SideBar.iframe.style.width = (SideBar.sidebar.offsetWidth + 20) + "px";
        }
    },


    /*
    ------------------------------------------------------
     Handles all link elements that behave like a button
    ------------------------------------------------------*/
    onSwitchPressed: function (e)
    {
        e.stopPropagation();
        //e.preventDefault(); //Stops propagating to parent
        var s = e.target;
        while (s.tagName != "A") s = s.parentElement;


        var enabled;
        if (s.name != "Sort" && s.name != "Unsort") enabled = SideBar.switchToggle(s);
        if (Settings.display[s.name] != undefined) Settings.display[s.name] = enabled;
        if (Settings.fetch[s.name] != undefined) Settings.fetch[s.name] = enabled;

        switch (s.name)
        {
            case "Sort":
            case "Unsort":
            case "tagsInclude":
            case "tagsExclude":
            case "filterSwitch":
                if (PaginatorHQ.status != 0)
                {
                    alert("Sort/Filter is already in progress.");
                }
                else if (s.name == "filterSwitch")
                {
                    if (enabled) Settings.filterSwitchFlag = (Settings.filterSwitchFlag | 2);
                    else Settings.filterSwitchFlag -= (Settings.filterSwitchFlag & 2);
                    PaginatorHQ.filterResult();
                }
                else if (s.name == "tagsInclude" || s.name == "tagsExclude")
                {
                    var btn = e.target;
                    if (btn.className == "bgiL" && btn.style.borderColor == "rgb(0, 0, 0)")
                    {
                        btn.className = "bgiG";
                        enabled = false;
                    }
                    else
                    {
                        btn.style.borderColor = "rgb(0, 0, 0)";
                        btn.className = "bgiL";
                        enabled = true;
                    }

                    if (s.name == "tagsInclude")
                    {
                        if (enabled) Settings.filterSwitchFlag = (Settings.filterSwitchFlag | 4);
                        else Settings.filterSwitchFlag -= (Settings.filterSwitchFlag & 4);
                    }

                    if (s.name == "tagsExclude")
                    {
                        if (enabled) Settings.filterSwitchFlag = (Settings.filterSwitchFlag | 8);
                        else Settings.filterSwitchFlag -= (Settings.filterSwitchFlag & 8);
                    }

                    PaginatorHQ.filterResult();
                }
                else
                {
                    PaginatorHQ.sortingMethod = (PaginatorHQ.sortingMethod != 0) ? 0 : 1;
                    PaginatorHQ.sortByScore((s.name == "Sort"));
                }
                break;
            case "displayOptions":
                SideBar.iDoc.getElementById("DisplayOptions").style.display = (enabled) ? null : "none";
                break;
            case "filterOptions":
                SideBar.iDoc.getElementById("FilterOptions").style.display = (enabled) ? null : "none";
                break;
            case "IQDBLink":
                PaginatorHQ.updateAllIQDBLinks();
                break;
            case "metadata":
                if (enabled) IllustrationLinker.switchOn();
                else IllustrationLinker.switchOff();
                break;
            case "Paging":
                break;
            default:
                PaginatorHQ.updateVisibilityOfAllElements();
                break;
        }

        Settings.saveSettings();
        SideBar.adjustFrameSize();
        return false;
    },

    onToggledFilter: function (e)
    {
        Settings.filter.flag = 0;
        var filters = SideBar.iDoc.getElementsByName("filterType");
        for (var i = 0; i < filters.length; i++)
        {
            var bitValue = Math.pow(2, i + 1);
            Settings.filter.flag += (filters[i].checked) ? bitValue : 0;
        }

        Settings.saveSettings();
        PaginatorHQ.filterResult();
    },

    onAgeRatingFilter: function (e)
    {
        var ars = SideBar.iDoc.getElementsByName("ageRating");
        for (var i = 0; i < ars.length; i++)
        {
            var val = Math.pow(2, i + 4);
            Settings.filterSwitchFlag -= (Settings.filterSwitchFlag & val); //Remove the bit switch
            if (ars[i].checked) Settings.filterSwitchFlag += val;
        }
        PaginatorHQ.filterResult();
    },

    onRadioClick: function (e)
    {
        switch (e.target.name)
        {
            case "filterSet":
                Settings.filter.set = e.target.value;
                SideBar.loadFilterSet();
                Settings.saveSettings();
                if ((Settings.filterSwitchFlag & 2) == 2) PaginatorHQ.filterResult();
                break;
            case "sortType":
                Settings.sortType = e.target.value;
                Settings.saveSettings();
                break;
        }
    },

    onInputFilterValue: function (e)
    {
        e.target.value = parseInt(e.target.value);
        if (e.target.value.length > 6) e.target.value = e.target.value.substring(0, 6);

        var values = SideBar.sidebar.getElementsByClassName("filterValue");
        for (var i = 0; i < values.length; i++) Settings.filters[Settings.filter.set][i] = parseInt(values[i].value);
        Settings.saveSettings();
        if ((Settings.filterSwitchFlag & 2) == 2 && Settings.filter.flag == e.target.nextElementSibling.value) PaginatorHQ.filterResult();
    },

    onInputTagFilter: function (e)
    {
        var name = e.target.id;
        var btn = SideBar.iDoc.getElementsByName(name)[0].firstElementChild;

        if (btn.className == "bgiL" && btn.style.borderColor == "rgb(0, 0, 0)")
        {
            btn.style.borderColor = "rgb(255, 0, 0)";
        }

        Settings.filter[name] = e.target.value;
        Settings.saveSettings();
    },

    loadFilterSet: function ()
    {
        var values = Settings.filters[Settings.filter.set];
        var filters = SideBar.sidebar.getElementsByClassName("filterValue");
        for (var i = 0; i < filters.length; i++) filters[i].value = values[i];
    }
}

/*
===================================================================================================================================

===================================================================================================================================*/
var Settings =
{
    filterSwitchFlag: 0,
    sortType: 0,

    versionCheck: function (current)
    {
        var saved = GM_getValue("Version", "0.0").toString();

        var v1 = saved.split(".");
        var v2 = current.split(".");

        if (saved != current) alert("(Some) Pixiv++ settings will be reset due to major changes in the update.");

        if (v1[0] != v2[0])
        {
            var names = GM_listValues();

            for (var i = 0; name = names[i], i < names.length; i++)
            {
                var skipNames = ["Filters", "DisplayHidden"];
                var found = false;
                for (var j = 0; j < skipNames.length; j++) found = found || (name.indexOf(skipNames[j]) == 0);
                if (!found) GM_deleteValue(name);
            }
        }

        if (v1[1] != v2[1])
        {
            var names = GM_listValues();

            for (var i = 0; name = names[i], i < names.length; i++)
            {
                var deleteNames = ["Filters"];
                if ("Filters" == name) GM_deleteValue(name);
            }
        }

        GM_setValue("Version", current);
    },

    loadSettings: function ()
    {
        Settings.versionCheck("126.125");
        //GM_setValue("DisplayHidden", 2);
        Settings.displayHidden = GM_getValue("DisplayHidden", 2);
        Settings.requestMethod = GM_getValue("RequestMethod", 0);

        var vals = GM_getValue(Settings.valueName("Generic"), "4094|6|350,1500|500|0|0|0").split("|");

        // ----------- Sidebar Display Settings Options (PAGETYPE > 0)
        Settings.display = makeStruct("artistName illustTitle countList illustLink mangaLinks IQDBLink autoPreview sidebar displayOptions filterOptions");
        Settings.setObjectPropertiesByFlag(Settings.display, vals[0]);

        // ----------- Sidebar Fetch Settings (PAGETYPE > 0)
        Settings.fetch = makeStruct("nextPage metadata");
        Settings.setObjectPropertiesByFlag(Settings.fetch, vals[1]);

        // ----------- Preview Settings
        Settings.preview = makeStruct("timeLength height");
        Settings.setObjectPropertiesValues(Settings.preview, vals[2].split(","));

        // ----------- Other Values
        Settings.pagingOffset = parseInt(vals[3]);
        Settings.sortType = parseInt(vals[4]);
        Settings.filter = new Object();
        Settings.filter.flag = parseInt(vals[5]);
        Settings.filter.set = parseInt(vals[6]);

        // -----------  Fixed Settings
        vals = GM_getValue("General", "danbooru|R-18|R-18").split("|");
        Settings.IQDBType = vals[0];
        Settings.filter.tagsInclude = vals[1];
        Settings.filter.tagsExclude = vals[2];

        // ----------- Filters
        vals = GM_getValue("Filters", "5, 10, 5, 10|10, 50, 10, 20|30, 400, 30, 100|50, 1000, 50, 200|80, 2000, 60, 400").split("|");
        Settings.filters = new Array();
        for (var i = 0; i < 5; i++) Settings.filters[i] = vals[i].split(",");

        if (Settings.pagingOffset > 3000) Settings.pagingOffset = 3000;
    },



    setObjectPropertiesByFlag: function (obj, flag)
    {
        var i = 0;
        for (var key in obj)
        {
            if (obj.hasOwnProperty(key))
            {
                i++;
                obj[key] = (flag & Math.pow(2, i)) > 0;
            }
        }

        return obj;
    },

    getObjectPropertiesFlag: function (obj)
    {
        var i = 0;
        var flag = 0;
        for (var key in obj)
        {
            if (obj.hasOwnProperty(key))
            {
                i++;
                if (obj[key]) flag += Math.pow(2, i);
            }
        }

        return flag;
    },

    setObjectPropertiesValues: function (obj, arr)
    {
        var i = 0;
        for (var key in obj)
        {
            if (obj.hasOwnProperty(key))
            {
                obj[key] = arr[i];
                i++;
            }
        }

        return obj;
    },


    getObjectPropertiesValues: function (obj)
    {
        var arr = new Array();

        for (var key in obj) if (obj.hasOwnProperty(key)) arr.push(obj[key]);

        return arr;
    },


    saveSettings: function ()
    {
        GM_setValue(Settings.valueName("Generic"), Settings.getObjectPropertiesFlag(Settings.display) + "|"
                + Settings.getObjectPropertiesFlag(Settings.fetch) + "|"
                + Settings.getObjectPropertiesValues(Settings.preview) + "|"
                + Settings.pagingOffset + "|"
                + Settings.sortType + "|"
                + Settings.filter.flag + "|"
                + Settings.filter.set);

        GM_setValue("General", Settings.IQDBType + "|" + Settings.filter.tagsInclude + "|" + Settings.filter.tagsExclude);

        GM_setValue("Filters",
            (function ()
            {
                var val = "";
                for (var i = 0; i < 5; i++) val += Settings.filters[i].toString() + ((i < 4) ? "|" : "");
                return val;
            })());
    },


    valueName: function (name, saveset)
    {
        if (!saveset) saveset = PAGETYPE;
        return "[" + saveset + "] " + name;
    }
}


function GetAbsolutePosition(el)
{
    var x = 0;
    var y = 0;

    while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop))
    {
        x += el.offsetLeft;
        y += el.offsetTop;
        el = el.offsetParent;
    }
    return { top: y, left: x };
}

function FilterTypeToString(type)
{
    var names = ["Bookmarks", "Views", "Ratings", "Total"];
    return names[type];
}

function RemoveMessage(msg)
{
    if (msg)
    {
        var msgBox = msg.parentElement;
        msgBox.removeChild(msg);
        if (msgBox.children.length == 0) msgBox.style.visibility = "hidden";
    }
}

//function AdjustDisplayMessage()
//{
//    var msgBox = document.getElementById("pppMsgBox");
//    if (!msgBox) return;

//    if (SideBar.iframe) msgBox.style.marginLeft = (SideBar.pinned || (SideBar.iframe.style.visibility != "hidden")) ? SideBar.iframe.offsetWidth + "px" : "0px";
//}

function DisplayMessage(msgTxt, timeout)
{
    //text-align: center; display:inline-block; width: 100px; background-color: #D3D3D3; border: 1;
    var msgBox = document.getElementById("pppMsgBox");
    if (!msgBox)
    {
        msgBox = document.createElement("span");
        msgBox.id = "pppMsgBox";
        document.body.appendChild(msgBox);
    }

    //AdjustDisplayMessage();

    msgBox.style.visibility = null;
    var msg = document.createElement("div");
    msg.textContent = msgTxt;
    msgBox.appendChild(msg);

    if (!isNaN(timeout))
        setTimeout(RemoveMessage, timeout, msg);
    return msg
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

/*
=================================================================================================
 [VYCS] VARIABLE YOU CAN SET
=================================================================================================*/
//GM_setValue("RequestMethod", 0); // [1]
//GM_setValue("RequestBookmarkCount", 2); //[4]

/*
[1] Default: 0
Default gets all meta-data using XmlHttpRequest otherwise uses the flags below:
2: Get next pages using GM_XmlHttpRequest
4: Get illustration data using GM_XmlHttpRequest on every page apart from illustration page
8: Get data using GM_XmlHttpRequest on illustration page
If you want to use GM_XmlHttpRequest on everything then the value set the value to 14 (2+4+8)

[2] Does an extra call to get bookmark if it is missing. Default value is 0.
0: Do not make any extra http request to get bookmark
1: Get bookmark count on every page except illustration page
2: Get bookmark for every page
*/


/*
=================================================================================================
 Do not touch
=================================================================================================*/
//Removes pop dialog that appears when there isn't a cookie
if (window.self === window.top)
    (function ()
    {
        PaginatorHQ.addStyle("Adjust-Pixiv", "li.before a img, li.after a img, img._thumbnail {color: white; border: 3px solid; padding: 1px; background-color: white;}"
                                + "li.before a:visited img, li.after a:visited img, a:visited img._thumbnail{color: cyan !important;}"
                            );

        console.info("Pixiv Main");
        var counter = 0;
        var id = setInterval(function ()
        {
            var pop = document.getElementById("register-introduction-modal");
            if (pop) pop.getElementsByClassName("close")[0].click();

            pop = document.getElementsByClassName("signup-notice");
            for (var i = 0; i < pop.length; i++) pop[i].style.display = "none";
            counter++;
            if (counter = 10) clearInterval(id);
        }, 100);

        Settings.loadSettings();

        if (PAGETYPE >= 0)
        {
            console.info("Pixiv++ Initalising");
            var els = document.querySelectorAll("a[href^='/jump']");
            for (var i = 0; i < els.length; i++)
            {
                els[i].href = decodeURIComponent(els[i].href.replace(/.+\/jump\.php\?/, ""));
                console.log("Direct URL: " + els[i].href);
            }
            SideBar.initalise();
            PaginatorHQ.intialise();
        }
    }());


/*
<script>
pixiv.context.illustId         = '44305721';
pixiv.context.illustTitle      = 'フランスパンこいしちゃんgif';
pixiv.context.userId           = '42949';
pixiv.context.userName         = 'ゆぬき うた';
pixiv.context.hasQuestionnaire = false;
pixiv.context.embedId          = '44305721_0286523bc768bf54bbc69e3163d75256';
pixiv.context.explicit         = false;
pixiv.context.illustSize       = [514, 487];
pixiv.context.ugokuIllustData  = {"src":"http:\/\/i2.pixiv.net\/img-zip-ugoira\/img\/2014\/06\/25\/21\/24\/51\/44305721_ugoira600x600.zip","mime_type":"image\/jpeg","frames":[{"file":"000000.jpg","delay":100},{"file":"000001.jpg","delay":100},{"file":"000002.jpg","delay":100},{"file":"000003.jpg","delay":100},{"file":"000004.jpg","delay":100},{"file":"000005.jpg","delay":100},{"file":"000006.jpg","delay":100},{"file":"000007.jpg","delay":100},{"file":"000008.jpg","delay":100},{"file":"000009.jpg","delay":100},{"file":"000010.jpg","delay":100},{"file":"000011.jpg","delay":100}]};
pixiv.context.ugokuIllustFullscreenData  = {"src":"http:\/\/i2.pixiv.net\/img-zip-ugoira\/img\/2014\/06\/25\/21\/24\/51\/44305721_ugoira1920x1080.zip","mime_type":"image\/jpeg","frames":[{"file":"000000.jpg","delay":100},{"file":"000001.jpg","delay":100},{"file":"000002.jpg","delay":100},{"file":"000003.jpg","delay":100},{"file":"000004.jpg","delay":100},{"file":"000005.jpg","delay":100},{"file":"000006.jpg","delay":100},{"file":"000007.jpg","delay":100},{"file":"000008.jpg","delay":100},{"file":"000009.jpg","delay":100},{"file":"000010.jpg","delay":100},{"file":"000011.jpg","delay":100}]};
</script>

http://pixiv.me/<userID>
*/
