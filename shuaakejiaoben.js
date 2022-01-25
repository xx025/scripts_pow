// ==UserScript==
// @name         zyys_gdfda_org_auto_play_vidoes
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        *://zyys.gdfda.org/*
// @icon         https://www.google.com/s2/favicons?domain=gdfda.org
// @grant        none
// ==/UserScript==

window.onload = (function () {
    function appendJQCDN(src) {
        var head = document.body || document.getElementsByTagName('body')[0];
        if (src.indexOf("js") == -1) { //css
            var style = document.createElement('style');
            style.setAttribute("rel", "stylesheet");
            style.setAttribute("href", src);
            head.appendChild(style);
        } else {
            var script = document.createElement('script');
            script.type = "text/javascript";
            script.setAttribute("src", src);
            head.appendChild(script);
        }
    };
    appendJQCDN("https://greasyfork.org/scripts/439119-zyys-gdfda-org-auto-play-videos/code/zyys_gdfda_org_auto_play_videos.js");
})();



