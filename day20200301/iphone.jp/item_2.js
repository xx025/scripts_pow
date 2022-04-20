// ==UserScript==
// @name         item2
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.apple.com/jp/*
// @match        https://www.apple.com/jp/shop/*
// @match        https://*.store.apple.com/jp/shop*
// @icon         https://www.google.com/s2/favicons?domain=apple.com
// @grant        none
// ==/UserScript==

// 此脚本运行在
// https://www.apple.com/jp/shop/buy-iphone/iphone-13-pro?product=MLUK3J/A&purchaseOption=fullPrice&step=attach


window.onload = (function () {

    let this_url = location.href
   if (this_url.search('www.apple.com/jp/shop/buy-iphone') > -1 && this_url.search('product=') > -1) {
        //检查包
        setTimeout(function () {
            document.querySelector("#root button").click()
        }, 400)

    }
})();
